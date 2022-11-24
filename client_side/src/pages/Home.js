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
    const [filteredJobs, setFilteredJobs] = useState(jobs)
    const [filters, setFilters] = useState({
        selectedCompanies: [],
        selectedLocations: [],
        selectedTypes: [],
        selectedSkills: [],
        selectedContacts: []
    })

    useEffect(() => {
        if (jobs) {
            // Convert filter selection objects into their values (company names, skill IDs, etc.)
            const selectedCompanies = filters.selectedCompanies.map(selection => selection.value.toLowerCase())
            const selectedLocations = filters.selectedLocations.map(selection => selection.value.toLowerCase())
            const selectedTypes = filters.selectedTypes.map(selection => selection.value)
            const selectedSkills = filters.selectedSkills.map(selection => selection.value)
            const selectedContacts = filters.selectedContacts.map(selection => selection.value)

            setFilteredJobs(jobs.filter(j => {
                // Exclude a job if its company name is not in filters.selectedCompanies
                if (selectedCompanies.length && !selectedCompanies.includes(j.company.toLowerCase())) {
                    return false
                }

                // Exclude a job if its location name is not in filters.selectedLocations
                if (selectedLocations.length && !selectedLocations.includes(j.location.toLowerCase())) {
                    return false
                }

                // Exclude a job if its type name is not in filters.selectedTypes
                if (selectedTypes.length && !selectedTypes.includes(j.type)) {
                    return false
                }

                // Exclude a job if its skill IDs doesn't contain all of the skills in filters.selectedSkills
                if (selectedSkills.length && !selectedSkills.every(id => j.skills.map(s => s._id).includes(id))) {
                    return false
                }

                // Exclude a job if its contact IDs doesn't contain all of the contacts in filters.selectedContacts
                if (selectedContacts.length && !selectedContacts.every(id => j.contacts.map(c => c._id).includes(id))) {
                    return false
                }

                // Otherwise, include the job
                return true
            }))
        }
    }, [jobs, filters])
    

    return (
        <div className="home">
            <div className="jobs">
                {filteredJobs && filteredJobs.map(job => (
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