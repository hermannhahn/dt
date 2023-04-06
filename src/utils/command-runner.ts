import { spawn } from "child_process"

export class CommandRunner {
	private command: string
	private promise: any

	constructor(command: string, promise?: string) {
		this.command = command
		this.promise = promise
	}

	async run(): Promise<any> {
		const [cmd, ...args] = this.command.split(" ")

		const child = spawn(cmd, args, {
			stdio: ["inherit", "pipe", "inherit"],
		})

		// Return command result
		return new Promise((resolve, reject) => {
			let result = ""
			child.stdout.on("data", (data) => {
				result += data.toString()
			})
			child.on("close", () => {
				resolve(result)
			})
		})
	}
}
