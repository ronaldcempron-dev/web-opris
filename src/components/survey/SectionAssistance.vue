<template>
  <v-card-text>
    <v-row dense>
      <v-col cols="12">
        <v-label
          >Has the OFW/family received assistance from any of the following? (check all that
          apply)</v-label
        >
        <v-checkbox
          v-for="opt in assistanceSources"
          :key="opt"
          v-model="data.receivedFrom"
          :label="opt"
          :value="opt"
        />
      </v-col>
      <v-col cols="12">
        <v-label>Type of assistance received</v-label>
        <v-checkbox
          v-for="opt in assistanceTypes"
          :key="opt"
          v-model="data.typeOfAssistance"
          :label="opt"
          :value="opt"
        />
      </v-col>
      <v-col cols="12">
        <v-select
          v-model="data.sufficient"
          label="Was the assistance sufficient/helpful?"
          :items="['Very helpful', 'Somewhat helpful', 'Not sufficient', 'Not helpful']"
        />
      </v-col>
      <v-col cols="12">
        <v-switch
          v-model="data.awareOfReintegration"
          label="Are you aware of DMW/OWWA/LGU reintegration programs?"
        />
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script setup>
defineProps({ data: Object })

const assistanceSources = [
  'DMW',
  'OWWA',
  'DOLE',
  'DSWD',
  'LGU / Barangay',
  'PESO',
  'TESDA',
  'DA / BFAR',
  'PhilHealth',
  'SSS',
  'Pag-IBIG',
  'Overseas post / embassy',
  'NGO / faith-based organization',
  'None',
]

const assistanceTypes = [
  'Repatriation assistance',
  'Financial assistance',
  'Livelihood starter kit',
  'Scholarship / education aid',
  'Medical assistance',
  'Psychosocial services',
  'Legal assistance',
  'Skills training',
  'Job referral / employment facilitation',
  'Food packs / relief',
  'Kalinga kit / welfare support',
]
</script>
