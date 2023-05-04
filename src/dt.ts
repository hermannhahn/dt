import { program } from "@commander-js/extra-typings"
import { Cli } from "modules/cli"
import { terminal } from "utils/terminal-log"

// Version
const name = "devtool (dt)"
const version = "0.0.0"
const versionString = name + " cli " + version

// Cli
const cli = new Cli()

program
	.version(versionString, "-v, --version", "output the current dt version")
	.description("Tools for developers")

// test command
program
	.command("ping")
	.description("test command")
	.action(() => {
		terminal.log("success", "pong")
	})

// save command
program
	.command("save")
	.description("save project")
	.option("-m, --message <message>", "commit message")
	.action((opts) => {
		cli.save(opts)
	})

// patch command
program
	.command("new patch")
	.description("create new patch version")
	.action((opts) => {
		cli.new.patch(opts)
	})

// update command
program
	.command("new update")
	.description("create new update version")
	.action((opts) => {
		cli.new.update(opts)
	})

// upgrade command
program
	.command("new upgrade")
	.description("create new upgrade version")
	.action((opts) => {
		cli.new.upgrade(opts)
	})

// deploy command
program
	.command("deploy")
	.description("deploy project")
	.action((opts) => {
		cli.deploy(opts)
	})

// Parse arguments
program.parse(process.argv)
