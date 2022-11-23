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

const JobForm = ({ setFilters }) => {
    const { jobs } = useJobsContext()
    const { skills } = useSkillsContext()
    const { contacts } = useContactsContext()

    const [jobType, setJobType] = useState('All')
    const [selectedCompanies, setSelectedCompanies] = useState([])
    const [selectedLocations, setSelectedLocations] = useState([])
    const [selectedSkills, setSelectedSkills] = useState([])
    const [selectedContacts, setSelectedContacts] = useState([])

    const handleCompanySelect = (e) => {
        const options = e.target.options
        const newSelectedCompanies = []

        for (const option of options) {
            if (option.selected) {
                newSelectedCompanies.push(option.value)
            }
        }

        setSelectedCompanies(newSelectedCompanies)
    }

    const generateCompanyOptions = () => {
        const options = []
        const companies = []

        if (jobs) {
            for (const job of jobs) {
                if (!companies.includes(job.company.toLowerCase())) {
                    companies.push(job.company.toLowerCase())
                    options.push(
                        <option value={job.company} key={job._id}>{job.company}</option>
                    )
                }
            }
        }

        return options
    }

    const handleLocationSelect = (e) => {
        const options = e.target.options
        const newSelectedLocations = []

        for (const option of options) {
            if (option.selected) {
                newSelectedLocations.push(option.value)
            }
        }

        setSelectedLocations(newSelectedLocations)
    }

    const generateLocationOptions = () => {
        const options = []
        const locations = []

        if (jobs) {
            for (const job of jobs) {
                if (!locations.includes(job.location.toLowerCase())) {
                    locations.push(job.location.toLowerCase())
                    options.push(
                        <option value={job.location} key={job._id}>{job.location}</option>
                    )
                }
            }
        }

        return options
    }

    const handleSkillsSelect = (e) => {
        const options = e.target.options
        const newSelectedSkills = []

        for (const option of options) {
            if (option.selected) {
                newSelectedSkills.push(option.value)
            }
        }

        setSelectedSkills(newSelectedSkills)
    }

    const generateSkillsOptions = () => {
        const options = []

        if (skills) {
            for (const skill of skills) {
                options.push(
                    <option value={skill._id} key={skill._id}>{skill.name}</option>
                )
            }
        }

        return options
    }

    const handleContactsSelect = (e) => {
        const options = e.target.options
        const newSelectedContacts = []

        for (const option of options) {
            if (option.selected) {
                newSelectedContacts.push(option.value)
            }
        }

        setSelectedContacts(newSelectedContacts)
    }


    const generateContactsOptions = () => {
        const options = []

        if (contacts) {
            for (const contact of contacts) {
                options.push(
                    <option value={contact._id} key={contact._id}>{contact.username}</option>
                )
            }
        }

        return options
    }

    useEffect(() => {
        setFilters({ jobType, selectedCompanies, selectedLocations, selectedSkills, selectedContacts })
    }, [jobType, selectedCompanies, selectedLocations, selectedSkills, selectedContacts])

    return (
        <form className="create">
            <h3>Filter Jobs</h3>

            <label>Job Type:</label>
            <select
                name="type"
                id="type"
                onChange={(e) => setJobType(e.target.value)}
            >
                <option value="All">All</option>
                <option value="Full-time">Full-time</option>
                <option value="Internships">Internships</option>
            </select>

            <label>Company:</label>
            <select
                name="company"
                id="company"
                onChange={handleCompanySelect}
                multiple
            >
                {generateCompanyOptions()}
            </select>

            <label>Location:</label>
            <select
                name="location"
                id="location"
                onChange={handleLocationSelect}
                multiple
            >
                {generateLocationOptions()}
            </select>

            <label>Skills:</label>
            <select
                name="skills"
                id="skills"
                onChange={handleSkillsSelect}
                multiple
            >
                {generateSkillsOptions()}
            </select>

            <label>Contacts:</label>
            <select
                name="contacts"
                id="contacts"
                onChange={handleContactsSelect}
                multiple
            >
                {generateContactsOptions()}
            </select>
        </form>
    )
}

export default JobForm