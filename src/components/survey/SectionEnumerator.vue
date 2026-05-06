<!-- src/components/survey/SectionEnumerator.vue -->
<template>
  <div>
    <h2 class="text-h5 font-weight-bold mb-6 text-primary">XIX. Enumerator's Assessment</h2>

    <!-- Overall socio-economic status -->
    <div class="mb-10">
      <label class="text-body-1 font-weight-medium mb-3 d-block">
        Overall socio-economic status based on observation
      </label>
      <v-radio-group v-model="localData.socioEconomicStatus" column @update:modelValue="emitUpdate">
        <v-radio label="Indigent / highly vulnerable" value="Indigent / highly vulnerable" />
        <v-radio label="Low income / vulnerable" value="Low income / vulnerable" />
        <v-radio label="Lower middle income" value="Lower middle income" />
        <v-radio label="Middle income" value="Middle income" />
        <v-radio label="Better-off" value="Better-off" />
      </v-radio-group>
    </div>

    <!-- Observed housing/environment condition -->
    <div class="mb-10">
      <label class="text-body-1 font-weight-medium mb-3 d-block">
        Observed housing/environment condition
      </label>
      <v-radio-group v-model="localData.housingCondition" column @update:modelValue="emitUpdate">
        <v-radio label="Good" value="Good" />
        <v-radio label="Fair" value="Fair" />
        <v-radio label="Poor" value="Poor" />
        <v-radio label="Hazard-prone" value="Hazard-prone" />
      </v-radio-group>
    </div>

    <!-- Family functioning -->
    <div class="mb-10">
      <label class="text-body-1 font-weight-medium mb-3 d-block">
        Family functioning (based on interview)
      </label>
      <v-radio-group v-model="localData.familyFunctioning" column @update:modelValue="emitUpdate">
        <v-radio label="Stable" value="Stable" />
        <v-radio label="Needs support" value="Needs support" />
        <v-radio label="At risk / fragile" value="At risk / fragile" />
        <v-radio label="Crisis situation" value="Crisis situation" />
      </v-radio-group>
    </div>

    <!-- Recommended intervention(s) -->
    <div class="mb-10">
      <label class="text-body-1 font-weight-medium mb-4 d-block">
        Recommended intervention(s)
      </label>
      <v-row dense>
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="intervention in recommendedInterventions"
          :key="intervention"
        >
          <v-checkbox
            v-model="localData.recommendedInterventions"
            :label="intervention"
            :value="intervention"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <!-- Follow-up -->
    <v-row dense class="mb-8">
      <v-col cols="12" md="6">
        <v-checkbox
          v-model="localData.needsFollowUp"
          label="Follow-up visit"
          density="compact"
          @update:modelValue="emitUpdate"
        />
      </v-col>
    </v-row>

    <!-- Narrative Assessment / Remarks -->
    <v-row dense>
      <v-col cols="12">
        <v-textarea
          v-model="localData.narrativeRemarks"
          label="Narrative Assessment / Remarks of Enumerator"
          variant="outlined"
          density="comfortable"
          rows="5"
          placeholder="Write your observations, additional notes, or recommendations here..."
          @update:modelValue="emitUpdate"
        />
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

const recommendedInterventions = [
  'Immediate welfare assistance',
  'Case management / referral',
  'Psychosocial support',
  'Livelihood assistance',
  'Employment facilitation',
  'Skills training',
  'Financial literacy',
  'Educational assistance',
  'Medical assistance',
  'Legal assistance',
  'Reintegration planning',
  'Follow-up visit',
  'Other',
]

const localData = ref({
  socioEconomicStatus: '',
  housingCondition: '',
  familyFunctioning: '',
  recommendedInterventions: [],
  needsFollowUp: false,
  narrativeRemarks: '',
  ...props.data,
})

// Two-way sync with SurveyView
watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })
</script>
