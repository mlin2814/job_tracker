/*
CODE CITATION
Title: MERN Auth tutorial source code
Author: The Net Ninja
Date: 2022
Type: Adapted from
Source: https://github.com/iamshaunjp/MERN-Auth-Tutorial
*/

const Job = require('../models/Job')
const Skill = require('../models/Skill')
const mongoose = require('mongoose')

// get all jobs
const getJobs = async (req, res) => {
  const user_id = req.user._id
  const jobs = await Job.find({
    user_id
  }).populate('skills').sort({
    createdAt: -1
  })

  res.status(200).json(jobs)
}

// get a single job
const getJob = async (req, res) => {
  const {
    id
  } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: 'No such job'
    })
  }

  const job = await Job.findById(id).populate('skills')

  if (!job) {
    return res.status(404).json({
      error: 'No such job'
    })
  }

  res.status(200).json(job)
}

// create a new job
const createJob = async (req, res) => {
  const {
    title,
    company,
    description,
    location,
    deadline,
    skills
  } = req.body

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
    return res.status(400).json({
      error: 'Please fill in all fields',
      emptyFields
    })
  }

  // add to the database
  try {
    const user_id = req.user._id
    const job = new Job({
      title,
      company,
      description,
      location,
      deadline,
      skills: [],
      user_id
    })


    for (const skillID of skills) {
        const skill = await Skill.findById(skillID)
        job.skills.push(skill)
    }

    await job.save()

    res.status(200).json(job)
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
}

// delete a job
const deleteJob = async (req, res) => {
  const {
    id
  } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: 'No such job'
    })
  }

  const job = await Job.findOneAndDelete({
    _id: id
  }).populate('skills')

  if (!job) {
    return res.status(400).json({
      error: 'No such job'
    })
  }

  res.status(200).json(job)
}

// update a job
const updateJob = async (req, res) => {
  const {
    id
  } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: 'No such job'
    })
  }

  const job = await Job.findOneAndUpdate({_id: id}, {...req.body}, {new: true}).populate('skills')

  if (!job) {
    return res.status(400).json({
      error: 'No such job'
    })
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