import * as fs from "fs"
import { Git } from "libs/git"
import { Project } from "modules/project"
import { Command } from "utils/command-runner"
import { terminal } from "utils/terminal-log"

export const Deploy = async (opts?: any) => {
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

	// Get version branch name
	const versionBranch = packageJson.version

	// Go to root directory
	process.chdir(rootDir)

	// Branch Guard
	terminal.logInline("lock", "Getting branch guard authorization...")
	await Git.branchGuard()

	// GPG requirements
	terminal.logInline("sign", "Checking GPG requirements...")
	await Git.gpgRequirements()

	// Go to main branch
	terminal.logInline("search", "Checking out to production branch...")
	const production: any = new Command(
		`git checkout ${packageJson.production.branch}`
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
	terminal.logInline("info", "Pushing changes...")
	const pushProduction: any = new Command(`git push`)
	if (pushProduction.error) {
		terminal.log("error", pushProduction.error)
		process.exit(1)
	}

	// Patch version
	terminal.logInline("info", "Patching version...")
	const patch: any = new Command(`dt version patch`)
	if (patch.error) {
		terminal.log("error", patch.error)
		process.exit(1)
	}

	// Inform result
	terminal.log("success", "Project deployed successfully")
}
