const webpackBase = require("./webpack.config.base")
const webpackMerge = require("webpack-merge")
const webpack = require("webpack")

module.exports = webpackMerge(webpackBase, {
	// 输出文件
	output: {
		filename: "js/[name]-[hash].js",
		path: process.cwd() + "/dist",
		chunkFilename: "[id].chunk.js",
	},
	plugins: [
		// 代码压缩
		new webpack.optimize.UglifyJsPlugin({
			// 开启 sourceMap
			sourceMap: true
		}),
		// 提取公共 JavaScript 代码
		new webpack.optimize.CommonsChunkPlugin({
			// chunk 名为 commons
			name: "commons",
			filename: "js/[name]-[hash].js",
			publicPath: "/dist/"
		}),
	]
})