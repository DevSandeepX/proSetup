const express = require('express')
const {login, refresh, logout} = require('../controllers/authControllers')
const loginLimiter = require('../middlewares/loginLimiter')
const router = express.Router()


router.route('/')
      .post(loginLimiter, login)


router.route('/refresh')
      .get(refresh)


router.route('/logout')
      .post(logout)


module.exports = router