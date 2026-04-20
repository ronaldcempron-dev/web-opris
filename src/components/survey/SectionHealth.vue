<!-- src/components/survey/SectionHealth.vue -->
<template>
  <div>
    <h2 class="text-h5 font-weight-bold mb-6 text-primary">X. Health & Psychosocial Status</h2>

    <!-- Chronic Illness -->
    <v-row dense class="mb-8">
      <v-col cols="12" md="8">
        <v-radio-group
          v-model="localData.hasChronicIllness"
          label="Does any household member have a chronic illness?"
          inline
          @update:modelValue="emitUpdate"
        >
          <v-radio label="Yes" value="Yes" />
          <v-radio label="No" value="No" />
        </v-radio-group>
      </v-col>
      <v-col cols="12" md="4" v-if="localData.hasChronicIllness === 'Yes'">
        <v-text-field
          v-model="localData.chronicIllnessSpecify"
          label="If yes, specify illness/condition (optional)"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>
    </v-row>

    <!-- Disability -->
    <v-row dense class="mb-8">
      <v-col cols="12" md="8">
        <v-radio-group
          v-model="localData.hasDisability"
          label="Does any household member have a disability?"
          inline
          @update:modelValue="emitUpdate"
        >
          <v-radio label="Yes" value="Yes" />
          <v-radio label="No" value="No" />
        </v-radio-group>
      </v-col>
    </v-row>

    <!-- Psychosocial / Emotional Concerns -->
    <div class="mb-8">
      <v-radio-group
        v-model="localData.hasPsychosocialConcerns"
        label="Does the family experience any psychosocial or emotional concerns related to migration?"
        inline
        @update:modelValue="emitUpdate"
      >
        <v-radio label="Yes" value="Yes" />
        <v-radio label="No" value="No" />
      </v-radio-group>

      <!-- Concerns (shown only if Yes) -->
      <div v-if="localData.hasPsychosocialConcerns === 'Yes'" class="mt-4">
        <label class="text-body-1 font-weight-medium mb-3 d-block"
          >If yes, what concerns are present?</label
        >
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="concern in psychosocialConcerns" :key="concern">
            <v-checkbox
              v-model="localData.psychosocialConcerns"
              :label="concern"
              :value="concern"
              density="compact"
              @update:modelValue="emitUpdate"
            />
          </v-col>
        </v-row>
      </div>
    </div>

    <!-- Willingness for psychosocial support -->
    <v-row dense class="mb-8">
      <v-col cols="12">
        <v-radio-group
          v-model="localData.willingForPsychosocialSupport"
          label="Would the family/OFW be willing to avail of psychosocial support/counseling?"
          inline
          @update:modelValue="emitUpdate"
        >
          <v-radio label="Yes" value="Yes" />
          <v-radio label="No" value="No" />
          <v-radio label="Maybe" value="Maybe" />
        </v-radio-group>
      </v-col>
    </v-row>

    <!-- Access to health services -->
    <div>
      <label class="text-body-1 font-weight-medium mb-3 d-block">Access to health services</label>
      <v-row dense>
        <v-col cols="12" sm="4" v-for="option in accessOptions" :key="option">
          <v-checkbox
            v-model="localData.healthAccess"
            :label="option"
            :value="option"
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

const psychosocialConcerns = [
  'Anxiety/stress',
  'Depression/sadness',
  'Family conflict',
  'Child behavioral issues',
  'Separation issues',
  'Communication breakdown',
  'Domestic violence',
  'Substance abuse',
  'Grief / loss',
  'Trauma from abuse/exploitation',
  'Other',
]

const accessOptions = ['Easy access', 'Limited access', 'No regular access']

const localData = ref({
  hasChronicIllness: '',
  chronicIllnessSpecify: '',
  hasDisability: '',
  hasPsychosocialConcerns: '',
  psychosocialConcerns: [],
  willingForPsychosocialSupport: '',
  healthAccess: [],
  ...props.data,
})

// Two-way sync with SurveyView
watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })
</script>
