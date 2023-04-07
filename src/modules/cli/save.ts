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
					terminal.logInline("search", "Adding files... "),
					await git.add("."),
					console.log("[\x1b[32msuccess\x1b[0m]"),
					terminal.logInline("password", "Waiting for signature password... "),
					await git.commit(message),
					console.log("[\x1b[32msuccess\x1b[0m]"),
					terminal.logInline("commit", "Commiting files... "),
					console.log("[\x1b[32msuccess\x1b[0m]"),
					terminal.logInline("push", "Pushing files... "),
					await git.push(),
					console.log("[\x1b[32msuccess\x1b[0m]"),
					terminal.logInline("push", "Pushing tags... "),
					await git.push("--tags"),
					console.log("[\x1b[32msuccess\x1b[0m]"),
				]
				if (status) {
					await Promise.all(commands)
				}

				terminal.log("done", "Project successfully saved!")
			} catch (error: any) {
				terminal.error("[\x1b[31mfail\x1b[0m]")
			}
		})
}
