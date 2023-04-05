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
			const childProcess = spawn(cmd, args, { stdio: this.promise })
			return childProcess.stdout
		} catch (error: any) {
			return error
		}
	}
}
