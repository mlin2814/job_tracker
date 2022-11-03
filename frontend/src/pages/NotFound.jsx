import React from "react";
import { Container, Typography, Grid } from "@mui/material";

function NotFound() {
    return (
        <Container maxWidth="lg">
            <Grid container my={3} alignItems="center" textAlign="center">
                <Grid item xs={12}>
                    <Typography variant="h4">404: Page Not Found</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">
                        The page you were looking for was not found.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}

export default NotFound;
