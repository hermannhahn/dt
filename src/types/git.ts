export interface GitResponseInterface {
	error: boolean | Error
	result: string
}

export class GitResponse {
	public error: boolean | Error
	public result: string

	constructor(error: boolean | Error, result: string) {
		this.error = error
		this.result = result
	}
}
