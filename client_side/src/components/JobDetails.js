import { useJobsContext } from "../hooks/useJobsContext";

const JobDetails = ({ job }) => {
    const { dispatch } = useJobsContext()

    const handleClick = async () => {
        const response = await fetch('/jobs/' + job._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
        dispatch({type: 'DELETE_JOB', payload: json})
        }
    }

    const jobSkillString = job.skills.toString().replaceAll(',', ', ')

    return (
        <div className="job-details">
        <h4><strong>Position: </strong>{job.title}</h4>
        <p><strong>Company: </strong>{job.company}</p>
        <p><strong>Description: </strong>{job.description}</p>
        <p><strong>Location: </strong>{job.location}</p>
        <p><strong>Deadline: </strong>{job.deadline}</p>
        <p><strong>Skills: </strong>{jobSkillString}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>DELETE</span>
        </div>
    )
}

export default JobDetails