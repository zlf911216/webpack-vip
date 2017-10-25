const webpackBase = require("./webpack.config.base")
const webpackMerge = require("webpack-merge")

module.exports = webpackMerge(webpackBase, {
	// 输出文件
	output: {
		filename: "js/[name]-[hash].js",
		path: process.cwd() + "/dev",
		chunkFilename: "[id].chunk.js",
	},
	// 配置 webpack-dev-server
	devServer: {
		// 项目根目录
		contentBase: process.cwd() + "/dev",
		hot: true,
		// 错误、警告展示设置
		overlay: {
			errors: true,
			warnings: true
		}
	}
})