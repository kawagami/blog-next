# SDD: OAuth 登入系統（members）

## 背景

`users` table 為後台管理員專用（email + password + RBAC）。  
前端使用者透過 OAuth 登入，另建 `members` / `member_oauth` 兩張表，完全不動現有 `users` 架構。

---

## 支援 Provider

| Provider | 特殊點 |
|----------|--------|
| Google | userinfo endpoint 提供 email + name + picture |
| GitHub | private email 需額外打 `/user/emails` |
| LINE | 無 email，只有 `displayName` + `userId` |

---

## DB Schema

### members

```sql
CREATE TABLE members (
    id         BIGSERIAL PRIMARY KEY,
    name       TEXT NOT NULL,
    email      TEXT,           -- nullable（LINE 無 email）
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### member_oauth

```sql
CREATE TABLE member_oauth (
    id          BIGSERIAL PRIMARY KEY,
    member_id   BIGINT NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    provider    TEXT NOT NULL,   -- 'google' | 'github' | 'line'
    provider_id TEXT NOT NULL,   -- provider 的 user ID
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (provider, provider_id)
);
```

`find_or_create` 只靠 `(provider, provider_id)` 查找，不用 email 合併。  
同一個人用 Google `personal@gmail.com`、GitHub `work@company.com` 會是兩個獨立 member。  
多 provider 綁定需使用者登入後主動操作（未來功能）。

---

## 部署環境

| | Domain |
|-|--------|
| 後端 | `https://axum.kawa.homes` |
| 前端 | `https://kawa.homes`（Next.js，使用 Server Actions） |

前端用 **Server Action** 與後端溝通：  
- API 呼叫為 server-to-server，瀏覽器不直接打 `axum.kawa.homes`
- CORS 不影響 Server Action（server 端發出的請求）
- Token 由 Server Action 寫入 Next.js **HttpOnly cookie**，瀏覽器 JS 無法讀取
- OAuth provider callback URL 登記為前端 domain

---

## API Routes

```
GET  /auth/{provider}           → 產生 OAuth redirect URL + 存 state，回傳 JSON { url }
POST /auth/{provider}/exchange  → 接收 code + state，換 token，回傳 { access_token, refresh_token }
POST /auth/refresh              → 接收 refresh_token，回傳新 { access_token, refresh_token }
```

`{provider}` = `google` | `github` | `line`

### 完整流程

```
Browser              Next.js Server Action        Axum                  Provider
  │                          │                      │                       │
  ├─ 點「Google 登入」        │                      │                       │
  ├─────────────────────────►│                      │                       │
  │                          ├─ GET /auth/google ──►│                       │
  │                          │◄─ { url, state } ────┤ state 存 Redis 5min   │
  │◄─ redirect(url) ─────────┤                      │                       │
  │                          │                      │                       │
  ├─ redirect 到 Google ─────────────────────────────────────────────────►│
  │◄─ redirect kawa.homes/auth/callback?code=xxx&state=yyy ────────────────┤
  │                          │                      │                       │
  ├─ /auth/callback page ───►│                      │                       │
  │  (code, state from URL)  ├─ POST /auth/google/exchange ────────────────►│ (不到 provider，打 Axum)
  │                          │  body: { code, state }       │               │
  │                          │                      ├─ 驗 state（Redis）    │
  │                          │                      ├─ 換 token ────────────►│
  │                          │                      ├─ 取 user info ─────────►│
  │                          │                      ├─ find-or-create member │
  │                          │◄─ { access_token,    ┤ 簽發 JWT              │
  │                          │    refresh_token }   │ 存 refresh UUID Redis  │
  │                          │                      │                       │
  │                          ├─ cookies().set('access_token', ..., { httpOnly: true, secure: true })
  │                          ├─ cookies().set('refresh_token', ..., { httpOnly: true, secure: true })
  │◄─ redirect('/') ─────────┤                      │                       │
```

Token 存於 Next.js **HttpOnly cookie**，瀏覽器 JS 不可讀。  
後續 API 呼叫：Server Action 從 `cookies()` 取 token，加入 `Authorization: Bearer` header 打 Axum。

### Refresh 流程

```
Browser              Next.js Server Action        Axum
  │                          │                      │
  ├─ 任意操作 ───────────────►│                      │
  │                          ├─ 讀 cookies() 取 access_token
  │                          ├─ 發現 exp 即將到期   │
  │                          ├─ POST /auth/refresh ►│
  │                          │  body: { refresh_token }
  │                          │◄─ { access_token,    ┤ rotate refresh UUID
  │                          │    refresh_token }   │
  │                          ├─ cookies().set() 更新兩個 cookie
  │                          ├─ 繼續原本操作 ───────►│
```

