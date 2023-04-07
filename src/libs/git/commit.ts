import { spawn } from "child_process"
import { GitResponse, GitResponseInterface } from "types/git"

export const Commit = async (
	message: string
): Promise<GitResponseInterface> => {
	return new Promise((resolve, reject) => {
		try {
			const all = spawn("git", ["commit", "-S", "-m", message])
			let result: string = ""
			all.stdout.on("data", (data) => {
				result += data
			})
			all.on("exit", (code) => {
				if (code === 0) {
					const response: GitResponse = {
						error: false,
						result: result.toString(),
					}
					resolve(response)
				} else {
					const response: GitResponse = {
						error: `Error while committing all changes, exit code: ${code}`,
						result: result.toString(),
					}
					resolve(response)
				}
			})
		} catch (error: any) {
			throw new Error(`Error while committing all changes: ${error}`)
		}
	})
}

export class History {
	public latestCommit = this.LatestCommit
	public latestMessage = this.LatestMessage
	public latestAuthor = this.LatestAuthor
	public latestAuthorEmail = this.LatestAuthorEmail
	public latestCommitDate = this.LatestCommitDate
	public get = this.Get

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
						const response: GitResponse = {
							error: false,
							result: result.toString(),
						}
						resolve(response)
					} else {
						const response: GitResponse = {
							error: `Error while getting latest commit, exit code: ${code}`,
							result: result.toString(),
						}
						resolve(response)
					}
				})
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
						const response: GitResponse = {
							error: false,
							result: result.toString(),
						}
						resolve(response)
					} else {
						const response: GitResponse = {
							error: `Error while getting latest message, exit code: ${code}`,
							result: result.toString(),
						}
						resolve(response)
					}
				})
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
						const response: GitResponse = {
							error: false,
							result: result.toString(),
						}
						resolve(response)
					} else {
						const response: GitResponse = {
							error: `Error while getting latest author, exit code: ${code}`,
							result: result.toString(),
						}
						resolve(response)
					}
				})
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
						const response: GitResponse = {
							error: false,
							result: result.toString(),
						}
						resolve(response)
					} else {
						const response: GitResponse = {
							error: `Error while getting latest author email, exit code: ${code}`,
							result: result.toString(),
						}
						resolve(response)
					}
				})
			} catch (error: any) {
				throw new Error(`Error while getting latest author email: ${error}`)
			}
		})
	}

	private async LatestCommitDate(): Promise<GitResponseInterface> {
		return new Promise((resolve, reject) => {
			try {
				const latest = spawn("git", ["log", "-1", "--pretty=%cd"])
				let result: string = ""
				latest.stdout.on("data", (data) => {
					result += data
				})
				latest.on("exit", (code) => {
					if (code === 0) {
						const response: GitResponse = {
							error: false,
							result: result.toString(),
						}
						resolve(response)
					} else {
						const response: GitResponse = {
							error: `Error while getting latest commit date, exit code: ${code}`,
							result: result.toString(),
						}
						resolve(response)
					}
				})
			} catch (error: any) {
				throw new Error(`Error while getting latest commit date: ${error}`)
			}
		})
	}

	public async Get(): Promise<GitResponseInterface> {
		return new Promise((resolve, reject) => {
			try {
				const latest = spawn("git", ["log", "--pretty=%H|%an|%ae|%B"])
				let result: string = ""
				latest.stdout.on("data", (data) => {
					result += data
				})
				latest.on("exit", (code) => {
					if (code === 0) {
						const response: GitResponse = {
							error: false,
							result: result.toString(),
						}
						resolve(response)
					} else {
						const response: GitResponse = {
							error: `Error while getting history, exit code: ${code}`,
							result: result.toString(),
						}
						resolve(response)
					}
				})
			} catch (error: any) {
				throw new Error(`Error while getting history: ${error}`)
			}
		})
	}
}
