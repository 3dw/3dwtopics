<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h2 class="auth-title">{{ isLogin ? '登入' : '註冊' }}</h2>
          <p class="auth-subtitle">歡迎來到 3dw 自主學習平台</p>
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
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

const isLogin = ref(true)
const loading = ref(false)

const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  name: ''
})

const toggleMode = () => {
  isLogin.value = !isLogin.value
  // 清空表單
  form.email = ''
  form.password = ''
  form.confirmPassword = ''
  form.name = ''
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