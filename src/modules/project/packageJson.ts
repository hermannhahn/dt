import * as fs from 'fs'
import { Project } from 'modules/project'

export const PackageJson = () => {
	// Get git root directory
	const rootDir = Project.rootDir()

	// Get package.json
	const packageJson = JSON.parse(
		fs.readFileSync(`${rootDir}/package.json`).toString()
	)
	return packageJson
}
export const SavePackageJson = async (packageJson: any) => {
	// Get git root directory
	const rootDir = Project.rootDir()

	// Save package.json
	fs.writeFileSync(
		`${rootDir}/package.json`,
		JSON.stringify(packageJson, null, 2)
	)
}
