// Node modules
import { createContext, useContext, useReducer } from "react";

// Project files
import itemsReducer from "./itemsReducer";

// Properties
const SeasonContext = createContext();

export function SeasonProvider({ children }) {
    // State
    const [seasonData, seasonDispatch] = useReducer(itemsReducer, []);
    const [categoryId, idDispatch] = useReducer(itemsReducer, null);

    // Properties
    const value = { seasonData, seasonDispatch, categoryId, idDispatch };

    return <SeasonContext.Provider value={value}>{children}</SeasonContext.Provider>;
}

export function useSeason() {
    const context = useContext(SeasonContext);

    if (!context) throw new Error("useSeason is used inside <SeasonProvider>");

    return context;
}