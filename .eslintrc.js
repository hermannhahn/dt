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
