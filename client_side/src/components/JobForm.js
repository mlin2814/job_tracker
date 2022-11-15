// import { useState } from 'react'

// const JobForm = () => {
//     const [title, setTitle] = useState('')
//     const [company, setCompany] = useState('')
//     const [description, setDescription] = useState('')
//     const [location, setLocation] = useState('')
//     const [deadline, setDeadline] = useState('')
//     const [skills, setSkills] = useState('')
//     const [error, setError] = useState(null)

//     const handleSubmit = async (e) => {
//         e.preventDefault()

//     const job = {title, company, description, location, deadline, skills}
    
//     const response = await fetch('/jobs', {
//         method: 'POST',
//         body: JSON.stringify(job),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     const json = await response.json()

//     if (!response.ok) {
//         setError(json.error)
//     }
//     if (response.ok) {
//         setError(null)
//         setTitle('')
//         setCompany('')
//         setDescription('')
//         setLocation('')
//         setDeadline('')
//         setSkills([])
//         console.log('new job added:', json)
//     }

//   }

//     return (
//         <form className="create" onSubmit={handleSubmit}> 
//             <h3>Add a New Job</h3>

//             <label>Job Title:</label>
//             <input 
//                 type="text" 
//                 onChange={(e) => setTitle(e.target.value)} 
//                 value={title}
//             />

//             <label>Company:</label>
//             <input 
//                 type="text" 
//                 onChange={(e) => setCompany(e.target.value)} 
//                 value={company}
//             />

//             <label>Description:</label>
//             <input 
//                 type="text" 
//                 onChange={(e) => setDescription(e.target.value)} 
//                 value={description}
//             />

//             <label>Location:</label>
//             <input 
//                 type="text" 
//                 onChange={(e) => setLocation(e.target.value)} 
//                 value={location}
//             />

//             <label>Deadline:</label>
//             <input 
//                 type="text" 
//                 onChange={(e) => setDeadline(e.target.value)} 
//                 value={deadline}
//             />

//             <label>Skills:</label>
//             <input 
//                 type="text" 
//                 onChange={(e) => setSkills(e.target.value)} 
//                 value={skills}
//             />

//             <button>Add Job</button>
//             {error && <div className="error">{error}</div>}
//         </form>
//     )
// }

// export default JobForm

import { useState } from 'react'

const JobForm = () => {
    const [title, setTitle] = useState('')
    const [company, setCompany] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [deadline, setDeadline] = useState('')
    const [skills, setSkills] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

    const job = {title, company, description, location, deadline, skills}
    
    const response = await fetch('/jobs', {
        method: 'POST',
        body: JSON.stringify(job),
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
        setTitle('')
        setCompany('')
        setDescription('')
        setLocation('')
        setDeadline('')
        setSkills([])
        console.log('new job added:', json)
    }

  }

    return (
        <form className="create" onSubmit={handleSubmit}> 
            <h3>Add a New Job</h3>

            <label>Job Title:</label>
               <input 
                type="text" 
                onChange={(e) => setTitle(e.target.value)} 
                value={title}
            />

            <label>Company:</label>
            <input 
                type="text" 
                onChange={(e) => setCompany(e.target.value)} 
                value={company}
            />

            <label>Description:</label>
            <input 
                type="text" 
                onChange={(e) => setDescription(e.target.value)} 
                value={description}
            />

            <label>Location:</label>
            <input 
                type="text" 
                onChange={(e) => setLocation(e.target.value)} 
                value={location}
            />

            <label>Deadline:</label>
            <input 
                type="text" 
                onChange={(e) => setDeadline(e.target.value)} 
                value={deadline}
            />

            <label>Skills:</label>
            <input 
                type="text" 
                onChange={(e) => setSkills(e.target.value)} 
                value={skills}
            />

            <button>Add Contact</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default JobForm