<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    width="300"
    :temporary="$vuetify.display.mobile"
    :permanent="!$vuetify.display.mobile"
    color="white"
    class="custom-sidebar"
  >
    <v-list nav density="compact">
      <v-list-item>
        <v-list-item-title class="text-h6 font-weight-bold text-primary">
          OFW Family Profiling
        </v-list-item-title>
      </v-list-item>
      <v-divider />

      <v-list-item
        prepend-icon="mdi-file-document-outline"
        title="Survey Form"
        :active="currentRoute === 'survey'"
        @click="goTo('/')"
      />
      <v-list-item
        prepend-icon="mdi-table-large"
        title="View Responses"
        :active="currentRoute === 'responses'"
        @click="goTo('/responses')"
      />

      <v-divider class="my-4" />

      <v-list-item v-if="showResponsesList">
        <v-list-item-title class="text-subtitle-1 font-weight-medium mb-2">
          Recent Responses
        </v-list-item-title>
      </v-list-item>

      <v-list-item
        v-for="response in responses"
        :key="response.id"
        v-if="showResponsesList"
        class="response-item"
        @click="selectResponse(response)"
      >
        <v-list-item-content>
          <v-list-item-title class="text-body-2">
            {{ response.respondent_name || 'Unnamed Respondent' }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-caption">
            {{ formatDate(response.created_at) }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '@/services/supabase'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const router = useRouter()
const route = useRoute()

const props = defineProps({
  modelValue: { type: Boolean, default: true },
  showResponsesList: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'select'])

const drawer = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const responses = ref([])

const fetchResponses = async () => {
  const { data } = await supabase
    .from('responses')
    .select('id, created_at, respondent_name')
    .order('created_at', { ascending: false })
    .limit(12)
  if (data) responses.value = data
}

onMounted(() => {
  if (props.showResponsesList) fetchResponses()
})

const currentRoute = computed(() => (route.path === '/responses' ? 'responses' : 'survey'))

const goTo = (path) => {
  router.push(path)
}

const selectResponse = (response) => {
  emit('select', response)
}

const formatDate = (date) =>
  new Date(date).toLocaleString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })
</script>

<style scoped>
.custom-sidebar {
  top: 52px !important;
  height: calc(100% - 52px) !important;
  z-index: 50 !important;
}

.response-item:hover {
  background-color: #f8fafc;
}

/* MOBILE */
@media (max-width: 768px) {
  .custom-sidebar {
    top: 52px !important;
    height: calc(100% - 52px) !important;
  }
}
</style>
