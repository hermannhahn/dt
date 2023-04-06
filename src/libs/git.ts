import { CommandRunner } from "utils/command-runner"

const cmd = new CommandRunner()

export class git {
	static async status(): Promise<any> {
		return await cmd.run(`git status --porcelain`)
	}
	static async add(): Promise<void> {
		await cmd.run(`git add .`)
	}
	static async commit(message: string): Promise<void> {
		await cmd.run(`git commit -S -m "${message}"`)
	}
	static async push(): Promise<void> {
		await cmd.run(`git push`)
	}
	static async pull(): Promise<void> {
		await cmd.run(`git pull`)
	}
	static async tag(version: string): Promise<void> {
		await cmd.run(`git tag -a v${version} -m "v${version}"`)
	}
	static async pushTags(): Promise<void> {
		await cmd.run(`git push --tags`)
	}
	static async checkout(branch: string): Promise<void> {
		await cmd.run(`git checkout ${branch}`)
	}
	static async merge(branch: string): Promise<void> {
		await cmd.run(`git merge ${branch}`)
	}
	static async createBranch(branch: string): Promise<void> {
		await cmd.run(`git checkout -b ${branch}`)
	}
	static async deleteBranch(branch: string): Promise<void> {
		await cmd.run(`git branch -D ${branch}`)
	}
	static async deleteRemoteBranch(branch: string): Promise<void> {
		await cmd.run(`git push origin --delete ${branch}`)
	}
	static async createTag(version: string): Promise<void> {
		await cmd.run(`git tag -a v${version} -m "v${version}"`)
	}
	static async pushTag(version: string): Promise<void> {
		await cmd.run(`git push origin v${version}`)
	}
	static async deleteTag(version: string): Promise<void> {
		await cmd.run(`git tag -d v${version}`)
	}
	static async deleteRemoteTag(version: string): Promise<void> {
		await cmd.run(`git push origin --delete v${version}`)
	}
	static async getCurrentBranch(): Promise<any> {
		return await cmd.run(`git rev-parse --abbrev-ref HEAD`)
	}
	static async getTags(): Promise<string[]> {
		return await cmd.run(`git tag`)
	}
	static async getLatestTag(): Promise<string> {
		return await cmd.run(`git describe --abbrev=0 --tags`)
	}
	static async getLatestCommit(): Promise<string> {
		return await cmd.run(`git rev-parse HEAD`)
	}
	static async getLatestCommitMessage(): Promise<string> {
		return await cmd.run(`git log -1 --pretty=%B`)
	}
	static async getLatestCommitDate(): Promise<string> {
		return await cmd.run(`git log -1 --pretty=%cd`)
	}
	static async getLatestCommitAuthor(): Promise<string> {
		return await cmd.run(`git log -1 --pretty=%an`)
	}
	static async getLatestCommitAuthorEmail(): Promise<string> {
		return await cmd.run(`git log -1 --pretty=%ae`)
	}
}

// Path: src\libs\utils\command-runner.ts
