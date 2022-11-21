import { useState } from 'react'
import { useSkillsContext } from "../hooks/useSkillsContext";
import { useAuthContext } from '../hooks/useAuthContext';

const EditSkillModal = ({ setModalOpen, skill }) => {
    const { dispatch } = useSkillsContext()
    const { user } = useAuthContext()

    const [name, setName] = useState(skill.name)
    const [comfortLevel, setComfortLevel] = useState(skill.comfortLevel)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const newSkill = { ...skill, name, comfortLevel }
        
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
            dispatch({type: 'EDIT_SKILL', payload: newSkill})
            setModalOpen(false)
        }
    }

    const handleComfortLevelChange = (e) => {
        console.log(e.target.value)
        if (e.target.value > 10) {
            setComfortLevel(10)
        } else if (e.target.value < 0 || e.target.value === '') {
            setComfortLevel(0)
        } else {
            setComfortLevel(e.target.value)
        }
    }

    const generateComfortLevelOptions = () => {
        const options = []

        for (let i = 0; i <= 10; i++) {
            options.push(
                <option value={i} key={i}>{i}</option>
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

                    <label>Comfort Level (0 - 10):</label>
                    <select
                        name="comfortLevel"
                        id="comfortLevel"
                        defaultValue={comfortLevel}
                        onChange={(e) => setComfortLevel(parseInt(e.target.value, 10))}
                    >
                        {generateComfortLevelOptions()}
                    </select>

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