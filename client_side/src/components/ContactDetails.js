/*
CODE CITATION
Title: MERN Auth tutorial source code
Author: The Net Ninja
Date: 2022
Type: Adapted from
Source: https://github.com/iamshaunjp/MERN-Auth-Tutorial
*/

import { useState } from 'react'
import { useContactsContext } from "../hooks/useContactsContext";
import { useAuthContext } from '../hooks/useAuthContext';
import EditContactModal from './EditContactModal';

const ContactDetails = ({ contact }) => {
    const { dispatch } = useContactsContext()
    const { user } = useAuthContext()

    const [modalOpen, setModalOpen] = useState(false)

    const handleDelete = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/contacts/' + contact._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_CONTACT', payload: json })
        }
    }

    const handleEdit = async () => {
        setModalOpen(true)
    }

    return (
        <div className="contact-details">
            <div className="card-header">
                <h4>{contact.username}</h4>
                <div className="card-button-container">
                    <span className="material-symbols-outlined card-buttons" onClick={handleEdit}>EDIT</span>
                    <span className="material-symbols-outlined card-buttons" onClick={handleDelete}>DELETE</span>
                </div>
            </div>

            <p><strong>Email: </strong>{contact.email}</p>
            <p><strong>Phone: </strong>{contact.phone}</p>
            <p><strong>LinkedIn: </strong>{contact.linkedin}</p>

            {modalOpen && <EditContactModal setModalOpen={setModalOpen} contact={contact} />}
        </div>
    )
}

export default ContactDetails