import { Cli } from 'modules/cli'
import { Project } from 'modules/project'
import { Command } from 'utils/command-runner'
import { terminal } from 'utils/terminal-log'

export const Upgrade = async (opts?: any) => {
	// Save changes
	await Cli.save(opts)

	// Go to root directory
	const rootDir: any = Project.rootDir()
	process.chdir(rootDir)

	// Get package.json
	const packageJson = await Project.packageJson()

	// Get current version
	const currentVersion = packageJson.version

	// Predict new version
	let newVersion = packageJson.version
	newVersion = newVersion[0] + 1 + '.' + '0' + '.' + '0'

	// Create new branch
	terminal.logInline('branch', 'Creating new version branch...')
	const branch: any = new Command(`git checkout -b ${newVersion}`)
	if (branch.error) {
		terminal.error(branch.error)
		process.exit(1)
	}
	terminal.label('cyan', 'CREATED')

	// Upgrade version
	terminal.logInline('update', 'Upgrading version...')
	const update: any = new Command(`npm version ${newVersion}`)
	if (update.error) {
		terminal.error(update.error)
		process.exit(1)
	}
	terminal.label('cyan', 'UPDATED')

	// Save changes
	await Cli.save(opts)

	// Print old and new version
	terminal.log('version', `Successfully upgraded version`)
	terminal.log('version', `Old version: ${currentVersion}`)
	terminal.log('version', `New version: ${newVersion}`)
	terminal.log('version', `Run \x1b[1mdt deploy\x1b[0m to publish new version`)
}
