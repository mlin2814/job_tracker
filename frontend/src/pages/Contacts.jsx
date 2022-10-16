import React from "react";
import useUserStore from "../../stores/userStore";

function Contacts() {
    const userContacts = useUserStore((state) => state.contacts);
    console.log({ userContacts });

    return (
        <div>
            <h1>Contacts</h1>
            <p>Here you can see all of your contacts.</p>
        </div>
    );
}

export default Contacts;
