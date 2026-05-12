<template>
  <div class="report-detail">
    <!-- ─── HERO CARD ─── -->
    <div class="hero-card">
      <div class="hero-info">
        <div class="hero-meta-panel">
          <div class="hero-name">{{ response.respondent_name || 'Unnamed Respondent' }}</div>
          <div class="hero-meta-row">
            <v-icon size="14" class="meta-icon">mdi-calendar-outline</v-icon>
            Submitted {{ formatDate(response.created_at) }}
            <span v-if="response.enumerator_name" class="meta-sep">·</span>
            <v-icon v-if="response.enumerator_name" size="14" class="meta-icon">
              mdi-account-outline
            </v-icon>
            <span v-if="response.enumerator_name">{{ response.enumerator_name }}</span>
          </div>

          <div v-if="response.latitude" class="hero-gps">
            <v-icon size="13" class="meta-icon">mdi-map-marker-outline</v-icon>
            {{ response.latitude?.toFixed(5) }}, {{ response.longitude?.toFixed(5) }}
          </div>

          <div class="hero-chips">
            <span class="hero-chip">
              <v-icon size="12" style="margin-right: 4px">mdi-briefcase-outline</v-icon>
              OFW Family Profiling
            </span>
            <span class="hero-chip">
              <v-icon size="12" style="margin-right: 4px">mdi-refresh</v-icon>
              Reintegration Assessment
            </span>
            <span class="hero-chip hero-chip--blue">
              <v-icon size="12" style="margin-right: 4px">mdi-check-circle-outline</v-icon>
              {{ filledSections }} / 20 Sections
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- ─── SECTION TOC PILLS ─── -->
    <div class="section-toc">
      <button
        v-for="s in sectionOrder"
        :key="s.key"
        class="toc-pill"
        :class="{ 'has-data': hasData(s.key) }"
        :title="s.title"
        @click="scrollTo(s.key)"
      >
        {{ s.num }}
      </button>
    </div>

    <!-- ─── SECTIONS ─── -->
    <div v-for="s in orderedSections" :key="s.key" class="section-block" :id="'sec-' + s.key">
      <div class="section-header" @click="toggle(s.key)">
        <div class="section-icon-wrap">
          <v-icon size="16" color="#3b82f6">{{ s.icon }}</v-icon>
        </div>
        <div class="section-num">{{ s.num }}</div>
        <div class="section-title-text">{{ s.title }}</div>
        <v-icon size="18" class="chevron" :class="{ open: openSections[s.key] }">
          mdi-chevron-down
        </v-icon>
      </div>

      <transition name="slide">
        <div v-show="openSections[s.key]" class="section-body">
          <!-- ── Special render: Consent section ── -->
          <template v-if="s.key === 'consent'">
            <div v-if="!s.data || !Object.keys(s.data).length" class="no-data">
              <v-icon size="16" style="margin-right: 6px; color: #9ca3af">
                mdi-information-outline
              </v-icon>
              No data recorded for this section.
            </div>
            <template v-else>
              <!-- Consent Agreement -->
              <div class="field-row">
                <div class="field-label">Consent Agreement</div>
                <div class="field-value">
                  <span
                    class="chip"
                    :class="s.data.consentAgreement === 'agree' ? 'chip-yes' : 'chip-no'"
                  >
                    <v-icon size="12" style="margin-right: 3px">
                      {{ s.data.consentAgreement === 'agree' ? 'mdi-check' : 'mdi-close' }}
                    </v-icon>
                    {{
                      s.data.consentAgreement === 'agree'
                        ? 'Voluntarily Agreed'
                        : s.data.consentAgreement === 'disagree'
                          ? 'Did Not Agree'
                          : '—'
                    }}
                  </span>
                </div>
              </div>

              <!-- Respondent Name -->
              <div class="field-row">
                <div class="field-label">Respondent Name</div>
                <div class="field-value" :class="{ empty: !s.data.respondentName }">
                  {{ s.data.respondentName || '—' }}
                </div>
              </div>

              <!-- Respondent Date -->
              <div class="field-row">
                <div class="field-label">Respondent Date</div>
                <div class="field-value" :class="{ empty: !s.data.respondentDate }">
                  {{ s.data.respondentDate || '—' }}
                </div>
              </div>

              <!-- Respondent Signature -->
              <div class="field-row">
                <div class="field-label">Respondent Signature</div>
                <div class="field-value">
                  <template v-if="s.data.respondentSignature">
                    <div class="signature-preview-wrap">
                      <img
                        :src="s.data.respondentSignature"
                        alt="Respondent Signature"
                        class="signature-preview"
                      />
                    </div>
                  </template>
                  <span v-else class="empty">—</span>
                </div>
              </div>

              <!-- Enumerator Name -->
              <div class="field-row">
                <div class="field-label">Enumerator Name</div>
                <div class="field-value" :class="{ empty: !s.data.enumeratorName }">
                  {{ s.data.enumeratorName || '—' }}
                </div>
              </div>

              <!-- Enumerator Date -->
              <div class="field-row">
                <div class="field-label">Enumerator Date</div>
                <div class="field-value" :class="{ empty: !s.data.enumeratorDate }">
                  {{ s.data.enumeratorDate || '—' }}
                </div>
              </div>

              <!-- Enumerator Signature -->
              <div class="field-row">
                <div class="field-label">Enumerator Signature</div>
                <div class="field-value">
                  <template v-if="s.data.enumeratorSignature">
                    <div class="signature-preview-wrap">
                      <img
                        :src="s.data.enumeratorSignature"
                        alt="Enumerator Signature"
                        class="signature-preview"
                      />
                    </div>
                  </template>
                  <span v-else class="empty">—</span>
                </div>
              </div>
            </template>
          </template>

          <!-- ── Default render: all other sections ── -->
          <template v-else>
            <div v-if="!s.data || !Object.keys(s.data).length" class="no-data">
              <v-icon size="16" style="margin-right: 6px; color: #9ca3af">
                mdi-information-outline
              </v-icon>
              No data recorded for this section.
            </div>
            <template v-else>
              <div v-for="(value, field) in s.data" :key="field" class="field-row">
                <div class="field-label">{{ formatLabel(field) }}</div>

                <!-- Array → chips -->
                <div v-if="Array.isArray(value) && value.length" class="field-value">
                  <div class="chip-list">
                    <span class="chip" v-for="(v, i) in value" :key="i">{{ v }}</span>
                  </div>
                </div>

                <!-- Boolean -->
                <div v-else-if="typeof value === 'boolean'" class="field-value">
                  <span class="chip" :class="value ? 'chip-yes' : 'chip-no'">
                    <v-icon size="12" style="margin-right: 3px">
                      {{ value ? 'mdi-check' : 'mdi-close' }}
                    </v-icon>
                    {{ value ? 'Yes' : 'No' }}
                  </span>
                </div>

                <!-- Empty -->
                <div
                  v-else-if="value === null || value === undefined || value === ''"
                  class="field-value empty"
                >
                  —
                </div>

                <!-- Plain text -->
                <div v-else class="field-value">{{ value }}</div>
              </div>
            </template>
          </template>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

