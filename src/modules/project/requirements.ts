import * as fs from "fs"
import { Command } from "../../utils/command-runner"
import { terminal } from "../../utils/terminal-log"

export const Requirements = async () => {
	// Get git root directory
	const rootDir: any = new Command("git rev-parse --show-toplevel").toString()

	// Check if package.json exists
	if (!fs.existsSync(`${rootDir}/package.json`)) {
		terminal.error(
			"package.json not found, run \x1b[1mdt init\x1b[0m command first"
		)
		process.exit(1)
	}
}
