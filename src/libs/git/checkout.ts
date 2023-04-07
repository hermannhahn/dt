import { spawn } from "child_process"
import { GitResponse, GitResponseInterface } from "types/git"

export const checkout = async (
	branch: string
): Promise<GitResponseInterface> => {
	return new Promise((resolve, reject) => {
		let response = new GitResponse(false, "")
		try {
			const checkout = spawn("git", ["checkout", branch])
			let result: string = ""
			checkout.stdout.on("data", (data) => {
				result += data
			})
			checkout.on("exit", (code) => {
				if (code === 0) {
					response.error = false
					response.result = result.toString()
					resolve(response)
				} else {
					const error = new Error(
						`Error while checking out branch ${branch}, exit code: ${code}`
					)
					response.error = error
					response.result = result.toString()
					reject(response)
				}
			})
		} catch (error: any) {
			error = new Error(`Error while checking out branch ${branch}: ${error}`)
			response.error = error
			response.result = ""
			reject(response)
		}
	})
}
