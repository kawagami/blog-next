"use client";

import { usePathname } from 'next/navigation';

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div key={pathname} className="w-full animate-fade-in">
            {children}
        </div>
    );
}
