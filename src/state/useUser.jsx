// Node modules
import { createContext, useContext, useState, } from "react";

// Properties
const Context = createContext();

export function UserProvider({ children, storageKey, adminKey }) {
    // Local state
    const [uid, setUid] = useState(loadStorage(storageKey));
    const [isAdmin, setIsAdmin] = useState(loadStorage(adminKey));
    // Properties
    const value = { uid, setUid, saveUID, isAdmin, setIsAdmin,saveAdmin };

    // Pure
    function loadStorage(storeKey) {
        const data = localStorage.getItem(storeKey);
        // console.log(data);
        return data;
    }

    // Impure
    function saveUID(uid) {
        localStorage.setItem(storageKey, uid);
    }
    function saveAdmin(adminId) {
        localStorage.setItem(adminKey, adminId);
    }

    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useUser() {
    // Properties
    const context = useContext(Context);

    // Safeguard
    if (!context) throw new Error("useUser() must be used within <UserProvider>");

    return context;
}
