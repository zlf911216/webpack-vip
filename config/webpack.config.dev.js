const webpackBase = require("./webpack.config.base")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const webpackMerge = require("webpack-merge")

module.exports = webpackMerge(webpackBase, {
  // 输出文件
  output: {
    filename: "js/[name]-[hash].js",
    path: process.cwd() + "/dev",
    chunkFilename: "[id].chunk.js",
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
    new CleanWebpackPlugin(
      ['dev'],  // 匹配删除的文件
      {
        root: process.cwd(), // 根目录
        verbose: true, // 开启在控制台输出信息
        dry: false // 启用删除文件
      }
    ),
  ],
  // 配置 webpack-dev-server
  devServer: {
    // 项目根目录
    contentBase: process.cwd() + "/dev",
    noInfo: false,
    compress: true,
    hot: true,
    // 错误、警告展示设置
    overlay: {
      errors: true,
      warnings: true
    }
  }
})