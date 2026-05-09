<!-- src/components/survey/SectionReintegration.vue -->
<template>
  <div>
    <div class="section-body">
      <!-- ── BLOCK: Reintegration Plan ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Does the returned OFW currently have a reintegration plan?
        </label>
        <v-row dense>
          <v-col cols="6" md="4" v-for="option in ['Yes', 'No', 'In progress']" :key="option">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.hasReintegrationPlan === option }"
              @click="selectReintegrationPlan(option)"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.hasReintegrationPlan === option }"
                />
                <span class="radio-label-text">{{ option }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Preferred Reintegration Type ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Type of Reintegration Preferred
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="option in reintegrationTypes" :key="option">
            <div
              class="checkbox-card"
              :class="{
                'checkbox-card--selected': localData.preferredReintegrationType.includes(option),
              }"
              @click="toggleReintegrationType(option)"
            >
              <v-checkbox
                v-model="localData.preferredReintegrationType"
                :value="option"
                hide-details
                density="compact"
                class="checkbox-inner"
                @click.stop
              >
                <template #label>
                  <span class="checkbox-label">{{ option }}</span>
                </template>
              </v-checkbox>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Started Livelihood ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Has the OFW started any livelihood/business after return?
        </label>
        <v-row dense>
          <v-col cols="6" md="3">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.hasStartedLivelihood === 'Yes' }"
              @click="selectLivelihoodStatus('Yes')"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.hasStartedLivelihood === 'Yes' }"
                />
                <span class="radio-label-text">Yes</span>
              </div>
            </div>
          </v-col>
          <v-col cols="6" md="3">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.hasStartedLivelihood === 'No' }"
              @click="selectLivelihoodStatus('No')"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.hasStartedLivelihood === 'No' }"
                />
                <span class="radio-label-text">No</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- Conditional Livelihood Details -->
      <div v-if="localData.hasStartedLivelihood === 'Yes'" class="field-group">
        <v-row dense>
          <v-col cols="12" md="8">
            <div class="field-item">
              <label class="field-label">Type of Livelihood / Business</label>
              <v-text-field
                v-model="localData.livelihoodType"
                placeholder="e.g. Sari-sari store, Poultry raising, Online selling"
                variant="outlined"
                density="comfortable"
                hide-details
                class="modern-input"
                @update:modelValue="emitUpdate"
              />
            </div>
          </v-col>
        </v-row>

        <div class="mt-6">
          <label class="field-label" style="display: block; margin-bottom: 10px">
            Status of Livelihood / Business
          </label>
          <v-row dense>
            <v-col cols="12" sm="6" md="4" v-for="status in livelihoodStatuses" :key="status">
              <div
                class="checkbox-card"
                :class="{ 'checkbox-card--selected': localData.livelihoodStatus.includes(status) }"
                @click="toggleLivelihoodStatus(status)"
              >
                <v-checkbox
                  v-model="localData.livelihoodStatus"
                  :value="status"
                  hide-details
                  density="compact"
                  class="checkbox-inner"
                  @click.stop
                >
                  <template #label>
                    <span class="checkbox-label">{{ status }}</span>
                  </template>
                </v-checkbox>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>

      <!-- ── BLOCK: Main Barriers to Reintegration ── -->
      <div class="field-group" style="margin-bottom: 0">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Main Barriers to Reintegration
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="barrier in barriers" :key="barrier">
            <div
              class="checkbox-card"
              :class="{ 'checkbox-card--selected': localData.mainBarriers.includes(barrier) }"
              @click="toggleBarrier(barrier)"
            >
              <v-checkbox
                v-model="localData.mainBarriers"
                :value="barrier"
                hide-details
                density="compact"
                class="checkbox-inner"
                @click.stop
              >
                <template #label>
                  <span class="checkbox-label">{{ barrier }}</span>
                </template>
              </v-checkbox>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  data: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['update:data'])

