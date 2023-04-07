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
				terminal.logInline("save", `Saving ${name} v${version} `)
				const message = opts.message || `v${version}`
				const status: any = await git.branch.status
				const commands = [
					await git.add("."),
					await git.commit(message),
					await git.push(),
					await git.push("--tags"),
				]
				if (status) {
					await Promise.all(commands)
				}

				console.log("[\x1b[32mDone\x1b[0m]")
				terminal.log("success", "Project saved")
			} catch (error: any) {
				terminal.error("Error: " + error.data)
			}
		})
}
