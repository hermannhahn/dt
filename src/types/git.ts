export interface GitResponseInterface {
	error: boolean | string
	result: string
}

export class GitResponse {
	public error: boolean | string
	public result: string

	constructor(error: boolean | string, result: string) {
		this.error = error
		this.result = result
	}
}
