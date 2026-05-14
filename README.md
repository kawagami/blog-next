# blog-next

個人部落格與工具整合平台，Next.js 16 + React 19，後端對接 Rust Axum API (`axum.kawa.homes`)。

---

## 功能模組

| 路由 | 說明 |
|------|------|
| `/` | 首頁，顯示網站資訊 |
| `/blogs/[id]` | 文章內容（Markdown 渲染） |
| `/hackmd-notes` | HackMD 筆記整合，支援標籤篩選 |
| `/tools/alarm` | 鬧鐘工具 |
| `/tools/convert-text` | 文字轉換工具 |
| `/tools/countdown` | 倒數計時工具 |
| `/tools/new-password` | 密碼產生工具 |
| `/tools/roster` | 排班功能 |
| `/ws` | WebSocket 即時訊息 |
| `/dashboard` | 個人儀表板 |
| `/dashboard/notifications` | 通知列表 |
| `/profile` | 個人資料 |
| `/about` | 關於頁面 |
| `/login` | OAuth 登入（Google） |
| `/admin/*` | 後台管理（需登入）：文章、圖片、股票、會員、角色、使用者、WS、稽核日誌 |

---

## 技術棧

- **框架**：Next.js 16 (App Router, Turbopack)
- **UI**：React 19 + Tailwind CSS + lucide-react
- **Markdown**：react-markdown
- **圖片**：plaiceholder + sharp（模糊佔位圖），本地儲存（`/uploads/*`）
- **認證**：JWT (`jsonwebtoken`)，middleware 保護 `/admin/*`
- **後端 API**：`https://axum.kawa.homes`（Rust Axum）
- **WebSocket**：`wss://axum.kawa.homes`
- **部署**：Docker multi-stage build，standalone output

---

## 專案結構

```
app/          # Next.js App Router 頁面
components/   # 共用 UI 元件
api/          # 前端 API 請求函式（fetch 封裝）
hooks/        # React custom hooks
libs/         # 工具函式庫
provider/     # Context providers（zustand store、app-level）
public/       # 靜態資源
```

---

## 本地開發

```bash
npm install
npm run dev       # http://localhost:3000
```

需設定 `.env.local`：

```env
API_URL=https://axum.kawa.homes
NEXT_PUBLIC_WS_URL=wss://axum.kawa.homes
JWT_SECRET=...
JWT_EMAIL=...
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