const props = defineProps({ response: { type: Object, required: true } })

const answers = computed(() => props.response?.answers || {})

const sectionOrder = [
  { key: 'general', num: 'I', title: 'General Information', icon: 'mdi-home-outline' },
  { key: 'respondent', num: 'II', title: 'Respondent Identification', icon: 'mdi-account-outline' },
  { key: 'household', num: 'III', title: 'Household Demographic Profile', icon: 'mdi-home-group' },
  { key: 'ofwProfile', num: 'IV', title: 'OFW Profile', icon: 'mdi-airplane' },
  { key: 'migration', num: 'V', title: 'Migration History', icon: 'mdi-map-outline' },
  { key: 'presentStatus', num: 'VI', title: 'Present Status', icon: 'mdi-refresh-circle' },
  { key: 'socioEconomic', num: 'VII', title: 'Socio-Economic Profile', icon: 'mdi-currency-usd' },
  { key: 'livelihood', num: 'VIII', title: 'Livelihood Status', icon: 'mdi-briefcase-outline' },
  { key: 'education', num: 'IX', title: 'Education Status', icon: 'mdi-school-outline' },
  { key: 'health', num: 'X', title: 'Health & Psychosocial Status', icon: 'mdi-heart-outline' },
  {
    key: 'assistance',
    num: 'XI',
    title: 'Social Protection & Assistance',
    icon: 'mdi-shield-outline',
  },
  { key: 'problems', num: 'XII', title: 'Problems & Issues', icon: 'mdi-alert-circle-outline' },
  {
    key: 'reintegration',
    num: 'XIII',
    title: 'Reintegration Status',
    icon: 'mdi-rocket-launch-outline',
  },
  {
    key: 'needs',
    num: 'XIV',
    title: 'Training, Employment & Needs',
    icon: 'mdi-handshake-outline',
  },
  { key: 'risk', num: 'XV', title: 'Risk Screening', icon: 'mdi-magnify' },
  {
    key: 'community',
    num: 'XVI',
    title: 'Community Participation',
    icon: 'mdi-account-group-outline',
  },
  { key: 'financial', num: 'XVII', title: 'Financial Literacy', icon: 'mdi-chart-line' },
  {
    key: 'openEnded',
    num: 'XVIII',
    title: 'Open-Ended Questions',
    icon: 'mdi-comment-text-outline',
  },
  {
    key: 'enumerator',
    num: 'XIX',
    title: "Enumerator's Assessment",
    icon: 'mdi-clipboard-text-outline',
  },
  { key: 'consent', num: 'XX', title: 'Consent & Data Privacy', icon: 'mdi-shield-lock-outline' },
]

