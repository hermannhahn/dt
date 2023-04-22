// Description: React Typescript template
// Addons: prettier, eslint, babel, webpack, and jest

export class ReactTypescript {
	public name = "react-typescript"
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
        "**/*.spec.tsx",
        "**/*.test.tsx",
        "dist",
        "compile",
        "build"
    ]
}
            `,
		},
		{
			path: "src/index.tsx",
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
module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    node: "current"
                }
            }
        ],
        "@babel/preset-react",
        "@babel/preset-typescript"
    ],
    plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-transform-runtime"
    ]
}
            `,
		},
		{
			path: "webpack.config.js",
			content: `
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
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
                    from: "src/public/assets",
                    to: "assets",
                },
            ],
        }),
    ],
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
        <title>React Typescript</title>
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
    return <h1>Hello World!</h1>
}

ReactDOM.render(<App />, document.getElementById("root"))
            `,
		},
		{
			path: "jest.config.js",
			content: `
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
}
            `,
		},
		{
			path: "src/__tests__/index.test.tsx",
			content: `
import React from "react"
import { render } from "@testing-library/react"
import App from "../index"

test("renders learn react link", () => {
    const { getByText } = render(<App />)
    const linkElement = getByText(/learn react/i)
    expect(linkElement).toBeInTheDocument()
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
		"@babel/plugin-proposal-class-properties",
		"@babel/plugin-proposal-object-rest-spread",
		"@babel/plugin-transform-runtime",
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
		"html-webpack-plugin",
		"husky",
		"jest",
		"lint-staged",
		"prettier",
	]

	public dependencies = [
		"react",
		"react-dom",
		"react-router-dom",
		"ts-jest",
		"typescript",
		"webpack",
		"webpack-cli",
		"webpack-dev-server",
		"style-loader",
		"file-loader",
	]

	public globalDependencies = [
		"typescript",
		"webpack",
		"webpack-cli",
		"webpack-dev-server",
		"ts-jest",
		"jest",
		"eslint",
		"prettier",
	]
}
