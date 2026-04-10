<template>
  <v-app theme="light">
    <!-- HEADER -->
    <v-app-bar color="primary" dark elevation="4" fixed>
      <v-btn icon @click="drawer = !drawer" class="ml-2">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-app-bar-title class="font-weight-bold">
        <v-icon class="mr-2">mdi-home-account</v-icon>
        DMW OFW Family Profiling & Reintegration Needs Assessment
      </v-app-bar-title>

      <v-spacer />

      <div class="d-flex align-center">
        <v-chip color="white" text-color="primary" label> Step {{ step }} of 19 </v-chip>
        <v-avatar class="ml-4" size="38">
          <v-icon size="28">mdi-account-tie</v-icon>
        </v-avatar>
      </div>
    </v-app-bar>

    <!-- SIDE DRAWER -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      width="320"
      color="grey-lighten-4"
      class="elevation-4"
    >
      <v-list density="compact" nav class="pt-4">
        <v-list-item
          v-for="n in 19"
          :key="n"
          :active="step === n"
          @click="goToStep(n)"
          class="mb-1 mx-2 rounded-lg"
        >
          <v-list-item-title class="text-body-2 font-weight-medium">
            {{ n }}. {{ getStepTitle(n) }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- MAIN BODY -->
    <v-main class="mt-14">
      <v-container fluid class="pa-4 pa-md-8">
        <v-card max-width="1350" class="mx-auto" elevation="8" rounded="xl">
          <!-- FORM CONTENT -->
          <v-card-text class="pa-8 pa-md-10">
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
            >
              ← Previous
            </v-btn>
            <v-spacer />
            <v-btn v-if="step < 19" color="primary" @click="step++" size="large"> Next → </v-btn>
            <v-btn
              v-else
              color="success"
              :loading="submitting"
              @click="handleSubmit"
              size="large"
              prepend-icon="mdi-map-marker-check"
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
import { ref } from 'vue'
import { useSurveyForm } from '@/composables/useSurveyForm'
import { getCurrentPosition } from '@/services/geolocation'
import { supabase } from '@/services/supabase'

// Import all sections
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
const drawer = ref(false)
const submitting = ref(false)

const getStepTitle = (n) => {
  const titles = [
    'General Info',
    'Respondent Identification',
    'Household Profile',
    'OFW Profile',
    'Migration History',
    'Present Status',
    'Socio-Economic Profile',
    'Livelihood Status',
    'Education Status',
    'Health & Psychosocial',
    'Social Protection',
    'Present Problems',
    'Reintegration Status',
    'Training & Needs',
    'Risk Screening',
    'Community Participation',
    'Financial Literacy',
    'Open-Ended Questions',
    "Enumerator's Assessment",
  ]
  return titles[n - 1]
}

// Fixed method for drawer + step change
const goToStep = (n) => {
  step.value = n
  drawer.value = false
}

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
.v-app-bar {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}

.v-card {
  border-radius: 20px;
  overflow: hidden;
}

.v-list-item--active {
  background-color: #1976d2 !important;
  color: white !important;
}

.v-card-text {
  min-height: 65vh;
  background: #fafafa;
}
</style>
