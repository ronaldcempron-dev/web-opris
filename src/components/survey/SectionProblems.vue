<!-- src/components/survey/SectionProblems.vue -->
<template>
  <div>
    <div class="section-body">
      <!-- ── BLOCK: Major Problems Currently Faced ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          What are the major problems currently faced by the OFW/family?
        </label>
        <small class="text-grey-darken-1 mb-4 d-block" style="font-size: 12px">
          (Check all that apply)
        </small>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="problem in majorProblems" :key="problem">
            <div
              class="checkbox-card"
              :class="{ 'checkbox-card--selected': localData.majorProblems.includes(problem) }"
              @click="toggleMajorProblem(problem)"
            >
              <div class="check-card-inner">
                <div
                  class="check-box"
                  :class="{ 'check-box--selected': localData.majorProblems.includes(problem) }"
                >
                  <v-icon v-if="localData.majorProblems.includes(problem)" size="11" color="white"
                    >mdi-check</v-icon
                  >
                </div>
                <span class="checkbox-label">{{ problem }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Most Urgent Concern ── -->
      <div class="field-group">
        <div class="field-item">
          <label class="field-label">Which is the MOST urgent concern?</label>
          <v-text-field
            v-model="localData.mostUrgentConcern"
            placeholder="Describe the most pressing issue..."
            variant="outlined"
            density="comfortable"
            hide-details
            class="modern-input"
            @update:modelValue="emitUpdate"
          />
        </div>
      </div>

      <!-- ── BLOCK: Problems Due to Migration ── -->
      <div class="field-group" style="margin-bottom: 0">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Has the family experienced any of the following due to migration?
        </label>
        <small class="text-grey-darken-1 mb-4 d-block" style="font-size: 12px">
          (Check all that apply)
        </small>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="issue in migrationIssues" :key="issue">
            <div
              class="checkbox-card"
              :class="{ 'checkbox-card--selected': localData.migrationIssues.includes(issue) }"
              @click="toggleMigrationIssue(issue)"
            >
              <div class="check-card-inner">
                <div
                  class="check-box"
                  :class="{ 'check-box--selected': localData.migrationIssues.includes(issue) }"
                >
                  <v-icon v-if="localData.migrationIssues.includes(issue)" size="11" color="white"
                    >mdi-check</v-icon
                  >
                </div>
                <span class="checkbox-label">{{ issue }}</span>
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

const majorProblems = [
  'Loss of income / no remittance',
  'Unemployment after return',
  'Debt burden',
  'Health problems',
  'Family conflict / marital issues',
  'Child care / parental absence concerns',
  'Education expenses',
  'Housing problems',
  'Legal/documentation issues',
  'Abuse / exploitation case',
  'Illegal recruitment concern',
  'Human trafficking concern',
  'Contract violation / unpaid wages',
  'Mental health / emotional distress',
  'No livelihood capital',
  'No local job opportunities',
  'Reintegration difficulties',
  'Other',
]

const migrationIssues = [
  'Separation-related emotional distress',
  'Child neglect concerns',
  'Family disintegration / marital strain',
  'Financial mismanagement of remittances',
  'Dependency on remittances',
  'Return without savings',
  'Traumatic return/repatriation',
  'Community stigma / discrimination',
  'Other',
]

const localData = ref({
  majorProblems: [],
  mostUrgentConcern: '',
  migrationIssues: [],
  ...props.data,
})

watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })

const toggleMajorProblem = (problem) => {
  const idx = localData.value.majorProblems.indexOf(problem)
  if (idx === -1) localData.value.majorProblems.push(problem)
  else localData.value.majorProblems.splice(idx, 1)
  emitUpdate()
}

const toggleMigrationIssue = (issue) => {
  const idx = localData.value.migrationIssues.indexOf(issue)
  if (idx === -1) localData.value.migrationIssues.push(issue)
  else localData.value.migrationIssues.splice(idx, 1)
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

/* Custom Checkbox Style */
.check-card-inner {
  display: flex;
  align-items: center;
  gap: 10px;
}
.check-box {
  width: 14px;
  height: 14px;
  border-radius: 3px;
  border: 2px solid #d1d5db;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.14s;
}
.check-box--selected {
  border-color: #3b82f6;
  background: #3b82f6;
}

/* Mobile */
@media (max-width: 480px) {
  .section-body {
    padding: 14px 14px 18px;
  }
}
</style>
