# 網站主題（風格）系統

> 主題已是 **runtime 切換 + 全站設定**：色階走 CSS variables，主題值存後端 settings（key `site_theme`），root layout 讀取後設 `<html data-theme>`，不用重 build。
> 現有主題：**forest**（預設，moss green + stone 暖灰）、**ocean**（sky blue + slate 冷灰）、**sky**（true blue + slate 冷灰）。

---

## 架構總覽

| 層 | 位置 | 說明 |
|----|------|------|
| Token 定義 | `tailwind.config.js` | `primary` / `neutral` 各 11 階，值為 `rgb(var(--primary-N) / <alpha-value>)` |
| 色階實際值 | `app/globals.css` | `:root` = forest；`[data-theme="ocean"]` = ocean。RGB 三元組格式（`82 183 136`） |
| 主題清單/常數 | `libs/site-theme.ts` | `SITE_THEMES`、label、`resolveSiteTheme()`、`applySiteThemeAttr()`（client 樂觀更新 attr） |
| 主題值存放 | 後端 settings 表（key `site_theme`） | `GET /settings/public`（無認證白名單）讀、`PATCH /admin/settings/site_theme` 寫（驗證 forest/ocean/sky，非法 422） |
| 切換入口 | `app/admin/(main)/settings/theme-picker.tsx` | admin settings 頁選擇器 → `updateSiteTheme` action（PATCH + `revalidatePath('/', 'layout')`），**全站訪客生效** |
| 套用點 | `app/layout.tsx` | `getPublicSettings()`（`api/settings.ts`，60s cache、後端掛掉 fallback forest）→ `<html data-theme>`，並把 theme 傳給背景特效 |
| 背景特效 | `components/ThemeBackground.tsx` | forest=落葉飄下、ocean=氣泡上浮、sky=雲朵橫飄；色全走 `rgb(var(--primary-N) / alpha)`，新主題未指定粒子時 fallback 落葉 |
| Logo | `components/kawa-logo.tsx` | inline SVG，stroke/fill 走 var，自動跟主題 |
| Favicon | `app/icon.svg` | **固定 forest 色**（favicon 是獨立請求吃不到 CSS var，不跟主題） |
| 語意色 | `libs/badge-styles.ts` 等 | 與主題無關，永遠不動（見注意事項） |

元件規則：**只用 `primary-*` / `neutral-*`，不用 `gray` / `stone` / `slate` / `blue` 等具體色名**——具體色名不會跟主題變。

---

## 新增一套主題（如 desert）

1. **`libs/site-theme.ts`**：`SITE_THEMES` 加 `'desert'`、`SITE_THEME_LABELS` 加 label、theme-picker 的 `THEME_ICONS` 加 icon
   - **後端同步**：`site_theme` 驗證表（services/app_settings.rs 的 match arm）也要加新值，否則 PATCH 回 422
2. **`app/globals.css`**：加一段 `[data-theme="desert"] { ... }`，22 個 var（11 階 primary + 11 階 neutral），格式是 RGB 三元組：
   ```css
   [data-theme="desert"] {
     --primary-500: 217 119 6;   /* #d97706 */
     ...
   }
   ```
   - 可直接抄 [Tailwind 內建色階](https://tailwindcss.com/docs/customizing-colors)（hex 轉 RGB 三元組）
   - neutral 選擇：暖主題配 stone、冷主題配 slate、中性配 zinc
3. **（可選）`components/ThemeBackground.tsx`**：加該主題的粒子變體（不加就 fallback 落葉）。保留三件事：`prefers-reduced-motion` 關閉、只動 `transform`/`opacity`、`pointer-events: none` + `aria-hidden`
4. **驗證**（見下方檢核表）

色階用途對照（挑色時重點驗這幾階）：

| 階 | 主要用途 | 對比要求 |
|----|---------|---------|
| 50 | 亮色 body 漸層起點 | 接近白、帶主色調 |
| 100–200 | tag chip 底、badge 底 | — |
| 300–400 | dark mode 文字/icon accent、focus ring | 在 `neutral-900` 上可讀 |
| 500 | spinner、icon、按鈕底 | — |
| 600–700 | 按鈕底、亮色模式連結文字 | 700 配白底 ≥ 4.5:1 |
| 950 | dark body 漸層起點 | 接近黑、帶主色調 |

---

## 注意事項

1. **語意色永遠不跟主題**：紅=錯誤、badge-styles 的 method/level 色、**股票紅漲綠跌**（台股慣例，任何主題都不反轉）
2. **`prose-stone` 例外**：typography plugin 色票是 build 時烤死的，跟不了 var。目前 markdown 內文固定 stone 暖灰，各主題下視覺差異極小，接受
3. **favicon 不跟主題**（獨立請求吃不到 page CSS）。要跟的話得做 `/icon?theme=` 動態路由，不值得
4. **dark mode 與主題正交**：dark/light 存 `theme` cookie（class `dark`），風格存 `site-theme` cookie（attr `data-theme`），互不干擾。新主題的 var 同一套值同時服務亮暗——亮暗差異由元件的 `dark:` class 選不同階實現
5. **全站設定的傳播延遲**：`getPublicSettings()` 有 60s cache；admin 自己經 `revalidatePath` 立即生效，其他訪客最多延遲 60 秒。後端 `/settings/public` 讀記憶體 map（settings 整表駐留 `Arc<RwLock<HashMap>>`），無 DB 往返
6. 禁止回加全域 transition；hover scale 只給塊級（上限 105）

---

## 改完檢核表

```bash
npm run lint && npx tsc --noEmit && npm run build
# dev 起來後驗證 SSR 的 data-theme（值來自後端 /settings/public）：
curl -s http://localhost:3000/zh-TW | grep -o 'data-theme="[a-z]*"'
# 在 admin settings 切主題後再 curl 一次，應變新值
```

瀏覽器走一輪：首頁、blogs、admin 表格頁、portfolio，各看亮/暗 × 每套主題；對比抽查用 [WebAIM](https://webaim.org/resources/contrastchecker/)。

---

## 演進史

| 階段 | commit | 內容 |
|------|--------|------|
| Build-time token 建立 | `da8182b` | 彩虹→森林，92 檔收斂到 primary/stone |
| 特效 | `514e4ff` | 氣泡→落葉 |
| Logo | `c342ccf` | Kawa 字標 + favicon |
| Runtime 主題系統 | `3f84f58` | token var 化、stone→neutral、data-theme 切換、ocean 主題、admin picker |
