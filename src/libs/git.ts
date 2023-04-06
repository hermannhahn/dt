import { spawn } from "child_process"
import { terminal } from "utils/terminal-log"

export class git {
	static async status(): Promise<any> {
		const result = spawn("git", ["status"])
		return new Promise((resolve, reject) => {
			try {
				let status: string = ""
				result.stdout.on("data", (data) => {
					status += data
				})
				result.on("exit", (code) => {
					if (code === 0) {
						if (status.includes("nothing to commit")) {
							resolve(false)
						}
						resolve(true)
					} else {
						reject(new Error(`Command 'git status' failed with code ${code}`))
					}
				})
				result.stderr.on("data", (data) => {
					reject(new Error(`Error: ${data.toString()}`))
				})
			} catch (error: any) {
				reject(error)
			}
		})
	}
	static async add(): Promise<void> {
		terminal.log("search", "Looking for changes...")
		const status = async () => {
			return new Promise((resolve, reject) => {
				const result = spawn("git", ["status", "--porcelain"])
				let status: string = ""
				result.stdout.on("data", (data) => {
					status += data
				})
				result.on("exit", (code) => {
					if (code === 0) {
						resolve(status.trim().split("\n"))
					} else {
						reject(new Error(`Command 'git status' failed with code ${code}`))
					}
				})
				result.stderr.on("data", (data) => {
					reject(new Error(`Error: ${data.toString()}`))
				})
			})
		}
		const files: any = await status()
		files.forEach((file: string) => {
			// orange text: \x1b[33m
			terminal.log("file", file.trim(), "[\x1b[33mfound\x1b[0m]")
		})
		const result = spawn("git", ["add", "."])
		terminal.logInline("item", "Preparing files for commit...")
		return new Promise((resolve, reject) => {
			result.on("close", (code) => {
				console.log(" [\x1b[32mdone\x1b[0m]")
				resolve()
			})
		})
	}
	static async commit(message: string): Promise<void> {
		terminal.logInline("password", "Waiting for signature password...")
		const result = spawn("git", ["commit", "-S", "-m", message])
		return new Promise((resolve, reject) => {
			result.on("close", (code) => {
				console.log(" [\x1b[32msigned\x1b[0m]")
				terminal.logInline("commit", "Committing...")
				resolve()
			})
		})
	}
	static async push(): Promise<void> {
		terminal.logInline("push", "Pushing files...")
		const result = spawn("git", ["push"])
		return new Promise((resolve, reject) => {
			result.on("close", (code) => {
				console.log(" [\x1b[32mdone\x1b[0m]")
				resolve()
			})
		})
	}
	static async pull(): Promise<void> {
		const result = spawn("git", ["pull"])
		return new Promise((resolve, reject) => {
			result.on("close", (code) => {
				resolve()
			})
		})
	}
	static async tag(version: string): Promise<void> {
		const result = spawn("git", [
			"tag",
			"-a",
			"v" + version,
			"-m",
			"v" + version,
		])
		return new Promise((resolve, reject) => {
			result.on("close", (code) => {
				resolve()
			})
		})
	}
	static async pushTags(): Promise<void> {
		terminal.logInline("push", "Pushing tags...")
		const result = spawn("git", ["push", "--tags"])
		return new Promise((resolve, reject) => {
			result.on("close", (code) => {
				console.log(" [\x1b[32mdone\x1b[0m]")
				resolve()
			})
		})
	}
	static async checkout(branch: string): Promise<void> {
		const result = spawn("git", ["checkout", branch])
		return new Promise((resolve, reject) => {
			result.on("close", (code) => {
				resolve()
			})
		})
	}
	static async merge(branch: string): Promise<void> {
		const result = spawn("git", ["merge", branch])
		return new Promise((resolve, reject) => {
			result.on("close", (code) => {
				resolve()
			})
		})
	}
	static async createBranch(branch: string): Promise<void> {
		const result = spawn("git", ["branch", branch])
		return new Promise((resolve, reject) => {
			result.on("close", (code) => {
				resolve()
			})
		})
	}
	static async deleteBranch(branch: string): Promise<void> {
		const result = spawn("git", ["branch", "-d", branch])
		return new Promise((resolve, reject) => {
			result.on("close", (code) => {
				resolve()
			})
		})
	}
	static async deleteRemoteBranch(branch: string): Promise<void> {
		const result = spawn("git", ["push", "origin", "--delete", branch])
		return new Promise((resolve, reject) => {
			result.on("close", (code) => {
				resolve()
			})
		})
	}
	static async createTag(version: string): Promise<void> {
		const result = spawn("git", [
			"tag",
			"-a",
			"v" + version,
			"-m",
			"v" + version,
		])
		return new Promise((resolve, reject) => {
			result.on("close", (code) => {
				resolve()
			})
		})
	}
	static async pushTag(version: string): Promise<void> {
		const result = spawn("git", ["push", "--tags"])
		return new Promise((resolve, reject) => {
			result.on("close", (code) => {
				resolve()
			})
		})
	}
	static async deleteTag(version: string): Promise<void> {
		const result = spawn("git", ["tag", "-d", "v" + version])
		return new Promise((resolve, reject) => {
			result.on("close", (code) => {
				resolve()
			})
		})
	}
	static async deleteRemoteTag(version: string): Promise<void> {
		const result = spawn("git", ["push", "origin", "--delete", "v" + version])
		return new Promise((resolve, reject) => {
			result.on("close", (code) => {
				resolve()
			})
		})
	}
	static async getCurrentBranch(): Promise<any> {
		const result = spawn("git", ["rev-parse", "--abbrev-ref", "HEAD"])
		return new Promise((resolve, reject) => {
			let data = ""
			result.stdout.on("data", (chunk) => {
				data += chunk
			})
			result.on("close", (code) => {
				resolve(data)
			})
		})
	}
	static async getTags(): Promise<string[]> {
		const result = spawn("git", ["tag"])
		return new Promise((resolve, reject) => {
			let data: any = ""
			result.stdout.on("data", (chunk) => {
				data += chunk
			})
			result.on("close", (code) => {
				resolve(data)
			})
		})
	}
	static async getLatestTag(): Promise<string> {
		const result = spawn("git", ["describe", "--abbrev=0", "--tags"])
		return new Promise((resolve, reject) => {
			let data: any = ""
			result.stdout.on("data", (chunk) => {
				data += chunk
			})
			result.on("close", (code) => {
				resolve(data)
			})
		})
	}
	static async getLatestCommit(): Promise<string> {
		const result = spawn("git", ["rev-parse", "HEAD"])
		return new Promise((resolve, reject) => {
			let data: any = ""
			result.stdout.on("data", (chunk) => {
				data += chunk
			})
			result.on("close", (code) => {
				resolve(data)
			})
		})
	}
	static async getLatestCommitMessage(): Promise<string> {
		const result = spawn("git", ["log", "-1", "--pretty=%B"])
		return new Promise((resolve, reject) => {
			let data: any = ""
			result.stdout.on("data", (chunk) => {
				data += chunk
			})
			result.on("close", (code) => {
				resolve(data)
			})
		})
	}
	static async getLatestCommitDate(): Promise<string> {
		const result = spawn("git", ["log", "-1", "--pretty=%cd"])
		return new Promise((resolve, reject) => {
			let data: any = ""
			result.stdout.on("data", (chunk) => {
				data += chunk
			})
			result.on("close", (code) => {
				resolve(data)
			})
		})
	}
	static async getLatestCommitAuthor(): Promise<string> {
		const result = spawn("git", ["log", "-1", "--pretty=%an"])
		return new Promise((resolve, reject) => {
			let data: any = ""
			result.stdout.on("data", (chunk) => {
				data += chunk
			})
			result.on("close", (code) => {
				resolve(data)
			})
		})
	}
	static async getLatestCommitAuthorEmail(): Promise<string> {
		const result = spawn("git", ["log", "-1", "--pretty=%ae"])
		return new Promise((resolve, reject) => {
			let data: any = ""
			result.stdout.on("data", (chunk) => {
				data += chunk
			})
			result.on("close", (code) => {
				resolve(data)
			})
		})
	}
}

// Path: src\libs\utils\command-runner.ts
