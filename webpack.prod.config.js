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

					// root dir
					const rootDir = execSync('pwd')
					console.log(rootDir)

					// Create release folder if not exists
					if (!fs.existsSync('./release')) {
						fs.mkdirSync('./release')
					}

					// Remove old zip files
					execSync('rm -rf ./release/*')

					// Zip dist/win folder
					execSync('zip -r ./release/win.zip ./dist/win')

					// Zip dist/linux folder
					execSync('zip -r ./release/linux.zip ./dist/linux')

					// Zip dist/macos folder
					execSync('zip -r ./release/macos.zip ./dist/macos')

					// Save files
					execSync('dt save')

					// Deploy to github
					execSync('dt deploy')

					// Publish release on github
					execSync(
						`gh release create v${versionBranch} --title "v${versionBranch}" -F CHANGELOG.md --repo hermannhahn/dt ${rootDir}/release`
					)
				})
			},
		},
	],
}
