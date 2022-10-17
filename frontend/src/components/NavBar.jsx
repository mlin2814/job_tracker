import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    const { loginWithRedirect, logout, user, isLoading } = useAuth0();

    return (
        <nav>
            <h3>NavBar</h3>
            <ul style={{ listStyle: "none" }}>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                {user && (
                    <>
                        <li>
                            <Link to={"/jobs"}>Jobs</Link>
                        </li>
                        <li>
                            <Link to={"/skills"}>Skills</Link>
                        </li>
                        <li>
                            <Link to={"/contacts"}>Contacts</Link>
                        </li>
                    </>
                )}
                {!isLoading && !user && (
                    <li>
                        <button onClick={() => loginWithRedirect()}>
                            Log in
                        </button>
                    </li>
                )}
                {!isLoading && user && (
                    <li>
                        <button onClick={() => logout()}>Log out</button>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default NavBar;
