<template>
  <div class="layout-container">
    <!-- 左邊欄位選單導航列 -->
    <div class="sidebar" :class="{ 'sidebar-visible': sidebarVisible }">
      <div class="sidebar-header">
        <div class="logo">
          <q-icon name="school" size="24px" color="primary" />
          <span class="logo-text">3dw</span>
        </div>
      </div>
      
      <nav class="sidebar-nav">
        <div class="nav-section">
          <div class="nav-title">自主學習促進會線上課程平台</div>
          <q-list dense>
            <q-item clickable v-ripple class="nav-item" to="/courses">
              <q-item-section avatar>
                <q-icon name="library_books" />
              </q-item-section>
              <q-item-section>課程列表</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/dashboard">
              <q-item-section avatar>
                <q-icon name="dashboard" />
              </q-item-section>
              <q-item-section>學習儀表板</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/auth">
              <q-item-section avatar>
                <q-icon name="account_circle" />
              </q-item-section>
              <q-item-section>登入/註冊</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/" exact>
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>
              <q-item-section>Introduction</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/sdks">
              <q-item-section avatar>
                <q-icon name="school" />
              </q-item-section>
              <q-item-section>SDKs</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/glossary">
              <q-item-section avatar>
                <q-icon name="help" />
              </q-item-section>
              <q-item-section>Glossary</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/faq">
              <q-item-section avatar>
                <q-icon name="question_answer" />
              </q-item-section>
              <q-item-section>FAQ</q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="nav-section">
          <div class="nav-title">Guides</div>
          <q-list dense>
            
            <q-item clickable v-ripple class="nav-item" to="/identity">
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>Identity</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/data-repositories">
              <q-item-section avatar>
                <q-icon name="storage" />
              </q-item-section>
              <q-item-section>Data Repositories</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/schemas-lexicon">
              <q-item-section avatar>
                <q-icon name="schema" />
              </q-item-section>
              <q-item-section>Schemas & Lexicon</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/pds-self-hosting">
              <q-item-section avatar>
                <q-icon name="dns" />
              </q-item-section>
              <q-item-section>PDS Self-Hosting</q-item-section>
            </q-item>
          </q-list>
        </div>
        <!-- <div class="nav-section">
          <div class="nav-title">線上課程平台</div>
          <q-list dense>
            <q-item clickable v-ripple class="nav-item" to="/courses">
              <q-item-section avatar>
                <q-icon name="library_books" />
              </q-item-section>
              <q-item-section>課程列表</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/dashboard">
              <q-item-section avatar>
                <q-icon name="dashboard" />
              </q-item-section>
              <q-item-section>學習儀表板</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/auth">
              <q-item-section avatar>
                <q-icon name="account_circle" />
              </q-item-section>
              <q-item-section>登入/註冊</q-item-section>
            </q-item>
          </q-list>
        </div>

        <div class="nav-section">
          <div class="nav-title">Building apps</div>
          <q-list dense>
            <q-item clickable v-ripple class="nav-item" to="/quickstart">
              <q-item-section avatar>
                <q-icon name="rocket_launch" />
              </q-item-section>
              <q-item-section>Quick start</q-item-section>
            </q-item>
          </q-list>
        </div>

        <div class="nav-section">
          <div class="nav-title">Guides</div>
          <q-list dense>
            <q-item clickable v-ripple class="nav-item" to="/overview">
              <q-item-section avatar>
                <q-icon name="overview" />
              </q-item-section>
              <q-item-section>Overview</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/identity">
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>Identity</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/data-repositories">
              <q-item-section avatar>
                <q-icon name="storage" />
              </q-item-section>
              <q-item-section>Data Repositories</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/schemas-lexicon">
              <q-item-section avatar>
                <q-icon name="schema" />
              </q-item-section>
              <q-item-section>Schemas & Lexicon</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/pds-self-hosting">
              <q-item-section avatar>
                <q-icon name="dns" />
              </q-item-section>
              <q-item-section>PDS Self-Hosting</q-item-section>
            </q-item>
          </q-list>
        </div>

        <div class="nav-section">
          <div class="nav-title">Specs</div>
          <q-list dense>
            <q-item clickable v-ripple class="nav-item" to="/at-protocol">
              <q-item-section avatar>
                <q-icon name="api" />
              </q-item-section>
              <q-item-section>AT Protocol</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/data-model">
              <q-item-section avatar>
                <q-icon name="data_object" />
              </q-item-section>
              <q-item-section>Data Model</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/lexicon">
              <q-item-section avatar>
                <q-icon name="code" />
              </q-item-section>
              <q-item-section>Lexicon</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/cryptography">
              <q-item-section avatar>
                <q-icon name="security" />
              </q-item-section>
              <q-item-section>Cryptography</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/accounts">
              <q-item-section avatar>
                <q-icon name="account_circle" />
              </q-item-section>
              <q-item-section>Accounts</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/repository">
              <q-item-section avatar>
                <q-icon name="folder" />
              </q-item-section>
              <q-item-section>Repository</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/blobs">
              <q-item-section avatar>
                <q-icon name="cloud" />
              </q-item-section>
              <q-item-section>Blobs</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/labels">
              <q-item-section avatar>
                <q-icon name="label" />
              </q-item-section>
              <q-item-section>Labels</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/http-api">
              <q-item-section avatar>
                <q-icon name="http" />
              </q-item-section>
              <q-item-section>HTTP API (XRPC)</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/oauth">
              <q-item-section avatar>
                <q-icon name="vpn_key" />
              </q-item-section>
              <q-item-section>OAuth</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/event-stream">
              <q-item-section avatar>
                <q-icon name="stream" />
              </q-item-section>
              <q-item-section>Event Stream</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/sync">
              <q-item-section avatar>
                <q-icon name="sync" />
              </q-item-section>
              <q-item-section>Sync</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/did">
              <q-item-section avatar>
                <q-icon name="fingerprint" />
              </q-item-section>
              <q-item-section>DID</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/handle">
              <q-item-section avatar>
                <q-icon name="tag" />
              </q-item-section>
              <q-item-section>Handle</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/nsid">
              <q-item-section avatar>
                <q-icon name="code" />
              </q-item-section>
              <q-item-section>NSID</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/tid">
              <q-item-section avatar>
                <q-icon name="schedule" />
              </q-item-section>
              <q-item-section>TID</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/record-key">
              <q-item-section avatar>
                <q-icon name="key" />
              </q-item-section>
              <q-item-section>Record Key</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="nav-item" to="/uri-scheme">
              <q-item-section avatar>
                <q-icon name="link" />
              </q-item-section>
              <q-item-section>URI Scheme</q-item-section>
            </q-item>
          </q-list>
        </div> -->
      </nav>
    </div>

    <!-- 右半邊主要內容區域 -->
    <div class="main-content">
      <!-- 頂部導航欄 -->
      <div class="top-nav">
        <div class="nav-left">
          <q-btn flat icon="menu" @click="toggleSidebar" class="menu-btn" />
        </div>
        <div class="nav-center">
          <q-input 
            v-model="searchText" 
            placeholder="Find something..." 
            dense 
            outlined 
            class="search-input"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div class="nav-right">
          <q-btn flat label="SDKs" />
          <q-btn flat label="Blog" />
          <q-btn flat label="GitHub" />
          <q-btn flat label="English" />
        </div>
      </div>

      <!-- 主要內容 -->
      <div class="content-wrapper">
        <router-view />
      </div>
    </div>

    <!-- 手機版遮罩 -->
    <div v-if="sidebarVisible && $q.screen.lt.md" class="sidebar-overlay" @click="toggleSidebar"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const searchText = ref('')
