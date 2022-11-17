const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    deadline: {
        type: String,
        required: true
    },
    skills: [String],
    // skills: {
    //     type: Array,
    //     required: true
    // }
    user_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Job', jobSchema)