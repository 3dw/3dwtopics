import { atprotoService, type AtprotoUser } from './atproto'
import { googleAuthService } from './google-auth'
import { jwtService } from './jwt'

export interface AuthResult {
  user: AtprotoUser
  token: string
}

export class AuthService {
  /**
   * 開始 Google OAuth 流程
   */
  startGoogleOAuth(): string {
    return googleAuthService.getAuthUrl()
  }

  /**
   * 處理 Google OAuth 回調
   */
  async handleGoogleOAuthCallback(code: string): Promise<AuthResult> {
    try {
      // 1. 通過 Google OAuth 獲取用戶資料
      const googleUser = await googleAuthService.handleOAuthCallback(code)
      
      // 2. 使用 ATProtocol 登入/創建 DID
      const atprotoUser = await atprotoService.loginWithGoogle(googleUser)
      
      // 3. 生成 JWT token
      const token = jwtService.generateToken(atprotoUser)
      
      return {
        user: atprotoUser,
        token,
      }
    } catch (error) {
      console.error('Google OAuth callback failed:', error)
      throw error
    }
  }

  /**
   * 驗證 JWT token
   */
  async verifyToken(token: string): Promise<AtprotoUser | null> {
    const result = jwtService.extractUserFromToken(token)
    await Promise.resolve() // 添加 await 表達式
    return result
  }

  /**
   * 檢查用戶是否已登入
   */
  async checkAuth(): Promise<AtprotoUser | null> {
    const token = this.getStoredToken()
    if (!token) return null
    
    return await this.verifyToken(token)
  }

  /**
   * 儲存 token 到 localStorage
   */
  storeToken(token: string): void {
    localStorage.setItem('auth_token', token)
  }

  /**
   * 從 localStorage 獲取 token
   */
  getStoredToken(): string | null {
    return localStorage.getItem('auth_token')
  }

  /**
   * 清除儲存的 token
   */
  clearToken(): void {
    localStorage.removeItem('auth_token')
  }

  /**
   * 登出
   */
  logout(): void {
    this.clearToken()
  }
}

// 創建全局實例
export const authService = new AuthService() 