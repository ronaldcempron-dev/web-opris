<!-- src/components/survey/SectionNeeds.vue -->
<template>
  <div>
    <div class="section-body">
      <!-- ── BLOCK: Immediate Assistance Needed ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          What immediate assistance does the OFW/family need?
        </label>
        <small class="text-grey-darken-1 mb-4 d-block" style="font-size: 12px">
          (Check all that apply)
        </small>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="item in immediateAssistanceOptions" :key="item">
            <div
              class="checkbox-card"
              :class="{ 'checkbox-card--selected': localData.immediateAssistance.includes(item) }"
              @click="toggleImmediateAssistance(item)"
            >
              <div class="check-card-inner">
                <div
                  class="check-box"
                  :class="{ 'check-box--selected': localData.immediateAssistance.includes(item) }"
                >
                  <v-icon
                    v-if="localData.immediateAssistance.includes(item)"
                    size="11"
                    color="white"
                    >mdi-check</v-icon
                  >
                </div>
                <span class="checkbox-label">{{ item }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Preferred Skills Training ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Preferred Skills Training
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="skill in preferredSkills" :key="skill">
            <div
              class="checkbox-card"
              :class="{
                'checkbox-card--selected': localData.preferredSkillsTraining.includes(skill),
              }"
              @click="togglePreferredSkill(skill)"
            >
              <div class="check-card-inner">
                <div
                  class="check-box"
                  :class="{
                    'check-box--selected': localData.preferredSkillsTraining.includes(skill),
                  }"
                >
                  <v-icon
                    v-if="localData.preferredSkillsTraining.includes(skill)"
                    size="11"
                    color="white"
                    >mdi-check</v-icon
                  >
                </div>
                <span class="checkbox-label">{{ skill }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Preferred Local Employment ── -->
      <div class="field-group">
        <div class="field-item">
          <label class="field-label">Preferred Local Employment Sector</label>
          <v-text-field
            v-model="localData.preferredLocalEmployment"
            placeholder="e.g. Agriculture, Tourism, Retail, Construction, etc."
            variant="outlined"
            density="comfortable"
            hide-details
            class="modern-input"
            @update:modelValue="emitUpdate"
          />
        </div>
      </div>

      <!-- ── BLOCK: Cooperative & Support Group ── -->
      <div class="field-group" style="margin-bottom: 0">
        <v-row dense>
          <!-- Willing to Join Cooperative -->
          <v-col cols="12" md="6">
            <label class="field-label" style="display: block; margin-bottom: 10px">
              Willingness to join cooperative/association of OFWs or families
            </label>
            <v-row dense>
              <v-col cols="6" md="4" v-for="option in ['Yes', 'No', 'Maybe']" :key="option">
                <div
                  class="radio-card"
                  :class="{ 'radio-card--selected': localData.willingToJoinCooperative === option }"
                  @click="selectCooperative(option)"
                >
                  <div class="radio-card-inner">
                    <div
                      class="radio-dot"
                      :class="{
                        'radio-dot--selected': localData.willingToJoinCooperative === option,
                      }"
                    />
                    <span class="radio-label-text">{{ option }}</span>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>

          <!-- Interested in Family Circle -->
          <v-col cols="12" md="6">
            <label class="field-label" style="display: block; margin-bottom: 10px">
              Interested in joining OFW Family Circle / support group?
            </label>
            <v-row dense>
              <v-col cols="6" md="4" v-for="option in ['Yes', 'No', 'Maybe']" :key="option">
                <div
                  class="radio-card"
                  :class="{ 'radio-card--selected': localData.interestedInFamilyCircle === option }"
                  @click="selectFamilyCircle(option)"
                >
                  <div class="radio-card-inner">
                    <div
                      class="radio-dot"
                      :class="{
                        'radio-dot--selected': localData.interestedInFamilyCircle === option,
                      }"
                    />
                    <span class="radio-label-text">{{ option }}</span>
                  </div>
                </div>
              </v-col>
            </v-row>
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

const immediateAssistanceOptions = [
  'Financial assistance',
  'Emergency assistance',
  'Food / relief support',
  'Medical assistance',
  'Psychosocial counseling',
  'Legal assistance',
  'Documentation / case referral',
  'Livelihood starter kit',
  'Livelihood capital / grant',
  'Skills training / TESDA referral',
  'Job matching / local employment',
  'Scholarship / educational support',
  'Child support services',
  'Shelter / temporary housing',
  'Other',
]

const preferredSkills = [
  'Bread and pastry production',
  'Cookery / food processing',
  'Dressmaking / tailoring',
  'Massage / wellness',
  'Hairdressing / beauty care',
  'Computer / digital literacy',
  'Bookkeeping / entrepreneurship',
  'Driving / automotive',
  'Welding / electrical / plumbing',
  'Agriculture / organic farming',
  'Fisheries / aquaculture',
  'Handicrafts / souvenir making',
  'Online freelancing / e-commerce',
  'Caregiving / health services',
  'Other',
]

const localData = ref({
  immediateAssistance: [],
  preferredSkillsTraining: [],
  preferredLocalEmployment: '',
  willingToJoinCooperative: '',
  interestedInFamilyCircle: '',
  ...props.data,
})

watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })

// Toggle & Select Handlers
const toggleImmediateAssistance = (item) => {
  const idx = localData.value.immediateAssistance.indexOf(item)
  if (idx === -1) localData.value.immediateAssistance.push(item)
  else localData.value.immediateAssistance.splice(idx, 1)
  emitUpdate()
}

const togglePreferredSkill = (skill) => {
  const idx = localData.value.preferredSkillsTraining.indexOf(skill)
  if (idx === -1) localData.value.preferredSkillsTraining.push(skill)
  else localData.value.preferredSkillsTraining.splice(idx, 1)
  emitUpdate()
}

const selectCooperative = (val) => {
  localData.value.willingToJoinCooperative = val
  emitUpdate()
}

const selectFamilyCircle = (val) => {
  localData.value.interestedInFamilyCircle = val
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
