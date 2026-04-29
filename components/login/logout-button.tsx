"use client";

import { clearSession } from "@/app/login/actions";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
    return (
        <form action={clearSession}>
            <button
                type="submit"
                className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50 dark:text-red-400 dark:border-red-700 dark:hover:bg-red-950"
            >
                <LogOut size={14} />
                登出
            </button>
        </form>
    );
}
