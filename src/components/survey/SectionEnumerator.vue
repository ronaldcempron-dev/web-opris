<!-- src/components/survey/SectionEnumerator.vue -->
<template>
  <div>
    <div class="section-body">
      <!-- ── BLOCK: Overall Socio-Economic Status ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Overall Socio-Economic Status (Based on Observation)
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="status in socioEconomicOptions" :key="status">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.socioEconomicStatus === status }"
              @click="selectSocioEconomic(status)"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.socioEconomicStatus === status }"
                />
                <span class="radio-label-text">{{ status }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Housing Condition ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Observed Housing / Environment Condition
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="3" v-for="condition in housingOptions" :key="condition">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.housingCondition === condition }"
              @click="selectHousingCondition(condition)"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.housingCondition === condition }"
                />
                <span class="radio-label-text">{{ condition }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Family Functioning ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Family Functioning (Based on Interview)
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="3" v-for="status in familyFunctioningOptions" :key="status">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.familyFunctioning === status }"
              @click="selectFamilyFunctioning(status)"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.familyFunctioning === status }"
                />
                <span class="radio-label-text">{{ status }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Recommended Interventions ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Recommended Intervention(s)
        </label>
        <v-row dense>
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="intervention in recommendedInterventions"
            :key="intervention"
          >
            <div
              class="checkbox-card"
              :class="{
                'checkbox-card--selected':
                  localData.recommendedInterventions.includes(intervention),
              }"
              @click="toggleIntervention(intervention)"
            >
              <v-checkbox
                v-model="localData.recommendedInterventions"
                :value="intervention"
                hide-details
                density="compact"
                class="checkbox-inner"
                @click.stop
              >
                <template #label>
                  <span class="checkbox-label">{{ intervention }}</span>
                </template>
              </v-checkbox>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Follow-up ── -->
      <div class="field-group">
        <div
          class="checkbox-card"
          style="max-width: fit-content"
          :class="{ 'checkbox-card--selected': localData.needsFollowUp }"
          @click="toggleFollowUp"
        >
          <v-checkbox
            v-model="localData.needsFollowUp"
            hide-details
            density="compact"
            class="checkbox-inner"
            @click.stop
          >
            <template #label>
              <span class="checkbox-label">Needs Follow-up Visit</span>
            </template>
          </v-checkbox>
        </div>
      </div>

      <!-- ── BLOCK: Narrative Remarks ── -->
      <div class="field-group" style="margin-bottom: 0">
        <div class="field-item">
          <label class="field-label">Narrative Assessment / Remarks of Enumerator</label>
          <v-textarea
            v-model="localData.narrativeRemarks"
            variant="outlined"
            density="comfortable"
            rows="5"
            placeholder="Write your observations, key insights, additional notes, or specific recommendations here..."
            class="modern-input"
            @update:modelValue="emitUpdate"
          />
        </div>
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

const socioEconomicOptions = [
  'Indigent / highly vulnerable',
  'Low income / vulnerable',
  'Lower middle income',
  'Middle income',
  'Better-off',
]

const housingOptions = ['Good', 'Fair', 'Poor', 'Hazard-prone']
const familyFunctioningOptions = [
  'Stable',
  'Needs support',
  'At risk / fragile',
  'Crisis situation',
]

const recommendedInterventions = [
  'Immediate welfare assistance',
  'Case management / referral',
  'Psychosocial support',
  'Livelihood assistance',
  'Employment facilitation',
  'Skills training',
  'Financial literacy',
  'Educational assistance',
  'Medical assistance',
  'Legal assistance',
  'Reintegration planning',
  'Follow-up visit',
  'Other',
]

const localData = ref({
  socioEconomicStatus: '',
  housingCondition: '',
  familyFunctioning: '',
  recommendedInterventions: [],
  needsFollowUp: false,
  narrativeRemarks: '',
  ...props.data,
})

watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })

// Handlers
const selectSocioEconomic = (val) => {
  localData.value.socioEconomicStatus = val
  emitUpdate()
}
const selectHousingCondition = (val) => {
  localData.value.housingCondition = val
  emitUpdate()
}
const selectFamilyFunctioning = (val) => {
  localData.value.familyFunctioning = val
  emitUpdate()
}

const toggleIntervention = (item) => {
  const idx = localData.value.recommendedInterventions.indexOf(item)
  if (idx === -1) localData.value.recommendedInterventions.push(item)
  else localData.value.recommendedInterventions.splice(idx, 1)
  emitUpdate()
}

const toggleFollowUp = () => {
  localData.value.needsFollowUp = !localData.value.needsFollowUp
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
