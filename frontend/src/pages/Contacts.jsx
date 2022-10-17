import React from "react";
import useUserStore from "../stores/userStore";

function Contacts() {
    const userContacts = useUserStore((state) => state.contacts);
    console.log({ userContacts });

    const contactItems = userContacts.map((contact, i) => (
        <div key={i}>
            <h4>{contact.name}</h4>
            <ul>
                <li>Contact ID: {contact.id}</li>
                <li>Email: {contact.email}</li>
                <li>Phone Number: {contact.phoneNumber}</li>
                <li>LinkedIn: {contact.linkedin}</li>
            </ul>
        </div>
    ));

    return (
        <div>
            <h1>Contacts</h1>
            {contactItems}
        </div>
    );
}

export default Contacts;
