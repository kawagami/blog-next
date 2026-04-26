"use client";

import { createContext, useState, useContext } from 'react';

interface AppContextValue {
    visibleBlogs: string | null;
    setVisibleBlogs: React.Dispatch<React.SetStateAction<string | null>>;
    isDark: boolean;
    setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
    openArray: string[];
    setOpenArray: React.Dispatch<React.SetStateAction<string[]>>;
}

export const AppContext = createContext<AppContextValue | null>(null);

export default function AppProvider({ children }: { children: React.ReactNode }) {
    const [visibleBlogs, setVisibleBlogs] = useState<string | null>(null);
    const [isDark, setIsDark] = useState(false);
    const [openArray, setOpenArray] = useState<string[]>([]);

    return (
        <AppContext.Provider
            value={{
                visibleBlogs,
                setVisibleBlogs,
                isDark,
                setIsDark,
                openArray,
                setOpenArray,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext(): AppContextValue {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useAppContext must be used within AppProvider');
    return ctx;
}
