import React from "react";
import useUserStore from "../stores/userStore";

function Skills() {
    const userSkills = useUserStore((state) => state.skills);
    console.log({ userSkills });

    const skillItems = userSkills.map((skill, i) => (
        <div key={i}>
            {skill.name}
            <ul>
                <li>Skill ID: {skill.id}</li>
                <li>Comfort Level: {skill.comfortLevel}/10</li>
            </ul>
        </div>
    ));

    return (
        <div>
            <h1>Skills</h1>
            <ul>{skillItems}</ul>
        </div>
    );
}

export default Skills;
