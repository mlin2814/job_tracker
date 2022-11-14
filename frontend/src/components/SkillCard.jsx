import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import useUserStore from "../stores/userStore.js";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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

function SkillCard({ skill }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [newName, setNewName] = useState(skill.name);
    const [newComfortLevel, setNewComfortLevel] = useState(skill.comfortLevel);

    const deleteSkill = useUserStore((state) => state.deleteSkill);
    const editSkill = useUserStore((state) => state.editSkill);

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

        setNewName(skill.name);
        setNewComfortLevel(skill.comfortLevel);

        setModalOpen(true);
    }

    function handleDelete() {
        deleteSkill(skill.id);
        handleClose();
    }

    function handleSubmit(event) {
        event.preventDefault();
        const editedSkill = {
            id: skill.id,
            comfortLevel: newComfortLevel,
            name: newName,
        };
        editSkill(skill.id, editedSkill);
        handleModalClose();
    }

    return (
        <Grid item xs={12} sm={6} md={4}>
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
                    title={skill.name}
                    subheader={`Comfort Level: ${skill.comfortLevel}/10`}
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
                        Edit Skill
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Box textAlign={"center"} mt={3}>
                            <TextField
                                sx={{ width: 300 }}
                                required
                                id="outlined-required"
                                label="Skill name"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </Box>

                        <Typography
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                            textAlign="center"
                        >
                            Comfort level
                        </Typography>

                        <Box display="flex" justifyContent="center">
                            <Box sx={{ width: 300 }}>
                                <Slider
                                    step={1}
                                    marks
                                    min={0}
                                    max={10}
                                    value={newComfortLevel}
                                    valueLabelDisplay="auto"
                                    onChange={(e) =>
                                        setNewComfortLevel(e.target.value)
                                    }
                                />
                            </Box>
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

export default SkillCard;
