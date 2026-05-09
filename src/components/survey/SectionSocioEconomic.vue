<!-- src/components/survey/SectionSocioEconomic.vue -->
<template>
  <div>
    <div class="section-body">
      <!-- ── BLOCK: Housing Information ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Type of Housing Unit
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="option in housingTypes" :key="option">
            <div
              class="checkbox-card"
              :class="{ 'checkbox-card--selected': localData.housingUnit.includes(option) }"
              @click="toggleHousing(option)"
            >
              <v-checkbox
                v-model="localData.housingUnit"
                :value="option"
                hide-details
                density="compact"
                class="checkbox-inner"
                @click.stop
              >
                <template #label>
                  <span class="checkbox-label">{{ option }}</span>
                </template>
              </v-checkbox>
            </div>
          </v-col>
        </v-row>
      </div>

      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Type of House Construction
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="option in constructionTypes" :key="option">
            <div
              class="checkbox-card"
              :class="{ 'checkbox-card--selected': localData.houseConstruction.includes(option) }"
              @click="toggleConstruction(option)"
            >
              <v-checkbox
                v-model="localData.houseConstruction"
                :value="option"
                hide-details
                density="compact"
                class="checkbox-inner"
                @click.stop
              >
                <template #label>
                  <span class="checkbox-label">{{ option }}</span>
                </template>
              </v-checkbox>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Access to Basic Utilities ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 12px">
          Access to Basic Utilities
        </label>

        <!-- Electricity -->
        <div class="field-item" style="margin-bottom: 16px">
          <label class="field-label">Electricity</label>
          <v-row dense>
            <v-col cols="6" md="3" v-for="opt in ['Yes', 'No']" :key="opt">
              <div
                class="radio-card"
                :class="{ 'radio-card--selected': localData.electricity === opt }"
                @click="selectElectricity(opt)"
              >
                <div class="radio-card-inner">
                  <div
                    class="radio-dot"
                    :class="{ 'radio-dot--selected': localData.electricity === opt }"
                  />
                  <span class="radio-label-text">{{ opt }}</span>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>

        <!-- Water Source -->
        <div class="mb-5">
          <label class="field-label" style="display: block; margin-bottom: 10px"
            >Water Source</label
          >
          <v-row dense>
            <v-col cols="12" sm="6" md="4" v-for="option in waterSources" :key="option">
              <div
                class="checkbox-card"
                :class="{ 'checkbox-card--selected': localData.waterSource.includes(option) }"
                @click="toggleWater(option)"
              >
                <v-checkbox
                  v-model="localData.waterSource"
                  :value="option"
                  hide-details
                  density="compact"
                  class="checkbox-inner"
                  @click.stop
                >
                  <template #label>
                    <span class="checkbox-label">{{ option }}</span>
                  </template>
                </v-checkbox>
              </div>
            </v-col>
          </v-row>
        </div>

        <!-- Toilet Facility -->
        <div>
          <label class="field-label" style="display: block; margin-bottom: 10px"
            >Toilet Facility</label
          >
          <v-row dense>
            <v-col cols="12" sm="6" md="4" v-for="option in toiletFacilities" :key="option">
              <div
                class="checkbox-card"
                :class="{ 'checkbox-card--selected': localData.toiletFacility.includes(option) }"
                @click="toggleToilet(option)"
              >
                <v-checkbox
                  v-model="localData.toiletFacility"
                  :value="option"
                  hide-details
                  density="compact"
                  class="checkbox-inner"
                  @click.stop
                >
                  <template #label>
                    <span class="checkbox-label">{{ option }}</span>
                  </template>
                </v-checkbox>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>

      <!-- ── BLOCK: Income & Remittance ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Primary Source of Household Income
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="option in incomeSources" :key="option">
            <div
              class="checkbox-card"
              :class="{ 'checkbox-card--selected': localData.primaryIncomeSource.includes(option) }"
              @click="toggleIncomeSource(option)"
            >
              <v-checkbox
                v-model="localData.primaryIncomeSource"
                :value="option"
                hide-details
                density="compact"
                class="checkbox-inner"
                @click.stop
              >
                <template #label>
                  <span class="checkbox-label">{{ option }}</span>
                </template>
              </v-checkbox>
            </div>
          </v-col>
        </v-row>
      </div>

      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Average Monthly Household Income (All Sources)
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="option in incomeBrackets" :key="option">
            <div
              class="checkbox-card"
              :class="{
                'checkbox-card--selected': localData.averageMonthlyIncome.includes(option),
              }"
              @click="toggleMonthlyIncome(option)"
            >
              <v-checkbox
                v-model="localData.averageMonthlyIncome"
                :value="option"
                hide-details
                density="compact"
                class="checkbox-inner"
                @click.stop
              >
                <template #label>
                  <span class="checkbox-label">{{ option }}</span>
                </template>
              </v-checkbox>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- Remittance -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Estimated Monthly OFW Remittance
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="option in remittanceAmounts" :key="option">
            <div
              class="checkbox-card"
              :class="{ 'checkbox-card--selected': localData.monthlyRemittance.includes(option) }"
              @click="toggleRemittanceAmount(option)"
            >
              <v-checkbox
                v-model="localData.monthlyRemittance"
                :value="option"
                hide-details
                density="compact"
                class="checkbox-inner"
                @click.stop
              >
                <template #label>
                  <span class="checkbox-label">{{ option }}</span>
                </template>
              </v-checkbox>
            </div>
          </v-col>
        </v-row>
      </div>

      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Frequency of Remittance
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="option in remittanceFrequency" :key="option">
            <div
              class="checkbox-card"
              :class="{ 'checkbox-card--selected': localData.remittanceFrequency.includes(option) }"
              @click="toggleFrequency(option)"
            >
              <v-checkbox
                v-model="localData.remittanceFrequency"
                :value="option"
                hide-details
                density="compact"
                class="checkbox-inner"
                @click.stop
              >
                <template #label>
                  <span class="checkbox-label">{{ option }}</span>
                </template>
              </v-checkbox>
            </div>
          </v-col>
        </v-row>
      </div>

      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Main Uses of Remittances
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="option in remittanceUses" :key="option">
            <div
              class="checkbox-card"
              :class="{ 'checkbox-card--selected': localData.remittanceUses.includes(option) }"
              @click="toggleRemittanceUse(option)"
            >
              <v-checkbox
                v-model="localData.remittanceUses"
                :value="option"
                hide-details
                density="compact"
                class="checkbox-inner"
                @click.stop
              >
                <template #label>
                  <span class="checkbox-label">{{ option }}</span>
                </template>
              </v-checkbox>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Savings & Debts ── -->
      <div class="field-group" style="margin-bottom: 0">
        <v-row dense>
          <v-col cols="12" md="6">
            <div class="field-item">
              <label class="field-label" style="margin-bottom: 10px; display: block">
                Does the household have savings?
              </label>
              <v-row dense>
                <v-col cols="6" v-for="opt in ['Yes', 'No']" :key="opt">
                  <div
                    class="radio-card"
                    :class="{ 'radio-card--selected': localData.hasSavings === opt }"
                    @click="selectSavings(opt)"
                  >
                    <div class="radio-card-inner">
                      <div
                        class="radio-dot"
                        :class="{ 'radio-dot--selected': localData.hasSavings === opt }"
                      />
                      <span class="radio-label-text">{{ opt }}</span>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <div class="field-item">
              <label class="field-label" style="margin-bottom: 10px; display: block">
                Does the household have debts/loans?
              </label>
              <v-row dense>
                <v-col cols="6" v-for="opt in ['Yes', 'No']" :key="opt">
                  <div
                    class="radio-card"
                    :class="{ 'radio-card--selected': localData.hasDebts === opt }"
                    @click="selectDebts(opt)"
                  >
                    <div class="radio-card-inner">
                      <div
                        class="radio-dot"
                        :class="{ 'radio-dot--selected': localData.hasDebts === opt }"
                      />
                      <span class="radio-label-text">{{ opt }}</span>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>

        <!-- Debt Details (Conditional) -->
        <div v-if="localData.hasDebts === 'Yes'" class="mt-6">
          <v-row dense>
            <v-col cols="12" md="6">
              <label class="field-label" style="display: block; margin-bottom: 10px">
                Estimated Total Debt
              </label>
              <v-row dense>
                <v-col cols="12" sm="6" md="6" v-for="option in debtAmounts" :key="option">
                  <div
                    class="checkbox-card"
                    :class="{ 'checkbox-card--selected': localData.totalDebt.includes(option) }"
                    @click="toggleDebtAmount(option)"
                  >
                    <v-checkbox
                      v-model="localData.totalDebt"
                      :value="option"
                      hide-details
                      density="compact"
                      class="checkbox-inner"
                      @click.stop
                    >
                      <template #label>
                        <span class="checkbox-label">{{ option }}</span>
                      </template>
                    </v-checkbox>
                  </div>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" md="6">
              <label class="field-label" style="display: block; margin-bottom: 10px">
                Main Reason for Debt
              </label>
              <v-row dense>
                <v-col cols="12" sm="6" md="6" v-for="reason in debtReasons" :key="reason">
                  <div
                    class="checkbox-card"
                    :class="{ 'checkbox-card--selected': localData.debtReason.includes(reason) }"
                    @click="toggleDebtReason(reason)"
                  >
                    <v-checkbox
                      v-model="localData.debtReason"
                      :value="reason"
                      hide-details
                      density="compact"
                      class="checkbox-inner"
                      @click.stop
                    >
                      <template #label>
                        <span class="checkbox-label">{{ reason }}</span>
                      </template>
                    </v-checkbox>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
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

watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })

// Toggle & Select Helpers
const toggleHousing = (opt) => {
  toggleArray('housingUnit', opt)
}
const toggleConstruction = (opt) => {
  toggleArray('houseConstruction', opt)
}
const toggleWater = (opt) => {
  toggleArray('waterSource', opt)
}
const toggleToilet = (opt) => {
  toggleArray('toiletFacility', opt)
}
const toggleIncomeSource = (opt) => {
  toggleArray('primaryIncomeSource', opt)
}
const toggleMonthlyIncome = (opt) => {
  toggleArray('averageMonthlyIncome', opt)
}
const toggleRemittanceAmount = (opt) => {
  toggleArray('monthlyRemittance', opt)
}
const toggleFrequency = (opt) => {
  toggleArray('remittanceFrequency', opt)
}
const toggleRemittanceUse = (opt) => {
  toggleArray('remittanceUses', opt)
}
const toggleDebtAmount = (opt) => {
  toggleArray('totalDebt', opt)
}
const toggleDebtReason = (opt) => {
  toggleArray('debtReason', opt)
}

const toggleArray = (key, value) => {
  const idx = localData.value[key].indexOf(value)
  if (idx === -1) localData.value[key].push(value)
  else localData.value[key].splice(idx, 1)
  emitUpdate()
}

