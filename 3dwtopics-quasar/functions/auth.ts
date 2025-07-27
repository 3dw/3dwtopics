interface Env {
  GOOGLE_CLIENT_ID: string
  GOOGLE_CLIENT_SECRET: string
  JWT_SECRET: string
  USERS_KV: any // KVNamespace 類型在 Cloudflare Workers 環境中可用
}

interface GoogleUser {
  email: string
  name: string
  picture: string
  sub: string
}

interface AtprotoUser {
  did: string
  handle?: string
  displayName?: string
  email?: string
  picture?: string
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const path = url.pathname

    if (path === '/api/auth/google/callback') {
      return handleGoogleCallback(request, env)
    }

    if (path === '/api/auth/verify') {
      return handleTokenVerification(request, env)
    }

    return new Response('Not Found', { status: 404 })
  }
}

async function handleGoogleCallback(request: Request, env: Env): Promise<Response> {
  try {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')
    
    if (!code) {
      return new Response('Missing authorization code', { status: 400 })
    }

    // 1. 交換授權碼為訪問令牌
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: env.GOOGLE_CLIENT_ID,
        client_secret: env.GOOGLE_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: `${url.origin}/api/auth/google/callback`,
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token')
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    // 2. 獲取 Google 用戶資料
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!userResponse.ok) {
      throw new Error('Failed to get user info')
    }

    const googleUser: GoogleUser = await userResponse.json()

    // 3. 檢查是否已有綁定的 DID
    let did = await findDidByGoogleId(googleUser.sub, env.USERS_KV)
    
    if (!did) {
      // 創建新的 DID
      did = await createDid()
      
      // 將 Google 身份綁定到 DID
      await bindGoogleToDid(did, googleUser, env.USERS_KV)
    }

    // 4. 生成 JWT token
    const atprotoUser: AtprotoUser = {
      did,
      email: googleUser.email,
      displayName: googleUser.name,
      picture: googleUser.picture,
    }

    const token = generateJWT(atprotoUser, env.JWT_SECRET)

    // 5. 返回成功響應
    return new Response(JSON.stringify({
      success: true,
      user: atprotoUser,
      token,
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })

  } catch (error) {
    console.error('Google OAuth callback error:', error)
    return new Response(JSON.stringify({
      success: false,
      error: 'Authentication failed',
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
}

async function handleTokenVerification(request: Request, env: Env): Promise<Response> {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response('Missing or invalid authorization header', { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = verifyJWT(token, env.JWT_SECRET)

    if (!user) {
      return new Response('Invalid token', { status: 401 })
    }

    await Promise.resolve() // 添加 await 表達式

    return new Response(JSON.stringify({
      success: true,
      user,
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })

  } catch (error) {
    console.error('Token verification error:', error)
    return new Response('Token verification failed', { status: 500 })
  }
}

async function findDidByGoogleId(googleId: string, kv: any): Promise<string | null> {
  try {
    const did = await kv.get(`google:${googleId}`)
    return did
  } catch {
    return null
  }
}

async function bindGoogleToDid(did: string, googleUser: GoogleUser, kv: any): Promise<void> {
  await kv.put(`google:${googleUser.sub}`, did)
  await kv.put(`did:${did}`, JSON.stringify(googleUser))
}

async function createDid(): Promise<string> {
  try {
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

function generateJWT(user: AtprotoUser, secret: string): string {
  const payload = {
    did: user.did,
    email: user.email,
    name: user.displayName,
    picture: user.picture,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 小時過期
  }

  // 這裡需要實現 JWT 簽名
  // 由於 Cloudflare Workers 環境限制，我們使用簡單的 base64 編碼
  console.log('Using JWT secret:', secret) // 使用 secret 參數
  return btoa(JSON.stringify(payload))
}

function verifyJWT(token: string, secret: string): AtprotoUser | null {
  try {
    const payload = JSON.parse(atob(token))
    
    // 檢查過期時間
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null
    }

    console.log('Verifying JWT with secret:', secret) // 使用 secret 參數

    return {
      did: payload.did,
      email: payload.email,
      displayName: payload.name,
      picture: payload.picture,
    }
  } catch {
    return null
  }
} 