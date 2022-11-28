/*
CODE CITATION
Title: MERN Auth tutorial source code
Author: The Net Ninja
Date: 2022
Type: Adapted from
Source: https://github.com/iamshaunjp/MERN-Auth-Tutorial
*/
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import { useSkillsContext } from "./hooks/useSkillsContext";
import { useContactsContext } from "./hooks/useContactsContext";
import { useJobsContext } from "./hooks/useJobsContext";

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Contact from './pages/Contact'
import Skill from './pages/Skill'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

function App() {
    const { dispatch: skillsDispatch } = useSkillsContext()
    const { dispatch: jobsDispatch } = useJobsContext()
    const { dispatch: contactsDispatch } = useContactsContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchSkills = async () => {
            const response = await fetch('/skills', {
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()
    
            if (response.ok) {
                skillsDispatch({type: 'SET_SKILLS', payload: json})
            }
        }
    
        const fetchJobs = async () => {
            const response = await fetch('/jobs', {
                headers: { 'Authorization': `Bearer ${user.token}` },
            })
            const json = await response.json()
    
            if (response.ok) {
                jobsDispatch({ type: 'SET_JOBS', payload: json })
            }
        }

        const fetchContacts = async () => {
            const response = await fetch('/contacts', {
                headers: { 'Authorization': `Bearer ${user.token}` },
            })
            const json = await response.json()

            if (response.ok) {
                contactsDispatch({ type: 'SET_CONTACTS', payload: json })
            }
        }

        if (user) {
            fetchJobs()
            fetchSkills()
            fetchContacts()
        }

    }, [jobsDispatch, skillsDispatch, contactsDispatch, user])


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <SignUp /> : <Navigate to="/" />}
            />
            <Route
              path="/contacts"
              element={user ? <Contact /> : <Navigate to="/login" />}
            />
            <Route 
              path="/skills" 
              element={user ? <Skill /> : <Navigate to="/login" />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
