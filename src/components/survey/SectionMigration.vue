<template>
  <v-card-text>
    <v-row dense>
      <v-col cols="12">
        <v-label>Current Status of OFW</v-label>
        <v-checkbox
          v-for="opt in statusOptions"
          :key="opt"
          v-model="data.currentStatus"
          :label="opt"
          :value="opt"
        />
      </v-col>
      <v-col cols="12" md="6"
        ><v-text-field v-model="data.country" label="Country of Destination / Last Country"
      /></v-col>
      <v-col cols="12" md="6"
        ><v-text-field v-model="data.city" label="City/Area of Work Abroad"
      /></v-col>
      <v-col cols="12"
        ><v-text-field v-model="data.jobTitle" label="Job Title / Occupation Abroad"
      /></v-col>
      <v-col cols="12">
        <v-label>Industry / Sector</v-label>
        <v-checkbox
          v-for="opt in industryOptions"
          :key="opt"
          v-model="data.industry"
          :label="opt"
          :value="opt"
        />
      </v-col>
      <v-col cols="12" md="6"
        ><v-select
          v-model="data.deploymentType"
          label="Type of OFW Deployment"
          :items="['Land-based', 'Sea-based']"
      /></v-col>
      <v-col cols="12" md="6"
        ><v-select
          v-model="data.documentationStatus"
          label="Status of Documentation"
          :items="['Documented', 'Undocumented / Irregular', 'Unknown']"
      /></v-col>
      <v-col cols="12"
        ><v-text-field
          v-model="data.recruitmentAgency"
          label="Name of Recruitment Agency / Employer"
      /></v-col>
      <v-col cols="12"
        ><v-text-field v-model="data.yearsWorkedAbroad" label="Number of Years Worked Abroad"
      /></v-col>
    </v-row>
  </v-card-text>
</template>
<script setup>
defineProps({ data: Object })
const statusOptions = [
  'Currently working abroad',
  'On vacation in the Philippines',
  'Returned permanently',
  'Recently repatriated',
  'Terminated / contract ended',
  'Distressed / undocumented',
  'Missing / detained',
  'Deceased',
]
const industryOptions = [
  'Domestic Work',
  'Construction',
  'Healthcare',
  'Hospitality / Tourism',
  'Manufacturing',
  'Maritime / Seafaring',
  'Professional / Technical',
  'Agriculture',
  'Retail / Service',
  'Other',
]
</script>
