import React from "react";
import useUserStore from "../stores/userStore";

function Skills() {
    const userSkills = useUserStore((state) => state.skills);
    console.log({ userSkills });

    const skillItems = userSkills.map((skill, i) => (
        <div key={i}>
            <h4>{skill.name}</h4>
            <ul>
                <li>Skill ID: {skill.id}</li>
                <li>Comfort Level: {skill.comfortLevel}/10</li>
            </ul>
        </div>
    ));

    return (
        <div>
            <h1>Skills</h1>
            {skillItems}
        </div>
    );
}

export default Skills;
