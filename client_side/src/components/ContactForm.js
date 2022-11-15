import { useState } from 'react'

const ContactForm = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

    const contact = {username, email, phone, linkedin}
    
    const response = await fetch('/contacts', {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const json = await response.json()

    if (!response.ok) {
        setError(json.error)
    }
    if (response.ok) {
        setError(null)
        setUsername('')
        setEmail('')
        setPhone('')
        setLinkedin('')
        console.log('new contact added:', json)
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
            />

            <label>Email:</label>
            <input 
                type="text" 
                onChange={(e) => setEmail(e.target.value)} 
                value={email}
            />

            <label>Phone:</label>
            <input 
                type="text" 
                onChange={(e) => setPhone(e.target.value)} 
                value={phone}
            />

            <label>LinkedIn:</label>
            <input 
                type="text" 
                onChange={(e) => setLinkedin(e.target.value)} 
                value={linkedin}
            />


            <button>Add Contact</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ContactForm