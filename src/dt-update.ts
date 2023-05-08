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
	if (
		version.localeCompare(latestVersion, undefined, { numeric: true }) === -1
	) {
		terminal.log(
			'new',
			`Update available: \x1b[36m\x1b[1m${version}\x1b[0m -> \x1b[5m\x1b[33m\x1b[1m${latestVersion}\x1b[0m`
		)
		// Download binary from main branch
		await updateBinary()
	} else {
		terminal.log(
			'success',
			`\nYou are using the latest dt version: \x1b[1m${version}\x1b[0m`
		)
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
