import { useState } from 'react'
import { useSkillsContext } from "../hooks/useSkillsContext";
import { useJobsContext } from "../hooks/useJobsContext";
import { useAuthContext } from '../hooks/useAuthContext';
import Select from 'react-select';

const EditSkillModal = ({ setModalOpen, skill }) => {
    const { dispatch: skillsDispatch } = useSkillsContext()
    const { jobs, dispatch: jobsDispatch } = useJobsContext()
    const { user } = useAuthContext()

    const [name, setName] = useState(skill.name)
    const [comfortLevel, setComfortLevel] = useState({value: skill.comfortLevel, label: skill.comfortLevel})
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const newSkill = { ...skill, name, comfortLevel: comfortLevel.value }
        
        const response = await fetch(`/skills/${skill._id}`, {
            method: 'PATCH',
            body: JSON.stringify(newSkill),
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
            // Edit skill in any job that referred to the skill
            const updatedJobs = jobs.map(j => {
                j.skills = j.skills.map(s => {
                    if (s._id === skill._id) {
                        return {...s, name, comfortLevel}
                    } else {
                        return s
                    }
                })
                return j
            })
            jobsDispatch({type: 'SET_JOBS', payload: updatedJobs})
            skillsDispatch({type: 'EDIT_SKILL', payload: newSkill})
            setModalOpen(false)
        }
    }

    const generateComfortLevelOptions = () => {
        const options = []

        for (let i = 0; i <= 10; i++) {
            options.push(
                {value: i, label: i}
            )
        }

        return options
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Edit Skill</h3>
                </div>
                <form className="create" onSubmit={handleSubmit}> 

                    <label>Name:</label>
                    <input 
                        type="text" 
                        onChange={(e) => setName(e.target.value)} 
                        value={name}
                        className={emptyFields.includes('name') ? 'error' : ''}
                        required
                    />

                    <label>Comfort Level:</label>
                    <Select
                        defaultValue={comfortLevel}
                        onChange={setComfortLevel}
                        options={generateComfortLevelOptions()}
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

export default EditSkillModal