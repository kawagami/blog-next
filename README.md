# blog-next

個人部落格與工具整合平台，Next.js 16 + React 19，後端對接 Rust Axum API (`axum.kawa.homes`)。

---

## 功能模組

前台路由加 locale prefix（`zh-TW` / `zh-CN` / `en`），`/` 自動 redirect 至 `/{defaultLocale}`。

| 路由 | 說明 |
|------|------|
| `/{locale}` | 首頁，文章列表 |
| `/{locale}/blogs/[id]` | 文章內容（Markdown 渲染） |
| `/{locale}/hackmd-notes` | HackMD 筆記整合，支援標籤篩選 |
| `/{locale}/tools/alarm` | 鬧鐘工具 |
| `/{locale}/tools/hourly-chime` | 整點報時（Web Speech API TTS） |
| `/{locale}/tools/convert-text` | 文字轉換工具 |
| `/{locale}/tools/countdown` | 倒數計時工具 |
| `/{locale}/tools/new-password` | 密碼產生工具 |
| `/{locale}/tools/roster` | 排班功能 |
| `/{locale}/ws` | WebSocket 即時訊息 |
| `/{locale}/dashboard` | 個人儀表板（需登入） |
| `/{locale}/dashboard/notifications` | 通知列表（需登入） |
| `/{locale}/portfolio` | 投資組合追蹤，記錄持股並查看每日漲跌盈虧（需登入） |
| `/{locale}/profile` | 個人資料（需登入） |
| `/{locale}/about` | 關於頁面 |
| `/{locale}/login` | OAuth 登入（Google；GitHub / LINE 規劃中） |
| `/admin/*` | 後台管理（需登入，無 locale prefix）：文章、圖片、股票、會員、角色、使用者、WS、稽核日誌、設定 |

---

## 技術棧

- **框架**：Next.js 16 (App Router, Turbopack)
- **UI**：React 19 + Tailwind CSS + lucide-react
- **i18n**：next-intl v4，支援 zh-TW / zh-CN / en
- **Markdown**：react-markdown
- **圖片**：next/image（自動 WebP 轉換、lazy loading、縮圖），本地儲存（`/uploads/*`）
- **認證**：JWT（`jose`），middleware 保護 `/admin/*` 與 `/{locale}/dashboard|profile|portfolio`
- **後端 API**：`https://axum.kawa.homes`（Rust Axum）
- **WebSocket**：`wss://axum.kawa.homes`
- **部署**：Docker multi-stage build，standalone output

---

## 專案結構

```
app/
  [locale]/   # 前台（zh-TW / zh-CN / en）
  admin/      # 後台（無 locale prefix）
  api/        # Route Handlers
  auth/       # OAuth callback
components/   # 共用 UI 元件
i18n/         # next-intl 設定（routing / request / navigation）
messages/     # 翻譯字串（zh-TW.json / zh-CN.json / en.json）
api/          # 前端 API 請求函式（fetch 封裝，一個資源一檔：blogs / portfolio / images …）
types/        # 後端 API 共用型別
hooks/        # React custom hooks
libs/         # 工具函式庫
public/       # 靜態資源
```

---

## 本地開發

```bash
npm install
npm run dev       # http://localhost:3000
npm run lint      # ESLint（flat config）
```

需設定 `.env.local`：

```env
API_URL=https://axum.kawa.homes
WS_URL=wss://axum.kawa.homes
JWT_SECRET=...
```

---

## Docker 部署

```bash
# 建置
docker build -t blog-next .

# 或用 docker-compose
docker-compose up -d
```

```bash
# 快速腳本
bash app.sh   # 啟動
bash up.sh    # 更新並重啟
```

multi-stage build：
1. **Builder**：安裝依賴、`next build`、裁剪 devDependencies
2. **Final**：Node Alpine 最小映像，non-root user 執行
