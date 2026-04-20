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

      <!-- ✅ PERFECTLY ALIGNED GPS LOCATION -->
      <v-col cols="12" md="6">
        <v-row align="center" no-gutters>
          <!-- Button -->
          <v-col cols="auto">
            <v-btn
              color="primary"
              variant="elevated"
              size="large"
              prepend-icon="mdi-crosshairs-gps"
              :loading="gpsLoading"
              @click="captureGPS"
            >
              Capture Location
            </v-btn>
          </v-col>

          <!-- Coordinates -->
          <v-col class="pl-4">
            <div
              v-if="localData.latitude && localData.longitude"
              class="text-body-1 font-weight-medium text-success"
            >
              Latitude: {{ localData.latitude.toFixed(6) }} | Longitude:
              {{ localData.longitude.toFixed(6) }}
            </div>

            <div v-else class="text-body-2 text-medium-emphasis">Click to capture location</div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getCurrentPosition } from '@/services/geolocation'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:data'])

const gpsLoading = ref(false)

const localData = ref({
  dateOfInterview: '',
  timeOfInterview: '',
  enumeratorName: '',
  barangay: '',
  municipalityCity: '',
  provinceRegion: '',
  householdControlNumber: '',
  gpsLocation: '',
  latitude: null,
  longitude: null,
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

// GPS Capture
const captureGPS = async () => {
  gpsLoading.value = true

  try {
    const position = await getCurrentPosition()

    localData.value.latitude = position.latitude
    localData.value.longitude = position.longitude

    localData.value.gpsLocation = `${position.latitude.toFixed(6)}, ${position.longitude.toFixed(6)}`

    emitUpdate()
  } catch (error) {
    console.error(error)
    alert(
      '❌ Unable to get GPS location.\n\nPlease allow location access in your browser and try again.',
    )
  } finally {
    gpsLoading.value = false
  }
}
</script>
