<!-- src/components/survey/SectionGeneralInfo.vue -->
<template>
  <div>
    <div class="section-body">
      <!-- ── BLOCK: Interview Details ── -->
      <div class="field-group">
        <v-row dense>
          <v-col cols="12" md="4">
            <div class="field-item">
              <label class="field-label">Date of Interview</label>
              <v-text-field
                v-model="localData.dateOfInterview"
                type="date"
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
              <label class="field-label">Time of Interview</label>
              <v-text-field
                v-model="localData.timeOfInterview"
                type="time"
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
              <label class="field-label">Name of Enumerator / Interviewer</label>
              <v-text-field
                v-model="localData.enumeratorName"
                placeholder="Full name"
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

      <!-- ── BLOCK: Location ── -->
      <div class="field-group">
        <v-row dense>
          <v-col cols="12" md="4">
            <div class="field-item">
              <label class="field-label">Barangay</label>
              <v-text-field
                v-model="localData.barangay"
                placeholder="e.g. Barangay 1"
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
              <label class="field-label">Municipality / City</label>
              <v-text-field
                v-model="localData.municipalityCity"
                placeholder="e.g. Butuan City"
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
              <label class="field-label">Province / Region</label>
              <v-text-field
                v-model="localData.provinceRegion"
                placeholder="e.g. Agusan del Norte"
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

      <!-- ── BLOCK: Survey ID + GPS ── -->
      <div class="field-group">
        <v-row dense align="stretch">
          <v-col cols="12" md="6">
            <div class="field-item">
              <label class="field-label">Household Control Number / Survey ID</label>
              <v-text-field
                v-model="localData.householdControlNumber"
                placeholder="e.g. HH-2025-00001"
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
              <label class="field-label">GPS Coordinates</label>
              <div class="gps-card">
                <v-btn
                  color="#0f2a5e"
                  size="default"
                  prepend-icon="mdi-crosshairs-gps"
                  :loading="gpsLoading"
                  class="gps-btn"
                  @click="captureGPS"
                >
                  Capture Location
                </v-btn>

                <div v-if="localData.latitude && localData.longitude" class="gps-coords">
                  <div class="coord-row">
                    <span class="coord-label">LAT</span>
                    <span class="coord-value">{{ localData.latitude.toFixed(6) }}</span>
                    <v-btn
                      icon="mdi-content-copy"
                      size="x-small"
                      variant="text"
                      class="copy-btn"
                      @click="copyLat"
                    />
                    <span v-if="copiedLat" class="copied-tag">Copied!</span>
                  </div>
                  <div class="coord-row">
                    <span class="coord-label">LNG</span>
                    <span class="coord-value">{{ localData.longitude.toFixed(6) }}</span>
                    <v-btn
                      icon="mdi-content-copy"
                      size="x-small"
                      variant="text"
                      class="copy-btn"
                      @click="copyLng"
                    />
                    <span v-if="copiedLng" class="copied-tag">Copied!</span>
                  </div>
                </div>

                <div v-else class="gps-empty">
                  <v-icon size="13" class="mr-1" color="#9ca3af">mdi-map-marker-off-outline</v-icon>
                  No location captured yet
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Type of Respondent ── -->
      <div class="field-group" style="margin-bottom: 0">
        <label class="field-label" style="display: block; margin-bottom: 10px"
          >Type of Respondent</label
        >

        <v-radio-group
          v-model="localData.typeOfRespondent"
          @update:modelValue="handleTypeChange"
          hide-details
        >
          <v-row dense>
            <v-col cols="12" sm="6" md="4" v-for="option in respondentTypes" :key="option">
              <div
                class="radio-card"
                :class="{ 'radio-card--selected': localData.typeOfRespondent === option }"
                @click="selectType(option)"
              >
                <v-radio :value="option" hide-details class="radio-inner">
                  <template #label>
                    <span v-if="option !== 'Other'" class="radio-label-text">{{ option }}</span>
                    <span v-else class="radio-label-text">Other</span>
                  </template>
                </v-radio>

                <v-text-field
                  v-if="option === 'Other' && localData.typeOfRespondent === 'Other'"
                  v-model="localData.typeOfRespondentOther"
                  placeholder="Please specify"
                  variant="underlined"
                  density="compact"
                  hide-details
                  class="other-input"
                  @update:modelValue="emitUpdate"
                  @click.stop
                />
              </div>
            </v-col>
          </v-row>
        </v-radio-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getCurrentPosition } from '@/services/geolocation'