---

## JWT Claims

後台 admin token 與前端 member token 用同一套 `JWT_SECRET`，`role` 為必填欄位。  
現有 admin token（無 `role`）decode 會失敗 → **強制重新登入**（可接受，目前只有一個開發帳號）。

| 欄位 | admin token | member token |
|------|-------------|--------------|
| `sub` | user email | member_id（數字字串） |
| `role` | `"admin"` | `"member"` |
| `exp` | 1h | **1h**（short-lived） |

`Claims` struct 改為：

```rust
pub struct Claims {
    pub iat: usize,
    pub exp: usize,
    pub sub: String,
    pub role: String,   // "admin" | "member"
}
```

Middleware 透過 `role` 欄位分流，`authorize` / `authorize_and_load` 只接受 `role = "admin"`。  
前端 member 路由需新增 `authorize_member` middleware。

### Refresh Token（member only）

OAuth callback 成功時同時發：
- **access token**：JWT，exp = 1h
- **refresh token**：random UUID（`uuid::Uuid::new_v4()`），存 Redis

Redis key 結構：
```
member:refresh:{member_id}  →  {refresh_token_uuid}   TTL 30d
```

新 endpoint：
```
POST /auth/refresh
Body: { "refresh_token": "..." }
```

流程：
1. 拿 `refresh_token` 查 member_id（需 Redis 反查，或 refresh token 本身帶 member_id）
2. 比對 Redis 存的值是否吻合（防 replay）
3. 吻合 → 發新 access token + **rotate** refresh token（舊 UUID 失效，寫新 UUID）
4. 不吻合 → 401，強制重新 OAuth

> Rotation 確保 refresh token 洩漏後，使用過一次即失效。

Redis 反查方式（二選一）：
- **A.** refresh token 本身是帶 `member_id` 的 JWT（用 `JWT_SECRET` 簽）→ decode 得 member_id，再查 Redis 比對 UUID
- **B.** Redis 再存一個反查 key：`member:refresh:token:{uuid}` → `member_id`

建議 **A**，少一個 Redis key，且 refresh token 有簽名防竄改。

### Guest Role

無明確 role 指派的 user → 預設 `guest`（僅基本頁面閱覽權限）。  
新增 `users` 時若未指定 role，自動 assign `guest`。

---

## 前端規格（Next.js App Router）

### Pages / Routes

| Path | 元件類型 | 說明 |
|------|----------|------|
| `/login` | Client Component | Google / GitHub / LINE 登入按鈕 |
| `/auth/callback/[provider]` | Server Component | OAuth callback，自動執行 exchange |

`[provider]` = `google` \| `github` \| `line`，各 provider 登記不同 callback URL。

---

### `/login` 實作

Client Component（需要 `onClick` 操控 `window.location.href`）。

```tsx
// app/login/page.tsx
'use client'

async function handleLogin(provider: string) {
  const res = await fetch(`/api/auth/${provider}`) // Next.js Route Handler
  const { url } = await res.json()
  window.location.href = url  // 外部 redirect 只能用 window，Server Action 無法直接做
}

export default function LoginPage() {
  return (
    <>
      <button onClick={() => handleLogin('google')}>Google 登入</button>
      <button onClick={() => handleLogin('github')}>GitHub 登入</button>
      <button onClick={() => handleLogin('line')}>LINE 登入</button>
    </>
  )
}
```

需新增 **Next.js Route Handler** `app/api/auth/[provider]/route.ts`：

```ts
// app/api/auth/[provider]/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ provider: string }> }
) {
    const { provider } = await params  // Next.js 15: params 為 Promise
    const res = await fetch(`${process.env.API_URL}/auth/${provider}`)

    if (!res.ok) {
        return NextResponse.json({ error: 'failed to get auth url' }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
}
```

---

### `/auth/callback/[provider]` 實作

Server Component，`searchParams` 直接作為 props 傳入，不需要 `useSearchParams` / `Suspense`。

> **Next.js 15**：`params` 與 `searchParams` 型別為 `Promise<{...}>`，需 `await`。

