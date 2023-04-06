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
		try {
			terminal.log("save", "Saving project...")
			const version = packageJson.get("version")
			const message = opts.message || `v${version}`
			const status: any = await git.status()
			const commands = [
				await git.add(),
				await git.commit(message),
				console.log(" [\x1b[32mdone\x1b[0m]"),
				await git.push(),
				await git.pushTags(),
			]
			if (status) {
				await Promise.all(commands)
			}
			terminal.log("success", "Project saved")
		} catch (error: any) {
			terminal.error("Error: " + error)
		}
	})

program.parse(process.argv)
