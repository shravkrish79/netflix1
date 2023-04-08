// Node modules
import { createContext, useContext, useState, } from "react";
import { readDocuments } from "../scripts/fireStore";
import { useEffect } from "react";

// Properties
const ProfileContext = createContext();


export function ProfileProvider({ children }) {
    // Local state
    const [profileData, setProfileData] = useState([]);
    const [status, setStatus] = useState(0);
    // Properties
    const value = { profileData, setProfileData, status, setStatus };

    useEffect(() => {
        const loadData = async (collectionName) => {
            const data = await readDocuments(collectionName).catch(onFail);
            onSuccess(data);
        }
        setStatus(0);
        loadData('Users');
    }, []);

    function onSuccess(data) {
        setProfileData(data);
        setStatus(1);
    }

    function onFail() {
        setStatus(2);
        console.error();
    }
    return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}


export function useProfile() {
    // Properties
    const context = useContext(ProfileContext);
    // Safeguard
    if (!context) throw new Error("useProfile() must be used within <ProfileProvider>");

    return context;
}