import { Git } from "libs/git"
import { Project } from "modules/project"
import { Command } from "utils/command-runner"
import { terminal } from "utils/terminal-log"

export const Upgrade = async (opts?: any) => {
	// Git requirements
	await Git.requirements()

	// Project requirements
	await Project.requirements()

	// Upgrade version
	const upgradeVersion = new Command(`npm version major`)
	if (upgradeVersion.error) {
		terminal.log("error", upgradeVersion.error)
		process.exit(1)
	}

	// Get package.json
	const packageJson: any = Project.packageJson()

	// Create new version branch
	terminal.logInline("git", "Creating new version branch...")
	const newVersionBranch = new Command(`git checkout -b ${packageJson.version}`)
	if (newVersionBranch.error) {
		terminal.label("red", "error")
		terminal.log("error", newVersionBranch.error)
		process.exit(1)
	}
	terminal.label("green", "DONE")

	// Push changes
	terminal.logInline("git", "Pushing changes...")
	const pushChanges = new Command(
		`git push --set-upstream origin ${packageJson.version}`
	)
	if (pushChanges.error) {
		terminal.label("red", "error")
		terminal.log("error", pushChanges.error)
		process.exit(1)
	}
	terminal.label("green", "DONE")

	// Finish
	terminal.success("New upgrade created!")
}
