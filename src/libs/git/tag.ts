import { spawn } from "child_process"
import { GitResponse, GitResponseInterface } from "types/git"

export class Tag {
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
						const response: GitResponse = {
							error: false,
							result: result.toString(),
						}
						resolve(response)
					} else {
						const response: GitResponse = {
							error: `Error while getting tag list, exit code: ${code}`,
							result: result.toString(),
						}
						resolve(response)
					}
				})
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
						const response: GitResponse = {
							error: false,
							result: result.toString(),
						}
						resolve(response)
					} else {
						const response: GitResponse = {
							error: `Error while getting tag version, exit code: ${code}`,
							result: result.toString(),
						}
						resolve(response)
					}
				})
			} catch (error: any) {
				throw new Error(`Error while getting tag version: ${error}`)
			}
		})
	}

	private async Create(tag: string): Promise<GitResponseInterface> {
		return new Promise((resolve, reject) => {
			try {
				const create = spawn("git", ["tag", tag])
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
							error: `Error while creating tag, exit code: ${code}`,
							result: result.toString(),
						}
						resolve(response)
					}
				})
			} catch (error: any) {
				throw new Error(`Error while creating tag ${tag}: ${error}`)
			}
		})
	}

	private async Delete(tag: string): Promise<GitResponseInterface> {
		return new Promise((resolve, reject) => {
			try {
				const del = spawn("git", ["tag", "-d", tag])
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
							error: `Error while deleting tag, exit code: ${code}`,
							result: result.toString(),
						}
						resolve(response)
					}
				})
			} catch (error: any) {
				throw new Error(`Error while deleting tag ${tag}: ${error}`)
			}
		})
	}

	private async DeleteRemote(tag: string): Promise<GitResponseInterface> {
		return new Promise((resolve, reject) => {
			try {
				const del = spawn("git", ["push", "origin", "--delete", tag])
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
							error: `Error while deleting remote tag, exit code: ${code}`,
							result: result.toString(),
						}
						resolve(response)
					}
				})
			} catch (error: any) {
				throw new Error(`Error while deleting remote tag ${tag}: ${error}`)
			}
		})
	}
}
