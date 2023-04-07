import { spawn } from "child_process"
import { GitResponse, GitResponseInterface } from "types/git"

export const merge = async (branch: string): Promise<GitResponseInterface> => {
	return new Promise((resolve, reject) => {
		let response = new GitResponse(false, "")
		try {
			const merge = spawn("git", ["merge", branch])
			let result: string = ""
			merge.stdout.on("data", (data) => {
				result += data
			})
			merge.on("exit", (code) => {
				if (code === 0) {
					response.error = false
					response.result = result.toString()
					resolve(response)
				} else {
					const error = new Error(
						`Error while merging branch ${branch}, exit code: ${code}`
					)
					response.error = error
					response.result = result.toString()
					reject(response)
				}
			})
		} catch (error: any) {
			error = new Error(`Error while merging branch ${branch}: ${error}`)
			response.error = error
			response.result = ""
			reject(response)
		}
	})
}
