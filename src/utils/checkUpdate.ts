import { Command } from 'utils/command-runner'
import { terminal } from 'utils/terminal-log'

// Check for updates
export const checkUpdate = async () => {
	const version: any = new Command('dt -v')
	if (version.error) {
		terminal.error(version.error)
		process.exit(1)
	}
	const latestVersion = await getLatestVersion()
	if (version !== latestVersion) {
		terminal.log(`\nUpdate available: ${version} -> ${latestVersion}`)
		terminal.log('Run `dt-update` to update')
	}
}

// Get latest version
const getLatestVersion = async () => {
	const packageJson = await fetch(
		'https://github.com/hermannhahn/dt/blob/76d373c54f237a7633982c9cea66fb8360b3ebf9/package.json'
	)
	const packageJsonData = await packageJson.json()
	return packageJsonData.version
}
