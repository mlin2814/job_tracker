import React from "react";
import useUserStore from "../stores/userStore";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function Contacts() {
    const userContacts = useUserStore((state) => state.contacts);
    const userJobs = useUserStore((state) => state.jobs);
    console.log({ userContacts });

    const contactItems = userContacts.map((contact, i) => {
        const jobs = userJobs
            .filter((job) => job.contacts.includes(contact.id))
            .map((job) => job.jobTitle);
        console.log({ jobs });

        return (
            <Grid item xs={12} sm={6} key={i}>
                <Card>
                    <CardHeader
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={contact.name}
                    />
                    <CardContent>
                        <Typography variant="body2">
                            Contact ID: {contact.id}
                        </Typography>
                        <ul>
                            <li>Contact ID: {contact.id}</li>
                            <li>Email: {contact.email}</li>
                            <li>Phone Number: {contact.phoneNumber}</li>
                            <li>LinkedIn: {contact.linkedin}</li>
                            <li>
                                Affiliated Jobs:{" "}
                                {jobs.length ? jobs.join(", ") : "None"}
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </Grid>
        );
    });

    return (
        <Container maxWidth="md">
            <Grid container my={3} alignItems="center">
                <Grid item xs={8}>
                    <Typography variant="h3">Contacts</Typography>
                </Grid>
                <Grid item xs={4} textAlign="right">
                    <Fab size="small" color="secondary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                {contactItems}
            </Grid>
        </Container>
    );
}

export default Contacts;
