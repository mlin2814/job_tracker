const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    comfortLevel: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Skill', skillSchema)