const sidebarVisible = ref(false)

const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value
}
</script>

<style scoped>
.layout-container {
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
}

/* 左邊欄位選單導航列 */
.sidebar {
  width: 280px;
  background-color: white;
  border-right: 1px solid #e1e5e9;
  padding: 20px 0;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  z-index: 1000;
  transition: transform 0.3s ease;
}

.sidebar-header {
  padding: 0 24px 24px;
  border-bottom: 1px solid #e1e5e9;
  margin-bottom: 24px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-text {
  font-size: 24px;
  font-weight: bold;
  color: #1a1a1a;
}

.sidebar-nav {
  padding: 0 24px;
}

.nav-section {
  margin-bottom: 32px;
}

.nav-title {
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.nav-item {
  margin-bottom: 4px;
  border-radius: 8px;
  padding: 8px 12px;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background-color: #f3f4f6;
}

.nav-item.router-link-active {
  background-color: #e0e7ff;
  color: #3730a3;
}

.nav-item.router-link-active .q-icon {
  color: #3730a3;
}

/* 右半邊主要內容區域 */
.main-content {
  flex: 1;
  margin-left: 280px;
  background-color: white;
  transition: margin-left 0.3s ease;
}

/* 頂部導航欄 */
.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #e1e5e9;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-left, .nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-input {
  width: 300px;
}

.menu-btn {
  display: none;
}

/* 主要內容 */
.content-wrapper {
  padding: 0;
}

/* 手機版遮罩 */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

/* Responsive Design */
@media (max-width: 1023px) {
  .main-content {
    margin-left: 0;
  }
  
  .menu-btn {
    display: block;
  }
  
  .sidebar {
    transform: translateX(-100%);
  }
  
  .sidebar.sidebar-visible {
    transform: translateX(0);
  }
  
  .search-input {
    width: 200px;
  }
  
  .nav-right {
    display: none;
  }
}

@media (max-width: 599px) {
  .search-input {
    width: 150px;
  }
  
  .nav-center {
    flex: 1;
    margin: 0 16px;
  }
}
</style>
