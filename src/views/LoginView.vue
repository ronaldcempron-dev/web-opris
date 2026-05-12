<template>
  <v-app theme="light">
    <v-main class="login-main">
      <!-- Background image with blur overlay -->
      <div class="bg-image" />
      <div class="bg-overlay" />

      <!-- Card -->
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
          <v-icon size="15" style="margin-right: 6px; flex-shrink: 0">
            mdi-alert-circle-outline
          </v-icon>
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
          <v-icon size="13" style="margin-right: 4px; vertical-align: middle">
            mdi-information-outline
          </v-icon>
          Contact your DMW supervisor to request an account.
        </p>
      </div>

      <!-- Bottom badge -->
      <div class="bottom-badge">
        <v-icon size="13" style="margin-right: 5px; opacity: 0.7">mdi-shield-check-outline</v-icon>
        Department of Migrant Workers · Caraga Region XIII
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
/* ── LAYOUT ── */
.login-main {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  position: relative;
  overflow: hidden;
}

/* ── BACKGROUND IMAGE ── */
.bg-image {
  position: fixed;
  inset: 0;
  background: url('/DMW building.webp') center center / cover no-repeat;
  filter: blur(6px) brightness(0.55) saturate(1.2);
  transform: scale(1.08); /* prevents blur edges showing */
  z-index: 0;
}

/* ── GRADIENT OVERLAY on top of the blurred image ── */
.bg-overlay {
  position: fixed;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(15, 42, 94, 0.72) 0%,
    rgba(29, 78, 216, 0.55) 50%,
    rgba(15, 42, 94, 0.72) 100%
  );
  z-index: 1;
}

/* ── CARD ── */
.login-card {
  position: relative;
  z-index: 10;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 24px;
  box-shadow:
    0 24px 64px rgba(15, 42, 94, 0.35),
    0 4px 16px rgba(29, 78, 216, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  padding: 40px 36px 32px;
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* ── LOGOS ── */
.login-logos {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

/* ── TITLE BLOCK ── */
.login-title-block {
  text-align: center;
}

.login-title {
  font-size: 30px;
  font-weight: 900;
  color: #0f2a5e;
  letter-spacing: 2px;
  margin: 0 0 6px;
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
  color: #6b7fa8;
  margin: 0;
}

/* ── DIVIDER ── */
.login-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #dbeafe, transparent);
  margin: 2px 0;
}

/* ── FIELDS ── */
.field-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: #6b7fa8;
}

.modern-input :deep(.v-field) {
  border-radius: 10px;
  background: #f8faff;
  font-size: 14px;
}

.modern-input :deep(.v-field--focused) {
  background: #ffffff;
}

/* ── ERROR ── */
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

/* ── BUTTON ── */
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
  transition:
    opacity 0.15s,
    box-shadow 0.15s,
    transform 0.1s;
  margin-top: 4px;
  box-shadow: 0 4px 16px rgba(29, 78, 216, 0.35);
}

.btn-login:hover:not(:disabled) {
  opacity: 0.9;
  box-shadow: 0 6px 22px rgba(29, 78, 216, 0.45);
  transform: translateY(-1px);
}

.btn-login:active:not(:disabled) {
  transform: translateY(0);
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ── FOOTER NOTE ── */
.login-note {
  text-align: center;
  font-size: 11.5px;
  color: #9ca3af;
  margin: 4px 0 0;
}

/* ── BOTTOM BADGE ── */
.bottom-badge {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 99px;
  padding: 7px 18px;
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  white-space: nowrap;
  letter-spacing: 0.3px;
}

/* ── SPIN ANIMATION ── */
.spin {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ── MOBILE ── */
@media (max-width: 480px) {
  .login-card {
    padding: 32px 20px 24px;
  }
  .bottom-badge {
    font-size: 10px;
    padding: 6px 14px;
    bottom: 14px;
  }
}
</style>
