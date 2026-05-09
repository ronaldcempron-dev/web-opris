<!-- src/components/survey/SectionPresentStatus.vue -->
<template>
  <div>
    <div class="section-body">
      <!-- ── BLOCK: Present Location of OFW ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Present Location of OFW
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="option in locationOptions" :key="option">
            <div
              class="checkbox-card"
              :class="{ 'checkbox-card--selected': localData.presentLocation.includes(option) }"
              @click="toggleLocation(option)"
            >
              <v-checkbox
                v-model="localData.presentLocation"
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

      <!-- ── BLOCK: Current Employment Status (Abroad) ── -->
      <div v-if="localData.presentLocation.includes('Abroad')" class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Current Employment Status (Abroad)
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="option in abroadEmploymentOptions" :key="option">
            <div
              class="checkbox-card"
              :class="{
                'checkbox-card--selected': localData.abroadEmploymentStatus.includes(option),
              }"
              @click="toggleAbroadEmployment(option)"
            >
              <v-checkbox
                v-model="localData.abroadEmploymentStatus"
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

      <!-- ── BLOCK: Reason for Return ── -->
      <div
        v-if="
          localData.presentLocation.includes('Returned') ||
          localData.presentLocation.includes('Repatriated')
        "
        class="field-group"
      >
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Reason for Return / Repatriation
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="reason in returnReasons" :key="reason">
            <div
              class="checkbox-card"
              :class="{ 'checkbox-card--selected': localData.reasonForReturn.includes(reason) }"
              @click="toggleReturnReason(reason)"
            >
              <v-checkbox
                v-model="localData.reasonForReturn"
                :value="reason"
                hide-details
                density="compact"
                class="checkbox-inner"
                @click.stop
              >
                <template #label>
                  <span class="checkbox-label">{{ reason }}</span>
                </template>
              </v-checkbox>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Date of Return ── -->
      <div class="field-group">
        <v-row dense>
          <v-col cols="12" md="6">
            <div class="field-item">
              <label class="field-label">Date of Return / Repatriation (if applicable)</label>
              <v-text-field
                v-model="localData.dateOfReturn"
                type="date"
                variant="outlined"
                density="comfortable"
                hide-details
                class="modern-input"
                @update:modelValue="emitUpdate"
              />
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Current Livelihood ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Current Source of Livelihood / Income (After Return)
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="option in livelihoodSources" :key="option">
            <div
              class="checkbox-card"
              :class="{ 'checkbox-card--selected': localData.currentLivelihood.includes(option) }"
              @click="toggleLivelihood(option)"
            >
              <v-checkbox
                v-model="localData.currentLivelihood"
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

      <!-- ── BLOCK: Planning to Go Abroad Again ── -->
      <div class="field-group" style="margin-bottom: 0">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Is the OFW planning to go abroad again?
        </label>
        <v-row dense>
          <v-col cols="6" md="4">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.planningToGoAbroad === 'Yes' }"
              @click="selectPlanning('Yes')"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.planningToGoAbroad === 'Yes' }"
                />
                <span class="radio-label-text">Yes</span>
              </div>
            </div>
          </v-col>
          <v-col cols="6" md="4">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.planningToGoAbroad === 'No' }"
              @click="selectPlanning('No')"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.planningToGoAbroad === 'No' }"
                />
                <span class="radio-label-text">No</span>
              </div>
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

const locationOptions = [
  'Abroad',
  'In home province/municipality',
  'In another Philippine city/province',
  'Unknown',
  'Deceased',
]

const abroadEmploymentOptions = [
  'Employed and stable',
  'Employed but with issues',
  'No work / jobless',
  'Contract ending soon',
  'AWOL / undocumented',
  'In shelter / safe house',
  'Detained / in legal case',
  'Sick / hospitalized',
  'Other',
]

const returnReasons = [
  'Contract completed',
  'Vacation',
  'End of contract / non-renewal',
  'Termination / retrenchment',
  'Abuse / maltreatment',
  'Salary issues / non-payment',
  'Health condition',
  'Family emergency',
  'War / crisis / disaster',
  'Pregnancy / childcare',
  'Voluntary return',
  'Deportation / undocumented status',
  'Death of OFW (for family respondents)',
  'Other',
]

const livelihoodSources = [
  'None',
  'Wage employment',
  'Self-employed',
  'Small business',
  'Farming/Fishing',
  'Freelance / online work',
  'Dependent on family support',
  'Other',
]

const localData = ref({
  presentLocation: [],
  abroadEmploymentStatus: [],
  reasonForReturn: [],
  dateOfReturn: '',
  currentLivelihood: [],
  planningToGoAbroad: '',
  ...props.data,
})

watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })

// Toggle functions
const toggleLocation = (option) => {
  const idx = localData.value.presentLocation.indexOf(option)
  if (idx === -1) localData.value.presentLocation.push(option)
  else localData.value.presentLocation.splice(idx, 1)
  emitUpdate()
}

const toggleAbroadEmployment = (option) => {
  const idx = localData.value.abroadEmploymentStatus.indexOf(option)
  if (idx === -1) localData.value.abroadEmploymentStatus.push(option)
  else localData.value.abroadEmploymentStatus.splice(idx, 1)
  emitUpdate()
}

const toggleReturnReason = (reason) => {
  const idx = localData.value.reasonForReturn.indexOf(reason)
  if (idx === -1) localData.value.reasonForReturn.push(reason)
  else localData.value.reasonForReturn.splice(idx, 1)
  emitUpdate()
}

const toggleLivelihood = (option) => {
  const idx = localData.value.currentLivelihood.indexOf(option)
  if (idx === -1) localData.value.currentLivelihood.push(option)
  else localData.value.currentLivelihood.splice(idx, 1)
  emitUpdate()
}

const selectPlanning = (val) => {
  localData.value.planningToGoAbroad = val
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

/* Modern Input */
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
