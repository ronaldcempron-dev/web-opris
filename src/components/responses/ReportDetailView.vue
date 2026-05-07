<template>
  <div class="report-detail">
    <!-- ─── HERO CARD ─── -->
    <div class="hero-card">
      <div class="hero-avatar">{{ initials }}</div>
      <div class="hero-info">
        <div class="hero-name">{{ response.respondent_name || 'Unnamed Respondent' }}</div>
        <div class="hero-meta">
          Submitted: {{ formatDate(response.created_at) }}
          <span v-if="response.enumerator_name"> · Enumerator: {{ response.enumerator_name }}</span>
        </div>
        <div v-if="response.latitude" class="hero-gps">
          📍 {{ response.latitude?.toFixed(5) }}, {{ response.longitude?.toFixed(5) }}
        </div>
        <div class="hero-chips">
          <span class="hero-chip">OFW Family Profiling</span>
          <span class="hero-chip">Reintegration Assessment</span>
          <span class="hero-chip">{{ filledSections }} / 19 Sections</span>
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
        <div class="section-icon">{{ s.icon }}</div>
        <div class="section-num">{{ s.num }}</div>
        <div class="section-title-text">{{ s.title }}</div>
        <span class="chevron" :class="{ open: openSections[s.key] }">▾</span>
      </div>

      <transition name="slide">
        <div v-show="openSections[s.key]" class="section-body">
          <div v-if="!s.data || !Object.keys(s.data).length" class="no-data">
            No data recorded for this section.
          </div>
          <template v-else>
            <div v-for="(value, field) in s.data" :key="field" class="field-row">
              <div class="field-label">{{ formatLabel(field) }}</div>
              <!-- Array values → chips -->
              <div v-if="Array.isArray(value) && value.length" class="field-value">
                <div class="chip-list">
                  <span class="chip" v-for="(v, i) in value" :key="i">{{ v }}</span>
                </div>
              </div>
              <!-- Boolean -->
              <div v-else-if="typeof value === 'boolean'" class="field-value">
                <span class="chip" :class="value ? 'chip-yes' : 'chip-no'">
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
  { key: 'general', num: 'I', title: 'General Information', icon: '🏠' },
  { key: 'respondent', num: 'II', title: 'Respondent Identification', icon: '👤' },
  { key: 'household', num: 'III', title: 'Household Demographic Profile', icon: '🏘️' },
  { key: 'ofwProfile', num: 'IV', title: 'OFW Profile', icon: '✈️' },
  { key: 'migration', num: 'V', title: 'Migration History', icon: '🗺️' },
  { key: 'presentStatus', num: 'VI', title: 'Present Status', icon: '🔄' },
  { key: 'socioEconomic', num: 'VII', title: 'Socio-Economic Profile', icon: '💰' },
  { key: 'livelihood', num: 'VIII', title: 'Livelihood Status', icon: '💼' },
  { key: 'education', num: 'IX', title: 'Education Status', icon: '🎓' },
  { key: 'health', num: 'X', title: 'Health & Psychosocial Status', icon: '❤️' },
  { key: 'assistance', num: 'XI', title: 'Social Protection & Assistance', icon: '🛡️' },
  { key: 'problems', num: 'XII', title: 'Problems & Issues', icon: '⚠️' },
  { key: 'reintegration', num: 'XIII', title: 'Reintegration Status', icon: '🚀' },
  { key: 'needs', num: 'XIV', title: 'Training, Employment & Needs', icon: '🤝' },
  { key: 'risk', num: 'XV', title: 'Risk Screening', icon: '🔍' },
  { key: 'community', num: 'XVI', title: 'Community Participation', icon: '👥' },
  { key: 'financial', num: 'XVII', title: 'Financial Literacy', icon: '📈' },
  { key: 'openEnded', num: 'XVIII', title: 'Open-Ended Questions', icon: '💬' },
  { key: 'enumerator', num: 'XIX', title: "Enumerator's Assessment", icon: '📋' },
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
/* ══ HERO ════════════════════════════════ */
.hero-card {
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #3b82f6 100%);
  border-radius: 20px;
  padding: 28px 32px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
}
.hero-avatar {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 800;
  color: white;
  flex-shrink: 0;
  letter-spacing: -1px;
}
.hero-info {
  flex: 1;
  min-width: 0;
}
.hero-name {
  font-size: clamp(16px, 3vw, 24px);
  font-weight: 800;
  color: white;
  margin-bottom: 6px;
}
.hero-meta {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}
.hero-gps {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 2px;
}
.hero-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}
.hero-chip {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  padding: 3px 12px;
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
}

/* ══ TOC ═════════════════════════════════ */
.section-toc {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}
.toc-pill {
  border: 1.5px solid #e5e7eb;
  background: white;
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 11.5px;
  font-weight: 700;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.12s;
  font-family: inherit;
}
.toc-pill:hover {
  border-color: #93c5fd;
  color: #1d4ed8;
  background: #eff6ff;
}
.toc-pill.has-data {
  border-color: #bbf7d0;
  color: #15803d;
  background: #f0fdf4;
}

/* ══ SECTION BLOCK ═══════════════════════ */
.section-block {
  background: white;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  margin-bottom: 12px;
}
.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  background: #fafafa;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
  user-select: none;
}
.section-header:hover {
  background: #f3f4f6;
}
.section-icon {
  font-size: 18px;
  flex-shrink: 0;
}
.section-num {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #1d4ed8;
  background: #eff6ff;
  border-radius: 5px;
  padding: 3px 8px;
  flex-shrink: 0;
}
.section-title-text {
  font-size: 13.5px;
  font-weight: 700;
  color: #111827;
  flex: 1;
}
.chevron {
  font-size: 14px;
  color: #9ca3af;
  transition: transform 0.2s;
  flex-shrink: 0;
}
.chevron.open {
  transform: rotate(180deg);
}

/* ══ SECTION BODY ════════════════════════ */
.section-body {
  padding: 16px 20px 20px;
}

.field-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 9px 0;
  border-bottom: 1px solid #f9fafb;
}
.field-row:last-child {
  border-bottom: none;
}
.field-label {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  min-width: 200px;
  flex-shrink: 0;
  padding-top: 2px;
  line-height: 1.5;
}
.field-value {
  font-size: 13.5px;
  color: #111827;
  flex: 1;
  line-height: 1.6;
}
.field-value.empty {
  color: #d1d5db;
  font-style: italic;
}

.chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.chip {
  display: inline-block;
  background: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
  border-radius: 20px;
  padding: 3px 10px;
  font-size: 12px;
  font-weight: 600;
}
.chip-yes {
  background: #f0fdf4;
  color: #15803d;
  border-color: #bbf7d0;
}
.chip-no {
  background: #fef2f2;
  color: #b91c1c;
  border-color: #fecaca;
}

.no-data {
  font-size: 13px;
  color: #9ca3af;
  font-style: italic;
  padding: 8px 0;
}

/* ══ TRANSITION ══════════════════════════ */
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

@media (max-width: 480px) {
  .hero-card {
    padding: 20px;
    gap: 14px;
  }
  .hero-avatar {
    width: 54px;
    height: 54px;
    font-size: 20px;
  }
  .field-label {
    min-width: 140px;
    font-size: 11.5px;
  }
  .section-header {
    padding: 12px 16px;
  }
  .section-body {
    padding: 12px 16px 16px;
  }
}
</style>
