const express = require('express')
const app = express()
const bodyParse = require('body-parser')
const expressRouter = require('./controllers/routes')

app.set('views', `${process.cwd()}/${process.env.NODE_ENV}/views`)
app.engine('.html', require('ejs').renderFile)
app.set('view engine', 'html')

if (process.env.NODE_ENV === 'dev') {
	const webpack = require('webpack')
	const webpackDevConfig = require('./webpack.config.js')
	const webpackDevMiddleware = require('webpack-dev-middleware')
	const webpackHotMiddleware = require('webpack-hot-middleware')
	const compiler = webpack(webpackDevConfig)
	// 连接编译器和服务器
	// app.use(webpackDevMiddleware(compiler, {
	// 	publicPath: webpackDevConfig.output.publicPath,
	// 	inline: true,
	// 	open: true,
	// 	compress: true,
	// 	hot: true,
	// 	noInfo: false,
	// 	stats: {
	// 		colors: true
	// 	}
	// }))
	// 启用热更新
	app.use(webpackHotMiddleware(compiler))
} else {
	app.use(express.static(`${process.env.NODE_ENV}`))
}

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true }))
app.use(expressRouter)

// 运维监控探活服务
app.get('/health', (req, res) => {
	res.status(200).send('Alive')
})

// 创建服务器
app.listen(8080, error => {
	if (error) {
		throw error
	}
	console.log(`Listening on port 8080`)
})
