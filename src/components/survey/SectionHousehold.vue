<template>
  <v-card-text>
    <v-row dense>
      <v-col cols="12"
        ><v-text-field v-model="data.headName" label="Name of Household Head"
      /></v-col>
      <v-col cols="12" md="6"
        ><v-text-field
          v-model="data.respondentRelationToHead"
          label="Relationship of Respondent to Household Head"
      /></v-col>
      <v-col cols="12" md="3"
        ><v-text-field
          v-model.number="data.totalMembers"
          label="Total Number of Household Members"
          type="number"
      /></v-col>
      <v-col cols="12" md="3"
        ><v-text-field
          v-model.number="data.totalDependents"
          label="Total Number of Dependents"
          type="number"
      /></v-col>
      <!-- more numeric fields... -->
    </v-row>

    <v-divider class="my-6" />

    <h3 class="mb-2">Household Roster</h3>
    <v-data-table :headers="headers" :items="data.roster" items-key="id" hide-default-footer>
      <template #item.actions="{ item }">
        <v-btn icon size="small" @click="removeRow(item.id)"><v-icon>mdi-delete</v-icon></v-btn>
      </template>
    </v-data-table>

    <v-btn color="primary" variant="outlined" @click="addRow" class="mt-4">
      + Add Household Member
    </v-btn>
  </v-card-text>
</template>

<script setup>
import { nextTick } from 'vue'

defineProps({ data: Object })

const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Sex', key: 'sex' },
  { title: 'Age', key: 'age' },
  { title: 'Civil Status', key: 'civilStatus' },
  { title: 'Relation to OFW', key: 'relationToOFW' },
  { title: 'Education', key: 'education' },
  { title: 'Occupation', key: 'occupation' },
  { title: 'Monthly Income', key: 'monthlyIncome' },
  { title: '', key: 'actions', sortable: false },
]

const addRow = () => {
  const id = Date.now()
  data.roster.push({
    id,
    name: '',
    sex: '',
    age: '',
    civilStatus: '',
    relationToOFW: '',
    education: '',
    occupation: '',
    monthlyIncome: '',
    remarks: '',
  })
}

const removeRow = (id) => {
  data.roster = data.roster.filter((r) => r.id !== id)
}
</script>
