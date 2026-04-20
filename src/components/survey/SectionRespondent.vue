<!-- src/components/survey/SectionRespondent.vue -->
<template>
  <div>
    <h2 class="text-h5 font-weight-bold mb-6 text-primary">II. Respondent Identification</h2>

    <!-- Name -->
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

    <!-- Relationship -->
    <v-row class="mb-6">
      <v-col cols="12">
        <label class="font-weight-medium mb-2 d-block"> Relationship to OFW </label>

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
        <v-radio-group v-model="localData.sex" inline>
          <v-radio label="Male" value="Male" />
          <v-radio label="Female" value="Female" />
        </v-radio-group>
      </v-col>

      <!-- Age -->
      <v-col cols="12" md="4">
        <v-text-field v-model="localData.age" label="Age" type="number" />
      </v-col>

      <!-- DOB -->
      <v-col cols="12" md="4">
        <v-text-field v-model="localData.dateOfBirth" type="date" />
      </v-col>
    </v-row>

    <!-- Contact -->
    <v-row dense>
      <v-col cols="12" md="6">
        <v-text-field v-model="localData.contactNumber" label="Contact Number" />
      </v-col>

      <v-col cols="12">
        <v-textarea v-model="localData.completeHomeAddress" label="Address" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({ data: Object })
const emit = defineEmits(['update:data'])

const relationships = ['Self (OFW)', 'Spouse', 'Parent', 'Child', 'Sibling']

const localData = ref({
  name: '',
  relationshipToOFW: [],
  sex: '',
  age: '',
  dateOfBirth: '',
  contactNumber: '',
  completeHomeAddress: '',
  ...props.data,
})

watch(localData, (v) => emit('update:data', { ...v }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })
</script>
