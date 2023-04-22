import { branchGuard } from "libs/git/branchGuard"
import { Configure } from "libs/git/configure"
import { Init } from "libs/git/init"
import { Requirements } from "libs/git/requirements"

// Import prompts
const prompts = require("prompts")

// Git class
export class Git {
	static requirements = Requirements
	static init = Init
	static configure = Configure
	static branchGuard = branchGuard
}
