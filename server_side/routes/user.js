/*
CODE CITATION
Title: MERN Auth tutorial source code
Author: The Net Ninja
Date: 2022
Type: Adapted from
Source: https://github.com/iamshaunjp/MERN-Auth-Tutorial
*/

const express = require('express')

// Controllers
const { loginUser, signupUser } = require('../controllers/userController')

const router = express.Router()

// Login route
router.post('/login', loginUser)

// Sign Up route
router.post('/signup', signupUser)

module.exports = router