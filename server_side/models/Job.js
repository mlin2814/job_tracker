/*
CODE CITATION
Title: MERN Auth tutorial source code
Author: The Net Ninja
Date: 2022
Type: Adapted from
Source: https://github.com/iamshaunjp/MERN-Auth-Tutorial
*/

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
    skills: [{type: mongoose.Schema.Types.ObjectId, ref: "Skill"}],
    contacts: [{type: mongoose.Schema.Types.ObjectId, ref: "Contact"}],
    user_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Job', jobSchema)