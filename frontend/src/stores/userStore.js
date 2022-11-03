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

    deleteSkill: (skillId) =>
        set((state) => ({
            skills: state.skills.filter((skill) => skill.id !== skillId),
        })),

    deleteContact: (contactId) =>
        set((state) => ({
            contacts: state.contacts.filter(
                (contact) => contact.id !== contactId
            ),
        })),

    deleteJob: (jobId) =>
        set((state) => ({
            jobs: state.jobs.filter((job) => job.id !== jobId),
        })),
}));

export default useUserStore;
