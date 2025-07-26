<template>
  <q-page class="bg-grey-1">
    <!-- 導航欄 -->
    <q-header elevated class="bg-white text-dark">
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold">
          <q-icon name="school" class="q-mr-sm" />
          3dw 線上課程平台
        </q-toolbar-title>
        <q-space />
        <q-btn flat label="首頁" />
        <q-btn flat label="課程" />
        <q-btn flat label="學習路徑" />
        <q-btn flat label="社群" />
        <q-btn flat label="關於" />
        <q-btn color="primary" label="登入" />
      </q-toolbar>
    </q-header>

    <!-- 主要橫幅 -->
    <div class="hero-section">
      <div class="container">
        <div class="row items-center q-pa-xl">
          <div class="col-12 col-md-6">
            <h1 class="text-h2 text-weight-bold text-white q-mb-md">
              歡迎來到quasar 3dw 線上課程平台
            </h1>
            <p class="text-h6 text-white-7 q-mb-lg">
              探索自主學習的無限可能，透過我們的線上課程平台，建立你的學習旅程
            </p>
            <div class="row q-gutter-md">
              <q-btn size="lg" color="white" text-color="primary" label="開始探索" />
              <q-btn size="lg" outline color="white" label="了解更多" />
            </div>
          </div>
          <div class="col-12 col-md-6 text-center">
            <q-icon name="lightbulb" size="200px" color="white" class="opacity-50" />
          </div>
        </div>
      </div>
    </div>

    <!-- 特色功能 -->
    <div class="container q-pa-xl">
      <div class="text-center q-mb-xl">
        <h2 class="text-h3 text-weight-bold q-mb-md">平台特色</h2>
        <p class="text-h6 text-grey-7">專為自主學習者設計的完整學習體驗</p>
      </div>
      
      <div class="row q-gutter-lg">
        <div class="col-12 col-md-3">
          <q-card class="text-center q-pa-lg">
            <q-icon name="people" size="60px" color="primary" class="q-mb-md" />
            <h3 class="text-h6 q-mb-sm">社群學習</h3>
            <p class="text-grey-7">與志同道合的學習者交流，分享學習心得和經驗</p>
          </q-card>
        </div>
        <div class="col-12 col-md-3">
          <q-card class="text-center q-pa-lg">
            <q-icon name="book" size="60px" color="secondary" class="q-mb-md" />
            <h3 class="text-h6 q-mb-sm">豐富資源</h3>
            <p class="text-grey-7">提供多元化的學習資源，包含影片、文件、實作練習</p>
          </q-card>
        </div>
        <div class="col-12 col-md-3">
          <q-card class="text-center q-pa-lg">
            <q-icon name="emoji_events" size="60px" color="accent" class="q-mb-md" />
            <h3 class="text-h6 q-mb-sm">成就系統</h3>
            <p class="text-grey-7">透過成就和徽章系統，激勵你的學習動機</p>
          </q-card>
        </div>
        <div class="col-12 col-md-3">
          <q-card class="text-center q-pa-lg">
            <q-icon name="trending_up" size="60px" color="positive" class="q-mb-md" />
            <h3 class="text-h6 q-mb-sm">學習追蹤</h3>
            <p class="text-grey-7">詳細記錄學習進度，掌握你的學習成果</p>
          </q-card>
        </div>
      </div>
    </div>

    <!-- 熱門課程 -->
    <div class="bg-grey-2 q-pa-xl">
      <div class="container">
        <div class="text-center q-mb-xl">
          <h2 class="text-h3 text-weight-bold q-mb-md">熱門課程</h2>
          <p class="text-h6 text-grey-7">精選最受歡迎的學習課程</p>
        </div>
        
        <div class="row q-gutter-lg">
          <div class="col-12 col-md-4" v-for="course in popularCourses" :key="course.id">
            <q-card class="course-card">
              <q-img :src="course.image" height="200px">
                <div class="absolute-bottom text-subtitle2 text-center bg-transparent">
                  <q-chip :color="course.levelColor" text-color="white" :label="course.level" />
                </div>
              </q-img>
              <q-card-section>
                <div class="text-h6 q-mb-sm">{{ course.title }}</div>
                <div class="text-grey-7 q-mb-md">{{ course.description }}</div>
                <div class="row items-center justify-between">
                  <div class="text-caption text-grey">
                    <q-icon name="schedule" size="xs" />
                    {{ course.duration }}
                  </div>
                  <div class="text-caption text-grey">
                    <q-icon name="people" size="xs" />
                    {{ course.students }} 位學員
                  </div>
                </div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat color="primary" label="查看詳情" />
                <q-btn color="primary" label="開始學習" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <!-- 學習路徑 -->
    <div class="container q-pa-xl">
      <div class="text-center q-mb-xl">
        <h2 class="text-h3 text-weight-bold q-mb-md">學習路徑</h2>
        <p class="text-h6 text-grey-7">系統化的學習規劃，助你達成學習目標</p>
      </div>
      
      <div class="row q-gutter-lg">
        <div class="col-12 col-md-6" v-for="path in learningPaths" :key="path.id">
          <q-card class="path-card">
            <q-card-section>
              <div class="row items-center q-mb-md">
                <q-icon :name="path.icon" size="40px" :color="path.color" class="q-mr-md" />
                <div>
                  <div class="text-h6">{{ path.title }}</div>
                  <div class="text-caption text-grey">{{ path.courses }} 門課程</div>
                </div>
              </div>
              <p class="text-grey-7">{{ path.description }}</p>
              <div class="q-mt-md">
                <q-linear-progress :value="path.progress" :color="path.color" class="q-mb-sm" />
                <div class="text-caption text-grey">{{ Math.round(path.progress * 100) }}% 完成</div>
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat :color="path.color" label="繼續學習" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>

    <!-- 最新動態 -->
    <div class="bg-grey-2 q-pa-xl">
      <div class="container">
        <div class="text-center q-mb-xl">
          <h2 class="text-h3 text-weight-bold q-mb-md">最新動態</h2>
          <p class="text-h6 text-grey-7">了解平台最新消息和學習者分享</p>
        </div>
        
        <div class="row q-gutter-lg">
          <div class="col-12 col-md-6" v-for="news in latestNews" :key="news.id">
            <q-card>
              <q-card-section>
                <div class="text-h6 q-mb-sm">{{ news.title }}</div>
                <div class="text-caption text-grey q-mb-md">{{ news.date }}</div>
                <p class="text-grey-7">{{ news.summary }}</p>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat color="primary" label="閱讀更多" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <!-- 頁腳 -->
    <q-footer elevated class="bg-dark text-white">
      <div class="container q-pa-xl">
        <div class="row q-gutter-lg">
          <div class="col-12 col-md-3">
            <h4 class="text-h6 q-mb-md">關於 3dw</h4>
            <p class="text-grey-4">
              致力於推廣自主學習理念，為學習者提供優質的線上學習平台和資源。
            </p>
          </div>
          <div class="col-12 col-md-3">
            <h4 class="text-h6 q-mb-md">學習資源</h4>
            <q-list dense>
              <q-item clickable v-ripple>
                <q-item-section>課程目錄</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>學習指南</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>FAQ</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>聯絡我們</q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-12 col-md-3">
            <h4 class="text-h6 q-mb-md">社群</h4>
            <q-list dense>
              <q-item clickable v-ripple>
                <q-item-section>討論區</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>學習群組</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>活動資訊</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>志工招募</q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-12 col-md-3">
            <h4 class="text-h6 q-mb-md">聯絡資訊</h4>
            <q-list dense>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="email" />
                </q-item-section>
                <q-item-section>info@3dw.org.tw</q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="phone" />
                </q-item-section>
                <q-item-section>(02) 1234-5678</q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="location_on" />
                </q-item-section>
                <q-item-section>台北市信義區</q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
        <q-separator class="q-my-lg" color="grey-7" />
        <div class="text-center text-grey-4">
          © 2024 3dw 自主學習促進會. 保留所有權利.
        </div>
      </div>
    </q-footer>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 熱門課程資料
