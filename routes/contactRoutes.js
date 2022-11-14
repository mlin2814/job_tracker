const express = require('express')
const router = express.Router()
const contactsController = require('../controllers/contactsController')

router.route('/')
    .get(contactsController.getAllContacts)
    .post(contactsController.createNewContact)
    .patch(contactsController.updateContact)
    .delete(contactsController.deleteContact)

    module.exports = router