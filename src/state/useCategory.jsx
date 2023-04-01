// Node modules
import { createContext, useContext, useReducer } from "react";

// Project files
import itemsReducer from "./itemsReducer";

// Properties
const DataContext = createContext();

export function DataProvider({ children }) {
    // State
    const [categoryData, dispatch] = useReducer(itemsReducer, []);

    // Properties
    const value = { categoryData, dispatch };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useCategory() {
    const context = useContext(DataContext);

    if (!context) throw new Error("useData is used inside <DataProvider>");

    return context;
}