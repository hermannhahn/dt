import { spawn } from "child_process"
import { GitResponse, GitResponseInterface } from "types/git"

export const Push = async (args?: string): Promise<GitResponseInterface> => {
	return new Promise((resolve, reject) => {
		try {
			let push = spawn("git", ["push"])
			if (args !== undefined) {
				push = spawn("git", ["push", args])
			}
			let result: string = ""
			push.stdout.on("data", (data) => {
				result += data
			})
			push.on("exit", (code) => {
				if (code === 0) {
					const response: GitResponse = {
						error: false,
						result: result.toString(),
					}
					resolve(response)
				} else {
					const response: GitResponse = {
						error: `Error while pushing, exit code: ${code}`,
						result: result.toString(),
					}
					resolve(response)
				}
			})
		} catch (error: any) {
			throw new Error(`Error while pushing: ${error}`)
		}
	})
}
