import { spawn } from "child_process"

export class CommandRunner {
	private command: string
	private promise: any

	constructor(command: string, promise?: string) {
		this.command = command
		this.promise = promise
	}

	run(): Promise<string> {
		return new Promise((resolve, reject) => {
			const [cmd, ...args] = this.command.split(" ")
			const process = spawn(cmd, args, { stdio: this.promise })

			let output = ""

			process.stdout.on("data", (data) => {
				output += data.toString()
			})

			process.stderr.on("data", (data) => {
				output += data.toString()
			})

			process.on("close", (code) => {
				if (code === 0) {
					resolve(output.trim())
				} else {
					reject(
						new Error(`Command '${this.command}' exited with code ${code}`)
					)
				}
			})

			process.on("error", (err) => {
				reject(new Error(`Failed to start command '${this.command}': ${err}`))
			})
		})
	}
}
