<!-- src/components/survey/SectionSocioEconomic.vue -->
<template>
  <div>
    <h2 class="text-h5 font-weight-bold mb-6 text-primary">
      VII. Household Socio-Economic Profile
    </h2>

    <!-- Type of Housing Unit -->
    <div class="mb-8">
      <label class="text-body-1 font-weight-medium mb-3 d-block">Type of Housing Unit</label>
      <v-row dense>
        <v-col cols="12" sm="6" md="3" v-for="option in housingTypes" :key="option">
          <v-checkbox
            v-model="localData.housingUnit"
            :label="option"
            :value="option"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <!-- Type of House Construction -->
    <div class="mb-8">
      <label class="text-body-1 font-weight-medium mb-3 d-block">Type of House Construction</label>
      <v-row dense>
        <v-col cols="12" sm="6" md="3" v-for="option in constructionTypes" :key="option">
          <v-checkbox
            v-model="localData.houseConstruction"
            :label="option"
            :value="option"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <!-- Access to Basic Utilities -->
    <div class="mb-8">
      <label class="text-body-1 font-weight-medium mb-4 d-block">Access to Basic Utilities</label>

      <!-- Electricity -->
      <v-row dense class="mb-4">
        <v-col cols="12">
          <v-radio-group
            v-model="localData.electricity"
            label="Electricity"
            inline
            @update:modelValue="emitUpdate"
          >
            <v-radio label="Yes" value="Yes" />
            <v-radio label="No" value="No" />
          </v-radio-group>
        </v-col>
      </v-row>

      <!-- Water Source -->
      <div class="mb-4">
        <label class="text-body-1 font-weight-medium mb-2 d-block">Water Source</label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="option in waterSources" :key="option">
            <v-checkbox
              v-model="localData.waterSource"
              :label="option"
              :value="option"
              density="compact"
              @update:modelValue="emitUpdate"
            />
          </v-col>
        </v-row>
      </div>

      <!-- Toilet Facility -->
      <div>
        <label class="text-body-1 font-weight-medium mb-2 d-block">Toilet Facility</label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="option in toiletFacilities" :key="option">
            <v-checkbox
              v-model="localData.toiletFacility"
              :label="option"
              :value="option"
              density="compact"
              @update:modelValue="emitUpdate"
            />
          </v-col>
        </v-row>
      </div>
    </div>

    <!-- Primary Source of Household Income -->
    <div class="mb-8">
      <label class="text-body-1 font-weight-medium mb-3 d-block"
        >Primary Source of Household Income</label
      >
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="option in incomeSources" :key="option">
          <v-checkbox
            v-model="localData.primaryIncomeSource"
            :label="option"
            :value="option"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <!-- Average Monthly Household Income -->
    <div class="mb-8">
      <label class="text-body-1 font-weight-medium mb-3 d-block"
        >Average Monthly Household Income (all sources)</label
      >
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="option in incomeBrackets" :key="option">
          <v-checkbox
            v-model="localData.averageMonthlyIncome"
            :label="option"
            :value="option"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <!-- Estimated Monthly OFW Remittance -->
    <div class="mb-8">
      <label class="text-body-1 font-weight-medium mb-3 d-block"
        >Estimated Monthly OFW Remittance</label
      >
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="option in remittanceAmounts" :key="option">
          <v-checkbox
            v-model="localData.monthlyRemittance"
            :label="option"
            :value="option"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <!-- Frequency of Remittance -->
    <div class="mb-8">
      <label class="text-body-1 font-weight-medium mb-3 d-block">Frequency of Remittance</label>
      <v-row dense>
        <v-col cols="12" sm="6" md="3" v-for="option in remittanceFrequency" :key="option">
          <v-checkbox
            v-model="localData.remittanceFrequency"
            :label="option"
            :value="option"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <!-- Main Uses of Remittances -->
    <div class="mb-8">
      <label class="text-body-1 font-weight-medium mb-3 d-block"
        >Main Uses of Remittances (multiple answers allowed)</label
      >
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="option in remittanceUses" :key="option">
          <v-checkbox
            v-model="localData.remittanceUses"
            :label="option"
            :value="option"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <!-- Savings & Debts -->
    <v-row dense>
      <v-col cols="12" md="6">
        <v-radio-group
          v-model="localData.hasSavings"
          label="Does the household have savings?"
          inline
          @update:modelValue="emitUpdate"
        >
          <v-radio label="Yes" value="Yes" />
          <v-radio label="No" value="No" />
        </v-radio-group>
      </v-col>

      <v-col cols="12" md="6">
        <v-radio-group
          v-model="localData.hasDebts"
          label="Does the household have debts/loans?"
          inline
          @update:modelValue="emitUpdate"
        >
          <v-radio label="Yes" value="Yes" />
          <v-radio label="No" value="No" />
        </v-radio-group>
      </v-col>
    </v-row>

    <!-- Debt details (conditional) -->
    <v-row v-if="localData.hasDebts === 'Yes'" dense class="mt-4">
      <v-col cols="12" md="6">
        <label class="text-body-1 font-weight-medium mb-2 d-block"
          >If yes, estimated total debt</label
        >
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="option in debtAmounts" :key="option">
            <v-checkbox
              v-model="localData.totalDebt"
              :label="option"
              :value="option"
              density="compact"
              @update:modelValue="emitUpdate"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="6">
        <label class="text-body-1 font-weight-medium mb-2 d-block">Main reason for debt</label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="reason in debtReasons" :key="reason">
            <v-checkbox
              v-model="localData.debtReason"
              :label="reason"
              :value="reason"
              density="compact"
              @update:modelValue="emitUpdate"
            />
          </v-col>
        </v-row>
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

