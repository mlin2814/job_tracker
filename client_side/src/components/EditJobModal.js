import { useState } from 'react'
import { useJobsContext } from "../hooks/useJobsContext";
import { useAuthContext } from '../hooks/useAuthContext';

const EditJobModal = ({ setModalOpen, job }) => {
    const { dispatch } = useJobsContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState(job.title)
    const [company, setCompany] = useState(job.company)
    const [description, setDescription] = useState(job.description)
    const [location, setLocation] = useState(job.location)
    const [deadline, setDeadline] = useState(job.deadline)
    const [skills, setSkills] = useState(job.skills)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const newJob = {...job, title, company, description, location, deadline, skills}
        
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
            dispatch({type: 'EDIT_JOB', payload: newJob})
            setModalOpen(false)
        }
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
                    <input 
                        type="text" 
                        onChange={(e) => setSkills(e.target.value.split(', '))} 
                        value={skills.join(', ')}
                        className={emptyFields.includes('skills') ? 'error' : ''}
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