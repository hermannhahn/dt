import { DefaultFiles } from "./project/defaultFiles"
import { Init } from "./project/init"
import { InstallDependencies } from "./project/install-dependencies"
import { InstallRequirements } from "./project/install-requirements"
import { PackageJson, SavePackageJson } from "./project/packageJson"
import { Requirements } from "./project/requirements"
import { RootDir } from "./project/rootDir"

export class Project {
	static requirements = Requirements
	static init = Init
	static rootDir = RootDir
	static packageJson = PackageJson
	static savePackageJson = SavePackageJson
	static defaultFiles = DefaultFiles
	static installDependencies = InstallDependencies
	static installRequirements = InstallRequirements
}
