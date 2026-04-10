<template>
  <v-card-text>
    <v-row dense>
      <v-col cols="12">
        <v-label>Immediate assistance needed (check all that apply)</v-label>
        <v-checkbox
          v-for="opt in immediateNeeds"
          :key="opt"
          v-model="data.immediateAssistance"
          :label="opt"
          :value="opt"
        />
      </v-col>
      <v-col cols="12">
        <v-label>Preferred skills training</v-label>
        <v-checkbox
          v-for="opt in skillsTraining"
          :key="opt"
          v-model="data.preferredSkillsTraining"
          :label="opt"
          :value="opt"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="data.preferredEmploymentSector"
          label="Preferred local employment sector"
        />
      </v-col>
      <v-col cols="12">
        <v-label>Willingness to join cooperative/association of OFWs or families</v-label>
        <v-radio-group v-model="data.willingCooperative" inline>
          <v-radio label="Yes" value="Yes" />
          <v-radio label="No" value="No" />
          <v-radio label="Maybe" value="Maybe" />
        </v-radio-group>
      </v-col>
      <v-col cols="12">
        <v-label>Interested in joining OFW Family Circle / support group?</v-label>
        <v-radio-group v-model="data.interestedFamilyCircle" inline>
          <v-radio label="Yes" value="Yes" />
          <v-radio label="No" value="No" />
          <v-radio label="Maybe" value="Maybe" />
        </v-radio-group>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script setup>
defineProps({ data: Object })

const immediateNeeds = [
  'Financial assistance',
  'Emergency assistance',
  'Food / relief support',
  'Medical assistance',
  'Psychosocial counseling',
  'Legal assistance',
  'Documentation / case referral',
  'Livelihood starter kit',
  'Livelihood capital / grant',
  'Skills training / TESDA referral',
  'Job matching / local employment',
  'Scholarship / educational support',
  'Child support services',
  'Shelter / temporary housing',
]

const skillsTraining = [
  'Bread and pastry production',
  'Cookery / food processing',
  'Dressmaking / tailoring',
  'Massage / wellness',
  'Hairdressing / beauty care',
  'Computer / digital literacy',
  'Bookkeeping / entrepreneurship',
  'Driving / automotive',
  'Welding / electrical / plumbing',
  'Agriculture / organic farming',
  'Fisheries / aquaculture',
  'Handicrafts / souvenir making',
  'Online freelancing / e-commerce',
  'Caregiving / health services',
]
</script>
