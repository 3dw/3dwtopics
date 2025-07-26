# 3dw 線上課程平台

這是一個基於 Quasar 框架建立的 3dw 自主學習促進會線上課程平台，參考了 [AT Protocol](https://atproto.com/) 的設計風格，並整合了類似 [onlinecourse.alearn.org.tw](https://onlinecourse.alearn.org.tw/#/) 的功能內容。

## 專案特色

- 🚀 **Quasar 框架**: 基於 Vue.js 的現代化前端框架
- 📱 **跨平台支援**: 一套程式碼，多平台部署（Web、Mobile、Desktop）
- 🎨 **Material Design**: 美觀且一致的使用者介面
- 🌐 **中文介面**: 完全中文化的使用者體驗
- 📚 **學習導向**: 專為線上課程設計的完整功能

## 功能特色

- **課程管理**: 完整的課程展示和管理系統
- **學習路徑**: 系統化的學習規劃和進度追蹤
- **社群互動**: 學習者交流和分享平台
- **成就系統**: 激勵學習動機的成就機制
- **響應式設計**: 支援各種裝置尺寸的最佳體驗

## 技術架構

- **前端框架**: Quasar (Vue.js 3)
- **UI 組件**: Quasar Material Design Components
- **樣式**: SCSS + Quasar Design System
- **語言**: TypeScript
- **建置工具**: Vite

## 快速開始

### 安裝依賴

```bash
npm install
```

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
│   └── assets/             # 靜態資源
├── public/                 # 公開資源
├── quasar.config.ts        # Quasar 配置
└── package.json            # 專案配置
```

## 設計理念

本專案旨在為 3dw 自主學習促進會建立一個現代化、功能完整的線上課程平台，讓學習者能夠：

1. **輕鬆學習**: 直觀的課程瀏覽和學習介面
2. **系統規劃**: 透過學習路徑系統化地規劃學習目標
3. **社群互動**: 與其他學習者交流分享學習心得
4. **進度追蹤**: 詳細記錄學習進度和成果
5. **多平台支援**: 在任何裝置上都能享受最佳的學習體驗

## 主要頁面

- **首頁**: 平台介紹和熱門課程展示
- **課程目錄**: 完整的課程分類和搜尋
- **學習路徑**: 系統化的學習規劃
- **個人中心**: 學習進度和成就管理
- **社群**: 學習者交流和分享

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

## 貢獻指南

歡迎提交 Issue 和 Pull Request 來改善這個專案！

### 開發環境設置

1. 確保已安裝 Node.js 和 npm
2. 安裝 Quasar CLI: `npm install -g @quasar/cli`
3. 克隆專案並安裝依賴
4. 執行 `quasar dev` 開始開發

## 授權

© 2024 3dw 自主學習促進會. 保留所有權利.
