import React, { useState } from "react";
import useUserStore from "../stores/userStore";
import { Container, Typography, Grid, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import JobCard from "../components/JobCard";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Button from "@mui/material/Button";

function Jobs() {
    const userJobs = useUserStore((state) => state.jobs);
    console.log({ userJobs });

    const [sort, setSort] = useState("");

    const handleChange = (event) => {
        setSort(event.target.value);
    };

    const jobItems = userJobs.map((job, i) => <JobCard job={job} key={i} />);

    return (
        <Container maxWidth="lg">
            <Grid container my={3} alignItems="center">
                <Grid item xs={2} sm={5}>
                    <Typography variant="h4">Jobs</Typography>
                </Grid>
                <Grid item xs={3} sx={{ display: { sm: "none" } }}></Grid>
                <Grid item xs={3} sm={3} textAlign="right" pr={1}>
                    <Button
                        variant="outlined"
                        startIcon={<FilterAltIcon />}
                        disabled
                    >
                        Filter
                    </Button>
                </Grid>
                <Grid item xs={3} sm={3}>
                    <FormControl size="small" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Sort By
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sort}
                            label="sort"
                            onChange={handleChange}
                            disabled
                        >
                            <MenuItem value={"Company: A-Z"}>
                                Company: A-Z
                            </MenuItem>
                            <MenuItem value={"Company: Z-A"}>
                                Company: Z-A
                            </MenuItem>
                            <MenuItem value={"Comfort: Asc"}>
                                Job Title: Asc
                            </MenuItem>
                            <MenuItem value={"Comfort: Desc"}>
                                Job Title: Desc
                            </MenuItem>
                            <MenuItem value={"Deadline (soonest first)"}>
                                Deadline (soonest first)
                            </MenuItem>
                            <MenuItem value={"Deadline (latest first)"}>
                                Deadline (latest first)
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={1} textAlign="center">
                    <Fab size="small" color="secondary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {jobItems}
            </Grid>
        </Container>
    );
}

export default Jobs;
