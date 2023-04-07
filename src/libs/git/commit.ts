import { spawn } from "child_process"
import { GitResponse, GitResponseInterface } from "types/git"

export const Commit = async (
	message: string
): Promise<GitResponseInterface> => {
	return new Promise((resolve, reject) => {
		let response = new GitResponse(false, "Error while committing all changes")
		try {
			const all = spawn("git", ["commit", "-S", "-m", message])
			let result: string = ""
			all.stdout.on("data", (data) => {
				result += data
			})
			all.on("exit", (code) => {
				if (code === 0) {
					response.result = result.toString()
				} else {
					response.error = `Error while committing all changes, exit code: ${code}`
					response.result = result.toString()
				}
			})
			resolve(response)
		} catch (error: any) {
			throw new Error(`Error while committing all changes: ${error}`)
		}
	})
}

export class History {
	private response = new GitResponse(false, "Error while getting history")
	public latestCommit = this.LatestCommit
	public latestMessage = this.LatestMessage
	public latestAuthor = this.LatestAuthor
	public latestAuthorEmail = this.LatestAuthorEmail

	private async LatestCommit(): Promise<GitResponseInterface> {
		return new Promise((resolve, reject) => {
			try {
				const latest = spawn("git", ["rev-parse", "HEAD"])
				let result: string = ""
				latest.stdout.on("data", (data) => {
					result += data
				})
				latest.on("exit", (code) => {
					if (code === 0) {
						this.response.result = result.toString()
					} else {
						this.response.error = `Error while getting latest commit, exit code: ${code}`
						this.response.result = result.toString()
					}
				})
				resolve(this.response)
			} catch (error: any) {
				throw new Error(`Error while getting latest commit: ${error}`)
			}
		})
	}

	private async LatestMessage(): Promise<GitResponseInterface> {
		return new Promise((resolve, reject) => {
			try {
				const latest = spawn("git", ["log", "-1", "--pretty=%B"])
				let result: string = ""
				latest.stdout.on("data", (data) => {
					result += data
				})
				latest.on("exit", (code) => {
					if (code === 0) {
						this.response.result = result.toString()
					} else {
						this.response.error = `Error while getting latest message, exit code: ${code}`
						this.response.result = result.toString()
					}
				})
				resolve(this.response)
			} catch (error: any) {
				throw new Error(`Error while getting latest message: ${error}`)
			}
		})
	}

	private async LatestAuthor(): Promise<GitResponseInterface> {
		return new Promise((resolve, reject) => {
			try {
				const latest = spawn("git", ["log", "-1", "--pretty=%an"])
				let result: string = ""
				latest.stdout.on("data", (data) => {
					result += data
				})
				latest.on("exit", (code) => {
					if (code === 0) {
						this.response.result = result.toString()
					} else {
						this.response.error = `Error while getting latest author, exit code: ${code}`
						this.response.result = result.toString()
					}
				})
				resolve(this.response)
			} catch (error: any) {
				throw new Error(`Error while getting latest author: ${error}`)
			}
		})
	}

	private async LatestAuthorEmail(): Promise<GitResponseInterface> {
		return new Promise((resolve, reject) => {
			try {
				const latest = spawn("git", ["log", "-1", "--pretty=%ae"])
				let result: string = ""
				latest.stdout.on("data", (data) => {
					result += data
				})
				latest.on("exit", (code) => {
					if (code === 0) {
						this.response.result = result.toString()
					} else {
						this.response.error = `Error while getting latest author email, exit code: ${code}`
						this.response.result = result.toString()
					}
				})
				resolve(this.response)
			} catch (error: any) {
				throw new Error(`Error while getting latest author email: ${error}`)
			}
		})
	}
}
