import { useState } from 'react'
import { useSkillsContext } from "../hooks/useSkillsContext";
import { useAuthContext } from '../hooks/useAuthContext';
import EditSkillModal from './EditSkillModal';

const SkillDetails = ({ skill }) => {
    const { dispatch } = useSkillsContext()
    const { user } = useAuthContext()

    const [modalOpen, setModalOpen] = useState(false)

    const handleDelete = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/skills/' + skill._id, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
        dispatch({type: 'DELETE_SKILL', payload: json})
        }
    }

    const handleEdit = async () => {
        setModalOpen(true)
    }

    return (
        <div className="contact-details">
            <div className="card-header">
                <h4>{skill.name}</h4>
                <div className="card-button-container">
                    <span className="material-symbols-outlined card-buttons" onClick={handleEdit}>EDIT</span>
                    <span className="material-symbols-outlined card-buttons" onClick={handleDelete}>DELETE</span>
                </div>
            </div>
            
            <p><strong>Comfort Level: </strong>{skill.comfortLevel}/10</p>

            {modalOpen && <EditSkillModal setModalOpen={setModalOpen} skill={skill}/>}
        </div>
    )
}

export default SkillDetails