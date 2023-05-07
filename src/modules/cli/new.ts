import { Patch } from 'modules/cli/new/patch'
import { Update } from 'modules/cli/new/update'
import { Upgrade } from 'modules/cli/new/upgrade'

export class New {
	public static patch = Patch
	public static update = Update
	public static upgrade = Upgrade
}
