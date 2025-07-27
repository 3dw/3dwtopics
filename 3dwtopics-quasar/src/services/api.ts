// API 基礎配置
const API_BASE_URL = 'https://3dwonlincourses-backend.alearn13994229.workers.dev'
const API_VERSION = 'v1'

// API 響應介面
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// 用戶介面
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

// 用戶註冊請求
export interface RegisterRequest {
  email: string
  password: string
  name: string
}

// 用戶登入請求
export interface LoginRequest {
  email: string
  password: string
}

// 用戶登入響應
export interface LoginResponse {
  user: User
  token: string
  refreshToken: string
}

// 課程介面
export interface Course {
  id: string
  title: string
  description: string
  thumbnail?: string
  duration: number
  level: 'beginner' | 'intermediate' | 'advanced'
  category: string
  instructor: string
  price: number
  tags: string[]
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

// 學習進度介面
export interface Progress {
  id: string
  userId: string
  courseId: string
  progress: number // 0-100
  completedLessons: string[]
  lastAccessedAt: string
  createdAt: string
  updatedAt: string
}

// 更新進度請求
export interface UpdateProgressRequest {
  courseId: string
  progress: number
  completedLessons?: string[]
}

// API 服務類
export class ApiService {
  private baseURL: string
  private token: string | null = null

  constructor() {
    this.baseURL = `${API_BASE_URL}/api/${API_VERSION}`
    this.token = localStorage.getItem('auth_token')
  }

  // 設置認證 token
  setToken(token: string) {
    this.token = token
    localStorage.setItem('auth_token', token)
  }

  // 清除認證 token
  clearToken() {
    this.token = null
    localStorage.removeItem('auth_token')
  }

  // 獲取認證 headers
  private getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }
    
    return headers
  }

  // 通用請求方法
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers
      }
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}`)
      }

      return data
    } catch (error) {
      console.error('API 請求錯誤:', error)
      throw error
    }
  }

  // 用戶管理 API
  async register(userData: RegisterRequest): Promise<ApiResponse<User>> {
    return this.request<User>('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
  }

  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await this.request<LoginResponse>('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })

    if (response.success && response.data) {
      this.setToken(response.data.token)
    }

    return response
  }

  // 認證系統 API
  async verifyToken(): Promise<ApiResponse<User>> {
    return this.request<User>('/auth/verify')
  }

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    const refreshToken = localStorage.getItem('refresh_token')
    const response = await this.request<{ token: string }>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken })
    })

    if (response.success && response.data) {
      this.setToken(response.data.token)
    }

    return response
  }

  // 課程管理 API
  async getCourses(): Promise<ApiResponse<Course[]>> {
    return this.request<Course[]>('/courses')
  }

  async getCourse(id: string): Promise<ApiResponse<Course>> {
    return this.request<Course>(`/courses/${id}`)
  }

  // 學習進度 API
  async getProgress(): Promise<ApiResponse<Progress[]>> {
    return this.request<Progress[]>('/progress')
  }

  async updateProgress(progressData: UpdateProgressRequest): Promise<ApiResponse<Progress>> {
    return this.request<Progress>('/progress', {
      method: 'POST',
      body: JSON.stringify(progressData)
    })
  }
}

// 創建 API 服務實例
export const apiService = new ApiService() 