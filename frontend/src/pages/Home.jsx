import React from "react";
import { Box, Container, Typography } from "@mui/material";

function Home() {
    return (
        <Container maxWidth="lg">
            <Box my={3} alignItems="center">
                <Typography variant="h4" gutterBottom>
                    Home
                </Typography>
            </Box>
            <Box>
                <Typography>
                    Please log in to see your jobs, skills, and contacts.
                </Typography>
            </Box>
        </Container>
    );
}

export default Home;
