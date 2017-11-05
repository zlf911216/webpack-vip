const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const glob = require('glob')
const config = require('./config/webpack.config.dev')
const compiler = webpack(config)
const app = express()
// webpack中间件
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  inline: true,
  hot: true,
  stats: {colors: true}
}))
app.use(webpackHotMiddleware(compiler))
// 路由配置
app.get('/', (req, res, next) => {
  compiler.outputFileSystem.readFile(`${process.cwd()}/${process.env.NODE_ENV}/index.html`, (err, result) => {
    if (err) return next(err)
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
})
app.get('/recruitment', (req, res, next) => {
  compiler.outputFileSystem.readFile(`${process.cwd()}/${process.env.NODE_ENV}/recruitment.html`, (err, result) => {
    if (err) return next(err)
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
})
// glob.sync('./vipkid/module/*').forEach(path => {
//   let pathSplit = path.split('/')
//   let page = pathSplit[pathSplit.length - 1]
//   if (page === 'index') return
//   app.get(`/${page}`, (req, res, next) => {
//     compiler.outputFileSystem.readFile(`${process.cwd()}/${process.env.NODE_ENV}/${page}.html`, (err, result) => {
//       if (err) return next(err)
//       res.set('content-type', 'text/html')
//       res.send(result)
//       res.end()
//     })
//   })
// })
// 创建服务器
app.listen(8080, error => {
  if (error) {
    throw error
  }
  console.log(`Listening on port 8080`)
})
