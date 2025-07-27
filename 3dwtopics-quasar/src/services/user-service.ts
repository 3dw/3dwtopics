import { ref, computed } from 'vue'
import { apiService, type User, type RegisterRequest, type LoginRequest } from './api'

// 用戶狀態管理
export const currentUser = ref<User | null>(null)
export const isAuthenticated = computed(() => !!currentUser.value)
export const isLoading = ref(false)

// 用戶管理服務
export class UserService {
  // 初始化用戶狀態
  async initialize() {
    const token = localStorage.getItem('auth_token')
    if (token) {
      try {
        const response = await apiService.verifyToken()
        if (response.success && response.data) {
          currentUser.value = response.data
        } else {
          this.logout()
        }
      } catch (error) {
        console.error('Token 驗證失敗:', error)
        this.logout()
      }
    }
  }

  // 用戶註冊
  async register(userData: RegisterRequest): Promise<{ success: boolean; message: string }> {
    isLoading.value = true
    try {
      const response = await apiService.register(userData)
      if (response.success) {
        return { success: true, message: '註冊成功！請登入您的帳戶。' }
      } else {
        return { success: false, message: response.message || '註冊失敗' }
      }
    } catch (error) {
      console.error('註冊錯誤:', error)
      return { success: false, message: '註冊失敗，請稍後再試。' }
    } finally {
      isLoading.value = false
    }
  }

  // 用戶登入
  async login(credentials: LoginRequest): Promise<{ success: boolean; message: string }> {
    isLoading.value = true
    try {
      const response = await apiService.login(credentials)
      if (response.success && response.data) {
        currentUser.value = response.data.user
        // 儲存 refresh token
        localStorage.setItem('refresh_token', response.data.refreshToken)
        return { success: true, message: '登入成功！' }
      } else {
        return { success: false, message: response.message || '登入失敗' }
      }
    } catch (error) {
      console.error('登入錯誤:', error)
      return { success: false, message: '登入失敗，請檢查您的帳戶資訊。' }
    } finally {
      isLoading.value = false
    }
  }

  // 用戶登出
  logout() {
    currentUser.value = null
    apiService.clearToken()
    localStorage.removeItem('refresh_token')
  }

  // 更新用戶資訊
  updateUserInfo(user: User) {
    currentUser.value = user
  }

  // 檢查認證狀態
  async checkAuth(): Promise<boolean> {
    try {
      const response = await apiService.verifyToken()
      if (response.success && response.data) {
        currentUser.value = response.data
        return true
      } else {
        this.logout()
        return false
      }
    } catch (error) {
      console.error('認證檢查失敗:', error)
      this.logout()
      return false
    }
  }

  // 刷新 token
  async refreshAuth(): Promise<boolean> {
    try {
      const response = await apiService.refreshToken()
      return response.success
    } catch (error) {
      console.error('Token 刷新失敗:', error)
      this.logout()
      return false
    }
  }
}

// 創建用戶服務實例
export const userService = new UserService() 