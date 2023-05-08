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

					// Get updates from CHANGELOG.md
					const updates = fs.readFileSync('./CHANGELOG.md', 'utf8')

					// Publish release on github
					execSync(
						`gh release create v${versionBranch} --target=latest --title "v${versionBranch}" --notes ${updates} --repo hermannhahn/main ./dist/win/* ./dist/macos/* ./dist/linux/*`
					)
				})
			},
		},
	],
}
