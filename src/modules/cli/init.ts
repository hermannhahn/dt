import * as fs from "fs"
import { Git } from "libs/git"
import { Command } from "utils/command-runner"
import { terminal } from "utils/terminal-log"

const prompts = require("prompts")

export const Init = async (opts: any) => {
	// Git requirements
	await Git.requirements()

	// Check if git is initialized
	const topLevel: any = new Command("git rev-parse --show-toplevel")
	// If git is not initialized
	if (topLevel.error) {
		if (topLevel.error.includes("not a git repository")) {
			// Ask to user about repository url, if just enter, initialize local repository
			const { url } = await prompts({
				type: "text",
				name: "url",
				message:
					"Enter repository url (leave blank to initialize local repository):",
			})
			// If user enter repository url
			if (url) {
				// Clone repository
				const clone: any = new Command(`git clone ${url}`)
				if (clone.error) {
					terminal.log("error", clone.error)
					process.exit(1)
				}
				terminal.log("success", clone.result)
				process.exit(0)
			} else {
				// Initialize git
				const init: any = new Command("git init")
				if (init.error) {
					terminal.log("error", init.error)
					process.exit(1)
				}
				terminal.log("success", init.result)

				// GPG requirements
				await Git.gpgRequirements()

				// Add all files to git
				const firstAdd: any = new Command("git add .")
				if (firstAdd.error) {
					terminal.log("error", firstAdd.error)
					process.exit(1)
				}

				// Commit all files
				const firstCommit: any = new Command(
					'git commit -S -m "Initial commit"'
				)
				if (firstCommit.error) {
					terminal.log("error", firstCommit.error)
					process.exit(1)
				}

				// Change branch to main
				const setMain: any = new Command("git branch -M main")
				if (setMain.error) {
					terminal.log("error", setMain.error)
					process.exit(1)
				}

				// Check if has remote origin
				const remote: any = new Command("git remote get-url origin")
				if (remote.error) {
					// Ask for remote origin
					const remoteOrigin = await prompts({
						type: "text",
						name: "answer",
						message: "Type the repository url:",
					})
					// Set remote origin
					const setRemote: any = new Command(
						`git remote add origin ${remoteOrigin.answer}`
					)
					if (setRemote.error) {
						terminal.log("error", setRemote.error)
						process.exit(1)
					}
				}

				// Push to remote origin
				const push: any = new Command("git push -u origin main")
				if (push.error) {
					terminal.log("error", push.error)
					process.exit(1)
				}

				// Push tags
				const pushTags: any = new Command("git push --tags")
				if (pushTags.error) {
					terminal.log("error", pushTags.error)
					process.exit(1)
				}

				// Patch version
				const patch: any = new Command(`npm version patch`)
				if (patch.error) {
					terminal.log("error", patch.error)
					process.exit(1)
				}
				terminal.log("success", patch.result)
			}
		}
	}

	// Get git root directory
	const rootDir = new Command("git rev-parse --show-toplevel")

	// Check if package.json exists with fs
	const existPackageJson = fs.existsSync(`${rootDir}/package.json`)
	// If package.json does not exist, initialize project
	if (!existPackageJson) {
		// Initialize project
		const init: any = new Command("npm init -y")
		if (init.error) {
			terminal.log("error", init.error)
			process.exit(1)
		}
		// Change version to 0.0.0
		const version: any = new Command("npm version 0.0.0")
		if (version.error) {
			terminal.log("error", version.error)
			process.exit(1)
		}
		terminal.log("success", "Project initialized")
	}

	// Create README.md if it does not exist
	if (!fs.existsSync(`${rootDir}/README.md`)) {
		fs.writeFileSync(`${rootDir}/README.md`, "# README")
	}

	// Get packageJson
	const packageJson = JSON.parse(
		fs.readFileSync(`${rootDir}/package.json`, "utf8")
	)

	// Create version branch
	const createBranch: any = new Command(
		`git checkout -b v${packageJson.version}`
	)
	if (createBranch.error) {
		terminal.log("error", createBranch.error)
		process.exit(1)
	}
	terminal.log("success", createBranch.result)

	// Push to remote origin
	const pushBranch: any = new Command(
		`git push --set-upstream origin v${packageJson.version}`
	)
	if (pushBranch.error) {
		terminal.log("error", pushBranch.error)
		process.exit(1)
	}

	// Push version tag
	const pushVersionTags: any = new Command("git push --tags")
	if (pushVersionTags.error) {
		terminal.log("error", pushVersionTags.error)
		process.exit(1)
	}
}
