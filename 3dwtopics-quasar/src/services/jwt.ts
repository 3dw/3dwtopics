import jwt from 'jsonwebtoken'
import type { AtprotoUser } from './atproto'

export interface JWTPayload {
  did: string
  email?: string | undefined
  name?: string | undefined
  picture?: string | undefined
  iat: number
  exp: number
}

export class JWTService {
  private secret: string

  constructor(secret: string) {
    this.secret = secret
  }

  /**
   * 生成 JWT token
   */
  generateToken(user: AtprotoUser): string {
    const payload: JWTPayload = {
      did: user.did,
      email: user.email,
      name: user.displayName,
      picture: user.picture,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 小時過期
    }

    return jwt.sign(payload, this.secret)
  }

  /**
   * 驗證 JWT token
   */
  verifyToken(token: string): JWTPayload | null {
    try {
      const decoded = jwt.verify(token, this.secret) as JWTPayload
      return decoded
    } catch (error) {
      console.error('JWT verification failed:', error)
      return null
    }
  }

  /**
   * 從 token 中提取用戶資料
   */
  extractUserFromToken(token: string): AtprotoUser | null {
    const payload = this.verifyToken(token)
    if (!payload) return null

    return {
      did: payload.did,
      email: payload.email,
      displayName: payload.name,
      picture: payload.picture,
    }
  }
}

// 創建全局實例
export const jwtService = new JWTService(process.env.JWT_SECRET || 'your-secret-key') 