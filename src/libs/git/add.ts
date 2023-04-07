import { spawn } from "child_process"
import { Error } from "types/error"
import { GitResponse } from "types/git"
import { terminal } from "utils/terminal-log"

export const Add = async (args: string): Promise<GitResponse> => {
	return new Promise((resolve) => {
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
						const response: GitResponse = {
							error: `Error while adding files, exit code: ${code}`,
							result: resultPorcelain,
						}
						resolve(response)
					}
					const add = spawn("git", ["add", args])
					let resultAdd: string = ""
					add.stdout.on("data", (data) => {
						resultAdd += data
					})
					add.on("exit", (code) => {
						if (code === 0) {
							const response: GitResponse = {
								error: false,
								result: resultAdd,
							}
							resolve(response)
						} else {
							const response: GitResponse = {
								error: `Error while adding files, exit code: ${code}`,
								result: resultAdd,
							}
							resolve(response)
						}
					})
				} else {
					const response: GitResponse = {
						error: `Error while adding files, exit code: ${code}`,
						result: resultPorcelain,
					}
					resolve(response)
				}
			})
		} catch (error: any) {
			throw new Error(`Error while adding files: ${error}`)
		}
	})
}
