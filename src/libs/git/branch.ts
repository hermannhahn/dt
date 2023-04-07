import { spawn } from "child_process"
import { GitResponse, GitResponseInterface } from "types/git"

export class Branch {
	private response = new GitResponse(false, "")
	public status = this.Status
	public list = this.List
	public name = this.Name
	public create = this.Create
	public delete = this.Delete
	public deleteRemote = this.DeleteRemote

	private async Status(args?: string): Promise<GitResponseInterface> {
		const status = spawn("git", ["status", args ?? ""])
		return new Promise((resolve, reject) => {
			try {
				let result: string = ""
				status.stdout.on("data", (data) => {
					result += data
				})
				status.on("exit", (code) => {
					if (code === 0) {
						this.response.error = false
						this.response.result = result.toString()
						resolve(this.response)
					} else {
						const error = new Error(
							`Error while getting status, exit code: ${code}`
						)
						this.response.error = error
						this.response.result = result.toString()
						reject(this.response)
					}
				})
			} catch (error: any) {
				error = new Error(`Error while getting status: ${error}`)
				this.response.error = error
				this.response.result = ""
				reject(this.response)
			}
		})
	}
	private async List(): Promise<GitResponseInterface> {
		const list = spawn("git", ["branch"])
		return new Promise((resolve, reject) => {
			try {
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
							`Error while getting branch list, exit code: ${code}`
						)
						this.response.error = error
						this.response.result = result.toString()
						reject(this.response)
					}
				})
			} catch (error: any) {
				error = new Error(`Error while getting branch list: ${error}`)
				this.response.error = error
				this.response.result = ""
				reject(this.response)
			}
		})
	}
	private async Name(): Promise<GitResponseInterface> {
		const name = spawn("git", ["rev-parse", "--abbrev-ref", "HEAD"])
		return new Promise((resolve, reject) => {
			try {
				let result = ""
				name.stdout.on("data", (data) => {
					result += data
				})
				name.on("exit", (code) => {
					if (code === 0) {
						this.response.error = false
						this.response.result = result.toString()
						resolve(this.response)
					} else {
						const error = new Error(
							`Error while getting branch name, exit code: ${code}`
						)
						this.response.error = error
						this.response.result = result.toString()
						reject(this.response)
					}
				})
			} catch (error: any) {
				error = new Error(`Error while getting branch name: ${error}`)
				this.response.error = error
				this.response.result = ""
				reject(this.response)
			}
		})
	}
	private async Create(branch: string): Promise<GitResponseInterface> {
		const create = spawn("git", ["branch", branch])
		return new Promise((resolve, reject) => {
			try {
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
							`Error while creating branch ${branch}, exit code: ${code}`
						)
						this.response.error = error
						this.response.result = result.toString()
						reject(this.response)
					}
				})
			} catch (error: any) {
				error = new Error(`Error while creating branch ${branch}: ${error}`)
				this.response.error = error
				this.response.result = ""
				reject(this.response)
			}
		})
	}
	private async Delete(branch: string): Promise<GitResponseInterface> {
		const del = spawn("git", ["branch", "-d", branch])
		return new Promise((resolve, reject) => {
			try {
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
							`Error while deleting branch ${branch}, exit code: ${code}`
						)
						this.response.error = error
						this.response.result = result.toString()
						reject(this.response)
					}
				})
			} catch (error: any) {
				error = new Error(`Error while deleting branch ${branch}: ${error}`)
				this.response.error = error
				this.response.result = ""
				reject(this.response)
			}
		})
	}
	private async DeleteRemote(branch: string): Promise<GitResponseInterface> {
		const delRemote = spawn("git", ["push", "origin", "--delete", branch])
		return new Promise((resolve, reject) => {
			try {
				let result: string = ""
				delRemote.stdout.on("data", (data) => {
					result += data
				})
				delRemote.on("exit", (code) => {
					if (code === 0) {
						this.response.error = false
						this.response.result = result.toString()
						resolve(this.response)
					} else {
						const error = new Error(
							`Error while deleting remote branch ${branch}, exit code: ${code}`
						)
						this.response.error = error
						this.response.result = result.toString()
						reject(this.response)
					}
				})
			} catch (error: any) {
				error = new Error(
					`Error while deleting remote branch ${branch}: ${error}`
				)
				this.response.error = error
				this.response.result = ""
				reject(this.response)
			}
		})
	}
}