const openSections = reactive(Object.fromEntries(sectionOrder.map((s) => [s.key, false])))

const orderedSections = computed(() =>
  sectionOrder.map((s) => ({ ...s, data: answers.value[s.key] })),
)

const hasData = (key) => {
  const d = answers.value[key]
  return d && Object.keys(d).length > 0
}

const filledSections = computed(() => sectionOrder.filter((s) => hasData(s.key)).length)

const initials = computed(() =>
  (props.response.respondent_name || 'U N')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join(''),
)

const toggle = (key) => {
  openSections[key] = !openSections[key]
}

const scrollTo = (key) => {
  openSections[key] = true
  const el = document.getElementById('sec-' + key)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const formatDate = (date) =>
  new Date(date).toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' })

const formatLabel = (key) =>
  key
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^./, (s) => s.toUpperCase())
</script>

<style scoped>
/* ══ HERO CARD ══════════════════════════════ */
.hero-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 0;
  margin-bottom: 20px;
  display: flex;
  align-items: stretch;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 12px rgba(10, 31, 78, 0.08);
  overflow: hidden;
}

.hero-info {
  flex: 1;
  min-width: 0;
  position: relative;
}

.hero-name {
  font-size: clamp(16px, 3vw, 22px);
  font-weight: 800;
  color: #0f2a5e;
  margin-bottom: 10px;
  line-height: 1.2;
}

.hero-meta-panel {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  box-sizing: border-box;
}

.hero-meta-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
  font-size: 12.5px;
  color: #374151;
  line-height: 1.6;
}

.meta-icon {
  color: #3b82f6 !important;
  flex-shrink: 0;
}

.meta-sep {
  color: #d1d5db;
  margin: 0 2px;
}

.hero-gps {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11.5px;
  color: #6b7280;
}

.hero-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.hero-chip {
  display: inline-flex;
  align-items: center;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 11px;
  color: #374151;
  font-weight: 600;
}

.hero-chip--blue {
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1d4ed8;
}

/* ══ TOC PILLS ══════════════════════════════ */
.section-toc {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}

.toc-pill {
  border: 1.5px solid #e2e8f0;
  background: #f8faff;
  border-radius: 20px;
  padding: 4px 11px;
  font-size: 11px;
  font-weight: 700;
  color: #6b7fa8;
  cursor: pointer;
  transition: all 0.14s ease;
  font-family: inherit;
  letter-spacing: 0.4px;
}

