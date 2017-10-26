const webpackBase = require("./webpack.config.base")
const CleanWebpackPlugin = require("clean-webpack-plugin")
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