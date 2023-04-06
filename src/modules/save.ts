import { program } from "@commander-js/extra-typings"
import { git } from "libs/git"
import { PackageJson } from "utils/package-manager"
import { terminal } from "utils/terminal-log"

const packageJson = new PackageJson("package.json")

export class Save {
	constructor() {
		this.save()
	}
	save(): void {
		program
			.command("save")
			.option("-m, --message <message>", "commit message")
			.description("save project")
			.action(async (opts, cmd) => {
				try {
					const version = packageJson.get("version")
					const name = packageJson.get("name")
					terminal.log("save", `Saving ${name} v${version}`)
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
	}
}
