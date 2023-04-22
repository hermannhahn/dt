import { terminal } from "utils/terminal-log"

export const List = async () => {
	const templates = [
		{
			icon: "js",
			name: "cli-javascript",
			description: "Javascript cli template",
		},
		{
			icon: "ts",
			name: "cli-typescript",
			description: "Typescript cli template",
		},
		{
			icon: "py",
			name: "cli-python",
			description: "Python cli template",
		},
		{
			icon: "go",
			name: "cli-go",
			description: "Go cli template",
		},
		{
			icon: "js",
			name: "api-javascript",
			description: "Javascript api template",
		},
		{
			icon: "ts",
			name: "api-typescript",
			description: "Typescript api template",
		},
		{
			icon: "py",
			name: "api-python",
			description: "Python api template",
		},
		{
			icon: "go",
			name: "api-go",
			description: "Go api template",
		},
		{
			icon: "js",
			name: "react-javascript",
			description: "Javascript react template",
		},
		{
			icon: "ts",
			name: "react-typescript",
			description: "Typescript react template",
		},
	]

	terminal.log("list", "Available templates:")
	console.log(" ")
	console.log("     " + "Name".padEnd(20) + "Description")
	console.log("     " + "----".padEnd(20) + "-----------")
	templates.forEach((template) => {
		terminal.log(
			template.icon,
			"  " + template.name.padEnd(20) + template.description
		)
	})
}
