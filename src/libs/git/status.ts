import { spawn } from "child_process"
import { GitResponse, GitResponseInterface } from "types/git"

export const Status = async (): Promise<GitResponseInterface> => {
	const status = spawn("git", ["status"])
	return new Promise((resolve, reject) => {
		try {
			let result: string = ""
			status.stdout.on("data", (data) => {
				result += data
			})
			status.on("exit", (code) => {
				if (code === 0) {
					if (result.includes("nothing to commit")) {
						const response: GitResponse = {
							error: "All files are up to date!",
							result: result.toString(),
						}
						resolve(response)
					}
					const response: GitResponse = {
						error: false,
						result: result.toString(),
					}
					resolve(response)
				} else {
					const response: GitResponse = {
						error: `Error while getting status, exit code: ${code}`,
						result: result.toString(),
					}
					resolve(response)
				}
			})
		} catch (error: any) {
			throw new Error(`Error while getting status: ${error}`)
		}
	})
}
