import { spawn } from "child_process"

export class CommandRunner {
	private command: string
	private promise: any

	constructor(command: string, promise?: string) {
		this.command = command
		this.promise = promise
	}

	run(): Promise<any> {
		return new Promise((resolve, reject) => {
			try {
				const [cmd, ...args] = this.command.split(" ")
				spawn(cmd, args, { stdio: this.promise }).on("close", (result: any) => {
					resolve(result)
				})
			} catch (error: any) {
				reject(error)
			}
		})
	}
}
