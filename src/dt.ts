import { program } from "@commander-js/extra-typings"
import { Cli } from "modules/cli"
import { PackageJson } from "utils/package-manager"
import { terminal } from "utils/terminal-log"

const packageJson = new PackageJson("package.json")
const cli = new Cli()

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

cli.save()

program.parse(process.argv)
