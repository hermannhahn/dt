import { Command } from 'utils/command-runner'
import { terminal } from 'utils/terminal-log'

// Check for updates
export const checkUpdate = async () => {
	const result: any = new Command('dt.exe', ['--version'])
	if (result.code === 0) {
		const version = result.stdout.split(' ')[1]
		const latestVersion = await getLatestVersion()
		if (version !== latestVersion) {
			terminal.log(`\nUpdate available: ${version} -> ${latestVersion}`)
			terminal.log('Run `dt-update` to update')
		}
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
