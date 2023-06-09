import { Command } from "../../utils/command-runner"
import { terminal } from "../../utils/terminal-log"
import { Cli } from "../cli"
import { Project } from "../project"

export const Deploy = async (opts?: any) => {
	// Save first
	await Cli.save()

	terminal.log("package", "Starting deployment...")

	// Go to root directory
	const rootDir: any = Project.rootDir()
	process.chdir(rootDir)

	// Check if package.json exists
	await Project.requirements()
	const packageJson = await Project.packageJson()

	// Get version branch name
	const versionBranch = packageJson.version

	// Go to main branch
	terminal.log("git", "Checking out to production branch...")
	const production: any = new Command(`git checkout main`)
	if (production.error) {
		terminal.log("error", production.error)
		process.exit(1)
	}

	// Pull changes
	terminal.logInline("pull", "Pulling changes...")
	const pull: any = new Command(`git pull`)
	if (pull.error) {
		terminal.log("error", pull.error)
		process.exit(1)
	}
	terminal.label("green", "DONE")

	// Merge version branch into main branch
	terminal.logInline(
		"merge",
		`Promoting version ${versionBranch} into production...`
	)
	const merge: any = new Command(`git merge ${versionBranch}`)
	if (merge.error) {
		terminal.log("error", merge.error)
		process.exit(1)
	}
	terminal.label("green", "DONE")

	// Push changes
	terminal.logInline("push", "Pushing changes...")
	const pushProduction: any = new Command(`git push`)
	if (pushProduction.error) {
		terminal.log("error", pushProduction.error)
		process.exit(1)
	}
	terminal.label("green", "DONE")

	// Go to version branch
	terminal.logInline("git", "Checking out to version branch...")
	const version: any = new Command(`git checkout ${versionBranch}`)
	if (version.error) {
		terminal.log("error", version.error)
		process.exit(1)
	}
	terminal.label("green", "DONE")

	// Save version
	await Cli.save()

	if (opts?.npm) {
		// Publish release on npm
		terminal.logInline("npm", "Publishing release on npm...")
		const publish: any = new Command(`npm publish`)
		if (publish.error) {
			terminal.log("error", publish.error)
			process.exit(1)
		}
	}

	// Inform result
	terminal.log("success", `Successfully deployed version ${versionBranch}!`)
}
