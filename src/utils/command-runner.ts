import { spawn } from "child_process"

export class CommandRunner {
	private command: string
	private promise: any

	constructor(command: string, promise?: string) {
		this.command = command
		this.promise = promise
	}

	run(): Promise<string> {
		const [cmd, ...args] = this.command.split(" ")

		const child = spawn(cmd, args, {
			stdio: ["inherit", "pipe", "inherit"],
		})

		return new Promise((resolve, reject) => {
			let output = ""

			child.stdout?.on("data", (data) => {
				output += data
			})

			child.on("error", (error) => {
				reject(error)
			})

			child.on("close", (code) => {
				if (code === 0) {
					resolve(output)
				} else {
					reject(
						new Error(`Command '${this.command}' failed with code ${code}`)
					)
				}
			})
		})
	}
}
