<!-- src/components/survey/SectionFinancial.vue -->
<template>
  <div>
    <div class="section-body">
      <!-- ── BLOCK: Family Budget ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Does the household keep a family budget?
        </label>
        <v-row dense>
          <v-col cols="6" md="3">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.keepsFamilyBudget === 'Yes' }"
              @click="selectBudget('Yes')"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.keepsFamilyBudget === 'Yes' }"
                />
                <span class="radio-label-text">Yes</span>
              </div>
            </div>
          </v-col>
          <v-col cols="6" md="3">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.keepsFamilyBudget === 'No' }"
              @click="selectBudget('No')"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.keepsFamilyBudget === 'No' }"
                />
                <span class="radio-label-text">No</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Savings & Investment Products ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Does the OFW/family have any savings/investment product?
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="item in savingsOptions" :key="item">
            <div
              class="checkbox-card"
              :class="{ 'checkbox-card--selected': localData.savingsProducts.includes(item) }"
              @click="toggleSavingsProduct(item)"
            >
              <v-checkbox
                v-model="localData.savingsProducts"
                :value="item"
                hide-details
                density="compact"
                class="checkbox-inner"
                @click.stop
              >
                <template #label>
                  <span class="checkbox-label">{{ item }}</span>
                </template>
              </v-checkbox>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Financial Literacy Attendance ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Has the OFW/family attended financial literacy sessions before?
        </label>
        <v-row dense>
          <v-col cols="6" md="3">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.attendedFinancialLiteracy === 'Yes' }"
              @click="selectFinancialLiteracy('Yes')"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.attendedFinancialLiteracy === 'Yes' }"
                />
                <span class="radio-label-text">Yes</span>
              </div>
            </div>
          </v-col>
          <v-col cols="6" md="3">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.attendedFinancialLiteracy === 'No' }"
              @click="selectFinancialLiteracy('No')"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.attendedFinancialLiteracy === 'No' }"
                />
                <span class="radio-label-text">No</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Financial Coaching ── -->
      <div class="field-group" style="margin-bottom: 0">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Would the household like to receive financial management coaching?
        </label>
        <v-row dense>
          <v-col cols="6" md="3">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.wantsFinancialCoaching === 'Yes' }"
              @click="selectFinancialCoaching('Yes')"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.wantsFinancialCoaching === 'Yes' }"
                />
                <span class="radio-label-text">Yes</span>
              </div>
            </div>
          </v-col>
          <v-col cols="6" md="3">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.wantsFinancialCoaching === 'No' }"
              @click="selectFinancialCoaching('No')"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.wantsFinancialCoaching === 'No' }"
                />
                <span class="radio-label-text">No</span>
              </div>
            </div>
          </v-col>
        </v-row>
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

watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })

// Selection handlers
const selectBudget = (val) => {
  localData.value.keepsFamilyBudget = val
  emitUpdate()
}

const toggleSavingsProduct = (item) => {
  const idx = localData.value.savingsProducts.indexOf(item)
  if (idx === -1) localData.value.savingsProducts.push(item)
  else localData.value.savingsProducts.splice(idx, 1)
  emitUpdate()
}

const selectFinancialLiteracy = (val) => {
  localData.value.attendedFinancialLiteracy = val
  emitUpdate()
}

const selectFinancialCoaching = (val) => {
  localData.value.wantsFinancialCoaching = val
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
