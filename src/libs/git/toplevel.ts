import { spawn } from "child_process"
import { GitResponse, GitResponseInterface } from "types/git"

export const TopLevel = async (): Promise<GitResponseInterface> => {
	const topLevel = spawn("git", ["rev-parse", "--show-toplevel"])
	return new Promise((resolve, reject) => {
		try {
			let result: string = ""
			topLevel.stdout.on("data", (data) => {
				result += data
			})
			topLevel.on("exit", (code) => {
				if (code === 0) {
					const response: GitResponse = {
						error: false,
						result: result.toString().trim(),
					}
					resolve(response)
				} else {
					const response: GitResponse = {
						error: `Error while getting top level directory, exit code: ${code}`,
						result: result.toString(),
					}
					resolve(response)
				}
			})
		} catch (error: any) {
			throw new Error(`Error while getting top level directory: ${error}`)
		}
	})
}
