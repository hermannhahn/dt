import { Cli } from "modules/cli"
import { Project } from "modules/project"
import { Command } from "utils/command-runner"
import { terminal } from "utils/terminal-log"

export const Deploy = async (opts?: any) => {
	// Save first
	await Cli.save(opts)

	terminal.log("package", "Starting deployment...")

	// Get git root directory
	const rootDir: any = Project.rootDir()

	// Check if package.json exists
	await Project.requirements()
	const packageJson = await Project.packageJson()

	// Get version branch name
	const versionBranch = packageJson.version
	terminal.debug("Version branch:", versionBranch)

	// Go to root directory
	process.chdir(rootDir)

	// Go to main branch
	terminal.log("git", "Checking out to production branch...")
	const production: any = new Command(
		`git checkout ${packageJson.repository.branches.production}`
	)
	if (production.error) {
		terminal.log("error", production.error)
		process.exit(1)
	}

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
	terminal.label("green", "done")

	// Push changes
	terminal.logInline("push", "Pushing changes...")
	const pushProduction: any = new Command(`git push`)
	if (pushProduction.error) {
		terminal.log("error", pushProduction.error)
		process.exit(1)
	}
	terminal.label("green", "done")

	// Back to version branch
	terminal.logInline("search", "Checking out to version branch...")
	const version: any = new Command(`git checkout ${versionBranch}`)
	if (version.error) {
		terminal.log("error", version.error)
		process.exit(1)
	}
	terminal.label("green", "done")

	// Inform result
	terminal.log("success", "Project deployed successfully")
}
