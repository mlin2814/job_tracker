import { useEffect } from "react"
import { useSkillsContext } from "../hooks/useSkillsContext";
import { useAuthContext } from "../hooks/useAuthContext"

// components
import SkillDetails from "../components/SkillDetails"
import SkillForm from "../components/SkillForm"

const Skill = () => {
    const { skills, dispatch } = useSkillsContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchSkills = async () => {
            const response = await fetch('/skills', {
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_SKILLS', payload: json})
            }
        }
        
        if (user) {
            fetchSkills()
        }
        fetchSkills()
    }, [dispatch, user])

    return (
        <div className="home">
            <div className="skill">
            {skills && skills.map(skill => (
                <SkillDetails skill={skill} key={skill._id} />
            ))}
            </div>
            <SkillForm />
        </div>
    )
}

export default Skill