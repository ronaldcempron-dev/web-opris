<!-- src/components/survey/SectionPresentStatus.vue -->
<template>
  <div>
    <h2 class="text-h5 font-weight-bold mb-6 text-primary">VI. Present Status of OFW</h2>

    <!-- Present Location of OFW -->
    <div class="mb-8">
      <label class="text-body-1 font-weight-medium mb-3 d-block">Present Location of OFW</label>
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="option in locationOptions" :key="option">
          <v-checkbox
            v-model="localData.presentLocation"
            :label="option"
            :value="option"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <!-- If abroad: Current employment status -->
    <div v-if="localData.presentLocation.includes('Abroad')" class="mb-8">
      <label class="text-body-1 font-weight-medium mb-3 d-block"
        >If abroad, current employment status</label
      >
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="option in abroadEmploymentOptions" :key="option">
          <v-checkbox
            v-model="localData.abroadEmploymentStatus"
            :label="option"
            :value="option"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <!-- If returned/repatriated: Reason for return -->
    <div
      v-if="
        localData.presentLocation.includes('Returned') ||
        localData.presentLocation.includes('Repatriated')
      "
      class="mb-8"
    >
      <label class="text-body-1 font-weight-medium mb-3 d-block"
        >If returned/repatriated, reason for return</label
      >
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="reason in returnReasons" :key="reason">
          <v-checkbox
            v-model="localData.reasonForReturn"
            :label="reason"
            :value="reason"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <!-- Date of Return / Repatriation -->
    <v-row dense class="mb-6">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="localData.dateOfReturn"
          label="Date of Return/Repatriation (if applicable)"
          type="date"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>
    </v-row>

    <!-- Current source of livelihood/income after return -->
    <div class="mb-8">
      <label class="text-body-1 font-weight-medium mb-3 d-block"
        >Current source of livelihood/income of OFW after return</label
      >
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="option in livelihoodSources" :key="option">
          <v-checkbox
            v-model="localData.currentLivelihood"
            :label="option"
            :value="option"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <!-- Planning to go abroad again? -->
    <v-row dense>
      <v-col cols="12">
        <v-radio-group
          v-model="localData.planningToGoAbroad"
          label="Is the OFW planning to go abroad again?"
          inline
          @update:modelValue="emitUpdate"
        >
          <v-radio label="Yes" value="Yes" />
          <v-radio label="No" value="No" />
        </v-radio-group>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  data: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['update:data'])

const locationOptions = [
  'Abroad',
  'In home province/municipality',
  'In another Philippine city/province',
  'Unknown',
  'Deceased',
]

const abroadEmploymentOptions = [
  'Employed and stable',
  'Employed but with issues',
  'No work / jobless',
  'Contract ending soon',
  'AWOL / undocumented',
  'In shelter / safe house',
  'Detained / in legal case',
  'Sick / hospitalized',
  'Other',
]

const returnReasons = [
  'Contract completed',
  'Vacation',
  'End of contract / non-renewal',
  'Termination / retrenchment',
  'Abuse / maltreatment',
  'Salary issues / non-payment',
  'Health condition',
  'Family emergency',
  'War / crisis / disaster',
  'Pregnancy / childcare',
  'Voluntary return',
  'Deportation / undocumented status',
  'Death of OFW (for family respondents)',
  'Other',
]

const livelihoodSources = [
  'None',
  'Wage employment',
  'Self-employed',
  'Small business',
  'Farming/Fishing',
  'Freelance / online work',
  'Dependent on family support',
  'Other',
]

const localData = ref({
  presentLocation: [],
  abroadEmploymentStatus: [],
  reasonForReturn: [],
  dateOfReturn: '',
  currentLivelihood: [],
  planningToGoAbroad: '',
  ...props.data,
})

// Two-way binding with SurveyView
watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })
</script>
