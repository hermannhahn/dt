import { spawn } from "child_process"

export class CommandRunner {
	private command: string
	private promise: any

	constructor(command: string, promise?: string) {
		this.command = command
		this.promise = promise
	}

	async run(): Promise<any> {
		const command = this.command
		const promise = this.promise
		return new Promise((resolve, reject) => {
			const child = spawn(command, {
				shell: true,
				stdio: "inherit",
			})
			child.on("exit", (code: any) => {
				if (code === 0) {
					resolve(promise)
				} else {
					reject(code)
				}
			})
		})
	}
}
