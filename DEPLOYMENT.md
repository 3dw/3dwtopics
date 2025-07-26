# 🚀 Cloudflare Pages 部署指南

本專案使用 Wrangler CLI 工具將兩個子專案分別部署到 Cloudflare Pages。

## 📋 前置需求

### 1. 安裝 Wrangler CLI
```bash
npm install -g wrangler
```

### 2. 登入 Cloudflare
```bash
wrangler login
```

## 🔧 專案配置

### Astro 專案 (3dwtopics-astro)

**配置文件**: `3dwtopics-astro/wrangler.toml`
```toml
name = "3dwtopics-astro"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

[site]
bucket = "./dist"
```

**部署命令**:
```bash
cd 3dwtopics-astro
npm run deploy
```

### Quasar 專案 (3dwtopics-quasar)

**配置文件**: `3dwtopics-quasar/wrangler.toml`
```toml
name = "3dwtopics-quasar"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

[site]
bucket = "./dist/spa"
```

**部署命令**:
```bash
cd 3dwtopics-quasar
npm run deploy
```

## 🚀 部署流程

### 手動部署（推薦）

#### Astro 專案
```bash
cd 3dwtopics-astro
npm install
npm run build
npm run deploy
```

#### Quasar 專案
```bash
cd 3dwtopics-quasar
npm install
npm run build
npm run deploy
```

### 自動建置

當您推送程式碼到 GitHub 時，GitHub Actions 會自動：

1. 安裝依賴
2. 建置專案
3. 上傳建置產物（可從 GitHub Actions 下載）

## 📊 部署狀態

部署完成後，您可以在以下位置查看：

- **Astro 專案**: `https://3dwtopics-astro.pages.dev`
- **Quasar 專案**: `https://3dwtopics-quasar.pages.dev`

## 🔍 故障排除

### 常見問題

1. **認證錯誤**
   ```bash
   wrangler login
   ```

2. **建置失敗**
   - 檢查 Node.js 版本 (需要 18+)
   - 確認所有依賴已安裝

3. **部署失敗**
   - 確認已登入 Cloudflare
   - 檢查專案名稱是否正確

### 除錯命令

```bash
# 檢查 Wrangler 狀態
wrangler whoami

# 檢查專案配置
wrangler pages project list

# 查看部署日誌
wrangler pages deployment list --project-name=3dwtopics-astro
```

## 📝 自定義域名

部署完成後，您可以在 Cloudflare Dashboard 中：

1. 進入 Pages 專案
2. 點擊 "Custom domains"
3. 添加您的自定義域名

## 🔄 預覽部署

使用以下命令進行預覽部署：

```bash
# Astro 專案
cd 3dwtopics-astro
npm run deploy:preview

# Quasar 專案
cd 3dwtopics-quasar
npm run deploy:preview
```

## 📚 相關資源

- [Wrangler 文檔](https://developers.cloudflare.com/workers/wrangler/)
- [Cloudflare Pages 文檔](https://developers.cloudflare.com/pages/)
- [GitHub Actions 文檔](https://docs.github.com/en/actions) 