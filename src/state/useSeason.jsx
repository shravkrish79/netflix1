// Node modules
import { createContext, useContext, useReducer } from "react";

// Project files
import itemsReducer from "./itemsReducer";

// Properties
const SeasonContext = createContext();

export function SeasonProvider({ children, storeKey }) {
    // State
    const [seasonData, seasonDispatch] = useReducer(itemsReducer, []);
    const [categoryId, categoryDispatch] = useReducer(itemsReducer, null);

    // Pure
    function getCategory(cid) {
        const data = localStorage.getItem(cid);
        return data;
    }

    // Impure
    function saveCID(cid) {
        localStorage.setItem(storeKey, cid);
    }
    // Properties
    const value = { seasonData, seasonDispatch, categoryId, categoryDispatch, saveCID, getCategory };

    return <SeasonContext.Provider value={value}>{children}</SeasonContext.Provider>;
}

export function useSeason() {
    const context = useContext(SeasonContext);

    if (!context) throw new Error("useSeason is used inside <SeasonProvider>");

    return context;
}