import React from "react";
import useUserStore from "../stores/userStore";

function Jobs() {
    const userJobs = useUserStore((state) => state.jobs);
    console.log({ userJobs });

    return (
        <div>
            <h1>Jobs</h1>
            <p>Welcome to the Jobs page.</p>
        </div>
    );
}

export default Jobs;
