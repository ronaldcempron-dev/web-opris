<template>
  <v-app theme="light" style="background: #f5f4f0">
    <!-- Shared Sidebar -->
    <Sidebar v-model="drawer" />

    <!-- ─── MAIN CONTENT ─── -->
    <v-main>
      <div class="survey-layout">
        <!-- ─── STICKY TOP RAIL ─── -->
        <div class="progress-rail">
          <div class="progress-rail-inner">
            <div class="left-rail" style="margin-left: 0; padding-left: 0">
              <v-btn
                icon
                variant="text"
                size="small"
                @click="drawer = !drawer"
                class="rail-menu-btn"
              >
                <v-icon>mdi-menu</v-icon>
              </v-btn>
              <div class="rail-title-block">
                <span class="rail-title">OFW Family Profiling</span>
                <span class="rail-sub">Section {{ step }} of 19</span>
              </div>
            </div>

            <v-spacer />

            <div style="min-width: 90px; display: flex; justify-content: flex-end">
              <div class="rail-pct">{{ Math.round((step / 19) * 100) }}%</div>
            </div>
          </div>

          <div class="rail-bar-track">
            <div class="rail-bar-fill" :style="{ width: `${(step / 19) * 100}%` }" />
          </div>
        </div>

        <!-- ─── MAIN BODY ─── -->
        <div class="survey-body">
          <!-- HEADER -->
          <header class="survey-header">
            <div class="header-logos-row">
              <div class="logo-unit">
                <v-img src="/DMW Logo.png" :width="logoSize" :height="logoSize" contain />
                <span class="logo-label">TAHANAN NG OFW</span>
              </div>

              <div class="header-title-center">
                <h1 class="survey-title">
                  OFW Family Profiling &amp;<br class="title-break" />
                  Reintegration Needs Assessment Form
                </h1>
                <p class="survey-subtitle">
                  For Profiling, Welfare Assistance, Reintegration Planning, Referral, and Case
                  Management
                </p>
              </div>

              <div class="logo-unit">
                <v-img src="/BagongPilipinas.png" :width="logoSize" :height="logoSize" contain />
                <span class="logo-label">BAGONG PILIPINAS</span>
              </div>
            </div>
          </header>

          <!-- SECTION NAV PILLS -->
          <div class="section-nav">
            <div class="section-nav-scroll" ref="navScroll">
              <button
                v-for="item in breadcrumbItems"
                :key="item.step"
                class="snav-pill"
                :class="{ active: item.step === step, past: item.step < step }"
                :ref="
                  (el) => {
                    if (item.step === step) activePill = el
                  }
                "
                @click="step = item.step"
              >
                <span class="snav-num">{{ item.step }}</span>
                <span class="snav-label">{{ item.title }}</span>
              </button>
            </div>
          </div>

          <!-- FORM PANEL -->
          <div class="form-panel">
            <div class="section-heading">
              <div class="section-badge">Section {{ step }}</div>
              <h2 class="section-title">{{ currentSection.title }}</h2>
            </div>

            <div class="section-body">
              <v-stepper-window v-model="step">
                <v-stepper-window-item :value="1">
                  <SectionGeneralInfo :data="formData.general" />
                </v-stepper-window-item>
                <v-stepper-window-item :value="2">
                  <SectionRespondent :data="formData.respondent" />
                </v-stepper-window-item>
                <v-stepper-window-item :value="3">
                  <SectionHousehold :data="formData.household" />
                </v-stepper-window-item>
                <v-stepper-window-item :value="4">
                  <SectionOFWProfile :data="formData.ofwProfile" />
                </v-stepper-window-item>
                <v-stepper-window-item :value="5">
                  <SectionMigration :data="formData.migration" />
                </v-stepper-window-item>
                <v-stepper-window-item :value="6">
                  <SectionPresentStatus :data="formData.presentStatus" />
                </v-stepper-window-item>
                <v-stepper-window-item :value="7">
                  <SectionSocioEconomic :data="formData.socioEconomic" />
                </v-stepper-window-item>
                <v-stepper-window-item :value="8">
                  <SectionLivelihood :data="formData.livelihood" />
                </v-stepper-window-item>
                <v-stepper-window-item :value="9">
                  <SectionEducation :data="formData.education" />
                </v-stepper-window-item>
                <v-stepper-window-item :value="10">
                  <SectionHealth :data="formData.health" />
                </v-stepper-window-item>
                <v-stepper-window-item :value="11">
                  <SectionAssistance :data="formData.assistance" />
                </v-stepper-window-item>
                <v-stepper-window-item :value="12">
                  <SectionProblems :data="formData.problems" />
                </v-stepper-window-item>
                <v-stepper-window-item :value="13">
                  <SectionReintegration :data="formData.reintegration" />
                </v-stepper-window-item>
                <v-stepper-window-item :value="14">
                  <SectionNeeds :data="formData.needs" />
                </v-stepper-window-item>
                <v-stepper-window-item :value="15">
                  <SectionRisk :data="formData.risk" />
                </v-stepper-window-item>
                <v-stepper-window-item :value="16">
                  <SectionCommunity :data="formData.community" />
                </v-stepper-window-item>
                <v-stepper-window-item :value="17">
                  <SectionFinancial :data="formData.financial" />
                </v-stepper-window-item>
                <v-stepper-window-item :value="18">
                  <SectionOpenEnded :data="formData.openEnded" />
                </v-stepper-window-item>
                <v-stepper-window-item :value="19">
                  <SectionEnumerator :data="formData.enumerator" />
                </v-stepper-window-item>
              </v-stepper-window>
            </div>

            <!-- FOOTER -->
            <div class="form-footer">
              <button v-if="step > 1" class="btn btn-outline" @click="step--">
                ← <span class="btn-text">Previous</span>
              </button>
              <div v-else class="btn-placeholder" />

              <!-- Dots: tablet + desktop -->
              <div class="footer-dots-wrap">
                <span
                  v-for="n in 19"
                  :key="n"
                  class="dot"
                  :class="{ active: n === step, past: n < step }"
                  @click="step = n"
                  :title="`Section ${n}`"
                />
              </div>

              <!-- Step counter: mobile only -->
              <div class="mobile-step-counter">{{ step }} / 19</div>

              <button v-if="step < 19" class="btn btn-primary" @click="step++">
                <span class="btn-text">Next</span> →
              </button>
              <button v-else class="btn btn-submit" :disabled="submitting" @click="handleSubmit">
                <v-icon size="15" style="margin-right: 4px">mdi-map-marker-check</v-icon>
                {{ submitting ? 'Submitting…' : 'Submit' }}
              </button>
            </div>
          </div>
          <!-- /form-panel -->

          <div style="height: 48px" />
        </div>
        <!-- /survey-body -->
      </div>
      <!-- /survey-layout -->
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useDisplay } from 'vuetify'
import { useSurveyForm } from '@/composables/useSurveyForm'
import { getCurrentPosition } from '@/services/geolocation'
import { supabase } from '@/services/supabase'
import { useRouter } from 'vue-router'

