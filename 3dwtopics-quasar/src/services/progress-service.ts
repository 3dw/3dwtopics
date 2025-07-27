import { ref } from 'vue'
import { apiService, type Progress, type UpdateProgressRequest } from './api'

// 學習進度狀態管理
export const userProgress = ref<Progress[]>([])
export const isLoading = ref(false)

// 學習進度服務
export class ProgressService {
  // 獲取用戶學習進度
  async getProgress(): Promise<{ success: boolean; message: string }> {
    isLoading.value = true
    try {
      const response = await apiService.getProgress()
      if (response.success && response.data) {
        userProgress.value = response.data
        return { success: true, message: '進度載入成功' }
      } else {
        return { success: false, message: response.message || '進度載入失敗' }
      }
    } catch (error) {
      console.error('獲取進度錯誤:', error)
      return { success: false, message: '進度載入失敗，請稍後再試。' }
    } finally {
      isLoading.value = false
    }
  }

  // 更新學習進度
  async updateProgress(progressData: UpdateProgressRequest): Promise<{ success: boolean; message: string }> {
    isLoading.value = true
    try {
      const response = await apiService.updateProgress(progressData)
      if (response.success && response.data) {
        // 更新本地進度數據
        const index = userProgress.value.findIndex(p => p.courseId === progressData.courseId)
        if (index !== -1) {
          userProgress.value[index] = response.data
        } else {
          userProgress.value.push(response.data)
        }
        return { success: true, message: '進度更新成功' }
      } else {
        return { success: false, message: response.message || '進度更新失敗' }
      }
    } catch (error) {
      console.error('更新進度錯誤:', error)
      return { success: false, message: '進度更新失敗，請稍後再試。' }
    } finally {
      isLoading.value = false
    }
  }

  // 獲取特定課程的進度
  getCourseProgress(courseId: string): Progress | null {
    return userProgress.value.find(p => p.courseId === courseId) || null
  }

  // 獲取用戶總體學習統計
  getLearningStats() {
    const totalCourses = userProgress.value.length
    const completedCourses = userProgress.value.filter(p => p.progress === 100).length
    const inProgressCourses = userProgress.value.filter(p => p.progress > 0 && p.progress < 100).length
    const totalProgress = userProgress.value.reduce((sum, p) => sum + p.progress, 0)
    const averageProgress = totalCourses > 0 ? Math.round(totalProgress / totalCourses) : 0

    return {
      totalCourses,
      completedCourses,
      inProgressCourses,
      averageProgress
    }
  }

  // 獲取最近學習的課程
  getRecentCourses(limit = 5): Progress[] {
    return userProgress.value
      .sort((a, b) => new Date(b.lastAccessedAt).getTime() - new Date(a.lastAccessedAt).getTime())
      .slice(0, limit)
  }

  // 檢查課程是否已完成
  isCourseCompleted(courseId: string): boolean {
    const progress = this.getCourseProgress(courseId)
    return progress ? progress.progress === 100 : false
  }

  // 獲取課程完成百分比
  getCourseProgressPercentage(courseId: string): number {
    const progress = this.getCourseProgress(courseId)
    return progress ? progress.progress : 0
  }

  // 清除進度數據
  clearProgress() {
    userProgress.value = []
  }
}

// 創建進度服務實例
export const progressService = new ProgressService() 