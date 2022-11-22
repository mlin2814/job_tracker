/*
CODE CITATION
Title: MERN Auth tutorial source code
Author: The Net Ninja
Date: 2022
Type: Adapted from
Source: https://github.com/iamshaunjp/MERN-Auth-Tutorial
*/

import { useState } from 'react'
import { useJobsContext } from "../hooks/useJobsContext";
import { useAuthContext } from '../hooks/useAuthContext'
import EditJobModal from './EditJobModal';

const JobDetails = ({ job }) => {
    const { dispatch } = useJobsContext()
    const { user } = useAuthContext()

    const [modalOpen, setModalOpen] = useState(false)

    const handleDelete = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/jobs/' + job._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_JOB', payload: json })
        }
    }

    const handleEdit = async () => {
        setModalOpen(true)
    }

    console.log({job})

    // TODO - Update fetching of jobs to include the skills objects inside of each job (see Populate video)
    const jobSkillString = job.skills.join(", ")

    return (
        <div className="job-details">
            <div className="card-header">
                <h4>{job.title}</h4>
                <div className="card-button-container">
                    <span className="material-symbols-outlined card-buttons" onClick={handleEdit}>EDIT</span>
                    <span className="material-symbols-outlined card-buttons" onClick={handleDelete}>DELETE</span>
                </div>
            </div>


            <p><strong>Company: </strong>{job.company}</p>
            <p><strong>Description: </strong>{job.description}</p>
            <p><strong>Location: </strong>{job.location}</p>
            <p><strong>Deadline: </strong>{job.deadline}</p>
            <p><strong>Skills: </strong>{jobSkillString}</p>

            {modalOpen && <EditJobModal setModalOpen={setModalOpen} job={job} />}
        </div>
    )
}

export default JobDetails