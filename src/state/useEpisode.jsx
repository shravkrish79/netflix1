// Node modules
import { createContext, useContext, useReducer } from "react";

// Project files
import itemsReducer from "./itemsReducer";

// Properties
const EpisodeContext = createContext();

export function EpisodeProvider({ children }) {
    // State
    const [episodeData, episodeDispatch] = useReducer(itemsReducer, []);

    // Properties
    const value = { episodeData, episodeDispatch  };

    return <EpisodeContext.Provider value={value}>{children}</EpisodeContext.Provider>;
}

export function useEpisode() {
    const context = useContext(EpisodeContext);

    if (!context) throw new Error("useEpisode is used inside <SeasonProvider>");

    return context;
}