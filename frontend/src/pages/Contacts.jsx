import React, { useState, useEffect } from "react";
import useUserStore from "../stores/userStore";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ContactCard from "../components/ContactCard";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";

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
    const [sort, setSort] = useState("");
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [contactItems, setContactItems] = useState([]);

    const userContacts = useUserStore((state) => state.contacts);
    const setContacts = useUserStore((state) => state.setContacts);
    const addContact = useUserStore((state) => state.addContact);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function handleSort(event) {
        setSort(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        addContact({ name, email, phoneNumber, linkedin });
        handleClose();
    }

    // Any time sort changes, re-sort based on user's selection from drop-down
    useEffect(() => {
        if (sort === "A-Z") {
            setContacts(
                [...userContacts].sort((a, b) => {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                })
            );
        } else if (sort === "Z-A") {
            setContacts(
                [...userContacts].sort((a, b) => {
                    if (a.name < b.name) {
                        return 1;
                    }
                    if (a.name > b.name) {
                        return -1;
                    }
                    return 0;
                })
            );
        }
    }, [sort]);

    useEffect(() => {
        setContactItems(
            userContacts.map((contact, i) => (
                <ContactCard contact={contact} key={i} />
            ))
        );
    }, [userContacts]);

    return (
        <Container maxWidth="lg">
            <Grid container my={3} alignItems="center">
                <Grid item xs={5} sm={8}>
                    <Typography variant="h4">Contacts</Typography>
                </Grid>
                <Grid item xs={3} sx={{ display: { sm: "none" } }}></Grid>
                <Grid item xs={3} sm={3}>
                    <FormControl size="small" fullWidth>
                        <InputLabel id="simple-select-label">Sort</InputLabel>
                        <Select
                            labelId="simple-select-label"
                            id="simple-select"
                            value={sort}
                            label="sort"
                            onChange={handleSort}
                        >
                            <MenuItem value={"A-Z"}>Name: A-Z</MenuItem>
                            <MenuItem value={"Z-A"}>Name: Z-A</MenuItem>
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
