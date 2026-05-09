<!-- src/components/survey/SectionAssistance.vue -->
<template>
  <div>
    <div class="section-body">
      <!-- ── BLOCK: Received Assistance from Agencies ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Has the OFW/family received assistance from any of the following?
        </label>
        <small class="text-grey-darken-1 mb-4 d-block" style="font-size: 12px">
          (Please check all that apply)
        </small>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="agency in agencies" :key="agency">
            <div
              class="checkbox-card"
              :class="{
                'checkbox-card--selected': localData.receivedAssistanceFrom.includes(agency),
              }"
              @click="toggleAgency(agency)"
            >
              <v-checkbox
                v-model="localData.receivedAssistanceFrom"
                :value="agency"
                hide-details
                density="compact"
                class="checkbox-inner"
                @click.stop
              >
                <template #label>
                  <span class="checkbox-label">{{ agency }}</span>
                </template>
              </v-checkbox>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Type of Assistance Received ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Type of Assistance Received
        </label>
        <small class="text-grey-darken-1 mb-4 d-block" style="font-size: 12px">
          (Please check all that apply)
        </small>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="type in assistanceTypes" :key="type">
            <div
              class="checkbox-card"
              :class="{ 'checkbox-card--selected': localData.typeOfAssistance.includes(type) }"
              @click="toggleAssistanceType(type)"
            >
              <v-checkbox
                v-model="localData.typeOfAssistance"
                :value="type"
                hide-details
                density="compact"
                class="checkbox-inner"
                @click.stop
              >
                <template #label>
                  <span class="checkbox-label">{{ type }}</span>
                </template>
              </v-checkbox>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Assistance Sufficient ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Was the assistance sufficient / helpful?
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="3" v-for="option in sufficiencyOptions" :key="option">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.assistanceSufficient === option }"
              @click="selectSufficiency(option)"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.assistanceSufficient === option }"
                />
                <span class="radio-label-text">{{ option }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Awareness of Reintegration Programs ── -->
      <div class="field-group" style="margin-bottom: 0">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Are you aware of DMW / OWWA / LGU reintegration programs?
        </label>
        <v-row dense>
          <v-col cols="6" md="3">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.awareOfReintegrationPrograms === 'Yes' }"
              @click="selectAwareness('Yes')"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{
                    'radio-dot--selected': localData.awareOfReintegrationPrograms === 'Yes',
                  }"
                />
                <span class="radio-label-text">Yes</span>
              </div>
            </div>
          </v-col>
          <v-col cols="6" md="3">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.awareOfReintegrationPrograms === 'No' }"
              @click="selectAwareness('No')"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{
                    'radio-dot--selected': localData.awareOfReintegrationPrograms === 'No',
                  }"
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

const agencies = [
  'DMW',
  'OWWA',
  'DOLE',
  'DSWD',
  'LGU / Barangay',
  'PESO',
  'TESDA',
  'DA / BFAR',
  'DTI',
  'PhilHealth',
  'SSS',
  'Pag-IBIG',
  'Overseas post / embassy',
  'NGO / faith-based organization',
  'None',
]

const assistanceTypes = [
  'Repatriation assistance',
  'Financial assistance',
  'Livelihood starter kit',
  'Scholarship / education aid',
  'Medical assistance',
  'Psychosocial services',
  'Legal assistance',
  'Skills training',
  'Job referral / employment facilitation',
  'Food packs / relief',
  'Kalinga kit / welfare support',
  'Other',
]

const sufficiencyOptions = ['Very helpful', 'Somewhat helpful', 'Not sufficient', 'Not helpful']

const localData = ref({
  receivedAssistanceFrom: [],
  typeOfAssistance: [],
  assistanceSufficient: '',
  awareOfReintegrationPrograms: '',
  ...props.data,
})

watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })

// Toggle & Select Handlers
const toggleAgency = (agency) => {
  const idx = localData.value.receivedAssistanceFrom.indexOf(agency)
  if (idx === -1) localData.value.receivedAssistanceFrom.push(agency)
  else localData.value.receivedAssistanceFrom.splice(idx, 1)
  emitUpdate()
}

const toggleAssistanceType = (type) => {
  const idx = localData.value.typeOfAssistance.indexOf(type)
  if (idx === -1) localData.value.typeOfAssistance.push(type)
  else localData.value.typeOfAssistance.splice(idx, 1)
  emitUpdate()
}

const selectSufficiency = (val) => {
  localData.value.assistanceSufficient = val
  emitUpdate()
}

const selectAwareness = (val) => {
  localData.value.awareOfReintegrationPrograms = val
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
