import { program } from "@commander-js/extra-typings"
import { Cli } from "modules/cli"
import { terminal } from "utils/terminal-log"

// Version
const name = "devtool (dt)"
const version = "0.0.0"
const versionString = name + " cli " + version

program
	.version(versionString, "-v, --version", "output the current dt version")
	.description("Tools for developers")

// test command
program.command("ping").description("test command")

// init command
program.command("init").description("initialize git repository")

// save command
program
	.command("save")
	.description("save project")
	.option("-m, --message <message>", "commit message")

// patch command
program
	.command("new")
	.argument("<patch|update|upgrade>")
	.description("create new patch, update or upgrade.")

// upgrade command
program
	.command("template")
	.option("list")
	.option("install")
	.description("Project commands")

// Parse arguments
program.parse(process.argv)

// Arguments classifcation
const command: any = program.args[0]
const option: any = program.args[1]
const message: any = program.args[2]
const args: any = program.args.slice(2)

// Run command
if (command === "ping") terminal.success("pong")
if (command === "init") Cli.init(args)
if (command === "save") Cli.save(message)
if (command === "new") {
	if (option === "patch") Cli.new.patch()
	if (option === "update") Cli.new.update()
	if (option === "upgrade") Cli.new.upgrade()
}
if (command === "template") {
	if (option === "list") Cli.template.list()
	if (option === "install") Cli.template.install()
}
