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
}));

export default useUserStore;
