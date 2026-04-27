<!-- src/components/survey/SectionGeneralInfo.vue -->
<template>
  <div>
    <h2 class="text-h5 font-weight-bold mb-6 text-primary">I. General Information</h2>

    <v-row dense>
      <!-- Date -->
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

      <!-- Time -->
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

      <!-- Enumerator -->
      <v-col cols="12" md="4">
        <v-text-field
          v-model="localData.enumeratorName"
          label="Name of Enumerator/Interviewer"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <!-- Location -->
      <v-col cols="12" md="4">
        <v-text-field
          v-model="localData.barangay"
          label="Barangay"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field
          v-model="localData.municipalityCity"
          label="Municipality/City"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field
          v-model="localData.provinceRegion"
          label="Province/Region"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <!-- Survey ID -->
      <v-col cols="12" md="6">
        <v-text-field
          v-model="localData.householdControlNumber"
          label="Household Control Number / Survey ID"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <!-- GPS -->
      <v-col cols="12" md="6">
        <v-row align="center" no-gutters>
          <v-col cols="auto">
            <v-btn
              color="primary"
              size="large"
              prepend-icon="mdi-crosshairs-gps"
              :loading="gpsLoading"
              @click="captureGPS"
            >
              Capture Location
            </v-btn>
          </v-col>

          <v-col class="pl-4">
            <div v-if="localData.latitude && localData.longitude">
              <!-- LATITUDE -->
              <div class="d-flex align-center mb-1">
                <span class="font-weight-medium">
                  LATITUDE: {{ localData.latitude.toFixed(6) }}
                </span>

                <v-btn
                  icon="mdi-content-copy"
                  size="small"
                  variant="text"
                  class="ml-2"
                  @click="copyLat"
                />

                <span v-if="copiedLat" class="text-success text-caption ml-1"> Copied! </span>
              </div>

              <!-- LONGITUDE -->
              <div class="d-flex align-center">
                <span class="font-weight-medium">
                  LONGITUDE: {{ localData.longitude.toFixed(6) }}
                </span>

                <v-btn
                  icon="mdi-content-copy"
                  size="small"
                  variant="text"
                  class="ml-2"
                  @click="copyLng"
                />

                <span v-if="copiedLng" class="text-success text-caption ml-1"> Copied! </span>
              </div>
            </div>

            <div v-else class="text-grey">Click to capture location</div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- TYPE OF RESPONDENT -->
    <v-divider class="my-6" />

    <v-row>
      <v-col cols="12">
        <label class="text-body-1 font-weight-medium mb-2 d-block"> Type of Respondent </label>

        <v-radio-group v-model="localData.typeOfRespondent" @update:modelValue="handleTypeChange">
          <v-row dense>
            <v-col cols="12" sm="6" md="4" v-for="option in respondentTypes" :key="option">
              <v-radio :value="option">
                <template #label>
                  <span v-if="option !== 'Other'">{{ option }}</span>

                  <div v-else class="d-flex align-center" style="align-items: flex-start">
                    <span class="mt-1">Other</span>

                    <v-text-field
                      v-if="localData.typeOfRespondent === 'Other'"
                      v-model="localData.typeOfRespondentOther"
                      placeholder="Please specify"
                      variant="underlined"
                      density="comfortable"
                      hide-details
                      class="ml-4 mt-n2"
                      style="width: 280px"
                      @update:modelValue="emitUpdate"
                    />
                  </div>
                </template>
              </v-radio>
            </v-col>
          </v-row>
        </v-radio-group>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getCurrentPosition } from '@/services/geolocation'

const props = defineProps({ data: Object })
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

const gpsLoading = ref(false)
const copiedLat = ref(false)
const copiedLng = ref(false)

const localData = ref({
  typeOfRespondent: '',
  typeOfRespondentOther: '',
  dateOfInterview: '',
  timeOfInterview: '',
  enumeratorName: '',
  barangay: '',
  municipalityCity: '',
  provinceRegion: '',
  householdControlNumber: '',
  latitude: null,
  longitude: null,
  ...props.data,
})

watch(localData, (v) => emit('update:data', { ...v }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })

const handleTypeChange = () => {
  if (localData.value.typeOfRespondent !== 'Other') {
    localData.value.typeOfRespondentOther = ''
  }
  emitUpdate()
}

const captureGPS = async () => {
  gpsLoading.value = true
  try {
    const pos = await getCurrentPosition()
    localData.value.latitude = pos.latitude
    localData.value.longitude = pos.longitude
  } catch (error) {
    alert('❌ Please allow location access')
  }
  gpsLoading.value = false
}

/* COPY FUNCTIONS WITH FEEDBACK */
const copyLat = async () => {
  await navigator.clipboard.writeText(localData.value.latitude.toFixed(6))
  copiedLat.value = true
  setTimeout(() => (copiedLat.value = false), 1500)
}

const copyLng = async () => {
  await navigator.clipboard.writeText(localData.value.longitude.toFixed(6))
  copiedLng.value = true
  setTimeout(() => (copiedLng.value = false), 1500)
}
</script>
