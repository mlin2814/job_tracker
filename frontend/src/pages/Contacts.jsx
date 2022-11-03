import React, { useState } from "react";
import useUserStore from "../stores/userStore";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { OutlinedInput } from "@mui/material";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ContactCard from "../components/ContactCard";
import MenuItem from "@mui/material/MenuItem";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";

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

function Contacts() {
    const userContacts = useUserStore((state) => state.contacts);
    const userJobs = useUserStore((state) => state.jobs);
    const addContact = useUserStore((state) => state.addContact);

    const [sort, setSort] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [linkedin, setLinkedin] = useState("");
    // const [relatedJobs, setRelatedJobs] = useState([]);

    function handleSort(event) {
        setSort(event.target.value);
    }

    // function handleRelatedJobs(event) {
    //     setRelatedJobs(event.target.value);
    // }

    const contactItems = userContacts.map((contact, i) => (
        <ContactCard contact={contact} key={i} />
    ));

    function handleSubmit(event) {
        event.preventDefault();
        addContact({ name, email, phoneNumber, linkedin });
        handleClose();
    }

    return (
        <Container maxWidth="lg">
            <Grid container my={3} alignItems="center">
                <Grid item xs={2} sm={5}>
                    <Typography variant="h4">Contacts</Typography>
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
                        <InputLabel id="simple-select-label">
                            Sort By
                        </InputLabel>
                        <Select
                            labelId="simple-select-label"
                            id="simple-select"
                            value={sort}
                            label="sort"
                            onChange={handleSort}
                            disabled
                        >
                            <MenuItem value={"Last Name: A-Z"}>
                                Last Name: A-Z
                            </MenuItem>
                            <MenuItem value={"Last Name: Z-A"}>
                                Last Name: Z-A
                            </MenuItem>
                            <MenuItem value={"First Name: A-Z"}>
                                First Name: A-Z
                            </MenuItem>
                            <MenuItem value={"First Name: Z-A"}>
                                First Name: Z-A
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
                {contactItems}
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
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Box>
                        <Box textAlign={"center"} mt={3}>
                            <TextField
                                sx={{ width: 300 }}
                                required
                                id="outlined-required"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                            />
                        </Box>
                        <Box textAlign={"center"} mt={3}>
                            <TextField
                                sx={{ width: 300 }}
                                required
                                id="outlined-required"
                                label="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </Box>
                        <Box textAlign={"center"} mt={3}>
                            <TextField
                                sx={{ width: 300 }}
                                required
                                id="outlined-required"
                                label="LinkedIn"
                                value={linkedin}
                                onChange={(e) => setLinkedin(e.target.value)}
                            />
                        </Box>

                        {/* <Box textAlign={"center"} mt={3}>
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel id="multiple-name-label">
                                    Related Jobs
                                </InputLabel>
                                <Select
                                    labelId="multiple-name-label"
                                    id="multiple-name"
                                    multiple
                                    value={relatedJobs}
                                    onChange={handleRelatedJobs}
                                    input={
                                        <OutlinedInput label="Related Jobs" />
                                    }
                                    MenuProps={MenuProps}
                                >
                                    {userJobs.map((job, i) => (
                                        <MenuItem key={i} value={job}>
                                            {job.jobTitle}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box> */}

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

export default Contacts;
