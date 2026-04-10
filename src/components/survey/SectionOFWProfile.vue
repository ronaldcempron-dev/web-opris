<template>
  <v-card-text>
    <v-row dense>
      <v-col cols="12"><v-text-field v-model="data.name" label="Name of OFW" /></v-col>
      <v-col cols="12" md="6">
        <v-select v-model="data.sex" :items="['Male', 'Female']" label="Sex" />
      </v-col>
      <v-col cols="12" md="6"><v-text-field v-model="data.age" label="Age" type="number" /></v-col>
      <v-col cols="12" md="6"
        ><v-text-field v-model="data.civilStatus" label="Civil Status"
      /></v-col>
      <v-col cols="12">
        <v-label>Educational Attainment</v-label>
        <v-checkbox
          v-for="opt in educationOptions"
          :key="opt"
          v-model="data.education"
          :label="opt"
          :value="opt"
        />
      </v-col>
      <v-col cols="12"
        ><v-text-field
          v-model="data.technicalSkills"
          label="Technical/Vocational Skills / Licenses"
      /></v-col>
      <v-col cols="12" md="6"
        ><v-text-field v-model="data.passportNumber" label="Passport Number"
      /></v-col>
      <v-col cols="12" md="6"
        ><v-text-field v-model="data.dmwRegistration" label="DMW Registration Number"
      /></v-col>
      <v-col cols="12"
        ><v-label>Membership Status</v-label>
        <v-select
          v-model="data.owwaStatus"
          label="OWWA"
          :items="['Active', 'Expired', 'Not a member', 'Unknown']"
        />
        <v-select
          v-model="data.philHealthStatus"
          label="PhilHealth"
          :items="['Active', 'Inactive', 'Unknown']"
          class="mt-2"
        />
        <v-select
          v-model="data.sssStatus"
          label="SSS"
          :items="['Active', 'Inactive', 'None']"
          class="mt-2"
        />
        <v-select
          v-model="data.pagIbigStatus"
          label="Pag-IBIG"
          :items="['Active', 'Inactive', 'None']"
          class="mt-2"
        />
      </v-col>
    </v-row>
  </v-card-text>
</template>
<script setup>
defineProps({ data: Object })
const educationOptions = [
  'Elementary Level',
  'Elementary Graduate',
  'High School Level',
  'High School Graduate',
  'Senior High School Graduate',
  'Vocational / TESDA',
  'College Level',
  'College Graduate',
  'Postgraduate',
  'Other',
]
</script>
