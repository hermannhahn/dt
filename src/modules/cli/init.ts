import { terminal } from "../../utils/terminal-log"
import { Cli } from "../cli"
import { Project } from "../project"

export const Init = async (opts?: any) => {
	// Start
	terminal.log("package", "Initializing new project...")

	// Init Project
	await Project.init()

	// Save project
	await Cli.save({ force: true })

	// First patch
	await Cli.new.patch()

	// Finish
	terminal.success("New project initialized!")
}
