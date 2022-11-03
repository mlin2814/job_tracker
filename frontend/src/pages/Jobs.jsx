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
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { OutlinedInput } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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
    const addJob = useUserStore((state) => state.addJob);

    const [sort, setSort] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [jobTitle, setJobTitle] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [jobLoc, setJobLoc] = useState("");
    const [deadline, setDeadline] = useState("");
    const [isInternship, setIsInternship] = useState(false);
    const [relatedSkills, setRelatedSkills] = useState([]);
    const [relatedContacts, setRelatedContacts] = useState([]);

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

    function handleRelatedContacts(event) {
        setRelatedContacts(event.target.value);
    }

    function handleRelatedSkills(event) {
        setRelatedSkills(event.target.value);
    }

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
                            onChange={handleSort}
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
                {jobItems}
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
                        Add a New Contact
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
        </Container>
    );
}

export default Jobs;