```tsx
// app/auth/callback/[provider]/page.tsx
import { redirect } from 'next/navigation'
import { exchangeOAuthCode } from '@/actions/auth'

export default async function CallbackPage({
    params,
    searchParams,
}: {
    params: Promise<{ provider: string }>
    searchParams: Promise<{ code?: string; state?: string; error?: string }>
}) {
    const { provider } = await params
    const { code, state, error } = await searchParams

    if (error || !code || !state) {
        redirect('/login?error=oauth_denied')
    }

    await exchangeOAuthCode(provider, code, state)
    // exchangeOAuthCode 內部執行 redirect('/')，不會 return
}
```

---

### Server Actions

> **Next.js 15**：`cookies()` 回傳 `Promise`，所有 Server Action 內需 `await cookies()`。  
> **Env var**：專案使用 `API_URL`（非 `AXUM_API_BASE_URL`）。

**`exchangeOAuthCode(provider, code, state)`**
```ts
// actions/auth.ts
'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function exchangeOAuthCode(provider: string, code: string, state: string) {
    const res = await fetch(`${process.env.API_URL}/auth/${provider}/exchange`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, state }),
    })

    if (!res.ok) {
        redirect('/login?error=oauth_failed')
    }

    const { access_token, refresh_token } = await res.json()
    const cookieStore = await cookies()  // Next.js 15: await 必要

    cookieStore.set('access_token', access_token, {
        httpOnly: true, secure: true, sameSite: 'lax', maxAge: 60 * 60,
    })
    cookieStore.set('refresh_token', refresh_token, {
        httpOnly: true, secure: true, sameSite: 'lax', maxAge: 60 * 60 * 24 * 30,
    })

    redirect('/')
}
```

**`callApi(path, options)`**（通用 wrapper，供其他 Server Actions 使用）
```ts
export async function callApi(path: string, options: RequestInit = {}): Promise<Response> {
    const cookieStore = await cookies()
    let accessToken = cookieStore.get('access_token')?.value

    if (!accessToken) {
        redirect('/login')
    }

    const res = await fetch(`${process.env.API_URL}${path}`, {
        ...options,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            ...(options.headers as Record<string, string>),
        },
    })

    if (res.status === 401) {
        const refreshed = await refreshTokens()
        if (!refreshed) redirect('/login')

        accessToken = cookieStore.get('access_token')?.value
        return fetch(`${process.env.API_URL}${path}`, {
            ...options,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                ...(options.headers as Record<string, string>),
            },
        })
    }

    return res
}
```

**`refreshTokens()`**
```ts
export async function refreshTokens(): Promise<boolean> {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refresh_token')?.value
    if (!refreshToken) return false

    const res = await fetch(`${process.env.API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
    })

    if (!res.ok) {
        cookieStore.delete('access_token')
        cookieStore.delete('refresh_token')
        return false
    }

    const { access_token, refresh_token } = await res.json()
    cookieStore.set('access_token', access_token, {
        httpOnly: true, secure: true, sameSite: 'lax', maxAge: 60 * 60,
    })
    cookieStore.set('refresh_token', refresh_token, {
        httpOnly: true, secure: true, sameSite: 'lax', maxAge: 60 * 60 * 24 * 30,
    })
    return true
}
```

**`logout()`**
```ts
export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('access_token')
    cookieStore.delete('refresh_token')
    redirect('/login')
}
```

---

### 路由保護（middleware.js）

> 專案 middleware 為 `.js`（非 `.ts`），與現有 admin 保護合併。  
> Member 路由只驗 `access_token` cookie 存在（不在 Edge runtime 做 JWT verify）。

```js
// middleware.js
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const config = {
    matcher: ['/admin/((?!login).*)', '/dashboard/:path*', '/profile/:path*', '/settings/:path*'],
};

export default async function middleware(req) {
    const cookieStore = await cookies();
    const path = req.nextUrl.pathname;

    if (path.startsWith('/admin')) {
        const value = cookieStore.get("session")?.value;
        const originalUrl = req.nextUrl.pathname + req.nextUrl.search;
        const loginUrl = new URL("/admin/login", req.nextUrl);
        loginUrl.searchParams.set("redirect", originalUrl);

        if (!value) return NextResponse.redirect(loginUrl);

        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            await jwtVerify(value, secret);
        } catch {
            return NextResponse.redirect(loginUrl);
        }

        return NextResponse.next();
    }

    // member routes
    const accessToken = cookieStore.get("access_token")?.value;
    if (!accessToken) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}
