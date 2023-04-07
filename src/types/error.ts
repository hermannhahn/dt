export class Error {
	private message: string

	constructor(message: string) {
		this.message = message
	}

	public print(): string {
		return this.message
	}
}
