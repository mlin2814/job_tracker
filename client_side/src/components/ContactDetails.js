import { useContactsContext } from "../hooks/useContactsContext";

const ContactDetails = ({ contact }) => {
    const { dispatch } = useContactsContext()

    const handleClick = async () => {
        const response = await fetch('/contacts/' + contact._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
        dispatch({type: 'DELETE_CONTACT', payload: json})
        }
    }
    return (
        <div className="contact-details">
            <h4><strong>Contact Name: </strong>{contact.username}</h4>
            <p><strong>Email: </strong>{contact.email}</p>
            <p><strong>Phone: </strong>{contact.phone}</p>
            <p><strong>LinkedIn: </strong>{contact.linkedin}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>DELETE</span>
        </div>
    )
}

export default ContactDetails