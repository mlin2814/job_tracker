const User = require("../models/User");

exports.createUser = async (req, res) => {

    if (req.body.username) {
        const newUser = new User({
            "username": req.body.username
        });

        const savedUser = await newUser.save();

        if (savedUser){
            res.status(200).send("User created");
        } else {
            res.status(500).send({"Error": "Error creating user"});
        }
    } else {
        res.status(400).send({"Error": "Missing username"});
    }
}