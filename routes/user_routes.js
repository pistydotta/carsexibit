const express = require('express')
const router = express.Router()
const userController = require('../controller/user_controller')
const passport = require('passport')


router.get('/register', userController.isNotLoggedIn, userController.showRegisterForm)
router.post('/register', userController.isNotLoggedIn, userController.register)
router.get('/login', userController.isNotLoggedIn, userController.showLoginForm)
router.post('/login', userController.isNotLoggedIn, userController.login)
router.get('/logout', userController.logout)
module.exports = router