<template>
  <v-card-text>
    <v-row dense>
      <v-col cols="12">
        <v-label>Overall socio-economic status</v-label>
        <v-select
          v-model="data.socioEconomicStatus"
          :items="[
            'Indigent / highly vulnerable',
            'Low income / vulnerable',
            'Lower middle income',
            'Middle income',
            'Better-off',
          ]"
        />
      </v-col>
      <v-col cols="12">
        <v-label>Observed housing/environment condition</v-label>
        <v-select
          v-model="data.housingCondition"
          :items="['Good', 'Fair', 'Poor', 'Hazard-prone']"
        />
      </v-col>
      <v-col cols="12">
        <v-label>Family functioning</v-label>
        <v-select
          v-model="data.familyFunctioning"
          :items="['Stable', 'Needs support', 'At risk / fragile', 'Crisis situation']"
        />
      </v-col>
      <v-col cols="12">
        <v-label>Recommended intervention(s)</v-label>
        <v-checkbox
          v-for="opt in interventions"
          :key="opt"
          v-model="data.recommendedInterventions"
          :label="opt"
          :value="opt"
        />
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="data.narrativeRemarks"
          label="Narrative Assessment / Remarks of Enumerator"
          rows="4"
        />
      </v-col>
    </v-row>
  </v-card-text>
</template>
<script setup>
defineProps({ data: Object })
const interventions = [
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
]
</script>
