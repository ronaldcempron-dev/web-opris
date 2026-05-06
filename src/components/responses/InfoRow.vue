<template>
  <v-col cols="12" md="6" class="py-2">
    <strong>{{ label }}:</strong>
    <span class="text-grey-darken-2">{{ value || '—' }}</span>
  </v-col>
</template>

<script setup>
defineProps({
  label: String,
  value: [String, Number, Array],
})
</script>
