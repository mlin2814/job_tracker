const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
    {
        username: 'string'
    }
);

const User = mongoose.model('User', schema);

module.exports = User;