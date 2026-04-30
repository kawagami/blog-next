"use client";

import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import type { AuthUser } from '@/types';

interface AppContextValue {
    visibleBlogs: string | null;
    setVisibleBlogs: React.Dispatch<React.SetStateAction<string | null>>;
    isDark: boolean;
    setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
    user: AuthUser | null;
    refreshUser: () => Promise<void>;
}

export const AppContext = createContext<AppContextValue | null>(null);

export default function AppProvider({ children, initialIsDark = false }: { children: React.ReactNode; initialIsDark?: boolean }) {
    const [visibleBlogs, setVisibleBlogs] = useState<string | null>(null);
    const [isDark, setIsDark] = useState(initialIsDark);
    const [user, setUser] = useState<AuthUser | null>(null);

    const refreshUser = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setUser(null);
            return;
        }
        try {
            const res = await fetch('/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                setUser(null);
            }
        } catch {
            setUser(null);
        }
    }, []);

    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    return (
        <AppContext.Provider
            value={{
                visibleBlogs,
                setVisibleBlogs,
                isDark,
                setIsDark,
                user,
                refreshUser,
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
