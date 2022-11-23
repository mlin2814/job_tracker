import { useState } from 'react'
import { useSkillsContext } from "../hooks/useSkillsContext";
import { useAuthContext } from '../hooks/useAuthContext';
import Select from 'react-select';

const SkillForm = () => {
    const { dispatch } = useSkillsContext()
    const { user } = useAuthContext()

    const [name, setName] = useState('')
    const [comfortLevel, setComfortLevel] = useState({value: 0, label: 0})
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const skill = { name, comfortLevel: comfortLevel.value }
        
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
            setComfortLevel({value: 0, label: 0})
            dispatch({type: 'CREATE_SKILL', payload: json})
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
        <form className="create" onSubmit={handleSubmit}> 
            <h3>Add a New Skill</h3>

            <label>Skill Name:</label>
            <input 
                type="text" 
                onChange={(e) => setName(e.target.value)} 
                value={name}
                className={emptyFields.includes('name') ? 'error' : ''}
            />

            <label>Comfort Level:</label>
            <Select
                defaultValue={comfortLevel}
                onChange={(selection) => setComfortLevel(selection.value)}
                options={generateComfortLevelOptions()}
                className="input-select"
            />

            <button type="submit">Add Skill</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default SkillForm