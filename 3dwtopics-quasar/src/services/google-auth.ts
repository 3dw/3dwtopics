import type { GoogleUser } from './atproto'

export interface GoogleAuthConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
}

export class GoogleAuthService {
  private config: GoogleAuthConfig

  constructor(config: GoogleAuthConfig) {
    this.config = config
  }

  /**
   * 獲取 Google OAuth 授權 URL
   */
  getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'consent',
    })

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  }

  /**
   * 交換授權碼為訪問令牌
   */
  async exchangeCodeForToken(code: string): Promise<string> {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: this.config.redirectUri,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to exchange code for token')
    }

    const data = await response.json()
    return data.access_token
  }

  /**
   * 獲取 Google 用戶資料
   */
  async getUserInfo(accessToken: string): Promise<GoogleUser> {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to get user info')
    }

    const data = await response.json()
    
    return {
      email: data.email,
      name: data.name,
      picture: data.picture,
      sub: data.id,
    }
  }

  /**
   * 完整的 Google OAuth 流程
   */
  async handleOAuthCallback(code: string): Promise<GoogleUser> {
    const accessToken = await this.exchangeCodeForToken(code)
    return await this.getUserInfo(accessToken)
  }
}

// 創建全局實例（需要配置）
export const googleAuthService = new GoogleAuthService({
  clientId: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  redirectUri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:9000/auth/google/callback',
}) 