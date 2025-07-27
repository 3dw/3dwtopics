import { ref } from 'vue'
import { apiService, type Course } from './api'

// 課程狀態管理
export const courses = ref<Course[]>([])
export const currentCourse = ref<Course | null>(null)
export const isLoading = ref(false)

// 課程管理服務
export class CourseService {
  // 獲取所有課程
  async getCourses(): Promise<{ success: boolean; message: string }> {
    isLoading.value = true
    try {
      const response = await apiService.getCourses()
      if (response.success && response.data) {
        courses.value = response.data
        return { success: true, message: '課程載入成功' }
      } else {
        return { success: false, message: response.message || '課程載入失敗' }
      }
    } catch (error) {
      console.error('獲取課程錯誤:', error)
      return { success: false, message: '課程載入失敗，請稍後再試。' }
    } finally {
      isLoading.value = false
    }
  }

  // 獲取單一課程
  async getCourse(id: string): Promise<{ success: boolean; message: string }> {
    isLoading.value = true
    try {
      const response = await apiService.getCourse(id)
      if (response.success && response.data) {
        currentCourse.value = response.data
        return { success: true, message: '課程載入成功' }
      } else {
        return { success: false, message: response.message || '課程載入失敗' }
      }
    } catch (error) {
      console.error('獲取課程錯誤:', error)
      return { success: false, message: '課程載入失敗，請稍後再試。' }
    } finally {
      isLoading.value = false
    }
  }

  // 根據難度篩選課程
  getCoursesByDifficulty(difficulty: Course['difficulty']): Course[] {
    return courses.value.filter(course => course.difficulty === difficulty)
  }

  // 根據類別篩選課程
  getCoursesByCategory(category: string): Course[] {
    return courses.value.filter(course => course.category === category)
  }

  // 搜尋課程
  searchCourses(query: string): Course[] {
    const lowerQuery = query.toLowerCase()
    return courses.value.filter(course => 
      course.title.toLowerCase().includes(lowerQuery) ||
      course.description.toLowerCase().includes(lowerQuery) ||
      course.category.toLowerCase().includes(lowerQuery)
    )
  }

  // 獲取課程統計
  getCourseStats() {
    const total = courses.value.length
    const beginner = courses.value.filter(c => c.difficulty === 'beginner').length
    const intermediate = courses.value.filter(c => c.difficulty === 'intermediate').length
    const advanced = courses.value.filter(c => c.difficulty === 'advanced').length

    return {
      total,
      beginner,
      intermediate,
      advanced
    }
  }

  // 清除當前課程
  clearCurrentCourse() {
    currentCourse.value = null
  }
}

// 創建課程服務實例
export const courseService = new CourseService() 