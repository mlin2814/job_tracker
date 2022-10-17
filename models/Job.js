const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
    {
        title: String,
        company: String,
        description: String,
        location: String,
        deadline: Date
    }
);

const Job = mongoose.model('Job', schema);

module.exports = Job;