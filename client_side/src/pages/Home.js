/*
CODE CITATION
Title: MERN Auth tutorial source code
Author: The Net Ninja
Date: 2022
Type: Adapted from
Source: https://github.com/iamshaunjp/MERN-Auth-Tutorial
*/

import { useState, useEffect } from 'react'
import { useJobsContext } from "../hooks/useJobsContext";

// components
import JobDetails from "../components/JobDetails"
import JobForm from "../components/JobForm"
import FilterForm from "../components/FilterForm"

const Home = () => {
    const { jobs } = useJobsContext()
    const [filteredJobs, setFilteredJobs] = useState([])
    const [filters, setFilters] = useState()

    // console.log({jobs})

    useEffect(() => {
        // console.log(filters)
    }, [filters])
    

    return (
        <div className="home">
            <div className="jobs">
                {jobs && jobs.map(job => (
                    <JobDetails job={job} key={job._id} />
                ))}
            </div>
            <div>
                <FilterForm setFilters={setFilters} />
                <JobForm />
            </div>
        </div>
    )
}


export default Home