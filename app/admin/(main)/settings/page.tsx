import { getSettings } from "./actions";
import SettingsClient from "./settings-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Settings",
    description: "Admin settings",
};

export default async function SettingsPage() {
    const settings = await getSettings();

    return (
        <div className="w-full max-w-2xl">
            <h1 className="text-xl font-semibold text-stone-900 dark:text-white mb-6">設定</h1>
            <SettingsClient initialSettings={settings} />
        </div>
    );
}
