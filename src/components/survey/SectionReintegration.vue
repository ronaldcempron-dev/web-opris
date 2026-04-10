<template>
  <v-card-text>
    <v-row dense>
      <v-col cols="12">
        <v-label>Does the returned OFW currently have a reintegration plan?</v-label>
        <v-radio-group v-model="data.hasPlan" inline>
          <v-radio label="Yes" value="Yes" />
          <v-radio label="No" value="No" />
          <v-radio label="In progress" value="In progress" />
        </v-radio-group>
      </v-col>
      <v-col cols="12">
        <v-label>Type of reintegration preferred</v-label>
        <v-checkbox
          v-for="opt in reintegrationTypes"
          :key="opt"
          v-model="data.preferredType"
          :label="opt"
          :value="opt"
        />
      </v-col>
      <v-col cols="12">
        <v-switch
          v-model="data.startedBusiness"
          label="Has the OFW started any livelihood/business after return?"
        />
      </v-col>
      <v-col v-if="data.startedBusiness" cols="12">
        <v-text-field v-model="data.businessType" label="Type of livelihood/business" />
      </v-col>
      <v-col cols="12">
        <v-label>Main barriers to reintegration</v-label>
        <v-checkbox
          v-for="opt in barriers"
          :key="opt"
          v-model="data.barriers"
          :label="opt"
          :value="opt"
        />
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script setup>
defineProps({ data: Object })

const reintegrationTypes = [
  'Local employment',
  'Entrepreneurship / business',
  'Agriculture / agribusiness',
  'Skills upgrading / retooling',
  'Cooperative / group enterprise',
  'Further studies / certification',
  'Re-migration / overseas employment',
]

const barriers = [
  'Lack of capital',
  'Lack of market access',
  'Lack of business skills',
  'Lack of local jobs',
  'Health issues',
  'Family obligations',
  'Debt',
  'Lack of confidence / psychosocial stress',
  'Documentation / legal issues',
]
</script>
