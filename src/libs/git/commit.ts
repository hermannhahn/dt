import { spawn } from "child_process"
import { GitResponse, GitResponseInterface } from "types/git"

export const Commit = async (
	message: string
): Promise<GitResponseInterface> => {
	return new Promise((resolve, reject) => {
		let response = new GitResponse(false, "")
		try {
			const all = spawn("git", ["commit", "-S", "-m", message])
			let result: string = ""
			all.stdout.on("data", (data) => {
				result += data
			})
			all.on("exit", (code) => {
				if (code === 0) {
					response.error = false
					response.result = result.toString()
					resolve(response)
				} else {
					const error = new Error(
						`Error while committing all changes, exit code: ${code}`
					)
					response.error = error
					response.result = result.toString()
					reject(response)
				}
			})
		} catch (error: any) {
			error = new Error(`Error while committing all changes: ${error}`)
			response.error = error
			response.result = ""
			reject(response)
		}
	})
}

export class History {
	private response = new GitResponse(false, "")

	public async Latest(): Promise<GitResponseInterface> {
		return new Promise((resolve, reject) => {
			try {
				const latest = spawn("git", ["rev-parse", "HEAD"])
				let result: string = ""
				latest.stdout.on("data", (data) => {
					result += data
				})
				latest.on("exit", (code) => {
					if (code === 0) {
						this.response.error = false
						this.response.result = result.toString()
						resolve(this.response)
					} else {
						const error = new Error(
							`Error while getting latest commit, exit code: ${code}`
						)
						this.response.error = error
						this.response.result = result.toString()
						reject(this.response)
					}
				})
			} catch (error: any) {
				error = new Error(`Error while getting latest commit: ${error}`)
				this.response.error = error
				this.response.result = ""
				reject(this.response)
			}
		})
	}
	public async LatestMessage(): Promise<GitResponseInterface> {
		return new Promise((resolve, reject) => {
			try {
				const latestMessage = spawn("git", ["log", "-1", "--pretty=%B"])
				let result: string = ""
				latestMessage.stdout.on("data", (data) => {
					result += data
				})
				latestMessage.on("exit", (code) => {
					if (code === 0) {
						this.response.error = false
						this.response.result = result.toString()
						resolve(this.response)
					} else {
						const error = new Error(
							`Error while getting latest commit message, exit code: ${code}`
						)
						this.response.error = error
						this.response.result = result.toString()
						reject(this.response)
					}
				})
			} catch (error: any) {
				error = new Error(`Error while getting latest commit message: ${error}`)
				this.response.error = error
				this.response.result = ""
				reject(this.response)
			}
		})
	}
	public async LatestDate(): Promise<GitResponseInterface> {
		return new Promise((resolve, reject) => {
			try {
				const latestDate = spawn("git", ["log", "-1", "--pretty=%cd"])
				let result: string = ""
				latestDate.stdout.on("data", (data) => {
					result += data
				})
				latestDate.on("exit", (code) => {
					if (code === 0) {
						this.response.error = false
						this.response.result = result.toString()
						resolve(this.response)
					} else {
						const error = new Error(
							`Error while getting latest commit date, exit code: ${code}`
						)
						this.response.error = error
						this.response.result = result.toString()
						reject(this.response)
					}
				})
			} catch (error: any) {
				error = new Error(`Error while getting latest commit date: ${error}`)
				this.response.error = error
				this.response.result = ""
				reject(this.response)
			}
		})
	}
	public async LatestAuthor(): Promise<GitResponseInterface> {
		return new Promise((resolve, reject) => {
			try {
				const latestAuthor = spawn("git", ["log", "-1", "--pretty=%an"])
				let result: string = ""
				latestAuthor.stdout.on("data", (data) => {
					result += data
				})
				latestAuthor.on("exit", (code) => {
					if (code === 0) {
						this.response.error = false
						this.response.result = result.toString()
						resolve(this.response)
					} else {
						const error = new Error(
							`Error while getting latest commit author, exit code: ${code}`
						)
						this.response.error = error
						this.response.result = result.toString()
						reject(this.response)
					}
				})
			} catch (error: any) {
				error = new Error(`Error while getting latest commit author: ${error}`)
				this.response.error = error
				this.response.result = ""
				reject(this.response)
			}
		})
	}
	public async LatestAuthorEmail(): Promise<GitResponseInterface> {
		return new Promise((resolve, reject) => {
			try {
				const latestAuthorEmail = spawn("git", ["log", "-1", "--pretty=%ae"])
				let result: string = ""
				latestAuthorEmail.stdout.on("data", (data) => {
					result += data
				})
				latestAuthorEmail.on("exit", (code) => {
					if (code === 0) {
						this.response.error = false
						this.response.result = result.toString()
						resolve(this.response)
					} else {
						const error = new Error(
							`Error while getting latest commit author email, exit code: ${code}`
						)
						this.response.error = error
						this.response.result = result.toString()
						reject(this.response)
					}
				})
			} catch (error: any) {
				error = new Error(
					`Error while getting latest commit author email: ${error}`
				)
				this.response.error = error
				this.response.result = ""
				reject(this.response)
			}
		})
	}
}
