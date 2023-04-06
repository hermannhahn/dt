import { Save } from "modules/save"

export class Cli {
	constructor() {
		this.save()
	}

	save(): void {
		new Save()
	}
}
