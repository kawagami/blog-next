'use client';

import { createContext, useState, useContext } from 'react';

export const BlogContext = createContext();

export default function BlogProvider({ children }) {
    const [visibleBlogs, setVisibleBlogs] = useState(null);

    return (
        <BlogContext.Provider value={{ visibleBlogs, setVisibleBlogs }}>
            {children}
        </BlogContext.Provider>
    );
}

export function useBlogContext() {
    return useContext(BlogContext);
}
