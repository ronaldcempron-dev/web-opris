<template>
  <v-app theme="light">
    <v-navigation-drawer v-model="drawer" app temporary width="260">
      <v-list nav>
        <v-list-item prepend-icon="mdi-file-document" title="Survey Form" @click="goTo('/')" />
        <v-list-item prepend-icon="mdi-table" title="View Responses" @click="goTo('/responses')" />
      </v-list>
    </v-navigation-drawer>
    <!-- MAIN CONTENT -->
    <v-main>
      <v-container fluid class="pa-6 pa-md-8" style="max-width: 1400px; margin: 0 auto">
        <!-- ✅ HEADER (unchanged) -->
        <div class="header-container">
          <!-- LEFT: DMW Logo + Text BELOW -->
          <div class="header-left" style="position: relative">
            <v-btn
              icon
              variant="text"
              class="menu-btn"
              @click="drawer = true"
              style="position: absolute; left: -48px; top: 8px"
            >
              <v-icon>mdi-menu</v-icon>
            </v-btn>
            <v-img src="/DMW Logo.png" width="70" height="70" contain />
            <div class="header-left-text">TAHANAN NG OFW</div>
          </div>

          <!-- CENTER: Title now split into TWO clean lines + Subtitle -->
          <div class="header-center">
            <div class="main-title">
              OFW Family Profiling and Reintegration<br />
              Needs Assessment Form
            </div>
            <div class="subtitle">
              for Profiling, Welfare Assistance, Reintegration Planning, Referral, and Case
              Management
            </div>
          </div>

          <!-- RIGHT: Bagong Pilipinas Logo + Text BELOW -->
          <div class="header-right">
            <v-img src="/BagongPilipinas.png" width="70" height="70" contain />
            <div class="header-right-text">BAGONG PILIPINAS</div>
          </div>
        </div>

        <!-- MAIN FORM CARD -->
        <v-card elevation="8" rounded="xl" color="white" class="mx-auto">
          <!-- PROGRESS + CLICKABLE BREADCRUMBS -->
          <div class="px-8 pt-6 pb-4 bg-grey-lighten-5">
            <div class="d-flex align-center justify-space-between mb-3">
              <div class="text-body-1 font-weight-medium text-grey-darken-2">
                Section <strong>{{ step }}</strong> of 19 •
                <span class="text-primary">{{ Math.round((step / 19) * 100) }}% complete</span>
              </div>
              <v-chip color="primary" size="small" label>Step {{ step }}</v-chip>
            </div>

            <v-progress-linear
              :model-value="(step / 19) * 100"
              color="primary"
              height="10"
              rounded
              class="mb-5"
            />

            <!-- ✅ NEW CLICKABLE SECTION NAVIGATION -->
            <!-- Beautiful, clean, responsive breadcrumbs that are fully clickable -->
            <v-breadcrumbs
              :items="breadcrumbItems"
              density="compact"
              divider="›"
              class="text-caption text-grey-darken-2"
              style="flex-wrap: wrap; gap: 4px"
            >
              <!-- Prepend icon -->
              <template v-slot:prepend>
                <v-icon color="primary" size="18" class="mr-1">mdi-form-select</v-icon>
              </template>

              <!-- Custom clickable item -->
              <template v-slot:item="{ item }">
                <span
                  class="breadcrumb-link"
                  :class="{ active: item.step === step }"
                  @click="step = item.step"
                >
                  {{ item.title }}
                </span>
              </template>
            </v-breadcrumbs>
          </div>

          <!-- FORM CONTENT -->
          <v-card-text class="pa-9 pa-md-11">
            <v-stepper-window v-model="step">
              <v-stepper-window-item :value="1"
                ><SectionGeneralInfo :data="formData.general"
              /></v-stepper-window-item>
              <v-stepper-window-item :value="2"
                ><SectionRespondent :data="formData.respondent"
              /></v-stepper-window-item>
              <v-stepper-window-item :value="3"
                ><SectionHousehold :data="formData.household"
              /></v-stepper-window-item>
              <v-stepper-window-item :value="4"
                ><SectionOFWProfile :data="formData.ofwProfile"
              /></v-stepper-window-item>
              <v-stepper-window-item :value="5"
                ><SectionMigration :data="formData.migration"
              /></v-stepper-window-item>
              <v-stepper-window-item :value="6"
                ><SectionPresentStatus :data="formData.presentStatus"
              /></v-stepper-window-item>
              <v-stepper-window-item :value="7"
                ><SectionSocioEconomic :data="formData.socioEconomic"
              /></v-stepper-window-item>
              <v-stepper-window-item :value="8"
                ><SectionLivelihood :data="formData.livelihood"
              /></v-stepper-window-item>
              <v-stepper-window-item :value="9"
                ><SectionEducation :data="formData.education"
              /></v-stepper-window-item>
              <v-stepper-window-item :value="10"
                ><SectionHealth :data="formData.health"
              /></v-stepper-window-item>
              <v-stepper-window-item :value="11"
                ><SectionAssistance :data="formData.assistance"
              /></v-stepper-window-item>
              <v-stepper-window-item :value="12"
                ><SectionProblems :data="formData.problems"
              /></v-stepper-window-item>
              <v-stepper-window-item :value="13"
                ><SectionReintegration :data="formData.reintegration"
              /></v-stepper-window-item>
              <v-stepper-window-item :value="14"
                ><SectionNeeds :data="formData.needs"
              /></v-stepper-window-item>
              <v-stepper-window-item :value="15"
                ><SectionRisk :data="formData.risk"
              /></v-stepper-window-item>
              <v-stepper-window-item :value="16"
                ><SectionCommunity :data="formData.community"
              /></v-stepper-window-item>
              <v-stepper-window-item :value="17"
                ><SectionFinancial :data="formData.financial"
              /></v-stepper-window-item>
              <v-stepper-window-item :value="18"
                ><SectionOpenEnded :data="formData.openEnded"
              /></v-stepper-window-item>
              <v-stepper-window-item :value="19"
                ><SectionEnumerator :data="formData.enumerator"
              /></v-stepper-window-item>
            </v-stepper-window>
          </v-card-text>

          <!-- FOOTER -->
          <v-divider />
          <v-card-actions class="px-8 py-6 bg-grey-lighten-5">
            <v-btn
              v-if="step > 1"
              variant="outlined"
              color="grey-darken-2"
              @click="step--"
              size="large"
              class="px-8"
            >
              ← Previous
            </v-btn>

            <v-spacer />

            <v-btn v-if="step < 19" color="primary" @click="step++" size="large" class="px-10">
              Next →
            </v-btn>

            <v-btn
              v-else
              color="success"
              :loading="submitting"
              @click="handleSubmit"
              size="large"
              prepend-icon="mdi-map-marker-check"
              class="px-10"
            >
              Submit Survey + GPS Location
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
// ✅ unchanged imports
import { ref, computed } from 'vue'
import { useSurveyForm } from '@/composables/useSurveyForm'
import { getCurrentPosition } from '@/services/geolocation'
import { supabase } from '@/services/supabase'
import Sidebar from '@/components/common/Sidebar.vue'
// Handle selecting a response from the sidebar (future: show details, etc)
const onSelectResponse = (response) => {
  // For now, just alert. Replace with detail view logic as needed.
  alert(
    `Selected response for: ${response.respondent_name || 'No Name'}\nDate: ${new Date(response.created_at).toLocaleString()}`,
  )
}

