import * as fs from "fs"
import { terminal } from "../../utils/terminal-log"
import { Project } from "../project"

export const DefaultFiles = async () => {
	const packageJson = Project.packageJson()
	const rootDir = Project.rootDir()

	// Create README.md if it does not exist
	if (!fs.existsSync(`${rootDir}/README.md`)) {
		fs.writeFileSync(
			`${rootDir}/README.md`,
			`
# ${packageJson.name}
# ${packageJson.description}

## Install
\`\`\`bash
npm install
\`\`\`

## Test
\`\`\`bash
npm run test
\`\`\`

## Watch (for development)
\`\`\`bash
npm run dev

## Run (for development)
npm run start
\`\`\`

## Build (for production)
\`\`\`bash
npm run build
\`\`\`
After build, executable files will be in the \`\`dist\`\` folder.
            `
		)
	}
	terminal.success("README.md created!")
}
