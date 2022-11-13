const Jobs = require('../models/Jobs')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')
// const Jobs = require('../models/Jobs')

// @desc Get all notes 
// @route GET /notes
// @access Private
const getAllJobs = asyncHandler(async (req, res) => {
    // Get all notes from MongoDB
    const jobs = await Jobs.find().lean()

    // If no jobs 
    if (!jobs?.length) {
        return res.status(400).json({ message: 'No jobs found' })
    }

    // Add username to each note before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    const jobsWithUser = await Promise.all(jobs.map(async (job) => {
        const user = await User.findById(job.user).lean().exec()
        return { ...job, username: user.username }
    }))

    res.json(jobsWithUser)
})

// @desc Create new job
// @route POST /notes
// @access Private
const createNewJob = asyncHandler(async (req, res) => {
    const { user, title, company, description, location, deadline, skills } = req.body

    // Confirm data
    if (!user || !title || !company || !description || !location || !deadline || !Array.isArray(skills) || !skills.length) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await Jobs.findOne({ title }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate job title' })
    }

    // Create and store the new user 
    const job = await Jobs.create({ user, title, company, description, location, deadline, skills })

    if (job) { // Created 
        return res.status(201).json({ message: 'New job created' })
    } else {
        return res.status(400).json({ message: 'Invalid job data received' })
    }

})

// @desc Update a note
// @route PATCH /notes
// @access Private
const updateJob = asyncHandler(async (req, res) => {
    const { id, user, title, company, description, location, deadline, skills } = req.body

    // Confirm data
    if (!id || !user || !title || !company || !description || !location || !deadline || !Array.isArray(skills) || !skills.length) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm note exists to update
    const job = await Jobs.findById(id).exec()

    if (!job) {
        return res.status(400).json({ message: 'Job not found' })
    }

    // Check for duplicate title
    const duplicate = await Jobs.findOne({ title }).lean().exec()

    // Allow renaming of the original note 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate job title' })
    }

    job.user = user
    job.title = title
    job.company = company
    job.description = description
    job.location = location
    job.deadline = deadline
    job.skills = skills

    const updatedJob = await job.save()

    res.json(`'${updatedJob.title}' updated`)
})

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteJob = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Job ID required' })
    }

    // Confirm note exists to delete 
    const job = await Jobs.findById(id).exec()

    if (!job) {
        return res.status(400).json({ message: 'Job not found' })
    }

    const result = await job.deleteOne()

    const reply = `Job '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllJobs,
    createNewJob,
    updateJob,
    deleteJob
}