import { Command } from 'utils/command-runner'
import { terminal } from 'utils/terminal-log'

// Git requirements
export const Requirements = async () => {
	// Check if chocolatey is installed
	const chocolatey = new Command('choco --version')
	// If chocolatey is not installed
	if (chocolatey.error) {
		// Install chocolatey
		terminal.logInline('package', 'Installing chocolatey...')
		const installChocolatey: any = new Command(
			'powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString(\'https://chocolatey.org/install.ps1\'))"'
		)
		if (installChocolatey.error) {
			terminal.label('red', 'error')
			terminal.error(installChocolatey.error)
			process.exit(1)
		}
		terminal.label('green', 'OK')
	}

	// Check if git is installed
	const git = new Command('git --version')
	// If git is not installed
	if (git.error) {
		// Install git
		terminal.logInline('git', 'Installing git...')
		const installGit: any = new Command('choco install git -y')
		if (installGit.error) {
			terminal.label('red', 'error')
			terminal.error(installGit.error)
			process.exit(1)
		}
		terminal.label('green', 'OK')
	}

	// Check if gnupg is installed
	const gnupg = new Command('gpg --version')
	// If gnupg is not installed
	if (gnupg.error) {
		// Install gnupg
		terminal.logInline('crypt', 'Installing gnupg...')
		const installGnupg: any = new Command('choco install gnupg -y')
		if (installGnupg.error) {
			terminal.label('red', 'error')
			terminal.error(installGnupg.error)
			process.exit(1)
		}
		terminal.label('green', 'OK')
	}
}
