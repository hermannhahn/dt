import fs from 'fs'
import os from 'os'
import { Command } from 'utils/command-runner'

// Update dt.exe
export const checkUpdate = async () => {
	const result: any = new Command('dt.exe', ['--version'])
	if (result.code === 0) {
		const version = result.stdout.split(' ')[1]
		const latestVersion = await getLatestVersion()
		if (version !== latestVersion) {
			console.log(`\nUpdate available: ${version} -> ${latestVersion}`)
			// Download binary from main branch
			await updateBinary()
		}
	} else {
		console.log('Unable to check for updates')
	}
}

const getLatestVersion = async () => {
	const packageJson = await fetch(
		'https://github.com/hermannhahn/dt/blob/76d373c54f237a7633982c9cea66fb8360b3ebf9/package.json'
	)
	const packageJsonData = await packageJson.json()
	return packageJsonData.version
}

const updateBinary = async () => {
	const sys = os.platform()
	if (sys === 'win32') {
		const download = await fetch(
			'https://github.com/hermannhahn/dt/blob/76d373c54f237a7633982c9cea66fb8360b3ebf9/dist/dt-win.exe'
		)
		const downloadData = await download.arrayBuffer()
		const downloadBuffer = Buffer.from(downloadData)
		fs.writeFileSync('dt.exe', downloadBuffer)
	} else if (sys === 'linux') {
		const download = await fetch(
			'https://github.com/hermannhahn/dt/blob/76d373c54f237a7633982c9cea66fb8360b3ebf9/dist/dt-linux'
		)
		const downloadData = await download.arrayBuffer()
		const downloadBuffer = Buffer.from(downloadData)
		fs.writeFileSync('dt', downloadBuffer)
	} else if (sys === 'darwin') {
		const download = await fetch(
			'https://github.com/hermannhahn/dt/blob/76d373c54f237a7633982c9cea66fb8360b3ebf9/dist/dt-macos'
		)
		const downloadData = await download.arrayBuffer()
		const downloadBuffer = Buffer.from(downloadData)
		fs.writeFileSync('dt', downloadBuffer)
	}
}
