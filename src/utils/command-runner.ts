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
			spawn(cmd, args, { stdio: this.promise }).stdout.on(
				"data",
				(data: any) => {
					console.log(data.toString())
				}
			)
		} catch (error: any) {
			return error
		}
	}
}
