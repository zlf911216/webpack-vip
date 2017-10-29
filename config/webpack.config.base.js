const webpack = require('webpack')

module.exports = {
	// 启用 sourceMap
	// devtool: "cheap-module-source-map",
	// 加载器
	resolve: {
		alias: {
			'~components': `${process.cwd()}/vue-components`,
			'~images': `${process.cwd()}/vipkid/images`,
			'~lib': `${process.cwd()}/vipkid/lib`
		}
	},
	module: {
		rules: [
			{
				test: /\.pug$/,
				exclude: /node_modules/,
				loader: 'pug-loader'
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
		})
	]
}