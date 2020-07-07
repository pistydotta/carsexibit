const express = require('express')
const router = express.Router()
const indexController = require('../controller/index_controller')

router.get('/', indexController.homePage)

router.get('*', indexController.notFound)
module.exports = router