import fs from 'fs'
import os from 'os'
import { Command } from 'utils/command-runner'
import { terminal } from 'utils/terminal-log'

// Update dt.exe
export const checkUpdate = async () => {
	const version: any = new Command('dt -v')
	if (version.error) {
		terminal.error(version.error)
		process.exit(1)
	}
	const latestVersion = await getLatestVersion()
	if (version !== latestVersion) {
		console.log(`\nUpdate available: ${version} -> ${latestVersion}`)
		// Download binary from main branch
		await updateBinary()
	} else {
		console.log(`\nYou are using the latest dt version: ${version}`)
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
		// Get dt folder path
		const dtPath: any = new Command('where', ['dt.exe'])
		const dtPathString = dtPath.split('\n')[0]
		const dtFolderPath = dtPathString.replace('dt.exe', '')
		// Go to dt folder
		process.chdir(dtFolderPath)
		// Download binary
		const download = await fetch(
			'https://github.com/hermannhahn/dt/blob/76d373c54f237a7633982c9cea66fb8360b3ebf9/dist/dt-win.exe'
		)
		const downloadData = await download.arrayBuffer()
		const downloadBuffer = Buffer.from(downloadData)
		fs.writeFileSync('dt.exe', downloadBuffer)
	} else if (sys === 'linux') {
		// Get dt folder path
		const dtPath: any = new Command('which', ['dt'])
		const dtPathString = dtPath.split('\n')[0]
		const dtFolderPath = dtPathString.replace('dt', '')
		// Go to dt folder
		process.chdir(dtFolderPath)
		// Download binary
		const download = await fetch(
			'https://github.com/hermannhahn/dt/blob/76d373c54f237a7633982c9cea66fb8360b3ebf9/dist/dt-linux'
		)
		const downloadData = await download.arrayBuffer()
		const downloadBuffer = Buffer.from(downloadData)
		fs.writeFileSync('dt', downloadBuffer)
	} else if (sys === 'darwin') {
		// Get dt folder path
		const dtPath: any = new Command('which', ['dt'])
		const dtPathString = dtPath.split('\n')[0]
		const dtFolderPath = dtPathString.replace('dt', '')
		// Go to dt folder
		process.chdir(dtFolderPath)
		// Download binary
		const download = await fetch(
			'https://github.com/hermannhahn/dt/blob/76d373c54f237a7633982c9cea66fb8360b3ebf9/dist/dt-macos'
		)
		const downloadData = await download.arrayBuffer()
		const downloadBuffer = Buffer.from(downloadData)
		fs.writeFileSync('dt', downloadBuffer)
	}
}
