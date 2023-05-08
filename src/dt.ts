import { program } from '@commander-js/extra-typings'
import fs from 'fs'
import { Cli } from 'modules/cli'
import { checkUpdate } from 'utils/check-update'
import { terminal } from 'utils/terminal-log'

// Get version
const version = fs.readFileSync('version.txt', 'utf-8')

// version command
program
	.version(version, '-v, --version', 'output the current dt version')
	.alias('version')
	.description('Tools for developers')

// test command
program.command('ping').description('test command')

// init command
program.command('init').description('initialize project')

// install command
program.command('install').description('install requirements and dependencies')

// save command
program
	.command('save')
	.description('save project')
	.option('-m, --message <message>', 'commit message')

// patch command
program
	.command('new')
	.argument('<patch|update|upgrade>')
	.description('create new patch, update or upgrade.')

// deploy command
program.command('deploy').argument('<release>').description('deploy project')

// upgrade command
program
	.command('template')
	.option('list')
	.option('install')
	.description('Project commands')

// Parse arguments
program.parse(process.argv)

// Arguments classifcation
const command: any = program.args[0]
const option: any = program.args[1]
const message: any = program.args[2]
const args: any = program.args.slice(2)

// Command handler
if (command === 'ping') terminal.success('pong')
if (command === 'init') Cli.init(args)
if (command === 'install') Cli.install()
if (command === 'save') Cli.save(message)
if (command === 'new') {
	if (option === 'patch') Cli.new.patch()
	if (option === 'update') Cli.new.update()
	if (option === 'upgrade') Cli.new.upgrade()
}
if (command === 'template') {
	if (option === 'list') Cli.template.list()
	if (option === 'install') Cli.template.install()
}

if (command === 'deploy') {
	if (option === 'npm') {
		Cli.deploy({ npm: true })
	} else {
		Cli.deploy()
	}
}

checkUpdate()
