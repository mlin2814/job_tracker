import React, { useState, useEffect } from "react";
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
    const [sort, setSort] = useState("");
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [comfortLevel, setComfortLevel] = useState(0);
    const [skillItems, setSkillItems] = useState([]);

    const userSkills = useUserStore((state) => state.skills);
    const setSkills = useUserStore((state) => state.setSkills);
    const addSkill = useUserStore((state) => state.addSkill);

    const handleOpen = () => {
        setName("");
        setComfortLevel(0);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const handleChange = (event) => {
        setSort(event.target.value);
    };

    function handleSubmit(event) {
        event.preventDefault();
        addSkill(name, comfortLevel);
        handleClose();
    }

    // Any time sort changes, re-sort based on user's selection from drop-down
    useEffect(() => {
        if (sort === "A-Z") {
            setSkills(
                [...userSkills].sort((a, b) => {
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
            setSkills(
                [...userSkills].sort((a, b) => {
                    if (a.name < b.name) {
                        return 1;
                    }
                    if (a.name > b.name) {
                        return -1;
                    }
                    return 0;
                })
            );
        } else if (sort === "Comfort: Asc") {
            setSkills(
                [...userSkills].sort((a, b) => {
                    return a.comfortLevel - b.comfortLevel;
                })
            );
        } else if (sort === "Comfort: Desc") {
            setSkills(
                [...userSkills].sort((a, b) => {
                    return b.comfortLevel - a.comfortLevel;
                })
            );
        }
    }, [sort]);

    useEffect(() => {
        setSkillItems(
            userSkills.map((skill, i) => <SkillCard skill={skill} key={i} />)
        );
    }, [userSkills]);

    return (
        <Container maxWidth="lg">
            <Grid container my={3} alignItems="center">
                <Grid item xs={5} sm={8}>
                    <Typography variant="h4">Skills</Typography>
                </Grid>
                <Grid item xs={3} sx={{ display: { sm: "none" } }}></Grid>
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
                            onChange={handleChange}
                        >
                            <MenuItem value={"A-Z"}>Name: A-Z</MenuItem>
                            <MenuItem value={"Z-A"}>Name: Z-A</MenuItem>
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
                {skillItems.length ? (
                    skillItems
                ) : (
                    <Typography variant="subtitle1">
                        Click the + button to add a new skill!
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
                        Add a New Skill
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Box textAlign={"center"} mt={3}>
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
                                    valueLabelDisplay="auto"
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
