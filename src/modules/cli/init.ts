import * as fs from "fs"
import { Git } from "libs/git"
import { Cli } from "modules/cli"
import { Command } from "utils/command-runner"
import { terminal } from "utils/terminal-log"

const prompts = require("prompts")

export const Init = async (opts: any) => {
	// Git requirements
	await Git.requirements()

	// Check if git is initialized
	const topLevel: any = new Command("git rev-parse --show-toplevel")
	// If git is not initialized
	if (topLevel.error) {
		if (topLevel.error.includes("not a git repository")) {
			// Initialize git
			const init: any = new Command("git init")
			if (init.error) {
				terminal.log("error", init.error)
				process.exit(1)
			}
			terminal.log("success", init.result)
		}
	}

	// GPG requirements
	await Git.gpgRequirements()

	// Get git root directory
	const rootDir = new Command("git rev-parse --show-toplevel")

	// Check if package.json exists with fs
	const existPackageJson = fs.existsSync(`${rootDir}/package.json`)
	// If package.json does not exist, initialize project
	if (!existPackageJson) {
		// Initialize project
		const init: any = new Command("npm init -y")
		if (init.error) {
			terminal.error(init.error)
			process.exit(1)
		}
		// Change version to 0.0.0
		const version: any = new Command("npm version 0.0.0")
		if (version.error) {
			terminal.error(version.error)
			process.exit(1)
		}
	}

	// Create README.md if it does not exist
	if (!fs.existsSync(`${rootDir}/README.md`)) {
		fs.writeFileSync(`${rootDir}/README.md`, "# README")
	}

	// Add all files
	const add: any = new Command("git add .")
	if (add.error) {
		terminal.log("error", add.error)
		process.exit(1)
	}

	// Commit
	const commit: any = new Command("git commit -S -m 0.0.0")
	if (commit.error) {
		terminal.log("error", commit.error)
		process.exit(1)
	}

	// Change branch to main
	const setMain: any = new Command("git branch -M main")
	if (setMain.error) {
		terminal.log("error", setMain.error)
		process.exit(1)
	}

	// Check if has remote origin
	const remote: any = new Command("git remote get-url origin")
	if (remote.error) {
		// Ask for remote origin
		const remoteOrigin = await prompts({
			type: "text",
			name: "answer",
			message: "Type the repository url:",
		})
		// Set remote origin
		const setRemote: any = new Command(
			`git remote add origin ${remoteOrigin.answer}`
		)
		if (setRemote.error) {
			terminal.log("error", setRemote.error)
			process.exit(1)
		}
	}

	// Push to remote origin
	const push: any = new Command("git push -u origin main")
	if (push.error) {
		terminal.log("error", push.error)
		process.exit(1)
	}

	// Push tags
	const pushTags: any = new Command("git push --tags")
	if (pushTags.error) {
		terminal.log("error", pushTags.error)
		process.exit(1)
	}

	const cli = new Cli()

	// Patch project
	cli.new.patch()

	terminal.success("New project initialized!")
}
