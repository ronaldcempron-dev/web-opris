<!-- src/components/survey/SectionLivelihood.vue -->
<template>
  <div>
    <h2 class="text-h5 font-weight-bold mb-6 text-primary">
      VIII. Employment & Livelihood Status of Household Members
    </h2>

    <v-row dense class="mb-8">
      <!-- Numbers -->
      <v-col cols="12" md="4">
        <v-text-field
          v-model.number="localData.employedMembers"
          label="Number of employed household members (excluding OFW)"
          type="number"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field
          v-model.number="localData.unemployedMembers"
          label="Number of unemployed household members"
          type="number"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field
          v-model.number="localData.underemployedMembers"
          label="Number of underemployed household members"
          type="number"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>
    </v-row>

    <!-- Main local occupations -->
    <div class="mb-8">
      <label class="text-body-1 font-weight-medium mb-3 d-block"
        >Main local occupations of household members</label
      >
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="option in occupationOptions" :key="option">
          <v-checkbox
            v-model="localData.mainOccupations"
            :label="option"
            :value="option"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <!-- Interested in local livelihood -->
    <v-row dense class="mb-8">
      <v-col cols="12">
        <v-radio-group
          v-model="localData.interestedInLivelihood"
          label="Are household members interested in local livelihood or employment?"
          inline
          @update:modelValue="emitUpdate"
        >
          <v-radio label="Yes" value="Yes" />
          <v-radio label="No" value="No" />
        </v-radio-group>
      </v-col>
    </v-row>

    <!-- Preferred livelihood / enterprise options -->
    <div class="mb-8">
      <label class="text-body-1 font-weight-medium mb-3 d-block"
        >Preferred livelihood / enterprise options</label
      >
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="option in preferredLivelihoods" :key="option">
          <v-checkbox
            v-model="localData.preferredLivelihood"
            :label="option"
            :value="option"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <!-- Skills training needed -->
    <v-row dense>
      <v-col cols="12">
        <v-textarea
          v-model="localData.skillsTrainingNeeded"
          label="Skills training needed by family members"
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

const occupationOptions = [
  'Farming',
  'Fishing',
  'Labor / construction',
  'Vendor / small business',
  'Government employee',
  'Private employee',
  'Driver / transport',
  'Domestic work',
  'Freelance / online work',
  'None',
  'Other',
]

const preferredLivelihoods = [
  'Sari-sari store',
  'Food processing / catering',
  'Livestock / poultry',
  'Crop production / gardening',
  'Fishing-related livelihood',
  'Sewing / dressmaking',
  'Beauty / wellness services',
  'Online selling',
  'Transport service',
  'Handicrafts',
  'Other',
]

const localData = ref({
  employedMembers: null,
  unemployedMembers: null,
  underemployedMembers: null,
  mainOccupations: [],
  interestedInLivelihood: '',
  preferredLivelihood: [],
  skillsTrainingNeeded: '',
  ...props.data,
})

// Two-way sync with SurveyView
watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })
</script>
