const express = require('express')
const {
    getContacts,
    getContact,
    createContact,
    deleteContact,
    updateContact
  } = require('../controllers/contactController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

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