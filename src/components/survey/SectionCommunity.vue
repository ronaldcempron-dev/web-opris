<!-- src/components/survey/SectionCommunity.vue -->
<template>
  <div>
    <h2 class="text-h5 font-weight-bold mb-6 text-primary">
      XVI. Community Participation &amp; Support Networks
    </h2>

    <!-- Membership in community groups -->
    <div class="mb-10">
      <label class="text-body-1 font-weight-medium mb-4 d-block">
        Is the household a member of any community group/association?
      </label>
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="group in communityGroups" :key="group">
          <v-checkbox
            v-model="localData.communityGroups"
            :label="group"
            :value="group"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <!-- Willingness to participate -->
    <div>
      <label class="text-body-1 font-weight-medium mb-4 d-block">
        Would the family be willing to participate in the following?
      </label>
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="activity in participationActivities" :key="activity">
          <v-checkbox
            v-model="localData.willingToParticipate"
            :label="activity"
            :value="activity"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>

      <!-- Other -->
      <v-row dense class="mt-4">
        <v-col cols="12">
          <v-text-field
            v-model="localData.otherParticipation"
            label="Other (please specify)"
            variant="outlined"
            density="comfortable"
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

const communityGroups = [
  'OFW Family Circle',
  'Cooperative',
  'Women’s Association',
  'Farmers/Fisherfolk Association',
  'Youth group',
  'Religious/faith-based group',
  'Barangay organization',
  'None',
]

const participationActivities = [
  'Family development sessions',
  'Parenting sessions',
  'Financial literacy training',
  'Enterprise development training',
  'Peer support / counseling groups',
  'OFW reintegration orientation',
  'Community Kalinga / wellness activities',
]

const localData = ref({
  communityGroups: [],
  willingToParticipate: [],
  otherParticipation: '',
  ...props.data,
})

// Two-way sync with SurveyView
watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })
</script>
