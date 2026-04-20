<!-- src/components/survey/SectionAssistance.vue -->
<template>
  <div>
    <h2 class="text-h5 font-weight-bold mb-6 text-primary">
      XI. Social Protection & Government Assistance
    </h2>

    <!-- Received assistance from which agency -->
    <div class="mb-10">
      <label class="text-body-1 font-weight-medium mb-4 d-block">
        Has the OFW/family received assistance from any of the following?<br />
        <small class="text-grey-darken-1">(Please check all that apply)</small>
      </label>
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="agency in agencies" :key="agency">
          <v-checkbox
            v-model="localData.receivedAssistanceFrom"
            :label="agency"
            :value="agency"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <!-- Type of assistance received -->
    <div class="mb-10">
      <label class="text-body-1 font-weight-medium mb-4 d-block">
        Type of assistance received<br />
        <small class="text-grey-darken-1">(Please check all that apply)</small>
      </label>
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="type in assistanceTypes" :key="type">
          <v-checkbox
            v-model="localData.typeOfAssistance"
            :label="type"
            :value="type"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <!-- Was the assistance sufficient/helpful? -->
    <v-row dense class="mb-8">
      <v-col cols="12">
        <v-radio-group
          v-model="localData.assistanceSufficient"
          label="Was the assistance sufficient/helpful?"
          inline
          @update:modelValue="emitUpdate"
        >
          <v-radio label="Very helpful" value="Very helpful" />
          <v-radio label="Somewhat helpful" value="Somewhat helpful" />
          <v-radio label="Not sufficient" value="Not sufficient" />
          <v-radio label="Not helpful" value="Not helpful" />
        </v-radio-group>
      </v-col>
    </v-row>

    <!-- Awareness of reintegration programs -->
    <v-row dense>
      <v-col cols="12">
        <v-radio-group
          v-model="localData.awareOfReintegrationPrograms"
          label="Are you aware of DMW/OWWA/LGU reintegration programs?"
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

const agencies = [
  'DMW',
  'OWWA',
  'DOLE',
  'DSWD',
  'LGU / Barangay',
  'PESO',
  'TESDA',
  'DA / BFAR',
  'DTI',
  'PhilHealth',
  'SSS',
  'Pag-IBIG',
  'Overseas post / embassy',
  'NGO / faith-based organization',
  'None',
]

const assistanceTypes = [
  'Repatriation assistance',
  'Financial assistance',
  'Livelihood starter kit',
  'Scholarship / education aid',
  'Medical assistance',
  'Psychosocial services',
  'Legal assistance',
  'Skills training',
  'Job referral / employment facilitation',
  'Food packs / relief',
  'Kalinga kit / welfare support',
  'Other',
]

const localData = ref({
  receivedAssistanceFrom: [],
  typeOfAssistance: [],
  assistanceSufficient: '',
  awareOfReintegrationPrograms: '',
  ...props.data,
})

// Two-way sync with SurveyView
watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })
</script>
