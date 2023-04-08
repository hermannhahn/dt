import { execSync } from "child_process"
import { existsSync, readFileSync } from "fs"
import { terminal } from "./terminal-log"

export class PackageJson {
	private readonly packageJsonPath: string
	public error = false
	public data: any

	constructor(packageJsonPath: string) {
		this.packageJsonPath = packageJsonPath
		try {
			this.data = JSON.parse(readFileSync(this.packageJsonPath, "utf8"))
		} catch (error: any) {
			terminal.debug("error", error)
			this.createPackageJson()
		}
	}

	private createPackageJson() {
		// Check if package.json exists
		if (!existsSync(this.packageJsonPath)) {
			// Create package.json
			try {
				execSync("npm init -y", { stdio: "ignore" })
			} catch (error: any) {
				this.error = error
			}
		}
	}
}
