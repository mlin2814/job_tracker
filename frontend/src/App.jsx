import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Skills from "./pages/Skills";
import Contacts from "./pages/Contacts";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { Routes, Route } from "react-router-dom";
import useUserStore from "./stores/userStore";

function App() {
    const userId = useUserStore((state) => state.userId);
    const userName = useUserStore((state) => state.userName);
    console.log({ userId, userName });

    return (
        <div>
            <NavBar />

            <Routes>
                <Route index element={<Home />} />
                <Route path="jobs" element={<Jobs />} />
                <Route path="skills" element={<Skills />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default App;