const housingTypes = ['Owned', 'Rented', 'Rent-free with consent', 'Informal settler / makeshift']
const constructionTypes = ['Concrete', 'Semi-concrete', 'Wood', 'Light materials / makeshift']
const waterSources = [
  'Piped water',
  'Deep well',
  'Shared/community water',
  'River/spring',
  'Purchased water',
]
const toiletFacilities = ['Own sanitary toilet', 'Shared toilet', 'None / open defecation']
const incomeSources = [
  'OFW remittance',
  'Farming/Fishing',
  'Salaried employment',
  'Informal labor',
  'Small business',
  'Pension',
  'Government assistance',
  'None',
  'Other',
]
const incomeBrackets = [
  'Below P5,000',
  'P5,001 – P10,000',
  'P10,001 – P20,000',
  'P20,001 – P30,000',
  'P30,001 – P50,000',
]
const remittanceAmounts = [
  'None',
  'Below P5,000',
  'P5,001 – P10,000',
  'P10,001 – P20,000',
  'P20,001 – P50,000',
  'Above P50,000',
]
const remittanceFrequency = [
  'Weekly',
  'Twice a month',
  'Monthly',
  'Irregular',
  'No remittance currently',
]
const remittanceUses = [
  'Food/basic needs',
  'Education',
  'House construction/repair',
  'Utilities',
  'Medical expenses',
  'Debt repayment',
  'Savings',
  'Business capital',
  'Land/property acquisition',
  'Transportation',
  'Other',
]
const debtAmounts = ['Below P10,000', 'P10,001 – P50,000', 'P50,001 – P100,000', 'Above P100,000']
const debtReasons = [
  'Placement/recruitment costs',
  'Household expenses',
  'Medical expenses',
  'Education',
  'Business losses',
  'Emergency/crisis',
  'Housing',
  'Other',
]

const localData = ref({
  housingUnit: [],
  houseConstruction: [],
  electricity: '',
  waterSource: [],
  toiletFacility: [],
  primaryIncomeSource: [],
  averageMonthlyIncome: [],
  monthlyRemittance: [],
  remittanceFrequency: [],
  remittanceUses: [],
  hasSavings: '',
  hasDebts: '',
  totalDebt: [],
  debtReason: [],
  ...props.data,
})

// Two-way sync with SurveyView
watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })
</script>
