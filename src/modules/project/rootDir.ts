import { Command } from "utils/command-runner"
import { terminal } from "utils/terminal-log"

export const RootDir = () => {
	// Get git root directory
	const rootDir = new Command("git rev-parse --show-toplevel")
	if (rootDir.error) {
		terminal.error(rootDir.error)
		process.exit(1)
	}
	return rootDir.toString()
}
