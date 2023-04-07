import { spawn } from "child_process"
import { GitResponse, GitResponseInterface } from "types/git"

export class Branch {
	private response = new GitResponse(false, "No changes found")
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
						this.response.result = result.toString()
					} else {
						this.response.error = `Error while getting status, exit code: ${code}`
						this.response.result = result.toString()
					}
				})
				resolve(this.response)
			} catch (error: any) {
				throw new Error(`Error while getting status: ${error}`)
			}
		})
	}

	private async List(args?: string): Promise<GitResponseInterface> {
		const branch = spawn("git", ["branch", args ?? ""])
		return new Promise((resolve, reject) => {
			try {
				let result: string = ""
				branch.stdout.on("data", (data) => {
					result += data
				})
				branch.on("exit", (code) => {
					if (code === 0) {
						this.response.result = result.toString()
					} else {
						this.response.error = `Error while getting branch list, exit code: ${code}`
						this.response.result = result.toString()
					}
				})
				resolve(this.response)
			} catch (error: any) {
				throw new Error(`Error while getting branch list: ${error}`)
			}
		})
	}

	private async Name(args?: string): Promise<GitResponseInterface> {
		const branch = spawn("git", ["branch", args ?? ""])
		return new Promise((resolve, reject) => {
			try {
				let result: string = ""
				branch.stdout.on("data", (data) => {
					result += data
				})
				branch.on("exit", (code) => {
					if (code === 0) {
						this.response.result = result.toString()
					} else {
						this.response.error = `Error while getting branch name, exit code: ${code}`
						this.response.result = result.toString()
					}
				})
				resolve(this.response)
			} catch (error: any) {
				throw new Error(`Error while getting branch name: ${error}`)
			}
		})
	}

	private async Create(args?: string): Promise<GitResponseInterface> {
		const branch = spawn("git", ["branch", args ?? ""])
		return new Promise((resolve, reject) => {
			try {
				let result: string = ""
				branch.stdout.on("data", (data) => {
					result += data
				})
				branch.on("exit", (code) => {
					if (code === 0) {
						this.response.result = result.toString()
					} else {
						this.response.error = `Error while creating branch, exit code: ${code}`
						this.response.result = result.toString()
					}
				})
				resolve(this.response)
			} catch (error: any) {
				throw new Error(`Error while creating branch: ${error}`)
			}
		})
	}

	private async Delete(args?: string): Promise<GitResponseInterface> {
		const branch = spawn("git", ["branch", args ?? ""])
		return new Promise((resolve, reject) => {
			try {
				let result: string = ""
				branch.stdout.on("data", (data) => {
					result += data
				})
				branch.on("exit", (code) => {
					if (code === 0) {
						this.response.result = result.toString()
					} else {
						this.response.error = `Error while deleting branch, exit code: ${code}`
						this.response.result = result.toString()
					}
				})
				resolve(this.response)
			} catch (error: any) {
				throw new Error(`Error while deleting branch: ${error}`)
			}
		})
	}

	private async DeleteRemote(args?: string): Promise<GitResponseInterface> {
		const branch = spawn("git", ["branch", args ?? ""])
		return new Promise((resolve, reject) => {
			try {
				let result: string = ""
				branch.stdout.on("data", (data) => {
					result += data
				})
				branch.on("exit", (code) => {
					if (code === 0) {
						this.response.result = result.toString()
					} else {
						this.response.error = `Error while deleting remote branch, exit code: ${code}`
						this.response.result = result.toString()
					}
				})
				resolve(this.response)
			} catch (error: any) {
				throw new Error(`Error while deleting remote branch: ${error}`)
			}
		})
	}
}
