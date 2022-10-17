const User = require("../models/User");

exports.createUser = async (req, res) => {

    if (req.body.username) {
        const newUser = new User({
            "username": req.body.username
        });

        const savedUser = await newUser.save();

        if (savedUser){
            res.status(200).send(savedUser);
        } else {
            res.status(500).send({"Error": "Error creating user"});
        }
    } else {
        res.status(400).send({"Error": "Missing username"});
    }
}

exports.updateUser = async (req, res) => {

    if (req.params.userId && req.body.username) {
        const result = await User.updateOne({"_id": req.params.userId}, {"username": req.body.username});
        if (result.matchedCount == 0){
            res.status(404).send({"Error": "No user found"});
        } else {
            res.status(200).send("User updated");
        }
    } else {
        res.status(400).send({"Error": "Missing parameters"});
    }
}

exports.deleteUser = async (req, res) => {

    if (req.params.userId) {
        const result = await User.findByIdAndDelete(req.params.userId);
        console.log(result)
        if (result) {
            res.status(204).send("User deleted");
        } else {
            res.status(404).send({"Error": "User not found"});
        }
    } else {
        res.status(400).send({"Error": "Missing user ID"});
    }
}