// sections...
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
const step = ref(1)
const submitting = ref(false)

const drawer = ref(false)
import { useRouter } from 'vue-router'
const router = useRouter()

const goTo = (path) => {
  router.push(path)
  drawer.value = false
}

// ✅ UPDATED: Now each item has a "step" number so we can jump directly
const breadcrumbItems = computed(() => [
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
])

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
/* CARD & HEADER styles unchanged */
.v-card {
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.bg-grey-lighten-5 {
  background-color: #f8f9fc !important;
}

/* HEADER styles unchanged */
.header-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
  padding: 0 16px;
  width: 100%;
}

.header-left,
.header-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  justify-self: start;
}

.header-right {
  justify-self: end;
}

.header-left-text,
.header-right-text {
  font-size: 18px;
  font-weight: 700;
  color: #1e3a8a;
  text-align: center;
  white-space: nowrap;
  line-height: 1.2;
}

.main-title {
  font-size: clamp(24px, 3.6vw, 42px);
  font-weight: 800;
  line-height: 1.15;
  color: #1f2937;
  letter-spacing: -0.8px;
  text-align: center;
  white-space: pre-line;
}

.subtitle {
  font-size: 16px;
  color: #4b5563;
  font-weight: 500;
  margin-top: 8px;
  text-align: center;
}

/* ✅ NEW: Clickable Breadcrumb Styling */
.breadcrumb-link {
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 2px 6px;
  border-radius: 4px;
}

.breadcrumb-link:hover {
  background-color: #e3f2fd;
  color: #1976d2;
}

.breadcrumb-link.active {
  color: #1976d2 !important;
  font-weight: 700;
  background-color: #e3f2fd;
  border-radius: 4px;
}

/* Make sure the divider stays clean */
.v-breadcrumbs {
  flex-wrap: wrap;
  row-gap: 4px;
}
</style>
