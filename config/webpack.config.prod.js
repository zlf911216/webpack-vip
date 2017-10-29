const webpackBase = require("./webpack.config.base")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpackMerge = require("webpack-merge")
const webpack = require("webpack")

module.exports = webpackMerge(webpackBase, {
  // 输出文件
  output: {
    filename: "js/[name]-[hash].js",
    path: process.cwd() + "/dist",
    chunkFilename: "[id].chunk.js",
  },
	module: {
		rules: [
      {
        // 对 css 后缀名进行处理
        test: /\.sass/,
        // 不处理 node_modules 文件中的 css 文件
        exclude: [/node_modules/],
        // 抽取 css 文件到单独的文件夹
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!postcss-loader!sass-loader"
        })
      }
    ]
	},
  plugins: [
    // 自动清理 dist 文件夹
    new CleanWebpackPlugin(
      ['dist'], //匹配删除的文件
      {
        root: process.cwd(), //根目录
        verbose: true, //开启在控制台输出信息
        dry: false //启用删除文件
      }
    ),
    // 代码压缩
    new webpack.optimize.UglifyJsPlugin(),
    // 将 css 抽取到某个文件夹
    new ExtractTextPlugin("css/[name]-[hash].css")
  ]
})