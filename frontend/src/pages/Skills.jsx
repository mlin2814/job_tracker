import React, { useState } from "react";
import useUserStore from "../stores/userStore";
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

function Skills() {
    const userSkills = useUserStore((state) => state.skills);
    console.log({ userSkills });

    const [sort, setSort] = useState("");

    const handleChange = (event) => {
        setSort(event.target.value);
    };

    const skillItems = userSkills.map((skill, i) => (
        <SkillCard skill={skill} key={i} />
    ));

    return (
        <Container maxWidth="lg">
            <Grid container my={3} alignItems="center">
                <Grid item xs={2} sm={5}>
                    <Typography variant="h4">Skills</Typography>
                </Grid>
                <Grid item xs={3} sx={{ display: { sm: "none" } }}></Grid>
                <Grid item xs={3} sm={3} textAlign="right" pr={1}>
                    <Button variant="outlined" startIcon={<FilterAltIcon />}>
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
                    <Fab size="small" color="secondary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                {skillItems}
            </Grid>
        </Container>
    );
}

export default Skills;
