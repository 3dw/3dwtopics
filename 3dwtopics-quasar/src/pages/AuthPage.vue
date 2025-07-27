<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h2 class="auth-title">{{ isLogin ? '登入' : '註冊' }}</h2>
          <p class="auth-subtitle">歡迎來到 3dw 自主學習平台</p>
          <p class="auth-subtitle-small">使用去中心化身份登入</p>
        </div>

        <!-- Google 登入按鈕 -->
        <div class="google-login-section">
          <q-btn
            @click="handleGoogleLogin"
            color="white"
            text-color="dark"
            size="lg"
            class="google-btn"
            :loading="googleLoading"
          >
            <q-icon name="img:https://developers.google.com/identity/images/g-logo.png" class="google-icon" />
            <span class="google-text">使用 Google 登入</span>
          </q-btn>
        </div>

        <div class="divider">
          <span>或</span>
        </div>

        <q-form @submit="handleSubmit" class="auth-form">
          <div class="form-group">
            <q-input
              v-model="form.email"
              label="電子郵件"
              type="email"
              outlined
              :rules="[val => !!val || '請輸入電子郵件']"
            />
          </div>

          <div class="form-group">
            <q-input
              v-model="form.password"
              label="密碼"
              type="password"
              outlined
              :rules="[val => !!val || '請輸入密碼']"
            />
          </div>

          <div v-if="!isLogin" class="form-group">
            <q-input
              v-model="form.confirmPassword"
              label="確認密碼"
              type="password"
              outlined
              :rules="[
                val => !!val || '請確認密碼',
                val => val === form.password || '密碼不一致'
              ]"
            />
          </div>

          <div v-if="!isLogin" class="form-group">
            <q-input
              v-model="form.name"
              label="姓名"
              outlined
              :rules="[val => !!val || '請輸入姓名']"
            />
          </div>

          <q-btn
            type="submit"
            color="primary"
            size="lg"
            class="submit-btn"
            :loading="loading"
          >
            {{ isLogin ? '登入' : '註冊' }}
          </q-btn>
        </q-form>

        <div class="auth-footer">
          <p>
            {{ isLogin ? '還沒有帳號？' : '已有帳號？' }}
            <a @click="toggleMode" class="toggle-link">
              {{ isLogin ? '立即註冊' : '立即登入' }}
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { authService } from '../services/auth'

const router = useRouter()
const route = useRoute()
const $q = useQuasar()

const isLogin = ref(true)
const loading = ref(false)
const googleLoading = ref(false)

const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  name: ''
})

// 檢查是否有 OAuth 回調
onMounted(async () => {
  const code = route.query.code as string
  if (code) {
    await handleOAuthCallback(code)
  }
})

const toggleMode = () => {
  isLogin.value = !isLogin.value
  // 清空表單
  form.email = ''
  form.password = ''
  form.confirmPassword = ''
  form.name = ''
}

const handleGoogleLogin = () => {
  googleLoading.value = true
  try {
    const authUrl = authService.startGoogleOAuth()
    window.location.href = authUrl
  } catch {
    $q.notify({
      type: 'negative',
      message: 'Google 登入失敗，請重試'
    })
  } finally {
    googleLoading.value = false
  }
}

const handleOAuthCallback = async (code: string) => {
  googleLoading.value = true
  try {
    const result = await authService.handleGoogleOAuthCallback(code)
    
    // 儲存 token
    authService.storeToken(result.token)
    
    $q.notify({
      type: 'positive',
      message: `歡迎回來，${result.user.displayName || result.user.email}!`
    })
    
    // 清除 URL 中的 code 參數
    void router.replace('/auth')
    
    // 跳轉到儀表板
    void router.push('/dashboard')
  } catch (error) {
    console.error('OAuth callback error:', error)
    $q.notify({
      type: 'negative',
      message: '登入失敗，請重試'
    })
  } finally {
    googleLoading.value = false
  }
}

const handleSubmit = async () => {
  loading.value = true
  
  try {
    if (isLogin.value) {
      // 模擬登入
      await new Promise(resolve => setTimeout(resolve, 1000))
      $q.notify({
        type: 'positive',
        message: '登入成功！'
      })
      await router.push('/dashboard')
    } else {
      // 模擬註冊
      await new Promise(resolve => setTimeout(resolve, 1000))
      $q.notify({
        type: 'positive',
        message: '註冊成功！'
      })
      isLogin.value = true
    }
  } catch {
    $q.notify({
      type: 'negative',
      message: '操作失敗，請重試'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.auth-container {
  width: 100%;
  max-width: 400px;
}

.auth-card {
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.auth-header {
  text-align: center;
  margin-bottom: 30px;
}

.auth-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.auth-subtitle {
  color: #666;
  font-size: 16px;
  margin-bottom: 4px;
}

.auth-subtitle-small {
  color: #888;
  font-size: 14px;
}

.google-login-section {
  margin-bottom: 20px;
}

.google-btn {
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.google-icon {
  width: 18px;
  height: 18px;
  margin-right: 8px;
}

.google-text {
  margin-left: 8px;
}

.divider {
  text-align: center;
  margin: 20px 0;
  position: relative;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #ddd;
}

.divider span {
  background: white;
  padding: 0 16px;
  color: #666;
  font-size: 14px;
}

.auth-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.submit-btn {
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 500;
}

.auth-footer {
  text-align: center;
  color: #666;
}

.toggle-link {
  color: #667eea;
  cursor: pointer;
  text-decoration: none;
}

.toggle-link:hover {
  text-decoration: underline;
}
</style> 