// Description: Eslint Typescript template
// Addons: typescript, prettier, eslint, babel, webpack, and jest

export class CommanderTypescript {
	public name = "commander-typescript"
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
const path = require('path')
module.exports = {
    entry: {
        app: "./src/index.ts",
    },
    target: "node",
    mode: "production",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].js",
        libraryTarget: "commonjs2",
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [["@babel/preset-env", { targets: "defaults" }]],
                        },
                    },
                    "ts-loader",
                ],
                exclude: [/node_modules/],
            },
        ],
    },
    // adicionando a configuração para ignorar os módulos do node_modules
    externals: [
        nodeExternals(),
        {
            "./": "./",
            "**": "./src/**/*",
        },
    ],
    plugins: [
        {
            apply: (compiler) => {
                compiler.hooks.afterEmit.tap("AfterEmitPlugin", (compilation) => {
                    execSync("npm run compile")
                })
            },
        },
    ],
}
            `,
		},
		{
			path: "jest.config.js",
			content: `
module.exports = {
    roots: ["./src"],
    testEnvironment: 'node',
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
}
            `,
		},
		{
			path: "test/index.test.ts",
			content: `
import { sum } from '../src/index'

describe('sum', () => {
    it('should sum two numbers', () => {
        expect(sum(1, 2)).toBe(3)
    })
})
            `,
		},
	]

	public scripts = [
		{
			name: "eslint",
			command:
				"echo 'Linting...' && eslint src/**/*.ts --fix --ext .ts,.js,.json --ignore-path .gitignore && echo 'Linted!'",
		},
		{
			name: "eslint:check",
			command:
				"echo 'Linting...' && eslint src/**/*.ts --ext .ts,.js,.json --ignore-path .gitignore && echo 'Linted!'",
		},
		{
			name: "lint-staged",
			command: "echo 'Linting...' && lint-staged && echo 'Linted!'",
		},
		{
			name: "prettier",
			command:
				"echo 'Formatting...' && prettier --write \"src/**/*.ts\" && echo 'Formatted!'",
		},
		{
			name: "prettier:check",
			command:
				"echo 'Formatting...' && prettier --check \"src/**/*.ts\" && echo 'Format Checked!'",
		},
		{
			name: "dev",
			command:
				'nodemon --watch src --exec "webpack --mode development --watch" --ext *.ts,*.js,*.json',
		},
		{
			name: "build",
			command: "title Building... && webpack --mode production && title Built!",
		},
		{
			name: "compile",
			command:
				"title Compiling... && pkg build/index.js --target node18-win-x64,node18-macos-x64,node18-linux-x64 --out-dir ./dist && title Compiled!",
		},
		{
			name: "start",
			command: "node build/index.js",
		},
	]

	public devDependencies = [
		"typescript",
		"@babel/core",
		"@babel/eslint-parser",
		"@babel/preset-env",
		"@babel/preset-typescript",
		"@types/node",
		"@types/jest",
		"@types/prompts",
		"@types/dotenv",
		"eslint-plugin-import",
		"eslint-plugin-prettier",
		"eslint-config-prettier",
		"prettier-eslint",
		"prettier-eslint-cli",
		"prettier-eslint-config",
		"prettier-eslint-config-prettier",
		"babel",
		"eslint",
		"prettier",
		"ts-loader",
		"node-externals",
		"webpack",
		"webpack-cli",
		"webpack-node-externals",
		"jest",
		"ts-node",
		"ts-jest",
	]

	public dependencies = [
		"commander",
		"@commander-js/extra-typings",
		"dotenv",
		"prompts",
	]

	public globalDependencies = [
		"nodemon",
		"pkg",
		"ts-node",
		"lint-staged",
		"typescript",
		"eslint",
		"prettier",
		"jest",
		"webpack-cli",
	]
}
