const express = require('express')
const router = express.Router()
const jobsController = require('../controllers/jobsController')

router.route('/')
    .get(jobsController.getAllJobs)
    .post(jobsController.createNewJob)
    .patch(jobsController.updateJob)
    .delete(jobsController.deleteJob)

module.exports = router