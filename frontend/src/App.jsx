import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Skills from "./pages/Skills";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ResponsiveNavBar from "./components/ResponsiveNavBar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import 'vite/modulepreload-polyfill'

function App() {
    const { isLoading, isAuthenticated, user } = useAuth0();
    const [open, setOpen] = useState(false);

    console.log({ isLoading, isAuthenticated, user });

    useEffect(() => {
        if (isLoading) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [isLoading]);

    return (
        <>
            <ResponsiveNavBar />

            {open && (
                <Backdrop
                    sx={{
                        color: "#fff",
                    }}
                    open={open}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}

            {!isLoading && (
                <Routes>
                    <Route index element={<Home />} />
                    <Route
                        path="jobs"
                        element={<ProtectedRoute component={Jobs} />}
                    />
                    <Route
                        path="skills"
                        element={<ProtectedRoute component={Skills} />}
                    />
                    <Route
                        path="contacts"
                        element={<ProtectedRoute component={Contacts} />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            )}
        </>
    );
}

export default App;
