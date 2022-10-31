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

function Skills() {
    const userSkills = useUserStore((state) => state.skills);
    console.log({ userSkills });

    const skillItems = userSkills.map((skill, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
            <Card>
                <CardHeader
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={skill.name}
                    subheader={`Comfort Level: ${skill.comfortLevel}/10`}
                />
                <CardContent>
                    <Typography variant="body2">
                        Skill ID: {skill.id}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    ));

    return (
        <Container maxWidth="md">
            <Grid container my={3} alignItems="center">
                <Grid item xs={8}>
                    <Typography variant="h3">Skills</Typography>
                </Grid>
                <Grid item xs={4} textAlign="right">
                    <Fab size="small" color="secondary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                {skillItems}
            </Grid>
        </Container>
    );
}

export default Skills;
