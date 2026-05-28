"use client";

import { useState } from "react";
import { updateSetting } from "./actions";
import type { Setting } from "@/types";

export default function SettingsClient({ initialSettings }: { initialSettings: Setting[] }) {
    const [settings, setSettings] = useState<Setting[]>(initialSettings);
    const [drafts, setDrafts] = useState<Record<string, string>>(
        Object.fromEntries(initialSettings.map(s => [s.key, s.value]))
    );
    const [saving, setSaving] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSave = async (key: string) => {
        setSaving(prev => ({ ...prev, [key]: true }));
        setErrors(prev => ({ ...prev, [key]: "" }));
        try {
            const updated = await updateSetting(key, drafts[key]);
            setSettings(prev => prev.map(s => s.key === key ? updated : s));
            setDrafts(prev => ({ ...prev, [key]: updated.value }));
        } catch (err) {
            setErrors(prev => ({ ...prev, [key]: (err as Error).message }));
        } finally {
            setSaving(prev => ({ ...prev, [key]: false }));
        }
    };

    return (
        <div className="space-y-4">
            {settings.map(setting => (
                <div key={setting.key} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {setting.description}
                        <span className="ml-2 text-xs text-gray-400 dark:text-gray-500 font-mono">{setting.key}</span>
                    </label>
                    <div className="flex gap-2 mt-2">
                        <input
                            type="text"
                            value={drafts[setting.key] ?? ""}
                            onChange={e => setDrafts(prev => ({ ...prev, [setting.key]: e.target.value }))}
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder={setting.description}
                        />
                        <button
                            onClick={() => handleSave(setting.key)}
                            disabled={saving[setting.key]}
                            className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg transition-colors"
                        >
                            {saving[setting.key] ? "儲存中..." : "儲存"}
                        </button>
                    </div>
                    {errors[setting.key] && (
                        <p className="mt-1 text-xs text-red-500">{errors[setting.key]}</p>
                    )}
                </div>
            ))}
        </div>
    );
}
