const express = require('express');
const router = express.Router();
const userController = require("../../controllers/userController");

router.get('/user', (req, res) => {
    res.status(200).send("User information");
})

router.post('/user', userController.createUser);
router.put('/user/:userId', userController.updateUser);
router.delete('/user/:userId', userController.deleteUser);

module.exports = router;