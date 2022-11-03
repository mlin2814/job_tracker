import React, { useState } from "react";
import useUserStore from "../stores/userStore";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import SkillCard from "../components/SkillCard";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";

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

function Skills() {
    const userSkills = useUserStore((state) => state.skills);
    const addSkill = useUserStore((state) => state.addSkill);

    const [sort, setSort] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [name, setName] = useState("");
    const [comfortLevel, setComfortLevel] = useState(0);

    const handleChange = (event) => {
        setSort(event.target.value);
    };

    const skillItems = userSkills.map((skill, i) => (
        <SkillCard skill={skill} key={i} />
    ));

    function handleSubmit(event) {
        event.preventDefault();
        addSkill(name, comfortLevel);
        handleClose();
    }

    return (
        <Container maxWidth="lg">
            <Grid container my={3} alignItems="center">
                <Grid item xs={2} sm={5}>
                    <Typography variant="h4">Skills</Typography>
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
                            <MenuItem value={"A-Z"}>A-Z</MenuItem>
                            <MenuItem value={"Z-A"}>Z-A</MenuItem>
                            <MenuItem value={"Comfort: Asc"}>
                                Comfort: Asc
                            </MenuItem>
                            <MenuItem value={"Comfort: Desc"}>
                                Comfort: Desc
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
                {skillItems}
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
                        Add a New Skill
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Box display="flex" justifyContent="center" mt={3}>
                            <TextField
                                sx={{ width: 300 }}
                                required
                                id="outlined-required"
                                label="Skill name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                                    value={comfortLevel}
                                    onChange={(e) =>
                                        setComfortLevel(e.target.value)
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

export default Skills;
