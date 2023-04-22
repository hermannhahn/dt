import { Command } from "utils/command-runner"
import { terminal } from "utils/terminal-log"

export class Gpg {
	private KEY_ID_REGEX = /\/([A-F0-9]{16,})/i

	public async configure() {
		// Set git to use GPG signing
		const enableSign = new Command("git config --global commit.gpgsign true")
		if (enableSign.error) {
			terminal.error(enableSign.error)
			process.exit(1)
		}

		// Check if gpg key is already configured
		const gpgKey = new Command("git config --global user.signingkey")

		// If git gpg key is not configured
		if (!gpgKey.result) {
			terminal.log("crypt", "GPG key is not configured.")

			// Check if existing key is found
			const existingKeyId: any = this.getExistingKeyId()

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
	}

	private async getExistingKeyId() {
		try {
			const output = new Command(
				"gpg --list-keys --keyid-format LONG"
			).toString()
			const match = output.match(this.KEY_ID_REGEX)
			return match?.[1] ?? null
		} catch (error) {
			terminal.error("No GPG keys", error)
			return null
		}
	}

	private async generateGpgKey() {
		const prompts = require("prompts")
		terminal.log("crypt", "Generating new GPG key...")
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
			terminal.error(generateGpg.error)
			process.exit(1)
		}

		const newKeyId: any = this.getExistingKeyId()
		if (!newKeyId) {
			terminal.error("Error generating GPG key")
		} else {
			terminal.success(`New GPG key generated with ID ${newKeyId}`)
		}
		return newKeyId
	}

	private async printPublicKey(keyId: string) {
		const prompts = require("prompts")
		terminal.log("crypt", `\nPublic key with ID ${keyId}:`)
		new Command(`gpg --armor --export ${keyId}`, { silent: true })
		// Prompt for enter
		await prompts({
			type: "text",
			name: "answer",
			message:
				"Press enter after copy and paste your public key to your GitHub account. (Settings > SSH and GPG keys > New GPG key)",
		})
	}

	private async setGitConfigWithKeyId(keyId: string) {
		const configKey = new Command(`git config user.signingkey ${keyId}`)
		if (configKey.error) {
			terminal.error(configKey.error)
			process.exit(1)
		}
		terminal.success("Successfully configured GPG key")
	}
}
