import { getSettings } from "./actions";
import SettingsClient from "./settings-client";
import ThemePicker from "./theme-picker";
import { resolveSiteTheme } from "@/libs/site-theme";
import type { SettingsResponse } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Settings",
    description: "Admin settings",
};

export default async function SettingsPage() {
    const settings = await getSettings();

    // site_theme 由 ThemePicker 專屬 UI 管理，從通用設定表單中拿掉避免兩處改同一 key
    const siteTheme = resolveSiteTheme(
        Object.values(settings).flat().find(s => s.key === 'site_theme')?.value
    );
    const restSettings: SettingsResponse = Object.fromEntries(
        Object.entries(settings)
            .map(([category, items]) => [category, items.filter(s => s.key !== 'site_theme')] as const)
            .filter(([, items]) => items.length > 0)
    );

    return (
        <div className="w-full max-w-2xl">
            <h1 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">設定</h1>
            <ThemePicker initialTheme={siteTheme} />
            <SettingsClient initialSettings={restSettings} />
        </div>
    );
}
