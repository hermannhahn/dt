import https from 'https'
import { Command } from 'utils/command-runner'
import { terminal } from 'utils/terminal-log'

// Check for updates
export const checkUpdate = async () => {
	const version: any = new Command('dt', ['-v'])
	if (version.error) {
		terminal.error(version.error)
		process.exit(1)
	}
	const latestVersion = await getLatestVersion()
	if (version !== latestVersion) {
		terminal.log('new', `\nUpdate available: ${version} -> ${latestVersion}`)
	}
}

async function getLatestVersion() {
	const packageJsonUrl =
		'https://raw.githubusercontent.com/hermannhahn/dt/main/package.json'
	return new Promise((resolve, reject) => {
		https
			.get(packageJsonUrl, (res) => {
				let data = ''
				res.on('data', (chunk) => {
					data += chunk
				})
				res.on('end', () => {
					try {
						const packageJson = JSON.parse(data)
						resolve(packageJson.version)
					} catch (error) {
						reject(error)
					}
				})
			})
			.on('error', (error) => {
				reject(error)
			})
	})
}
