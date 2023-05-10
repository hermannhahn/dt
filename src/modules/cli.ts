import { Deploy } from "./cli/deploy"
import { Init } from "./cli/init"
import { Install } from "./cli/install"
import { New } from "./cli/new"
import { Save } from "./cli/save"

export class Cli {
	static save = Save
	static new = New
	static init = Init
	static install = Install
	static deploy = Deploy
}
