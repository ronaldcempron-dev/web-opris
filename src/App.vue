<template>
  <v-app>
    <v-main>
      <!-- Spinner while we check the session -->
      <div v-if="!authReady" class="splash">
        <v-progress-circular indeterminate color="primary" size="48" />
        <p class="splash-label">Loading OPRIS…</p>
      </div>
      <router-view v-else />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const authReady = ref(false)

onMounted(async () => {
  await auth.init()
  authReady.value = true
})
</script>

<style scoped>
.splash {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: #f0f4ff;
}
.splash-label {
  font-size: 13px;
  color: #6b7fa8;
  font-weight: 600;
}
</style>
