import React, { useState, useEffect } from "react";
import {
    Typography,
    Grid,
    Card,
    CardHeader,
    CardContent,
    IconButton,
    OutlinedInput,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useUserStore from "../stores/userStore.js";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

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

function JobCard({ job }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const userJobs = useUserStore((state) => state.jobs);
    const userContacts = useUserStore((state) => state.contacts);
    const userSkills = useUserStore((state) => state.skills);
    const deleteJob = useUserStore((state) => state.deleteJob);
    const editJob = useUserStore((state) => state.editJob);

    const [modalOpen, setModalOpen] = useState(false);
    const [newJobTitle, setNewJobTitle] = useState(job.jobTitle);
    const [newCompanyName, setNewCompanyName] = useState(job.companyName);
    const [newJobDesc, setNewJobDesc] = useState(job.jobDesc);
    const [newJobLoc, setNewJobLoc] = useState(job.jobLoc);
    const [newDeadline, setNewDeadline] = useState(job.deadline);
    const [newIsInternship, setNewIsInternship] = useState(job.isInternship);
    const [newRelatedSkills, setNewRelatedSkills] = useState(job.skills);
    const [newRelatedContacts, setNewRelatedContacts] = useState(job.contacts);

    const relatedSkills = userSkills
        .filter((skill) => job.skills.includes(skill.id))
        .map((skill) => skill.name);

    const relatedContacts = userContacts
        .filter((contact) => job.contacts.includes(contact.id))
        .map((contact) => contact.name);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleModalClose() {
        setModalOpen(false);
    }

    function handleEdit() {
        setAnchorEl(null);

        setNewJobTitle(job.jobTitle);
        setNewCompanyName(job.companyName);
        setNewJobDesc(job.jobDesc);
        setNewJobLoc(job.jobLoc);
        setNewDeadline(job.deadline);
        setNewIsInternship(job.isInternship);
        setNewRelatedSkills(job.skills);
        setNewRelatedContacts(job.contacts);

        setModalOpen(true);
    }

    function handleDelete() {
        deleteJob(job.id);
        handleClose();
    }

    function handleNewRelatedContacts(event) {
        setNewRelatedContacts(event.target.value);
    }

    function handleNewRelatedSkills(event) {
        setNewRelatedSkills(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const editedJob = {
            id: job.id,
            jobTitle: newJobTitle,
            companyName: newCompanyName,
            jobDesc: newJobDesc,
            jobLoc: newJobLoc,
            deadline: newDeadline,
            isInternship: newIsInternship,
            skills: newRelatedSkills,
            contacts: newRelatedContacts,
        };

        editJob(job.id, editedJob);
        handleModalClose();
    }

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
                    <MenuItem onClick={handleEdit}>Edit</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </Menu>
                <CardContent>
                    <Typography variant="body2" py={1}>
                        Company: {job.companyName}
                    </Typography>
                    <Typography variant="body2" py={1}>
                        Location: {job.jobLoc}
                    </Typography>
                    <Typography variant="body2" py={1}>
                        Description: {job.jobDesc}
                    </Typography>
                    <Typography variant="body2" py={1}>
                        Deadline: {job.deadline}
                    </Typography>
                    <Typography variant="body2" py={1}>
                        Internship: {job.isInternship ? "Yes" : "No"}
                    </Typography>
                    <Typography variant="body2" py={1}>
                        Related Skills:{" "}
                        {relatedSkills ? relatedSkills.join(", ") : "None"}
                    </Typography>
                    <Typography variant="body2" py={1}>
                        Related Contacts:{" "}
                        {relatedContacts ? relatedContacts.join(", ") : "None"}
                    </Typography>
                </CardContent>
            </Card>

            <Modal
                open={modalOpen}
                onClose={handleModalClose}
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
                        Edit Job
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Box textAlign={"center"} mt={3}>
                            <TextField
                                sx={{ width: 300 }}
                                required
                                id="outlined-required"
                                label="Job Title"
                                value={newJobTitle}
                                onChange={(e) => setNewJobTitle(e.target.value)}
                            />
                        </Box>
                        <Box textAlign={"center"} mt={3}>
                            <TextField
                                sx={{ width: 300 }}
                                required
                                id="outlined-required"
                                label="Company Name"
                                value={newCompanyName}
                                onChange={(e) =>
                                    setNewCompanyName(e.target.value)
                                }
                            />
                        </Box>
                        <Box textAlign={"center"} mt={3}>
                            <TextField
                                sx={{ width: 300 }}
                                required
                                id="outlined-required"
                                label="Job Description"
                                value={newJobDesc}
                                onChange={(e) => setNewJobDesc(e.target.value)}
                            />
                        </Box>
                        <Box textAlign={"center"} mt={3}>
                            <TextField
                                sx={{ width: 300 }}
                                required
                                id="outlined-required"
                                label="Job Location"
                                value={newJobLoc}
                                onChange={(e) => setNewJobLoc(e.target.value)}
                            />
                        </Box>
                        <Box textAlign={"center"} mt={3}>
                            <TextField
                                sx={{ width: 300 }}
                                required
                                id="outlined-required"
                                label="Deadline"
                                value={newDeadline}
                                onChange={(e) => setNewDeadline(e.target.value)}
                            />
                        </Box>

                        <Box textAlign={"center"} mt={3}>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Is Internship?"
                                value={newIsInternship}
                                checked={newIsInternship}
                                onChange={(e) =>
                                    setNewIsInternship(e.target.checked)
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
                                    value={newRelatedContacts}
                                    onChange={handleNewRelatedContacts}
                                    input={
                                        <OutlinedInput label="Related Contacts" />
                                    }
                                    MenuProps={MenuProps}
                                >
                                    {userContacts.map((contact, i) => (
                                        <MenuItem key={i} value={contact.id}>
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
                                    value={newRelatedSkills}
                                    onChange={handleNewRelatedSkills}
                                    input={
                                        <OutlinedInput label="Related Skills" />
                                    }
                                    MenuProps={MenuProps}
                                >
                                    {userSkills.map((skill, i) => {
                                        return (
                                            <MenuItem key={i} value={skill.id}>
                                                {skill.name}
                                            </MenuItem>
                                        );
                                    })}
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
                                Save
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={handleModalClose}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </Grid>
    );
}

export default JobCard;
