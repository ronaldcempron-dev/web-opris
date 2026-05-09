<!-- src/components/survey/SectionOFWProfile.vue -->
<template>
  <div>
    <div class="section-body">
      <!-- ── BLOCK: OFW Basic Information ── -->
      <div class="field-group">
        <v-row dense>
          <v-col cols="12">
            <div class="field-item">
              <label class="field-label">Name of OFW</label>
              <v-text-field
                v-model="localData.nameOfOFW"
                placeholder="Full name of Overseas Filipino Worker"
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

      <!-- ── BLOCK: Personal Details ── -->
      <div class="field-group">
        <v-row dense>
          <!-- Sex -->
          <v-col cols="12" md="4">
            <div class="field-item">
              <label class="field-label">Sex</label>
              <v-row dense>
                <v-col cols="6" v-for="s in ['Male', 'Female']" :key="s">
                  <div
                    class="radio-card"
                    :class="{ 'radio-card--selected': localData.sex === s }"
                    @click="selectSex(s)"
                  >
                    <div class="radio-card-inner">
                      <div
                        class="radio-dot"
                        :class="{ 'radio-dot--selected': localData.sex === s }"
                      />
                      <span class="radio-label-text">{{ s }}</span>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>

          <!-- Age -->
          <v-col cols="12" md="4">
            <div class="field-item">
              <label class="field-label">Age</label>
              <v-text-field
                v-model.number="localData.age"
                type="number"
                placeholder="e.g. 42"
                variant="outlined"
                density="comfortable"
                hide-details
                class="modern-input"
                @update:modelValue="emitUpdate"
              />
            </div>
          </v-col>

          <!-- Civil Status -->
          <v-col cols="12" md="4">
            <div class="field-item">
              <label class="field-label">Civil Status</label>
              <v-text-field
                v-model="localData.civilStatus"
                placeholder="e.g. Married, Single, Widowed"
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

      <!-- ── BLOCK: Educational Attainment ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Educational Attainment
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="option in educationOptions" :key="option">
            <div
              class="checkbox-card"
              :class="{
                'checkbox-card--selected': localData.educationalAttainment.includes(option),
              }"
              @click="toggleEducation(option)"
            >
              <v-checkbox
                v-model="localData.educationalAttainment"
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

      <!-- ── BLOCK: Skills & Documents ── -->
      <div class="field-group">
        <v-row dense>
          <v-col cols="12">
            <div class="field-item">
              <label class="field-label">Technical / Vocational Skills / Licenses</label>
              <v-text-field
                v-model="localData.technicalSkills"
                placeholder="e.g. Caregiving, TESDA NC II, Heavy Equipment Operator"
                variant="outlined"
                density="comfortable"
                hide-details
                class="modern-input"
                @update:modelValue="emitUpdate"
              />
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <div class="field-item">
              <label class="field-label">Passport Number</label>
              <v-text-field
                v-model="localData.passportNumber"
                placeholder="e.g. P12345678"
                variant="outlined"
                density="comfortable"
                hide-details
                class="modern-input"
                @update:modelValue="emitUpdate"
              />
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <div class="field-item">
              <label class="field-label">DMW Registration Number (if any)</label>
              <v-text-field
                v-model="localData.dmwRegistrationNumber"
                placeholder="e.g. DMW-XXXXXX"
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

      <!-- ── BLOCK: Membership Status ── -->
      <div class="field-group" style="margin-bottom: 0">
        <v-row dense>
          <!-- OWWA -->
          <v-col cols="12" md="6" lg="3">
            <label class="field-label" style="margin-bottom: 10px; display: block">
              OWWA Membership Status
            </label>
            <div v-for="status in membershipOptions" :key="status" class="mb-2">
              <v-checkbox
                v-model="localData.owwaStatus"
                :value="status"
                hide-details
                density="compact"
                class="modern-checkbox"
                @update:modelValue="emitUpdate"
              >
                <template #label>
                  <span class="checkbox-label">{{ status }}</span>
                </template>
              </v-checkbox>
            </div>
          </v-col>

          <!-- PhilHealth -->
          <v-col cols="12" md="6" lg="3">
            <label class="field-label" style="margin-bottom: 10px; display: block">
              PhilHealth Status
            </label>
            <div v-for="status in philhealthOptions" :key="status" class="mb-2">
              <v-checkbox
                v-model="localData.philhealthStatus"
                :value="status"
                hide-details
                density="compact"
                class="modern-checkbox"
                @update:modelValue="emitUpdate"
              >
                <template #label>
                  <span class="checkbox-label">{{ status }}</span>
                </template>
              </v-checkbox>
            </div>
          </v-col>

          <!-- SSS -->
          <v-col cols="12" md="6" lg="3">
            <label class="field-label" style="margin-bottom: 10px; display: block">
              SSS Membership Status
            </label>
            <div v-for="status in sssOptions" :key="status" class="mb-2">
              <v-checkbox
                v-model="localData.sssStatus"
                :value="status"
                hide-details
                density="compact"
                class="modern-checkbox"
                @update:modelValue="emitUpdate"
              >
                <template #label>
                  <span class="checkbox-label">{{ status }}</span>
                </template>
              </v-checkbox>
            </div>
          </v-col>

          <!-- Pag-IBIG -->
          <v-col cols="12" md="6" lg="3">
            <label class="field-label" style="margin-bottom: 10px; display: block">
              Pag-IBIG Membership Status
            </label>
            <div v-for="status in pagibigOptions" :key="status" class="mb-2">
              <v-checkbox
                v-model="localData.pagibigStatus"
                :value="status"
                hide-details
                density="compact"
                class="modern-checkbox"
                @update:modelValue="emitUpdate"
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
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  data: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['update:data'])

