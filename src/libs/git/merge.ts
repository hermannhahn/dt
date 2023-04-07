import { spawn } from "child_process"
import { GitResponse, GitResponseInterface } from "types/git"

export const merge = async (branch: string): Promise<GitResponseInterface> => {
	return new Promise((resolve, reject) => {
		try {
			const merge = spawn("git", ["merge", branch])
			let result: string = ""
			merge.stdout.on("data", (data) => {
				result += data
			})
			merge.on("exit", (code) => {
				if (code === 0) {
					const response: GitResponse = {
						error: false,
						result: result.toString(),
					}
					resolve(response)
				} else {
					const response: GitResponse = {
						error: `Error while merging branch, exit code: ${code}`,
						result: result.toString(),
					}
					resolve(response)
				}
			})
		} catch (error: any) {
			throw new Error(`Error while merging branch ${branch}: ${error}`)
		}
	})
}
