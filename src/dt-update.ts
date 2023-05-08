import axios from 'axios'
import fs from 'fs'
import https from 'https'
import os from 'os'
import path from 'path'
import { Command } from 'utils/command-runner'
import { terminal } from 'utils/terminal-log'

// Update dt.exe
const checkUpdate = async () => {
	const version: any = new Command('dt', ['-v'])
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

async function getLatestVersion(): Promise<string> {
	const packageJsonUrl =
		'https://raw.githubusercontent.com/hermannhahn/dt/main/package.json'

	const response = await axios.get(packageJsonUrl)
	const { version } = response.data

	return version
}

const updateBinary = async () => {
	const sys = os.platform()
	const latestVersion = await getLatestVersion()
	if (sys === 'win32') {
		const url = `https://github.com/hermannhahn/dt/releases/download/latest/dt-win.exe`

		const fileName = 'dt.exe'
		const filePath = path.join(__dirname, fileName)

		const file = fs.createWriteStream(filePath)

		https
			.get(url, (response) => {
				response.pipe(file)
				file.on('finish', () => {
					file.close()
					console.log(`Download complete. File saved as ${filePath}.`)
				})
			})
			.on('error', (error) => {
				fs.unlink(filePath, () => {
					console.error(`Error downloading file: ${error.message}`)
				})
			})
	} else if (sys === 'linux') {
		const url = `https://github.com/hermannhahn/dt/releases/download/latest/dt-linux`

		const fileName = 'dt'
		const filePath = path.join(__dirname, fileName)

		const file = fs.createWriteStream(filePath)

		https
			.get(url, (response) => {
				response.pipe(file)
				file.on('finish', () => {
					file.close()
					console.log(`Download complete. File saved as ${filePath}.`)
				})
			})
			.on('error', (error) => {
				fs.unlink(filePath, () => {
					console.error(`Error downloading file: ${error.message}`)
				})
			})
	} else if (sys === 'darwin') {
		const url = `https://github.com/hermannhahn/dt/releases/download/latest/dt-macos`

		const fileName = 'dt'
		const filePath = path.join(__dirname, fileName)

		const file = fs.createWriteStream(filePath)

		https
			.get(url, (response) => {
				response.pipe(file)
				file.on('finish', () => {
					file.close()
					console.log(`Download complete. File saved as ${filePath}.`)
				})
			})
			.on('error', (error) => {
				fs.unlink(filePath, () => {
					console.error(`Error downloading file: ${error.message}`)
				})
			})
	}
}

checkUpdate()
