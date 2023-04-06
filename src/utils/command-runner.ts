import { spawn } from "child_process"

export class CommandRunner {
	private command: string
	private promise: any

	constructor(command: string, promise?: string) {
		this.command = command
		this.promise = promise
	}

	async run(): Promise<any> {
		try {
			const [cmd, ...args] = this.command.split(" ")
			const result = spawn(cmd, args, { stdio: this.promise })

			let output = ""

			result.stdout.on("data", (data) => {
				output += data.toString()
			})

			return new Promise((resolve, reject) => {
				result.on("close", (code) => {
					if (code !== 0) {
						reject(output.trim())
						return
					}
					resolve(output.trim())
				})
			})
		} catch (error: any) {
			return
		}
	}
}
