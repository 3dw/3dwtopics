# 3dw 自主學習促進會專案

這是一個包含兩個子專案的綜合性學習平台專案，為 3dw 自主學習促進會建立現代化的線上學習體驗。

## 專案結構

```
3dwtopics/
├── 3dwtopics-astro/          # Astro 主題首頁專案
├── 3dwtopics-quasar/         # Quasar 線上課程平台專案
└── README.md                  # 專案說明
```

## 子專案介紹

### 1. 3dwtopics-astro - 主題首頁

**技術棧**: Astro + Semantic UI

**功能特色**:
- 🎨 美觀的主題展示頁面
- 📱 響應式設計
- 🌐 完全中文化介面
- 🎯 學習導向的設計

**參考設計**: [topics.alearn.org.tw](https://topics.alearn.org.tw/)

**快速開始**:
```bash
cd 3dwtopics-astro
npm install
npm run dev
```

### 2. 3dwtopics-quasar - 線上課程平台

**技術棧**: Quasar (Vue.js 3) + TypeScript

**功能特色**:
- 📚 完整的課程管理系統
- 🛤️ 學習路徑規劃
- 👥 社群互動功能
- 🏆 成就系統
- 📱 跨平台支援 (Web/Mobile/Desktop)

**參考設計**: [AT Protocol](https://atproto.com/) + [onlinecourse.alearn.org.tw](https://onlinecourse.alearn.org.tw/#/)

**快速開始**:
```bash
cd 3dwtopics-quasar
npm install
quasar dev
```

## 專案目標

### 學習體驗優化
- 提供直觀易用的學習介面
- 建立系統化的學習路徑
- 激勵學習動機的成就機制

### 社群互動
- 學習者交流分享平台
- 經驗分享和互助學習
- 建立學習社群

### 技術現代化
- 使用最新的前端技術
- 響應式設計支援多裝置
- 快速載入和流暢體驗

## 開發指南

### 環境需求
- Node.js 18+
- npm 或 yarn
- Git

### 開發流程
1. 克隆專案: `git clone [repository-url]`
2. 進入子專案目錄
3. 安裝依賴: `npm install`
4. 啟動開發伺服器
5. 開始開發

### 建置部署
- **Astro 專案**: `npm run build`
- **Quasar 專案**: `quasar build`

## 設計理念

### 使用者中心
- 以學習者需求為核心
- 簡潔直觀的操作流程
- 個人化的學習體驗

### 內容品質
- 豐富多元的學習資源
- 系統化的知識架構
- 實用性的技能培養

### 技術創新
- 現代化的技術架構
- 優秀的效能表現
- 良好的可維護性

## 貢獻指南

歡迎所有形式的貢獻！

### 如何貢獻
1. Fork 專案
2. 建立功能分支
3. 提交變更
4. 發起 Pull Request

### 開發規範
- 遵循各專案的程式碼規範
- 撰寫清晰的提交訊息
- 確保程式碼品質和測試覆蓋率

## 授權

© 2024 3dw 自主學習促進會. 保留所有權利.

## 聯絡資訊

- 網站: [3dw.org.tw](https://3dw.org.tw)
- 信箱: info@3dw.org.tw
- 地址: 台北市信義區