const reintegrationTypes = [
  'Local employment',
  'Entrepreneurship / business',
  'Agriculture / agribusiness',
  'Skills upgrading / retooling',
  'Cooperative / group enterprise',
  'Further studies / certification',
  'Re-migration / overseas employment',
  'Other',
]

const livelihoodStatuses = [
  'Operating well',
  'Operating but struggling',
  'Stopped / closed',
  'Seasonal / irregular',
]

const barriers = [
  'Lack of capital',
  'Lack of market access',
  'Lack of business skills',
  'Lack of local jobs',
  'Health issues',
  'Family obligations',
  'Debt',
  'Lack of confidence / psychosocial stress',
  'Documentation / legal issues',
  'Other',
]

const localData = ref({
  hasReintegrationPlan: '',
  preferredReintegrationType: [],
  hasStartedLivelihood: '',
  livelihoodType: '',
  livelihoodStatus: [],
  mainBarriers: [],
  ...props.data,
})

watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })

// Toggle & Select Handlers
const selectReintegrationPlan = (val) => {
  localData.value.hasReintegrationPlan = val
  emitUpdate()
}

const toggleReintegrationType = (option) => {
  const idx = localData.value.preferredReintegrationType.indexOf(option)
  if (idx === -1) localData.value.preferredReintegrationType.push(option)
  else localData.value.preferredReintegrationType.splice(idx, 1)
  emitUpdate()
}

const selectLivelihoodStatus = (val) => {
  localData.value.hasStartedLivelihood = val
  if (val === 'No') {
    localData.value.livelihoodType = ''
    localData.value.livelihoodStatus = []
  }
  emitUpdate()
}

const toggleLivelihoodStatus = (status) => {
  const idx = localData.value.livelihoodStatus.indexOf(status)
  if (idx === -1) localData.value.livelihoodStatus.push(status)
  else localData.value.livelihoodStatus.splice(idx, 1)
  emitUpdate()
}

const toggleBarrier = (barrier) => {
  const idx = localData.value.mainBarriers.indexOf(barrier)
  if (idx === -1) localData.value.mainBarriers.push(barrier)
  else localData.value.mainBarriers.splice(idx, 1)
  emitUpdate()
}
</script>

<style scoped>
.section-body {
  padding: 10px 24px 24px;
}

.field-group {
  margin-bottom: 14px;
}

.field-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: 100%;
}

.field-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6b7fa8;
  line-height: 1.4;
}

.modern-input :deep(.v-field) {
  border-radius: 10px;
  background: #f8faff;
  border-color: #e2e8f0;
  font-size: 13.5px;
  color: #111827;
}

.modern-input :deep(.v-field--focused) {
  border-color: #3b82f6;
  background: #ffffff;
}

/* Radio & Checkbox Cards */
.radio-card,
.checkbox-card {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 10px 14px;
  margin-bottom: 6px;
  cursor: pointer;
  transition:
    border-color 0.14s,
    background 0.14s;
  background: #ffffff;
}

.radio-card:hover,
.checkbox-card:hover {
  border-color: #93c5fd;
  background: #f8faff;
}

.radio-card--selected,
.checkbox-card--selected {
  border-color: #3b82f6;
  background: #eff6ff;
}

.radio-card-inner {
  display: flex;
  align-items: center;
  gap: 10px;
}

.radio-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #d1d5db;
  flex-shrink: 0;
  background: #ffffff;
}

.radio-dot--selected {
  border-color: #3b82f6;
  background: #3b82f6;
  box-shadow: inset 0 0 0 2px #ffffff;
}

.radio-label-text,
.checkbox-label {
  font-size: 13px;
  color: #111827;
}

.radio-card--selected .radio-label-text,
.checkbox-card--selected .checkbox-label {
  color: #1d4ed8;
  font-weight: 600;
}

/* Mobile */
@media (max-width: 480px) {
  .section-body {
    padding: 14px 14px 18px;
  }
}
</style>
