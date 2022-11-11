const Contact = require('../models/Contact')
// const Jobs = require('../models/Jobs')
const asyncHandler = require('express-async-handler')
// const bcrypt = require('bcrypt')

// get all users; get /users; private
const getAllContacts = asyncHandler(async (req, res) => {
    // const contacts = await Contact.find().select('-password').lean()
    const contacts = await Contact.find().select().lean()
    if (!contacts?.length) {
        return res.status(400).json({ message: 'No contacts found' })
    }
    res.json(contacts)
})

// create all users; post /users; private
const createNewContact = asyncHandler(async (req, res) => {
    const { username, email, phone, linkedin } = req.body

    if (!username || !email || !phone || !linkedin) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const duplicate = await Contact.findOne({ username }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    // const hashedPwd = await bcrypt.hash(password, 10)

    // const userObject = { username, "password": hashedPwd }
    const contactObject = { username, email, phone, linkedin }

    const contact = await Contact.create(contactObject)

    if (contact) {
        res.status(201).json({ message: `New contact ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid contact data received' })
    }
})

// update all users; patch /users; private
const updateContact = asyncHandler(async (req, res) => {
    const { id, username, email, phone, linkedin } = req.body

    if (!id || !username || !email || !phone || !linkedin) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const contact = await Contact.findById(id).exec()

    if (!contact) {
        return res.status(400).json({ message: 'Contact not found' })
    }

    const duplicate = await Contact.findOne({ username }).lean().exec()

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    contact.username = username
    contact.email = email
    contact.phone = phone
    contact.linkedin = linkedin

    // if (password) {
    //     contact.password = await bcrypt.hash(password, 10)
    // }

    const updatedContact = await contact.save()

    res.json({ message: `${updatedContact.username} updated` })
})

// delete users; delete /users; private
const deleteContact = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Contact ID required' })
    }

    // const jobs = await Jobs.findOne({ user: id }).lean().exec()
    // if (jobs?.length) {
    //     return res.status(400).json({ message: 'User has assigned jobs' })
    // }

    const contact = await Contact.findById(id).exec()

    if (!contact) {
        return res.status(400).json({ message: 'Contact not found' })
    }

    const result = await contact.deleteOne()
    
    const reply = `Contact ${result.username} with ID ${result._id} deleted`

    res.json(reply)
})


module.exports = {
    getAllContacts,
    createNewContact,
    updateContact,
    deleteContact
}
