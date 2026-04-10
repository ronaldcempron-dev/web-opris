<template>
  <v-card-text>
    <v-row dense>
      <v-col cols="12">
        <v-label>Ongoing case (check all that apply)</v-label>
        <v-checkbox
          v-for="opt in riskCases"
          :key="opt"
          v-model="data.ongoingCase"
          :label="opt"
          :value="opt"
        />
      </v-col>
      <v-col cols="12">
        <v-switch
          v-model="data.needsUrgentReferral"
          label="Does the household need urgent referral?"
        />
      </v-col>
      <v-col cols="12" v-if="data.needsUrgentReferral">
        <v-label>If yes, referred to</v-label>
        <v-checkbox
          v-for="opt in referralOptions"
          :key="opt"
          v-model="data.referralTo"
          :label="opt"
          :value="opt"
        />
      </v-col>
      <v-col cols="12">
        <v-select
          v-model="data.priorityLevel"
          label="Priority level assigned by enumerator"
          :items="['High / urgent', 'Medium', 'Low']"
        />
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script setup>
defineProps({ data: Object })

const riskCases = [
  'Illegal recruitment',
  'Human trafficking',
  'Labor case / unpaid wages',
  'Abuse / violence',
  'Missing OFW',
  'Detention / legal case abroad',
  'Medical repatriation',
  'Death / bereavement',
  'Child protection concern',
  'Domestic violence / VAWC',
  'None',
]

const referralOptions = [
  'DMW',
  'OWWA',
  'LGU/MSWDO',
  'DSWD',
  'PNP/WCPD',
  'DOJ/PAO',
  'DOH / Health Facility',
  'TESDA',
  'PESO',
  'NGO / CSO',
]
</script>
