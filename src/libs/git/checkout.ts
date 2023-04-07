import { spawn } from "child_process"
import { GitResponse, GitResponseInterface } from "types/git"

export const checkout = async (
	branch: string
): Promise<GitResponseInterface> => {
	return new Promise((resolve, reject) => {
		let response = new GitResponse(false, "Error while checking out branch")
		try {
			const checkout = spawn("git", ["checkout", branch])
			let result: string = ""
			checkout.stdout.on("data", (data) => {
				result += data
			})
			checkout.on("exit", (code) => {
				if (code === 0) {
					response.result = result.toString()
				} else {
					response.error = `Error while checking out branch, exit code: ${code}`
					response.result = result.toString()
				}
			})
			resolve(response)
		} catch (error: any) {
			throw new Error(`Error while checking out branch: ${error}`)
		}
	})
}
