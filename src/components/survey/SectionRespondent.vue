<!-- src/components/survey/SectionRespondent.vue -->
<template>
  <div>
    <h2 class="text-h5 font-weight-bold mb-6 text-primary">II. Respondent Identification</h2>

    <!-- Type of Respondent -->
    <v-row class="mb-8">
      <v-col cols="12">
        <label class="text-body-1 font-weight-medium mb-3 d-block">Type of Respondent</label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="option in respondentTypes" :key="option">
            <v-checkbox
              v-model="localData.typeOfRespondent"
              :label="option"
              :value="option"
              density="compact"
              @update:modelValue="emitUpdate"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Name of Respondent -->
    <v-row dense class="mb-6">
      <v-col cols="12">
        <v-text-field
          v-model="localData.name"
          label="Name of Respondent"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>
    </v-row>

    <!-- Relationship to OFW -->
    <v-row class="mb-8">
      <v-col cols="12">
        <label class="text-body-1 font-weight-medium mb-3 d-block">Relationship to OFW</label>
        <v-row dense>
          <v-col cols="12" sm="6" md="3" v-for="rel in relationships" :key="rel">
            <v-checkbox
              v-model="localData.relationshipToOFW"
              :label="rel"
              :value="rel"
              density="compact"
              @update:modelValue="emitUpdate"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row dense>
      <!-- Sex -->
      <v-col cols="12" md="4">
        <v-radio-group v-model="localData.sex" label="Sex" inline @update:modelValue="emitUpdate">
          <v-radio label="Male" value="Male" />
          <v-radio label="Female" value="Female" />
          <v-radio label="Prefer not to say" value="Prefer not to say" />
        </v-radio-group>
      </v-col>

      <!-- Age -->
      <v-col cols="12" md="4">
        <v-text-field
          v-model="localData.age"
          label="Age"
          type="number"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <!-- Date of Birth -->
      <v-col cols="12" md="4">
        <v-text-field
          v-model="localData.dateOfBirth"
          label="Date of Birth"
          type="date"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>
    </v-row>

    <!-- Civil Status -->
    <v-row dense class="mb-6">
      <v-col cols="12">
        <label class="text-body-1 font-weight-medium mb-3 d-block">Civil Status</label>
        <v-row dense>
          <v-col cols="12" sm="4" md="3" v-for="status in civilStatuses" :key="status">
            <v-checkbox
              v-model="localData.civilStatus"
              :label="status"
              :value="status"
              density="compact"
              @update:modelValue="emitUpdate"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Optional fields -->
    <v-row dense>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="localData.religion"
          label="Religion (optional)"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="localData.contactNumber"
          label="Contact Number"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="localData.alternativeContact"
          label="Alternative Contact Number"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="localData.email"
          label="Email Address (if any)"
          type="email"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <v-col cols="12">
        <v-textarea
          v-model="localData.completeHomeAddress"
          label="Complete Home Address"
          variant="outlined"
          density="comfortable"
          rows="2"
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

const respondentTypes = [
  'Current OFW',
  'Returning OFW (vacation)',
  'Returned OFW (reintegrated)',
  'Distressed OFW / family of distressed OFW',
  'Family left behind of current OFW',
  'Repatriated OFW',
  'Deceased OFW family',
  'Other',
]

const relationships = ['Self (OFW)', 'Spouse', 'Parent', 'Child', 'Sibling', 'Guardian', 'Other']

const civilStatuses = ['Single', 'Married', 'Widowed', 'Separated', 'Live-in', 'Other']

const localData = ref({
  typeOfRespondent: [],
  name: '',
  relationshipToOFW: [],
  sex: '',
  age: '',
  dateOfBirth: '',
  civilStatus: [],
  religion: '',
  contactNumber: '',
  alternativeContact: '',
  email: '',
  completeHomeAddress: '',
  ...props.data,
})

// Two-way sync with parent
watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })
</script>
