# blog-next

個人部落格與工具整合平台，Next.js 15 + React 19，後端對接 Rust Axum API (`axum.kawa.homes`)。

---

## 功能模組

| 路由 | 說明 |
|------|------|
| `/` | 首頁，顯示網站資訊 |
| `/blogs` / `/blogs/[id]` | 文章列表與內容（Markdown 渲染） |
| `/hackmd-notes` | HackMD 筆記整合，支援標籤篩選 |
| `/images` | Firebase 圖片管理 |
| `/countdown` | 倒數計時工具 |
| `/convert-text` | 文字轉換工具 |
| `/sango-calculate` | 三國志計算工具 |
| `/roster` | 排班功能 |
| `/sites` | 外部站點導覽 |
| `/ws` | WebSocket 即時訊息 |
| `/about` | 關於頁面 |
| `/login` | JWT 登入 |
| `/admin/*` | 後台管理（需登入）：文章、圖片、股票、使用者 |

---

## 技術棧

- **框架**：Next.js 15 (App Router, Turbopack)
- **UI**：React 19 + Tailwind CSS + lucide-react
- **Markdown**：cherry-markdown、react-markdown
- **圖片**：plaiceholder + sharp（模糊佔位圖）、Firebase Storage
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
