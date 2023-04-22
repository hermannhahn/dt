import { DefaultFiles } from "modules/project/defaultFiles"
import { Init } from "modules/project/init"
import { PackageJson } from "modules/project/packageJson"
import { Requirements } from "modules/project/requirements"
import { RootDir } from "modules/project/rootDir"

export class Project {
	static requirements = Requirements
	static init = Init
	static rootDir = RootDir
	static packageJson = PackageJson
	static defaultFiles = DefaultFiles
}
