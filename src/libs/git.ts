import { branchGuard } from "./git/branchGuard"
import { Configure } from "./git/configure"
import { Init } from "./git/init"
import { Requirements } from "./git/requirements"

// Import prompts
const prompts = require("prompts")

// Git class
export class Git {
	static requirements = Requirements
	static init = Init
	static configure = Configure
	static branchGuard = branchGuard
}
