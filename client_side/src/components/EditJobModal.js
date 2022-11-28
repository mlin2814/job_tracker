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
import { useAuthContext } from '../hooks/useAuthContext';
import Select from 'react-select';

const EditJobModal = ({ setModalOpen, job }) => {
    const { dispatch } = useJobsContext()
    const { skills } = useSkillsContext()
    const { contacts } = useContactsContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState(job.title)
    const [company, setCompany] = useState(job.company)
    const [location, setLocation] = useState(job.location)
    const [type, setType] = useState({value: job.type, label: job.type})
    const [description, setDescription] = useState(job.description)
    const [newSkills, setNewSkills] = useState(job.skills.map(s => ({value: s._id, label: s.name})))
    const [newContacts, setNewContacts] = useState(job.contacts.map(c => ({value: c._id, label: c.username})))
    const [deadline, setDeadline] = useState(job.deadline)
    const [error, setError] = useState(null)

    const [emptyFields, setEmptyFields] = useState([])

    const typeOptions = [
        {value: "Full-time", label: "Full-time"},
        {value: "Internship", label: "Internship"}
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const newJob = { 
            ...job, 
            title, 
            company, 
            location,
            type: type.value,
            description, 
            skills: newSkills.map(selection => selection.value), 
            contacts: newContacts.map(selection => selection.value),
            deadline
        }

        const response = await fetch(`/jobs/${job._id}`, {
            method: 'PATCH',
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
            dispatch({ type: 'EDIT_JOB', payload: json })
            setModalOpen(false)
        }
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

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Edit Job</h3>
                </div>
                <form className="create" onSubmit={handleSubmit}>
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

                    <label>Deadline:</label>
                    <input
                        type="text"
                        onChange={(e) => setDeadline(e.target.value)}
                        value={deadline}
                        className={emptyFields.includes('deadline') ? 'error' : ''}
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

                    <div className="modal-button-container">
                        <button onClick={handleSubmit} type="submit">Save</button>
                        <button onClick={() => setModalOpen(false)} type="button">Cancel</button>
                    </div>

                    {error && <div className="error">{error}</div>}
                </form>
            </div>

        </div>
    )
}

export default EditJobModal