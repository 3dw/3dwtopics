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
-  美觀的主題展示頁面
-  響應式設計
-  完全中文化介面
-  學習導向的設計

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
-  完整的課程管理系統
-  學習路徑規劃
-  社群互動功能
-  成就系統
-  跨平台支援 (Web/Mobile/Desktop)

**參考設計**: [AT Protocol](https://atproto.com/) + [onlinecourse.alearn.org.tw](https://onlinecourse.alearn.org.tw/#/)

**快速開始**:
```bash
cd 3dwtopics-quasar
npm install
quasar dev
```


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

