const Contact = require('../models/Contact')
const mongoose = require('mongoose')

// get all contacts
const getContacts = async (req, res) => {
  const contacts = await Contact.find({}).sort({createdAt: -1})

  res.status(200).json(contacts)
}

// get a single contact
const getContact = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such contact'})
  }

  const contact = await Contact.findById(id)

  if (!contact) {
    return res.status(404).json({error: 'No such contact'})
  }

  res.status(200).json(contact)
}

// create a new contact
const createContact = async (req, res) => {
  const { username, email, phone, linkedin } = req.body

  let emptyFields = []

  if (!username) {
    emptyFields.push('username')
  }

  if (!email) {
    emptyFields.push('email')
  }

  if (!phone) {
    emptyFields.push('phone')
  }

  if (!linkedin) {
    emptyFields.push('linkedin')
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const contact = await Contact.create({ username, email, phone, linkedin })
    res.status(200).json(contact)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a contact
const deleteContact = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such contact'})
    }
  
    const contact = await Contact.findOneAndDelete({_id: id})
  
    if(!contact) {
      return res.status(400).json({error: 'No such contact'})
    }
  
    res.status(200).json(contact)
}

// update a contact
const updateContact = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such contact'})
    }
  
    const contact = await Contact.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!contact) {
      return res.status(400).json({error: 'No such contact'})
    }
  
    res.status(200).json(contact)
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact
}