import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const ProtectedRoute = ({ component }) => {
    const [open, setOpen] = useState(false);

    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => (
            <Backdrop
                sx={{
                    color: "#fff",
                }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        ),
    });

    return <Component />;
};

export default ProtectedRoute;
