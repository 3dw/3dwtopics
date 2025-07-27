# 3dw 線上課程平台

這是一個基於 Quasar 框架建立的 3dw 自主學習促進會線上課程平台，參考了 [AT Protocol](https://atproto.com/) 的設計風格，並整合了類似 [onlinecourse.alearn.org.tw](https://onlinecourse.alearn.org.tw/#/) 的功能內容。

## 專案特色

- 🚀 **Quasar 框架**: 基於 Vue.js 的現代化前端框架
- 📱 **跨平台支援**: 一套程式碼，多平台部署（Web、Mobile、Desktop）
- 🎨 **Material Design**: 美觀且一致的使用者介面
- 🌐 **中文介面**: 完全中文化的使用者體驗
- 📚 **學習導向**: 專為線上課程設計的完整功能
- 🔐 **去中心化認證**: 整合 ATProtocol DID 和 Google OAuth

## 功能特色

- **課程管理**: 完整的課程展示和管理系統
- **學習路徑**: 系統化的學習規劃和進度追蹤
- **社群互動**: 學習者交流和分享平台
- **成就系統**: 激勵學習動機的成就機制
- **響應式設計**: 支援各種裝置尺寸的最佳體驗
- **去中心化登入**: 基於 ATProtocol 的 Google OAuth 認證系統

## 技術架構

- **前端框架**: Quasar (Vue.js 3)
- **UI 組件**: Quasar Material Design Components
- **樣式**: SCSS + Quasar Design System
- **語言**: TypeScript
- **建置工具**: Vite
- **認證系統**: ATProtocol + Google OAuth + JWT
- **後端服務**: Cloudflare Workers + KV 存儲

## 快速開始

### 安裝依賴

```bash
npm install
```

### 設置認證系統

1. 複製環境變數文件：
   ```bash
   cp env.example .env
   ```

2. 設置 Google OAuth 憑證（詳見 [ATProtocol 認證說明](./ATPROTO_AUTH_README.md)）

3. 設置 Cloudflare Workers（詳見 [ATProtocol 認證說明](./ATPROTO_AUTH_README.md)）

### 開發模式

```bash
quasar dev
```

### 建置專案

```bash
quasar build
```

### 建置 PWA

```bash
quasar build -m pwa
```

### 建置 Mobile App

```bash
quasar build -m capacitor -T [android|ios]
```

## 專案結構

```
3dwtopics-quasar/
├── src/
│   ├── pages/              # 頁面組件
│   ├── layouts/            # 佈局組件
│   ├── components/         # 共用組件
│   ├── router/             # 路由配置
│   ├── boot/               # 啟動檔案
│   ├── css/                # 樣式檔案
│   ├── assets/             # 靜態資源
│   └── services/           # 認證服務
│       ├── auth.ts         # 認證服務
│       ├── atproto.ts      # ATProtocol 服務
│       ├── google-auth.ts  # Google OAuth 服務
│       └── jwt.ts          # JWT 服務
├── functions/              # Cloudflare Workers
│   └── auth.ts            # 認證 Worker
├── public/                 # 公開資源
├── quasar.config.ts        # Quasar 配置
├── wrangler.toml          # Cloudflare Workers 配置
└── package.json            # 專案配置
```

## 認證系統

本專案整合了基於 ATProtocol 的去中心化認證系統：

### 系統架構

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

### 主要功能

- 🔐 **去中心化身份**: 使用 ATProtocol DID (Decentralized Identifier)
- 🌐 **Google OAuth 整合**: 支援 Google 登入
- 🚀 **Serverless 架構**: 基於 Cloudflare Workers
- 💾 **KV 存儲**: 使用 Cloudflare KV 存儲用戶資料
- 🔑 **JWT 認證**: 安全的令牌認證機制

詳細設置和使用說明請參考：[ATProtocol 認證說明](./ATPROTO_AUTH_README.md)

## API 串接系統

本專案已成功串接後端 API，實現完整的線上課程平台功能：

### 已實現功能

- **用戶管理**: 註冊、登入、用戶資訊管理
- **課程管理**: 課程列表、課程詳情、課程搜尋和篩選
- **認證系統**: Token 驗證、Token 刷新
- **學習進度**: 進度追蹤、進度更新、學習統計

### API 端點

- `POST /api/v1/users/register` - 用戶註冊
- `POST /api/v1/users/login` - 用戶登入
- `GET /api/v1/courses` - 獲取課程列表
- `GET /api/v1/courses/:id` - 獲取單一課程
- `POST /api/v1/auth/verify` - 驗證 Token
- `POST /api/v1/auth/refresh` - 重新整理 Token
- `GET /api/v1/progress` - 獲取學習進度
- `POST /api/v1/progress` - 更新學習進度

### 服務架構

- **API 服務層** (`src/services/api.ts`): HTTP 請求處理
- **用戶服務層** (`src/services/user-service.ts`): 用戶狀態管理
- **課程服務層** (`src/services/course-service.ts`): 課程數據管理
- **進度服務層** (`src/services/progress-service.ts`): 學習進度管理

### 技術特色

- 統一的錯誤處理機制
- 自動 Token 管理
- 響應式數據狀態
- 類型安全的 TypeScript 介面

詳細 API 串接說明請參考：[API 串接說明](./API_INTEGRATION_README.md)

## 設計理念

本專案旨在為 3dw 自主學習促進會建立一個現代化、功能完整的線上課程平台，讓學習者能夠：

1. **輕鬆學習**: 直觀的課程瀏覽和學習介面
2. **系統規劃**: 透過學習路徑系統化地規劃學習目標
3. **社群互動**: 與其他學習者交流分享學習心得
4. **進度追蹤**: 詳細記錄學習進度和成果
5. **多平台支援**: 在任何裝置上都能享受最佳的學習體驗
6. **去中心化身份**: 使用 ATProtocol 保護用戶隱私和數據主權

## 主要頁面

- **首頁**: 平台介紹和熱門課程展示
- **課程目錄**: 完整的課程分類和搜尋
- **學習路徑**: 系統化的學習規劃
- **個人中心**: 學習進度和成就管理
- **社群**: 學習者交流和分享
- **認證頁面**: Google OAuth 登入和 DID 管理

## 開發指南

### 新增頁面

1. 在 `src/pages/` 建立新的 Vue 組件
2. 在 `src/router/routes.ts` 新增路由配置
3. 使用 Quasar 組件建立 UI

### 樣式指南

- 使用 Quasar 的設計系統和組件
- 遵循 Material Design 規範
- 確保響應式設計和無障礙性

### 狀態管理

- 使用 Vue 3 的 Composition API
- 對於複雜狀態考慮使用 Pinia

### 認證開發

- 使用 `src/services/auth.ts` 進行認證操作
- 參考 `src/pages/AuthPage.vue` 的實現方式
- 使用 Cloudflare Workers 處理後端邏輯

## 部署

### Web 部署

```bash
quasar build
```

### PWA 部署

```bash
quasar build -m pwa
```

### Mobile App 部署

```bash
quasar build -m capacitor -T android
quasar build -m capacitor -T ios
```

### Cloudflare Workers 部署

```bash
wrangler deploy
```

## 貢獻指南

歡迎提交 Issue 和 Pull Request 來改善這個專案！

### 開發環境設置

1. 確保已安裝 Node.js 和 npm
2. 安裝 Quasar CLI: `npm install -g @quasar/cli`
3. 安裝 Wrangler CLI: `npm install -g wrangler`
4. 克隆專案並安裝依賴
5. 設置環境變數和認證憑證
6. 執行 `quasar dev` 開始開發

## 授權

© 2024 3dw 自主學習促進會. 保留所有權利.
