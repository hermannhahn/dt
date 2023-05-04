import * as fs from "fs"
import { Command } from "utils/command-runner"
import { terminal } from "utils/terminal-log"

/**
 * Project module
 * @class
 * @module Project
 * @static
 * import { Project } from "modules/project"
 */
export class Project {
	static async requirements() {
		// Get git root directory
		const rootDir: any = new Command("git rev-parse --show-toplevel").toString()

		// Check if package.json exists
		if (!fs.existsSync(`${rootDir}/package.json`)) {
			terminal.label("red", "error")
			terminal.log(
				"error",
				"package.json not found, run \x1b[1mdt init\x1b[0m command first"
			)
			process.exit(1)
		}
		terminal.label("green", "OK")
	}
}
