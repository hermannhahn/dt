import { spawn } from "child_process"
import { Error } from "types/error"
import { GitResponse } from "types/git"
import { terminal } from "utils/terminal-log"

export const Add = async (args: string): Promise<GitResponse> => {
	return new Promise((resolve) => {
		const response = new GitResponse(false, "No changes found")
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
						terminal.debug("No changes found!!!")
						response.error = `Error while adding files, exit code: ${code}`
						response.result = resultPorcelain
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
							response.error = `Error while adding files, exit code: ${code}`
							response.result = resultAdd
							resolve(response)
						}
					})
				} else {
					response.error = `Error while adding files, exit code: ${code}`
					response.result = resultPorcelain
					resolve(response)
				}
			})
		} catch (error: any) {
			throw new Error(`Error while adding files: ${error}`)
		}
	})
}
