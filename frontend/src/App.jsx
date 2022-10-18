import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Skills from "./pages/Skills";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/Loading";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
    const { isLoading, isAuthenticated, user } = useAuth0();

    console.log({ isLoading, isAuthenticated, user });

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <NavBar />

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
        </div>
    );
}

export default App;
