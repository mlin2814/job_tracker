import { useState } from 'react'
import { useJobsContext } from "../hooks/useJobsContext";
import { useAuthContext } from '../hooks/useAuthContext'

const JobForm = () => {
    const { dispatch } = useJobsContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [company, setCompany] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [deadline, setDeadline] = useState('')
    const [skills, setSkills] = useState([])
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const job = {title, company, description, location, deadline, skills}
        
        const response = await fetch('/jobs', {
            method: 'POST',
            body: JSON.stringify(job),
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
            setSkills([])
            console.log('new job added:', json)
            dispatch({type: 'CREATE_JOB', payload: json})
        }
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
            <input 
                type="text" 
                onChange={(e) => setSkills(e.target.value.split(', '))} 
                value={skills.join(', ')}
                className={emptyFields.includes('skills') ? 'error' : ''}
            />
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