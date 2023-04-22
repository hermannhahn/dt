import * as fs from "fs"
import { Git } from "libs/git"
import { Project } from "modules/project"
import { Command } from "utils/command-runner"
import { terminal } from "utils/terminal-log"

const prompts = require("prompts")

export const Init = async () => {
	// Initialize git
	Git.init()

	// Check if has remote origin
	const remote: any = new Command("git remote get-url origin")
	if (remote.error) {
		// Ask for remote origin
		const remoteOrigin = await prompts({
			type: "text",
			name: "answer",
			message: "Enter the url of an empty repository:",
		})
		// Set remote origin
		const setRemote: any = new Command(
			`git remote add origin ${remoteOrigin.answer}`
		)
		if (setRemote.error) {
			terminal.error(setRemote.error)
			process.exit(1)
		}
	}

	// Get git root directory
	const rootDir = Project.rootDir()

	// Init package.json
	if (!fs.existsSync(`${rootDir}/package.json`)) {
		const init = new Command("npm init -y")
		if (init.error) {
			terminal.error(init.error)
			process.exit(1)
		}

		// Reset version to 0.0.0 (use sed)
		const resetVersion: any = new Command(
			'sed -i \'s/"version": "1.0.0"/"version": "0.0.0"/g\' ' +
				`${rootDir}/package.json`
		)
		if (resetVersion.error) {
			terminal.error(resetVersion.error)
			process.exit(1)
		}
	}

	await Project.defaultFiles()
}