.toc-pill:hover {
  border-color: #1d4ed8;
  color: #1d4ed8;
  background: #eff6ff;
}

.toc-pill.has-data {
  border-color: #bfdbfe;
  color: #1d4ed8;
  background: #eff6ff;
}

.toc-pill.has-data:hover {
  border-color: #1d4ed8;
  background: #dbeafe;
}

/* ══ SECTION BLOCK ══════════════════════════ */
.section-block {
  background: white;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(10, 31, 78, 0.06);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;
  user-select: none;
  transition: background 0.15s;
}

.section-header:hover {
  background: #f8faff;
}

.section-icon-wrap {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: #eff6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.section-num {
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: #1d4ed8;
  background: #dbeafe;
  border-radius: 5px;
  padding: 3px 8px;
  flex-shrink: 0;
  line-height: 1.4;
}

.section-title-text {
  font-size: 13px;
  font-weight: 700;
  color: #0f2a5e;
  flex: 1;
  line-height: 1.3;
}

.chevron {
  color: #9ca3af !important;
  transition: transform 0.22s ease;
  flex-shrink: 0;
}
.chevron.open {
  transform: rotate(180deg);
  color: #3b82f6 !important;
}

/* ══ SECTION BODY ════════════════════════════ */
.section-body {
  padding: 16px 20px 20px;
  background: white;
}

.field-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 10px 0;
  border-bottom: 1px solid #f5f7fb;
}
.field-row:last-child {
  border-bottom: none;
}

.field-label {
  font-size: 11.5px;
  font-weight: 700;
  color: #6b7fa8;
  min-width: 200px;
  flex-shrink: 0;
  padding-top: 2px;
  line-height: 1.5;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.field-value {
  font-size: 13.5px;
  color: #111827;
  flex: 1;
  line-height: 1.6;
}
.field-value.empty {
  color: #d1daea;
  font-style: italic;
}

/* Chips */
.chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.chip {
  display: inline-flex;
  align-items: center;
  background: #eff6ff;
  color: #0f2a5e;
  border: 1px solid #bfdbfe;
  border-radius: 20px;
  padding: 3px 10px;
  font-size: 12px;
  font-weight: 600;
}

.chip-yes {
  background: #eff6ff;
  color: #1d4ed8;
  border-color: #bfdbfe;
}

.chip-no {
  background: #fef2f2;
  color: #b91c1c;
  border-color: #fecaca;
}

.no-data {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #9ca3af;
  font-style: italic;
  padding: 8px 0;
}

/* ── Signature Preview ── */
.signature-preview-wrap {
  background: #f8faff;
  border: 1.5px solid #bfdbfe;
  border-radius: 10px;
  padding: 10px 14px;
  display: inline-block;
  max-width: 320px;
}

.signature-preview {
  display: block;
  max-width: 100%;
  height: auto;
  max-height: 100px;
}

/* ══ SLIDE TRANSITION ════════════════════════ */
.slide-enter-active,
.slide-leave-active {
  transition:
    opacity 0.2s,
    max-height 0.3s ease;
  overflow: hidden;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
}
.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  max-height: 2000px;
}

/* ══ MOBILE ══════════════════════════════════ */
@media (max-width: 480px) {
  .hero-meta-panel {
    padding: 14px 16px;
  }
  .field-row {
    flex-direction: column;
    gap: 4px;
  }
  .field-label {
    min-width: unset;
    width: 100%;
    font-size: 10.5px;
  }
  .field-value {
    font-size: 13px;
  }
  .section-header {
    padding: 12px 14px;
  }
  .section-body {
    padding: 12px 14px 16px;
  }
  .toc-pill {
    font-size: 10px;
    padding: 3px 9px;
  }
  .signature-preview-wrap {
    max-width: 100%;
  }
}

/* ══ TABLET ══════════════════════════════════ */
@media (max-width: 768px) {
  .hero-meta-panel {
    padding: 16px 18px;
  }
  .field-label {
    min-width: 140px;
  }
}
</style>
