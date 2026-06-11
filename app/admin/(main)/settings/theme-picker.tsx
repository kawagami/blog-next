"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trees, Waves } from "lucide-react";
import { SITE_THEMES, SITE_THEME_LABELS, applySiteTheme, type SiteTheme } from "@/libs/site-theme";

const THEME_ICONS = { forest: Trees, ocean: Waves } as const;

export default function ThemePicker({ initialTheme }: { initialTheme: SiteTheme }) {
    const router = useRouter();
    const [theme, setTheme] = useState<SiteTheme>(initialTheme);

    function applyTheme(next: SiteTheme) {
        setTheme(next);
        applySiteTheme(next);
        // 背景特效粒子由 server 依 cookie 渲染，refresh 讓它跟上
        router.refresh();
    }

    return (
        <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 mb-6">
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                網站風格
                <span className="ml-2 text-xs text-neutral-400 dark:text-neutral-500 font-mono">site-theme cookie</span>
            </p>
            <div className="flex gap-3">
                {SITE_THEMES.map((name) => {
                    const Icon = THEME_ICONS[name];
                    const active = theme === name;
                    return (
                        <button
                            key={name}
                            onClick={() => applyTheme(name)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                                active
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                                    : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-primary-300'
                            }`}
                        >
                            <Icon size={16} />
                            {SITE_THEME_LABELS[name]}
                        </button>
                    );
                })}
            </div>
            <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
                只影響目前瀏覽器（cookie），不是全站設定
            </p>
        </div>
    );
}
