// Node modules
import { createContext, useContext, useReducer, useState } from "react";

// Project files
import itemsReducer from "./itemsReducer";

// Properties
const SeasonContext = createContext();

export function SeasonProvider({ children }) {
    // State
    const [seasonData, dispatch] = useReducer(itemsReducer, []);
    const [modal, setModal] = useState(null);
    // Properties
    const value = { seasonData, dispatch, modal, setModal };

    return <SeasonContext.Provider value={value}>{children}</SeasonContext.Provider>;
}

export function useSeason() {
    const context = useContext(SeasonContext);

    if (!context) throw new Error("useSeason is used inside <SeasonProvider>");

    return context;
}