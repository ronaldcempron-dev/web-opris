<!-- src/components/survey/SectionHousehold.vue -->
<template>
  <div>
    <div class="section-body">
      <!-- ── BLOCK: Household Head Information ── -->
      <div class="field-group">
        <v-row dense>
          <v-col cols="12" md="6">
            <div class="field-item">
              <label class="field-label">Name of Household Head</label>
              <v-text-field
                v-model="localData.householdHeadName"
                placeholder="Full name"
                variant="outlined"
                density="comfortable"
                hide-details
                class="modern-input"
                @update:modelValue="emitUpdate"
              />
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <div class="field-item">
              <label class="field-label">Relationship of Respondent to Household Head</label>
              <v-text-field
                v-model="localData.relationshipToHead"
                placeholder="e.g. Spouse, Son, Daughter"
                variant="outlined"
                density="comfortable"
                hide-details
                class="modern-input"
                @update:modelValue="emitUpdate"
              />
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Household Composition ── -->
      <div class="field-group">
        <v-row dense>
          <v-col cols="12" md="3">
            <div class="field-item">
              <label class="field-label">Total Household Members</label>
              <v-text-field
                v-model.number="localData.totalHouseholdMembers"
                type="number"
                placeholder="0"
                variant="outlined"
                density="comfortable"
                hide-details
                class="modern-input"
                @update:modelValue="emitUpdate"
              />
            </div>
          </v-col>

          <v-col cols="12" md="3">
            <div class="field-item">
              <label class="field-label">Total Dependents</label>
              <v-text-field
                v-model.number="localData.totalDependents"
                type="number"
                placeholder="0"
                variant="outlined"
                density="comfortable"
                hide-details
                class="modern-input"
                @update:modelValue="emitUpdate"
              />
            </div>
          </v-col>

          <v-col cols="12" md="3">
            <div class="field-item">
              <label class="field-label">Children (0-17 years old)</label>
              <v-text-field
                v-model.number="localData.children017"
                type="number"
                placeholder="0"
                variant="outlined"
                density="comfortable"
                hide-details
                class="modern-input"
                @update:modelValue="emitUpdate"
              />
            </div>
          </v-col>

          <v-col cols="12" md="3">
            <div class="field-item">
              <label class="field-label">Senior Citizens (60+)</label>
              <v-text-field
                v-model.number="localData.seniorCitizens"
                type="number"
                placeholder="0"
                variant="outlined"
                density="comfortable"
                hide-details
                class="modern-input"
                @update:modelValue="emitUpdate"
              />
            </div>
          </v-col>

          <v-col cols="12" md="4">
            <div class="field-item">
              <label class="field-label">Persons with Disability (PWDs)</label>
              <v-text-field
                v-model.number="localData.personsWithDisability"
                type="number"
                placeholder="0"
                variant="outlined"
                density="comfortable"
                hide-details
                class="modern-input"
                @update:modelValue="emitUpdate"
              />
            </div>
          </v-col>

          <v-col cols="12" md="4">
            <div class="field-item">
              <label class="field-label">Pregnant / Lactating Women</label>
              <v-text-field
                v-model.number="localData.pregnantLactating"
                type="number"
                placeholder="0"
                variant="outlined"
                density="comfortable"
                hide-details
                class="modern-input"
                @update:modelValue="emitUpdate"
              />
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Household Roster ── -->
      <div class="field-group" style="margin-bottom: 0">
        <div class="d-flex align-center justify-space-between mb-4">
          <label class="field-label" style="font-size: 13px; margin-bottom: 0">
            HOUSEHOLD ROSTER TABLE
          </label>
          <v-btn
            color="#0f2a5e"
            size="small"
            variant="outlined"
            prepend-icon="mdi-plus"
            class="add-btn"
            @click="addRosterRow"
          >
            Add Member
          </v-btn>
        </div>

        <div class="modern-table-wrapper">
          <v-simple-table dense class="modern-table">
            <thead>
              <tr>
                <th class="text-left">No.</th>
                <th class="text-left">Name</th>
                <th class="text-left">Sex</th>
                <th class="text-left">Age</th>
                <th class="text-left">Civil Status</th>
                <th class="text-left">Relationship to OFW</th>
                <th class="text-left">Educational Attainment</th>
                <th class="text-left">Occupation / Schooling</th>
                <th class="text-left">Monthly Income</th>
                <th class="text-left">Remarks</th>
                <th style="width: 48px"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in localData.roster" :key="index">
                <td class="text-caption font-weight-medium">{{ index + 1 }}</td>
                <td>
                  <v-text-field
                    v-model="row.name"
                    density="compact"
                    variant="plain"
                    hide-details
                    @input="emitUpdate"
                  />
                </td>
                <td>
                  <v-select
                    v-model="row.sex"
                    :items="['Male', 'Female']"
                    density="compact"
                    variant="plain"
                    hide-details
                    @update:modelValue="emitUpdate"
                  />
                </td>
                <td>
                  <v-text-field
                    v-model.number="row.age"
                    type="number"
                    density="compact"
                    variant="plain"
                    hide-details
                    @input="emitUpdate"
                  />
                </td>
                <td>
                  <v-select
                    v-model="row.civilStatus"
                    :items="civilStatuses"
                    density="compact"
                    variant="plain"
                    hide-details
                    @update:modelValue="emitUpdate"
                  />
                </td>
                <td>
                  <v-text-field
                    v-model="row.relationshipToOFW"
                    density="compact"
                    variant="plain"
                    hide-details
                    @input="emitUpdate"
                  />
                </td>
                <td>
                  <v-text-field
                    v-model="row.educationalAttainment"
                    density="compact"
                    variant="plain"
                    hide-details
                    @input="emitUpdate"
                  />
                </td>
                <td>
                  <v-text-field
                    v-model="row.occupation"
                    density="compact"
                    variant="plain"
                    hide-details
                    @input="emitUpdate"
                  />
                </td>
                <td>
                  <v-text-field
                    v-model="row.monthlyIncome"
                    density="compact"
                    variant="plain"
                    hide-details
                    @input="emitUpdate"
                  />
                </td>
                <td>
                  <v-text-field
                    v-model="row.remarks"
                    density="compact"
                    variant="plain"
                    hide-details
                    @input="emitUpdate"
                  />
                </td>
                <td>
                  <v-btn
                    icon="mdi-delete-outline"
                    size="x-small"
                    variant="plain"
                    color="error"
                    @click="removeRosterRow(index)"
                  />
                </td>
              </tr>
            </tbody>
          </v-simple-table>
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

