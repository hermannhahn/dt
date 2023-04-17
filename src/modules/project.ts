import * as fs from "fs"
import { Command } from "utils/command-runner"
import { terminal } from "utils/terminal-log"

const prompts = require("prompts")

export class Project {
	static async requirements() {
		// Get git root directory
		terminal.logInline("package", "Checking project requirements...")
		const rootDir: any = new Command("git rev-parse --show-toplevel").toString()

		// Check if package.json exists
		if (!fs.existsSync(`${rootDir}/package.json`)) {
			terminal.label("red", "error")
			terminal.log(
				"error",
				"package.json not found, run \x1b[1mdt init\x1b[0m command first"
			)
			process.exit(1)
		}
		terminal.label("green", "OK")
	}

	private async chooseLanguage() {
		const language = await prompts({
			type: "select",
			name: "selected",
			message: "Choose language",
			choices: [
				{ title: "TypeScript", value: "ts" },
				{ title: "JavaScript", value: "js" },
				{ title: "Python", value: "py" },
				{ title: "Golang", value: "go" },
			],
		})
		return language.selected
	}

	private async chooseAmbient(language: string) {
		if (language === "ts" || language === "js") {
			const ambient = await prompts({
				type: "select",
				name: "selected",
				message: "Choose ambient",
				choices: [
					{ title: "Node.js", value: "node" },
					{ title: "Browser", value: "browser" },
				],
			})
			return ambient.selected
		}
		return ""
	}

	private async chooseFramework(language: string, ambient: string) {
		if (language === "ts" || language === "js") {
			if (ambient === "node") {
				const framework = await prompts({
					type: "select",
					name: "selected",
					message: "Choose framework",
					choices: [
						{ title: "CLI", value: "cli" },
						{ title: "Express", value: "express" },
						{ title: "Fastify", value: "fastify" },
					],
				})
				return framework.selected
			}
			if (ambient === "browser") {
				const framework = await prompts({
					type: "select",
					name: "selected",
					message: "Choose framework",
					choices: [
						{ title: "React", value: "react" },
						{ title: "Next.js", value: "next" },
					],
				})
				return framework.selected
			}
		}
		if (language === "py") {
			const framework = await prompts({
				type: "select",
				name: "selected",
				message: "Choose framework",
				choices: [
					{ title: "Flask", value: "flask" },
					{ title: "Django", value: "django" },
				],
			})
			return framework.selected
		}
		if (language === "go") {
			const framework = await prompts({
				type: "select",
				name: "selected",
				message: "Choose framework",
				choices: [
					{ title: "Gin", value: "gin" },
					{ title: "Echo", value: "echo" },
					{ title: "Fiber", value: "fiber" },
				],
			})
			return framework.selected
		}
		return ""
	}

	private async chooseDatabase() {
		const database = await prompts({
			type: "select",
			name: "selected",
			message: "Choose database",
			choices: [
				{ title: "MongoDB", value: "mongo" },
				{ title: "MySQL", value: "mysql" },
				{ title: "PostgreSQL", value: "postgres" },
				{ title: "SQLite", value: "sqlite" },
			],
		})
		return database.selected
	}

