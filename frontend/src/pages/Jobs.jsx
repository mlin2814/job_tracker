import React from "react";
import useUserStore from "../stores/userStore";

function Jobs() {
    const userJobs = useUserStore((state) => state.jobs);
    const userSkills = useUserStore((state) => state.skills);
    const userContacts = useUserStore((state) => state.contacts);
    console.log({ userJobs });

    const jobItems = userJobs.map((job, i) => (
        <div key={i}>
            <h4>{job.jobTitle}</h4>
            <ul>
                <li>Job ID: {job.id}</li>
                <li>Company: {job.companyName}</li>
                <li>Location: {job.jobLoc}</li>
                <li>Deadline: {job.deadline}</li>
                <li>Internship: {job.isInternship ? "Yes" : "No"}</li>
                <li>Skill IDs: {job.skills.join(", ")}</li>
                <li>Contact IDs: {job.contacts.join(", ")}</li>
            </ul>
        </div>
    ));

    return (
        <div>
            <h1>Jobs</h1>
            {jobItems}
        </div>
    );
}

export default Jobs;
