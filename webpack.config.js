const path = require('path')
const os = require('os')
const nodeExternals = require('webpack-node-externals')
const { execSync } = require('child_process')

module.exports = {
	entry: {
		dt: './src/dt.ts',
	},
	target: 'node',
	mode: 'production',
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
	// adicionando a configuração para ignorar os módulos do node_modules
	externals: [
		nodeExternals(),
		{
			'./': './',
			'**': './src/**/*',
		},
	],
	plugins: [
		{
			apply: async (compiler) => {
				compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
					// Compile
					execSync('npm run compile')

					let folder = os.homedir()

					// If windows
					if (process.platform !== 'win32') {
						// Set folder
						folder = folder + '/AppData/Local/Programs/dt'

						// Check if 'AppData/Local/Programs/dt' folder exists
						if (!require('fs').existsSync(folder)) {
							// Create 'AppData/Local/Programs/dt' folder if not exists
							require('fs').mkdirSync(folder)
						}

						// Copy binaries to dt folder
						execSync(`cp -r ./dist/dt-win.exe ${folder}/dt.exe`)
					}

					// If linux
					if (process.platform === 'linux') {
						// Set folder
						folder = '/.local/share/dt'

						// Check if '.local/share/dt' folder exists
						if (!require('fs').existsSync(folder)) {
							// Create '.local/share/dt' folder if not exists
							require('fs').mkdirSync(folder)
						}

						// Copy binaries to dt folder
						execSync(`cp -r ./dist/dt-linux ${folder}/dt`)
					}

					// If mac
					if (process.platform === 'darwin') {
						// Set folder
						folder = '/Library/Application Support/dt'

						// Check if 'Library/Application Support/dt' folder exists
						if (!require('fs').existsSync(folder)) {
							// Create 'Library/Application Support/dt' folder if not exists
							require('fs').mkdirSync(folder)
						}

						// Copy binaries to dt folder
						execSync(`cp -r ./dist/dt-macos ${folder}/dt`)
					}

					// Check if dt folder is in PATH
					if (!process.env.PATH.indexOf(folder) === -1) {
						// Export PATH
						execSync(`export PATH=$PATH:${folder}`)
					}
				})
			},
		},
	],
}
