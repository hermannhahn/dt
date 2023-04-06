import { spawn } from "child_process"

export class CommandRunner {
	async run(command: any): Promise<any> {
		return new Promise((resolve, reject) => {
			const child = spawn(command, {
				shell: true,
				stdio: "inherit",
			})
			child.on("exit", (code: any) => {
				child.kill()
			})
			child.on("error", (error: any) => {
				reject(error)
			})
			child.on("close", (code: any) => {
				resolve(code)
			})
		})
	}
}
