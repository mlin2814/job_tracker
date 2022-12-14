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
import { useJobsContext } from "../hooks/useJobsContext";
import { useAuthContext } from '../hooks/useAuthContext';

const EditContactModal = ({ setModalOpen, contact }) => {
    const { dispatch: contactsDispatch } = useContactsContext()
    const { jobs, dispatch: jobsDispatch } = useJobsContext()
    const { user } = useAuthContext()

    const [username, setUsername] = useState(contact.username)
    const [email, setEmail] = useState(contact.email)
    const [phone, setPhone] = useState(contact.phone)
    const [linkedin, setLinkedin] = useState(contact.linkedin)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const newContact = { ...contact, username, email, linkedin, phone }

        const response = await fetch(`/contacts/${contact._id}`, {
            method: 'PATCH',
            body: JSON.stringify(newContact),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            // Edit contact in any job that referred to the contact
            const updatedJobs = jobs.map(j => {
                j.contacts = j.contacts.map(c => {
                    if (c._id === contact._id) {
                        return {...c, username, email, linkedin, phone}
                    } else {
                        return c
                    }
                })
                return j
            })
            jobsDispatch({type: 'SET_JOBS', payload: updatedJobs})
            contactsDispatch({ type: 'EDIT_CONTACT', payload: newContact })
            setModalOpen(false)
        }
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Edit Contact</h3>
                </div>
                <form className="create" onSubmit={handleSubmit}>

                    <label>Name:</label>
                    <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        className={emptyFields.includes('username') ? 'error' : ''}
                        required
                    />

                    <label>Email:</label>
                    <input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className={emptyFields.includes('email') ? 'error' : ''}
                    />

                    <label>Phone:</label>
                    <input
                        type="text"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        className={emptyFields.includes('phone') ? 'error' : ''}
                    />

                    <label>LinkedIn:</label>
                    <input
                        type="text"
                        onChange={(e) => setLinkedin(e.target.value)}
                        value={linkedin}
                        className={emptyFields.includes('linkedin') ? 'error' : ''}
                    />

                    <div className="modal-button-container">
                        <button onClick={handleSubmit} type="submit">Save</button>
                        <button onClick={() => setModalOpen(false)} type="button">Cancel</button>
                    </div>

                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </div>
    )
}

export default EditContactModal