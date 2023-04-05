import { CommandRunner } from "utils/command-runner"

export class git {
	static async status(): Promise<boolean> {
		try {
			const status = new CommandRunner(`git status`)
			const result = await status.run()
			console.log(result.stdio)
			if (result.includes("nothing to commit")) {
				return false
			}
			return true
		} catch (error: any) {
			return false
		}
	}
	static async add(): Promise<void> {
		const add = new CommandRunner(`git add .`)
		await add.run()
	}
	static async commit(message: string): Promise<void> {
		const commit = new CommandRunner(`git commit -S -m "${message}"`)
		await commit.run()
	}
	static async push(): Promise<void> {
		const push = new CommandRunner(`git push`)
		await push.run()
	}
	static async pull(): Promise<void> {
		const pull = new CommandRunner(`git pull`)
		await pull.run()
	}
	static async tag(version: string): Promise<void> {
		const tag = new CommandRunner(`git tag -a v${version} -m "v${version}"`)
		await tag.run()
	}
	static async pushTags(): Promise<void> {
		const pushTags = new CommandRunner(`git push --tags`)
		await pushTags.run()
	}
	static async checkout(branch: string): Promise<void> {
		const checkout = new CommandRunner(`git checkout ${branch}`)
		await checkout.run()
	}
	static async merge(branch: string): Promise<void> {
		const merge = new CommandRunner(`git merge ${branch}`)
		await merge.run()
	}
	static async createBranch(branch: string): Promise<void> {
		const createBranch = new CommandRunner(`git checkout -b ${branch}`)
		await createBranch.run()
	}
	static async deleteBranch(branch: string): Promise<void> {
		const deleteBranch = new CommandRunner(`git branch -d ${branch}`)
		await deleteBranch.run()
	}
	static async deleteRemoteBranch(branch: string): Promise<void> {
		const deleteRemoteBranch = new CommandRunner(
			`git push origin --delete ${branch}`
		)
		await deleteRemoteBranch.run()
	}
	static async createTag(version: string): Promise<void> {
		const createTag = new CommandRunner(
			`git tag -a v${version} -m "v${version}"`
		)
		await createTag.run()
	}
	static async pushTag(version: string): Promise<void> {
		const pushTag = new CommandRunner(`git push origin v${version}`)
		await pushTag.run()
	}
	static async deleteTag(version: string): Promise<void> {
		const deleteTag = new CommandRunner(`git tag -d v${version}`)
		await deleteTag.run()
	}
	static async deleteRemoteTag(version: string): Promise<void> {
		const deleteRemoteTag = new CommandRunner(
			`git push origin --delete v${version}`
		)
		await deleteRemoteTag.run()
	}
	static async getBranch(): Promise<string> {
		const getBranch = new CommandRunner(`git rev-parse --abbrev-ref HEAD`)
		const branch = await getBranch.run()
		return branch.trim()
	}
	static async getTags(): Promise<string[]> {
		const getTags = new CommandRunner(`git tag`)
		const tags = await getTags.run()
		return tags.trim().split("\n")
	}
	static async getLatestTag(): Promise<string> {
		const getLatestTag = new CommandRunner(`git describe --abbrev=0 --tags`)
		const latestTag = await getLatestTag.run()
		return latestTag.trim()
	}
	static async getLatestCommit(): Promise<string> {
		const getLatestCommit = new CommandRunner(`git rev-parse HEAD`)
		const latestCommit = await getLatestCommit.run()
		return latestCommit.trim()
	}
	static async getLatestCommitMessage(): Promise<string> {
		const getLatestCommitMessage = new CommandRunner(`git log -1 --pretty=%B`)
		const latestCommitMessage = await getLatestCommitMessage.run()
		return latestCommitMessage.trim()
	}
	static async getLatestCommitDate(): Promise<string> {
		const getLatestCommitDate = new CommandRunner(`git log -1 --pretty=%cd`)
		const latestCommitDate = await getLatestCommitDate.run()
		return latestCommitDate.trim()
	}
	static async getLatestCommitAuthor(): Promise<string> {
		const getLatestCommitAuthor = new CommandRunner(`git log -1 --pretty=%an`)
		const latestCommitAuthor = await getLatestCommitAuthor.run()
		return latestCommitAuthor.trim()
	}
	static async getLatestCommitAuthorEmail(): Promise<string> {
		const getLatestCommitAuthorEmail = new CommandRunner(
			`git log -1 --pretty=%ae`
		)
		const latestCommitAuthorEmail = await getLatestCommitAuthorEmail.run()
		return latestCommitAuthorEmail.trim()
	}
}

// Path: src\libs\utils\command-runner.ts
