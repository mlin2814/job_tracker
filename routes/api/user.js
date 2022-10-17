const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/user', (req, res) => {
    res.status(200).send("User information");
})

module.exports = router