const selectElectricity = (val) => {
  localData.value.electricity = val
  emitUpdate()
}
const selectSavings = (val) => {
  localData.value.hasSavings = val
  emitUpdate()
}
const selectDebts = (val) => {
  localData.value.hasDebts = val
  emitUpdate()
}
</script>

<style scoped>
/* Reusing consistent styles */
.section-body {
  padding: 10px 24px 24px;
}
.field-group {
  margin-bottom: 14px;
}
.field-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: 100%;
}

.field-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6b7fa8;
  line-height: 1.4;
}

.modern-input :deep(.v-field) {
  border-radius: 10px;
  background: #f8faff;
  border-color: #e2e8f0;
  font-size: 13.5px;
  color: #111827;
}

.modern-input :deep(.v-field--focused) {
  border-color: #3b82f6;
  background: #ffffff;
}

/* Radio & Checkbox Cards */
.radio-card,
.checkbox-card {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 10px 14px;
  margin-bottom: 6px;
  cursor: pointer;
  transition:
    border-color 0.14s,
    background 0.14s;
  background: #ffffff;
}

.radio-card:hover,
.checkbox-card:hover {
  border-color: #93c5fd;
  background: #f8faff;
}

.radio-card--selected,
.checkbox-card--selected {
  border-color: #3b82f6;
  background: #eff6ff;
}

.radio-card-inner {
  display: flex;
  align-items: center;
  gap: 10px;
}

.radio-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #d1d5db;
  flex-shrink: 0;
  background: #ffffff;
}

.radio-dot--selected {
  border-color: #3b82f6;
  background: #3b82f6;
  box-shadow: inset 0 0 0 2px #ffffff;
}

.radio-label-text,
.checkbox-label {
  font-size: 13px;
  color: #111827;
}

.radio-card--selected .radio-label-text,
.checkbox-card--selected .checkbox-label {
  color: #1d4ed8;
  font-weight: 600;
}

/* Mobile */
@media (max-width: 480px) {
  .section-body {
    padding: 14px 14px 18px;
  }
}
</style>
