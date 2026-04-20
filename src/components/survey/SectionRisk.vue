<!-- src/components/survey/SectionRisk.vue -->
<template>
  <div>
    <h2 class="text-h5 font-weight-bold mb-6 text-primary">
      XV. Case-Specific Risk Screening (for Vulnerable Households)
    </h2>

    <!-- Ongoing case -->
    <div class="mb-10">
      <label class="text-body-1 font-weight-medium mb-4 d-block">
        Does the OFW/family have any ongoing case?<br />
        <small class="text-grey-darken-1">(Please check all that apply)</small>
      </label>
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="caseType in ongoingCases" :key="caseType">
          <v-checkbox
            v-model="localData.ongoingCase"
            :label="caseType"
            :value="caseType"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <!-- Need urgent referral? -->
    <v-row dense class="mb-8">
      <v-col cols="12">
        <v-radio-group
          v-model="localData.needsUrgentReferral"
          label="Does the household need urgent referral?"
          inline
          @update:modelValue="emitUpdate"
        >
          <v-radio label="Yes" value="Yes" />
          <v-radio label="No" value="No" />
        </v-radio-group>
      </v-col>
    </v-row>

    <!-- If yes, referred to -->
    <div v-if="localData.needsUrgentReferral === 'Yes'" class="mb-10">
      <label class="text-body-1 font-weight-medium mb-4 d-block"> If yes, referred to: </label>
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="agency in referralAgencies" :key="agency">
          <v-checkbox
            v-model="localData.referredTo"
            :label="agency"
            :value="agency"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <!-- Priority level assigned by enumerator -->
    <div>
      <label class="text-body-1 font-weight-medium mb-3 d-block">
        Priority level assigned by enumerator
      </label>
      <v-radio-group v-model="localData.priorityLevel" inline @update:modelValue="emitUpdate">
        <v-radio label="High / urgent" value="High / urgent" />
        <v-radio label="Medium" value="Medium" />
        <v-radio label="Low" value="Low" />
      </v-radio-group>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  data: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['update:data'])

const ongoingCases = [
  'Illegal recruitment',
  'Human trafficking',
  'Labor case / unpaid wages',
  'Abuse / violence',
  'Missing OFW',
  'Detention / legal case abroad',
  'Medical repatriation',
  'Death / bereavement',
  'Child protection concern',
  'Domestic violence / VAWC',
  'None',
  'Other',
]

const referralAgencies = [
  'DMW',
  'OWWA',
  'LGU/MSWDO',
  'DSWD',
  'PNP/WCPD',
  'DOJ/PAO',
  'DOH / Health Facility',
  'TESDA',
  'PESO',
  'NGO / CSO',
  'Other',
]

const localData = ref({
  ongoingCase: [],
  needsUrgentReferral: '',
  referredTo: [],
  priorityLevel: '',
  ...props.data,
})

// Two-way sync with SurveyView
watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })
</script>
