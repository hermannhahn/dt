import { Add } from "libs/git/add"
import { Branch } from "libs/git/branch"
import { Commit, History } from "libs/git/commit"
import { Pull } from "libs/git/pull"
import { Push } from "libs/git/push"
import { Status } from "libs/git/status"
import { Tag } from "libs/git/tag"
import { TopLevel } from "libs/git/toplevel"

export class Git {
	public status = Status
	public add = Add
	public push = Push
	public pull = Pull
	public commit = Commit
	public branch = new Branch()
	public tag = new Tag()
	public log = new History()
	public topLevel = TopLevel
}

// Path: src\libs\git.ts
