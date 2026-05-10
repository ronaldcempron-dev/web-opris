<!-- src/components/survey/SectionOFWProfile.vue -->
<template>
  <div>
    <div class="section-body">
      <!-- ── OFW Basic Information ── -->
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

      <!-- ── Personal Details ── -->
      <div class="field-group">
        <v-row dense>
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

      <!-- ── Educational Attainment (multi) ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px"
          >Educational Attainment</label
        >
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="option in educationOptions" :key="option">
            <div
              class="checkbox-card"
              :class="{
                'checkbox-card--selected': localData.educationalAttainment.includes(option),
              }"
              @click="toggleEducation(option)"
            >
              <div class="check-card-inner">
                <div
                  class="check-box"
                  :class="{
                    'check-box--selected': localData.educationalAttainment.includes(option),
                  }"
                >
                  <v-icon
                    v-if="localData.educationalAttainment.includes(option)"
                    size="11"
                    color="white"
                    >mdi-check</v-icon
                  >
                </div>
                <span class="checkbox-label">{{ option }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── Skills & Documents ── -->
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

      <!-- ── Membership Status (single select each) ── -->
      <div class="field-group" style="margin-bottom: 0">
        <v-row dense>
          <!-- OWWA -->
          <v-col cols="12" md="6" lg="3">
            <label class="field-label" style="margin-bottom: 10px; display: block"
              >OWWA Membership Status</label
            >
            <div v-for="status in membershipOptions" :key="status" class="mb-2">
              <div
                class="radio-card"
                :class="{ 'radio-card--selected': localData.owwaStatus === status }"
                @click="selectOwwa(status)"
              >
                <div class="radio-card-inner">
                  <div
                    class="radio-dot"
                    :class="{ 'radio-dot--selected': localData.owwaStatus === status }"
                  />
                  <span class="radio-label-text">{{ status }}</span>
                </div>
              </div>
            </div>
          </v-col>

          <!-- PhilHealth -->
          <v-col cols="12" md="6" lg="3">
            <label class="field-label" style="margin-bottom: 10px; display: block"
              >PhilHealth Status</label
            >
            <div v-for="status in philhealthOptions" :key="status" class="mb-2">
              <div
                class="radio-card"
                :class="{ 'radio-card--selected': localData.philhealthStatus === status }"
                @click="selectPhilhealth(status)"
              >
                <div class="radio-card-inner">
                  <div
                    class="radio-dot"
                    :class="{ 'radio-dot--selected': localData.philhealthStatus === status }"
                  />
                  <span class="radio-label-text">{{ status }}</span>
                </div>
              </div>
            </div>
          </v-col>

          <!-- SSS -->
          <v-col cols="12" md="6" lg="3">
            <label class="field-label" style="margin-bottom: 10px; display: block"
              >SSS Membership Status</label
            >
            <div v-for="status in sssOptions" :key="status" class="mb-2">
              <div
                class="radio-card"
                :class="{ 'radio-card--selected': localData.sssStatus === status }"
                @click="selectSss(status)"
              >
                <div class="radio-card-inner">
                  <div
                    class="radio-dot"
                    :class="{ 'radio-dot--selected': localData.sssStatus === status }"
                  />
                  <span class="radio-label-text">{{ status }}</span>
                </div>
              </div>
            </div>
          </v-col>

          <!-- Pag-IBIG -->
          <v-col cols="12" md="6" lg="3">
            <label class="field-label" style="margin-bottom: 10px; display: block"
              >Pag-IBIG Membership Status</label
            >
            <div v-for="status in pagibigOptions" :key="status" class="mb-2">
              <div
                class="radio-card"
                :class="{ 'radio-card--selected': localData.pagibigStatus === status }"
                @click="selectPagibig(status)"
              >
                <div class="radio-card-inner">
                  <div
                    class="radio-dot"
                    :class="{ 'radio-dot--selected': localData.pagibigStatus === status }"
                  />
                  <span class="radio-label-text">{{ status }}</span>
                </div>
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

const props = defineProps({ data: { type: Object, default: () => ({}) } })
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
  owwaStatus: '',
  philhealthStatus: '',
  sssStatus: '',
  pagibigStatus: '',
  ...props.data,
})

watch(localData, (v) => emit('update:data', { ...v }), { deep: true })
const emitUpdate = () => emit('update:data', { ...localData.value })

const selectSex = (val) => {
  localData.value.sex = val
  emitUpdate()
}
const selectOwwa = (val) => {
  localData.value.owwaStatus = val
  emitUpdate()
}
const selectPhilhealth = (val) => {
  localData.value.philhealthStatus = val
  emitUpdate()
}
const selectSss = (val) => {
  localData.value.sssStatus = val
  emitUpdate()
}
const selectPagibig = (val) => {
  localData.value.pagibigStatus = val
  emitUpdate()
}

const toggleEducation = (option) => {
  const idx = localData.value.educationalAttainment.indexOf(option)
  if (idx === -1) localData.value.educationalAttainment.push(option)
  else localData.value.educationalAttainment.splice(idx, 1)
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
.checkbox-card {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 10px 14px;
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
.check-card-inner {
  display: flex;
  align-items: center;
  gap: 10px;
}
.check-box {
  width: 16px;
  height: 16px;
  border-radius: 4px;
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
.checkbox-label {
  font-size: 13px;
  color: #111827;
}
.checkbox-card--selected .checkbox-label {
  color: #1d4ed8;
  font-weight: 500;
}
@media (max-width: 480px) {
  .section-body {
    padding: 14px 14px 18px;
  }
}
</style>
