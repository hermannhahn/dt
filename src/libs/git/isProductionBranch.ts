import { Command } from "../../utils/command-runner"
import { terminal } from "../../utils/terminal-log"
import { protectedBranches } from "./protectedBranches"

// Git requirements
export const isProductionBranch = () => {
	// Check if is main or master branch
	const branch: any = new Command("git branch --show-current")
	if (branch.error) {
		terminal.error(branch.error)
		process.exit(1)
	}
	if (protectedBranches.includes(branch.toString())) {
		return true
	}
	return false
}
