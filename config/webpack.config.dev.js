const webpackBase = require("./webpack.config.base")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const webpackMerge = require("webpack-merge")
const HTMLWebpackPlugin = require('html-webpack-plugin')
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true'
const webpack = require("webpack")
const glob = require('glob')

let HTMLPlugins = []
let Entries = {}

glob.sync('./vipkid/module/*').forEach(path => {
	let pathSplit = path.split('/')
	let page = pathSplit[pathSplit.length - 1]
	const htmlPlugin = new HTMLWebpackPlugin({
		filename: `views/${page}.html`,
		template: process.cwd() + `/vipkid/module/${page}/index.pug`,
		chunks: [page, 'vendor', 'manifest'],
		publicPath: 'views/'
	})
	HTMLPlugins.push(htmlPlugin)
	Entries[page] = [process.cwd() + `/vipkid/module/${page}/index.js`, hotMiddlewareScript]
})
// 公共资源添加
Entries['manifest'] = [
	'vue',
	'vue-router',
	'vuex',
	'babel-polyfill'
]

module.exports = webpackMerge(webpackBase, {
	// 入口文件
	entry: Entries,
	// 输出文件
	output: {
		filename: "js/[name]-[hash].js",
		path: process.cwd() + "/dev",
		chunkFilename: "js/[id]-[hash].js",
		publicPath: '',
	},
	module: {
		rules: [
			{
				// 对 css 后缀名进行处理
				test: /\.sass/,
				// 不处理 node_modules 文件中的 css 文件
				exclude: [/node_modules/],
				loader: ["vue-style-loader", "css-loader", "sass-loader"]
			},
			{
				test: /\.js$/,
				// 强制先进行 ESLint 检查
				enforce: "pre",
				// 不对 node_modules 和 lib 文件夹中的代码进行检查
				exclude: /node_modules|lib/,
				loader: "eslint-loader",
				options: {
					// 启用自动修复
					fix: false,
					// 启用警告信息
					emitWarning: true,
				}
			},
		]
	},
	plugins: [
		// 自动清理 dist 文件夹
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new CleanWebpackPlugin(
			['dev'],  // 匹配删除的文件
			{
				root: process.cwd(), // 根目录
				verbose: true, // 开启在控制台输出信息
				dry: false // 启用删除文件
			}
		),
		// 自动生成 HTML 插件
		...HTMLPlugins
	]
})