<!-- src/components/survey/SectionLivelihood.vue -->
<template>
  <div>
    <div class="section-body">
      <!-- ── BLOCK: Household Employment Numbers ── -->
      <div class="field-group">
        <v-row dense>
          <v-col cols="12" md="4">
            <div class="field-item">
              <label class="field-label">Employed Household Members (excluding OFW)</label>
              <v-text-field
                v-model.number="localData.employedMembers"
                type="number"
                placeholder="0"
                variant="outlined"
                density="comfortable"
                hide-details
                class="modern-input"
                @update:modelValue="emitUpdate"
              />
            </div>
          </v-col>

          <v-col cols="12" md="4">
            <div class="field-item">
              <label class="field-label">Unemployed Household Members</label>
              <v-text-field
                v-model.number="localData.unemployedMembers"
                type="number"
                placeholder="0"
                variant="outlined"
                density="comfortable"
                hide-details
                class="modern-input"
                @update:modelValue="emitUpdate"
              />
            </div>
          </v-col>

          <v-col cols="12" md="4">
            <div class="field-item">
              <label class="field-label">Underemployed Household Members</label>
              <v-text-field
                v-model.number="localData.underemployedMembers"
                type="number"
                placeholder="0"
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

      <!-- ── BLOCK: Main Local Occupations ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Main Local Occupations of Household Members
        </label>
        <div class="check-grid">
          <div
            v-for="option in occupationOptions"
            :key="option"
            class="checkbox-card"
            :class="{ 'checkbox-card--selected': localData.mainOccupations.includes(option) }"
            @click.stop="toggleOccupation(option)"
          >
            <div class="check-card-inner">
              <div
                class="check-box"
                :class="{ 'check-box--selected': localData.mainOccupations.includes(option) }"
              />
              <span class="checkbox-label">{{ option }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── BLOCK: Interest in Local Livelihood ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Are household members interested in local livelihood or employment?
        </label>
        <v-row dense>
          <v-col cols="6" md="3">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.interestedInLivelihood === 'Yes' }"
              @click="selectInterest('Yes')"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.interestedInLivelihood === 'Yes' }"
                />
                <span class="radio-label-text">Yes</span>
              </div>
            </div>
          </v-col>
          <v-col cols="6" md="3">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.interestedInLivelihood === 'No' }"
              @click="selectInterest('No')"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.interestedInLivelihood === 'No' }"
                />
                <span class="radio-label-text">No</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Preferred Livelihood Options ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Preferred Livelihood / Enterprise Options
        </label>
        <div class="check-grid">
          <div
            v-for="option in preferredLivelihoods"
            :key="option"
            class="checkbox-card"
            :class="{ 'checkbox-card--selected': localData.preferredLivelihood.includes(option) }"
            @click.stop="togglePreferredLivelihood(option)"
          >
            <div class="check-card-inner">
              <div
                class="check-box"
                :class="{ 'check-box--selected': localData.preferredLivelihood.includes(option) }"
              />
              <span class="checkbox-label">{{ option }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── BLOCK: Skills Training ── -->
      <div class="field-group" style="margin-bottom: 0">
        <div class="field-item">
          <label class="field-label">Skills Training Needed by Family Members</label>
          <v-textarea
            v-model="localData.skillsTrainingNeeded"
            placeholder="e.g. TESDA courses, business management, digital skills, sewing, etc."
            variant="outlined"
            density="comfortable"
            hide-details
            rows="3"
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

const occupationOptions = [
  'Farming',
  'Fishing',
  'Labor / construction',
  'Vendor / small business',
  'Government employee',
  'Private employee',
  'Driver / transport',
  'Domestic work',
  'Freelance / online work',
  'None',
  'Other',
]

const preferredLivelihoods = [
  'Sari-sari store',
  'Food processing / catering',
  'Livestock / poultry',
  'Crop production / gardening',
  'Fishing-related livelihood',
  'Sewing / dressmaking',
  'Beauty / wellness services',
  'Online selling',
  'Transport service',
  'Handicrafts',
  'Other',
]

const localData = ref({
  employedMembers: null,
  unemployedMembers: null,
  underemployedMembers: null,
  mainOccupations: [],
  interestedInLivelihood: '',
  preferredLivelihood: [],
  skillsTrainingNeeded: '',
  ...props.data,
})

watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })
const emitUpdate = () => emit('update:data', { ...localData.value })

const toggleOccupation = (option) => {
  const idx = localData.value.mainOccupations.indexOf(option)
  if (idx === -1) localData.value.mainOccupations.push(option)
  else localData.value.mainOccupations.splice(idx, 1)
  emitUpdate()
}

const togglePreferredLivelihood = (option) => {
  const idx = localData.value.preferredLivelihood.indexOf(option)
  if (idx === -1) localData.value.preferredLivelihood.push(option)
  else localData.value.preferredLivelihood.splice(idx, 1)
  emitUpdate()
}

const selectInterest = (val) => {
  localData.value.interestedInLivelihood = val
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

/* ── Modern Input ── */
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

/* ── Radio Cards ── */
.radio-card {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 10px 14px;
  margin-bottom: 6px;
  cursor: pointer;
  transition:
    border-color 0.14s,
    background 0.14s;
  background: #ffffff;
  user-select: none;
  -webkit-user-select: none;
}
.radio-card:hover {
  border-color: #93c5fd;
  background: #f8faff;
}
.radio-card--selected {
  border-color: #3b82f6;
  background: #eff6ff;
}
.radio-card-inner {
  display: flex;
  align-items: center;
  gap: 10px;
  pointer-events: none;
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
.radio-label-text {
  font-size: 13px;
  color: #111827;
}
.radio-card--selected .radio-label-text {
  color: #1d4ed8;
  font-weight: 600;
}

/* ── Checkbox Grid ── */
.check-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 6px;
}

/* ── Checkbox Cards ── */
.checkbox-card {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 10px 14px;
  cursor: pointer;
  transition:
    border-color 0.14s,
    background 0.14s;
  background: #ffffff;
  user-select: none;
  -webkit-user-select: none;
}
.checkbox-card:hover {
  border-color: #93c5fd;
  background: #f8faff;
}
.checkbox-card--selected {
  border-color: #3b82f6;
  background: #eff6ff;
}
.check-card-inner {
  display: flex;
  align-items: center;
  gap: 10px;
  pointer-events: none;
}
.check-box {
  width: 15px;
  height: 15px;
  border-radius: 3px;
  border: 2px solid #d1d5db;
  background: #fff;
  flex-shrink: 0;
  transition: all 0.14s;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.check-box--selected {
  border-color: #3b82f6;
  background: #3b82f6;
}
.check-box--selected::after {
  content: '';
  display: block;
  width: 4px;
  height: 7px;
  border: 2px solid #ffffff;
  border-top: none;
  border-left: none;
  transform: rotate(45deg) translate(0px, -1px);
  margin: auto;
}
.checkbox-label {
  font-size: 13px;
  color: #111827;
}
.checkbox-card--selected .checkbox-label {
  color: #1d4ed8;
  font-weight: 600;
}

/* ── Mobile ── */
@media (max-width: 480px) {
  .section-body {
    padding: 14px 14px 18px;
  }
  .check-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