import Sidebar from '@/components/common/Sidebar.vue'

// Section Components
import SectionGeneralInfo from '@/components/survey/SectionGeneralInfo.vue'
import SectionRespondent from '@/components/survey/SectionRespondent.vue'
import SectionHousehold from '@/components/survey/SectionHousehold.vue'
import SectionOFWProfile from '@/components/survey/SectionOFWProfile.vue'
import SectionMigration from '@/components/survey/SectionMigration.vue'
import SectionPresentStatus from '@/components/survey/SectionPresentStatus.vue'
import SectionSocioEconomic from '@/components/survey/SectionSocioEconomic.vue'
import SectionLivelihood from '@/components/survey/SectionLivelihood.vue'
import SectionEducation from '@/components/survey/SectionEducation.vue'
import SectionHealth from '@/components/survey/SectionHealth.vue'
import SectionAssistance from '@/components/survey/SectionAssistance.vue'
import SectionProblems from '@/components/survey/SectionProblems.vue'
import SectionReintegration from '@/components/survey/SectionReintegration.vue'
import SectionNeeds from '@/components/survey/SectionNeeds.vue'
import SectionRisk from '@/components/survey/SectionRisk.vue'
import SectionCommunity from '@/components/survey/SectionCommunity.vue'
import SectionFinancial from '@/components/survey/SectionFinancial.vue'
import SectionOpenEnded from '@/components/survey/SectionOpenEnded.vue'
import SectionEnumerator from '@/components/survey/SectionEnumerator.vue'

const { formData } = useSurveyForm()
const { smAndDown } = useDisplay()

const step = ref(1)
const submitting = ref(false)
const drawer = ref(true)
const navScroll = ref(null)
const activePill = ref(null)
const router = useRouter()

const logoSize = computed(() => (smAndDown.value ? 44 : 60))

const goTo = (path) => {
  router.push(path)
}

