// 網站風格主題（非 dark/light，那個存 `theme` cookie）
// 主題值存後端 settings（key: site_theme），全站訪客生效；色階定義在 app/globals.css
export const SITE_THEMES = ['forest', 'ocean'] as const;
export type SiteTheme = (typeof SITE_THEMES)[number];

export const SITE_THEME_LABELS: Record<SiteTheme, string> = {
    forest: '森林',
    ocean: '海洋',
};

export function resolveSiteTheme(value: string | undefined | null): SiteTheme {
    return SITE_THEMES.includes(value as SiteTheme) ? (value as SiteTheme) : 'forest';
}

/** Client-only：即時套用 data-theme（樂觀更新；持久化走 updateSiteTheme server action） */
export function applySiteThemeAttr(theme: SiteTheme) {
    document.documentElement.setAttribute('data-theme', theme);
}
