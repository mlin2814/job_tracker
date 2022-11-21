/*
CODE CITATION
Title: MERN Auth tutorial source code
Author: The Net Ninja
Date: 2022
Type: Adapted from
Source: https://github.com/iamshaunjp/MERN-Auth-Tutorial
*/

const express = require('express')
const {
    getJobs,
    getJob,
    createJob,
    deleteJob,
    updateJob
} = require('../controllers/jobController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// Check for authorized user first
router.use(requireAuth)

// GET all jobs
router.get('/', getJobs)

// GET single job
router.get('/:id', getJob)

// POST a new job
router.post('/', createJob)

// DELETE a job
router.delete('/:id', deleteJob)

// UPDATE a job
router.patch('/:id', updateJob)

module.exports = router