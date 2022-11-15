import { useEffect } from "react"

import { useContactsContext } from "../hooks/useContactsContext";

// components
import ContactDetails from "../components/ContactDetails"
import ContactForm from "../components/ContactForm"

const Contact = () => {
    // const [contacts, setContacts] = useState(null)

    const { contacts, dispatch } = useContactsContext()

    useEffect(() => {
        const fetchContacts = async () => {
            const response = await fetch('/contacts')
            const json = await response.json()

            if (response.ok) {
                // setContacts(json)
                dispatch({type: 'SET_CONTACTS', payload: json})
            }
        }

        fetchContacts()
    }, [dispatch])

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