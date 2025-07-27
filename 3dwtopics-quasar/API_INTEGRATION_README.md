# 3dwtopics-quasar API 串接說明

## 概述

本專案已成功串接後端 API，實現了完整的用戶管理、課程管理、認證系統和學習進度功能。

## API 基礎配置

- **基礎 URL**: `https://3dwonlincourses-backend.alearn13994229.workers.dev`
- **API 版本**: `v1`
- **CORS**: 已設定允許 `https://onlinecourse.alearn.org.tw` 和 `http://localhost:3000`

## 已實現的功能

### 1. 用戶管理

#### 用戶註冊
- **端點**: `POST /api/v1/users/register`
- **功能**: 新用戶註冊
- **實現位置**: `src/services/api.ts` → `ApiService.register()`
- **使用位置**: `src/pages/AuthPage.vue`

#### 用戶登入
- **端點**: `POST /api/v1/users/login`
- **功能**: 用戶登入並獲取 JWT token
- **實現位置**: `src/services/api.ts` → `ApiService.login()`
- **使用位置**: `src/pages/AuthPage.vue`

### 2. 課程管理

#### 獲取課程列表
- **端點**: `GET /api/v1/courses`
- **功能**: 獲取所有可用課程
- **實現位置**: `src/services/api.ts` → `ApiService.getCourses()`
- **使用位置**: `src/pages/CoursesPage.vue`

#### 獲取單一課程
- **端點**: `GET /api/v1/courses/:id`
- **功能**: 獲取特定課程詳情
- **實現位置**: `src/services/api.ts` → `ApiService.getCourse()`
- **使用位置**: `src/pages/CourseDetailPage.vue`

### 3. 認證系統

#### Token 驗證
- **端點**: `POST /api/v1/auth/verify`
- **功能**: 驗證當前 JWT token 的有效性
- **實現位置**: `src/services/api.ts` → `ApiService.verifyToken()`
- **使用位置**: `src/services/user-service.ts`

#### Token 刷新
- **端點**: `POST /api/v1/auth/refresh`
- **功能**: 使用 refresh token 獲取新的 access token
- **實現位置**: `src/services/api.ts` → `ApiService.refreshToken()`
- **使用位置**: `src/services/user-service.ts`

### 4. 學習進度

#### 獲取學習進度
- **端點**: `GET /api/v1/progress`
- **功能**: 獲取用戶所有課程的學習進度
- **實現位置**: `src/services/api.ts` → `ApiService.getProgress()`
- **使用位置**: `src/pages/DashboardPage.vue`

#### 更新學習進度
- **端點**: `POST /api/v1/progress`
- **功能**: 更新特定課程的學習進度
- **實現位置**: `src/services/api.ts` → `ApiService.updateProgress()`
- **使用位置**: `src/pages/CourseDetailPage.vue`

## 服務架構

### 1. API 服務層 (`src/services/api.ts`)
- 負責所有 HTTP 請求
- 處理認證 headers
- 統一錯誤處理
- Token 管理

### 2. 用戶服務層 (`src/services/user-service.ts`)
- 用戶狀態管理
- 登入/登出邏輯
- 認證狀態檢查
- 用戶資訊更新

### 3. 課程服務層 (`src/services/course-service.ts`)
- 課程數據管理
- 課程篩選和搜尋
- 課程統計功能

### 4. 進度服務層 (`src/services/progress-service.ts`)
- 學習進度管理
- 進度統計和分析
- 最近學習課程

## 數據模型

### User 介面
```typescript
interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
  updatedAt: string
}
```

### Course 介面
```typescript
interface Course {
  id: string
  title: string
  description: string
  image?: string
  duration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
  instructor: string
  createdAt: string
  updatedAt: string
}
```

### Progress 介面
```typescript
interface Progress {
  id: string
  userId: string
  courseId: string
  progress: number // 0-100
  completedLessons: string[]
  lastAccessedAt: string
  createdAt: string
  updatedAt: string
}
```

## 使用方式

### 1. 初始化
應用啟動時會自動初始化所有服務：
```typescript
// src/boot/api.ts
await userService.initialize()
await courseService.getCourses()
await progressService.getProgress()
```

### 2. 用戶認證
```typescript
// 登入
const result = await userService.login({
  email: 'user@example.com',
  password: 'password'
})

// 註冊
const result = await userService.register({
  email: 'user@example.com',
  password: 'password',
  name: '用戶名稱'
})
```

### 3. 課程管理
```typescript
// 獲取所有課程
const courses = await courseService.getCourses()

// 搜尋課程
const results = courseService.searchCourses('生態')

// 根據難度篩選
const beginnerCourses = courseService.getCoursesByDifficulty('beginner')
```

### 4. 學習進度
```typescript
// 獲取進度
const progress = await progressService.getProgress()

// 更新進度
await progressService.updateProgress({
  courseId: 'course-id',
  progress: 75,
  completedLessons: ['lesson-1', 'lesson-2']
})
```

## 錯誤處理

所有 API 調用都包含統一的錯誤處理：
- 網路錯誤會顯示用戶友好的錯誤訊息
- Token 過期會自動嘗試刷新
- 認證失敗會自動登出用戶

## 安全性

- JWT token 自動管理
- 敏感資訊不會存儲在 localStorage
- API 請求包含適當的認證 headers
- CORS 已正確配置

## 開發注意事項

1. **環境變數**: 確保 API 基礎 URL 正確配置
2. **CORS**: 開發時可能需要調整 CORS 設定
3. **Token 管理**: 注意 token 的存儲和刷新邏輯
4. **錯誤處理**: 所有 API 調用都應該有適當的錯誤處理

## 未來擴展

1. **離線支援**: 實現課程內容的離線快取
2. **即時通知**: 整合 WebSocket 實現即時通知
3. **檔案上傳**: 支援用戶頭像和課程內容上傳
4. **社交功能**: 實現用戶間的互動和分享功能 