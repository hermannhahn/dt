import { program } from "@commander-js/extra-typings"
import { Git } from "libs/git"
import { PackageJson } from "utils/package-manager"
import { terminal } from "utils/terminal-log"

const packageJson = new PackageJson("package.json")
const git = new Git()

export const Save = async () => {
	program
		.command("save")
		.option("-m, --message <message>", "commit message")
		.description("save project")
		.action(async (opts, cmd) => {
			try {
				const version = packageJson.get("version")
				const name = packageJson.get("name")
				const message = opts.message || `v${version}`
				const status: any = await git.branch.status()
				const add = async () => {
					const { error, result } = await git.add(".")
					if (error === false) {
						for (const file of result) {
							terminal.log("file", `${file} [\x1b[33madded\x1b[0m]`)
						}
					}
				}

				// Save project
				terminal.log("save", `Saving ${name} v${version} `)
				terminal.logInline("search", "Searching for changes... ")
				if (status.error) {
					terminal.label("red", "not found")
					terminal.log(status.result)
				} else {
					terminal.label("green", "found")
					await add()
					terminal.logInline("password", "Waiting for signature password... ")
					await git.commit(message)
					terminal.label("green", "signed")
					terminal.logInline("commit", "Commiting files... ")
					terminal.label("green", "done")
					terminal.logInline("push", "Pushing files... ")
					await git.push()
					terminal.label("green", "done")
					terminal.logInline("push", "Pushing tags... ")
					await git.push("--tags")
					terminal.label("green", "done")
					terminal.log("done", "Project successfully saved!")
				}
			} catch (error: any) {
				throw new Error(`Error while saving project: ${error}`)
			}
		})
}
