import React, { useState } from "react";
import useUserStore from "../stores/userStore";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function ContactCard({ contact }) {
    const userJobs = useUserStore((state) => state.jobs);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const jobs = userJobs
        .filter((job) => job.contacts.includes(contact.id))
        .map((job) => job.jobTitle);
    console.log({ jobs });

    return (
        <Grid item xs={12} md={6}>
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
                    title={contact.name}
                />
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Edit</MenuItem>
                    <MenuItem onClick={handleClose}>Delete</MenuItem>
                </Menu>
                <CardContent>
                    <Typography variant="body2">
                        Contact ID: {contact.id}
                    </Typography>
                    <Typography variant="body2">
                        Email: {contact.email}
                    </Typography>
                    <Typography variant="body2">
                        Phone Number: {contact.phoneNumber}
                    </Typography>
                    <Typography variant="body2">
                        LinkedIn: {contact.linkedin}
                    </Typography>
                    <Typography variant="body2">
                        Affiliated Jobs:{" "}
                        {jobs.length ? jobs.join(", ") : "None"}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default ContactCard;
