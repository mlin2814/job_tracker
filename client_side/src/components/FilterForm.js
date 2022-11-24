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
import { useSkillsContext } from "../hooks/useSkillsContext";
import { useContactsContext } from "../hooks/useContactsContext";
import Select from 'react-select';

const JobForm = ({ setFilters }) => {
    const { jobs } = useJobsContext()
    const { skills } = useSkillsContext()
    const { contacts } = useContactsContext()

    const [selectedCompanies, setSelectedCompanies] = useState([])
    const [selectedLocations, setSelectedLocations] = useState([])
    const [selectedTypes, setSepectedTypes] = useState([])
    const [selectedSkills, setSelectedSkills] = useState([])
    const [selectedContacts, setSelectedContacts] = useState([])

    const typeOptions = [
        {value: "Full-time", label: "Full-time"},
        {value: "Internship", label: "Internship"}
    ]

    const generateCompanyOptions = () => {
        const options = []
        const companies = []

        if (jobs) {
            for (const job of jobs) {
                if (!companies.includes(job.company.toLowerCase())) {
                    companies.push(job.company.toLowerCase())
                    options.push(
                        {value: job.company, label: job.company}
                    )
                }
            }
        }

        return options
    }

    const generateLocationOptions = () => {
        const options = []
        const locations = []

        if (jobs) {
            for (const job of jobs) {
                if (!locations.includes(job.location.toLowerCase())) {
                    locations.push(job.location.toLowerCase())
                    options.push(
                        {value: job.location, label: job.location}
                    )
                }
            }
        }

        return options
    }

    const generateSkillsOptions = () => {
        const options = []

        if (skills) {
            for (const skill of skills) {
                options.push(
                    {value: skill._id, label: skill.name}
                )
            }
        }

        return options
    }

    const generateContactsOptions = () => {
        const options = []

        if (contacts) {
            for (const contact of contacts) {
                options.push(
                    {value: contact._id, label: contact.username}
                )
            }
        }

        return options
    }

    useEffect(() => {
        setFilters({ selectedCompanies, selectedLocations, selectedTypes, selectedSkills, selectedContacts })
    }, [selectedCompanies, selectedLocations, selectedTypes, selectedSkills, selectedContacts])

    useEffect(() => {
        // If jobs are edited or deleted, reset filters so no stale filters are present
        setSelectedCompanies([])
        setSelectedLocations([])
        setSepectedTypes([])
        setSelectedSkills([])
        setSelectedContacts([])
    }, [jobs])

    return (
        <form className="create">
            <h3>Filter Jobs</h3>

            <label>Company:</label>
            <Select
                value={selectedCompanies}
                onChange={setSelectedCompanies}
                options={generateCompanyOptions()}
                isMulti={true}
                className="input-select"
            />

            <label>Location:</label>
            <Select
                value={selectedLocations}
                onChange={setSelectedLocations}
                options={generateLocationOptions()}
                isMulti={true}
                className="input-select"
            />

            <label>Type:</label>
            <Select
                value={selectedTypes}
                onChange={setSepectedTypes}
                options={typeOptions}
                isMulti={true}
                className="input-select"
            />

            <label>Skills:</label>
            <Select
                value={selectedSkills}
                onChange={setSelectedSkills}
                options={generateSkillsOptions()}
                isMulti={true}
                className="input-select"
            />

            <label>Contacts:</label>
            <Select
                value={selectedContacts}
                onChange={setSelectedContacts}
                options={generateContactsOptions()}
                isMulti={true}
                className="input-select"
            />
        </form>
    )
}

export default JobForm