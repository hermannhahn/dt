import { program } from "@commander-js/extra-typings"
import { git } from "libs/git"
import { PackageJson } from "utils/package-manager"
import { terminal } from "utils/terminal-log"

const packageJson = new PackageJson("package.json")

program
	.version(
		packageJson.get("name") + " cli " + packageJson.get("version"),
		"-v, --version",
		"output the current version"
	)
	.description("A CLI for managing your projects")

program
	.command("ping")
	.description("let's ping")
	.action(() => {
		terminal.log("success", "pong")
	})

program
	.command("save")
	.option("-m, --message <message>", "commit message")
	.description("save project")
	.action(async (opts, cmd) => {
		const version = packageJson.get("version")
		const message = opts.message || `v${version}`
		const commands = [
			await git.add(),
			await git.commit(message),
			await git.push(),
			await git.pushTags(),
		]

		try {
			const status = await git.status()
			terminal.logInline("save", "Saving project...")
			if (!status) {
				await Promise.all(commands)
				terminal.success()
			} else {
				terminal.error()
			}
		} catch (error: any) {
			terminal.error(error)
		}
	})

program.parse(process.argv)
