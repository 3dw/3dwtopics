import { BskyAgent } from '@atproto/api'

export interface AtprotoUser {
  did: string
  handle?: string | undefined
  displayName?: string | undefined
  email?: string | undefined
  picture?: string | undefined
}

export interface GoogleUser {
  email: string
  name: string
  picture: string
  sub: string // Google user ID
}

export interface AtprotoProfile {
  handle?: string | undefined
  displayName?: string | undefined
}

export class AtprotoService {
  private agent: BskyAgent
  private pdsUrl: string

  constructor(pdsUrl: string = 'https://bsky.social') {
    this.pdsUrl = pdsUrl
    this.agent = new BskyAgent({ service: pdsUrl })
  }

  /**
   * 創建新的 DID
   */
  async createDid(): Promise<string> {
    try {
      // 使用 PLC (Public Ledger of Credentials) 方法創建 DID
      const response = await fetch('https://plc.directory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'plc_operation',
          rotationKeys: [],
          verificationMethods: {},
          alsoKnownAs: [],
          services: {},
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create DID')
      }

      const data = await response.json()
      return data.did
    } catch (error) {
      console.error('Error creating DID:', error)
      throw error
    }
  }

  /**
   * 檢查 DID 是否存在
   */
  async checkDidExists(did: string): Promise<boolean> {
    try {
      const response = await fetch(`https://plc.directory/${did}`)
      return response.ok
    } catch {
      return false
    }
  }

  /**
   * 通過 Google OAuth 登入並創建/綁定 DID
   */
  async loginWithGoogle(googleUser: GoogleUser): Promise<AtprotoUser> {
    try {
      // 檢查是否已有綁定的 DID
      let did = await this.findDidByGoogleId(googleUser.sub)
      
      if (!did) {
        // 創建新的 DID
        did = await this.createDid()
        
        // 將 Google 身份綁定到 DID
        await this.bindGoogleToDid(did, googleUser)
      }

      // 獲取用戶資料
      const profile = await this.getProfile(did)

      return {
        did,
        handle: profile.handle,
        displayName: profile.displayName,
        email: googleUser.email,
        picture: googleUser.picture,
      }
    } catch (error) {
      console.error('Error in Google login:', error)
      throw error
    }
  }

  /**
   * 通過 Google ID 查找 DID
   */
  private async findDidByGoogleId(googleId: string): Promise<string | null> {
    // 這裡需要實現查找邏輯
    // 可以存儲在 KV 或 D1 中
    // 暫時返回 null，表示需要創建新的 DID
    await Promise.resolve() // 添加 await 表達式
    console.log(`Looking for DID with Google ID: ${googleId}`)
    return null
  }

  /**
   * 將 Google 身份綁定到 DID
   */
  private async bindGoogleToDid(did: string, googleUser: GoogleUser): Promise<void> {
    // 這裡需要實現綁定邏輯
    // 可以存儲在 KV 或 D1 中
    await Promise.resolve() // 添加 await 表達式
    console.log(`Binding Google user ${googleUser.sub} to DID ${did}`)
  }

  /**
   * 獲取用戶資料
   */
  private async getProfile(did: string): Promise<AtprotoProfile> {
    try {
      const response = await this.agent.api.app.bsky.actor.getProfile({
        actor: did,
      })
      return response.data
    } catch (error) {
      console.error('Error getting profile:', error)
      return {
        handle: undefined,
        displayName: undefined,
      }
    }
  }

  /**
   * 驗證 JWT token
   */
  async verifyToken(token: string): Promise<AtprotoUser | null> {
    try {
      // 這裡需要實現 JWT 驗證邏輯
      // 暫時返回 null
      await Promise.resolve() // 添加 await 表達式
      console.log(`Verifying token: ${token}`)
      return null
    } catch (error) {
      console.error('Error verifying token:', error)
      return null
    }
  }
}

// 創建全局實例
export const atprotoService = new AtprotoService() 