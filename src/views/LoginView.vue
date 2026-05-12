<template>
  <v-app theme="light" style="background: #eef2ff">
    <v-main class="login-main">
      <div class="login-card">
        <!-- Logos -->
        <div class="login-logos">
          <v-img src="/DMW Logo.png" width="56" height="56" contain />
          <v-img src="/BagongPilipinas.png" width="56" height="56" contain />
        </div>

        <!-- Title -->
        <div class="login-title-block">
          <h1 class="login-title">OPRIS</h1>
          <p class="login-sub">OFW Profiling &amp; Reintegration Information System</p>
          <p class="login-agency">Department of Migrant Workers — Caraga Region XIII</p>
        </div>

        <!-- Divider -->
        <div class="login-divider" />

        <!-- Email -->
        <div class="field-wrap">
          <label class="field-label">Email Address</label>
          <v-text-field
            v-model="email"
            type="email"
            placeholder="your@email.com"
            variant="outlined"
            density="comfortable"
            hide-details
            class="modern-input"
            :disabled="loading"
            autocomplete="email"
          />
        </div>

        <!-- Password -->
        <div class="field-wrap">
          <label class="field-label">Password</label>
          <v-text-field
            v-model="password"
            :type="showPw ? 'text' : 'password'"
            placeholder="••••••••"
            variant="outlined"
            density="comfortable"
            hide-details
            class="modern-input"
            :disabled="loading"
            autocomplete="current-password"
            :append-inner-icon="showPw ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            @click:append-inner="showPw = !showPw"
            @keyup.enter="handleLogin"
          />
        </div>

        <!-- Error -->
        <div v-if="errorMsg" class="error-box">
          <v-icon size="15" style="margin-right: 6px; flex-shrink: 0"
            >mdi-alert-circle-outline</v-icon
          >
          {{ errorMsg }}
        </div>

        <!-- Submit -->
        <button class="btn-login" :disabled="loading" @click="handleLogin">
          <v-icon size="16" style="margin-right: 8px" :class="{ spin: loading }">
            {{ loading ? 'mdi-loading' : 'mdi-login-variant' }}
          </v-icon>
          {{ loading ? 'Signing in…' : 'Sign In' }}
        </button>

        <!-- Footer note -->
        <p class="login-note">
          <v-icon size="13" style="margin-right: 4px; vertical-align: middle"
            >mdi-information-outline</v-icon
          >
          Contact your DMW supervisor to request an account.
        </p>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const showPw = ref(false)
const loading = ref(false)
const errorMsg = ref('')

const handleLogin = async () => {
  errorMsg.value = ''
  if (!email.value.trim() || !password.value) {
    errorMsg.value = 'Please enter your email and password.'
    return
  }
  loading.value = true
  try {
    const role = await auth.login(email.value.trim(), password.value)
    // Redirect based on role
    router.replace(role === 'admin' ? '/responses' : '/')
  } catch (err) {
    errorMsg.value = err.message?.includes('Invalid login')
      ? 'Incorrect email or password. Please try again.'
      : err.message || 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-main {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
}

.login-card {
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 48px rgba(29, 78, 216, 0.13);
  padding: 40px 36px 32px;
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.login-logos {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.login-title-block {
  text-align: center;
}

.login-title {
  font-size: 28px;
  font-weight: 900;
  color: #0f2a5e;
  letter-spacing: 1.5px;
  margin: 0 0 4px;
}

.login-sub {
  font-size: 13px;
  font-weight: 600;
  color: #2563eb;
  margin: 0 0 4px;
  line-height: 1.5;
}

.login-agency {
  font-size: 11px;
  color: #9ca3af;
  margin: 0;
}

.login-divider {
  height: 1px;
  background: #e8eef8;
  margin: 2px 0;
}

.field-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6b7fa8;
}

.modern-input :deep(.v-field) {
  border-radius: 10px;
  background: #f8faff;
  font-size: 14px;
}

.error-box {
  display: flex;
  align-items: center;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 13px;
  color: #b91c1c;
  line-height: 1.5;
}

.btn-login {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1d4ed8, #3b82f6);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 14px;
  font-size: 14px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.15s;
  margin-top: 4px;
}

.btn-login:hover:not(:disabled) {
  opacity: 0.88;
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-note {
  text-align: center;
  font-size: 11.5px;
  color: #9ca3af;
  margin: 4px 0 0;
}

.spin {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 480px) {
  .login-card {
    padding: 32px 20px 24px;
  }
}
</style>
