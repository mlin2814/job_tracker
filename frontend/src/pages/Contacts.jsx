import React, { useState } from "react";
import useUserStore from "../stores/userStore";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ContactCard from "../components/ContactCard";
import MenuItem from "@mui/material/MenuItem";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

import FormControl from "@mui/material/FormControl";

function Contacts() {
    const userContacts = useUserStore((state) => state.contacts);
    console.log({ userContacts });

    const [sort, setSort] = useState("");

    const handleChange = (event) => {
        setSort(event.target.value);
    };

    const contactItems = userContacts.map((contact, i) => (
        <ContactCard contact={contact} key={i} />
    ));

    return (
        <Container maxWidth="lg">
            <Grid container my={3} alignItems="center">
                <Grid item xs={2} sm={5}>
                    <Typography variant="h4">Contacts</Typography>
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
                    <Fab size="small" color="secondary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                {contactItems}
            </Grid>
        </Container>
    );
}

export default Contacts;
