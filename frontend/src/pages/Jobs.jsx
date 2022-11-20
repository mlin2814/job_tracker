import React, { useState, useEffect } from "react";
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
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { OutlinedInput } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function Jobs() {
    const userJobs = useUserStore((state) => state.jobs);
    const userContacts = useUserStore((state) => state.contacts);
    const userSkills = useUserStore((state) => state.skills);
    const setJobs = useUserStore((state) => state.setJobs);
    const addJob = useUserStore((state) => state.addJob);

    const [filteredJobs, setFilteredJobs] = useState(userJobs);
    const [sort, setSort] = useState("");
    const [open, setOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);

    const [jobTitle, setJobTitle] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [jobLoc, setJobLoc] = useState("");
    const [deadline, setDeadline] = useState("");
    const [isInternship, setIsInternship] = useState(false);
    const [relatedSkills, setRelatedSkills] = useState([]);
    const [relatedContacts, setRelatedContacts] = useState([]);

    const [filterInternships, setFilterInternships] = useState(true);
    const [filterFullTime, setFilterFullTime] = useState(true);
    const [filterRelatedSkills, setFilterRelatedSkills] = useState([]);
    const [filterRelatedContacts, setFilterRelatedContacts] = useState([]);

    const [jobItems, setJobItems] = useState([]);

    const handleOpen = () => {
        setJobTitle("");
        setCompanyName("");
        setJobDesc("");
        setJobLoc("");
        setDeadline("");
        setIsInternship(false);
        setRelatedSkills([]);
        setRelatedContacts([]);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const handleFilterOpen = () => {
        setFilterOpen(true);
    };
    const handleFilterClose = () => setFilterOpen(false);

    function handleSort(event) {
        setSort(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const newSkills = relatedSkills.map((skill) => skill.id);
        const newContacts = relatedContacts.map((contact) => contact.id);

        addJob({
            jobTitle,
            companyName,
            jobDesc,
            jobLoc,
            deadline,
            isInternship,
            skills: newSkills,
            contacts: newContacts,
        });
        handleClose();
    }

    function handleFilterSubmit(event) {
        event.preventDefault();
        handleFilterClose();
    }

    function handleRelatedContacts(event) {
        setRelatedContacts(event.target.value);
    }

    function handleRelatedSkills(event) {
        setRelatedSkills(event.target.value);
    }

    function handleFilterRelatedContacts(event) {
        setFilterRelatedContacts(event.target.value);
    }

    function handleFilterRelatedSkills(event) {
        setFilterRelatedSkills(event.target.value);
    }

    useEffect(() => {
        // Re-sort the filteredJobs if sort or userJobs changes
        if (filteredJobs) {
            if (sort === "Job Title: A-Z") {
                setFilteredJobs(
                    [...filteredJobs].sort((a, b) => {
                        if (a.jobTitle < b.jobTitle) {
                            return -1;
                        }
                        if (a.jobTitle > b.jobTitle) {
                            return 1;
                        }
                        return 0;
                    })
                );
            }
            if (sort === "Job Title: Z-A") {
                setFilteredJobs(
                    [...filteredJobs].sort((a, b) => {
                        if (a.jobTitle < b.jobTitle) {
                            return 1;
                        }
                        if (a.jobTitle > b.jobTitle) {
                            return -1;
                        }
                        return 0;
                    })
                );
            }
            if (sort === "Company: A-Z") {
                setFilteredJobs(
                    [...filteredJobs].sort((a, b) => {
                        if (a.companyName < b.companyName) {
                            return -1;
                        }
                        if (a.companyName > b.companyName) {
                            return 1;
                        }
                        return 0;
                    })
                );
            }
            if (sort === "Company: Z-A") {
                setFilteredJobs(
                    [...filteredJobs].sort((a, b) => {
                        if (a.companyName < b.companyName) {
                            return 1;
                        }
                        if (a.companyName > b.companyName) {
                            return -1;
                        }
                        return 0;
                    })
                );
            }
            if (sort === "Deadline (soonest first)") {
                setFilteredJobs(
                    [...filteredJobs].sort((a, b) => {
                        return moment(a.deadline) - moment(b.deadline);
                    })
                );
            }
            if (sort === "Deadline (latest first)") {
                setFilteredJobs(
                    [...filteredJobs].sort((a, b) => {
                        return moment(b.deadline) - moment(a.deadline);
                    })
                );
            }
        }
    }, [userJobs, sort]);

    useEffect(() => {
        setFilteredJobs(userJobs);
    }, [userJobs]);

    useEffect(() => {
        setJobItems(
            filteredJobs.map((job, i) => <JobCard job={job} key={i} />)
        );
    }, [filteredJobs, userJobs]);

    useEffect(() => {
        const jobsByType = userJobs.filter((job) => {
            if (job.isInternship && filterInternships) {
                return true;
            }
            if (!job.isInternship && filterFullTime) {
                return true;
            }
            return false;
        });

        const jobsWithAllRelatedSkills = jobsByType.filter((job) => {
            return filterRelatedSkills.every((skill) =>
                job.skills.includes(skill.id)
            );
        });

        setFilteredJobs(jobsWithAllRelatedSkills);
    }, [
        userJobs,
        filterFullTime,
        filterInternships,
        filterRelatedSkills,
        filterRelatedContacts,
    ]);

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
                        onClick={handleFilterOpen}
                    >
                        Filter
                    </Button>
                </Grid>
                <Grid item xs={3} sm={3}>
                    <FormControl size="small" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Sort
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sort}
                            label="sort"
                            onChange={handleSort}
                        >
                            <MenuItem value={"Job Title: A-Z"}>
                                Job Title: A-Z
                            </MenuItem>
                            <MenuItem value={"Job Title: Z-A"}>
                                Job Title: Z-A
                            </MenuItem>
                            <MenuItem value={"Company: A-Z"}>
                                Company: A-Z
                            </MenuItem>
                            <MenuItem value={"Company: Z-A"}>
                                Company: Z-A
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
                    <Fab
                        size="small"
                        color="secondary"
                        aria-label="add"
                        onClick={handleOpen}
                    >
                        <AddIcon />
                    </Fab>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {filteredJobs && filteredJobs.length ? (
                    jobItems
                ) : (
                    <Typography variant="subtitle1">
                        No jobs available or no jobs matching your filters!
                        Click the Filter button to adjust your filters or click
                        the + button to add a new job!
                    </Typography>
                )}
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        textAlign="center"
                    >
                        Add a New Job
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Box textAlign={"center"} mt={3}>
                            <TextField
                                sx={{ width: 300 }}
                                required
                                id="outlined-required"
                                label="Job Title"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                            />
                        </Box>
                        <Box textAlign={"center"} mt={3}>
                            <TextField
                                sx={{ width: 300 }}
                                required
                                id="outlined-required"
                                label="Company Name"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </Box>
                        <Box textAlign={"center"} mt={3}>
                            <TextField
                                sx={{ width: 300 }}
                                required
                                id="outlined-required"
                                label="Job Description"
                                value={jobDesc}
                                onChange={(e) => setJobDesc(e.target.value)}
                            />
                        </Box>
                        <Box textAlign={"center"} mt={3}>
                            <TextField
                                sx={{ width: 300 }}
                                required
                                id="outlined-required"
                                label="Job Location"
                                value={jobLoc}
                                onChange={(e) => setJobLoc(e.target.value)}
                            />
                        </Box>
                        <Box textAlign={"center"} mt={3}>
                            <TextField
                                sx={{ width: 300 }}
                                required
                                id="outlined-required"
                                label="Deadline"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                            />
                        </Box>

                        <Box textAlign={"center"} mt={3}>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Is Internship?"
                                value={isInternship}
                                onChange={(e) =>
                                    setIsInternship(e.target.checked)
                                }
                            />
                        </Box>

                        <Box mt={3} display="flex" justifyContent="center">
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel id="multiple-name-label">
                                    Related Contacts
                                </InputLabel>
                                <Select
                                    labelId="multiple-name-label"
                                    id="multiple-name"
                                    multiple
                                    value={relatedContacts}
                                    onChange={handleRelatedContacts}
                                    input={
                                        <OutlinedInput label="Related Contacts" />
                                    }
                                    MenuProps={MenuProps}
                                >
                                    {userContacts.map((contact, i) => (
                                        <MenuItem key={i} value={contact}>
                                            {contact.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <Box mt={3} display="flex" justifyContent="center">
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel id="multiple-name-label">
                                    Related Skills
                                </InputLabel>
                                <Select
                                    labelId="multiple-name-label"
                                    id="multiple-name"
                                    multiple
                                    value={relatedSkills}
                                    onChange={handleRelatedSkills}
                                    input={
                                        <OutlinedInput label="Related Skills" />
                                    }
                                    MenuProps={MenuProps}
                                >
                                    {userSkills.map((skill, i) => (
                                        <MenuItem key={i} value={skill}>
                                            {skill.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <Grid
                            container
                            mt={2}
                            alignItems="center"
                            justifyContent="center"
                            gap={4}
                        >
                            <Button
                                type="submit"
                                variant="outlined"
                                color="success"
                            >
                                Add
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </form>
                </Box>
            </Modal>

            <Modal
                open={filterOpen}
                onClose={handleFilterClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        textAlign="center"
                    >
                        Filter Jobs
                    </Typography>

                    <form onSubmit={handleFilterSubmit}>
                        <Box
                            display="flex"
                            justifyContent="space-around"
                            mt={3}
                        >
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Full-time"
                                value={filterFullTime}
                                checked={filterFullTime}
                                onChange={(e) =>
                                    setFilterFullTime(e.target.checked)
                                }
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Internships"
                                value={filterInternships}
                                checked={filterInternships}
                                onChange={(e) =>
                                    setFilterInternships(e.target.checked)
                                }
                            />
                        </Box>

                        <Box mt={3} display="flex" justifyContent="left">
                            <FormControl sx={{ m: 1, width: "100%" }}>
                                <InputLabel id="multiple-filter-name-label">
                                    Related Contacts
                                </InputLabel>
                                <Select
                                    labelId="multiple-filter-name-label"
                                    id="multiple-filter-name"
                                    multiple
                                    value={filterRelatedContacts}
                                    onChange={handleFilterRelatedContacts}
                                    input={
                                        <OutlinedInput label="Related Contacts" />
                                    }
                                    MenuProps={MenuProps}
                                >
                                    {userContacts.map((contact, i) => (
                                        <MenuItem key={i} value={contact}>
                                            {contact.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <Box mt={3} display="flex" justifyContent="left">
                            <FormControl sx={{ m: 1, width: "100%" }}>
                                <InputLabel id="multiple-name-filter-label">
                                    Related Skills
                                </InputLabel>
                                <Select
                                    labelId="multiple-name-filter-label"
                                    id="multiple-filter-name"
                                    multiple
                                    value={filterRelatedSkills}
                                    onChange={handleFilterRelatedSkills}
                                    input={
                                        <OutlinedInput label="Related Skills" />
                                    }
                                    MenuProps={MenuProps}
                                >
                                    {userSkills.map((skill, i) => (
                                        <MenuItem key={i} value={skill}>
                                            {skill.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <Grid
                            container
                            mt={2}
                            alignItems="center"
                            justifyContent="center"
                            gap={4}
                        >
                            <Button
                                variant="outlined"
                                color="success"
                                onClick={handleFilterClose}
                            >
                                Done
                            </Button>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </Container>
    );
}

export default Jobs;
