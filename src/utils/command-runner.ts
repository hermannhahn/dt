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

		let output = ""

		child.stdout?.on("data", (data) => {
			output += data
		})

		child.on("error", (error) => {
			return error
		})

		child.on("close", (code) => {
			return output
		})
	}
}
