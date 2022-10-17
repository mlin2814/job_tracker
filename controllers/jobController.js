const Job = require("../models/Job");

exports.createJob = async (req, res) => {

    if (req.body.title && req.body.company) {
        const newJob = new Job({
            "title": req.body.title,
            "company": req.body.company,
            "description": req.body.description,
            "location": req.body.location,
            "deadline": req.body.deadline
        });

        const savedJob = await newJob.save();

        if (savedJob){
            res.status(200).send(savedJob);
        } else {
            res.status(500).send({"Error": "Error creating job"});
        }
    } else {
        res.status(400).send({"Error": "Missing required job property: title or company"});
    }
}

exports.updateJob = async (req, res) => {

    if (req.params.jobId && req.body.title && req.body.company) {
        const result = await Job.updateOne({"_id": req.params.jobId}, {
            "title": req.body.title,
            "company": req.body.company,
            "description": req.body.description,
            "location": req.body.location,
            "deadline": req.body.deadline
        });
        if (result.matchedCount == 0){
            res.status(404).send({"Error": "No job found"});
        } else {
            res.status(200).send("Job updated");
        }
    } else {
        res.status(400).send({"Error": "Missing parameters"});
    }
}

exports.deleteJob = async (req, res) => {

    if (req.params.jobId) {
        const result = await Job.findByIdAndDelete(req.params.jobId);
        if (result) {
            res.status(204).send("Job deleted");
        } else {
            res.status(404).send({"Error": "Job not found"});
        }
    } else {
        res.status(400).send({"Error": "Missing job ID"});
    }
}