const breadcrumbItems = [
  { title: 'General Information', step: 1 },
  { title: 'Respondent Identification', step: 2 },
  { title: 'Household Profile', step: 3 },
  { title: 'OFW Profile', step: 4 },
  { title: 'Migration History', step: 5 },
  { title: 'Present Status', step: 6 },
  { title: 'Socio-Economic Profile', step: 7 },
  { title: 'Livelihood Status', step: 8 },
  { title: 'Education Status', step: 9 },
  { title: 'Health & Psychosocial Status', step: 10 },
  { title: 'Social Protection & Assistance', step: 11 },
  { title: 'Present Problems & Issues', step: 12 },
  { title: 'Reintegration Status', step: 13 },
  { title: 'Training, Employment & Needs', step: 14 },
  { title: 'Risk Screening', step: 15 },
  { title: 'Community Participation', step: 16 },
  { title: 'Financial Literacy', step: 17 },
  { title: 'Open-Ended Questions', step: 18 },
  { title: "Enumerator's Assessment", step: 19 },
]

const currentSection = computed(() => breadcrumbItems[step.value - 1])

// Auto-scroll active pill into view
watch(step, async () => {
  await nextTick()
  if (activePill.value) {
    activePill.value.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }
})

const handleSubmit = async () => {
  submitting.value = true
  try {
    const geo = await getCurrentPosition()
    const { error } = await supabase.from('responses').insert({
      answers: { ...formData },
      latitude: geo.latitude,
      longitude: geo.longitude,
      enumerator_name: formData.general.enumeratorName,
      respondent_name: formData.respondent.name,
    })
    if (error) throw error
    alert('🎉 Survey submitted successfully!\n📍 GPS Location captured!')
  } catch (err) {
    alert('❌ ' + err.message)
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
/* ══ LAYOUT ══════════════════════════════ */
.survey-layout {
  min-height: 100vh;
  background: #f5f4f0;
}

.progress-rail,
.progress-rail-inner {
  margin-left: 0 !important;
  padding-left: 0 !important;
}

.survey-body {
  width: 100%;
  padding: 80px 40px 0;
  box-sizing: border-box;
}

/* ─── STICKY TOP RAIL - FIXED ALIGNMENT ─── */
.progress-rail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100 !important;
  background: linear-gradient(135deg, #1d4ed8, #2563eb, #3b82f6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 18px rgba(37, 99, 235, 0.25);
}

.progress-rail-inner {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 0 8px 0;
  box-sizing: border-box;
  min-height: 52px;
  gap: 12px;
}

/* Left side - locked together */
.left-rail {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  margin-left: 0;
  padding-left: 0;
}

.rail-menu-btn {
  color: white !important;
  z-index: 110;
  position: relative;
  flex-shrink: 0;
}

.rail-title-block {
  display: flex;
  align-items: baseline;
  gap: 6px;
  min-width: 0;
}

.rail-title {
  font-size: 13px;
  font-weight: 700;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rail-sub {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.75);
  white-space: nowrap;
}

/* Right side */
.rail-pct {
  font-size: 12px;
  font-weight: 700;
  color: white;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 4px 12px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  flex-shrink: 0;
}

.rail-bar-track {
  height: 4px;
  background: rgba(255, 255, 255, 0.18);
}

.rail-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffffff, #dbeafe);
  transition: width 0.35s ease;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

/* ══ HEADER ══════════════════════════════ */
.survey-header {
  padding: 36px 0 28px;
}

.header-logos-row {
  display: grid;
  grid-template-columns: 72px 1fr 72px;
  align-items: start;
  gap: 12px;
}

.header-title-center {
  text-align: center;
  min-width: 0;
}

.logo-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.logo-label {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1.4px;
  color: #1e3a8a;
  text-transform: uppercase;
  text-align: center;
  line-height: 1.3;
}

.survey-title {
  font-size: clamp(17px, 3vw, 34px);
  font-weight: 800;
  color: #111827;
  line-height: 1.2;
  letter-spacing: -0.4px;
  margin: 0 0 10px;
}

.survey-subtitle {
  font-size: clamp(11px, 1.5vw, 14px);
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

/* ══ SECTION NAV ═════════════════════════ */
.section-nav {
  margin-bottom: 16px;
}

.section-nav-scroll {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding: 4px 2px 8px;
  scrollbar-width: thin;
  scrollbar-color: #d1d5db transparent;
  -webkit-overflow-scrolling: touch;
}

.section-nav-scroll::-webkit-scrollbar {
  height: 3px;
}
.section-nav-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.section-nav-scroll::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

.snav-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: 1.5px solid #e5e7eb;
  background: white;
  border-radius: 24px;
  padding: 5px 11px 5px 5px;
  cursor: pointer;
  white-space: nowrap;
  transition:
    border-color 0.15s,
    background 0.15s,
    color 0.15s;
  font-size: 11.5px;
  font-family: inherit;
  color: #6b7280;
  flex-shrink: 0;
  min-height: 34px;
}

.snav-pill:hover {
  border-color: #93c5fd;
  color: #1d4ed8;
  background: #eff6ff;
}
.snav-pill.past {
  border-color: #bbf7d0;
  color: #15803d;
  background: #f0fdf4;
}
.snav-pill.active {
  border-color: #1d4ed8;
  background: #1d4ed8;
  color: white;
}

.snav-num {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  flex-shrink: 0;
}
.snav-pill.active .snav-num {
  background: rgba(255, 255, 255, 0.25);
}

/* ══ FORM PANEL ══════════════════════════ */
.form-panel {
  background: white;
  border-radius: 20px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.section-heading {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 24px 36px 20px;
  border-bottom: 1px solid #f3f4f6;
}

.section-badge {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #1d4ed8;
  background: #eff6ff;
  border-radius: 6px;
  padding: 4px 10px;
  white-space: nowrap;
  flex-shrink: 0;
}

.section-title {
  font-size: clamp(14px, 2.2vw, 18px);
  font-weight: 700;
  color: #111827;
  margin: 0;
  line-height: 1.3;
}

.section-body {
  padding: 28px 36px 8px;
  min-height: 280px;
}

/* ══ FORM FOOTER ═════════════════════════ */
.form-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 36px;
  border-top: 1px solid #f3f4f6;
  background: #fafafa;
}

.footer-dots-wrap {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #d1d5db;
  cursor: pointer;
  transition: all 0.18s ease;
  flex-shrink: 0;
}
.dot.past {
  background: #86efac;
}
.dot.active {
  background: #1d4ed8;
  width: 20px;
  border-radius: 4px;
}

.mobile-step-counter {
  display: none;
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
  flex: 1;
  text-align: center;
}

.btn-placeholder {
  width: 100px;
  flex-shrink: 0;
}

/* ══ BUTTONS ═════════════════════════════ */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  padding: 10px 20px;
  cursor: pointer;
  transition:
    background 0.15s,
    border-color 0.15s,
    opacity 0.15s;
  border: none;
  white-space: nowrap;
  flex-shrink: 0;
}

.btn-outline {
  background: white;
  border: 1.5px solid #e5e7eb;
  color: #374151;
}
.btn-outline:hover {
  border-color: #9ca3af;
  background: #f9fafb;
}

.btn-primary {
  background: #1d4ed8;
  color: white;
}
.btn-primary:hover {
  background: #1e40af;
}

.btn-submit {
  background: #15803d;
  color: white;
}
.btn-submit:hover:not(:disabled) {
  background: #166534;
}
.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.drawer-nav-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #9ca3af;
  text-transform: uppercase;
  margin-bottom: 20px;
}

