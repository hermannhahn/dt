import { Git } from "libs/git"
import { Project } from "modules/project"
import { Command } from "utils/command-runner"
import { terminal } from "utils/terminal-log"

export const Save = async (opts?: any) => {
	// Git requirements
	await Git.requirements()

	// Check if git is initialized
	const gitIsInit: any = new Command("git rev-parse --show-toplevel")
	// If git is not initialized
	if (gitIsInit.error) {
		if (gitIsInit.error.includes("not a git repository")) {
			terminal.error(
				"Git is not initialized, run \x1b[1mdt init\x1b[0m command first"
			)
			process.exit(1)
		}
		terminal.error(gitIsInit.error)
		process.exit(1)
	}

	// Branch guard
	if (opts && !opts.force) {
		await Git.branchGuard()
	}

	// Get git root directory
	const rootDir: any = Project.rootDir()

	// Check if package.json exists
	await Project.requirements()
	const packageJson = await Project.packageJson()

	// Go to root directory
	process.chdir(rootDir)

	// Start saving
	terminal.log("save", "Saving changes...")

	// Get status, if there are changes, get list of changed files
	terminal.logInline("search", "Searching for changes...")
	const status: any = new Command(`git status --porcelain`)
	if (status.error) {
		terminal.error(status.error)
		process.exit(1)
	}
	if (status.result && status.result.length > 0) {
		terminal.label("cyan", "FOUND")

		// Get list of changed files
		const changedFiles = status.toString().trim().split("\n")

		// Print list of changed files
		terminal.log("update", "Changed files:")
		changedFiles.forEach((file: any) => {
			terminal.log("file", file.trim())
		})

		// Add all files to git
		terminal.logInline("stack", "Stacking changed files to be commited...")
		const add: any = new Command(`git add .`)
		if (add.error) {
			terminal.label("red", "error")
			terminal.log("error", add.error)
			process.exit(1)
		}
		terminal.label("green", "DONE")

		// Commit changes
		terminal.logInline("password", "Waiting for signature passphrase...")
		const commit: any = new Command(`git commit -S -m "${packageJson.version}"`)
		if (commit.error) {
			terminal.label("red", "error")
			terminal.error(commit.result)
			process.exit(1)
		}
		terminal.label("cyan", "SIGNED")
		terminal.logInline("commit", "Commiting changes...")
		new Command("sleep 1")
		terminal.label("green", "DONE")

		// Check if has upstream
		const hasUpstream: any = new Command(
			`git rev-parse --abbrev-ref --symbolic-full-name @{u}`
		)
		if (hasUpstream.error) {
			// If there is no upstream, create one
			terminal.logInline("push", "Creating upstream...")
			// Get branch name
			const branchName = new Command(
				"git rev-parse --abbrev-ref HEAD"
			).toString()
			const createUpstream: any = new Command(
				`git push --set-upstream origin ${branchName}`
			)
			if (createUpstream.error) {
				terminal.label("red", "error")
				terminal.log("error", createUpstream.error)
				process.exit(1)
			}
			terminal.label("green", "DONE")
		} else {
			// Push changes
			terminal.logInline("push", "Pushing changes...")
			const push: any = new Command(`git push`)
			if (push.error) {
				terminal.label("red", "error")
				terminal.log("error", push.error)
				process.exit(1)
			}
			terminal.label("green", "DONE")
		}

		// Push tags
		terminal.logInline("push", "Pushing tags...")
		const pushTags: any = new Command(`git push --tags`)
		if (pushTags.error) {
			terminal.log("error", pushTags.error)
			process.exit(1)
		}
		terminal.label("green", "DONE")
		terminal.log("success", "Changes saved!")
	} else {
		terminal.label("green", "none")
		terminal.success("All files are up to date")
	}
}
