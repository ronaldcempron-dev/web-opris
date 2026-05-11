<!-- src/components/survey/SectionRisk.vue -->
<template>
  <div>
    <div class="section-body">
      <!-- ── BLOCK: Ongoing Cases ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Does the OFW/family have any ongoing case?
        </label>
        <small class="text-grey-darken-1 mb-4 d-block" style="font-size: 12px">
          (Please check all that apply)
        </small>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="caseType in ongoingCases" :key="caseType">
            <div
              class="checkbox-card"
              :class="{ 'checkbox-card--selected': localData.ongoingCase.includes(caseType) }"
              @click="toggleOngoingCase(caseType)"
            >
              <div class="check-card-inner">
                <div
                  class="check-box"
                  :class="{ 'check-box--selected': localData.ongoingCase.includes(caseType) }"
                >
                  <v-icon v-if="localData.ongoingCase.includes(caseType)" size="11" color="white"
                    >mdi-check</v-icon
                  >
                </div>
                <span class="checkbox-label">{{ caseType }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Urgent Referral ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Does the household need urgent referral?
        </label>
        <v-row dense>
          <v-col cols="6" md="3">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.needsUrgentReferral === 'Yes' }"
              @click="selectUrgentReferral('Yes')"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.needsUrgentReferral === 'Yes' }"
                />
                <span class="radio-label-text">Yes</span>
              </div>
            </div>
          </v-col>
          <v-col cols="6" md="3">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.needsUrgentReferral === 'No' }"
              @click="selectUrgentReferral('No')"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.needsUrgentReferral === 'No' }"
                />
                <span class="radio-label-text">No</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Referred To (Conditional) ── -->
      <div v-if="localData.needsUrgentReferral === 'Yes'" class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px"> Referred To </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="agency in referralAgencies" :key="agency">
            <div
              class="checkbox-card"
              :class="{ 'checkbox-card--selected': localData.referredTo.includes(agency) }"
              @click="toggleReferralAgency(agency)"
            >
              <div class="check-card-inner">
                <div
                  class="check-box"
                  :class="{ 'check-box--selected': localData.referredTo.includes(agency) }"
                >
                  <v-icon v-if="localData.referredTo.includes(agency)" size="11" color="white"
                    >mdi-check</v-icon
                  >
                </div>
                <span class="checkbox-label">{{ agency }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Priority Level ── -->
      <div class="field-group" style="margin-bottom: 0">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Priority Level Assigned by Enumerator
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="level in priorityLevels" :key="level">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.priorityLevel === level }"
              @click="selectPriority(level)"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.priorityLevel === level }"
                />
                <span class="radio-label-text">{{ level }}</span>
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

const ongoingCases = [
  'Illegal recruitment',
  'Human trafficking',
  'Labor case / unpaid wages',
  'Abuse / violence',
  'Missing OFW',
  'Detention / legal case abroad',
  'Medical repatriation',
  'Death / bereavement',
  'Child protection concern',
  'Domestic violence / VAWC',
  'None',
  'Other',
]

const referralAgencies = [
  'DMW',
  'OWWA',
  'LGU/MSWDO',
  'DSWD',
  'PNP/WCPD',
  'DOJ/PAO',
  'DOH / Health Facility',
  'TESDA',
  'PESO',
  'NGO / CSO',
  'Other',
]

const priorityLevels = ['High / urgent', 'Medium', 'Low']

const localData = ref({
  ongoingCase: [],
  needsUrgentReferral: '',
  referredTo: [],
  priorityLevel: '',
  ...props.data,
})

watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })

// Handlers
const toggleOngoingCase = (caseType) => {
  const idx = localData.value.ongoingCase.indexOf(caseType)
  if (idx === -1) localData.value.ongoingCase.push(caseType)
  else localData.value.ongoingCase.splice(idx, 1)
  emitUpdate()
}

const selectUrgentReferral = (val) => {
  localData.value.needsUrgentReferral = val
  if (val === 'No') localData.value.referredTo = []
  emitUpdate()
}

const toggleReferralAgency = (agency) => {
  const idx = localData.value.referredTo.indexOf(agency)
  if (idx === -1) localData.value.referredTo.push(agency)
  else localData.value.referredTo.splice(idx, 1)
  emitUpdate()
}

const selectPriority = (level) => {
  localData.value.priorityLevel = level
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

.field-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6b7fa8;
  line-height: 1.4;
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
