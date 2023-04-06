import { program } from "@commander-js/extra-typings"
import { save } from "modules/save"
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

save()

program.parse(process.argv)
