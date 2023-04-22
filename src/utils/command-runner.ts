import { execSync } from "child_process"

export class Command {
	public error: string | boolean = false
	public result: string = ""

	constructor(command: string, options?: any) {
		try {
			if (options) {
				if (options.silent) {
					const result: any = execSync(command, {
						stdio: "inherit",
					})
					this.result = result
				}
			} else {
				// Run command
				const result: any = execSync(command, {
					stdio: "pipe",
				})
				this.result = result
			}
		} catch (error: any) {
			this.error = error.message
		}
	}

	public toString() {
		return this.result.toString().trim()
	}
}
