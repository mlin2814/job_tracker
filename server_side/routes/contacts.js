const express = require('express')
const {
    getContacts,
    getContact,
    createContact,
    deleteContact,
    updateContact
  } = require('../controllers/contactController')

const router = express.Router()

// GET all workouts
router.get('/', getContacts)

// GET a single workout
router.get('/:id', getContact)

// POST a new workout
router.post('/', createContact)

// DELETE a workout
router.delete('/:id', deleteContact)

// UPDATE a workout
router.patch('/:id', updateContact)

module.exports = router