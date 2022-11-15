const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User'
    // },
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
    skills: [{
        type: String,
        default: "Python"
    }]
})

module.exports = mongoose.model('Jobs', jobSchema)