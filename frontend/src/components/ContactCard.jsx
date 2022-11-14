import React, { useState } from "react";
import useUserStore from "../stores/userStore";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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

function ContactCard({ contact }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [newName, setNewName] = useState(contact.name);
    const [newPhoneNumber, setNewPhoneNumber] = useState(contact.phoneNumber);
    const [newEmail, setNewEmail] = useState(contact.email);
    const [newLinkedIn, setNewLinkedIn] = useState(contact.linkedin);

    const deleteContact = useUserStore((state) => state.deleteContact);
    const editContact = useUserStore((state) => state.editContact);

    const open = Boolean(anchorEl);

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

        setNewName(contact.name);
        setNewPhoneNumber(contact.phoneNumber);
        setNewEmail(contact.email);
        setNewLinkedIn(contact.linkedin);

        setModalOpen(true);
    }

    function handleDelete() {
        deleteContact(contact.id);
        handleClose();
    }

    function handleSubmit(event) {
        event.preventDefault();
        const editedContact = {
            id: contact.id,
            name: newName,
            phoneNumber: newPhoneNumber,
            email: newEmail,
            linkedin: newLinkedIn,
        };
        editContact(contact.id, editedContact);
        handleModalClose();
    }

    return (
        <Grid item xs={12} md={6}>
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
                    title={contact.name}
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
                    <Typography variant="body2">
                        Email: {contact.email}
                    </Typography>
                    <Typography variant="body2">
                        Phone Number: {contact.phoneNumber}
                    </Typography>
                    <Typography variant="body2">
                        LinkedIn: {contact.linkedin}
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
                        Edit Contact
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Box textAlign={"center"} mt={3}>
                            <TextField
                                sx={{ width: 300 }}
                                required
                                id="outlined-required"
                                label="Name"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </Box>
                        <Box textAlign={"center"} mt={3}>
                            <TextField
                                sx={{ width: 300 }}
                                required
                                id="outlined-required"
                                label="Email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                type="email"
                            />
                        </Box>
                        <Box textAlign={"center"} mt={3}>
                            <TextField
                                sx={{ width: 300 }}
                                required
                                id="outlined-required"
                                label="Phone Number"
                                value={newPhoneNumber}
                                onChange={(e) =>
                                    setNewPhoneNumber(e.target.value)
                                }
                            />
                        </Box>
                        <Box textAlign={"center"} mt={3}>
                            <TextField
                                sx={{ width: 300 }}
                                required
                                id="outlined-required"
                                label="LinkedIn"
                                value={newLinkedIn}
                                onChange={(e) => setNewLinkedIn(e.target.value)}
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

export default ContactCard;
