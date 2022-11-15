const Job = require('../models/Job')
const mongoose = require('mongoose')

// get all jobs
const getJobs = async (req, res) => {
  const jobs = await Job.find({}).sort({createdAt: -1})

  res.status(200).json(jobs)
}

// get a single job
const getJob = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such job'})
  }

  const job = await Job.findById(id)

  if (!job) {
    return res.status(404).json({error: 'No such job'})
  }

  res.status(200).json(job)
}

// create a new job
const createJob = async (req, res) => {
  const {title, company, description, location, deadline, skills} = req.body
  console.log(req.body)

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }

  if (!company) {
    emptyFields.push('company')
  }

  if (!description) {
    emptyFields.push('description')
  }

  if (!location) {
    emptyFields.push('location')
  }

  if (!deadline) {
    emptyFields.push('deadline')
  }

  if (!skills) {
    emptyFields.push('skills')
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    // const jobSkills = req.body.skills.split(', ')
    // const jobSkills = JSON.parse(req.body.skills)
    // console.log(jobSkills)
    const job = await Job.create({ title, company, description, location, deadline, skills })
    // const job = await new Job({
    //     "title": req.body.title,
    //     "company": req.body.company,
    //     "description": req.body.description,
    //     "location": req.body.location,
    //     "deadline": req.body.deadline,
    //     "skills": jobSkills,
    // })
    res.status(200).json(job)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a job
const deleteJob = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such job'})
    }
  
    const job = await Job.findOneAndDelete({_id: id})
  
    if(!job) {
      return res.status(400).json({error: 'No such job'})
    }
  
    res.status(200).json(job)
}

// update a job
const updateJob = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such job'})
    }
  
    const job = await Job.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!job) {
      return res.status(400).json({error: 'No such job'})
    }
  
    res.status(200).json(job)
}

module.exports = {
  getJobs,
  getJob,
  createJob,
  deleteJob,
  updateJob
}