import { useEffect } from "react"
import { useContactsContext } from "../hooks/useContactsContext";
import { useAuthContext } from "../hooks/useAuthContext"

// components
import ContactDetails from "../components/ContactDetails"
import ContactForm from "../components/ContactForm"

const Contact = () => {
    const { contacts, dispatch } = useContactsContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchContacts = async () => {
            const response = await fetch('/contacts', {
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_CONTACTS', payload: json})
            }
        }
        
        if (user) {
            fetchContacts()
        }
        fetchContacts()
    }, [dispatch, user])

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