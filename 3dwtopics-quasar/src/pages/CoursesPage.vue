<template>
  <div class="courses-page">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">探索學習主題</h1>
        <p class="hero-subtitle">
          選擇您感興趣的課程，開始您的自主學習之旅
        </p>
      </div>
    </div>

    <!-- 課程篩選 -->
    <div class="filter-section">
      <div class="container">
        <div class="filter-controls">
          <q-input
            v-model="searchQuery"
            placeholder="搜尋課程..."
            outlined
            dense
            class="search-input"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-select
            v-model="selectedCategory"
            :options="categories"
            label="課程分類"
            outlined
            dense
            class="category-select"
          />

          <q-select
            v-model="selectedLevel"
            :options="levels"
            label="難度等級"
            outlined
            dense
            class="level-select"
          />
        </div>
      </div>
    </div>

    <!-- 課程列表 -->
    <div class="courses-section">
      <div class="container">
        <!-- 載入狀態 -->
        <div v-if="isLoading" class="loading-section">
          <q-spinner-dots size="50px" color="primary" />
          <p>載入課程中...</p>
        </div>

        <!-- 錯誤狀態 -->
        <div v-else-if="error" class="error-section">
          <q-icon name="error" size="50px" color="negative" />
          <p>{{ error }}</p>
          <q-btn color="primary" label="重試" @click="loadCourses" />
        </div>

        <!-- 課程列表 -->
        <div v-else>
          <div class="courses-header">
            <h2>找到 {{ filteredCourses.length }} 個課程</h2>
          </div>
          
          <div class="courses-grid">
            <div
              v-for="course in filteredCourses"
              :key="course.id"
              class="course-card"
              @click="viewCourse(course)"
            >
              <div class="course-image">
                <img :src="course.thumbnail || '/images/explore.jpg'" :alt="course.title" />
                <div class="course-overlay">
                  <q-btn
                    color="primary"
                    label="查看詳情"
                    size="sm"
                    class="view-btn"
                  />
                </div>
              </div>
              
              <div class="course-content">
                <div class="course-category">{{ course.category }}</div>
                <h3 class="course-title">{{ course.title }}</h3>
                <p class="course-description">{{ course.description }}</p>
                
                <div class="course-meta">
                  <div class="meta-item">
                    <q-icon name="schedule" size="16px" />
                    <span>{{ course.duration }} 分鐘</span>
                  </div>
                  <div class="meta-item">
                    <q-icon name="school" size="16px" />
                    <span>{{ getLevelText(course.level) }}</span>
                  </div>
                  <div class="meta-item">
                    <q-icon name="people" size="16px" />
                    <span>{{ course.instructor }}</span>
                  </div>
                </div>

                <div class="course-footer">
                  <div class="course-price">
                    <span class="price">{{ course.price === 0 ? '免費' : `NT$ ${course.price}` }}</span>
                  </div>
                  <q-btn
                    color="primary"
                    label="開始學習"
                    size="sm"
                    @click.stop="viewCourse(course)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { courseService } from '../services/course-service'

const router = useRouter()
const $q = useQuasar()

const searchQuery = ref('')
const selectedCategory = ref('全部')
const selectedLevel = ref('全部')
const isLoading = ref(false)
const error = ref('')

const categories = [
  '全部',
  'general'
]

const levels = [
  '全部',
  'beginner',
  'intermediate',
  'advanced'
]

// 載入課程數據
const loadCourses = async () => {
  isLoading.value = true
  error.value = ''
  
  try {
    const result = await courseService.getCourses()
    if (!result.success) {
      error.value = result.message
      $q.notify({
        type: 'negative',
        message: result.message
      })
    }
  } catch (err) {
    error.value = '載入課程失敗，請稍後再試'
    console.error('載入課程錯誤:', err)
  } finally {
    isLoading.value = false
  }
}

// 載入課程數據
onMounted(() => {
  void loadCourses()
})

// 等級文字轉換函數
const getLevelText = (level: string) => {
  const levelMap: Record<string, string> = {
    'beginner': '初學者',
    'intermediate': '進階',
    'advanced': '專家'
  }
  return levelMap[level] || level
}

const filteredCourses = computed(() => {
  return courseService.searchCourses(searchQuery.value).filter(course => {
    const matchesCategory = selectedCategory.value === '全部' || course.category === selectedCategory.value
    const matchesLevel = selectedLevel.value === '全部' || course.level === selectedLevel.value
    
    return matchesCategory && matchesLevel
  })
})

import type { Course } from '../services/api'

const viewCourse = async (course: Course) => {
  await router.push(`/course/${course.id}`)
}

// 移除購買功能，改為直接查看課程
</script>

<style scoped>
.courses-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
}

.hero-subtitle {
  font-size: 20px;
  opacity: 0.9;
}

.filter-section {
  background: white;
  padding: 30px 0;
  border-bottom: 1px solid #e9ecef;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.filter-controls {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 200px;
}

.category-select,
.level-select {
  min-width: 150px;
}

.courses-section {
  padding: 60px 0;
}

.loading-section,
.error-section {
  text-align: center;
  padding: 60px 20px;
}

.loading-section p,
.error-section p {
  margin-top: 16px;
  color: #666;
  font-size: 16px;
}

.error-section .q-btn {
  margin-top: 20px;
}

.courses-header {
  margin-bottom: 30px;
}

.courses-header h2 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
}

.course-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.course-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.course-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.course-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.course-card:hover .course-overlay {
  opacity: 1;
}

.course-content {
  padding: 24px;
}

.course-category {
  color: #667eea;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
}

.course-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  line-height: 1.3;
}

.course-description {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 16px;
}

.course-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #666;
  font-size: 12px;
}

.course-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.course-price {
  display: flex;
  flex-direction: column;
}

.price {
  font-size: 20px;
  font-weight: 600;
  color: #667eea;
}

.original-price {
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }
  
  .hero-subtitle {
    font-size: 16px;
  }
  
  .filter-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .courses-grid {
    grid-template-columns: 1fr;
  }
}
</style> 