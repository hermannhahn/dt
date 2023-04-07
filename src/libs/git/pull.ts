import { spawn } from "child_process"
import { GitResponse, GitResponseInterface } from "types/git"

export const Pull = async (args?: string): Promise<GitResponseInterface> => {
	return new Promise((resolve, reject) => {
		let response = new GitResponse(false, "")
		try {
			const pull = spawn("git", ["pull", args ?? ""])
			let result: string = ""
			pull.stdout.on("data", (data) => {
				result += data
			})
			pull.on("exit", (code) => {
				if (code === 0) {
					response.error = false
					response.result = result.toString()
					resolve(response)
				} else {
					const error = new Error(`Error while pulling, exit code: ${code}`)
					response.error = error
					response.result = result.toString()
					reject(response)
				}
			})
		} catch (error: any) {
			error = new Error(`Error while pulling: ${error}`)
			response.error = error
			response.result = ""
			reject(response)
		}
	})
}
