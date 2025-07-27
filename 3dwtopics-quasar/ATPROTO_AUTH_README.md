# ATProtocol 去中心化 Google 登入系統

這個專案實現了一個基於 ATProtocol 的去中心化 Google 登入系統，整合了 Cloudflare Workers、KV 存儲和 JWT 認證。

## 功能特點

- 🔐 **去中心化身份**: 使用 ATProtocol DID (Decentralized Identifier)
- 🌐 **Google OAuth 整合**: 支援 Google 登入
- 🚀 **Serverless 架構**: 基於 Cloudflare Workers
- 💾 **KV 存儲**: 使用 Cloudflare KV 存儲用戶資料
- 🔑 **JWT 認證**: 安全的令牌認證機制

## 系統架構

```
[ 使用者點擊 Google 登入 ]
            ↓
[ Cloudflare Worker ]
  - 向 Google OAuth 交換 token
  - 取得使用者 email, name, picture 等資訊
            ↓
  ✅ 檢查是否已有綁定的 atproto DID
       - 若無 → 幫他自動建立 1 個 atproto DID
       - 若有 → 將 Google identity 綁定到現有 DID
            ↓
[ 回傳登入成功，並下發 token (如 JWT) ]
```

## 設置步驟

### 1. Google OAuth 設置

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 創建新專案或選擇現有專案
3. 啟用 Google+ API
4. 創建 OAuth 2.0 憑證
5. 設置授權重定向 URI:
   - 開發環境: `http://localhost:9000/auth/google/callback`
   - 生產環境: `https://your-domain.com/api/auth/google/callback`

### 2. Cloudflare 設置

1. 安裝 Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```

2. 登入 Cloudflare:
   ```bash
   wrangler login
   ```

3. 創建 KV 命名空間:
   ```bash
   wrangler kv:namespace create "USERS_KV"
   wrangler kv:namespace create "USERS_KV" --preview
   ```

4. 更新 `wrangler.toml` 中的 KV 命名空間 ID

### 3. 環境變數設置

複製 `env.example` 到 `.env` 並填入實際值:

```bash
cp env.example .env
```

編輯 `.env` 文件:

```env
# Google OAuth 配置
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:9000/auth/google/callback

# JWT 配置
JWT_SECRET=your-super-secret-jwt-key

# Cloudflare KV 配置
KV_NAMESPACE_ID=your-kv-namespace-id
KV_PREVIEW_NAMESPACE_ID=your-preview-kv-namespace-id
```

### 4. 安裝依賴

```bash
npm install
```

### 5. 開發環境運行

```bash
# 啟動開發服務器
npm run dev

# 在另一個終端運行 Cloudflare Workers
wrangler dev
```

### 6. 部署到生產環境

```bash
# 構建前端
npm run build

# 部署到 Cloudflare Pages
npm run deploy
```

## API 端點

### POST /api/auth/google/callback
處理 Google OAuth 回調

**請求參數:**
- `code`: Google 授權碼

**響應:**
```json
{
  "success": true,
  "user": {
    "did": "did:plc:...",
    "email": "user@example.com",
    "displayName": "User Name",
    "picture": "https://..."
  },
  "token": "jwt-token"
}
```

### GET /api/auth/verify
驗證 JWT token

**請求頭:**
- `Authorization: Bearer <token>`

**響應:**
```json
{
  "success": true,
  "user": {
    "did": "did:plc:...",
    "email": "user@example.com",
    "displayName": "User Name",
    "picture": "https://..."
  }
}
```

## 前端使用

### 1. 導入認證服務

```typescript
import { authService } from '@/services/auth'
```

### 2. 開始 Google 登入

```typescript
const handleGoogleLogin = () => {
  const authUrl = authService.startGoogleOAuth()
  window.location.href = authUrl
}
```

### 3. 處理 OAuth 回調

```typescript
// 在 AuthPage.vue 中
onMounted(async () => {
  const code = route.query.code as string
  if (code) {
    const result = await authService.handleGoogleOAuthCallback(code)
    authService.storeToken(result.token)
    // 跳轉到儀表板
  }
})
```

### 4. 檢查認證狀態

```typescript
const checkAuth = async () => {
  const user = await authService.checkAuth()
  if (user) {
    // 用戶已登入
    console.log('用戶:', user)
  } else {
    // 用戶未登入，跳轉到登入頁面
    router.push('/auth')
  }
}
```

### 5. 登出

```typescript
const logout = () => {
  authService.logout()
  router.push('/auth')
}
```

## 技術架構

### 前端 (Quasar + Vue 3)
- **認證頁面**: `src/pages/AuthPage.vue`
- **認證服務**: `src/services/auth.ts`
- **ATProtocol 服務**: `src/services/atproto.ts`
- **Google OAuth 服務**: `src/services/google-auth.ts`
- **JWT 服務**: `src/services/jwt.ts`

### 後端 (Cloudflare Workers)
- **認證 Worker**: `functions/auth.ts`
- **KV 存儲**: 用戶資料和 DID 映射
- **環境變數**: OAuth 憑證和 JWT 密鑰

## 安全考慮

1. **JWT 密鑰**: 使用強密鑰並定期輪換
2. **HTTPS**: 生產環境必須使用 HTTPS
3. **CORS**: 正確配置跨域請求
4. **Token 過期**: JWT token 24 小時過期
5. **輸入驗證**: 驗證所有用戶輸入

## 故障排除

### 常見問題

1. **Google OAuth 錯誤**
   - 檢查重定向 URI 是否正確
   - 確認 OAuth 憑證是否有效

2. **KV 存儲錯誤**
   - 檢查 KV 命名空間 ID 是否正確
   - 確認 Wrangler 登入狀態

3. **JWT 驗證失敗**
   - 檢查 JWT_SECRET 是否一致
   - 確認 token 是否過期

### 調試技巧

1. 查看 Cloudflare Workers 日誌:
   ```bash
   wrangler tail
   ```

2. 檢查 KV 存儲:
   ```bash
   wrangler kv:key list --binding=USERS_KV
   ```

3. 測試 API 端點:
   ```bash
   curl -X POST "https://your-domain.com/api/auth/verify" \
     -H "Authorization: Bearer your-token"
   ```

## 貢獻

歡迎提交 Issue 和 Pull Request！

## 授權

MIT License 