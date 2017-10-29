'use strict'

const express = require('express')
const router = express.Router()

// 首页
router.get('/*', (req, res) => {
	res.render('home')
})

module.exports = router
