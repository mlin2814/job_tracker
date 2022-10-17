import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Loading from "../components/Loading";
import useUserStore from "../stores/userStore";

function Jobs() {
    const userJobs = useUserStore((state) => state.jobs);
    const { isLoading } = useAuth0();
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

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            {/* <Loading /> */}
            <h1>Jobs</h1>
            {jobItems}
        </div>
    );
}

export default Jobs;
