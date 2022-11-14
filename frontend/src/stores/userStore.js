import create from "zustand";
import dummyData from "../dummyData.json";

const useUserStore = create((set) => ({
    userData: dummyData,
    userId: dummyData.id,
    userName: dummyData.username,
    jobs: dummyData.jobs,
    skills: dummyData.skills,
    contacts: dummyData.contacts,

    isLoggedIn: false,
    setIsLoggedIn: (newLoggedIn) =>
        set((state) => ({
            isLoggedIn: newLoggedIn,
        })),

    addSkill: (skillName, skillComfort) =>
        set((state) => {
            const newId = Math.floor(Math.random() * Date.now()).toString();
            const newSkill = {
                id: newId,
                name: skillName,
                comfortLevel: skillComfort,
            };

            return { skills: [...state.skills, newSkill] };
        }),

    setSkills: (newSkills) => set((state) => (state.skills = newSkills)),

    deleteSkill: (skillId) =>
        set((state) => ({
            skills: state.skills.filter((skill) => skill.id !== skillId),
        })),

    setContacts: (newContacts) =>
        set((state) => (state.contacts = newContacts)),

    addContact: (newContact) =>
        set((state) => {
            const newId = Math.floor(Math.random() * Date.now()).toString();

            return {
                contacts: [...state.contacts, { ...newContact, id: newId }],
            };
        }),

    deleteContact: (contactId) =>
        set((state) => ({
            contacts: state.contacts.filter(
                (contact) => contact.id !== contactId
            ),
        })),

    setJobs: (newJobs) => set((state) => (state.jobs = newJobs)),

    addJob: (newJob) =>
        set((state) => {
            const newId = Math.floor(Math.random() * Date.now()).toString();

            return {
                jobs: [...state.jobs, { ...newJob, id: newId }],
            };
        }),

    deleteJob: (jobId) =>
        set((state) => ({
            jobs: state.jobs.filter((job) => job.id !== jobId),
        })),
}));

export default useUserStore;
