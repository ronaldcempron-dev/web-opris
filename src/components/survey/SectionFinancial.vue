<template>
  <v-card-text>
    <v-row dense>
      <v-col cols="12">
        <v-switch v-model="data.keepsBudget" label="Does the household keep a family budget?" />
      </v-col>
      <v-col cols="12">
        <v-label>Savings/Investment products</v-label>
        <v-checkbox
          v-for="opt in savingsOptions"
          :key="opt"
          v-model="data.hasSavingsProduct"
          :label="opt"
          :value="opt"
        />
      </v-col>
      <v-col cols="12">
        <v-switch
          v-model="data.attendedLiteracySessions"
          label="Has the OFW/family attended financial literacy sessions before?"
        />
      </v-col>
      <v-col cols="12">
        <v-switch
          v-model="data.wantsCoaching"
          label="Would the household like to receive financial management coaching?"
        />
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script setup>
defineProps({ data: Object })
const savingsOptions = [
  'Bank savings',
  'Cooperative savings',
  'Insurance',
  'Mutual fund/investment',
  'Real property/land',
  'Livestock/Agri assets',
  'None',
]
</script>
