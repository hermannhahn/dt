import { spawn } from "child_process"
import { GitResponse, GitResponseInterface } from "types/git"

export class Tag {
	private response = new GitResponse(false, "")
	public async List(): Promise<GitResponseInterface> {
		return new Promise((resolve, reject) => {
			try {
				const list = spawn("git", ["tag"])
				let result: string = ""
				list.stdout.on("data", (data) => {
					result += data
				})
				list.on("exit", (code) => {
					if (code === 0) {
						this.response.error = false
						this.response.result = result.toString()
						resolve(this.response)
					} else {
						const error = new Error(
							`Error while getting tag list, exit code: ${code}`
						)
						this.response.error = error
						this.response.result = result.toString()
						reject(this.response)
					}
				})
			} catch (error: any) {
				error = new Error(`Error while getting tag list: ${error}`)
				this.response.error = error
				this.response.result = ""
				reject(this.response)
			}
		})
	}

	public async Version(): Promise<GitResponseInterface> {
		return new Promise((resolve, reject) => {
			try {
				const version = spawn("git", ["describe", "--tags"])
				let result: string = ""
				version.stdout.on("data", (data) => {
					result += data
				})
				version.on("exit", (code) => {
					if (code === 0) {
						this.response.error = false
						this.response.result = result.toString()
						resolve(this.response)
					} else {
						const error = new Error(
							`Error while getting tag version, exit code: ${code}`
						)
						this.response.error = error
						this.response.result = result.toString()
						reject(this.response)
					}
				})
			} catch (error: any) {
				error = new Error(`Error while getting tag version: ${error}`)
				this.response.error = error
				this.response.result = ""
				reject(this.response)
			}
		})
	}

	public async Create(tag: string): Promise<GitResponseInterface> {
		return new Promise((resolve, reject) => {
			try {
				const create = spawn("git", ["tag", tag])
				let result: string = ""
				create.stdout.on("data", (data) => {
					result += data
				})
				create.on("exit", (code) => {
					if (code === 0) {
						this.response.error = false
						this.response.result = result.toString()
						resolve(this.response)
					} else {
						const error = new Error(
							`Error while creating tag, exit code: ${code}`
						)
						this.response.error = error
						this.response.result = result.toString()
						reject(this.response)
					}
				})
			} catch (error: any) {
				error = new Error(`Error while creating tag: ${error}`)
				this.response.error = error
				this.response.result = ""
				reject(this.response)
			}
		})
	}

	public async Delete(tag: string): Promise<GitResponseInterface> {
		return new Promise((resolve, reject) => {
			try {
				const del = spawn("git", ["tag", "-d", tag])
				let result: string = ""
				del.stdout.on("data", (data) => {
					result += data
				})
				del.on("exit", (code) => {
					if (code === 0) {
						this.response.error = false
						this.response.result = result.toString()
						resolve(this.response)
					} else {
						const error = new Error(
							`Error while deleting tag, exit code: ${code}`
						)
						this.response.error = error
						this.response.result = result.toString()
						reject(this.response)
					}
				})
			} catch (error: any) {
				error = new Error(`Error while deleting tag: ${error}`)
				this.response.error = error
				this.response.result = ""
				reject(this.response)
			}
		})
	}

	public async DeleteRemote(tag: string): Promise<GitResponseInterface> {
		return new Promise((resolve, reject) => {
			try {
				const del = spawn("git", ["push", "origin", "--delete", tag])
				let result: string = ""
				del.stdout.on("data", (data) => {
					result += data
				})
				del.on("exit", (code) => {
					if (code === 0) {
						this.response.error = false
						this.response.result = result.toString()
						resolve(this.response)
					} else {
						const error = new Error(
							`Error while deleting remote tag, exit code: ${code}`
						)
						this.response.error = error
						this.response.result = result.toString()
						reject(this.response)
					}
				})
			} catch (error: any) {
				error = new Error(`Error while deleting remote tag: ${error}`)
				this.response.error = error
				this.response.result = ""
				reject(this.response)
			}
		})
	}
}
