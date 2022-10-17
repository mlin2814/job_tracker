const express = require('express');
const router = express.Router();
const jobController = require("../../controllers/jobController");

router.get('/job', (req, res) => {
    res.status(200).send("User information");
})

router.post('/job', jobController.createJob);
router.put('/job/:jobId', jobController.updateJob);
router.delete('/job/:jobId', jobController.deleteJob);

module.exports = router;