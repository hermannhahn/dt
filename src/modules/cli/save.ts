import { program } from "@commander-js/extra-typings"
import { Git } from "libs/git"
import { GitResponse } from "types/git"
import { PackageJson } from "utils/package-manager"
import { terminal } from "utils/terminal-log"

const git = new Git()

export const Save = async () => {
	program
		.command("save")
		.option("-m, --message <message>", "commit message")
		.description("save project")
		.action(async (opts, cmd) => {
			try {
				const gitTopLevel: GitResponse = await git.topLevel()
				if (gitTopLevel.error) {
					terminal.log("error", "No project found, did you run 'init' command?")
					process.exit(1)
				}
				const rootDir = gitTopLevel.result
				const packageJson: any = new PackageJson(`${rootDir}/package.json`)
				if (packageJson.error !== false) {
					terminal.log("error", "No project found, did you run 'init' command?")
					process.exit(1)
				}
				const version = packageJson.data.version
				const name = packageJson.data.name
				const message = opts.message || `v${version}`
				const add = async () => {
					const { error, result } = await git.add(".")
					if (error === false) {
						for (const file of result) {
							terminal.log("checked", `${file} [\x1b[36madded\x1b[0m]`)
						}
					}
				}

				// Check if there are changes
				const status: GitResponse = await git.branch.status()

				// Save project
				terminal.log(
					"save",
					`Saving project \x1b[35m${name}\x1b[0m version \x1b[35m${version}\x1b[0m`
				)
				terminal.logInline("search", "Searching for changes")
				if (status.error) {
					terminal.label("red", "not found")
					terminal.done(status.error)
				} else {
					terminal.label("green", "found")
					await add()
					terminal.logInline("password", "Waiting for signature password")
					await git.commit(message)
					terminal.label("green", "signed")
					terminal.logInline("commit", "Commiting files")
					terminal.label("green", "done")
					terminal.logInline("push", "Pushing files")
					await git.push()
					terminal.label("green", "done")
					terminal.logInline("push", "Pushing tags")
					await git.push("--tags")
					terminal.label("green", "done")
					terminal.log("done", "Project successfully saved!")
				}
			} catch (error: any) {
				terminal.log("error", error)
			}
		})
}
