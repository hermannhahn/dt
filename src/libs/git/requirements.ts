import { Command } from "../../utils/command-runner"
import { terminal } from "../../utils/terminal-log"

// Git requirements
export const Requirements = async () => {
	// Check if chocolatey is installed
	const chocolatey = new Command("choco --version")
	// If chocolatey is not installed
	if (chocolatey.error) {
		// Install chocolatey
		terminal.logInline("package", "Installing chocolatey...")
		const installChocolatey: any = new Command(
			"powershell -NoProfile -ExecutionPolicy Bypass -Command \"iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))\""
		)
		if (installChocolatey.error) {
			terminal.label("red", "error")
			terminal.error(installChocolatey.error)
			process.exit(1)
		}
		terminal.label("green", "OK")
	}

	// Check if git is installed
	const git = new Command("git --version")
	// If git is not installed
	if (git.error) {
		// Install git
		terminal.logInline("git", "Installing git...")
		const installGit: any = new Command("choco install git -y")
		if (installGit.error) {
			terminal.label("red", "error")
			terminal.error(installGit.error)
			process.exit(1)
		}
		terminal.label("green", "OK")
	}

	// Check if gnupg is installed
	const gnupg = new Command("gpg --version")
	// If gnupg is not installed
	if (gnupg.error) {
		// Install gnupg
		terminal.logInline("crypt", "Installing gnupg...")
		const installGnupg: any = new Command("choco install gnupg -y")
		if (installGnupg.error) {
			terminal.label("red", "error")
			terminal.error(installGnupg.error)
			process.exit(1)
		}
		terminal.label("green", "OK")
	}

	// Get gpg key if it exists
	const gpgKey = new Command("gpg --list-secret-keys --keyid-format LONG")
	// If gpg key does not exist
	if (!gpgKey) {
		// ask for user name, email and signature password
		const prompts = require("prompts")
		const questions = [
			{
				type: "text",
				name: "name",
				message: "What is your name?",
				validate: (value: string) =>
					value.length < 2 ? `Name must be at least 2 characters long` : true,
			},
			{
				type: "text",
				name: "email",
				message: "What is your email?",
				validate: (value: string) =>
					value.length < 2 ? `Email must be at least 2 characters long` : true,
			},
			{
				type: "password",
				name: "password",
				message: "What is your signature password?",
				validate: (value: string) =>
					value.length < 2
						? `Password must be at least 2 characters long`
						: true,
			},
		]
		const response = await prompts(questions)
		// Create gpg key
		terminal.logInline("crypt", "Creating gpg key...")
		const createGpgKey: any = new Command(`gpg --batch --full-generate-key <<EOF
		%echo Generating a basic OpenPGP key
		Key-Type: RSA
		Key-Length: 4096
		Subkey-Type: RSA
		Subkey-Length: 4096
		Name-Real: ${response.name}
		Name-Email: ${response.email}
		Expire-Date: 0
		Passphrase: ${response.password}
		%commit
		%echo done
		EOF`)
		if (createGpgKey.error) {
			terminal.label("red", "error")
			terminal.error(createGpgKey.error)
			process.exit(1)
		}

		// Print gpg key and ask user to add it to github and wait for user to press enter
		terminal.label("green", "OK")
		terminal.log("crypt", "Your gpg key is:")
		console.log(createGpgKey)
		const enter = {
			type: "text",
			name: "enter",
			message: "Add this key to github and press enter to continue...",
		}
		await prompts(enter)
	}
}
