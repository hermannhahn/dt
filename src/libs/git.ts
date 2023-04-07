import { Add } from "libs/git/add"
import { Branch } from "libs/git/branch"
import { Commit, History } from "libs/git/commit"
import { Pull } from "libs/git/pull"
import { Push } from "libs/git/push"
import { Tag } from "libs/git/tag"

export class Git {
	public add = Add
	public push = Push
	public pull = Pull
	public commit = Commit
	public branch = new Branch()
	public tag = new Tag()
	public history = new History()
}

// Path: src\libs\git.ts
