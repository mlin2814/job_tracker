const JobDetails = ({ job }) => {
    const jobSkillString = job.skills.toString().replaceAll(',', ', ')
    return (
        <div className="job-details">
        <h4><strong>Position: </strong>{job.title}</h4>
        <p><strong>Company: </strong>{job.company}</p>
        <p><strong>Description: </strong>{job.description}</p>
        <p><strong>Location: </strong>{job.location}</p>
        <p><strong>Deadline: </strong>{job.deadline}</p>
        <p><strong>Skills: </strong>{jobSkillString}</p>
        </div>
    )
}

export default JobDetails