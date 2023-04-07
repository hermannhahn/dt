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
				terminal.log("save", `Saving ${name} v${version} `)
				const message = opts.message || `v${version}`
				const status: any = await git.branch.status
				const commands = [
					terminal.logInline("save", "Adding files... "),
					await git.add("."),
					console.log("[\x1b[32msuccess\x1b[0m]"),
					terminal.logInline("save", "Commiting files... "),
					await git.commit(message),
					console.log("[\x1b[32msuccess\x1b[0m]"),
					terminal.logInline("save", "Pushing files... "),
					await git.push(),
					console.log("[\x1b[32msuccess\x1b[0m]"),
					terminal.logInline("save", "Pushing tags... "),
					await git.push("--tags"),
					console.log("[\x1b[32msuccess\x1b[0m]"),
				]
				if (status) {
					await Promise.all(commands)
				}

				terminal.log("success", "Successfully saved project")
			} catch (error: any) {
				terminal.error("Error: " + error.data)
			}
		})
}
