// Node modules
import { createContext, useContext, useReducer, useState } from "react";

// Project files
import itemsReducer from "./itemsReducer";

// Properties
const CategoryContext = createContext();

export function CategoryProvider({ children }) {
    // State
    const [categoryData, dispatch] = useReducer(itemsReducer, []);
    const [modal, setModal] = useState(null);
    // Properties
    const value = { categoryData, dispatch, modal, setModal };

    return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
}

export function useCategory() {
    const context = useContext(CategoryContext);

    if (!context) throw new Error("useCategory is used inside <CategoryProvider>");

    return context;
}