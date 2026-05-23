"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const LOCALE_LABELS: Record<string, string> = {
    'zh-TW': '繁中',
    'zh-CN': '简中',
    'en': 'EN',
};

export default function LocaleSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleChange = (next: string) => {
        router.replace(pathname, { locale: next });
    };

    return (
        <div className="flex items-center gap-1 text-sm">
            {routing.locales.map((l, i) => (
                <span key={l} className="flex items-center gap-1">
                    {i > 0 && <span className="text-gray-400 dark:text-gray-600">|</span>}
                    <button
                        onClick={() => handleChange(l)}
                        className={locale === l
                            ? 'font-bold text-blue-500 dark:text-blue-400'
                            : 'hover:text-blue-400 text-gray-500 dark:text-gray-400'
                        }
                    >
                        {LOCALE_LABELS[l]}
                    </button>
                </span>
            ))}
        </div>
    );
}
