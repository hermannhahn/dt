import * as fs from "fs"
import { Git } from "libs/git"
import { Project } from "modules/project"
import { Command } from "utils/command-runner"
import { terminal } from "utils/terminal-log"

export const Update = async (opts: any) => {
	// Git requirements
	terminal.logInline("git", "Checking git requirements...")
	await Git.requirements()

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

	// Update version
	const updateVersion = new Command(`npm version minor`)
	if (updateVersion.error) {
		terminal.log("error", updateVersion.error)
		process.exit(1)
	}

	// Get package.json
	const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"))

	// Get new version
	const newVersion = packageJson.version
	terminal.log("success", `New patch version: ${newVersion}`)

	// Create new version branch
	terminal.logInline("git", "Creating new version branch...")
	const newVersionBranch = new Command(`git checkout -b v${newVersion}`)
	if (newVersionBranch.error) {
		terminal.label("red", "error")
		terminal.log("error", newVersionBranch.error)
		process.exit(1)
	}
	terminal.label("green", "done")

	// Push changes
	terminal.logInline("git", "Pushing changes...")
	const pushChanges = new Command(`git push origin v${newVersion}`)
	if (pushChanges.error) {
		terminal.label("red", "error")
		terminal.log("error", pushChanges.error)
		process.exit(1)
	}
	terminal.label("green", "done")

	// Finish
	terminal.success(`
Update finished!
            
\x1b[1mNow you can use:\x1b[0m
	\x1b[1mdt save\x1b[0m (to save changes)
	\x1b[1mdt deploy\x1b[0m (to deploy changes to production)
`)

	process.exit(0)
}
