import { readFileSync, writeFileSync } from "fs"

export class PackageJson {
	private data: any

	constructor(private filePath: string) {
		this.data = this.load()
	}

	private load(): any {
		const content = readFileSync(this.filePath, { encoding: "utf8" })
		return JSON.parse(content)
	}

	private save(): void {
		writeFileSync(this.filePath, JSON.stringify(this.data, null, 2))
	}

	public get(prop: string): any {
		return this.data[prop]
	}

	public set(prop: string, value: any): void {
		this.data[prop] = value
		this.save()
	}
}
