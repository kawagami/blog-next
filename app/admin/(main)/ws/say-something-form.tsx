"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { saySomethingToSomeone, type SaySomethingResult } from "./actions";

const initialState: SaySomethingResult = { ok: false };

export default function SaySomethingForm() {
    const [state, formAction, isPending] = useActionState(saySomethingToSomeone, initialState);

    return (
        <form action={formAction} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Addr</label>
                <input
                    name="addr"
                    type="text"
                    placeholder="socket addr (e.g. 1.2.3.4:5678)"
                    className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
                    required
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                <input
                    name="message"
                    type="text"
                    placeholder="message content"
                    className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
                    required
                />
            </div>
            <button
                type="submit"
                disabled={isPending}
                className="self-start px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-medium rounded"
            >
                {isPending ? (
                    <span className="flex items-center gap-1"><Loader2 className="w-4 h-4 animate-spin" />Sending…</span>
                ) : "Send"}
            </button>
            {state.message && (
                <p className={`text-sm ${state.ok ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                    {state.message}
                </p>
            )}
        </form>
    );
}
