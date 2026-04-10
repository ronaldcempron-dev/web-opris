<template>
  <v-card-text>
    <v-row dense>
      <v-col cols="12" md="6"
        ><v-select
          v-model="data.housingType"
          label="Type of Housing Unit"
          :items="['Owned', 'Rented', 'Rent-free with consent', 'Informal settler / makeshift']"
      /></v-col>
      <v-col cols="12" md="6"
        ><v-select
          v-model="data.houseConstruction"
          label="Type of House Construction"
          :items="['Concrete', 'Semi-concrete', 'Wood', 'Light materials / makeshift']"
      /></v-col>
      <v-col cols="12">
        <v-switch v-model="data.electricity" label="Electricity" />
      </v-col>
      <v-col cols="12"
        ><v-select
          v-model="data.waterSource"
          label="Water Source"
          :items="[
            'Piped water',
            'Deep well',
            'Shared/community water',
            'River/spring',
            'Purchased water',
          ]"
      /></v-col>
      <v-col cols="12"
        ><v-select
          v-model="data.toiletFacility"
          label="Toilet Facility"
          :items="['Own sanitary toilet', 'Shared toilet', 'None / open defecation']"
      /></v-col>
      <v-col cols="12"
        ><v-select
          v-model="data.primaryIncomeSource"
          label="Primary Source of Household Income"
          :items="[
            'OFW remittance',
            'Farming/Fishing',
            'Salaried employment',
            'Informal labor',
            'Small business',
            'Pension',
            'Government assistance',
            'None',
            'Other',
          ]"
      /></v-col>
      <v-col cols="12"
        ><v-select
          v-model="data.avgMonthlyIncome"
          label="Average Monthly Household Income"
          :items="[
            'Below P5,000',
            'P5,001 – P10,000',
            'P10,001 – P20,000',
            'P20,001 – P30,000',
            'P30,001 – P50,000',
            'Above P50,000',
          ]"
      /></v-col>
      <v-col cols="12"
        ><v-select
          v-model="data.monthlyRemittance"
          label="Estimated Monthly OFW Remittance"
          :items="[
            'None',
            'Below P5,000',
            'P5,001 – P10,000',
            'P10,001 – P20,000',
            'P20,001 – P50,000',
            'Above P50,000',
          ]"
      /></v-col>
      <v-col cols="12">
        <v-label>Main Uses of Remittances</v-label>
        <v-checkbox
          v-for="opt in remittanceUses"
          :key="opt"
          v-model="data.remittanceUses"
          :label="opt"
          :value="opt"
        />
      </v-col>
      <v-col cols="12" md="6"
        ><v-switch v-model="data.hasSavings" label="Does the household have savings?"
      /></v-col>
      <v-col cols="12" md="6"
        ><v-switch v-model="data.hasDebts" label="Does the household have debts/loans?"
      /></v-col>
    </v-row>
  </v-card-text>
</template>
<script setup>
defineProps({ data: Object })
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
</script>
