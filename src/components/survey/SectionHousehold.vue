<!-- src/components/survey/SectionHousehold.vue -->
<template>
  <div>
    <h2 class="text-h5 font-weight-bold mb-6 text-primary">III. Household Demographic Profile</h2>

    <v-row dense>
      <!-- Name of Household Head -->
      <v-col cols="12" md="6">
        <v-text-field
          v-model="localData.householdHeadName"
          label="Name of Household Head"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <!-- Relationship of Respondent to Household Head -->
      <v-col cols="12" md="6">
        <v-text-field
          v-model="localData.relationshipToHead"
          label="Relationship of Respondent to Household Head"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <!-- Total Numbers -->
      <v-col cols="12" md="3">
        <v-text-field
          v-model.number="localData.totalHouseholdMembers"
          label="Total Number of Household Members"
          type="number"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model.number="localData.totalDependents"
          label="Total Number of Dependents"
          type="number"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model.number="localData.children017"
          label="Number of Children (0-17 years old)"
          type="number"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model.number="localData.seniorCitizens"
          label="Number of Senior Citizens (60+)"
          type="number"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field
          v-model.number="localData.personsWithDisability"
          label="Number of Persons with Disability (PWDs)"
          type="number"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field
          v-model.number="localData.pregnantLactating"
          label="Number of Pregnant/Lactating Women"
          type="number"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>
    </v-row>

    <!-- HOUSEHOLD ROSTER TABLE -->
    <div class="mt-10">
      <div class="d-flex align-center justify-space-between mb-4">
        <label class="text-body-1 font-weight-medium">Household Roster Table</label>
        <v-btn
          color="primary"
          size="small"
          variant="outlined"
          prepend-icon="mdi-plus"
          @click="addRosterRow"
        >
          Add Member
        </v-btn>
      </div>

      <v-simple-table dense class="border rounded-xl">
        <thead>
          <tr>
            <th class="text-left">No.</th>
            <th class="text-left">Name</th>
            <th class="text-left">Sex</th>
            <th class="text-left">Age</th>
            <th class="text-left">Civil Status</th>
            <th class="text-left">Relationship to OFW</th>
            <th class="text-left">Educational Attainment</th>
            <th class="text-left">Occupation/Schooling</th>
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

// Two-way binding
watch(
  localData,
  (newVal) => {
    emit('update:data', { ...newVal })
  },
  { deep: true },
)

const emitUpdate = () => {
  emit('update:data', { ...localData.value })
}
</script>
