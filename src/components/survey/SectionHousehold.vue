<!-- src/components/survey/SectionHousehold.vue -->
<template>
  <div>
    <div class="section-body">
      <!-- ── BLOCK: Household Head ── -->
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
          <label class="field-label" style="font-size: 13px; margin-bottom: 0"
            >HOUSEHOLD ROSTER TABLE</label
          >
          <v-btn
            color="#0f2a5e"
            size="small"
            variant="outlined"
            prepend-icon="mdi-plus"
            class="add-btn"
            @click="addRosterRow"
            >Add Member</v-btn
          >
        </div>

        <div class="roster-scroll">
          <table class="roster-table">
            <thead>
              <tr>
                <th style="width: 36px">#</th>
                <th style="min-width: 140px">Name</th>
                <th style="min-width: 100px">Sex</th>
                <th style="min-width: 60px">Age</th>
                <th style="min-width: 120px">Civil Status</th>
                <th style="min-width: 140px">Rel. to OFW</th>
                <th style="min-width: 150px">Education</th>
                <th style="min-width: 140px">Occupation</th>
                <th style="min-width: 110px">Monthly Income</th>
                <th style="min-width: 120px">Remarks</th>
                <th style="width: 40px"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in localData.roster" :key="index">
                <td class="td-num">{{ index + 1 }}</td>
                <td>
                  <input
                    class="cell-input"
                    v-model="row.name"
                    placeholder="Full name"
                    @input="emitUpdate"
                  />
                </td>
                <td>
                  <select class="cell-select" v-model="row.sex" @change="emitUpdate">
                    <option value="">—</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </td>
                <td>
                  <input
                    class="cell-input"
                    type="number"
                    v-model.number="row.age"
                    placeholder="0"
                    @input="emitUpdate"
                  />
                </td>
                <td>
                  <select class="cell-select" v-model="row.civilStatus" @change="emitUpdate">
                    <option value="">—</option>
                    <option v-for="s in civilStatuses" :key="s">{{ s }}</option>
                  </select>
                </td>
                <td>
                  <input
                    class="cell-input"
                    v-model="row.relationshipToOFW"
                    placeholder="e.g. Spouse"
                    @input="emitUpdate"
                  />
                </td>
                <td>
                  <input
                    class="cell-input"
                    v-model="row.educationalAttainment"
                    placeholder="e.g. College"
                    @input="emitUpdate"
                  />
                </td>
                <td>
                  <input
                    class="cell-input"
                    v-model="row.occupation"
                    placeholder="e.g. Farmer"
                    @input="emitUpdate"
                  />
                </td>
                <td>
                  <input
                    class="cell-input"
                    v-model="row.monthlyIncome"
                    placeholder="e.g. 8000"
                    @input="emitUpdate"
                  />
                </td>
                <td>
                  <input
                    class="cell-input"
                    v-model="row.remarks"
                    placeholder="Notes"
                    @input="emitUpdate"
                  />
                </td>
                <td>
                  <button class="del-btn" @click="removeRosterRow(index)" title="Remove">✕</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({ data: { type: Object, default: () => ({}) } })
const emit = defineEmits(['update:data'])

const civilStatuses = ['Single', 'Married', 'Widowed', 'Separated', 'Live-in', 'Other']

const blankRow = () => ({
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

const localData = ref({
  householdHeadName: '',
  relationshipToHead: '',
  totalHouseholdMembers: null,
  totalDependents: null,
  children017: null,
  seniorCitizens: null,
  personsWithDisability: null,
  pregnantLactating: null,
  roster: [blankRow()],
  ...props.data,
})

if (!localData.value.roster || localData.value.roster.length === 0) {
  localData.value.roster = [blankRow()]
}

const addRosterRow = () => {
  localData.value.roster.push(blankRow())
  emitUpdate()
}
const removeRosterRow = (i) => {
  if (localData.value.roster.length > 1) {
    localData.value.roster.splice(i, 1)
    emitUpdate()
  }
}
const emitUpdate = () => emit('update:data', { ...localData.value })
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
.add-btn {
  border-radius: 8px;
  font-weight: 600;
  font-size: 13px;
}

/* ── Roster Table ── */
.roster-scroll {
  overflow-x: auto;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}
.roster-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  background: #fff;
}
.roster-table thead tr {
  background: #f8faff;
}
.roster-table th {
  padding: 10px 8px;
  text-align: left;
  font-size: 10.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6b7fa8;
  white-space: nowrap;
  border-bottom: 2px solid #e2e8f0;
}
.roster-table td {
  padding: 6px 6px;
  vertical-align: middle;
  border-bottom: 1px solid #f3f4f6;
}
.roster-table tbody tr:last-child td {
  border-bottom: none;
}
.roster-table tbody tr:hover {
  background: #f8faff;
}
.td-num {
  font-size: 11px;
  color: #9ca3af;
  font-weight: 600;
  text-align: center;
}

.cell-input {
  width: 100%;
  border: 1px solid transparent;
  border-radius: 6px;
  padding: 5px 7px;
  font-size: 13px;
  color: #111827;
  background: transparent;
  outline: none;
  font-family: inherit;
  box-sizing: border-box;
}
.cell-input:focus {
  border-color: #3b82f6;
  background: #fff;
}
.cell-input::placeholder {
  color: #c4c9d4;
}

.cell-select {
  width: 100%;
  border: 1px solid transparent;
  border-radius: 6px;
  padding: 5px 4px;
  font-size: 13px;
  color: #111827;
  background: transparent;
  outline: none;
  font-family: inherit;
  cursor: pointer;
  box-sizing: border-box;
}
.cell-select:focus {
  border-color: #3b82f6;
  background: #fff;
}

.del-btn {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: #f87171;
  cursor: pointer;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.14s;
}
.del-btn:hover {
  background: #fef2f2;
}

@media (max-width: 480px) {
  .section-body {
    padding: 14px 14px 18px;
  }
}
</style>
