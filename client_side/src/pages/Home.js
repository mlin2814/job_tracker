/*
CODE CITATION
Title: MERN Auth tutorial source code
Author: The Net Ninja
Date: 2022
Type: Adapted from
Source: https://github.com/iamshaunjp/MERN-Auth-Tutorial
*/

import { useJobsContext } from "../hooks/useJobsContext";

// components
import JobDetails from "../components/JobDetails"
import JobForm from "../components/JobForm"

const Home = () => {
    const { jobs } = useJobsContext()

    return (
        <div className="home">
            <div className="jobs">
                {jobs && jobs.map(job => (
                    <JobDetails job={job} key={job._id} />
                ))}
            </div>
            <JobForm />
        </div>
    )
}


export default Home