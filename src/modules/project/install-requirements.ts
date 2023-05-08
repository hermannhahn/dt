import { Command } from 'utils/command-runner'
import { terminal } from 'utils/terminal-log'

export const InstallRequirements = async (opts?: any) => {
	// Start
	terminal.log('package', 'Installing requirements...')

	// Install requirements
	const cpx: any = new Command('npm install -g cpx')
	if (cpx.error) {
		terminal.error(cpx.error)
	}
	const wget: any = new Command('npm install -g wget')
	if (wget.error) {
		terminal.error(wget.error)
	}
	const curl: any = new Command('npm install -g curl')
	if (curl.error) {
		terminal.error(curl.error)
	}
	const prettier: any = new Command('npm install -g prettier')
	if (prettier.error) {
		terminal.error(prettier.error)
	}
	const eslint: any = new Command('npm install -g eslint')
	if (eslint.error) {
		terminal.error(eslint.error)
	}

	// Finish
	terminal.success('Requirements installed!')
}
