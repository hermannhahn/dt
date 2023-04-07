import { spawn } from "child_process"
import { GitResponse, GitResponseInterface } from "types/git"

export const Add = async (args: string): Promise<GitResponseInterface> => {
	return new Promise((resolve, reject) => {
		let response = new GitResponse(false, "")
		try {
			const porcelain = spawn("git", ["status", "--porcelain"])
			let resultPorcelain: string = ""
			porcelain.stdout.on("data", (data) => {
				resultPorcelain += data
			})
			porcelain.on("exit", (code) => {
				if (code === 0) {
					let fileList: any = []
					resultPorcelain
						.trim()
						.split("\n")
						.forEach((file: string) => {
							fileList.push(file.trim())
						})
					if (fileList.length === 0) {
						const error = new Error(`No modified files found`)
						response.error = error
						response.result = ""
						reject(response)
					}
					const add = spawn("git", ["add", args])
					let resultAdd: string = ""
					add.stdout.on("data", (data) => {
						resultAdd += data
					})
					add.on("exit", (code) => {
						if (code === 0) {
							response.error = false
							response.result = fileList
							resolve(response)
						} else {
							const error = new Error(
								`Error while adding files, exit code: ${code}`
							)
							response.error = error
							response.result = resultAdd.toString()
							reject(response)
						}
					})
				} else {
					const error = new Error(
						`Error while getting status to add files, exit code: ${code}`
					)
					response.error = error
					response.result = resultPorcelain.toString()
					reject(response)
				}
			})
		} catch (error: any) {
			error = new Error(`Error while adding files: ${error}`)
			response.error = error
			response.result = ""
			reject(response)
		}
	})
}
