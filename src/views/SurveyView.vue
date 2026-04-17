<template>
  <v-app theme="light">
    <!-- MAIN CONTENT -->
    <v-main>
      <v-container fluid class="pa-6 pa-md-8" style="max-width: 1400px; margin: 0 auto">
        <!-- ✅ NEW HEADER -->
        <div class="header-container">
          <!-- LEFT -->
          <div class="header-left">
            <v-img src="/DMW Logo.png" width="70" height="70" contain />
            <div class="header-left-text">TANANAN NG OFW</div>
          </div>

          <!-- CENTER -->
          <div class="header-center">
            <div class="main-title">
              OFW Family Profiling and Reintegration Needs Assessment Form
            </div>
            <div class="subtitle">
              for Profiling, Welfare Assistance, Reintegration Planning, Referral, and Case
              Management
            </div>
          </div>

          <!-- RIGHT -->
          <div class="header-right">
            <v-img src="/BagongPilipinas.png" width="70" height="70" contain />
          </div>
        </div>

        <!-- MAIN FORM CARD -->
        <v-card elevation="8" rounded="xl" color="white" class="mx-auto">
          <!-- PROGRESS + BREADCRUMBS -->
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

            <v-breadcrumbs
              :items="breadcrumbItems"
              density="compact"
              divider="›"
              class="text-caption text-grey-darken-2"
              style="flex-wrap: wrap"
            >
              <template v-slot:prepend>
                <v-icon color="primary" size="18" class="mr-1">mdi-form-select</v-icon>
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
// ✅ unchanged
import { ref, computed } from 'vue'
import { useSurveyForm } from '@/composables/useSurveyForm'
import { getCurrentPosition } from '@/services/geolocation'
import { supabase } from '@/services/supabase'

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

const breadcrumbItems = computed(() => [
  { title: 'General Information' },
  { title: 'Respondent Identification' },
  { title: 'Household Profile' },
  { title: 'OFW Profile' },
  { title: 'Migration History' },
  { title: 'Present Status' },
  { title: 'Socio-Economic Profile' },
  { title: 'Livelihood Status' },
  { title: 'Education Status' },
  { title: 'Health & Psychosocial Status' },
  { title: 'Social Protection & Assistance' },
  { title: 'Present Problems & Issues' },
  { title: 'Reintegration Status' },
  { title: 'Training, Employment & Needs' },
  { title: 'Risk Screening' },
  { title: 'Community Participation' },
  { title: 'Financial Literacy' },
  { title: 'Open-Ended Questions' },
  { title: "Enumerator's Assessment" },
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
/* CARD */
.v-card {
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.bg-grey-lighten-5 {
  background-color: #f8f9fc !important;
}

/* ✅ HEADER */
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  padding: 0 16px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 220px;
}

.header-left-text {
  font-size: 20px;
  font-weight: 700;
  color: #1e3a8a;
}

.header-center {
  text-align: center;
  flex: 1;
}

.header-right {
  display: flex;
  justify-content: flex-end;
  min-width: 120px;
}

/* TITLE */
.main-title {
  font-size: clamp(26px, 4vw, 48px);
  font-weight: 800;
  line-height: 1.2;
  color: #1f2937;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 16px;
  color: #4b5563;
  font-weight: 500;
  margin-top: 6px;
}
</style>
