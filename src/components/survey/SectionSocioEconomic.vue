<!-- src/components/survey/SectionSocioEconomic.vue -->
<template>
  <div>
    <div class="section-body">
      <!-- ── Housing Type (single) ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Type of Housing Unit
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="option in housingTypes" :key="option">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.housingUnit === option }"
              @click="selectHousingUnit(option)"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.housingUnit === option }"
                />
                <span class="radio-label-text">{{ option }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── House Construction (multi) ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Type of House Construction
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="option in constructionTypes" :key="option">
            <div
              class="checkbox-card"
              :class="{ 'checkbox-card--selected': localData.houseConstruction.includes(option) }"
              @click="toggleArray('houseConstruction', option)"
            >
              <div class="check-card-inner">
                <div
                  class="check-box"
                  :class="{ 'check-box--selected': localData.houseConstruction.includes(option) }"
                >
                  <v-icon
                    v-if="localData.houseConstruction.includes(option)"
                    size="11"
                    color="white"
                    >mdi-check</v-icon
                  >
                </div>
                <span class="checkbox-label">{{ option }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── Basic Utilities ── -->
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
          <label class="field-label" style="display: block; margin-bottom: 10px">
            Water Source
          </label>
          <v-row dense>
            <v-col cols="12" sm="6" md="4" v-for="option in waterSources" :key="option">
              <div
                class="checkbox-card"
                :class="{ 'checkbox-card--selected': localData.waterSource.includes(option) }"
                @click="toggleArray('waterSource', option)"
              >
                <div class="check-card-inner">
                  <div
                    class="check-box"
                    :class="{ 'check-box--selected': localData.waterSource.includes(option) }"
                  >
                    <v-icon v-if="localData.waterSource.includes(option)" size="11" color="white"
                      >mdi-check</v-icon
                    >
                  </div>
                  <span class="checkbox-label">{{ option }}</span>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>

        <!-- Toilet Facility -->
        <div>
          <label class="field-label" style="display: block; margin-bottom: 10px">
            Toilet Facility
          </label>
          <v-row dense>
            <v-col cols="12" sm="6" md="4" v-for="option in toiletFacilities" :key="option">
              <div
                class="checkbox-card"
                :class="{ 'checkbox-card--selected': localData.toiletFacility.includes(option) }"
                @click="toggleArray('toiletFacility', option)"
              >
                <div class="check-card-inner">
                  <div
                    class="check-box"
                    :class="{ 'check-box--selected': localData.toiletFacility.includes(option) }"
                  >
                    <v-icon v-if="localData.toiletFacility.includes(option)" size="11" color="white"
                      >mdi-check</v-icon
                    >
                  </div>
                  <span class="checkbox-label">{{ option }}</span>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>

      <!-- ── Primary Income Source (multi) ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Primary Source of Household Income
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="option in incomeSources" :key="option">
            <div
              class="checkbox-card"
              :class="{
                'checkbox-card--selected': localData.primaryIncomeSource.includes(option),
              }"
              @click="toggleArray('primaryIncomeSource', option)"
            >
              <div class="check-card-inner">
                <div
                  class="check-box"
                  :class="{
                    'check-box--selected': localData.primaryIncomeSource.includes(option),
                  }"
                >
                  <v-icon
                    v-if="localData.primaryIncomeSource.includes(option)"
                    size="11"
                    color="white"
                    >mdi-check</v-icon
                  >
                </div>
                <span class="checkbox-label">{{ option }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── Average Monthly Income (single) ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Average Monthly Household Income (All Sources)
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="option in incomeBrackets" :key="option">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.averageMonthlyIncome === option }"
              @click="selectMonthlyIncome(option)"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.averageMonthlyIncome === option }"
                />
                <span class="radio-label-text">{{ option }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── Remittance Amount (multi) ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Estimated Monthly OFW Remittance
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="option in remittanceAmounts" :key="option">
            <div
              class="checkbox-card"
              :class="{ 'checkbox-card--selected': localData.monthlyRemittance.includes(option) }"
              @click="toggleArray('monthlyRemittance', option)"
            >
              <div class="check-card-inner">
                <div
                  class="check-box"
                  :class="{
                    'check-box--selected': localData.monthlyRemittance.includes(option),
                  }"
                >
                  <v-icon
                    v-if="localData.monthlyRemittance.includes(option)"
                    size="11"
                    color="white"
                    >mdi-check</v-icon
                  >
                </div>
                <span class="checkbox-label">{{ option }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── Remittance Frequency (multi) ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Frequency of Remittance
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="option in remittanceFrequencies" :key="option">
            <div
              class="checkbox-card"
              :class="{
                'checkbox-card--selected': localData.remittanceFrequency.includes(option),
              }"
              @click="toggleArray('remittanceFrequency', option)"
            >
              <div class="check-card-inner">
                <div
                  class="check-box"
                  :class="{
                    'check-box--selected': localData.remittanceFrequency.includes(option),
                  }"
                >
                  <v-icon
                    v-if="localData.remittanceFrequency.includes(option)"
                    size="11"
                    color="white"
                    >mdi-check</v-icon
                  >
                </div>
                <span class="checkbox-label">{{ option }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── Remittance Uses (multi) ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Main Uses of Remittances
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="option in remittanceUses" :key="option">
            <div
              class="checkbox-card"
              :class="{ 'checkbox-card--selected': localData.remittanceUses.includes(option) }"
              @click="toggleArray('remittanceUses', option)"
            >
              <div class="check-card-inner">
                <div
                  class="check-box"
                  :class="{ 'check-box--selected': localData.remittanceUses.includes(option) }"
                >
                  <v-icon v-if="localData.remittanceUses.includes(option)" size="11" color="white"
                    >mdi-check</v-icon
                  >
                </div>
                <span class="checkbox-label">{{ option }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── Savings & Debts ── -->
      <div class="field-group" style="margin-bottom: 0">
        <v-row dense>
          <!-- Has Savings -->
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

          <!-- Has Debts -->
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

        <!-- Debt Details (conditional) -->
        <div v-if="localData.hasDebts === 'Yes'" class="mt-6">
          <v-row dense>
            <v-col cols="12" md="6">
              <label class="field-label" style="display: block; margin-bottom: 10px">
                Estimated Total Debt
              </label>
              <v-row dense>
                <v-col cols="12" sm="6" v-for="option in debtAmounts" :key="option">
                  <div
                    class="checkbox-card"
                    :class="{
                      'checkbox-card--selected': localData.totalDebt.includes(option),
                    }"
                    @click="toggleArray('totalDebt', option)"
                  >
                    <div class="check-card-inner">
                      <div
                        class="check-box"
                        :class="{
                          'check-box--selected': localData.totalDebt.includes(option),
                        }"
                      >
                        <v-icon v-if="localData.totalDebt.includes(option)" size="11" color="white"
                          >mdi-check</v-icon
                        >
                      </div>
                      <span class="checkbox-label">{{ option }}</span>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" md="6">
              <label class="field-label" style="display: block; margin-bottom: 10px">
                Main Reason for Debt
              </label>
              <v-row dense>
                <v-col cols="12" sm="6" v-for="reason in debtReasons" :key="reason">
                  <div
                    class="checkbox-card"
                    :class="{
                      'checkbox-card--selected': localData.debtReason.includes(reason),
                    }"
                    @click="toggleArray('debtReason', reason)"
                  >
                    <div class="check-card-inner">
                      <div
                        class="check-box"
                        :class="{
                          'check-box--selected': localData.debtReason.includes(reason),
                        }"
                      >
                        <v-icon v-if="localData.debtReason.includes(reason)" size="11" color="white"
                          >mdi-check</v-icon
                        >
                      </div>
                      <span class="checkbox-label">{{ reason }}</span>
                    </div>
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

