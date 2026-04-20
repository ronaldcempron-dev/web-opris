<!-- src/components/survey/SectionEducation.vue -->
<template>
  <div>
    <h2 class="text-h5 font-weight-bold mb-6 text-primary">
      IX. Education Status of Children / Dependents
    </h2>

    <!-- Are all school-age children currently enrolled? -->
    <v-row dense class="mb-8">
      <v-col cols="12">
        <v-radio-group
          v-model="localData.allChildrenEnrolled"
          label="Are all school-age children currently enrolled?"
          inline
          @update:modelValue="emitUpdate"
        >
          <v-radio label="Yes" value="Yes" />
          <v-radio label="No" value="No" />
        </v-radio-group>
      </v-col>
    </v-row>

    <!-- If No -->
    <div v-if="localData.allChildrenEnrolled === 'No'" class="mb-8">
      <v-row dense>
        <v-col cols="12" md="6">
          <v-text-field
            v-model.number="localData.numberOutOfSchool"
            label="If no, how many are out-of-school?"
            type="number"
            variant="outlined"
            density="comfortable"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>

      <!-- Reasons for non-enrollment / dropping out -->
      <div class="mt-6">
        <label class="text-body-1 font-weight-medium mb-3 d-block"
          >Reasons for non-enrollment / dropping out</label
        >
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="reason in nonEnrollmentReasons" :key="reason">
            <v-checkbox
              v-model="localData.nonEnrollmentReasons"
              :label="reason"
              :value="reason"
              density="compact"
              @update:modelValue="emitUpdate"
            />
          </v-col>
        </v-row>
      </div>
    </div>

    <!-- Educational needs of children/dependents -->
    <div class="mb-8">
      <label class="text-body-1 font-weight-medium mb-3 d-block"
        >Educational needs of children/dependents</label
      >
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="need in educationalNeeds" :key="need">
          <v-checkbox
            v-model="localData.educationalNeeds"
            :label="need"
            :value="need"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <!-- Not applicable checkbox (for households with no children) -->
    <v-checkbox
      v-model="localData.notApplicable"
      label="Not applicable (no school-age children)"
      density="compact"
      class="mt-4"
      @update:modelValue="emitUpdate"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  data: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['update:data'])

const nonEnrollmentReasons = [
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

const educationalNeeds = [
  'School supplies',
  'Tuition/fees support',
  'Transportation allowance',
  'Gadget/internet access',
  'Scholarship',
  'Tutorial / learning support',
  'ALS / alternative learning',
  'Other',
]

const localData = ref({
  allChildrenEnrolled: '',
  numberOutOfSchool: null,
  nonEnrollmentReasons: [],
  educationalNeeds: [],
  notApplicable: false,
  ...props.data,
})

// Two-way sync with SurveyView
watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })
</script>
