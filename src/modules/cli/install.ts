import { Git } from "../../libs/git"
import { terminal } from "../../utils/terminal-log"
import { Project } from "../project"

export const Install = async (opts?: any) => {
	// Start
	terminal.log("package", "Installing requirements and dependencies...")

	// Git requirements
	await Git.requirements()

	// Install requirements
	await Project.installRequirements()

	// Install dependencies
	await Project.installDependencies()

	// Finish
	terminal.success("Requirements and dependencies installed!")
}
