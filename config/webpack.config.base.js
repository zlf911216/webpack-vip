const HTMLWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const fs = require('fs')

let HTMLPlugins = []
let Entries = {}

fs.readdirSync(`./vipkid/module`).forEach(page => {
	const htmlPlugin = new HTMLWebpackPlugin({
		filename: `${page}.html`,
		template: process.cwd() + `/vipkid/module/${page}/index.html`,
		chunks: [page, 'commons'],
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
				// 对 css 后缀名进行处理
				test:/\.css$/,
				// 不处理 node_modules 文件中的 css 文件
				exclude: /node_modules/,
				// 抽取 css 文件到单独的文件夹
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [{
						loader:"css-loader",
						options:{
							// 开启 css 压缩
							minimize:true,
						}
					},
						{
							loader:"postcss-loader",
						}
					]
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: {
					loader: "file-loader",
					options: {
						// 打包生成图片的名字
						name: "[name].[ext]",
						// 图片的生成路径
						outputPath: "images/"
					}
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ["file-loader"]
			}
		],
	},
	// 插件
	plugins: [
		// 将 css 抽取到某个文件夹
		new ExtractTextPlugin("css/[name]-[hash].css"),
		// 自动生成 HTML 插件
		...HTMLPlugins
	]
}