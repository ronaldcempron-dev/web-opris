<template>
  <v-card-text>
    <v-row dense>
      <v-col cols="12">
        <v-label>Is the household a member of any community group/association?</v-label>
        <v-checkbox
          v-for="opt in groupOptions"
          :key="opt"
          v-model="data.memberOfGroups"
          :label="opt"
          :value="opt"
        />
      </v-col>
      <v-col cols="12">
        <v-label>Would the family be willing to participate in the following?</v-label>
        <v-checkbox
          v-for="opt in participationOptions"
          :key="opt"
          v-model="data.willingToParticipate"
          :label="opt"
          :value="opt"
        />
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script setup>
defineProps({ data: Object })

const groupOptions = [
  'OFW Family Circle',
  'Cooperative',
  "Women's Association",
  'Farmers/Fisherfolk Association',
  'Youth group',
  'Religious/faith-based group',
  'Barangay organization',
  'None',
]

const participationOptions = [
  'Family development sessions',
  'Parenting sessions',
  'Financial literacy training',
  'Enterprise development training',
  'Peer support / counseling groups',
  'OFW reintegration orientation',
  'Community Kalinga / wellness activities',
]
</script>
