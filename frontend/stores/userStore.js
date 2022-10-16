import create from "zustand";
import dummyData from "../dummyData.json";

const useUserStore = create((set) => ({
    userData: dummyData,
    userName: dummyData.username,
    jobs: dummyData.jobs,
    skills: dummyData.skills,
    contacts: dummyData.contacts,
}));

export default useUserStore;
