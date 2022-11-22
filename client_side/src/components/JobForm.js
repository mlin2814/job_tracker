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
import { useAuthContext } from '../hooks/useAuthContext'

const JobForm = () => {
    const { dispatch } = useJobsContext()
    const { skills } = useSkillsContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [company, setCompany] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [deadline, setDeadline] = useState('')
    const [newSkills, setNewSkills] = useState([])
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const newJob = { title, company, description, location, deadline, skills: newSkills }

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
            setDescription('')
            setLocation('')
            setDeadline('')
            setNewSkills([])
            console.log('new job added:', json)
            dispatch({ type: 'CREATE_JOB', payload: json })
        }
    }

    const handleSkillsSelect = (e) => {
        const options = e.target.options
        const selectedSkills = []

        for (const option of options) {
            if (option.selected) {
                selectedSkills.push(option.value)
            }
        }

        setNewSkills(selectedSkills)
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

            <label>Description:</label>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
            />

            <label>Location:</label>
            <input
                type="text"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                className={emptyFields.includes('location') ? 'error' : ''}
            />

            <label>Deadline:</label>
            <input
                type="text"
                onChange={(e) => setDeadline(e.target.value)}
                value={deadline}
                className={emptyFields.includes('deadline') ? 'error' : ''}
            />

            <label>Skills:</label>
            <select
                name="skills"
                id="skills"
                onChange={handleSkillsSelect}
                className={emptyFields.includes('skills') ? 'error' : ''}
                multiple
            >
                {generateSkillsOptions()}
            </select>

            {/* <TextField name="tags" 
        variant="outlined" 
        label="Tags (coma separated)" 
        fullWidth value={postData.tags} 
        onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} /> */}
            <button>Add Job</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default JobForm