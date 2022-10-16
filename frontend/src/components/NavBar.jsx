import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <h3>NavBar</h3>
            <ul>
                <li>
                    <Link to={"/"}>JobTracker</Link>
                </li>
                <li>
                    <Link to={"/jobs"}>Jobs</Link>
                </li>
                <li>
                    <Link to={"/skills"}>Skills</Link>
                </li>
                <li>
                    <Link to={"/contacts"}>Contacts</Link>
                </li>
                <li>
                    <Link to={"/login"}>Login</Link>
                </li>
                <li>
                    <Link to={"/"}>Logout</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
