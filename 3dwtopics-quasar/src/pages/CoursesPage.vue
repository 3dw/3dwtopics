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
        <div class="courses-grid">
          <div
            v-for="course in filteredCourses"
            :key="course.id"
            class="course-card"
            @click="viewCourse(course)"
          >
            <div class="course-image">
              <img :src="course.image" :alt="course.title" />
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
                  <span>{{ course.duration }}</span>
                </div>
                <div class="meta-item">
                  <q-icon name="school" size="16px" />
                  <span>{{ course.level }}</span>
                </div>
                <div class="meta-item">
                  <q-icon name="people" size="16px" />
                  <span>{{ course.students }} 學員</span>
                </div>
              </div>

              <div class="course-footer">
                <div class="course-price">
                  <span class="price">NT$ {{ course.price }}</span>
                  <span v-if="course.originalPrice" class="original-price">
                    NT$ {{ course.originalPrice }}
                  </span>
                </div>
                <q-btn
                  color="primary"
                  label="立即購買"
                  size="sm"
                  @click.stop="purchaseCourse(course)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

const searchQuery = ref('')
const selectedCategory = ref('全部')
const selectedLevel = ref('全部')

const categories = [
  '全部',
  '野外生態',
  '思辨主題',
  '數學主題',
  '寫作主題',
  '公共參與',
  '自學煩惱'
]

const levels = [
  '全部',
  '初學者',
  '進階',
  '專家'
]

const courses = ref([
  {
    id: 1,
    title: '野外可食植物辨識',
    description: '學習辨識野地可食植物，掌握安全採集原則與生態倫理',
    category: '野外生態',
    level: '初學者',
    duration: '8 小時',
    students: 156,
    price: 1200,
    originalPrice: 1500,
    image: '/images/reiver1.jpg'
  },
  {
    id: 2,
    title: '地景生態觀察',
    description: '探索區域生態與植物群落，理解入侵種意義，培養生態倫理',
    category: '野外生態',
    level: '進階',
    duration: '12 小時',
    students: 89,
    price: 1800,
    originalPrice: 2200,
    image: '/images/watch1.jpg'
  },
  {
    id: 3,
    title: '生態記錄與分享',
    description: '學習使用開放工具進行生態記錄，建立公民科學參與',
    category: '野外生態',
    level: '進階',
    duration: '6 小時',
    students: 67,
    price: 900,
    originalPrice: 1200,
    image: '/images/explore.jpg'
  },
  {
    id: 4,
    title: '批判性思維訓練',
    description: '培養批判性思維，學習邏輯推理與論證技巧',
    category: '思辨主題',
    level: '初學者',
    duration: '10 小時',
    students: 234,
    price: 1500,
    originalPrice: null,
    image: '/images/reiver1.jpg'
  },
  {
    id: 5,
    title: '數學思維與應用',
    description: '探索數學的奧秘，從基礎運算到高等數學',
    category: '數學主題',
    level: '進階',
    duration: '16 小時',
    students: 178,
    price: 2000,
    originalPrice: 2500,
    image: '/images/watch1.jpg'
  },
  {
    id: 6,
    title: '創意寫作技巧',
    description: '提升寫作技巧，從創意寫作到學術寫作',
    category: '寫作主題',
    level: '初學者',
    duration: '8 小時',
    students: 145,
    price: 1200,
    originalPrice: null,
    image: '/images/explore.jpg'
  }
])

const filteredCourses = computed(() => {
  return courses.value.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === '全部' || course.category === selectedCategory.value
    const matchesLevel = selectedLevel.value === '全部' || course.level === selectedLevel.value
    
    return matchesSearch && matchesCategory && matchesLevel
  })
})

interface Course {
  id: number
  title: string
  description: string
  category: string
  level: string
  duration: string
  students: number
  price: number
  originalPrice: number | null
  image: string
}

const viewCourse = async (course: Course) => {
  await router.push(`/course/${course.id}`)
}

const purchaseCourse = (course: Course) => {
  $q.dialog({
    title: '確認購買',
    message: `確定要購買「${course.title}」課程嗎？`,
    cancel: true,
    persistent: true
  }).onOk(() => {
    $q.notify({
      type: 'positive',
      message: '購買成功！課程已加入您的學習清單'
    })
    void router.push('/dashboard')
  })
}
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