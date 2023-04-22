import * as fs from "fs"
import { Command } from "utils/command-runner"
import { CommanderTypescript } from "utils/templates/commander-typescript"
import { ExpressTypescript } from "utils/templates/express-typescript"
import { NextTypescript } from "utils/templates/next-typescript"
import { ReactTypescript } from "utils/templates/react-typescript"
import { TkinterPython } from "utils/templates/tkinter-python"

export class TemplateInstaller {
	private template: any
	public name: string

	constructor(name: string) {
		this.name = name
		switch (name) {
			case "commander-typescript":
				this.template = new CommanderTypescript()
				break
			case "react-typescript":
				this.template = new ReactTypescript()
				break
			case "next-typescript":
				this.template = new NextTypescript()
				break
			case "express-typescript":
				this.template = new ExpressTypescript()
				break
			case "tkinter-python":
				this.template = new TkinterPython()
				break
		}
	}

	public async install() {
		this.createProjectFolders()
		this.createProjectFiles()
		this.installDependencies()
	}

	private createProjectFolders() {
		this.template.folders.forEach((folder: any) => {
			fs.mkdirSync(folder)
		})
	}

	private createProjectFiles() {
		this.template.files.forEach((file: any) => {
			fs.writeFileSync(file.path, file.content)
		})
	}

	private installDependencies() {
		if (this.name === "tkinter-python") this.installPythonDependencies()
		else this.installDevDependencies()
		this.installProjectDependencies()
		this.installGlobalDependencies()
	}

	private installPythonDependencies() {
		for (const dependency of this.template.dependencies)
			new Command(`pip install ${this.template.dependencies.toString()}`)
	}

	private installDevDependencies() {
		for (const dependency of this.template.devDependencies)
			new Command(`npm i -D ${this.template.devDependencies.toString()}`)
	}

	private installProjectDependencies() {
		for (const dependency of this.template.dependencies)
			new Command(`npm i ${this.template.dependencies.toString()}`)
	}

	private installGlobalDependencies() {
		for (const dependency of this.template.globalDependencies)
			new Command(`npm i -g ${this.template.globalDependencies.toString()}`)
	}

	// Add script to package.json
	public addScript() {
		const scripts = this.template.scripts
		const packageJson = JSON.parse(fs.readFileSync("package.json").toString())
		packageJson.scripts = { ...packageJson.scripts, ...scripts }
		fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2))
	}
}
