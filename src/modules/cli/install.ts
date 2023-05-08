import { Git } from 'libs/git'
import { Cli } from 'modules/cli'
import { Project } from 'modules/project'
import { terminal } from 'utils/terminal-log'

export const Install = async (opts?: any) => {
	// Start
	terminal.log('package', 'Installing requirements and dependencies...')

	// Git requirements
	await Git.requirements()

	// Install requirements
	await Project.installRequirements()

	// Install dependencies
	await Project.installDependencies()

	// Save project
	await Cli.save(opts)

	// Finish
	terminal.success('Requirements and dependencies installed!')
}
