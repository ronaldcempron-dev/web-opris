<template>
  <v-card-text>
    <v-row dense>
      <v-col cols="12">
        <v-switch
          v-model="data.chronicIllness"
          label="Does any household member have a chronic illness?"
        />
        <v-text-field
          v-if="data.chronicIllness"
          v-model="data.illnessSpecify"
          label="Specify illness/condition"
        />
      </v-col>
      <v-col cols="12">
        <v-switch v-model="data.disability" label="Does any household member have a disability?" />
      </v-col>
      <v-col cols="12">
        <v-switch
          v-model="data.psychosocialConcerns"
          label="Does the family experience any psychosocial or emotional concerns related to migration?"
        />
      </v-col>
      <v-col cols="12" v-if="data.psychosocialConcerns">
        <v-label>Concerns present</v-label>
        <v-checkbox
          v-for="opt in concerns"
          :key="opt"
          v-model="data.concernsList"
          :label="opt"
          :value="opt"
        />
      </v-col>
      <v-col cols="12">
        <v-label
          >Would the family/OFW be willing to avail of psychosocial support/counseling?</v-label
        >
        <v-radio-group v-model="data.willingForCounseling" inline>
          <v-radio label="Yes" value="Yes" />
          <v-radio label="No" value="No" />
          <v-radio label="Maybe" value="Maybe" />
        </v-radio-group>
      </v-col>
    </v-row>
  </v-card-text>
</template>
<script setup>
defineProps({ data: Object })
const concerns = [
  'Anxiety/stress',
  'Depression/sadness',
  'Family conflict',
  'Child behavioral issues',
  'Separation issues',
  'Communication breakdown',
  'Domestic violence',
  'Substance abuse',
  'Grief / loss',
  'Trauma from abuse/exploitation',
  'Other',
]
</script>
