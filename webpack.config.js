const os = require('os')
const path = require('path')
const { execSync } = require('child_process')
const nodeExternals = require('webpack-node-externals')
const fs = require('fs-extra')

module.exports = {
	entry: {
		dt: './src/dt.ts',
	},
	target: 'node',
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js',
		libraryTarget: 'commonjs2',
	},
	resolve: {
		extensions: ['.ts', '.js'],
		modules: [path.resolve(__dirname, 'src'), 'node_modules'],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [['@babel/preset-env', { targets: 'defaults' }]],
						},
					},
					'ts-loader',
				],
				exclude: [/node_modules/],
			},
		],
	},
	// ignorar os módulos do node_modules
	externals: [
		nodeExternals(),
		{
			'./': './',
			'**': './src/**/*',
		},
	],
	plugins: [
		{
			apply: (compiler) => {
				compiler.hooks.afterEmit.tap('AfterEmitPlugin', async (compilation) => {
					// Compile
					execSync('npm run compile')
					execSync('npm run compile-update')

					// Get version from package.json
					const versionBranch = JSON.parse(
						fs.readFileSync('./package.json')
					).version

					// Update version.txt file
					fs.writeFileSync('./version.txt', versionBranch)

					// Copy version.txt to dist/* folders
					execSync('cp -r ./version.txt ./dist/win/version.txt')
					execSync('cp -r ./version.txt ./dist/linux/version.txt')
					execSync('cp -r ./version.txt ./dist/macos/version.txt')

					let folder = os.homedir()

					// If windows
					if (process.platform === 'win32') {
						// Set folder
						folder = path.join(
							os.homedir(),
							'AppData',
							'Local',
							'Programs',
							'dt'
						)

						// Check if 'AppData/Local/Programs/dt' folder exists
						if (!fs.existsSync(folder)) {
							// Create 'AppData/Local/Programs/dt' folder if not exists
							fs.mkdirSync(folder)
						}

						// Copy binaries to dt folder
						execSync(`cp -r ./dist/win/dt.exe ${path.join(folder, 'dt.exe')}`)
						execSync(
							`cp -r ./dist/win/dt-update.exe ${path.join(
								folder,
								'dt-update.exe'
							)}`
						)
					}

					// If linux
					if (process.platform === 'linux') {
						// Set folder
						folder = '/.local/share/dt'

						// Check if '.local/share/dt' folder exists
						if (!fs.existsSync(folder)) {
							// Create '.local/share/dt' folder if not exists
							fs.mkdirSync(folder)
						}

						// Copy binaries to dt folder
						execSync(`cp -r ./dist/linux/dt ${folder}/dt`)
						execSync(`cp -r ./dist/linux/dt-update ${folder}/dt-update`)
					}

					// If mac
					if (process.platform === 'darwin') {
						// Set folder
						folder = '/Library/Application Support/dt'

						// Check if 'Library/Application Support/dt' folder exists
						if (!fs.existsSync(folder)) {
							// Create 'Library/Application Support/dt' folder if not exists
							fs.mkdirSync(folder)
						}

						// Copy binaries to dt folder
						execSync(`cp -r ./dist/macos/dt ${folder}/dt`)
						execSync(`cp -r ./dist/macos/dt-update ${folder}/dt-update`)
					}
				})
			},
		},
	],
}
