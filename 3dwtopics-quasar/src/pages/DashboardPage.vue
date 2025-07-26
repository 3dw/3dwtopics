<template>
  <div class="dashboard-page">
    <div class="container">
      <!-- 歡迎區域 -->
      <div class="welcome-section">
        <div class="welcome-content">
          <h1 class="welcome-title">歡迎回來，{{ user.name }}！</h1>
          <p class="welcome-subtitle">繼續您的學習之旅</p>
        </div>
        <div class="welcome-stats">
          <div class="stat-card">
            <div class="stat-icon">
              <q-icon name="school" size="32px" color="primary" />
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.totalCourses }}</div>
              <div class="stat-label">已購課程</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <q-icon name="check_circle" size="32px" color="positive" />
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.completedCourses }}</div>
              <div class="stat-label">已完成</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <q-icon name="schedule" size="32px" color="warning" />
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.totalHours }}</div>
              <div class="stat-label">學習時數</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 繼續學習 -->
      <div class="section">
        <div class="section-header">
          <h2 class="section-title">繼續學習</h2>
          <q-btn
            color="primary"
            label="查看全部課程"
            flat
            @click="viewAllCourses"
          />
        </div>
        
        <div class="courses-grid">
          <div
            v-for="course in inProgressCourses"
            :key="course.id"
            class="course-card"
            @click="continueLearning(course)"
          >
            <div class="course-image">
              <img :src="course.image" :alt="course.title" />
              <div class="progress-overlay">
                <div class="progress-circle">
                  <q-circular-progress
                    :value="course.progress"
                    size="60px"
                    color="primary"
                    track-color="grey-3"
                  />
                  <div class="progress-text">{{ course.progress }}%</div>
                </div>
              </div>
            </div>
            
            <div class="course-content">
              <div class="course-category">{{ course.category }}</div>
              <h3 class="course-title">{{ course.title }}</h3>
              <p class="course-description">{{ course.description }}</p>
              
              <div class="course-progress">
                <div class="progress-bar">
                  <div
                    class="progress-fill"
                    :style="{ width: course.progress + '%' }"
                  ></div>
                </div>
                <div class="progress-text">
                  {{ course.completedLessons }}/{{ course.totalLessons }} 課程
                </div>
              </div>
              
              <div class="course-actions">
                <q-btn
                  color="primary"
                  label="繼續學習"
                  size="sm"
                  @click.stop="continueLearning(course)"
                />
                <q-btn
                  color="grey"
                  label="查看詳情"
                  size="sm"
                  flat
                  @click.stop="viewCourseDetail(course)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 推薦課程 -->
      <div class="section">
        <div class="section-header">
          <h2 class="section-title">推薦課程</h2>
          <q-btn
            color="primary"
            label="瀏覽更多"
            flat
            @click="browseCourses"
          />
        </div>
        
        <div class="courses-grid">
          <div
            v-for="course in recommendedCourses"
            :key="course.id"
            class="course-card"
            @click="viewCourseDetail(course)"
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

      <!-- 學習成就 -->
      <div class="section">
        <div class="section-header">
          <h2 class="section-title">學習成就</h2>
        </div>
        
        <div class="achievements-grid">
          <div
            v-for="achievement in achievements"
            :key="achievement.id"
            class="achievement-card"
            :class="{ 'achieved': achievement.achieved }"
          >
            <div class="achievement-icon">
              <q-icon
                :name="achievement.icon"
                size="48px"
                :color="achievement.achieved ? 'positive' : 'grey-4'"
              />
            </div>
            <div class="achievement-content">
              <h3 class="achievement-title">{{ achievement.title }}</h3>
              <p class="achievement-description">{{ achievement.description }}</p>
              <div class="achievement-progress">
                <div class="progress-bar">
                  <div
                    class="progress-fill"
                    :style="{ width: achievement.progress + '%' }"
                  ></div>
                </div>
                <div class="progress-text">
                  {{ achievement.current }}/{{ achievement.target }}
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

