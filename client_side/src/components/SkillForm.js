import { useState } from 'react'
import { useSkillsContext } from "../hooks/useSkillsContext";
import { useAuthContext } from '../hooks/useAuthContext';

const SkillForm = () => {
    const { dispatch } = useSkillsContext()
    const { user } = useAuthContext()

    const [name, setName] = useState('')
    const [comfortLevel, setComfortLevel] = useState(0)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const skill = { name, comfortLevel }
        
        const response = await fetch('/skills', {
            method: 'POST',
            body: JSON.stringify(skill),
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
            setName('')
            setComfortLevel(0)
            console.log('new skill added:', json)
            dispatch({type: 'CREATE_SKILL', payload: json})
        }

    }

    return (
        <form className="create" onSubmit={handleSubmit}> 
            <h3>Add a New Skill</h3>

            <label>Skill Name:</label>
            <input 
                type="text" 
                onChange={(e) => setName(e.target.value)} 
                value={name}
                className={emptyFields.includes('name') ? 'error' : ''}
            />

            <label>Comfort Level (0 - 10):</label>
            <input 
                type="number"
                min="0"
                max="10"
                step="1"
                onChange={(e) => setComfortLevel(e.target.value)} 
                value={comfortLevel}
                className={emptyFields.includes('comfortLevel') ? 'error' : ''}
            />

            <button>Add Skill</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default SkillForm