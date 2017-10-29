const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')

let HTMLPlugins = []
let Entries = {}

glob.sync('./vipkid/module/*').forEach(path => {
	let pathSplit = path.split('/')
	let page = pathSplit[pathSplit.length - 1]
	const htmlPlugin = new HTMLWebpackPlugin({
		filename: `${page}.html`,
		template: process.cwd() + `/vipkid/module/${page}/index.html`,
		chunks: [page, 'vendor', 'manifest'],
	})
	HTMLPlugins.push(htmlPlugin)
	Entries[page] = process.cwd() + `/vipkid/module/${page}/index.js`
})

module.exports = {
	// 入口文件
	entry: Entries,
	// 启用 sourceMap
	// devtool: "cheap-module-source-map",
	// 加载器
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			}, {
				test: /\.vue$/,
				loader: "vue-loader"
			}, {
				test: /\.(png|svg|jpg|gif)$/,
				use: {
					loader: "file-loader",
					options: {
						// 打包生成图片的名字
						name: "[name]-[hash].[ext]",
						// 图片的生成路径
						outputPath: "images/"
					}
				}
			}, {
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ["file-loader"]
			}
		],
	},
	// 插件
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'manifest']
		}),
		// 自动生成 HTML 插件
		...HTMLPlugins
	]
}