const user = ref({
  name: '王小明',
  email: 'user@example.com'
})

const stats = ref({
  totalCourses: 5,
  completedCourses: 2,
  totalHours: 24
})

const inProgressCourses = ref([
  {
    id: 1,
    title: '野外可食植物辨識',
    description: '學習辨識野地可食植物，掌握安全採集原則與生態倫理',
    category: '野外生態',
    image: '/images/reiver1.jpg',
    progress: 65,
    completedLessons: 8,
    totalLessons: 12
  },
  {
    id: 2,
    title: '地景生態觀察',
    description: '探索區域生態與植物群落，理解入侵種意義，培養生態倫理',
    category: '野外生態',
    image: '/images/watch1.jpg',
    progress: 30,
    completedLessons: 3,
    totalLessons: 10
  }
])

const recommendedCourses = ref([
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
    image: '/images/thinking.jpg'
  }
])

const achievements = ref([
  {
    id: 1,
    title: '學習新手',
    description: '完成第一個課程',
    icon: 'school',
    achieved: true,
    progress: 100,
    current: 1,
    target: 1
  },
  {
    id: 2,
    title: '知識探索者',
    description: '完成 5 個課程',
    icon: 'explore',
    achieved: false,
    progress: 40,
    current: 2,
    target: 5
  },
  {
    id: 3,
    title: '時間管理大師',
    description: '累積學習 50 小時',
    icon: 'schedule',
    achieved: false,
    progress: 48,
    current: 24,
    target: 50
  },
  {
    id: 4,
    title: '生態守護者',
    description: '完成所有野外生態課程',
    icon: 'eco',
    achieved: false,
    progress: 66,
    current: 2,
    target: 3
  }
])

interface Course {
  id: number
  title: string
  description: string
  category: string
  level?: string
  duration?: string
  students?: number
  price?: number
  originalPrice?: number | null
  image: string
  progress?: number
  completedLessons?: number
  totalLessons?: number
}

const continueLearning = async (course: Course) => {
  await router.push(`/learn/${course.id}`)
}

const viewCourseDetail = async (course: Course) => {
  await router.push(`/course/${course.id}`)
}

const viewAllCourses = async () => {
  await router.push('/courses')
}

const browseCourses = async () => {
  await router.push('/courses')
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
  })
}
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 40px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.welcome-section {
  background: white;
  border-radius: 12px;
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.welcome-content {
  margin-bottom: 30px;
}

.welcome-title {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
}

.welcome-subtitle {
  font-size: 18px;
  color: #666;
}

.welcome-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.stat-icon {
  flex-shrink: 0;
}

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.section {
  background: white;
  border-radius: 12px;
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
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
  border: 1px solid #e9ecef;
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

.progress-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-circle {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-text {
  position: absolute;
  font-size: 12px;
  font-weight: 600;
  color: white;
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

.course-progress {
  margin-bottom: 20px;
}

.progress-bar {
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: #667eea;
  transition: width 0.3s;
}

.progress-text {
  font-size: 12px;
  color: #666;
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
  font-size: 18px;
  font-weight: 600;
  color: #667eea;
}

.original-price {
  font-size: 12px;
  color: #999;
  text-decoration: line-through;
}

.course-actions {
  display: flex;
  gap: 12px;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.achievement-card {
  display: flex;
  gap: 16px;
  padding: 20px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  transition: all 0.2s;
}

.achievement-card.achieved {
  background: #f8fff8;
  border-color: #4caf50;
}

.achievement-icon {
  flex-shrink: 0;
}

.achievement-content {
  flex: 1;
}

.achievement-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.achievement-description {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 16px;
}

.achievement-progress {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

@media (max-width: 768px) {
  .welcome-stats {
    grid-template-columns: 1fr;
  }
  
  .courses-grid {
    grid-template-columns: 1fr;
  }
  
  .achievements-grid {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
}
</style> 