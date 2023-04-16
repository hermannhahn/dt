import { Command } from "utils/command-runner"
import { terminal } from "utils/terminal-log"

// Import prompts
const prompts = require("prompts")

// Protecteds branches
const protectedBranches = [
	"master",
	"main",
	"production",
	"prod",
	"release",
	"current",
]

// Git class
export class Git {
	private static KEY_ID_REGEX = /\/([A-F0-9]{16,})/i

	// Requirements
	static async requirements() {
		// Check if chocolatey is installed
		const chocolatey = new Command("choco --version")
		// If chocolatey is not installed
		if (chocolatey.error) {
			// Install chocolatey
			const installChocolatey: any = new Command(
				"powershell -NoProfile -ExecutionPolicy Bypass -Command \"iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))\""
			)
			if (installChocolatey.error) {
				terminal.label("red", "error")
				terminal.error(installChocolatey.error)
				process.exit(1)
			}
		}

		// Check if git is installed
		const git = new Command("git --version")
		// If git is not installed
		if (git.error) {
			// Install git
			const installGit: any = new Command("choco install git -y")
			if (installGit.error) {
				terminal.label("red", "error")
				terminal.error(installGit.error)
				process.exit(1)
			}
		}

		// Check if gnupg is installed
		const gnupg = new Command("gpg --version")
		// If gnupg is not installed
		if (gnupg.error) {
			// Install gnupg
			const installGnupg: any = new Command("choco install gnupg -y")
			if (installGnupg.error) {
				terminal.label("red", "error")
				terminal.error(installGnupg.error)
				process.exit(1)
			}
		}

		// Check if git is initialized
		const topLevel: any = new Command("git rev-parse --show-toplevel")
		// If git is not initialized
		if (topLevel.error) {
			if (topLevel.error.includes("not a git repository")) {
				terminal.label("red", "error")
				terminal.log(
					"info",
					"Git is not initialized, run \x1b[1mdt init\x1b[0m command first"
				)
				process.exit(1)
			}
		}

		await this.configureGitUser()
	}

	// Configure git user
	private static async configureGitUser() {
		// Check if git user is configured
		let name = new Command("git config --global user.name")
		// If git user is not configured
		if (!name.result) {
			terminal.label("yellow", "configuring")
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

		// Check if git email is configured
		let email = new Command("git config --global user.email")
		// If git email is not configured
		if (!email.result) {
			if (name) {
				terminal.label("yellow", "configuring")
			}
			email = await prompts([
				{
					type: "text",
					name: "email",
					message: "Enter your email",
				},
			])
			// Configure git email
			const configEmail = new Command(
				`git config --global user.email "${email}"`
			)
			if (configEmail.error) {
				terminal.error(configEmail.error)
				process.exit(1)
			}
			terminal.log("Git email has been configured.")
		}
		if (name && email) {
			terminal.label("green", "OK")
		}
	}

	// Configure gpg
	static async gpgRequirements() {
		// Set git to use GPG signing
		const enableSign = new Command("git config --global commit.gpgsign true")
		if (enableSign.error) {
			terminal.label("red", "error")
			terminal.error(enableSign.error)
			process.exit(1)
		}

		// Check if gpg key is already configured
		const gpgKey = new Command("git config --global user.signingkey")
		// If git gpg key is not configured
		if (!gpgKey.result) {
			terminal.label("yellow", "configuring")
			// Check if existing key is found
			const existingKeyId = this.getExistingKeyId()

			// If existing key is found, use it
			if (existingKeyId) {
				terminal.log("crypt", `Existing GPG key found with ID ${existingKeyId}`)
				await this.setGitConfigWithKeyId(existingKeyId)
				this.printPublicKey(existingKeyId)

				// If no existing key is found, generate a new one
			} else {
				terminal.log("decrypt", "No existing GPG key found.")
				const newKeyId = await this.generateGpgKey()
				await this.setGitConfigWithKeyId(newKeyId)
				this.printPublicKey(newKeyId)
			}
		}

		// If git gpg key is already configured
		if (gpgKey) {
			terminal.label("green", "OK")
		}
	}

	// Return existing key id
	private static getExistingKeyId(): string | null {
		try {
			const output = new Command(
				"gpg --list-keys --keyid-format LONG"
			).toString()
			const match = output.match(this.KEY_ID_REGEX)
			return match?.[1] ?? null
		} catch (error) {
			terminal.label("red", "error")
			terminal.error("Error listing GPG keys", error)
			return null
		}
	}

	// Generate gpg key
	private static async generateGpgKey(): Promise<string> {
		terminal.log("Generating new GPG key...")
		const { passphrase } = await prompts([
			{
				type: "password",
				name: "passphrase",
				message: "Enter a passphrase for your GPG key",
			},
		])

		// Get git user name and email
		const name = new Command("git config --global user.name").toString()
		const email = new Command("git config --global user.email").toString()

		// Generate GPG key
		const generateGpg = new Command(
			`gpg --batch --passphrase "${passphrase}" --quick-gen-key "${name} <${email}>"`
		)
		if (generateGpg.error) {
			terminal.label("red", "error")
			terminal.error(generateGpg.error)
			process.exit(1)
		}

		const newKeyId: any = this.getExistingKeyId()
		if (!newKeyId) {
			terminal.label("red", "error")
			terminal.error("Error generating GPG key")
		}

		terminal.log(`New GPG key generated with ID ${newKeyId}`)
		return newKeyId
	}

	private static async setGitConfigWithKeyId(keyId: string) {
		const configKey = new Command(`git config user.signingkey ${keyId}`)
		if (configKey.error) {
			terminal.label("red", "error")
			terminal.error(configKey.error)
			process.exit(1)
		}
		terminal.log("Git has been configured with the GPG key.")
	}

	private static async printPublicKey(keyId: string) {
		terminal.log(`\nPublic key with ID ${keyId}:`)
		new Command(`gpg --armor --export ${keyId}`, { silent: true })
		// Prompt for enter
		await prompts({
			type: "text",
			name: "answer",
			message:
				"Press enter after copy and paste your public key to your GitHub account. (Settings > SSH and GPG keys > New GPG key)",
		})
	}

	// Protect production branch
	static async branchGuard() {
		// Check if is main or master branch
		const branch: any = new Command("git branch --show-current")
		if (branch.error) {
			terminal.label("red", "error")
			terminal.error(branch.error)
			process.exit(1)
		}
		if (protectedBranches.includes(branch.toString())) {
			terminal.label("red", "error")
			terminal.log(
				"error",
				`You cannot save changes on production branch.

If you want update production branch, use \x1b[1mdt deploy\x1b[0m command" on version branch.

\x1b[1mExample:\x1b[0m
	\x1b[1mdt new patch\x1b[0m (create new patch version)
	\x1b[1mdt save\x1b[0m (save changes)
	\x1b[1mdt deploy\x1b[0m (deploy new version to production branch)
`
			)
			process.exit(1)
		}
		terminal.label("green", "OK")
	}

	// Check if is production branch
	static isProductionBranch() {
		// Check if is main or master branch
		const branch: any = new Command("git branch --show-current")
		if (branch.error) {
			terminal.error(branch.error)
			process.exit(1)
		}
		if (protectedBranches.includes(branch.toString())) {
			return true
		}
		return false
	}
}
