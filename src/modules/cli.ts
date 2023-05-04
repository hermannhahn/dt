import { Deploy } from "modules/cli/deploy"
import { New } from "modules/cli/new"
import { Save } from "modules/cli/save"

/**
 * Cli module
 * @class
 * @module Cli
 * @static
 * import { Cli } from "modules/cli"
 * const cli = new Cli()
 * cli.save(opts)
 * cli.new.patch(opts)
 * cli.new.update(opts)
 * cli.new.upgrade(opts)
 */
export class Cli {
	public save = Save
	public new = New
	public deploy = Deploy
}
