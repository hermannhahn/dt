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
			const [cmd, ...args] = this.command.split(" ")
			const childProcess = spawn(cmd, args, { stdio: this.promise })

			childProcess.on("error", (err) => {
				resolve(err.message)
			})

			childProcess.on("exit", (code, stdio: any) => {
				if (code === 0) {
					resolve(stdio)
				}
				childProcess.kill()
			})
		})
	}
}
