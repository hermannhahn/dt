import { spawn } from "child_process"
import { Error } from "types/error"
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
					if (fileList[0] === "" || fileList.length === 0) {
						response.error = new Error(`No files to add, exit code: ${code}`)
						response.result = "No changes found"
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
						} else {
							response.error = new Error(
								`Error while adding files, exit code: ${code}`
							)
							response.result = resultAdd.toString()
						}
					})
				} else {
					const error = new Error(
						`Error while getting status to add files, exit code: ${code}`
					)
					response.error = new Error(
						`Error while getting status to add files, exit code: ${code}`
					)
					response.result = resultPorcelain.toString()
				}
				resolve(response)
			})
		} catch (error: any) {
			throw new Error(`Error while adding files: ${error}`)
		}
	})
}
