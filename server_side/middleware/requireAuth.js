/*
CODE CITATION
Title: MERN Auth tutorial source code
Author: The Net Ninja
Date: 2022
Type: Adapted from
Source: https://github.com/iamshaunjp/MERN-Auth-Tutorial
*/

const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = async (req, res, next) => {
    // Verify authenticated user
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' })
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({ _id }).select('_id')
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Request is not authorized' })
    }
}

module.exports = requireAuth