import { useState } from 'react'
import { useSkillsContext } from "../hooks/useSkillsContext";
import { useJobsContext } from "../hooks/useJobsContext";
import { useAuthContext } from '../hooks/useAuthContext';
import EditSkillModal from './EditSkillModal';

const SkillDetails = ({ skill }) => {
    const { dispatch: skillsDispatch } = useSkillsContext()
    const { jobs, dispatch: jobsDispatch } = useJobsContext()
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
            // Remove skill from jobs that referred to the skill
            const updatedJobs = jobs.map(j => {
                j.skills = j.skills.filter(s => s._id !== skill._id)
                return j
            })
            jobsDispatch({type: 'SET_JOBS', payload: updatedJobs})
            skillsDispatch({type: 'DELETE_SKILL', payload: json})
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