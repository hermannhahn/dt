import { GitResponse } from "types/git"

export class Error {
	private error: string | boolean
	private result: string

	constructor(error: string | boolean, result: string) {
		this.error = error
		this.result = result
		this.print()
	}

	public print(): GitResponse {
		return { error: this.error, result: this.result }
	}
}
