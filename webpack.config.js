const path = require("path")
const nodeExternals = require("webpack-node-externals")
const { execSync } = require("child_process")

module.exports = {
	entry: {
		dt: "./src/dt.ts",
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
					// Check if bin folder exists
					if (!require("fs").existsSync("./bin")) {
						require("fs").mkdirSync("./bin")
					}
					execSync("npm run compile")
				})
			},
		},
	],
}
