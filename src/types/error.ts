import { GitResponse } from "types/git"

export class Error {
	private message: string

	constructor(message: string) {
		this.message = message
		this.print()
	}

	public print(): GitResponse {
		return new GitResponse(true, this.message)
	}
}
