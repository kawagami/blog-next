'use client'

import { createContext, useState, useContext } from 'react'

export const DarkContext = createContext()

export default function DarkProvider({ children }) {
    let [isDark, setIsDark] = useState(false);

    return <DarkContext.Provider value={{ isDark, setIsDark }}>{children}</DarkContext.Provider>
}

export function useDarkContext() {
    return useContext(DarkContext);
}