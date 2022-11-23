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

const ContactForm = () => {
    const { dispatch } = useContactsContext()
    const { user } = useAuthContext()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const contact = { username, email, phone, linkedin }

        const response = await fetch('/contacts', {
            method: 'POST',
            body: JSON.stringify(contact),
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
            setEmptyFields([])
            setError(null)
            setUsername('')
            setEmail('')
            setPhone('')
            setLinkedin('')
            dispatch({ type: 'CREATE_CONTACT', payload: json })
        }

    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Contact</h3>

            <label>Contact Name:</label>
            <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className={emptyFields.includes('username') ? 'error' : ''}
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


            <button>Add Contact</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ContactForm