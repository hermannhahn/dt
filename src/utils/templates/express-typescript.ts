// Description: Express.js TypeScript template
// Addons: typescript, prettier, eslint, babel, webpack, and jest

export class ExpressTypescript {
	public name = "express-typescript"
	public folders = ["src", "compile", "build", "dist"]

	public files = [
		{
			path: "tsconfig.json",
			content: `
{
    "compilerOptions": {
        "target": "es2018",
        "module": "commonjs",
        "baseUrl": ".",
        "outDir": "compile",
        "rootDir": "src",
        "strict": true,
        "forceConsistentCasingInFileNames": true,
        "esModuleInterop": true,
        "sourceMap": true,
        "typeRoots": ["node_modules/@types"],
        "types": ["node"],
        "paths": {
            "*": ["src/*"]
        }
    },
    "include": ["src/**/*"],
    "exclude": [
        "node_modules",
        "**/*.spec.ts",
        "**/*.test.ts",
        "dist",
        "compile",
        "build"
    ]
}
            `,
		},
		{
			path: "src/index.ts",
			content: `console.log('Hello world!')`,
		},
		{
			path: ".prettierrc",
			content: `
{
    "printWidth": 80,
    "tabWidth": 4,
    "useTabs": false,
    "semi": true,
    "singleQuote": true,
    "trailingComma": "es5",
    "bracketSpacing": true,
    "arrowParens": "avoid",
    "endOfLine": "lf"
}
            `,
		},
		{
			path: ".eslintrc.js",
			content: `
module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
        commonjs: true,
    },
    parser: "@babel/eslint-parser",
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
    },
    plugins: ["import"],
    extends: [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "prettier",
    ],
    rules: {
        "import/no-unresolved": "error",
        "import/named": "error",
        "import/default": "error",
        "import/namespace": "error",
        "import/no-named-as-default": "error",
        "import/no-named-as-default-member": "error",
        "import/no-extraneous-dependencies": [
            "error",
            { devDependencies: ["**/*.test.js", "**/*.spec.js"] },
        ],
        "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        semi: ["error", "never"],
        "comma-dangle": ["error", "always-multiline"],
        quotes: ["error", "single"],
    },
}
            `,
		},
		{
			path: ".babelrc",
			content: `
{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-typescript"
    ]
}
            `,
		},
		{
			path: "webpack.config.js",
			content: `
const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/public/index.html",
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "src/assets",
                    to: "assets",
                },
            ],
        }),
    ],
}
            `,
		},
		{
			path: "jest.config.js",
			content: `
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
}
            `,
		},
		{
			path: "src/public/index.html",
			content: `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>React App</title>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
            `,
		},
		{
			path: "src/index.tsx",
			content: `
import React from "react"
import ReactDOM from "react-dom"

const App = () => {
    return <div>Hello world!</div>
}

ReactDOM.render(<App />, document.getElementById("root"))
            `,
		},
		{
			path: "src/App.tsx",
			content: `
import React from "react"

const App = () => {
    return <div>Hello world!</div>
}

export default App

            `,
		},
		{
			path: "src/App.test.tsx",
			content: `
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<App />, div)
    ReactDOM.unmountComponentAtNode(div)
})
            `,
		},
		{
			path: "src/index.test.tsx",
			content: `
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<App />, div)
    ReactDOM.unmountComponentAtNode(div)
})
            `,
		},
		{
			path: "src/components/Hello.tsx",
			content: `
import React from "react"

interface Props {
    name: string
}

const Hello = (props: Props) => {
    return <div>Hello {props.name}</div>
}

export default Hello
            `,
		},
		{
			path: "src/components/Hello.test.tsx",
			content: `
import React from "react"
import ReactDOM from "react-dom"
import Hello from "./Hello"

it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<Hello name="world" />, div)
    ReactDOM.unmountComponentAtNode(div)
})
            `,
		},
		{
			path: "src/components/Hello.spec.tsx",
			content: `
import React from "react"
import ReactDOM from "react-dom"
import Hello from "./Hello"

it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<Hello name="world" />, div)
    ReactDOM.unmountComponentAtNode(div)
})
            `,
		},
	]

	public scripts = {
		start: "webpack-dev-server --mode development --open",
		build: "webpack --mode production",
		test: "jest",
		lint: "eslint --ext .js,.jsx,.ts,.tsx src",
		format: 'prettier --write "src/**/*.{js,jsx,ts,tsx,json,css,md}"',
		precommit: "lint-staged",
		prepush: "npm run test",
	}

	public devDependencies = [
		"@babel/core",
		"@babel/preset-env",
		"@babel/preset-react",
		"@babel/preset-typescript",
		"@types/jest",
		"@types/node",
		"@types/react",
		"@types/react-dom",
		"@typescript-eslint/eslint-plugin",
		"@typescript-eslint/parser",
		"babel-loader",
		"clean-webpack-plugin",
		"copy-webpack-plugin",
		"css-loader",
		"eslint",
		"eslint-config-prettier",
		"eslint-plugin-prettier",
		"eslint-plugin-react",
		"eslint-plugin-react-hooks",
		"html-webpack-plugin",
		"typescript",
		"jest",
		"prettier",
	]

	public dependencies = [
		"react",
		"react-dom",
		"react-router-dom",
		"webpack",
		"webpack-cli",
		"webpack-dev-server",
		"ts-jest",
		"ts-loader",
		"style-loader",
		"file-loader",
	]

	public globalDependencies = [
		"typescript",
		"webpack",
		"webpack-cli",
		"webpack-dev-server",
		"ts-jest",
		"ts-loader",
		"jest",
	]
}