	public async installTemplate() {
		const rootDir: any = new Command("git rev-parse --show-toplevel").toString()
		const language = await this.chooseLanguage()
		const ambient = await this.chooseAmbient(language)
		const framework = await this.chooseFramework(language, ambient)
		const database = await this.chooseDatabase()

		terminal.logInline("package", "Installing dependencies...")

		// Language dependencies
		if (language === "js" || language === "ts") {
			new Command("npm i -D @babel/core")
			new Command("npm i -D @babel/preset-env")
			new Command("npm i -D @babel/eslint-parser")
			// EsLint
			new Command("npm i -D eslint")
			new Command("npm i -D eslint-config-prettier")
			new Command("npm i -D eslint-plugin-prettier")
			new Command("npm i -D eslint-plugin-import")
			new Command("npm i -D eslint-plugin-node")
			new Command("npm i -D eslint-plugin-promise")
			new Command("npm i -D eslint-plugin-standard")
			new Command("npm i -D eslint-plugin-unicorn")
			new Command("npm i -D eslint-plugin-jsdoc")
		}
		if (language === "ts") {
			new Command("npm i -D typescript")
			new Command("npm i -g typescript")
			new Command("npm i -D @types/node")
			new Command("npm i -D ts-node")
			new Command("npm i -g ts-node")
			new Command("npm i -D ts-loader")
			new Command("npm i -D @babel/preset-typescript")
			// EsLint
			new Command("npm i -D @typescript-eslint/eslint-plugin")
			new Command("npm i -D @typescript-eslint/parser")

			// Create tsconfig.json
			fs.writeFileSync(
				`${rootDir}/tsconfig.json`,
				JSON.stringify(
					{
						compilerOptions: {
							target: "es2018",
							module: "commonjs",
							strict: true,
							esModuleInterop: true,
							outDir: "prebuild",
							rootDir: "src",
							forceConsistentCasingInFileNames: true,
							sourceMap: true,
							typeRoots: ["node_modules/@types"],
							types: ["node"],
							paths: {
								"*": ["src/*"],
							},
						},
						include: ["src/**/*"],
						exclude: [
							"node_modules",
							"prebuild",
							"dist",
							"**/*.test.ts",
							"**/*.spec.ts",
						],
					},
					null,
					2
				)
			)
		}
		if (language === "go") {
			new Command("go mod init")
		}

		// Framework dependencies
		if (framework === "cli") {
			if (language === "js") {
				new Command("npm i commander")
				new Command("npm i chalk")
				// Babel config
				fs.writeFileSync(
					`${rootDir}/.babelrc`,
					JSON.stringify({
						presets: ["@babel/preset-env"],
					})
				)
			}
			if (language === "ts") {
				new Command("npm i commander")
				new Command("npm i @commander-js/extra-typings")
				new Command("npm i chalk")
				// Babel config
				fs.writeFileSync(
					`${rootDir}/.babelrc`,
					JSON.stringify({
						presets: ["@babel/preset-env", "@babel/preset-typescript"],
					})
				)
			}
		}
		if (framework === "express") {
			if (language === "js") {
				new Command("npm i express")
				// Babel config
				fs.writeFileSync(
					`${rootDir}/.babelrc`,
					JSON.stringify({
						presets: ["@babel/preset-env"],
					})
				)
			}
			if (language === "ts") {
				new Command("npm i express")
				new Command("npm i @types/express")
				// Babel config
				fs.writeFileSync(
					`${rootDir}/.babelrc`,
					JSON.stringify({
						presets: ["@babel/preset-env", "@babel/preset-typescript"],
					})
				)
			}
		}
		if (framework === "fastify") {
			if (language === "js") {
				new Command("npm i fastify")
				// Babel config
				fs.writeFileSync(
					`${rootDir}/.babelrc`,
					JSON.stringify({
						presets: ["@babel/preset-env"],
					})
				)
			}
			if (language === "ts") {
				new Command("npm i fastify")
				new Command("npm i @types/fastify")
				// Babel config
				fs.writeFileSync(
					`${rootDir}/.babelrc`,
					JSON.stringify({
						presets: ["@babel/preset-env", "@babel/preset-typescript"],
					})
				)
			}
		}
		if (framework === "react") {
			if (language === "js" || language === "ts") {
				new Command("npm i react")
				new Command("npm i react-dom")
				new Command("npm i @babel/preset-react")
				// EsLint
				new Command("npm i -D eslint-plugin-react")
				new Command("npm i -D eslint-plugin-react-hooks")
			}
			if (language === "js") {
				// Babel config
				fs.writeFileSync(
					`${rootDir}/.babelrc`,
					JSON.stringify({
						presets: ["@babel/preset-env", "@babel/preset-react"],
					})
				)
			}
			if (language === "ts") {
				new Command("npm i react")
				new Command("npm i react-dom")
				new Command("npm i @types/react")
				new Command("npm i @types/react-dom")
				// Babel config
				fs.writeFileSync(
					`${rootDir}/.babelrc`,
					JSON.stringify({
						presets: [
							"@babel/preset-env",
							"@babel/preset-react",
							"@babel/preset-typescript",
						],
					})
				)
			}
		}
		if (framework === "next") {
			if (language === "js") {
				new Command("npm i next")
				// Babel config
				fs.writeFileSync(
					`${rootDir}/.babelrc`,
					JSON.stringify({
						presets: ["@babel/preset-env", "@babel/preset-react"],
					})
				)
			}
			if (language === "ts") {
				new Command("npm i next")
				new Command("npm i @types/next")
				// Babel config
				fs.writeFileSync(
					`${rootDir}/.babelrc`,
					JSON.stringify({
						presets: [
							"@babel/preset-env",
							"@babel/preset-react",
							"@babel/preset-typescript",
						],
					})
				)
			}
		}
		if (framework === "flask") {
			if (language === "py") {
				new Command("pip install flask")
			}
		}
		if (framework === "django") {
			if (language === "py") {
				new Command("pip install django")
			}
		}
		if (framework === "gin") {
			if (language === "go") {
				new Command("go get github.com/gin-gonic/gin")
			}
		}
		if (framework === "echo") {
			if (language === "go") {
				new Command("go get github.com/labstack/echo")
			}
		}
		if (framework === "fiber") {
			if (language === "go") {
				new Command("go get github.com/gofiber/fiber")
			}
		}
	}
}
