<!-- src/components/survey/SectionHealth.vue -->
<template>
  <div>
    <div class="section-body">
      <!-- ── BLOCK: Chronic Illness ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Does any household member have a chronic illness?
        </label>
        <v-row dense>
          <v-col cols="6" md="3" v-for="opt in ['Yes', 'No']" :key="opt">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.hasChronicIllness === opt }"
              @click="selectChronicIllness(opt)"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.hasChronicIllness === opt }"
                />
                <span class="radio-label-text">{{ opt }}</span>
              </div>
            </div>
          </v-col>
        </v-row>

        <div v-if="localData.hasChronicIllness === 'Yes'" class="mt-4">
          <div class="field-item">
            <label class="field-label">If yes, specify illness/condition</label>
            <v-text-field
              v-model="localData.chronicIllnessSpecify"
              placeholder="e.g. Diabetes, Hypertension, Arthritis"
              variant="outlined"
              density="comfortable"
              hide-details
              class="modern-input"
              @update:modelValue="emitUpdate"
            />
          </div>
        </div>
      </div>

      <!-- ── BLOCK: Disability ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Does any household member have a disability?
        </label>
        <v-row dense>
          <v-col cols="6" md="3" v-for="opt in ['Yes', 'No']" :key="opt">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.hasDisability === opt }"
              @click="selectDisability(opt)"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.hasDisability === opt }"
                />
                <span class="radio-label-text">{{ opt }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Psychosocial Concerns ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Does the family experience any psychosocial or emotional concerns related to migration?
        </label>
        <v-row dense>
          <v-col cols="6" md="3" v-for="opt in ['Yes', 'No']" :key="opt">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.hasPsychosocialConcerns === opt }"
              @click="selectPsychosocial(opt)"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{
                    'radio-dot--selected': localData.hasPsychosocialConcerns === opt,
                  }"
                />
                <span class="radio-label-text">{{ opt }}</span>
              </div>
            </div>
          </v-col>
        </v-row>

        <div v-if="localData.hasPsychosocialConcerns === 'Yes'" class="mt-6">
          <label class="field-label" style="display: block; margin-bottom: 10px">
            What psychosocial concerns are present?
          </label>
          <div class="check-grid">
            <div
              v-for="concern in psychosocialConcerns"
              :key="concern"
              class="checkbox-card"
              :class="{
                'checkbox-card--selected': localData.psychosocialConcerns.includes(concern),
              }"
              @click="togglePsychosocialConcern(concern)"
            >
              <div class="check-card-inner">
                <div
                  class="check-box"
                  :class="{
                    'check-box--selected': localData.psychosocialConcerns.includes(concern),
                  }"
                >
                  <v-icon
                    v-if="localData.psychosocialConcerns.includes(concern)"
                    size="11"
                    color="white"
                    >mdi-check</v-icon
                  >
                </div>
                <span class="checkbox-label">{{ concern }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── BLOCK: Willingness for Support ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Would the family/OFW be willing to avail of psychosocial support/counseling?
        </label>
        <v-row dense>
          <v-col cols="6" md="3" v-for="option in ['Yes', 'No', 'Maybe']" :key="option">
            <div
              class="radio-card"
              :class="{
                'radio-card--selected': localData.willingForPsychosocialSupport === option,
              }"
              @click="selectWillingness(option)"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{
                    'radio-dot--selected': localData.willingForPsychosocialSupport === option,
                  }"
                />
                <span class="radio-label-text">{{ option }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Access to Health Services ── -->
      <div class="field-group" style="margin-bottom: 0">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Access to Health Services
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="option in accessOptions" :key="option">
            <div
              class="checkbox-card"
              :class="{ 'checkbox-card--selected': localData.healthAccess.includes(option) }"
              @click="toggleHealthAccess(option)"
            >
              <div class="check-card-inner">
                <div
                  class="check-box"
                  :class="{ 'check-box--selected': localData.healthAccess.includes(option) }"
                >
                  <v-icon v-if="localData.healthAccess.includes(option)" size="11" color="white"
                    >mdi-check</v-icon
                  >
                </div>
                <span class="checkbox-label">{{ option }}</span>
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

// ── Options ──────────────────────────────────────────
const psychosocialConcerns = [
  'Anxiety/stress',
  'Depression/sadness',
  'Family conflict',
  'Child behavioral issues',
  'Separation issues',
  'Communication breakdown',
  'Domestic violence',
  'Substance abuse',
  'Grief / loss',
  'Trauma from abuse/exploitation',
  'Other',
]
const accessOptions = ['Easy access', 'Limited access', 'No regular access']

// ── Safety helpers ────────────────────────────────────
const toArray = (val) => {
  if (Array.isArray(val)) return val
  if (!val || val === '' || val === false) return []
  return [val]
}
const toBoolString = (val) => {
  if (val === false || val === null || val === undefined) return ''
  return val
}

// ── Local state (safe initialization) ────────────────
const localData = ref({
  hasChronicIllness: toBoolString(props.data?.hasChronicIllness ?? props.data?.chronicIllness),
  chronicIllnessSpecify: props.data?.chronicIllnessSpecify || props.data?.illnessSpecify || '',
  hasDisability: toBoolString(props.data?.hasDisability ?? props.data?.disability),
  hasPsychosocialConcerns: toBoolString(
    props.data?.hasPsychosocialConcerns ?? props.data?.psychosocialConcerns,
  ),
  psychosocialConcerns: toArray(props.data?.psychosocialConcerns ?? props.data?.concernsList),
  willingForPsychosocialSupport: toBoolString(
    props.data?.willingForPsychosocialSupport ?? props.data?.willingForCounseling,
  ),
  healthAccess: toArray(props.data?.healthAccess),
})

watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })
const emitUpdate = () => emit('update:data', { ...localData.value })

// ── Handlers ─────────────────────────────────────────
const selectChronicIllness = (val) => {
  localData.value.hasChronicIllness = val
  if (val === 'No') localData.value.chronicIllnessSpecify = ''
  emitUpdate()
}
const selectDisability = (val) => {
  localData.value.hasDisability = val
  emitUpdate()
}
const selectPsychosocial = (val) => {
  localData.value.hasPsychosocialConcerns = val
  if (val === 'No') localData.value.psychosocialConcerns = []
  emitUpdate()
}
const selectWillingness = (val) => {
  localData.value.willingForPsychosocialSupport = val
  emitUpdate()
}
const togglePsychosocialConcern = (concern) => {
  const idx = localData.value.psychosocialConcerns.indexOf(concern)
  if (idx === -1) localData.value.psychosocialConcerns.push(concern)
  else localData.value.psychosocialConcerns.splice(idx, 1)
  emitUpdate()
}
const toggleHealthAccess = (option) => {
  const idx = localData.value.healthAccess.indexOf(option)
  if (idx === -1) localData.value.healthAccess.push(option)
  else localData.value.healthAccess.splice(idx, 1)
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
  user-select: none;
  -webkit-user-select: none;
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
.radio-card-inner,
.check-card-inner {
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
.check-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 6px;
}
@media (max-width: 480px) {
  .section-body {
    padding: 14px 14px 18px;
  }
  .check-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
