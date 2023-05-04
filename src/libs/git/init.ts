import { Configure } from "libs/git/configure"
import { Command } from "utils/command-runner"
import { terminal } from "utils/terminal-log"

// Git requirements
export const Init = async () => {
	// Check if git is initialized
	const topLevel: any = new Command("git rev-parse --show-toplevel")
	// If git is not initialized
	if (topLevel.error) {
		if (topLevel.error.includes("not a git repository")) {
			// Initialize git
			const init: any = new Command("git init")
			if (init.error) {
				terminal.error(init.error)
				process.exit(1)
			}
		}
	}
	// Change branch to main
	const setMain: any = new Command("git branch -M main")
	if (setMain.error) {
		terminal.error(setMain.error)
		process.exit(1)
	}

	await Configure()
}
