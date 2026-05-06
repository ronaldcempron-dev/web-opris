<template>
  <v-navigation-drawer
    :model-value="modelValue"
    @update:model-value="(val) => emit('update:modelValue', val)"
    app
    width="300"
  >
    <v-list nav>
      <v-list-item>
        <v-list-item-title class="text-h6 font-weight-bold">Survey Responses</v-list-item-title>
      </v-list-item>
      <v-divider />
      <v-list-item
        v-for="response in responses"
        :key="response.id"
        @click="selectResponse(response)"
        class="response-list-item"
      >
        <v-list-item-content>
          <v-list-item-title>{{ response.respondent_name || 'No Name' }}</v-list-item-title>
          <v-list-item-subtitle>{{ formatDate(response.created_at) }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { supabase } from '@/services/supabase'

const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue', 'select'])

const responses = ref([])
const fetchResponses = async () => {
  const { data, error } = await supabase
    .from('responses')
    .select('id, created_at, respondent_name')
    .order('created_at', { ascending: false })
  if (!error) responses.value = data
}
onMounted(fetchResponses)

const selectResponse = (response) => {
  emit('select', response)
}

const formatDate = (date) => {
  return new Date(date).toLocaleString()
}

// No need to sync local state, handled by parent
</script>

<style scoped>
.response-list-item {
  cursor: pointer;
}
.response-list-item:hover {
  background: #f1f5f9;
}
</style>
