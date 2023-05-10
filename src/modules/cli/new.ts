import { Patch } from "./new/patch"
import { Update } from "./new/update"
import { Upgrade } from "./new/upgrade"

export class New {
	public static patch = Patch
	public static update = Update
	public static upgrade = Upgrade
}
