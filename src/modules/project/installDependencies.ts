import { Cli } from 'modules/cli'
import { Command } from 'utils/command-runner'
import { terminal } from 'utils/terminal-log'

export const InstallDependencies = async (opts?: any) => {
	// Start
	terminal.log('package', 'Installing dependencies...')

	// Install dependencies
	const install: any = new Command('npm install')
	if (install.error) {
		terminal.error('Error installing dependencies')
		process.exit(1)
	}

	// Save project
	await Cli.save(opts)

	// Finish
	terminal.success('Dependencies installed!')
}
