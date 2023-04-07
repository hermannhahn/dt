import { spawn } from "child_process"
import { GitResponse, GitResponseInterface } from "types/git"
import { terminal } from "utils/terminal-log"

export const Push = async (args?: string): Promise<GitResponseInterface> => {
	return new Promise((resolve, reject) => {
		let response = new GitResponse(false, "")
		if (args === "undefined") {
			args = ""
		}
		try {
			terminal.debug("Searching for Bugs... (Push) " + args)
			const push = spawn("git", ["push", args ?? ""])
			let result: string = ""
			push.stdout.on("data", (data) => {
				result += data
			})
			push.on("exit", (code) => {
				if (code === 0) {
					response.error = false
					response.result = result.toString()
					resolve(response)
				} else {
					const error = new Error(`Error while pushing, exit code: ${code}`)
					response.error = error
					response.result = result.toString()
					reject(response)
				}
			})
		} catch (error: any) {
			error = new Error(`Error while pushing: ${error}`)
			response.error = error
			response.result = ""
			reject(response)
		}
	})
}
