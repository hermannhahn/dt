import { spawn } from "child_process"
import { GitResponse, GitResponseInterface } from "types/git"

export const Pull = async (args?: string): Promise<GitResponseInterface> => {
	return new Promise((resolve, reject) => {
		let response = new GitResponse(false, "Error while pulling")
		try {
			const pull = spawn("git", ["pull", args ?? ""])
			let result: string = ""
			pull.stdout.on("data", (data) => {
				result += data
			})
			pull.on("exit", (code) => {
				if (code === 0) {
					response.result = result.toString()
				} else {
					response.error = `Error while pulling, exit code: ${code}`
					response.result = result.toString()
				}
			})
		} catch (error: any) {
			throw new Error(`Error while pulling: ${error}`)
		}
	})
}
