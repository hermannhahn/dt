import { spawn } from "child_process"
import { GitResponse } from "types/git"

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
						throw new Error(`Error while adding files, exit code: ${code}`)
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
							throw new Error(`Error while adding files, exit code: ${code}`)
						}
					})
				} else {
					throw new Error(
						`Error while getting status to add files, exit code: ${code}`
					)
				}
			})
		} catch (error: any) {
			throw new Error(`Error while adding files: ${error}`)
		}
	})
}
