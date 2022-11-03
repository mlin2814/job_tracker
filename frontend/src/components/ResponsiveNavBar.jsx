import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles.css";
import logo from "../assets/logo.png";
import LoadingButton from "@mui/lab/LoadingButton";

const pages = [
    { name: "Jobs", link: "/jobs" },
    { name: "Skills", link: "/skills" },
    { name: "Contacts", link: "/contacts" },
];

function ResponsiveNavBar() {
    const { loginWithRedirect, logout, user, isLoading } = useAuth0();

    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // TODO - Cite https://icons8.com/icons/set/job-hunt for logo

    return (
        <AppBar position="sticky" m={0} p={0}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Link to="/">
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                alignItems: "center",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            <img
                                src={logo}
                                style={{
                                    maxHeight: "30px",
                                    width: "auto",
                                    marginRight: "10px",
                                }}
                            />
                            JobTracker
                        </Typography>
                    </Link>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {user &&
                                pages.map((page) => (
                                    <Link to={page.link} key={page.name}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">
                                                {page.name}
                                            </Typography>
                                        </MenuItem>
                                    </Link>
                                ))}
                            {!user && (
                                <Link onClick={() => loginWithRedirect()}>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">
                                            Log in
                                        </Typography>
                                    </MenuItem>
                                </Link>
                            )}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="span"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        <img
                            src={logo}
                            style={{
                                maxHeight: "30px",
                                width: "auto",
                                marginRight: "10px",
                            }}
                        />
                        <Link to="/">JobTracker</Link>
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {user &&
                            pages.map((page) => (
                                <Link to={page.link} key={page.name}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            my: 2,
                                            color: "white",
                                            display: "block",
                                        }}
                                    >
                                        {page.name}
                                    </Button>
                                </Link>
                            ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {isLoading && (
                            <LoadingButton loading={isLoading} variant="text">
                                disabled
                            </LoadingButton>
                        )}
                        {!isLoading && !user && (
                            <Button
                                variant="text"
                                sx={{ color: "white" }}
                                onClick={() => loginWithRedirect()}
                            >
                                Log in
                            </Button>
                        )}
                        {!isLoading && user && (
                            <Button
                                variant="text"
                                sx={{ color: "white" }}
                                onClick={() => logout()}
                            >
                                Log out
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveNavBar;
