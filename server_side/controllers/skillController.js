const Skill = require('../models/Skill')
const mongoose = require('mongoose')

// get all skills
const getSkills = async (req, res) => {
  const user_id = req.user._id
  const skills = await Skill.find({user_id}).sort({createdAt: -1})

  res.status(200).json(skills)
}

// get a single skill
const getSkill = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such skill'})
  }

  const skill = await Skill.findById(id)

  if (!skill) {
    return res.status(404).json({error: 'No such skill'})
  }

  res.status(200).json(skill)
}

// create a new skill
const createSkill = async (req, res) => {
  const {name, comfortLevel} = req.body
  console.log(req.body)

  let emptyFields = []

  if (!name) {
    emptyFields.push('name')
  }

  if (!req.body.hasOwnProperty('comfortLevel')) {
    emptyFields.push('comfortLevel')
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const user_id = req.user._id
    const skill = await Skill.create({ name, comfortLevel, user_id })
    res.status(200).json(skill)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a skill
const deleteSkill = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such skill'})
    }
  
    const skill = await Skill.findOneAndDelete({_id: id})
  
    if(!skill) {
      return res.status(400).json({error: 'No such skill'})
    }
  
    res.status(200).json(skill)
}

// update a skill
const updateSkill = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such skill'})
    }
  
    const skill = await Skill.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!skill) {
      return res.status(400).json({error: 'No such skill'})
    }
  
    res.status(200).json(skill)
}

module.exports = {
  getSkills,
  getSkill,
  createSkill,
  deleteSkill,
  updateSkill
}