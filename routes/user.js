const express = require('express')
const {loginUser , singupUser} = require('../controllers/userController')
const User = require('../models/userModel')

const router = express.Router()

router.post('/login', loginUser)

router.post('/signup',singupUser)

module.exports = router