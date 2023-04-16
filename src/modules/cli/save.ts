import * as fs from "fs"
import { Git } from "libs/git"
import { Project } from "modules/project"
import { Command } from "utils/command-runner"
import { terminal } from "utils/terminal-log"

export const Save = async (opts: any) => {
	terminal.log("info", "Saving changes...")

	// Git requirements
	terminal.logInline("git", "Checking git requirements...")
	await Git.requirements()

	// Get git root directory
	const rootDir: any = new Command("git rev-parse --show-toplevel").toString()

	// Project requirements
	terminal.logInline("info", "Checking project requirements...")
	await Project.requirements()

	// Get packageJson
	const packageJson = JSON.parse(
		fs.readFileSync(`${rootDir}/package.json`, "utf8")
	)

	// Go to root directory
	process.chdir(rootDir)

	// Branch Guard
	terminal.logInline("lock", "Getting branch guard authorization...")
	await Git.branchGuard()

	// GPG requirements
	terminal.logInline("sign", "Checking GPG requirements...")
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
		const changedFiles = status.result.split(" ")
		// Print list of changed files
		terminal.log("info", "Changed files:")
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