const popularCourses = ref([
  {
    id: 1,
    title: '程式設計基礎',
    description: '從零開始學習程式設計，掌握邏輯思維和問題解決能力',
    image: 'https://picsum.photos/400/200?random=1',
    level: '初學者',
    levelColor: 'green',
    duration: '8 週',
    students: 1250
  },
  {
    id: 2,
    title: '數據科學入門',
    description: '學習數據分析、機器學習和統計學的基本概念',
    image: 'https://picsum.photos/400/200?random=2',
    level: '中級',
    levelColor: 'blue',
    duration: '12 週',
    students: 890
  },
  {
    id: 3,
    title: '創意寫作',
    description: '培養創意思維，提升寫作技巧和表達能力',
    image: 'https://picsum.photos/400/200?random=3',
    level: '所有程度',
    levelColor: 'purple',
    duration: '6 週',
    students: 650
  }
])

// 學習路徑資料
const learningPaths = ref([
  {
    id: 1,
    title: '前端開發',
    description: '從 HTML/CSS 到 React/Vue，完整的前端開發學習路徑',
    icon: 'code',
    color: 'primary',
    courses: 8,
    progress: 0.75
  },
  {
    id: 2,
    title: '數據分析',
    description: '掌握 Python、SQL 和數據視覺化，成為數據分析專家',
    icon: 'analytics',
    color: 'secondary',
    courses: 6,
    progress: 0.45
  }
])

// 最新動態資料
const latestNews = ref([
  {
    id: 1,
    title: '新課程上線：AI 人工智慧基礎',
    date: '2024年1月15日',
    summary: '探索人工智慧的基本概念和應用，了解機器學習和深度學習的基礎知識。'
  },
  {
    id: 2,
    title: '學習者分享：我的程式設計學習之路',
    date: '2024年1月10日',
    summary: '聽聽其他學習者的經驗分享，了解如何克服學習過程中的困難。'
  }
])
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 60vh;
  display: flex;
  align-items: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.course-card {
  transition: transform 0.3s ease;
}

.course-card:hover {
  transform: translateY(-5px);
}

.path-card {
  transition: transform 0.3s ease;
}

.path-card:hover {
  transform: translateY(-3px);
}
</style>
