const express = require('express')
// const Job = require('../models/Job')
const {
    getJobs,
    getJob,
    createJob,
    deleteJob,
    updateJob
} = require('../controllers/jobController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// GET all workouts
router.get('/', getJobs)

// GET a single workout
router.get('/:id', getJob)

// POST a new workout
router.post('/', createJob)

// DELETE a workout
router.delete('/:id', deleteJob)

// UPDATE a workout
router.patch('/:id', updateJob)

module.exports = router