// 網站風格主題（非 dark/light，那個存 `theme` cookie）
// 色階定義在 app/globals.css 的 :root（forest）與 [data-theme="..."] 區塊
export const SITE_THEMES = ['forest', 'ocean'] as const;
export type SiteTheme = (typeof SITE_THEMES)[number];

export const SITE_THEME_COOKIE = 'site-theme';

export const SITE_THEME_LABELS: Record<SiteTheme, string> = {
    forest: '森林',
    ocean: '海洋',
};

/** Client-only：寫 cookie 並立即套用 data-theme（粒子特效需另外 router.refresh()） */
export function applySiteTheme(theme: SiteTheme) {
    document.cookie = `${SITE_THEME_COOKIE}=${theme}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.setAttribute('data-theme', theme);
}
