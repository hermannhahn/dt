import { execSync } from "child_process"

export class Command {
	public error: string | boolean = false
	public result: string = ""

	constructor(command: string, options?: any) {
		try {
			let cmd: any
			if (options) {
				if (options.silent) {
					cmd = execSync(command, {
						stdio: "inherit",
					})
					this.result = cmd
				}
			}
			// Run command
			if (!cmd) {
				cmd = execSync(command, {
					stdio: "pipe",
				})
				this.result = cmd
			}
		} catch (error: any) {
			this.error = error.message
		}
	}

	public toString() {
		return this.result.toString().trim()
	}
}
