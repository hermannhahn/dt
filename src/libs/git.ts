import { spawn } from "child_process"

export class git {
	static async status(): Promise<any> {
		const result = spawn("git", ["status", "--porcelain"])
		return new Promise((resolve, reject) => {
			try {
				let status: string = ""
				result.on("data", (data) => {
					status += data
				})
				result.on("close", (code) => {
					resolve(status)
				})
				result.on("error", (error) => {
					reject(error)
				})
			} catch (error: any) {
				reject(error)
			}
		})
	}
	static async add(): Promise<void> {
		const result = spawn("git", ["add", "."])
		return new Promise((resolve, reject) => {
			result.on("close", (code) => {
				resolve()
			})
		})
	}
	static async commit(message: string): Promise<void> {
		const result = spawn("git", ["commit", "-S", "-m", message])
		return new Promise((resolve, reject) => {
			result.on("close", (code) => {
				resolve()
			})
		})
	}
	static async push(): Promise<void> {
		const result = spawn("git", ["push"])
		return new Promise((resolve, reject) => {
			result.on("close", (code) => {
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
		const result = spawn("git", ["push", "--tags"])
		return new Promise((resolve, reject) => {
			result.on("close", (code) => {
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
