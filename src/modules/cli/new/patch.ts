import { Command } from "../../../utils/command-runner"
import { terminal } from "../../../utils/terminal-log"
import { Cli } from "../../cli"
import { Project } from "../../project"

export const Patch = async (opts?: any) => {
	// Save changes
	//await Cli.save(opts)

	// Go to root directory
	const rootDir: any = Project.rootDir()
	process.chdir(rootDir)

	// Get package.json
	const packageJson = await Project.packageJson()

	// Get current version
	const currentVersion = packageJson.version

	// Predict new version
	const version = packageJson.version
	let major = int(version[0])
	let minor = int(version[2])
	let patch = int(version[4]) + 1
	const newVersion = `${major}.${minor}.${patch}`

	// Create new branch
	terminal.logInline("branch", "Creating new version branch...")
	const branch: any = new Command(`git checkout -b ${newVersion}`)
	if (branch.error) {
		terminal.error(branch.error)
		process.exit(1)
	}
	terminal.label("cyan", "CREATED")

	// Update version
	terminal.logInline("update", "Updating version...")
	const update: any = new Command(`npm version ${newVersion}`)
	if (update.error) {
		terminal.error(update.error)
		process.exit(1)
	}
	terminal.label("cyan", "UPDATED")

	// Save changes
	await Cli.save(opts)

	// Print old and new version
	terminal.log("version", `Project version patch created`)
	terminal.log("version", `Old version: ${currentVersion}`)
	terminal.log("version", `New version: ${newVersion}`)
	terminal.log("version", `Run \x1b[1mdt save\x1b[0m to save changes`)
	terminal.log("version", `Run \x1b[1mdt deploy\x1b[0m to publish changes`)
}

const int = (str: string) => {
	return parseInt(str, 10)
}
