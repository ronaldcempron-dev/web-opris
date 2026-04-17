<!-- src/components/survey/SectionOFWProfile.vue -->
<template>
  <div>
    <h2 class="text-h5 font-weight-bold mb-6 text-primary">IV. OFW Profile</h2>

    <!-- Name of OFW -->
    <v-row dense class="mb-6">
      <v-col cols="12">
        <v-text-field
          v-model="localData.nameOfOFW"
          label="Name of OFW"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>
    </v-row>

    <v-row dense>
      <!-- Sex -->
      <v-col cols="12" md="4">
        <v-radio-group v-model="localData.sex" label="Sex" inline @update:modelValue="emitUpdate">
          <v-radio label="Male" value="Male" />
          <v-radio label="Female" value="Female" />
        </v-radio-group>
      </v-col>

      <!-- Age -->
      <v-col cols="12" md="4">
        <v-text-field
          v-model.number="localData.age"
          label="Age"
          type="number"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <!-- Civil Status -->
      <v-col cols="12" md="4">
        <v-text-field
          v-model="localData.civilStatus"
          label="Civil Status"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>
    </v-row>

    <!-- Educational Attainment -->
    <div class="mt-8">
      <label class="text-body-1 font-weight-medium mb-3 d-block">Educational Attainment</label>
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="option in educationOptions" :key="option">
          <v-checkbox
            v-model="localData.educationalAttainment"
            :label="option"
            :value="option"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <!-- Technical / Vocational Skills -->
    <v-row dense class="mt-6">
      <v-col cols="12">
        <v-text-field
          v-model="localData.technicalSkills"
          label="Technical/Vocational Skills / Licenses"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>
    </v-row>

    <!-- Passport & Registration -->
    <v-row dense class="mt-4">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="localData.passportNumber"
          label="Passport Number"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="localData.dmwRegistrationNumber"
          label="DMW Registration Number (if available)"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>
    </v-row>

    <!-- Membership Statuses -->
    <v-row dense class="mt-8">
      <!-- OWWA -->
      <v-col cols="12" md="6" lg="3">
        <label class="text-body-1 font-weight-medium mb-2 d-block">OWWA Membership Status</label>
        <v-checkbox
          v-for="status in membershipOptions"
          :key="status"
          v-model="localData.owwaStatus"
          :label="status"
          :value="status"
          density="compact"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <!-- PhilHealth -->
      <v-col cols="12" md="6" lg="3">
        <label class="text-body-1 font-weight-medium mb-2 d-block">PhilHealth Status</label>
        <v-checkbox
          v-for="status in philhealthOptions"
          :key="status"
          v-model="localData.philhealthStatus"
          :label="status"
          :value="status"
          density="compact"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <!-- SSS -->
      <v-col cols="12" md="6" lg="3">
        <label class="text-body-1 font-weight-medium mb-2 d-block">SSS Membership Status</label>
        <v-checkbox
          v-for="status in sssOptions"
          :key="status"
          v-model="localData.sssStatus"
          :label="status"
          :value="status"
          density="compact"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <!-- Pag-IBIG -->
      <v-col cols="12" md="6" lg="3">
        <label class="text-body-1 font-weight-medium mb-2 d-block"
          >Pag-IBIG Membership Status</label
        >
        <v-checkbox
          v-for="status in pagibigOptions"
          :key="status"
          v-model="localData.pagibigStatus"
          :label="status"
          :value="status"
          density="compact"
          @update:modelValue="emitUpdate"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  data: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['update:data'])

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

const membershipOptions = ['Active', 'Expired', 'Not a member', 'Unknown']
const philhealthOptions = ['Active', 'Inactive', 'Unknown']
const sssOptions = ['Active', 'Inactive', 'None']
const pagibigOptions = ['Active', 'Inactive', 'None']

const localData = ref({
  nameOfOFW: '',
  sex: '',
  age: null,
  civilStatus: '',
  educationalAttainment: [],
  technicalSkills: '',
  passportNumber: '',
  dmwRegistrationNumber: '',
  owwaStatus: [],
  philhealthStatus: [],
  sssStatus: [],
  pagibigStatus: [],
  ...props.data,
})

// Two-way sync
watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })
</script>
