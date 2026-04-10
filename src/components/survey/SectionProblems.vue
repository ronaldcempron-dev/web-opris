<template>
  <v-card-text>
    <v-row dense>
      <v-col cols="12">
        <v-label>Major problems currently faced (check all that apply)</v-label>
        <v-checkbox
          v-for="opt in majorProblems"
          :key="opt"
          v-model="data.majorProblems"
          :label="opt"
          :value="opt"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field v-model="data.mostUrgent" label="Which is the MOST urgent concern?" />
      </v-col>
      <v-col cols="12">
        <v-label>Has the family experienced any of the following due to migration?</v-label>
        <v-checkbox
          v-for="opt in migrationIssues"
          :key="opt"
          v-model="data.migrationRelatedIssues"
          :label="opt"
          :value="opt"
        />
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script setup>
defineProps({ data: Object })

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
]
</script>
