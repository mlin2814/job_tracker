/*
CODE CITATION
Title: MERN Auth tutorial source code
Author: The Net Ninja
Date: 2022
Type: Adapted from
Source: https://github.com/iamshaunjp/MERN-Auth-Tutorial
*/

import { useContactsContext } from "../hooks/useContactsContext";

// components
import ContactDetails from "../components/ContactDetails"
import ContactForm from "../components/ContactForm"

const Contact = () => {
    const { contacts } = useContactsContext()

    return (
        <div className="home">
            <div className="contact">
                {contacts && contacts.map(contact => (
                    <ContactDetails contact={contact} key={contact._id} />
                ))}
            </div>
            <ContactForm />
        </div>
    )
}

export default Contact