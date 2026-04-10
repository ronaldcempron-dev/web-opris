<template>
  <v-card-text>
    <v-row dense>
      <v-col cols="12" md="4"
        ><v-text-field
          v-model.number="data.employedMembers"
          label="Employed members (excl. OFW)"
          type="number"
      /></v-col>
      <v-col cols="12" md="4"
        ><v-text-field
          v-model.number="data.unemployedMembers"
          label="Unemployed members"
          type="number"
      /></v-col>
      <v-col cols="12" md="4"
        ><v-text-field
          v-model.number="data.underemployedMembers"
          label="Underemployed members"
          type="number"
      /></v-col>
      <v-col cols="12">
        <v-label>Main local occupations</v-label>
        <v-checkbox
          v-for="opt in occupationOptions"
          :key="opt"
          v-model="data.mainOccupations"
          :label="opt"
          :value="opt"
        />
      </v-col>
      <v-col cols="12">
        <v-switch
          v-model="data.interestedInLocalLivelihood"
          label="Are household members interested in local livelihood or employment?"
        />
      </v-col>
      <v-col cols="12">
        <v-label>Preferred livelihood / enterprise options</v-label>
        <v-checkbox
          v-for="opt in livelihoodOptions"
          :key="opt"
          v-model="data.preferredLivelihood"
          :label="opt"
          :value="opt"
        />
      </v-col>
      <v-col cols="12"
        ><v-textarea
          v-model="data.skillsTrainingNeeded"
          label="Skills training needed by family members"
          rows="2"
      /></v-col>
    </v-row>
  </v-card-text>
</template>
<script setup>
defineProps({ data: Object })
const occupationOptions = [
  'Farming',
  'Fishing',
  'Labor / construction',
  'Vendor / small business',
  'Government employee',
  'Private employee',
  'Driver / transport',
  'Domestic work',
  'Freelance / online work',
  'None',
  'Other',
]
const livelihoodOptions = [
  'Sari-sari store',
  'Food processing / catering',
  'Livestock / poultry',
  'Crop production / gardening',
  'Fishing-related livelihood',
  'Sewing / dressmaking',
  'Beauty / wellness services',
  'Online selling',
  'Transport service',
  'Handicrafts',
  'Other',
]
</script>