const educationOptions = [
  'Elementary Level',
  'Elementary Graduate',
  'High School Level',
  'High School Graduate',
  'Senior High School Graduate',
  'Vocational / TESDA',
  'College Level',
  'College Graduate',
  'Postgraduate',
  'Other',
]

const membershipOptions = ['Active', 'Expired', 'Not a member', 'Unknown']
const philhealthOptions = ['Active', 'Inactive', 'Unknown']
const sssOptions = ['Active', 'Inactive', 'None']
const pagibigOptions = ['Active', 'Inactive', 'None']

const localData = ref({
  nameOfOFW: '',
  sex: '',
  age: null,
  civilStatus: '',
  educationalAttainment: [],
  technicalSkills: '',
  passportNumber: '',
  dmwRegistrationNumber: '',
  owwaStatus: [],
  philhealthStatus: [],
  sssStatus: [],
  pagibigStatus: [],
  ...props.data,
})

watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })

const selectSex = (val) => {
  localData.value.sex = val
  emitUpdate()
}

const toggleEducation = (option) => {
  const idx = localData.value.educationalAttainment.indexOf(option)
  if (idx === -1) {
    localData.value.educationalAttainment.push(option)
  } else {
    localData.value.educationalAttainment.splice(idx, 1)
  }
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

/* Radio Cards */
.radio-card {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 10px 14px;
  cursor: pointer;
  transition:
    border-color 0.14s,
    background 0.14s;
  background: #ffffff;
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

/* Checkbox Cards */
.checkbox-card {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.14s;
  background: #ffffff;
  margin-bottom: 6px;
}

.checkbox-card:hover {
  border-color: #93c5fd;
  background: #f8faff;
}

.checkbox-card--selected {
  border-color: #3b82f6;
  background: #eff6ff;
}

.checkbox-label {
  font-size: 13px;
  color: #111827;
}

.checkbox-card--selected .checkbox-label {
  color: #1d4ed8;
  font-weight: 500;
}

/* Mobile */
@media (max-width: 480px) {
  .section-body {
    padding: 14px 14px 18px;
  }
}
</style>
