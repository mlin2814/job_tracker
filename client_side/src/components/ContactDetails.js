const ContactDetails = ({ contact }) => {
    return (
        <div className="contact-details">
            <h4><strong>Contact Name: </strong>{contact.username}</h4>
            <p><strong>Email: </strong>{contact.email}</p>
            <p><strong>Phone: </strong>{contact.phone}</p>
            <p><strong>LinkedIn: </strong>{contact.linkedin}</p>
        </div>
    )
}

export default ContactDetails