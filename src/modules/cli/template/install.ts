import { Git } from "libs/git"
import { Project } from "modules/project"
import { TemplateInstaller } from "utils/template-installer"

const prompts = require("prompts")

export const Install = async () => {
	// Git requirements
	await Git.requirements()
	await Git.branchGuard()

	// Project requirements
	await Project.requirements()

	const install = new TemplateSelection()
	install.chooseTemplate()
}

class TemplateSelection {
	public async chooseTemplate() {
		const projectType = await prompts({
			type: "select",
			name: "value",
			message: "Project type",
			choices: [
				{ title: "Browser", value: "browser" },
				{ title: "API", value: "api" },
				{ title: "CLI", value: "cli" },
				{ title: "Gui", value: "gui" },
				{ title: "Other", value: "Other" },
			],
		})
		this.chooseLanguage(projectType.value)
	}

	public async chooseLanguage(projectType: string) {
		const project = async () => {
			if (projectType === "browser") {
				const language = await prompts({
					type: "select",
					name: "value",
					message: "Language",
					choices: [
						{ title: "Javascript", value: "javascript" },
						{ title: "Typescript", value: "typescript" },
					],
				})
				return language.value
			}
			if (projectType === "api" || projectType === "cli") {
				const language = await prompts({
					type: "select",
					name: "value",
					message: "Language",
					choices: [
						{ title: "Javascript", value: "javascript" },
						{ title: "Typescript", value: "typescript" },
						{ title: "Python", value: "python" },
						{ title: "Go", value: "go" },
					],
				})
				return language.value
			}
			if (projectType === "gui") {
				const language = await prompts({
					type: "select",
					name: "value",
					message: "Language",
					choices: [{ title: "Python", value: "python" }],
				})
				return language.value
			}
		}

		const language = await project()
		this.chooseFramework(projectType, language)
	}

	private async chooseFramework(projectType: string, language: string) {
		if (projectType === "browser") {
			if (language === "javascript") {
				const framework = await prompts({
					type: "select",
					name: "value",
					message: "Framework",
					choices: [
						{ title: "React", value: "react" },
						{ title: "Next", value: "next" },
					],
				})
				switch (framework.value) {
					case "react":
						const react = new TemplateInstaller("react-javascript")
						react.install()
						break
					case "next":
						const next = new TemplateInstaller("next-javascript")
						next.install()
						break
				}
			}
			if (language === "typescript") {
				const framework = await prompts({
					type: "select",
					name: "value",
					message: "Framework",
					choices: [
						{ title: "React", value: "react" },
						{ title: "Next", value: "next" },
					],
				})
				switch (framework.value) {
					case "react":
						const react = new TemplateInstaller("react-typescript")
						react.install()
						break
					case "next":
						const next = new TemplateInstaller("next-typescript")
						next.install()
						break
				}
			}
		}
		if (projectType === "api") {
			if (language === "javascript") {
				const framework = await prompts({
					type: "select",
					name: "value",
					message: "Framework",
					choices: [{ title: "Express", value: "express" }],
				})
				switch (framework.value) {
					case "express":
						const express = new TemplateInstaller("express-javascript")
						express.install()
						break
				}
			}
			if (language === "typescript") {
				const framework = await prompts({
					type: "select",
					name: "value",
					message: "Framework",
					choices: [{ title: "Express", value: "express" }],
				})
				switch (framework.value) {
					case "express":
						const express = new TemplateInstaller("express-typescript")
						express.install()
						break
				}
			}
			if (language === "python") {
				const framework = await prompts({
					type: "select",
					name: "value",
					message: "Framework",
					choices: [
						{ title: "Flask", value: "flask" },
						{ title: "Django", value: "django" },
					],
				})
				switch (framework.value) {
					case "flask":
						const flask = new TemplateInstaller("flask-python")
						flask.install()
						break
					case "django":
						const django = new TemplateInstaller("django-python")
						django.install()
						break
				}
			}
			if (language === "go") {
				const framework = await prompts({
					type: "select",
					name: "value",
					message: "Framework",
					choices: [{ title: "Gin", value: "gin" }],
				})
				switch (framework.value) {
					case "gin":
						const gin = new TemplateInstaller("gin-go")
						gin.install()
						break
				}
			}
		}
		if (projectType === "cli") {
			if (language === "javascript") {
				const framework = await prompts({
					type: "select",
					name: "value",
					message: "Framework",
					choices: [{ title: "Commander", value: "commander-javascript" }],
				})
				switch (framework.value) {
					case "cli-javascript":
						const commander = new TemplateInstaller("commander-javascript")
						commander.install()
						break
				}
			}
			if (language === "typescript") {
				const framework = await prompts({
					type: "select",
					name: "value",
					message: "Framework",
					choices: [{ title: "Commander", value: "commander-typescript" }],
				})
				switch (framework.value) {
					case "cli-typescript":
						const commander = new TemplateInstaller("commander-typescript")
						commander.install()
						break
				}
			}
			if (language === "python") {
				const framework = await prompts({
					type: "select",
					name: "value",
					message: "Framework",
					choices: [{ title: "Click", value: "click" }],
				})
				switch (framework.value) {
					case "click":
						const click = new TemplateInstaller("click-python")
						click.install()
						break
				}
			}
		}
		if (projectType === "gui") {
			if (language === "python") {
				const framework = await prompts({
					type: "select",
					name: "value",
					message: "Framework",
					choices: [{ title: "Tkinter", value: "tkinter" }],
				})
				switch (framework.value) {
					case "tkinter":
						const tkinter = new TemplateInstaller("tkinter-python")
						tkinter.install()
						break
				}
			}
		}
	}
}
