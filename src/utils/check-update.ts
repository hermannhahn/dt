import https from "https"
import { Version } from "../modules/cli/version"
import { terminal } from "./terminal-log"

// Check for updates
export const checkUpdate = async () => {
	const version: any = Version()
	const latestVersion = await getLatestVersion()

	if (
		version
			.toString()
			.localeCompare(latestVersion, undefined, { numeric: true }) === -1
	) {
		terminal.log(
			"new",
			`Update available: \x1b[36m\x1b[1m${version}\x1b[0m -> \x1b[5m\x1b[33m\x1b[1m${latestVersion}\x1b[0m`
		)
	}
}

async function getLatestVersion() {
	const packageJsonUrl =
		"https://raw.githubusercontent.com/hermannhahn/dt/main/package.json"
	return new Promise((resolve, reject) => {
		https
			.get(packageJsonUrl, (res) => {
				let data = ""
				res.on("data", (chunk) => {
					data += chunk
				})
				res.on("end", () => {
					try {
						const packageJson = JSON.parse(data)
						resolve(packageJson.version)
					} catch (error) {
						reject(error)
					}
				})
			})
			.on("error", (error) => {
				reject(error)
			})
	})
}
