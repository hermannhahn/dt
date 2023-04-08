import { program } from "@commander-js/extra-typings"
import { Git } from "libs/git"
import { GitResponse } from "types/git"
import { PackageJson } from "utils/package-manager"
import { terminal } from "utils/terminal-log"

const git = new Git()

export const Init = async () => {
	program
		.command("init")
		.option("-y, --yes", "skip questions")
		.option("-t, --template <name>", "template name")
		.description("initialize project")
		.action(async (opts, cmd) => {
			try {
				// Check if git is initialized
				const gitStatus: GitResponse = await git.status()
				if (gitStatus.error) {
					terminal.log("error", "Git is not initialized!")
					process.exit(1)
				}
				// Get git root directory
				const gitTopLevel: GitResponse = await git.topLevel()
				const rootDir = gitTopLevel.result

				// Check if package.json exists
				const packageJson: any = new PackageJson(`${rootDir}/package.json`)
				if (packageJson.error !== false) {
					terminal.log("error", "No project found, did you run 'init' command?")
					process.exit(1)
				}
				terminal.log("init", "Initializing project")
				terminal.logInline("search", "Searching for template")
				terminal.label("green", "found")
				terminal.logInline("download", "Downloading template")
				terminal.label("green", "done")
				terminal.logInline("install", "Installing dependencies")
				terminal.label("green", "done")
				terminal.log("done", "Project successfully initialized!")
			} catch (error) {
				terminal.log("error", error)
			}
		})
}
