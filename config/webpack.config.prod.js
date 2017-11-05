const glob = require('glob')
const webpack = require("webpack")
const webpackBase = require("./webpack.config.base")
const webpackMerge = require("webpack-merge")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const HTMLWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

let HTMLPlugins = []
let Entries = {}

glob.sync('./vipkid/module/*').forEach(path => {
	let pathSplit = path.split('/')
	let page = pathSplit[pathSplit.length - 1]
	const htmlPlugin = new HTMLWebpackPlugin({
		filename: `${page}.html`,
		template: process.cwd() + `/vipkid/module/${page}/index.pug`,
		chunks: [page, 'vendor', 'manifest']
	})
	HTMLPlugins.push(htmlPlugin)
	Entries[page] = process.cwd() + `/vipkid/module/${page}/index.js`
})
// 公共资源添加
Entries['manifest'] = [
	'vue-router',
	'vuex',
	'vue',
	'babel-polyfill'
]

module.exports = webpackMerge(webpackBase, {
	// 入口文件
	entry: Entries,
  // 输出文件
  output: {
    filename: "js/[name]-[hash].js",
    path: process.cwd() + "/prod",
    chunkFilename: "js/[id]-[hash].js",
    publicPath: ''
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
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    // 自动清理 dist 文件夹
    new CleanWebpackPlugin(
      ['prod'], //匹配删除的文件
      {
        root: process.cwd(), //根目录
        verbose: true, //开启在控制台输出信息
        dry: false //启用删除文件
      }
    ),
    // 代码压缩
    new webpack.optimize.UglifyJsPlugin(),
    // 将 css 抽取到某个文件夹
    // new ExtractTextPlugin("css/[name]-[hash].css"),
		// 自动生成 HTML 插件
		...HTMLPlugins
  ]
})