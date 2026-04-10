<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(
    '%c🚀 DMW OFW Survey System Ready!',
    'color:#1976D2; font-size:16px; font-weight:bold',
  )
})
</script>
