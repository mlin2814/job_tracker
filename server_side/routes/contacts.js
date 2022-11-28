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
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact
} = require('../controllers/contactController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// Check for authorized user first
router.use(requireAuth)

// GET all contacts
router.get('/', getContacts)

// GET a single contact
router.get('/:id', getContact)

// POST a new contact
router.post('/', createContact)

// DELETE a contact
router.delete('/:id', deleteContact)

// UPDATE a contact
router.patch('/:id', updateContact)

module.exports = router