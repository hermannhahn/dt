import { spawn } from "child_process"
import { GitResponse, GitResponseInterface } from "types/git"

export class Tag {
	private response = new GitResponse(false, "")
	public list = this.List
	public version = this.Version
	public create = this.Create
	public delete = this.Delete
	public deleteRemote = this.DeleteRemote

	private async List(): Promise<GitResponseInterface> {
		return new Promise((resolve, reject) => {
			try {
				const list = spawn("git", ["tag"])
				let result: string = ""
				list.stdout.on("data", (data) => {
					result += data
				})
				list.on("exit", (code) => {
					if (code === 0) {
						this.response.result = result.toString()
					} else {
						this.response.error = `Error while getting tag list, exit code: ${code}`
						this.response.result = result.toString()
					}
				})
				resolve(this.response)
			} catch (error: any) {
				throw new Error(`Error while getting tag list: ${error}`)
			}
		})
	}

	private async Version(): Promise<GitResponseInterface> {
		return new Promise((resolve, reject) => {
			try {
				const version = spawn("git", ["describe", "--tags"])
				let result: string = ""
				version.stdout.on("data", (data) => {
					result += data
				})
				version.on("exit", (code) => {
					if (code === 0) {
						this.response.result = result.toString()
					} else {
						this.response.error = `Error while getting tag version, exit code: ${code}`
						this.response.result = result.toString()
					}
				})
				resolve(this.response)
			} catch (error: any) {
				throw new Error(`Error while getting tag version: ${error}`)
			}
		})
	}

	private async Create(args?: string): Promise<GitResponseInterface> {
		return new Promise((resolve, reject) => {
			try {
				const create = spawn("git", ["tag", args ?? ""])
				let result: string = ""
				create.stdout.on("data", (data) => {
					result += data
				})
				create.on("exit", (code) => {
					if (code === 0) {
						this.response.result = result.toString()
					} else {
						this.response.error = `Error while creating tag, exit code: ${code}`
						this.response.result = result.toString()
					}
				})
				resolve(this.response)
			} catch (error: any) {
				throw new Error(`Error while creating tag: ${error}`)
			}
		})
	}

	private async Delete(args?: string): Promise<GitResponseInterface> {
		return new Promise((resolve, reject) => {
			try {
				const del = spawn("git", ["tag", "-d", args ?? ""])
				let result: string = ""
				del.stdout.on("data", (data) => {
					result += data
				})
				del.on("exit", (code) => {
					if (code === 0) {
						this.response.result = result.toString()
					} else {
						this.response.error = `Error while deleting tag, exit code: ${code}`
						this.response.result = result.toString()
					}
				})
				resolve(this.response)
			} catch (error: any) {
				throw new Error(`Error while deleting tag: ${error}`)
			}
		})
	}

	private async DeleteRemote(args?: string): Promise<GitResponseInterface> {
		return new Promise((resolve, reject) => {
			try {
				const del = spawn("git", ["push", "--delete", "origin", args ?? ""])
				let result: string = ""
				del.stdout.on("data", (data) => {
					result += data
				})
				del.on("exit", (code) => {
					if (code === 0) {
						this.response.result = result.toString()
					} else {
						this.response.error = `Error while deleting remote tag, exit code: ${code}`
						this.response.result = result.toString()
					}
				})
				resolve(this.response)
			} catch (error: any) {
				throw new Error(`Error while deleting remote tag: ${error}`)
			}
		})
	}
}
