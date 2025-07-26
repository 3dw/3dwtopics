<template>
  <div class="course-detail-page">
    <div class="container">
      <!-- 課程標題區域 -->
      <div class="course-header">
        <div class="course-info">
          <div class="course-category">{{ course.category }}</div>
          <h1 class="course-title">{{ course.title }}</h1>
          <p class="course-subtitle">{{ course.description }}</p>
          
          <div class="course-meta">
            <div class="meta-item">
              <q-icon name="schedule" size="20px" />
              <span>{{ course.duration }}</span>
            </div>
            <div class="meta-item">
              <q-icon name="school" size="20px" />
              <span>{{ course.level }}</span>
            </div>
            <div class="meta-item">
              <q-icon name="people" size="20px" />
              <span>{{ course.students }} 學員</span>
            </div>
            <div class="meta-item">
              <q-icon name="star" size="20px" />
              <span>{{ course.rating }} ({{ course.reviews }} 評價)</span>
            </div>
          </div>
        </div>
        
        <div class="course-purchase">
          <div class="purchase-card">
            <div class="price-section">
              <div class="current-price">NT$ {{ course.price }}</div>
              <div v-if="course.originalPrice" class="original-price">
                NT$ {{ course.originalPrice }}
              </div>
              <div class="discount" v-if="course.originalPrice">
                省下 NT$ {{ course.originalPrice - course.price }}
              </div>
            </div>
            
            <div class="purchase-features">
              <div class="feature-item">
                <q-icon name="check_circle" color="positive" />
                <span>終身存取</span>
              </div>
              <div class="feature-item">
                <q-icon name="check_circle" color="positive" />
                <span>高品質影片</span>
              </div>
              <div class="feature-item">
                <q-icon name="check_circle" color="positive" />
                <span>下載資源</span>
              </div>
              <div class="feature-item">
                <q-icon name="check_circle" color="positive" />
                <span>證書完成</span>
              </div>
            </div>
            
            <q-btn
              color="primary"
              size="lg"
              label="立即購買"
              class="purchase-btn"
              @click="purchaseCourse"
            />
            
            <div class="guarantee">
              <q-icon name="security" size="16px" />
              <span>30 天退款保證</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 課程內容 -->
      <div class="course-content">
        <div class="content-tabs">
          <q-tabs
            v-model="activeTab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="overview" label="課程概覽" />
            <q-tab name="curriculum" label="課程大綱" />
            <q-tab name="instructor" label="講師介紹" />
            <q-tab name="reviews" label="學員評價" />
          </q-tabs>

          <q-tab-panels v-model="activeTab" animated>
            <!-- 課程概覽 -->
            <q-tab-panel name="overview" class="tab-panel">
              <div class="overview-content">
                <h3>課程簡介</h3>
                <p>{{ course.overview }}</p>
                
                <h3>您將學到什麼</h3>
                <ul class="learning-points">
                  <li v-for="point in course.learningPoints" :key="point">
                    {{ point }}
                  </li>
                </ul>
                
                <h3>適合對象</h3>
                <p>{{ course.targetAudience }}</p>
                
                <h3>課程要求</h3>
                <p>{{ course.requirements }}</p>
              </div>
            </q-tab-panel>

            <!-- 課程大綱 -->
            <q-tab-panel name="curriculum" class="tab-panel">
              <div class="curriculum-content">
                <div class="section-list">
                  <div
                    v-for="section in course.curriculum"
                    :key="section.id"
                    class="section-item"
                  >
                    <div class="section-header">
                      <div class="section-title">
                        <q-icon name="expand_more" />
                        <span>{{ section.title }}</span>
                      </div>
                      <div class="section-meta">
                        <span>{{ section.lessons.length }} 課程</span>
                        <span>{{ section.duration }}</span>
                      </div>
                    </div>
                    
                    <div class="lesson-list">
                      <div
                        v-for="lesson in section.lessons"
                        :key="lesson.id"
                        class="lesson-item"
                      >
                        <div class="lesson-info">
                          <q-icon name="play_circle" size="20px" />
                          <span>{{ lesson.title }}</span>
                        </div>
                        <div class="lesson-duration">{{ lesson.duration }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>

            <!-- 講師介紹 -->
            <q-tab-panel name="instructor" class="tab-panel">
              <div class="instructor-content">
                <div class="instructor-card">
                  <div class="instructor-avatar">
                    <img :src="course.instructor.avatar" :alt="course.instructor.name" />
                  </div>
                  <div class="instructor-info">
                    <h3>{{ course.instructor.name }}</h3>
                    <p class="instructor-title">{{ course.instructor.title }}</p>
                    <p class="instructor-bio">{{ course.instructor.bio }}</p>
                    
                    <div class="instructor-stats">
                      <div class="stat-item">
                        <span class="stat-number">{{ course.instructor.students }}</span>
                        <span class="stat-label">學員</span>
                      </div>
                      <div class="stat-item">
                        <span class="stat-number">{{ course.instructor.courses }}</span>
                        <span class="stat-label">課程</span>
                      </div>
                      <div class="stat-item">
                        <span class="stat-number">{{ course.instructor.rating }}</span>
                        <span class="stat-label">評分</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>

            <!-- 學員評價 -->
            <q-tab-panel name="reviews" class="tab-panel">
              <div class="reviews-content">
                <div class="reviews-summary">
                  <div class="rating-overview">
                    <div class="average-rating">{{ course.rating }}</div>
                    <div class="rating-stars">
                      <q-icon
                        v-for="i in 5"
                        :key="i"
                        :name="i <= Math.floor(course.rating) ? 'star' : 'star_border'"
                        color="amber"
                        size="24px"
                      />
                    </div>
                    <div class="total-reviews">{{ course.reviews }} 個評價</div>
                  </div>
                </div>
                
                <div class="review-list">
                  <div
                    v-for="review in course.reviewList"
                    :key="review.id"
                    class="review-item"
                  >
                    <div class="review-header">
                      <div class="reviewer-info">
                        <div class="reviewer-avatar">
                          <img :src="review.avatar" :alt="review.name" />
                        </div>
                        <div class="reviewer-details">
                          <div class="reviewer-name">{{ review.name }}</div>
                          <div class="review-date">{{ review.date }}</div>
                        </div>
                      </div>
                      <div class="review-rating">
                        <q-icon
                          v-for="i in 5"
                          :key="i"
                          :name="i <= review.rating ? 'star' : 'star_border'"
                          color="amber"
                          size="16px"
                        />
                      </div>
                    </div>
                    <div class="review-content">{{ review.content }}</div>
                  </div>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const route = useRoute()
const router = useRouter()
const $q = useQuasar()

const activeTab = ref('overview')

const course = ref({
  id: 1,
  title: '野外可食植物辨識',
  description: '學習辨識野地可食植物，掌握安全採集原則與生態倫理，建立人與自然的和諧關係',
  category: '野外生態',
  level: '初學者',
  duration: '8 小時',
  students: 156,
  rating: 4.8,
  reviews: 89,
  price: 1200,
  originalPrice: 1500,
  image: '/images/reiver1.jpg',
  overview: '本課程將帶領您深入探索野外可食植物的世界，學習如何安全地辨識、採集和利用野生植物。課程結合理論與實踐，讓您掌握生態倫理原則，建立與自然的和諧關係。',
  learningPoints: [
    '掌握 50+ 種常見可食植物的辨識方法',
    '學習安全採集原則與生態倫理',
    '了解植物生態系統與相互關係',
    '培養野外觀察與記錄能力',
    '建立可持續的採集實踐'
  ],
  targetAudience: '對野外植物感興趣的學習者，無論是初學者還是有經驗的自然愛好者都適合參加。',
  requirements: '無特殊要求，建議攜帶筆記本和相機進行記錄。',
  curriculum: [
    {
      id: 1,
      title: '基礎概念與安全原則',
      duration: '2 小時',
      lessons: [
        { id: 1, title: '課程介紹與學習目標', duration: '15 分鐘' },
        { id: 2, title: '野外安全注意事項', duration: '20 分鐘' },
        { id: 3, title: '生態倫理與永續採集', duration: '25 分鐘' },
        { id: 4, title: '基本工具與裝備', duration: '20 分鐘' }
      ]
    },
    {
      id: 2,
      title: '植物辨識基礎',
      duration: '3 小時',
      lessons: [
        { id: 5, title: '植物分類系統', duration: '30 分鐘' },
        { id: 6, title: '葉片形態與特徵', duration: '45 分鐘' },
        { id: 7, title: '花朵與果實辨識', duration: '45 分鐘' },
        { id: 8, title: '常見有毒植物', duration: '30 分鐘' }
      ]
    },
    {
      id: 3,
      title: '實地觀察與記錄',
      duration: '3 小時',
      lessons: [
        { id: 9, title: '野外觀察技巧', duration: '40 分鐘' },
        { id: 10, title: '攝影記錄方法', duration: '35 分鐘' },
        { id: 11, title: '筆記與繪圖技巧', duration: '30 分鐘' },
        { id: 12, title: '數位工具應用', duration: '45 分鐘' }
      ]
    }
  ],
  instructor: {
    name: '林生態',
    title: '生態學博士 / 野外植物專家',
    bio: '擁有 15 年野外植物研究經驗，專精於台灣本土植物生態與可食植物研究。致力於推廣生態教育與永續發展理念。',
    avatar: '/images/instructor.jpg',
    students: 1200,
    courses: 8,
    rating: 4.9
  },
  reviewList: [
    {
      id: 1,
      name: '王小明',
      avatar: '/images/avatar1.jpg',
      rating: 5,
      date: '2024-01-15',
      content: '課程內容非常實用，講師講解清楚易懂，讓我對野外植物有了全新的認識。'
    },
    {
      id: 2,
      name: '李小華',
      avatar: '/images/avatar2.jpg',
      rating: 4,
      date: '2024-01-10',
      content: '很棒的課程！學到了很多實用的知識，特別是安全注意事項的部分很詳細。'
    }
  ]
})

onMounted(() => {
  // 根據路由參數載入課程資料
  const courseId = route.params.id
  console.log('載入課程 ID:', courseId)
})

const purchaseCourse = () => {
  $q.dialog({
    title: '確認購買',
    message: `確定要購買「${course.value.title}」課程嗎？`,
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
.course-detail-page {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 40px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.course-header {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

.course-info {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.course-category {
  color: #667eea;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
}

.course-title {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 16px;
  line-height: 1.2;
}

.course-subtitle {
  font-size: 18px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 24px;
}

.course-meta {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 14px;
}

.course-purchase {
  position: sticky;
  top: 20px;
}

.purchase-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.price-section {
  text-align: center;
  margin-bottom: 24px;
}

.current-price {
  font-size: 36px;
  font-weight: 700;
  color: #667eea;
}

.original-price {
  font-size: 18px;
  color: #999;
  text-decoration: line-through;
  margin-bottom: 8px;
}

.discount {
  color: #e74c3c;
  font-weight: 500;
}

.purchase-features {
  margin-bottom: 24px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #666;
}

.purchase-btn {
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
}

.guarantee {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #666;
  font-size: 14px;
}

.course-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.content-tabs {
  border-bottom: 1px solid #e9ecef;
}

.tab-panel {
  padding: 40px;
}

.overview-content h3 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  margin-top: 24px;
}

.overview-content h3:first-child {
  margin-top: 0;
}

.overview-content p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.learning-points {
  list-style: none;
  padding: 0;
}

.learning-points li {
  position: relative;
  padding-left: 24px;
  margin-bottom: 12px;
  color: #666;
  line-height: 1.5;
}

.learning-points li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #667eea;
  font-weight: bold;
}

.section-list {
  border: 1px solid #e9ecef;
  border-radius: 8px;
}

.section-item {
  border-bottom: 1px solid #e9ecef;
}

.section-item:last-child {
  border-bottom: none;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  background: #f8f9fa;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  color: #333;
}

.section-meta {
  display: flex;
  gap: 16px;
  color: #666;
  font-size: 14px;
}

.lesson-list {
  padding: 0 20px 20px;
}

.lesson-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.lesson-item:last-child {
  border-bottom: none;
}

.lesson-info {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #666;
}

.lesson-duration {
  color: #999;
  font-size: 14px;
}

.instructor-card {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.instructor-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.instructor-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.instructor-info h3 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.instructor-title {
  color: #667eea;
  font-weight: 500;
  margin-bottom: 16px;
}

.instructor-bio {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.instructor-stats {
  display: flex;
  gap: 24px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 24px;
  font-weight: 600;
  color: #667eea;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.reviews-summary {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 8px;
}

.rating-overview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.average-rating {
  font-size: 48px;
  font-weight: 700;
  color: #333;
}

.rating-stars {
  display: flex;
  gap: 4px;
}

.total-reviews {
  color: #666;
  font-size: 14px;
}

.review-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.review-item {
  padding: 24px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.reviewer-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.reviewer-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.reviewer-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.reviewer-name {
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.review-date {
  font-size: 12px;
  color: #999;
}

.review-rating {
  display: flex;
  gap: 2px;
}

.review-content {
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .course-header {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .course-title {
    font-size: 24px;
  }
  
  .course-meta {
    flex-direction: column;
    gap: 12px;
  }
  
  .tab-panel {
    padding: 20px;
  }
}
</style> 