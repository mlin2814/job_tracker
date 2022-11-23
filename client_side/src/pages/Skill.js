import { useSkillsContext } from "../hooks/useSkillsContext";

// components
import SkillDetails from "../components/SkillDetails"
import SkillForm from "../components/SkillForm"

const Skill = () => {
    const { skills } = useSkillsContext()

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