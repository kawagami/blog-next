import { cookies } from "next/headers";
import { getSettings } from "./actions";
import SettingsClient from "./settings-client";
import ThemePicker from "./theme-picker";
import { SITE_THEMES, type SiteTheme } from "@/libs/site-theme";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Settings",
    description: "Admin settings",
};

export default async function SettingsPage() {
    const [settings, cookieStore] = await Promise.all([getSettings(), cookies()]);
    const raw = cookieStore.get('site-theme')?.value;
    const siteTheme: SiteTheme = SITE_THEMES.includes(raw as SiteTheme) ? (raw as SiteTheme) : 'forest';

    return (
        <div className="w-full max-w-2xl">
            <h1 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">設定</h1>
            <ThemePicker initialTheme={siteTheme} />
            <SettingsClient initialSettings={settings} />
        </div>
    );
}
