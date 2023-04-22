import { Command } from "utils/command-runner"
import { terminal } from "utils/terminal-log"
import { Gpg } from "./gpg"

const prompts = require("prompts")

// Git requirements
export const Configure = async () => {
	// Get git user
	let name = new Command("git config --global user.name")

	// If git user is not configured
	if (!name.result) {
		terminal.logInline("user", "Git user is not configured.")

		// Ask for git user
		name = await prompts([
			{
				type: "text",
				name: "name",
				message: "Enter your name",
			},
		])

		// Configure git user
		const configUser = new Command(`git config --global user.name "${name}"`)
		if (configUser.error) {
			terminal.error(configUser.error)
			process.exit(1)
		}
		terminal.log("user", "Git user has been configured.")
	}

	// Get git email
	let email = new Command("git config --global user.email")

	// If git email is not configured
	if (!email.result) {
		terminal.logInline("email", "Git email is not configured.")

		// Ask for git email
		email = await prompts([
			{
				type: "text",
				name: "email",
				message: "Enter your email",
			},
		])

		// Configure git email
		const configEmail = new Command(`git config --global user.email "${email}"`)
		if (configEmail.error) {
			terminal.error(configEmail.error)
			process.exit(1)
		}
		terminal.log("email", "Git email has been configured.")
	}

	// Configure git gpg
	const gpg = new Gpg()
	await gpg.configure()
}
