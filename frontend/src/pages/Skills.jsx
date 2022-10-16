import React from "react";
import useUserStore from "../../stores/userStore";

function Skills() {
    const userSkills = useUserStore((state) => state.skills);
    console.log({ userSkills });

    return (
        <div>
            <h1>Skills</h1>
            <p>Here you can see a listing of skills.</p>
        </div>
    );
}

export default Skills;
