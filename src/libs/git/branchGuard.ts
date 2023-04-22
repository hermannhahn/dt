import { protectedBranches } from "libs/git/protectedBranches"
import { Command } from "utils/command-runner"
import { terminal } from "utils/terminal-log"

// Git requirements
export const branchGuard = async () => {
	// Check if is main or master branch
	const branch: any = new Command("git branch --show-current")
	if (branch.error) {
		terminal.error(branch.error)
		process.exit(1)
	}
	if (protectedBranches.includes(branch.toString())) {
		terminal.log("error", "You cannot save changes on production branch.")
		console.log(`

If you want update production branch, use \x1b[1mdt deploy\x1b[0m command" on version branch.

\x1b[1mExample:\x1b[0m
\x1b[1mdt new patch\x1b[0m (create new patch version)
\x1b[1mdt save\x1b[0m (save changes)
\x1b[1mdt deploy\x1b[0m (deploy new version to production branch)
`)
		process.exit(1)
	}
}
