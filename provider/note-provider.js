'use client'

import { createContext, useState, useContext } from 'react'

export const NoteContext = createContext()

export default function NoteProvider({ children }) {
    let [openArray, setOpenArray] = useState([]);

    return <NoteContext.Provider value={{ openArray, setOpenArray }}>{children}</NoteContext.Provider>
}

export function useNoteContext() {
    return useContext(NoteContext);
}