/* ══ RESPONSIVE ══════════════════════════ */
@media (max-width: 768px) {
  .survey-body {
    padding: 70px 24px 0;
  }
  .progress-rail-inner {
    padding: 9px 24px 7px;
  }
  .header-logos-row {
    grid-template-columns: 58px 1fr 58px;
    gap: 8px;
  }
  .survey-header {
    padding: 22px 0 18px;
  }
  .section-heading {
    padding: 18px 24px 14px;
  }
  .section-body {
    padding: 20px 24px 8px;
  }
  .form-footer {
    padding: 14px 24px;
  }
}

@media (max-width: 480px) {
  .survey-body {
    padding: 62px 12px 0;
  }
  .progress-rail-inner {
    padding: 9px 12px 7px;
  }
  .rail-title {
    display: none;
  }
  .survey-header {
    padding: 14px 0 12px;
  }
  .header-logos-row {
    grid-template-columns: 48px 1fr 48px;
    gap: 6px;
  }
  .snav-label {
    display: none;
  }
  .snav-pill {
    padding: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    justify-content: center;
  }
  .form-panel {
    border-radius: 14px;
  }
  .section-heading {
    padding: 14px 16px 12px;
  }
  .section-body {
    padding: 16px 16px 8px;
  }
  .footer-dots-wrap {
    display: none;
  }
  .mobile-step-counter {
    display: block;
  }
  .btn-text {
    display: none;
  }
}

@media (min-width: 1200px) {
  .survey-body {
    padding: 84px 56px 0;
  }
  .progress-rail-inner {
    padding: 9px 56px 7px;
  }
  .survey-header {
    padding: 44px 0 32px;
  }
  .header-logos-row {
    grid-template-columns: 84px 1fr 84px;
  }
  .section-heading {
    padding: 28px 52px 22px;
  }
  .section-body {
    padding: 32px 52px 12px;
  }
  .form-footer {
    padding: 20px 52px;
  }
}
</style>
