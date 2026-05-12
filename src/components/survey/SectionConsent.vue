<!-- src/components/survey/SectionConsent.vue -->
<template>
  <div>
    <div class="section-body">
      <!-- ── BLOCK: Privacy Statement ── -->
      <div class="field-group">
        <div class="consent-statement">
          <div class="consent-icon-wrap">
            <v-icon size="22" color="#1d4ed8">mdi-shield-lock-outline</v-icon>
          </div>
          <p class="consent-text">
            "I understand that the information I provide in this survey will be used solely for
            profiling, planning, case management, welfare assistance, reintegration support, and
            referral services for OFWs and their families. My participation is voluntary, and my
            personal information will be handled in accordance with applicable data privacy and
            confidentiality policies."
          </p>
        </div>
      </div>

      <!-- ── BLOCK: Agreement ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Consent Agreement
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" v-for="option in consentOptions" :key="option.value">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.consentAgreement === option.value }"
              @click="selectConsent(option.value)"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.consentAgreement === option.value }"
                />
                <span class="radio-label-text">{{ option.label }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Respondent Details ── -->
      <div class="field-group">
        <v-row dense>
          <v-col cols="12" md="6">
            <div class="field-item">
              <label class="field-label">Name of Respondent</label>
              <v-text-field
                v-model="localData.respondentName"
                placeholder="Full name"
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
              <label class="field-label">Date</label>
              <v-text-field
                v-model="localData.respondentDate"
                type="date"
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

      <!-- ── BLOCK: Respondent Signature ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 8px">
          Signature / Thumbmark of Respondent
        </label>
        <div class="signature-card">
          <canvas
            ref="respondentCanvas"
            class="signature-canvas"
            @mousedown="startDraw($event, 'respondent')"
            @mousemove="draw($event, 'respondent')"
            @mouseup="stopDraw('respondent')"
            @mouseleave="stopDraw('respondent')"
            @touchstart.prevent="startDraw($event, 'respondent')"
            @touchmove.prevent="draw($event, 'respondent')"
            @touchend="stopDraw('respondent')"
          />
          <div class="signature-actions">
            <span class="signature-hint">Sign above using your mouse or finger</span>
            <button class="clear-btn" @click="clearSignature('respondent')">
              <v-icon size="13" style="margin-right: 3px">mdi-eraser</v-icon>
              Clear
            </button>
          </div>
        </div>
      </div>

      <!-- ── BLOCK: Enumerator Details ── -->
      <div class="field-group">
        <v-row dense>
          <v-col cols="12" md="6">
            <div class="field-item">
              <label class="field-label">Name of Enumerator</label>
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

          <v-col cols="12" md="6">
            <div class="field-item">
              <label class="field-label">Date</label>
              <v-text-field
                v-model="localData.enumeratorDate"
                type="date"
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

      <!-- ── BLOCK: Enumerator Signature ── -->
      <div class="field-group" style="margin-bottom: 0">
        <label class="field-label" style="display: block; margin-bottom: 8px">
          Signature of Enumerator
        </label>
        <div class="signature-card">
          <canvas
            ref="enumeratorCanvas"
            class="signature-canvas"
            @mousedown="startDraw($event, 'enumerator')"
            @mousemove="draw($event, 'enumerator')"
            @mouseup="stopDraw('enumerator')"
            @mouseleave="stopDraw('enumerator')"
            @touchstart.prevent="startDraw($event, 'enumerator')"
            @touchmove.prevent="draw($event, 'enumerator')"
            @touchend="stopDraw('enumerator')"
          />
          <div class="signature-actions">
            <span class="signature-hint">Sign above using your mouse or finger</span>
            <button class="clear-btn" @click="clearSignature('enumerator')">
              <v-icon size="13" style="margin-right: 3px">mdi-eraser</v-icon>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({ data: Object })
const emit = defineEmits(['update:data'])

const consentOptions = [
  { value: 'agree', label: 'I voluntarily agree to participate in this survey.' },
  { value: 'disagree', label: 'I do not agree.' },
]

const respondentCanvas = ref(null)
const enumeratorCanvas = ref(null)
const drawing = ref({ respondent: false, enumerator: false })

const localData = ref({
  consentAgreement: '',
  respondentName: '',
  respondentDate: '',
  respondentSignature: '',
  enumeratorName: '',
  enumeratorDate: '',
  enumeratorSignature: '',
  ...props.data,
})

watch(localData, (v) => emit('update:data', { ...v }), { deep: true })
const emitUpdate = () => emit('update:data', { ...localData.value })

const selectConsent = (val) => {
  localData.value.consentAgreement = val
  emitUpdate()
}

// ── Canvas helpers ──
const getCanvas = (who) => (who === 'respondent' ? respondentCanvas.value : enumeratorCanvas.value)

const getPos = (e, canvas) => {
  const rect = canvas.getBoundingClientRect()
  const src = e.touches ? e.touches[0] : e
  return {
    x: (src.clientX - rect.left) * (canvas.width / rect.width),
    y: (src.clientY - rect.top) * (canvas.height / rect.height),
  }
}

const startDraw = (e, who) => {
  const canvas = getCanvas(who)
  const ctx = canvas.getContext('2d')
  const pos = getPos(e, canvas)
  ctx.beginPath()
  ctx.moveTo(pos.x, pos.y)
  drawing.value[who] = true
}

const draw = (e, who) => {
  if (!drawing.value[who]) return
  const canvas = getCanvas(who)
  const ctx = canvas.getContext('2d')
  const pos = getPos(e, canvas)
  ctx.lineWidth = 2
  ctx.lineCap = 'round'
  ctx.strokeStyle = '#0f2a5e'
  ctx.lineTo(pos.x, pos.y)
  ctx.stroke()
}

const stopDraw = (who) => {
  if (!drawing.value[who]) return
  drawing.value[who] = false
  const canvas = getCanvas(who)
  const key = who === 'respondent' ? 'respondentSignature' : 'enumeratorSignature'
  localData.value[key] = canvas.toDataURL()
  emitUpdate()
}

const clearSignature = (who) => {
  const canvas = getCanvas(who)
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const key = who === 'respondent' ? 'respondentSignature' : 'enumeratorSignature'
  localData.value[key] = ''
  emitUpdate()
}

onMounted(() => {
  ;[respondentCanvas.value, enumeratorCanvas.value].forEach((canvas) => {
    if (canvas) {
      canvas.width = canvas.offsetWidth || 600
      canvas.height = 120
    }
  })
})
</script>

<style scoped>
.section-body {
  padding: 10px 24px 24px;
}

.field-group {
  margin-bottom: 20px;
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

/* ── Consent Statement ── */
.consent-statement {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: #eff6ff;
  border: 1.5px solid #bfdbfe;
  border-radius: 14px;
  padding: 20px 22px;
}

.consent-icon-wrap {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: #dbeafe;
  border: 1.5px solid #93c5fd;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.consent-text {
  font-size: 13.5px;
  color: #1e3a8a;
  line-height: 1.75;
  margin: 0;
  font-style: italic;
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
  line-height: 1.4;
}
.radio-card--selected .radio-label-text {
  color: #1d4ed8;
  font-weight: 600;
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

/* ── Signature Canvas ── */
.signature-card {
  border: 1.5px solid #bfdbfe;
  border-radius: 12px;
  background: #f8faff;
  overflow: hidden;
}

.signature-canvas {
  display: block;
  width: 100%;
  height: 120px;
  cursor: crosshair;
  touch-action: none;
  background: #ffffff;
  border-bottom: 1px dashed #dbeafe;
}

.signature-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
}

.signature-hint {
  font-size: 11px;
  color: #93c5fd;
  font-style: italic;
}

.clear-btn {
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  font-weight: 700;
  font-family: inherit;
  color: #6b7fa8;
  background: #eff6ff;
  border: 1.5px solid #bfdbfe;
  border-radius: 6px;
  padding: 4px 10px;
  cursor: pointer;
  transition:
    background 0.14s,
    color 0.14s;
}
.clear-btn:hover {
  background: #dbeafe;
  color: #1d4ed8;
}

/* ── Mobile ── */
@media (max-width: 480px) {
  .section-body {
    padding: 14px 14px 18px;
  }
  .consent-statement {
    flex-direction: column;
    gap: 10px;
    padding: 14px;
  }
  .radio-card {
    padding: 8px 12px;
  }
}
</style>
