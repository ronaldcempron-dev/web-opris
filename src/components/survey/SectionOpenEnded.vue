<template>
  <v-card-text>
    <v-row dense>
      <v-col cols="12">
        <v-textarea
          v-model="data.changesFromMigration"
          label="What changes has overseas migration brought to your family?"
          rows="3"
        />
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="data.biggestChallenges"
          label="What are the biggest challenges you face as an OFW/family left behind/returned OFW?"
          rows="3"
        />
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="data.supportNeeded"
          label="What kind of support do you most need from the government or LGU?"
          rows="2"
        />
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="data.futurePlans"
          label="What are your future plans for the family / OFW?"
          rows="2"
        />
      </v-col>
      <v-col cols="12">
        <v-textarea v-model="data.otherComments" label="Other comments or concerns" rows="3" />
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script setup>
defineProps({ data: Object })
</script>
