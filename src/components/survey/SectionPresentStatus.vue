<template>
  <v-card-text>
    <v-row dense>
      <v-col cols="12">
        <v-label>Present Location of OFW</v-label>
        <v-radio-group v-model="data.presentLocation">
          <v-radio label="Abroad" value="Abroad" />
          <v-radio label="In home province/municipality" value="Home" />
          <v-radio label="In another Philippine city/province" value="Elsewhere" />
        </v-radio-group>
      </v-col>
      <v-col cols="12"
        ><v-text-field v-model="data.dateOfReturn" label="Date of Return/Repatriation" type="date"
      /></v-col>
      <v-col cols="12">
        <v-label>Reason for return (if applicable)</v-label>
        <v-checkbox
          v-for="opt in returnReasons"
          :key="opt"
          v-model="data.reasonForReturn"
          :label="opt"
          :value="opt"
        />
      </v-col>
      <v-col cols="12">
        <v-label>Current source of livelihood/income after return</v-label>
        <v-checkbox
          v-for="opt in livelihoodOptions"
          :key="opt"
          v-model="data.currentLivelihood"
          :label="opt"
          :value="opt"
        />
      </v-col>
      <v-col cols="12">
        <v-label>Is the OFW planning to go abroad again?</v-label>
        <v-radio-group v-model="data.planningToGoAbroadAgain" inline>
          <v-radio label="Yes" value="Yes" />
          <v-radio label="No" value="No" />
        </v-radio-group>
      </v-col>
    </v-row>
  </v-card-text>
</template>
<script setup>
defineProps({ data: Object })
const returnReasons = [
  'Contract completed',
  'Vacation',
  'End of contract',
  'Termination',
  'Abuse / maltreatment',
  'Salary issues',
  'Health condition',
  'Family emergency',
  'War / crisis',
  'Voluntary return',
  'Deportation',
  'Other',
]
const livelihoodOptions = [
  'None',
  'Wage employment',
  'Self-employed',
  'Small business',
  'Farming/Fishing',
  'Freelance / online work',
  'Dependent on family support',
]
</script>
