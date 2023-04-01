// Node modules
import { createContext, useContext, useReducer, useState } from "react";

// Project files
import itemsReducer from "./itemsReducer";

// Properties
const DataContext = createContext();

export function DataProvider({ children }) {
    // State
    const [categoryData, dispatch] = useReducer(itemsReducer, []);
    const [modal, setModal] = useState(null);
    // Properties
    const value = { categoryData, dispatch, modal, setModal };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useCategory() {
    const context = useContext(DataContext);

    if (!context) throw new Error("useData is used inside <DataProvider>");

    return context;
}