<!-- src/components/survey/SectionFinancial.vue -->
<template>
  <div>
    <h2 class="text-h5 font-weight-bold mb-6 text-primary">
      XVII. Financial Literacy &amp; Asset Building
    </h2>

    <!-- Family budget -->
    <v-row dense class="mb-8">
      <v-col cols="12">
        <v-radio-group
          v-model="localData.keepsFamilyBudget"
          label="Does the household keep a family budget?"
          inline
          @update:modelValue="emitUpdate"
        >
          <v-radio label="Yes" value="Yes" />
          <v-radio label="No" value="No" />
        </v-radio-group>
      </v-col>
    </v-row>

    <!-- Savings / Investment products -->
    <div class="mb-10">
      <label class="text-body-1 font-weight-medium mb-3 d-block">
        Does the OFW/family have any savings/investment product?
      </label>
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="item in savingsOptions" :key="item">
          <v-checkbox
            v-model="localData.savingsProducts"
            :label="item"
            :value="item"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <!-- Attended financial literacy sessions -->
    <v-row dense class="mb-8">
      <v-col cols="12">
        <v-radio-group
          v-model="localData.attendedFinancialLiteracy"
          label="Has the OFW/family attended financial literacy sessions before?"
          inline
          @update:modelValue="emitUpdate"
        >
          <v-radio label="Yes" value="Yes" />
          <v-radio label="No" value="No" />
        </v-radio-group>
      </v-col>
    </v-row>

    <!-- Willing to receive financial management coaching -->
    <v-row dense>
      <v-col cols="12">
        <v-radio-group
          v-model="localData.wantsFinancialCoaching"
          label="Would the household like to receive financial management coaching?"
          inline
          @update:modelValue="emitUpdate"
        >
          <v-radio label="Yes" value="Yes" />
          <v-radio label="No" value="No" />
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

const savingsOptions = [
  'Bank savings',
  'Cooperative savings',
  'Insurance',
  'Mutual fund/investment',
  'Real property/land',
  'Livestock/Agri assets',
  'None',
  'Other',
]

const localData = ref({
  keepsFamilyBudget: '',
  savingsProducts: [],
  attendedFinancialLiteracy: '',
  wantsFinancialCoaching: '',
  ...props.data,
})

// Two-way sync with SurveyView
watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })
</script>
