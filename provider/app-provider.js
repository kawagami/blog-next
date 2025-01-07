'use client';

import { createContext, useState, useContext } from 'react';

export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [visibleBlogs, setVisibleBlogs] = useState(null);
    const [isDark, setIsDark] = useState(false);
    const [openArray, setOpenArray] = useState([]);
    const [allTags, setAllTags] = useState([]);

    return (
        <AppContext.Provider
            value={{
                visibleBlogs,
                setVisibleBlogs,
                isDark,
                setIsDark,
                openArray,
                setOpenArray,
                allTags,
                setAllTags,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
