# Stage 1: Dependencies (安裝依賴並快取)
FROM node:24-alpine AS deps
# Alpine 需要這個庫來執行某些原生模組
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
# 使用 npm ci 取代 npm install，專為 CI 環境設計，更穩定且快速
RUN npm ci --include=optional

# Stage 2: Builder (建構專案)
FROM node:24-alpine AS builder
WORKDIR /app
# 直接複製已經安裝好的 node_modules，不用重新安裝
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN cp .env.example .env

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 3: Runner (最終執行檔)
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# 建立使用者以提升安全性
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# 關鍵：從 builder 複製 Standalone 產出的檔案
# 這些檔案已經過優化，且包含執行所需的最少 node_modules
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# 調整權限 (僅調整必要目錄，節省時間)
RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]