const civilStatuses = ['Single', 'Married', 'Widowed', 'Separated', 'Live-in', 'Other']

const localData = ref({
  householdHeadName: '',
  relationshipToHead: '',
  totalHouseholdMembers: null,
  totalDependents: null,
  children017: null,
  seniorCitizens: null,
  personsWithDisability: null,
  pregnantLactating: null,
  roster: [
    {
      name: '',
      sex: '',
      age: null,
      civilStatus: '',
      relationshipToOFW: '',
      educationalAttainment: '',
      occupation: '',
      monthlyIncome: '',
      remarks: '',
    },
  ],
  ...props.data,
})

// Ensure roster always has at least one row
if (!localData.value.roster || localData.value.roster.length === 0) {
  localData.value.roster = [
    {
      name: '',
      sex: '',
      age: null,
      civilStatus: '',
      relationshipToOFW: '',
      educationalAttainment: '',
      occupation: '',
      monthlyIncome: '',
      remarks: '',
    },
  ]
}

const addRosterRow = () => {
  localData.value.roster.push({
    name: '',
    sex: '',
    age: null,
    civilStatus: '',
    relationshipToOFW: '',
    educationalAttainment: '',
    occupation: '',
    monthlyIncome: '',
    remarks: '',
  })
  emitUpdate()
}

const removeRosterRow = (index) => {
  if (localData.value.roster.length > 1) {
    localData.value.roster.splice(index, 1)
    emitUpdate()
  }
}

const emitUpdate = () => {
  emit('update:data', { ...localData.value })
}

watch(localData, emitUpdate, { deep: true })
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

/* Modern Input Styling */
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

/* Table Styling */
.modern-table-wrapper {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  background: #ffffff;
}

.modern-table {
  border-radius: 12px;
}

.modern-table :deep(th) {
  background: #f8faff;
  color: #6b7fa8;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 12px 8px !important;
  white-space: nowrap;
}

.modern-table :deep(td) {
  padding: 8px 6px !important;
  vertical-align: middle;
}

.modern-table :deep(tr:hover) {
  background: #f8faff;
}

.add-btn {
  border-radius: 8px;
  font-weight: 600;
  font-size: 13px;
}

/* Mobile */
@media (max-width: 480px) {
  .section-body {
    padding: 14px 14px 18px;
  }
}
</style>
