<!-- src/components/survey/SectionNeeds.vue -->
<template>
  <div>
    <h2 class="text-h5 font-weight-bold mb-6 text-primary">
      XIV. Training, Employment, &amp; Livelihood Needs Assessment
    </h2>

    <!-- Immediate assistance needed -->
    <div class="mb-10">
      <label class="text-body-1 font-weight-medium mb-4 d-block">
        What immediate assistance does the OFW/family need?<br />
        <small class="text-grey-darken-1">(Check all that apply)</small>
      </label>
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="item in immediateAssistanceOptions" :key="item">
          <v-checkbox
            v-model="localData.immediateAssistance"
            :label="item"
            :value="item"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <!-- Preferred skills training -->
    <div class="mb-10">
      <label class="text-body-1 font-weight-medium mb-4 d-block">Preferred skills training</label>
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="skill in preferredSkills" :key="skill">
          <v-checkbox
            v-model="localData.preferredSkillsTraining"
            :label="skill"
            :value="skill"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <!-- Preferred local employment sector -->
    <v-row dense class="mb-8">
      <v-col cols="12">
        <v-text-field
          v-model="localData.preferredLocalEmployment"
          label="Preferred local employment sector"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>
    </v-row>

    <!-- Willingness to join cooperative/association -->
    <v-row dense class="mb-8">
      <v-col cols="12" md="6">
        <v-radio-group
          v-model="localData.willingToJoinCooperative"
          label="Willingness to join cooperative/association of OFWs or families"
          inline
          @update:modelValue="emitUpdate"
        >
          <v-radio label="Yes" value="Yes" />
          <v-radio label="No" value="No" />
          <v-radio label="Maybe" value="Maybe" />
        </v-radio-group>
      </v-col>

      <!-- Interested in OFW Family Circle / support group -->
      <v-col cols="12" md="6">
        <v-radio-group
          v-model="localData.interestedInFamilyCircle"
          label="Interested in joining OFW Family Circle / support group?"
          inline
          @update:modelValue="emitUpdate"
        >
          <v-radio label="Yes" value="Yes" />
          <v-radio label="No" value="No" />
          <v-radio label="Maybe" value="Maybe" />
        </v-radio-group>
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

const immediateAssistanceOptions = [
  'Financial assistance',
  'Emergency assistance',
  'Food / relief support',
  'Medical assistance',
  'Psychosocial counseling',
  'Legal assistance',
  'Documentation / case referral',
  'Livelihood starter kit',
  'Livelihood capital / grant',
  'Skills training / TESDA referral',
  'Job matching / local employment',
  'Scholarship / educational support',
  'Child support services',
  'Shelter / temporary housing',
  'Other',
]

const preferredSkills = [
  'Bread and pastry production',
  'Cookery / food processing',
  'Dressmaking / tailoring',
  'Massage / wellness',
  'Hairdressing / beauty care',
  'Computer / digital literacy',
  'Bookkeeping / entrepreneurship',
  'Driving / automotive',
  'Welding / electrical / plumbing',
  'Agriculture / organic farming',
  'Fisheries / aquaculture',
  'Handicrafts / souvenir making',
  'Online freelancing / e-commerce',
  'Caregiving / health services',
  'Other',
]

const localData = ref({
  immediateAssistance: [],
  preferredSkillsTraining: [],
  preferredLocalEmployment: '',
  willingToJoinCooperative: '',
  interestedInFamilyCircle: '',
  ...props.data,
})

// Two-way sync with SurveyView
watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })
</script>
