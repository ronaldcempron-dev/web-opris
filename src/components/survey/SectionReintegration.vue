<!-- src/components/survey/SectionReintegration.vue -->
<template>
  <div>
    <h2 class="text-h5 font-weight-bold mb-6 text-primary">
      XIII. Reintegration Status &amp; Readiness (for Returned OFWs)
    </h2>

    <!-- Has reintegration plan? -->
    <v-row dense class="mb-8">
      <v-col cols="12">
        <v-radio-group
          v-model="localData.hasReintegrationPlan"
          label="Does the returned OFW currently have a reintegration plan?"
          inline
          @update:modelValue="emitUpdate"
        >
          <v-radio label="Yes" value="Yes" />
          <v-radio label="No" value="No" />
          <v-radio label="In progress" value="In progress" />
        </v-radio-group>
      </v-col>
    </v-row>

    <!-- Type of reintegration preferred -->
    <div class="mb-10">
      <label class="text-body-1 font-weight-medium mb-3 d-block"
        >Type of reintegration preferred</label
      >
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="option in reintegrationTypes" :key="option">
          <v-checkbox
            v-model="localData.preferredReintegrationType"
            :label="option"
            :value="option"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <!-- Has started any livelihood/business? -->
    <v-row dense class="mb-8">
      <v-col cols="12">
        <v-radio-group
          v-model="localData.hasStartedLivelihood"
          label="Has the OFW started any livelihood/business after return?"
          inline
          @update:modelValue="emitUpdate"
        >
          <v-radio label="Yes" value="Yes" />
          <v-radio label="No" value="No" />
        </v-radio-group>
      </v-col>
    </v-row>

    <!-- If Yes: Type and Status -->
    <v-row v-if="localData.hasStartedLivelihood === 'Yes'" dense class="mb-8">
      <v-col cols="12" md="8">
        <v-text-field
          v-model="localData.livelihoodType"
          label="If yes, type of livelihood/business"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <v-col cols="12">
        <label class="text-body-1 font-weight-medium mb-3 d-block"
          >Status of livelihood/business</label
        >
        <v-row dense>
          <v-col cols="12" sm="6" md="3" v-for="status in livelihoodStatuses" :key="status">
            <v-checkbox
              v-model="localData.livelihoodStatus"
              :label="status"
              :value="status"
              density="compact"
              @update:modelValue="emitUpdate"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Main barriers to reintegration -->
    <div>
      <label class="text-body-1 font-weight-medium mb-3 d-block"
        >Main barriers to reintegration</label
      >
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="barrier in barriers" :key="barrier">
          <v-checkbox
            v-model="localData.mainBarriers"
            :label="barrier"
            :value="barrier"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  data: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['update:data'])

const reintegrationTypes = [
  'Local employment',
  'Entrepreneurship / business',
  'Agriculture / agribusiness',
  'Skills upgrading / retooling',
  'Cooperative / group enterprise',
  'Further studies / certification',
  'Re-migration / overseas employment',
  'Other',
]

const livelihoodStatuses = [
  'Operating well',
  'Operating but struggling',
  'Stopped / closed',
  'Seasonal / irregular',
]

const barriers = [
  'Lack of capital',
  'Lack of market access',
  'Lack of business skills',
  'Lack of local jobs',
  'Health issues',
  'Family obligations',
  'Debt',
  'Lack of confidence / psychosocial stress',
  'Documentation / legal issues',
  'Other',
]

const localData = ref({
  hasReintegrationPlan: '',
  preferredReintegrationType: [],
  hasStartedLivelihood: '',
  livelihoodType: '',
  livelihoodStatus: [],
  mainBarriers: [],
  ...props.data,
})

// Two-way sync with SurveyView
watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })
</script>
