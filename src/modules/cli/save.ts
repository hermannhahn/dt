import * as fs from "fs"
import { Git } from "libs/git"
import { Project } from "modules/project"
import { Command } from "utils/command-runner"
import { terminal } from "utils/terminal-log"

export const Save = async (opts?: any) => {
	terminal.log("save", "Saving changes...")

	// Git requirements
	await Git.requirements()

	// Check if git is initialized
	const topLevel: any = new Command("git rev-parse --show-toplevel")
	// If git is not initialized
	if (topLevel.error) {
		if (topLevel.error.includes("not a git repository")) {
			terminal.log(
				"warn",
				"Git is not initialized, run \x1b[1mdt init\x1b[0m command first"
			)
			process.exit(1)
		}
	}

	// Get git root directory
	const rootDir: any = new Command("git rev-parse --show-toplevel").toString()

	// Project requirements
	terminal.logInline("package", "Checking project requirements...")
	await Project.requirements()

	// Get packageJson
	const packageJson = JSON.parse(
		fs.readFileSync(`${rootDir}/package.json`, "utf8")
	)

	// Go to root directory
	process.chdir(rootDir)

	// Branch Guard
	await Git.branchGuard()

	// GPG requirements
	await Git.gpgRequirements()

	// Get status
	terminal.logInline("search", "Searching for changes...")
	const status: any = new Command(`git status --porcelain`)
	if (status.error) {
		terminal.log("error", status.error)
		process.exit(1)
	}
	// If there are changes, get list of changed files
	if (status.result) {
		terminal.label("orange", "found")

		// Get list of changed files
		const changedFiles = status.toString().split(" ")
		// Print list of changed files
		terminal.log("file", "Changed files:")
		changedFiles.forEach((file: any) => {
			terminal.log("file", file)
		})
	} else {
		terminal.label("green", "none")
		terminal.success("All files are up to date")
		process.exit(0)
	}

	// Add all files to git
	terminal.log("info", "Adding changes to git...")
	const add: any = new Command(`git add .`)
	if (add.error) {
		terminal.log("error", add.error)
		process.exit(1)
	}
	terminal.success("Changes added")

	// Commit changes
	terminal.logInline("password", "Waiting for signature passphrase...")
	const commit: any = new Command(`git commit -S -m "${packageJson.version}"`)
	if (commit.error) {
		terminal.label("green", "invalid")
		terminal.log("error", commit.error)
		process.exit(1)
	}
	terminal.label("green", "signed")
	terminal.logInline("sign", "Commiting changes...")
	await new Promise((resolve) => setTimeout(resolve, 1000))
	terminal.label("green", "done")

	// Push changes
	terminal.logInline("info", "Pushing changes...")
	const push: any = new Command(`git push`)
	if (push.error) {
		terminal.log("error", push.error)
		process.exit(1)
	}
	terminal.label("green", "done")

	// Push tags
	terminal.logInline("info", "Pushing tags...")
	const pushTags: any = new Command(`git push --tags`)
	if (pushTags.error) {
		terminal.log("error", pushTags.error)
		process.exit(1)
	}
	terminal.label("green", "done")
	terminal.log("success", "Changes saved")
	process.exit(0)
}
