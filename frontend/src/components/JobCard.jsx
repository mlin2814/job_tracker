import React from "react";
import {
    Typography,
    Grid,
    Card,
    CardHeader,
    CardContent,
    IconButton,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useUserStore from "../stores/userStore.js";

function JobCard({ job }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const contacts = useUserStore((state) => state.contacts);
    const skills = useUserStore((state) => state.skills);
    const deleteJob = useUserStore((state) => state.deleteJob);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleEdit() {
        handleClose();
    }

    function handleDelete() {
        deleteJob(job.id);
        handleClose();
    }

    const relatedContacts = contacts
        .filter((contact) => job.contacts.includes(contact.id))
        .map((contact) => contact.name);
    const relatedSkills = skills
        .filter((skill) => job.skills.includes(skill.id))
        .map((skill) => skill.name);

    return (
        <Grid item xs={12}>
            <Card>
                <CardHeader
                    action={
                        <IconButton
                            aria-label="settings"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={job.jobTitle}
                />
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleEdit} disabled>
                        Edit
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </Menu>
                <CardContent>
                    <Typography variant="body2">Job ID: {job.id}</Typography>
                    <Typography variant="body2" py={1}>
                        Company: {job.companyName}
                    </Typography>
                    <Typography variant="body2" py={1}>
                        Location: {job.jobLoc}
                    </Typography>
                    <Typography variant="body2" py={1}>
                        Company: {job.jobDesc}
                    </Typography>
                    <Typography variant="body2" py={1}>
                        Deadline: {job.deadline}
                    </Typography>
                    <Typography variant="body2" py={1}>
                        Internship: {job.isInternship ? "Yes" : "No"}
                    </Typography>
                    <Typography variant="body2" py={1}>
                        Related Skills:{" "}
                        {relatedSkills.length
                            ? relatedSkills.join(", ")
                            : "None"}
                    </Typography>
                    <Typography variant="body2" py={1}>
                        Related Contacts:{" "}
                        {relatedContacts.length
                            ? relatedContacts.join(", ")
                            : "None"}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default JobCard;