```

> 保護哪些路徑依專案實際情況調整。

---

### Cookie 設定

| Cookie | httpOnly | secure | sameSite | maxAge |
|--------|----------|--------|----------|--------|
| `access_token` | ✅ | ✅ | `lax` | 1h |
| `refresh_token` | ✅ | ✅ | `lax` | 30d |

---

### Endpoint Request / Response

**GET /auth/{provider}**
```json
// response 200
{ "url": "https://accounts.google.com/o/oauth2/v2/auth?client_id=...&state=abc123&..." }
```

**POST /auth/{provider}/exchange**
```json
// request
{ "code": "4/0AX...", "state": "abc123" }

// response 200
{ "access_token": "eyJ...", "refresh_token": "eyJ..." }

// response 400 — state 不合法或已過期
{ "error": "invalid_state" }
```

**POST /auth/refresh**
```json
// request
{ "refresh_token": "eyJ..." }

// response 200
{ "access_token": "eyJ...", "refresh_token": "eyJ..." }

// response 401 — refresh token 無效或已用過
{ "error": "invalid_refresh_token" }
```

---

### 前端 Env Vars

```
API_URL=https://axum.kawa.homes   # server-side only，不加 NEXT_PUBLIC_（沿用專案既有變數名）
```

---

## 新增 Env Vars

```
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
LINE_CLIENT_ID
LINE_CLIENT_SECRET
# 各 provider 登記各自的 callback URL（路徑帶 provider 名稱）
GOOGLE_REDIRECT_URL=https://kawa.homes/auth/callback/google
GITHUB_REDIRECT_URL=https://kawa.homes/auth/callback/github
LINE_REDIRECT_URL=https://kawa.homes/auth/callback/line
```

---

## 檔案結構異動

```
src/
├── routes/
│   └── oauth.rs              # GET /auth/{provider} + POST /auth/{provider}/exchange + POST /auth/refresh
├── services/
│   └── oauth.rs              # OAuthProvider enum + 各 provider config + flow
├── repositories/
│   └── members.rs            # find_or_create_by_oauth, get_member_by_id
├── structs/
│   └── members.rs            # Member, MemberOAuth, OAuthUserInfo
migrations/
│   ├── ..._create_members_table.up.sql
│   └── ..._create_member_oauth_table.up.sql
```

現有 `src/middleware/auth.rs` 新增 `authorize_member` fn。  
現有 `src/structs/auth.rs` 的 `Claims` struct 加 `role` 欄位。

---

## Provider Endpoint 對照

| | Google | GitHub | LINE |
|-|--------|--------|------|
| Auth URL | `accounts.google.com/o/oauth2/v2/auth` | `github.com/login/oauth/authorize` | `access.line.me/oauth2/v2.1/authorize` |
| Token URL | `oauth2.googleapis.com/token` | `github.com/login/oauth/access_token` | `api.line.me/oauth2/v2.1/token` |
| User Info URL | `googleapis.com/oauth2/v3/userinfo` | `api.github.com/user` | `api.line.me/v2/profile` |
| email 欄位 | `email` | `email`（可能 null，需打 `/user/emails`） | 無 |
| id 欄位 | `sub` | `id`（數字） | `userId` |

---

## 未決事項

| 項目 | 狀態 | 決定 |
|------|------|------|
| 同 email 不同 provider 合併 | ✅ 決定 | 不合併，各自獨立 member |
| Claims struct 改為必填 `role` 欄位 | ✅ 決定 | option B，強制重新登入，目前只有一個開發帳號 |
| Guest role | ✅ 決定 | 無 role 指派 → 預設 guest，有基本閱覽權限 |
| member JWT refresh | ✅ 決定 | Option B，refresh token = signed JWT + UUID 存 Redis，rotation |
| 前端 callback 接收 JWT 方式 | ✅ 決定 | Server Action 寫入 HttpOnly cookie，瀏覽器 JS 不可讀 |
| 帳號跨 provider 綁定 | ⏳ 待決 | 未來功能，需登入後手動 link |

---

## 工作量估計

| 項目 | 估時 |
|------|------|
| DB migrations（2張表） | 0.5h |
| services/oauth.rs（3 providers） | 3h |
| routes/oauth.rs（3 endpoints） | 1h |
| repositories/members.rs | 0.5h |
| structs + Claims 修改 | 0.5h |
| middleware authorize_member | 0.5h |
| Google/GitHub/LINE Console 設定 | 0.5h |
| 前端（login page + callback page + Server Actions） | 2-3h |
| **合計** | **~8.5-9.5h** |