const props = defineProps({ data: { type: Object, default: () => ({}) } })
const emit = defineEmits(['update:data'])

// ── Options ──────────────────────────────────────────
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
const remittanceFrequencies = [
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

// ── Safety helper: always returns an array ────────────
const toArray = (val) => {
  if (Array.isArray(val)) return val
  if (!val || val === '' || val === false) return []
  return [val]
}

// ── Safety helper: boolean/false → empty string ───────
const toBoolString = (val) => {
  if (val === false || val === null || val === undefined) return ''
  return val
}

// ── Local state (safe initialization) ────────────────
const localData = ref({
  housingUnit: toBoolString(props.data?.housingUnit ?? props.data?.housingType),
  houseConstruction: toArray(props.data?.houseConstruction),
  electricity: toBoolString(props.data?.electricity),
  waterSource: toArray(props.data?.waterSource),
  toiletFacility: toArray(props.data?.toiletFacility),
  primaryIncomeSource: toArray(props.data?.primaryIncomeSource),
  averageMonthlyIncome: toBoolString(
    props.data?.averageMonthlyIncome ?? props.data?.avgMonthlyIncome,
  ),
  monthlyRemittance: toArray(props.data?.monthlyRemittance),
  remittanceFrequency: toArray(props.data?.remittanceFrequency),
  remittanceUses: toArray(props.data?.remittanceUses),
  hasSavings: toBoolString(props.data?.hasSavings),
  hasDebts: toBoolString(props.data?.hasDebts),
  totalDebt: toArray(props.data?.totalDebt),
  debtReason: toArray(props.data?.debtReason),
})

watch(localData, (v) => emit('update:data', { ...v }), { deep: true })
const emitUpdate = () => emit('update:data', { ...localData.value })

// ── Toggle array fields ───────────────────────────────
const toggleArray = (key, value) => {
  const arr = localData.value[key]
  const idx = arr.indexOf(value)
  if (idx === -1) arr.push(value)
  else arr.splice(idx, 1)
  emitUpdate()
}

// ── Single-select handlers ────────────────────────────
const selectHousingUnit = (val) => {
  localData.value.housingUnit = val
  emitUpdate()
}
const selectElectricity = (val) => {
  localData.value.electricity = val
  emitUpdate()
}
const selectMonthlyIncome = (val) => {
  localData.value.averageMonthlyIncome = val
  emitUpdate()
}
const selectSavings = (val) => {
  localData.value.hasSavings = val
  emitUpdate()
}
const selectDebts = (val) => {
  localData.value.hasDebts = val
  if (val === 'No') {
    localData.value.totalDebt = []
    localData.value.debtReason = []
  }
  emitUpdate()
}
</script>

<style scoped>
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
  user-select: none;
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
.radio-card-inner,
.check-card-inner {
  display: flex;
  align-items: center;
  gap: 10px;
  pointer-events: none;
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
.check-box {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 2px solid #d1d5db;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.14s;
}
.check-box--selected {
  border-color: #3b82f6;
  background: #3b82f6;
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
@media (max-width: 480px) {
  .section-body {
    padding: 14px 14px 18px;
  }
}
</style>
