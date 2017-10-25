const env = process.env.NODE_ENV
console.log(process.cwd())
module.exports = require(`./config/webpack.config.${env}.js`)