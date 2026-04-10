<template>
  <v-card-text>
    <v-row dense>
      <v-col cols="12"><v-text-field v-model="data.name" label="Name of Respondent" /></v-col>
      <v-col cols="12"
        ><v-text-field v-model="data.relationshipToOFW" label="Relationship to OFW"
      /></v-col>
      <v-col cols="12" md="4">
        <v-select v-model="data.sex" :items="['Male', 'Female', 'Prefer not to say']" label="Sex" />
      </v-col>
      <v-col cols="12" md="4"><v-text-field v-model="data.age" label="Age" type="number" /></v-col>
      <v-col cols="12" md="4"
        ><v-text-field v-model="data.dateOfBirth" label="Date of Birth" type="date"
      /></v-col>
      <v-col cols="12" md="6"
        ><v-select
          v-model="data.civilStatus"
          :items="['Single', 'Married', 'Widowed', 'Separated', 'Live-in', 'Other']"
          label="Civil Status"
      /></v-col>
      <v-col cols="12" md="6"
        ><v-text-field v-model="data.religion" label="Religion (optional)"
      /></v-col>
      <v-col cols="12" md="6"
        ><v-text-field v-model="data.contactNumber" label="Contact Number"
      /></v-col>
      <v-col cols="12" md="6"
        ><v-text-field v-model="data.alternativeContact" label="Alternative Contact Number"
      /></v-col>
      <v-col cols="12"><v-text-field v-model="data.email" label="Email Address" /></v-col>
      <v-col cols="12"
        ><v-textarea v-model="data.homeAddress" label="Complete Home Address" rows="2"
      /></v-col>
    </v-row>
  </v-card-text>
</template>
<script setup>
defineProps({ data: Object })
</script>
