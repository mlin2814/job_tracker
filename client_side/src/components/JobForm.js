/*
CODE CITATION
Title: MERN Auth tutorial source code
Author: The Net Ninja
Date: 2022
Type: Adapted from
Source: https://github.com/iamshaunjp/MERN-Auth-Tutorial
*/

import { useState } from 'react'
import { useJobsContext } from "../hooks/useJobsContext";
import { useSkillsContext } from "../hooks/useSkillsContext";
import { useContactsContext } from "../hooks/useContactsContext";
import { useAuthContext } from '../hooks/useAuthContext'
import Select from 'react-select';

const JobForm = () => {
    const { dispatch } = useJobsContext()
    const { skills } = useSkillsContext()
    const { contacts } = useContactsContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [company, setCompany] = useState('')
    const [location, setLocation] = useState('')
    const [type, setType] = useState({value: "Full-time", label: "Full-time"})
    const [description, setDescription] = useState('')
    const [newSkills, setNewSkills] = useState([])
    const [newContacts, setNewContacts] = useState([])
    const [deadline, setDeadline] = useState('')

    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const newJob = { 
            title, 
            company, 
            location,
            type: type.value, 
            description, 
            skills: newSkills.map(selection => selection.value), 
            contacts: newContacts.map(selection => selection.value),
            deadline
        }

        const response = await fetch('/jobs', {
            method: 'POST',
            body: JSON.stringify(newJob),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setEmptyFields([])
            setError(null)
            setTitle('')
            setCompany('')
            setLocation('')
            setType({value: "Full-time", label: "Full-time"})
            setDescription('')
            setDeadline('')
            setNewSkills([])
            setNewContacts([])
            dispatch({ type: 'CREATE_JOB', payload: json })
        }
    }

    const typeOptions = [
        {value: "Full-time", label: "Full-time"},
        {value: "Internship", label: "Internship"}
    ]

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

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Job</h3>

            <label>Job Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Company:</label>
            <input
                type="text"
                onChange={(e) => setCompany(e.target.value)}
                value={company}
                className={emptyFields.includes('company') ? 'error' : ''}
            />

            <label>Location:</label>
            <input
                type="text"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                className={emptyFields.includes('location') ? 'error' : ''}
            />

            <label>Type:</label>
            <Select
                value={type}
                onChange={setType}
                options={typeOptions}
                className="input-select"
            />

            <label>Description:</label>
            <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
            />

            <label>Skills:</label>
            <Select
                value={newSkills}
                onChange={setNewSkills}
                options={generateSkillsOptions()}
                isMulti={true}
                className="input-select"
            />

            <label>Contacts:</label>
            <Select
                value={newContacts}
                onChange={setNewContacts}
                options={generateContactsOptions()}
                isMulti={true}
                className="input-select"
            />

            <label>Deadline:</label>
            <input
                type="text"
                onChange={(e) => setDeadline(e.target.value)}
                value={deadline}
                className={emptyFields.includes('deadline') ? 'error' : ''}
            />

            <button>Add Job</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default JobForm