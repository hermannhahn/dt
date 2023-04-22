// Description: Next.js TypeScript template
// Configuration:
// Target: es2018
// Module: commonjs
// Ambient: Browser
// Addons: prettier, eslint, babel, webpack, and jest

export class NextTypescript {
	public name = "next-typescript"
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
        "outDir": "pre-build",
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
        "pre-build",
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
			path: ".prettierrc.json",
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
			path: ".eslintrc.json",
			content: `
{
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": ["react", "prettier", "@typescript-eslint"],
    "rules": {
        "prettier/prettier": "error",
        "react/prop-types": 0
    }
}
            `,
		},
		{
			path: ".babelrc",
			content: `
{
    "presets": ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
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

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
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
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, "build"),
        compress: true,
        port: 9000,
    },
}
            `,
		},
		{
			path: "src/index.html",
			content: `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Next.js TypeScript</title>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
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
			path: "src/index.spec.tsx",
			content: `
import React from "react"
import { render } from "@testing-library/react"
import App from "./index"

test("renders learn react link", () => {
    const { getByText } = render(<App />)
    const linkElement = getByText(/learn react/i)
    expect(linkElement).toBeInTheDocument()
})
            `,
		},
	]

	public scripts = {
		build: "webpack --mode production",
		dev: "webpack serve --mode development",
		lint: "eslint --ext .ts,.tsx,.js,.jsx src",
		test: "jest",
		prettier: "prettier --write .",
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
		"@types/webpack-env",
		"@typescript-eslint/eslint-plugin",
		"@typescript-eslint/parser",
		"babel-loader",
		"clean-webpack-plugin",
		"css-loader",
		"eslint",
		"eslint-config-prettier",
		"eslint-plugin-prettier",
		"eslint-plugin-react",
		"html-webpack-plugin",
		"jest",
		"prettier",
		"style-loader",
		"ts-jest",
		"ts-loader",
		"typescript",
		"webpack",
		"webpack-cli",
		"webpack-dev-server",
	]

	public dependencies = ["react", "react-dom"]

	public globalDependencies = [
		"typescript",
		"webpack",
		"webpack-cli",
		"webpack-dev-server",
		"ts-loader",
		"babel-loader",
		"jest",
		"ts-jest",
		"eslint",
		"prettier",
	]
}
