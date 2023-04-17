import { Command } from "utils/command-runner"
import { terminal } from "utils/terminal-log"

export class Npm {
	static install(...packageName: string[]) {
		// Install package
		const install: any = new Command(`npm install ${packageName}`).toString()
		terminal.log("info", install)
	}

	static uninstall(...packageName: string[]) {
		// Uninstall package
		const uninstall: any = new Command(
			`npm uninstall ${packageName}`
		).toString()
		terminal.log("info", uninstall)
	}

	static async requirements() {
		// Check if npm is installed
		terminal.logInline("package", "Checking npm requirements...")
		const npm: any = new Command("npm -v").toString()
		if (npm.includes("not found")) {
			terminal.label("red", "error")
			terminal.log("error", "npm is not installed")
			process.exit(1)
		}
		terminal.label("green", "OK")
	}

	static async checkPackage(packageName: string) {
		// Check if package is installed
		const pkg: any = new Command(`npm list ${packageName}`).toString()
		if (pkg.includes("not found")) {
			return false
		}
		return true
	}
}
