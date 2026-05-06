<template>
  <div class="report-detail">
    <v-card class="mb-8" color="primary" dark>
      <v-card-text class="pa-7">
        <div class="d-flex align-center">
          <v-avatar size="80" class="mr-6">
            <v-icon size="48">mdi-account-circle</v-icon>
          </v-avatar>
          <div>
            <div class="text-h4 font-weight-bold">
              {{ response.respondent_name || 'Unnamed Respondent' }}
            </div>
            <div class="text-body-1 opacity-90 mt-1">
              Submitted on {{ formatDate(response.created_at) }}
            </div>
            <div class="text-body-2 opacity-75">
              📍 {{ response.latitude?.toFixed(5) }}, {{ response.longitude?.toFixed(5) }}
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <!-- Sections in Order -->
    <div v-for="section in orderedSections" :key="section.key" class="mb-6">
      <v-card variant="outlined">
        <v-card-title class="font-weight-medium bg-grey-lighten-4">
          <v-icon color="primary" class="mr-2">{{ section.icon }}</v-icon>
          {{ section.title }}
        </v-card-title>
        <v-card-text class="pa-6">
          <div
            v-for="(value, field) in section.data"
            :key="field"
            class="d-flex py-3 border-bottom"
          >
            <div class="font-weight-medium" style="width: 280px; flex-shrink: 0">
              {{ formatLabel(field) }}:
            </div>
            <div class="flex-grow-1 text-grey-darken-2">
              {{ formatValue(value) }}
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({ response: { type: Object, required: true } })

const answers = computed(() => props.response?.answers || {})

const sectionOrder = [
  { key: 'general', title: 'I. General Information', icon: 'mdi-home' },
  { key: 'respondent', title: 'II. Respondent Identification', icon: 'mdi-account' },
  { key: 'household', title: 'III. Household Demographic Profile', icon: 'mdi-home-group' },
  { key: 'ofwProfile', title: 'IV. OFW Profile', icon: 'mdi-airplane' },
  { key: 'migration', title: 'V. Migration History', icon: 'mdi-map-marker-path' },
  { key: 'presentStatus', title: 'VI. Present Status', icon: 'mdi-update' },
  { key: 'socioEconomic', title: 'VII. Socio-Economic Profile', icon: 'mdi-cash-multiple' },
  { key: 'livelihood', title: 'VIII. Livelihood Status', icon: 'mdi-briefcase' },
  { key: 'education', title: 'IX. Education Status', icon: 'mdi-school' },
  { key: 'health', title: 'X. Health & Psychosocial', icon: 'mdi-heart-pulse' },
  { key: 'assistance', title: 'XI. Social Protection', icon: 'mdi-shield-check' },
  { key: 'problems', title: 'XII. Problems & Issues', icon: 'mdi-alert-circle' },
  { key: 'reintegration', title: 'XIII. Reintegration', icon: 'mdi-rocket-launch' },
  { key: 'needs', title: 'XIV. Needs & Assistance', icon: 'mdi-hand-extended' },
  { key: 'risk', title: 'XV. Risk Screening', icon: 'mdi-alert' },
  { key: 'community', title: 'XVI. Community', icon: 'mdi-account-group' },
  { key: 'financial', title: 'XVII. Financial Literacy', icon: 'mdi-chart-line' },
  { key: 'openEnded', title: 'XVIII. Open-Ended', icon: 'mdi-text-box' },
  { key: 'enumerator', title: "XIX. Enumerator's Assessment", icon: 'mdi-clipboard-check' },
]

const orderedSections = computed(() => {
  return sectionOrder
    .map((s) => ({ ...s, data: answers.value[s.key] }))
    .filter((s) => s.data && Object.keys(s.data).length > 0)
})

const formatDate = (date) => new Date(date).toLocaleString('en-PH')
const formatLabel = (key) =>
  key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())
const formatValue = (value) => {
  if (value === null || value === undefined || value === '') return '—'
  if (Array.isArray(value)) return value.length ? value.join(', ') : 'None'
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  return value
}
</script>

<style scoped>
.report-detail .v-card-text {
  line-height: 1.7;
}
.border-bottom {
  border-bottom: 1px solid #eeeeee;
}
</style>
