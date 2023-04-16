import { Init } from "modules/cli/init"
import { New } from "modules/cli/new"
import { Save } from "modules/cli/save"

export class Cli {
	public save = Save
	public new = New
	public init = Init
}
