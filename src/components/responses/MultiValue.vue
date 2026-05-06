<template>
  <div v-if="values && values.length" class="mb-4">
    <div class="font-weight-medium mb-2">{{ label }}:</div>
    <div class="d-flex flex-wrap gap-2">
      <v-chip v-for="(item, i) in values" :key="i" size="small" color="primary" variant="tonal">
        {{ item }}
      </v-chip>
    </div>
  </div>
</template>

<script setup>
defineProps({ label: String, values: Array })
</script>