const props = defineProps({ data: Object })
const emit = defineEmits(['update:data'])

const respondentTypes = [
  'Current OFW',
  'Returning OFW (vacation)',
  'Returned OFW (reintegrated)',
  'Distressed OFW / family of distressed OFW',
  'Family left behind of current OFW',
  'Repatriated OFW',
  'Deceased OFW family',
  'Other',
]

const gpsLoading = ref(false)
const copiedLat = ref(false)
const copiedLng = ref(false)

const localData = ref({
  typeOfRespondent: '',
  typeOfRespondentOther: '',
  dateOfInterview: '',
  timeOfInterview: '',
  enumeratorName: '',
  barangay: '',
  municipalityCity: '',
  provinceRegion: '',
  householdControlNumber: '',
  latitude: null,
  longitude: null,
  ...props.data,
})

watch(localData, (v) => emit('update:data', { ...v }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })

const selectType = (option) => {
  localData.value.typeOfRespondent = option
  handleTypeChange()
}

const handleTypeChange = () => {
  if (localData.value.typeOfRespondent !== 'Other') {
    localData.value.typeOfRespondentOther = ''
  }
  emitUpdate()
}

const captureGPS = async () => {
  gpsLoading.value = true
  try {
    const pos = await getCurrentPosition()
    localData.value.latitude = pos.latitude
    localData.value.longitude = pos.longitude
  } catch {
    alert('❌ Please allow location access')
  }
  gpsLoading.value = false
}

const copyLat = async () => {
  await navigator.clipboard.writeText(localData.value.latitude.toFixed(6))
  copiedLat.value = true
  setTimeout(() => (copiedLat.value = false), 1500)
}

const copyLng = async () => {
  await navigator.clipboard.writeText(localData.value.longitude.toFixed(6))
  copiedLng.value = true
  setTimeout(() => (copiedLng.value = false), 1500)
}
</script>

<style scoped>
/* ══ SECTION BODY ════════════════════════════ */
.section-body {
  padding: 10px 24px 24px;
}

/* ══ FIELD GROUPS ════════════════════════════ */
.field-group {
  margin-bottom: 14px;
}

/* ══ FIELD ITEMS ═════════════════════════════ */
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

/* Vuetify input override — match ReportDetail card feel */
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

/* ══ GPS CARD ════════════════════════════════ */
.gps-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #f8faff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 14px 16px;
  flex: 1;
}

.gps-btn {
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.3px;
  align-self: flex-start;
}

.gps-coords {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.coord-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
}

.coord-label {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.8px;
  color: #3b82f6;
  background: #dbeafe;
  border-radius: 4px;
  padding: 2px 6px;
  flex-shrink: 0;
}

.coord-value {
  font-weight: 600;
  color: #0f2a5e;
  font-variant-numeric: tabular-nums;
  flex: 1;
}

.copy-btn {
  color: #9ca3af !important;
}

.copied-tag {
  font-size: 11px;
  font-weight: 700;
  color: #16a34a;
}

.gps-empty {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #9ca3af;
  font-style: italic;
}

/* ══ RADIO CARDS ═════════════════════════════ */
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

.radio-inner {
  margin: 0;
}

.radio-label-text {
  font-size: 13px;
  color: #111827;
  line-height: 1.4;
}

.radio-card--selected .radio-label-text {
  color: #1d4ed8;
  font-weight: 600;
}

.other-input {
  margin-top: 8px;
  font-size: 13px;
}

.other-input :deep(.v-field__input) {
  font-size: 13px;
  color: #1d4ed8;
}

/* ══ MOBILE ══════════════════════════════════ */
@media (max-width: 480px) {
  .section-body {
    padding: 14px 14px 18px;
  }

  .section-header {
    padding: 12px 14px;
  }

  .gps-card {
    padding: 12px;
  }

  .radio-card {
    padding: 8px 12px;
  }
}
</style>
