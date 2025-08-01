# 3dw 線上課程平台

這是一個基於 Quasar Framework 和 Vue.js 3 建構的完整線上課程平台，參考 [LearnDash](https://www.learndash.com/) 的功能設計。

## 🚀 功能特色

### 用戶管理系統
- **註冊/登入功能**: 完整的用戶認證系統
- **個人資料管理**: 用戶資訊和學習偏好設定
- **學習進度追蹤**: 自動記錄學習進度和成就

### 課程管理系統
- **課程列表展示**: 分類篩選、搜尋功能
- **課程詳情頁面**: 完整的課程資訊、評價、講師介紹
- **課程購買/訂購**: 安全的支付流程和訂單管理

### 學習介面
- **課程內容瀏覽**: 結構化的學習路徑
- **影片播放器**: 高品質影片播放體驗
- **學習進度追蹤**: 即時進度顯示和完成標記
- **學習筆記**: 個人筆記功能
- **資源下載**: 課程相關檔案下載

## 📁 專案結構

```
src/
├── pages/
│   ├── AuthPage.vue          # 用戶認證頁面
│   ├── CoursesPage.vue       # 課程列表頁面
│   ├── CourseDetailPage.vue  # 課程詳情頁面
│   ├── DashboardPage.vue     # 學習儀表板
│   └── LearnPage.vue         # 學習介面
├── layouts/
│   └── MainLayout.vue        # 主布局（已更新導航）
└── router/
    └── routes.ts             # 路由配置（已添加新路由）
```

## 🎯 頁面功能說明

### 1. 認證頁面 (`/auth`)
- 用戶註冊和登入功能
- 表單驗證和錯誤處理
- 響應式設計，支援手機和桌面

### 2. 課程列表頁面 (`/courses`)
- 課程卡片展示
- 分類和難度篩選
- 搜尋功能
- 課程購買流程

### 3. 課程詳情頁面 (`/course/:id`)
- 完整的課程資訊展示
- 課程大綱和講師介紹
- 學員評價系統
- 購買選項和價格顯示

### 4. 學習儀表板 (`/dashboard`)
- 個人學習統計
- 繼續學習推薦
- 學習成就系統
- 推薦課程

### 5. 學習介面 (`/learn/:id`)
- 左側課程導航
- 影片播放器
- 學習進度追蹤
- 筆記和資源下載

## 🛠 技術架構

### 前端技術
- **Vue.js 3**: 使用 Composition API
- **Quasar Framework**: UI 組件庫
- **TypeScript**: 類型安全
- **Vue Router**: 路由管理

### 設計特色
- **響應式設計**: 支援各種螢幕尺寸
- **現代化 UI**: 使用 Quasar 組件
- **用戶體驗**: 直觀的導航和互動
- **效能優化**: 懶加載和組件化

## 🎨 設計參考

### LearnDash 功能參考
- 課程管理系統
- 學習進度追蹤
- 用戶認證流程
- 購買和支付系統

### 附圖設計參考
- 課程學習介面的左側導航
- 學習進度顯示
- 影片播放器設計
- 課程內容結構

## 🚀 快速開始

1. **安裝依賴**
   ```bash
   npm install
   ```

2. **啟動開發伺服器**
   ```bash
   npm run dev
   ```

3. **訪問頁面**
   - 首頁: `http://localhost:9000/`
   - 課程列表: `http://localhost:9000/courses`
   - 學習儀表板: `http://localhost:9000/dashboard`
   - 認證頁面: `http://localhost:9000/auth`

## 📱 響應式設計

所有頁面都支援響應式設計：
- **桌面版**: 完整功能展示
- **平板版**: 適配中等螢幕
- **手機版**: 優化的移動體驗

## 🔧 自定義配置

### 主題色彩
可以在 `src/css/app.scss` 中自定義主題色彩：
```scss
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #4caf50;
  --warning-color: #ff9800;
  --error-color: #f44336;
}
```

### 路由配置
在 `src/router/routes.ts` 中可以添加新的路由：
```typescript
{ path: 'new-page', component: () => import('pages/NewPage.vue') }
```

## 📈 未來擴展

### 計劃功能
- [ ] 支付系統整合
- [ ] 用戶評價系統
- [ ] 學習社群功能
- [ ] 證書頒發系統
- [ ] 多語言支援

### 技術優化
- [ ] PWA 支援
- [ ] 離線學習功能
- [ ] 效能優化
- [ ] SEO 優化

## 🤝 貢獻指南

1. Fork 專案
2. 創建功能分支
3. 提交變更
4. 發起 Pull Request

## 📄 授權

本專案採用 MIT 授權條款。

---

**3dw 自主學習促進會** - 致力於推廣自主學習理念，提供優質的線上學習平台。 