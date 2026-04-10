<template>
  <v-card-text>
    <v-row dense>
      <v-col cols="12">
        <v-label>Are all school-age children currently enrolled?</v-label>
        <v-radio-group v-model="data.allChildrenEnrolled" inline>
          <v-radio label="Yes" value="Yes" />
          <v-radio label="No" value="No" />
        </v-radio-group>
      </v-col>
      <v-col v-if="data.allChildrenEnrolled === 'No'" cols="12">
        <v-text-field
          v-model.number="data.outOfSchoolCount"
          label="How many are out-of-school?"
          type="number"
        />
      </v-col>
      <v-col cols="12">
        <v-label>Reasons for non-enrollment / dropping out</v-label>
        <v-checkbox
          v-for="opt in dropoutReasons"
          :key="opt"
          v-model="data.reasonsForDropout"
          :label="opt"
          :value="opt"
        />
      </v-col>
      <v-col cols="12">
        <v-label>Educational needs of children/dependents</v-label>
        <v-checkbox
          v-for="opt in educationNeeds"
          :key="opt"
          v-model="data.educationalNeeds"
          :label="opt"
          :value="opt"
        />
      </v-col>
    </v-row>
  </v-card-text>
</template>
<script setup>
defineProps({ data: Object })
const dropoutReasons = [
  'Financial constraints',
  'Need to work',
  'Lack of school supplies/transportation',
  'Early pregnancy',
  'Illness/disability',
  'Lack of interest',
  'Child care / household duties',
  'Migration / relocation',
  'Other',
]
const educationNeeds = [
  'School supplies',
  'Tuition/fees support',
  'Transportation allowance',
  'Gadget/internet access',
  'Scholarship',
  'Tutorial / learning support',
  'ALS / alternative learning',
  'Other',
]
</script>
