const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
    {
        userName: 'string'
    }
);

const User = mongoose.model('User', schema);