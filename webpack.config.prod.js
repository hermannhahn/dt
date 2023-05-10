const os = require("os")
const path = require("path")
const { execSync } = require("child_process")
const nodeExternals = require("webpack-node-externals")
const fs = require("fs")
const { exec } = require("child_process")

module.exports = {
	entry: {
		dt: "./src/dt.ts",
	},
	target: "node",
	mode: "production",
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "[name].js",
		libraryTarget: "commonjs",
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
							plugins: ["@babel/plugin-transform-arrow-functions"],
						},
					},
					"ts-loader",
				],
				exclude: [/node_modules/],
			},
		],
	},
	// ignorar os módulos do node_modules
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
				compiler.hooks.afterEmit.tap("AfterEmitPlugin", async (compilation) => {
					// Compile
					execSync("npm run compile")

					// Create release folder if not exists
					if (!fs.existsSync("./release")) {
						fs.mkdirSync("./release")
					}

					// Remove old zip files
					execSync("rm -rf ./release/*")

					// Zip dist/win folder
					execSync("zip -r ./release/win.zip ./dist/win")

					// Zip dist/linux folder
					execSync("zip -r ./release/linux.zip ./dist/linux")

					// Zip dist/macos folder
					execSync("zip -r ./release/macos.zip ./dist/macos")

					// Update dev version
					let folder = os.homedir()

					// If windows
					if (process.platform === "win32") {
						// Set folder
						folder = path.join(
							os.homedir(),
							"AppData",
							"Local",
							"Programs",
							"dt"
						)

						// Check if 'AppData/Local/Programs/dt' folder exists
						if (!fs.existsSync(folder)) {
							// Create 'AppData/Local/Programs/dt' folder if not exists
							fs.mkdirSync(folder)
						}

						// Copy binaries to dt folder
						execSync(`cp -r ./dist/win/dt.exe ${path.join(folder, "dt.exe")}`)
					}

					// If linux
					if (process.platform === "linux") {
						// Set folder
						folder = "/.local/share/dt"

						// Check if '.local/share/dt' folder exists
						if (!fs.existsSync(folder)) {
							// Create '.local/share/dt' folder if not exists
							fs.mkdirSync(folder)
						}

						// Copy binaries to dt folder
						execSync(`cp -r ./dist/linux/dt ${folder}/dt`)
					}

					// If mac
					if (process.platform === "darwin") {
						// Set folder
						folder = "/Library/Application Support/dt"

						// Check if 'Library/Application Support/dt' folder exists
						if (!fs.existsSync(folder)) {
							// Create 'Library/Application Support/dt' folder if not exists
							fs.mkdirSync(folder)
						}

						// Copy binaries to dt folder
						execSync(`cp -r ./dist/macos/dt ${folder}/dt`)
					}
				})
			},
		},
	],
}
