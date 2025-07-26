<template>
  <div class="learn-page">
    <div class="learn-container">
      <!-- 左側課程導航 -->
      <div class="course-sidebar">
        <div class="course-header">
          <div class="course-title">
            <q-icon name="school" size="24px" color="primary" />
            <span>{{ course.title }}</span>
          </div>
          <q-btn
            flat
            icon="chevron_left"
            size="sm"
            @click="toggleSidebar"
            class="collapse-btn"
          />
        </div>
        
        <div class="course-progress">
          <div class="progress-info">
            <span class="progress-text">{{ course.progress }}% 完成</span>
            <span class="progress-detail">{{ course.completedLessons }}/{{ course.totalLessons }} 課程</span>
          </div>
          <q-linear-progress
            :value="course.progress / 100"
            color="primary"
            size="md"
          />
        </div>
        
        <div class="course-sections">
          <div
            v-for="section in course.sections"
            :key="section.id"
            class="section-item"
            :class="{ 'active': currentSection === section.id }"
          >
            <div
              class="section-header"
              @click="selectSection(section.id)"
            >
              <div class="section-info">
                <q-icon name="expand_more" size="20px" />
                <span class="section-title">{{ section.title }}</span>
              </div>
              <div class="section-meta">
                <span>{{ section.lessons.length }} 課程</span>
                <span>{{ section.duration }}</span>
              </div>
            </div>
            
            <div class="lesson-list" v-if="currentSection === section.id">
              <div
                v-for="lesson in section.lessons"
                :key="lesson.id"
                class="lesson-item"
                :class="{ 
                  'completed': lesson.completed,
                  'current': currentLessonId === lesson.id 
                }"
                @click="selectLesson(lesson.id)"
              >
                <div class="lesson-info">
                  <q-icon
                    :name="lesson.completed ? 'check_circle' : 'play_circle'"
                    size="20px"
                    :color="lesson.completed ? 'positive' : 'grey'"
                  />
                  <span class="lesson-title">{{ lesson.title }}</span>
                </div>
                <div class="lesson-duration">{{ lesson.duration }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右側學習內容 -->
      <div class="learning-content">
        <!-- 頂部導航 -->
        <div class="content-header">
          <div class="breadcrumb">
            <span>{{ course.title }}</span>
            <q-icon name="chevron_right" size="16px" />
            <span>{{ currentLessonTitle }}</span>
          </div>
          
          <div class="header-actions">
            <q-btn
              flat
              label="標記完成"
              color="primary"
              icon="check_circle"
              @click="markComplete"
            />
            <q-btn
              flat
              label="下一課"
              color="primary"
              icon="arrow_forward"
              @click="nextLesson"
            />
          </div>
        </div>

        <!-- 學習內容區域 -->
        <div class="content-area">
          <div class="lesson-content">
            <h1 class="lesson-title">{{ currentLessonTitle }}</h1>
            
            <!-- 影片播放器 -->
            <div class="video-player">
              <div class="video-container">
                <iframe
                  :src="currentLessonData?.videoUrl || ''"
                  title="課程影片"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>

            <!-- 課程描述 -->
            <div class="lesson-description">
              <h3>課程說明</h3>
              <p>{{ currentLessonData?.description || '' }}</p>
            </div>

            <!-- 學習資源 -->
            <div class="lesson-resources" v-if="currentLessonData?.resources">
              <h3>學習資源</h3>
              <div class="resources-list">
                <div
                  v-for="resource in currentLessonData.resources"
                  :key="resource.id"
                  class="resource-item"
                >
                  <q-icon name="description" size="20px" color="primary" />
                  <span class="resource-title">{{ resource.title }}</span>
                  <q-btn
                    flat
                    size="sm"
                    label="下載"
                    color="primary"
                    @click="downloadResource(resource)"
                  />
                </div>
              </div>
            </div>

            <!-- 學習筆記 -->
            <div class="lesson-notes">
              <h3>學習筆記</h3>
              <q-input
                v-model="lessonNotes"
                type="textarea"
                outlined
                placeholder="記錄您的學習心得..."
                rows="4"
              />
              <div class="notes-actions">
                <q-btn
                  color="primary"
                  label="儲存筆記"
                  @click="saveNotes"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 底部導航 -->
        <div class="content-footer">
          <div class="navigation-buttons">
            <q-btn
              color="grey"
              label="上一課"
              icon="arrow_back"
              :disable="!canGoPrevious"
              @click="previousLesson"
            />
            <q-btn
              color="primary"
              label="下一課"
              icon="arrow_forward"
              :disable="!canGoNext"
              @click="nextLesson"
            />
          </div>
          
          <div class="completion-status">
            <q-btn
              color="positive"
              label="標記完成"
              icon="check_circle"
              @click="markComplete"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'

const route = useRoute()
const $q = useQuasar()

interface Resource {
  id: number
  title: string
}

interface Lesson {
  id: number
  title: string
  duration: string
  completed: boolean
  videoUrl: string
  description: string
  resources?: Resource[]
}

interface Section {
  id: number
  title: string
  duration: string
  lessons: Lesson[]
}

interface Course {
  id: number
  title: string
  progress: number
  completedLessons: number
  totalLessons: number
  sections: Section[]
}

const course = ref<Course>({
  id: 1,
  title: '野外可食植物辨識',
  progress: 65,
  completedLessons: 8,
  totalLessons: 12,
  sections: [
    {
      id: 1,
      title: '基礎概念與安全原則',
      duration: '2 小時',
      lessons: [
        {
          id: 1,
          title: '課程介紹與學習目標',
          duration: '15 分鐘',
          completed: true,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          description: '本課程將帶領您深入探索野外可食植物的世界，學習如何安全地辨識、採集和利用野生植物。',
          resources: [
            { id: 1, title: '課程大綱.pdf' },
            { id: 2, title: '安全手冊.pdf' }
          ]
        },
        {
          id: 2,
          title: '野外安全注意事項',
          duration: '20 分鐘',
          completed: true,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          description: '學習野外活動的基本安全原則，包括裝備準備、天氣判斷、緊急應變等。',
          resources: [
            { id: 3, title: '安全檢查清單.pdf' }
          ]
        },
        {
          id: 3,
          title: '生態倫理與永續採集',
          duration: '25 分鐘',
          completed: false,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          description: '了解採集野生植物時應遵循的生態倫理原則，確保永續發展。',
          resources: [
            { id: 4, title: '生態倫理指南.pdf' }
          ]
        }
      ]
    },
    {
      id: 2,
      title: '植物辨識基礎',
      duration: '3 小時',
      lessons: [
        {
          id: 4,
          title: '植物分類系統',
          duration: '30 分鐘',
          completed: false,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          description: '學習植物的基本分類系統，了解科屬種的層級關係。',
          resources: [
            { id: 5, title: '植物分類表.pdf' }
          ]
        }
      ]
    }
  ]
})

const currentSection = ref(1)
const currentLessonId = ref(3)
const lessonNotes = ref('')

const currentLessonTitle = computed(() => {
  const section = course.value.sections.find(s => s.id === currentSection.value)
  if (!section) return ''
  
  const lesson = section.lessons.find(l => l.id === currentLessonId.value)
  return lesson ? lesson.title : ''
})

const currentLessonData = computed(() => {
  const section = course.value.sections.find(s => s.id === currentSection.value)
  if (!section) return null
  
  return section.lessons.find(l => l.id === currentLessonId.value) || null
})

const canGoPrevious = computed(() => {
  // 檢查是否有上一課
  return currentLessonId.value > 1
})

const canGoNext = computed(() => {
  // 檢查是否有下一課
  const section = course.value.sections.find(s => s.id === currentSection.value)
  if (!section) return false
  
  const currentIndex = section.lessons.findIndex(l => l.id === currentLessonId.value)
  return currentIndex < section.lessons.length - 1
})

onMounted(() => {
  // 根據路由參數載入課程資料
  const courseId = route.params.id
  console.log('載入課程 ID:', courseId)
})

const toggleSidebar = () => {
  // 切換側邊欄顯示/隱藏
  console.log('切換側邊欄')
}

const selectSection = (sectionId: number) => {
  currentSection.value = sectionId
  // 選擇該章節的第一個課程
  const section = course.value.sections.find(s => s.id === sectionId)
  if (section && section.lessons.length > 0) {
    const firstLesson = section.lessons[0]
    if (firstLesson) {
      currentLessonId.value = firstLesson.id
    }
  }
}

const selectLesson = (lessonId: number) => {
  currentLessonId.value = lessonId
}

const markComplete = () => {
  if (!currentLessonData.value) return
  
  currentLessonData.value.completed = true
  course.value.completedLessons++
  course.value.progress = Math.round((course.value.completedLessons / course.value.totalLessons) * 100)
  
  $q.notify({
    type: 'positive',
    message: '課程已完成！'
  })
}

const nextLesson = () => {
  const section = course.value.sections.find(s => s.id === currentSection.value)
  if (!section) return
  
  const currentIndex = section.lessons.findIndex(l => l.id === currentLessonId.value)
  if (currentIndex < section.lessons.length - 1) {
    const nextLesson = section.lessons[currentIndex + 1]
    if (nextLesson) {
      currentLessonId.value = nextLesson.id
    }
  } else {
    // 切換到下一個章節
    const currentSectionIndex = course.value.sections.findIndex(s => s.id === currentSection.value)
    if (currentSectionIndex < course.value.sections.length - 1) {
      const nextSection = course.value.sections[currentSectionIndex + 1]
      if (nextSection && nextSection.lessons.length > 0) {
        const firstLesson = nextSection.lessons[0]
        if (firstLesson) {
          currentSection.value = nextSection.id
          currentLessonId.value = firstLesson.id
        }
      }
    }
  }
}

const previousLesson = () => {
  const section = course.value.sections.find(s => s.id === currentSection.value)
  if (!section) return
  
  const currentIndex = section.lessons.findIndex(l => l.id === currentLessonId.value)
  if (currentIndex > 0) {
    const prevLesson = section.lessons[currentIndex - 1]
    if (prevLesson) {
      currentLessonId.value = prevLesson.id
    }
  } else {
    // 切換到上一個章節
    const currentSectionIndex = course.value.sections.findIndex(s => s.id === currentSection.value)
    if (currentSectionIndex > 0) {
      const prevSection = course.value.sections[currentSectionIndex - 1]
      if (prevSection && prevSection.lessons.length > 0) {
        const lastLesson = prevSection.lessons[prevSection.lessons.length - 1]
        if (lastLesson) {
          currentSection.value = prevSection.id
          currentLessonId.value = lastLesson.id
        }
      }
    }
  }
}

const downloadResource = (resource: Resource) => {
  $q.notify({
    type: 'positive',
    message: `正在下載 ${resource.title}`
  })
}

const saveNotes = () => {
  $q.notify({
    type: 'positive',
    message: '筆記已儲存'
  })
}
</script>

<style scoped>
.learn-page {
  height: 100vh;
  background: #f8f9fa;
}

.learn-container {
  display: flex;
  height: 100vh;
}

.course-sidebar {
  width: 350px;
  background: white;
  border-right: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.course-header {
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.course-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  color: #333;
  font-size: 16px;
}

.collapse-btn {
  color: #666;
}

.course-progress {
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.progress-text {
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.progress-detail {
  color: #666;
  font-size: 12px;
}

.course-sections {
  flex: 1;
  overflow-y: auto;
}

.section-item {
  border-bottom: 1px solid #f0f0f0;
}

.section-item.active {
  background: #f8f9fa;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.section-header:hover {
  background: #f8f9fa;
}

.section-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title {
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.section-meta {
  display: flex;
  gap: 12px;
  color: #666;
  font-size: 12px;
}

.lesson-list {
  background: #f8f9fa;
}

.lesson-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px 12px 48px;
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid #f0f0f0;
}

.lesson-item:hover {
  background: #e9ecef;
}

.lesson-item.completed {
  background: #f8fff8;
}

.lesson-item.current {
  background: #e3f2fd;
  border-left: 3px solid #2196f3;
}

.lesson-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.lesson-title {
  color: #333;
  font-size: 14px;
}

.lesson-duration {
  color: #666;
  font-size: 12px;
}

.learning-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
}

.content-header {
  padding: 20px 30px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 14px;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 30px;
}

.lesson-content {
  max-width: 800px;
  margin: 0 auto;
}

.lesson-title {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 30px;
}

.video-player {
  margin-bottom: 40px;
}

.video-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 比例 */
  background: #000;
  border-radius: 8px;
  overflow: hidden;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.lesson-description,
.lesson-resources,
.lesson-notes {
  margin-bottom: 40px;
}

.lesson-description h3,
.lesson-resources h3,
.lesson-notes h3 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.lesson-description p {
  color: #666;
  line-height: 1.6;
  font-size: 16px;
}

.resources-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.resource-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background: #f8f9fa;
}

.resource-title {
  flex: 1;
  color: #333;
  font-weight: 500;
}

.notes-actions {
  margin-top: 16px;
}

.content-footer {
  padding: 20px 30px;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
}

.navigation-buttons {
  display: flex;
  gap: 12px;
}

.completion-status {
  display: flex;
  gap: 12px;
}

@media (max-width: 768px) {
  .learn-container {
    flex-direction: column;
  }
  
  .course-sidebar {
    width: 100%;
    height: 300px;
  }
  
  .content-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .content-footer {
    flex-direction: column;
    gap: 16px;
  }
}
</style> 