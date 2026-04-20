<!-- src/components/survey/SectionProblems.vue -->
<template>
  <div>
    <h2 class="text-h5 font-weight-bold mb-6 text-primary">
      XII. Present Problems & Issues Encountered
    </h2>

    <!-- Major problems currently faced -->
    <div class="mb-10">
      <label class="text-body-1 font-weight-medium mb-4 d-block">
        What are the major problems currently faced by the OFW/family?<br />
        <small class="text-grey-darken-1">(Check all that apply)</small>
      </label>
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="problem in majorProblems" :key="problem">
          <v-checkbox
            v-model="localData.majorProblems"
            :label="problem"
            :value="problem"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <!-- Most urgent concern -->
    <v-row dense class="mb-10">
      <v-col cols="12">
        <v-text-field
          v-model="localData.mostUrgentConcern"
          label="Which is the MOST urgent concern?"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>
    </v-row>

    <!-- Problems experienced due to migration -->
    <div>
      <label class="text-body-1 font-weight-medium mb-4 d-block">
        Has the family experienced any of the following due to migration?<br />
        <small class="text-grey-darken-1">(Check all that apply)</small>
      </label>
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="issue in migrationIssues" :key="issue">
          <v-checkbox
            v-model="localData.migrationIssues"
            :label="issue"
            :value="issue"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  data: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['update:data'])

const majorProblems = [
  'Loss of income / no remittance',
  'Unemployment after return',
  'Debt burden',
  'Health problems',
  'Family conflict / marital issues',
  'Child care / parental absence concerns',
  'Education expenses',
  'Housing problems',
  'Legal/documentation issues',
  'Abuse / exploitation case',
  'Illegal recruitment concern',
  'Human trafficking concern',
  'Contract violation / unpaid wages',
  'Mental health / emotional distress',
  'No livelihood capital',
  'No local job opportunities',
  'Reintegration difficulties',
  'Other',
]

const migrationIssues = [
  'Separation-related emotional distress',
  'Child neglect concerns',
  'Family disintegration / marital strain',
  'Financial mismanagement of remittances',
  'Dependency on remittances',
  'Return without savings',
  'Traumatic return/repatriation',
  'Community stigma / discrimination',
  'Other',
]

const localData = ref({
  majorProblems: [],
  mostUrgentConcern: '',
  migrationIssues: [],
  ...props.data,
})

// Two-way sync with SurveyView
watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })
</script>
