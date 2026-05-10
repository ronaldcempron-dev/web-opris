<!-- src/components/survey/SectionEducation.vue -->
<template>
  <div>
    <div class="section-body">
      <!-- ── BLOCK: Enrollment Status ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Are all school-age children currently enrolled?
        </label>
        <v-row dense>
          <v-col cols="6" md="3">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.allChildrenEnrolled === 'Yes' }"
              @click="selectEnrollment('Yes')"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.allChildrenEnrolled === 'Yes' }"
                />
                <span class="radio-label-text">Yes</span>
              </div>
            </div>
          </v-col>
          <v-col cols="6" md="3">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.allChildrenEnrolled === 'No' }"
              @click="selectEnrollment('No')"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.allChildrenEnrolled === 'No' }"
                />
                <span class="radio-label-text">No</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Out of School (Conditional) ── -->
      <div v-if="localData.allChildrenEnrolled === 'No'" class="field-group">
        <v-row dense>
          <v-col cols="12" md="6">
            <div class="field-item">
              <label class="field-label">If No, How Many Are Out-of-School?</label>
              <v-text-field
                v-model.number="localData.numberOutOfSchool"
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

        <div class="mt-6">
          <label class="field-label" style="display: block; margin-bottom: 10px">
            Reasons for Non-Enrollment / Dropping Out
          </label>
          <div class="check-grid">
            <div
              v-for="reason in nonEnrollmentReasons"
              :key="reason"
              class="checkbox-card"
              :class="{
                'checkbox-card--selected': localData.nonEnrollmentReasons.includes(reason),
              }"
              @click.stop="toggleNonEnrollmentReason(reason)"
            >
              <div class="check-card-inner">
                <div
                  class="check-box"
                  :class="{
                    'check-box--selected': localData.nonEnrollmentReasons.includes(reason),
                  }"
                />
                <span class="checkbox-label">{{ reason }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── BLOCK: Educational Needs ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Educational Needs of Children / Dependents
        </label>
        <div class="check-grid">
          <div
            v-for="need in educationalNeeds"
            :key="need"
            class="checkbox-card"
            :class="{ 'checkbox-card--selected': localData.educationalNeeds.includes(need) }"
            @click.stop="toggleEducationalNeed(need)"
          >
            <div class="check-card-inner">
              <div
                class="check-box"
                :class="{ 'check-box--selected': localData.educationalNeeds.includes(need) }"
              />
              <span class="checkbox-label">{{ need }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── BLOCK: Not Applicable ── -->
      <div class="field-group" style="margin-bottom: 0">
        <div
          class="checkbox-card not-applicable-card"
          :class="{ 'checkbox-card--selected': localData.notApplicable }"
          @click.stop="toggleNotApplicable"
        >
          <div class="check-card-inner">
            <div class="check-box" :class="{ 'check-box--selected': localData.notApplicable }" />
            <span class="checkbox-label">
              Not applicable (no school-age children in the household)
            </span>
          </div>
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

const nonEnrollmentReasons = [
  'Financial constraints',
  'Need to work',
  'Lack of school supplies/transportation',
  'Early pregnancy',
  'Illness/disability',
  'Lack of interest',
  'Child care / household duties',
  'Migration / relocation',
  'Other',
]

const educationalNeeds = [
  'School supplies',
  'Tuition/fees support',
  'Transportation allowance',
  'Gadget/internet access',
  'Scholarship',
  'Tutorial / learning support',
  'ALS / alternative learning',
  'Other',
]

const localData = ref({
  allChildrenEnrolled: '',
  numberOutOfSchool: null,
  nonEnrollmentReasons: [],
  educationalNeeds: [],
  notApplicable: false,
  ...props.data,
})

watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })
const emitUpdate = () => emit('update:data', { ...localData.value })

const selectEnrollment = (val) => {
  localData.value.allChildrenEnrolled = val
  emitUpdate()
}

const toggleNonEnrollmentReason = (reason) => {
  const idx = localData.value.nonEnrollmentReasons.indexOf(reason)
  if (idx === -1) localData.value.nonEnrollmentReasons.push(reason)
  else localData.value.nonEnrollmentReasons.splice(idx, 1)
  emitUpdate()
}

const toggleEducationalNeed = (need) => {
  const idx = localData.value.educationalNeeds.indexOf(need)
  if (idx === -1) localData.value.educationalNeeds.push(need)
  else localData.value.educationalNeeds.splice(idx, 1)
  emitUpdate()
}

const toggleNotApplicable = () => {
  localData.value.notApplicable = !localData.value.notApplicable
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
.not-applicable-card {
  display: inline-flex;
  align-items: center;
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
