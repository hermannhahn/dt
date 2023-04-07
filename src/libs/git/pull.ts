import { spawn } from "child_process"
import { GitResponse, GitResponseInterface } from "types/git"

export const Pull = async (args?: string): Promise<GitResponseInterface> => {
	return new Promise((resolve, reject) => {
		try {
			const pull = spawn("git", ["pull", args ?? ""])
			let result: string = ""
			pull.stdout.on("data", (data) => {
				result += data
			})
			pull.on("exit", (code) => {
				if (code === 0) {
					const response: GitResponse = {
						error: false,
						result: result.toString(),
					}
					resolve(response)
				} else {
					const response: GitResponse = {
						error: `Error while pulling, exit code: ${code}`,
						result: result.toString(),
					}
					resolve(response)
				}
			})
		} catch (error: any) {
			throw new Error(`Error while pulling: ${error}`)
		}
	})
}
