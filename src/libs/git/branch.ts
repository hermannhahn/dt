import { spawn } from "child_process"
import { GitResponse, GitResponseInterface } from "types/git"

export class Branch {
	public status = this.Status
	public list = this.List
	public name = this.Name
	public create = this.Create
	public delete = this.Delete
	public deleteRemote = this.DeleteRemote

	private async Status(): Promise<GitResponseInterface> {
		const status = spawn("git", ["status"])
		return new Promise((resolve, reject) => {
			try {
				let result: string = ""
				status.stdout.on("data", (data) => {
					result += data
				})
				status.on("exit", (code) => {
					if (code === 0) {
						if (result.includes("nothing to commit")) {
							const response: GitResponse = {
								error: "All files are up to date!",
								result: result.toString(),
							}
							resolve(response)
						}
						const response: GitResponse = {
							error: false,
							result: result.toString(),
						}
						resolve(response)
					} else {
						const response: GitResponse = {
							error: `Error while getting status, exit code: ${code}`,
							result: result.toString(),
						}
						resolve(response)
					}
				})
			} catch (error: any) {
				throw new Error(`Error while getting status: ${error}`)
			}
		})
	}

	private async List(): Promise<GitResponseInterface> {
		const list = spawn("git", ["branch", "-a"])
		return new Promise((resolve, reject) => {
			try {
				let result: string = ""
				list.stdout.on("data", (data) => {
					result += data
				})
				list.on("exit", (code) => {
					if (code === 0) {
						const response: GitResponse = {
							error: false,
							result: result.toString(),
						}
						resolve(response)
					} else {
						const response: GitResponse = {
							error: `Error while getting list, exit code: ${code}`,
							result: result.toString(),
						}
						resolve(response)
					}
				})
			} catch (error: any) {
				throw new Error(`Error while getting list: ${error}`)
			}
		})
	}

	private async Name(): Promise<GitResponseInterface> {
		const name = spawn("git", ["rev-parse", "--abbrev-ref", "HEAD"])
		return new Promise((resolve, reject) => {
			try {
				let result: string = ""
				name.stdout.on("data", (data) => {
					result += data
				})
				name.on("exit", (code) => {
					if (code === 0) {
						const response: GitResponse = {
							error: false,
							result: result.toString(),
						}
						resolve(response)
					} else {
						const response: GitResponse = {
							error: `Error while getting name, exit code: ${code}`,
							result: result.toString(),
						}
						resolve(response)
					}
				})
			} catch (error: any) {
				throw new Error(`Error while getting name: ${error}`)
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
						const response: GitResponse = {
							error: false,
							result: result.toString(),
						}
						resolve(response)
					} else {
						const response: GitResponse = {
							error: `Error while creating branch, exit code: ${code}`,
							result: result.toString(),
						}
						resolve(response)
					}
				})
			} catch (error: any) {
				throw new Error(`Error while creating branch: ${error}`)
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
						const response: GitResponse = {
							error: false,
							result: result.toString(),
						}
						resolve(response)
					} else {
						const response: GitResponse = {
							error: `Error while deleting branch, exit code: ${code}`,
							result: result.toString(),
						}
						resolve(response)
					}
				})
			} catch (error: any) {
				throw new Error(`Error while deleting branch: ${error}`)
			}
		})
	}

	private async DeleteRemote(branch: string): Promise<GitResponseInterface> {
		const del = spawn("git", ["push", "origin", "--delete", branch])
		return new Promise((resolve, reject) => {
			try {
				let result: string = ""
				del.stdout.on("data", (data) => {
					result += data
				})
				del.on("exit", (code) => {
					if (code === 0) {
						const response: GitResponse = {
							error: false,
							result: result.toString(),
						}
						resolve(response)
					} else {
						const response: GitResponse = {
							error: `Error while deleting remote branch, exit code: ${code}`,
							result: result.toString(),
						}
						resolve(response)
					}
				})
			} catch (error: any) {
				throw new Error(`Error while deleting remote branch: ${error}`)
			}
		})
	}
}
