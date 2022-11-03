import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import useUserStore from "../stores/userStore.js";

import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function SkillCard({ skill }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const deleteSkill = useUserStore((state) => state.deleteSkill);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleEdit() {
        handleClose();
    }

    function handleDelete() {
        deleteSkill(skill.id);
        handleClose();
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
                    <MenuItem onClick={handleEdit} disabled>
                        Edit
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </Menu>
                <CardContent>
                    <Typography variant="body2">
                        Skill ID: {skill.id}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default SkillCard;