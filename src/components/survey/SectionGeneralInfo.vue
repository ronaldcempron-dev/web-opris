<template>
  <v-card-text>
    <v-row dense>
      <v-col cols="12" md="6"
        ><v-text-field v-model="data.dateOfInterview" label="Date of Interview" type="date"
      /></v-col>
      <v-col cols="12" md="6"
        ><v-text-field v-model="data.timeOfInterview" label="Time of Interview" type="time"
      /></v-col>
      <v-col cols="12"
        ><v-text-field v-model="data.enumeratorName" label="Name of Enumerator/Interviewer"
      /></v-col>
      <v-col cols="12" md="4"><v-text-field v-model="data.barangay" label="Barangay" /></v-col>
      <v-col cols="12" md="4"
        ><v-text-field v-model="data.municipality" label="Municipality/City"
      /></v-col>
      <v-col cols="12" md="4"
        ><v-text-field v-model="data.province" label="Province/Region"
      /></v-col>
      <v-col cols="12"
        ><v-text-field
          v-model="data.householdControlNumber"
          label="Household Control Number / Survey ID"
      /></v-col>
      <v-col cols="12">
        <v-label>Type of Respondent</v-label>
        <v-checkbox
          v-for="opt in types"
          :key="opt"
          v-model="data.typeOfRespondent"
          :label="opt"
          :value="opt"
        />
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script setup>
defineProps({ data: Object })
const types = [
  'Current OFW',
  'Returning OFW (vacation)',
  'Returned OFW (reintegrated)',
  'Distressed OFW / family of distressed OFW',
  'Family left behind of current OFW',
  'Repatriated OFW',
  'Deceased OFW family',
  'Other',
]
</script>
