import { spawn } from "child_process"

export class CommandRunner {
	private command: string

	constructor(command: string) {
		this.command = command
	}

	run(): Promise<string> {
		return new Promise((resolve, reject) => {
			const [cmd, ...args] = this.command.split(" ")
			const childProcess = spawn(cmd, args, { stdio: "inherit" })

			childProcess.on("error", (err) => {
				console.error(`Erro ao executar comando: ${err}`)
				reject(err)
			})

			childProcess.on("exit", (code, stdio: any) => {
				if (code === 0) {
					resolve(stdio)
				} else {
					const err = new Error(`Erro ao executar comando: ${this.command}`)
					reject(err)
				}
			})
		})
	}
}
