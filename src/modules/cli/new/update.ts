import * as fs from "fs"
import { Git } from "libs/git"
import { Cli } from "modules/cli"
import { Project } from "modules/project"
import { Command } from "utils/command-runner"
import { terminal } from "utils/terminal-log"

export const Update = async (opts?: any) => {
	// Git requirements
	terminal.logInline("git", "Checking git requirements...")
	await Git.requirements()

	// Check if git is initialized
	const topLevel: any = new Command("git rev-parse --show-toplevel")
	// If git is not initialized
	if (topLevel.error) {
		if (topLevel.error.includes("not a git repository")) {
			terminal.log(
				"info",
				"Git is not initialized, run \x1b[1mdt init\x1b[0m command first"
			)
			process.exit(1)
		}
	}

	// If current branch is not production branch, exit
	const isProductionBranch: any = Git.isProductionBranch()
	if (!isProductionBranch) {
		terminal.log(
			"error",
			"You are not on production branch, you can only update, update or upgrade production branch"
		)
		process.exit(1)
	}

	// Get git root directory
	const rootDir = new Command("git rev-parse --show-toplevel").toString()

	// Project requirements
	terminal.logInline("info", "Checking project requirements...")
	await Project.requirements()

	// Go to root directory
	process.chdir(rootDir)

	// Get package.json
	const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"))

	// add +1 to update number in version
	const version = packageJson.version.split(".")
	const update = parseInt(version[2]) + 1
	version[2] = update.toString()
	const newVersion = version.join(".")
	terminal.log("success", `New update version: ${newVersion}`)

	// Create new version branch
	terminal.logInline("git", "Creating new version branch...")
	const newVersionBranch = new Command(`git checkout -b ${newVersion}`)
	if (newVersionBranch.error) {
		terminal.label("red", "error")
		terminal.log("error", newVersionBranch.error)
		process.exit(1)
	}
	terminal.label("green", "done")

	// Push changes
	terminal.logInline("git", "Pushing changes...")
	const pushChanges = new Command(`git push origin ${newVersion}`)
	if (pushChanges.error) {
		terminal.label("red", "error")
		terminal.log("error", pushChanges.error)
		process.exit(1)
	}
	terminal.label("green", "done")

	// Update version
	const updateVersion = new Command(`npm version minor`)
	if (updateVersion.error) {
		terminal.log("error", updateVersion.error)
		process.exit(1)
	}

	// Save changes
	const cli = new Cli()
	cli.save()

	// Finish
	terminal.success(`
Update finished!
            
\x1b[1mNow you can use:\x1b[0m
	\x1b[1mdt save\x1b[0m (to save changes)
	\x1b[1mdt deploy\x1b[0m (to deploy changes to production)
`)

	process.exit(0)
}
