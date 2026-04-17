<!-- src/components/survey/SectionGeneralInfo.vue -->
<template>
  <div>
    <h2 class="text-h5 font-weight-bold mb-6 text-primary">I. General Information</h2>

    <v-row dense>
      <!-- Date of Interview -->
      <v-col cols="12" md="4">
        <v-text-field
          v-model="localData.dateOfInterview"
          label="Date of Interview"
          type="date"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <!-- Time of Interview -->
      <v-col cols="12" md="4">
        <v-text-field
          v-model="localData.timeOfInterview"
          label="Time of Interview"
          type="time"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <!-- Name of Enumerator -->
      <v-col cols="12" md="4">
        <v-text-field
          v-model="localData.enumeratorName"
          label="Name of Enumerator/Interviewer"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <!-- Barangay -->
      <v-col cols="12" md="4">
        <v-text-field
          v-model="localData.barangay"
          label="Barangay"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <!-- Municipality/City -->
      <v-col cols="12" md="4">
        <v-text-field
          v-model="localData.municipalityCity"
          label="Municipality/City"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <!-- Province/Region -->
      <v-col cols="12" md="4">
        <v-text-field
          v-model="localData.provinceRegion"
          label="Province/Region"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <!-- Household Control Number / Survey ID -->
      <v-col cols="12" md="6">
        <v-text-field
          v-model="localData.householdControlNumber"
          label="Household Control Number / Survey ID"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <!-- GPS Location -->
      <v-col cols="12" md="6">
        <v-text-field
          v-model="localData.gpsLocation"
          label="GPS Location (if applicable)"
          variant="outlined"
          density="comfortable"
          append-inner-icon="mdi-map-marker"
          @click:append-inner="$emit('capture-gps')"
          @update:modelValue="emitUpdate"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:data'])

const localData = ref({
  dateOfInterview: '',
  timeOfInterview: '',
  enumeratorName: '',
  barangay: '',
  municipalityCity: '',
  provinceRegion: '',
  householdControlNumber: '',
  gpsLocation: '',
  ...props.data,
})

// Two-way binding
watch(
  localData,
  (newVal) => {
    emit('update:data', { ...newVal })
  },
  { deep: true },
)

const emitUpdate = () => {
  emit('update:data', { ...localData.value })
}
</script>
