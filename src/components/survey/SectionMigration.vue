<!-- src/components/survey/SectionMigration.vue -->
<template>
  <div>
    <h2 class="text-h5 font-weight-bold mb-6 text-primary">
      V. Migration History / Employment Abroad
    </h2>

    <!-- Current Status of OFW -->
    <div class="mb-8">
      <label class="text-body-1 font-weight-medium mb-3 d-block">Current Status of OFW</label>
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="option in currentStatusOptions" :key="option">
          <v-checkbox
            v-model="localData.currentStatus"
            :label="option"
            :value="option"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <v-row dense class="mb-6">
      <!-- Country of Destination -->
      <v-col cols="12" md="6">
        <v-text-field
          v-model="localData.countryDestination"
          label="Country of Destination / Last Country of Work"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <!-- City/Area -->
      <v-col cols="12" md="6">
        <v-text-field
          v-model="localData.cityArea"
          label="City/Area of Work Abroad"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <!-- Job Title -->
      <v-col cols="12">
        <v-text-field
          v-model="localData.jobTitle"
          label="Job Title / Occupation Abroad"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>
    </v-row>

    <!-- Industry / Sector -->
    <div class="mb-8">
      <label class="text-body-1 font-weight-medium mb-3 d-block">Industry / Sector</label>
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="sector in industrySectors" :key="sector">
          <v-checkbox
            v-model="localData.industrySector"
            :label="sector"
            :value="sector"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
      <v-text-field
        v-model="localData.otherIndustry"
        label="Other (please specify)"
        variant="outlined"
        density="comfortable"
        class="mt-2"
        @update:modelValue="emitUpdate"
      />
    </div>

    <!-- Deployment Type -->
    <v-row dense class="mb-6">
      <v-col cols="12" md="6">
        <label class="text-body-1 font-weight-medium mb-3 d-block">Type of OFW Deployment</label>
        <v-radio-group v-model="localData.deploymentType" inline @update:modelValue="emitUpdate">
          <v-radio label="Land-based" value="Land-based" />
          <v-radio label="Sea-based" value="Sea-based" />
        </v-radio-group>
      </v-col>

      <!-- Documentation Status -->
      <v-col cols="12" md="6">
        <label class="text-body-1 font-weight-medium mb-3 d-block">Status of Documentation</label>
        <v-radio-group
          v-model="localData.documentationStatus"
          inline
          @update:modelValue="emitUpdate"
        >
          <v-radio label="Documented" value="Documented" />
          <v-radio label="Undocumented / Irregular" value="Undocumented / Irregular" />
          <v-radio label="Unknown" value="Unknown" />
        </v-radio-group>
      </v-col>
    </v-row>

    <!-- Recruitment Channel -->
    <div class="mb-8">
      <label class="text-body-1 font-weight-medium mb-3 d-block">Recruitment Channel</label>
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="channel in recruitmentChannels" :key="channel">
          <v-checkbox
            v-model="localData.recruitmentChannel"
            :label="channel"
            :value="channel"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>

    <!-- Additional fields -->
    <v-row dense>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="localData.recruitmentAgency"
          label="Name of Recruitment Agency / Employer (if any)"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model="localData.firstDeploymentDate"
          label="Date of First Deployment Abroad"
          type="date"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model="localData.latestDeploymentDate"
          label="Date of Latest Deployment / Return"
          type="date"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model.number="localData.yearsWorkedAbroad"
          label="Number of Years Worked Abroad (total)"
          type="number"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model.number="localData.contractsCompleted"
          label="Number of Overseas Contracts Completed"
          type="number"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="localData.averageContractDuration"
          label="Average Contract Duration (months / years)"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emitUpdate"
        />
      </v-col>
    </v-row>

    <!-- Reason for Going Abroad -->
    <div class="mt-10">
      <label class="text-body-1 font-weight-medium mb-3 d-block">Reason for Going Abroad</label>
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="reason in reasonsForGoing" :key="reason">
          <v-checkbox
            v-model="localData.reasonForGoing"
            :label="reason"
            :value="reason"
            density="compact"
            @update:modelValue="emitUpdate"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  data: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['update:data'])

const currentStatusOptions = [
  'Currently working abroad',
  'On vacation in the Philippines',
  'Returned permanently',
  'Recently repatriated',
  'Terminated / contract ended',
  'Distressed / undocumented',
  'Missing / detained',
  'Deceased',
  'Other',
]

const industrySectors = [
  'Domestic Work',
  'Construction',
  'Healthcare',
  'Hospitality / Tourism',
  'Manufacturing',
  'Maritime / Seafaring',
  'Professional / Technical',
  'Agriculture',
  'Retail / Service',
]

const recruitmentChannels = [
  'Licensed Agency',
  'Government-to-Government',
  'Direct Hire',
  'Referral / Relative / Friend',
  'Tourist to Worker',
  'Illegal Recruiter / Unlicensed',
  'Other',
]

const reasonsForGoing = [
  'Better income',
  'Lack of local employment',
  'Family needs',
  'Debt repayment',
  'Education of children',
  'Skills utilization',
  'Other',
]

const localData = ref({
  currentStatus: [],
  countryDestination: '',
  cityArea: '',
  jobTitle: '',
  industrySector: [],
  otherIndustry: '',
  deploymentType: '',
  documentationStatus: '',
  recruitmentChannel: [],
  recruitmentAgency: '',
  firstDeploymentDate: '',
  latestDeploymentDate: '',
  yearsWorkedAbroad: null,
  contractsCompleted: null,
  averageContractDuration: '',
  reasonForGoing: [],
  ...props.data,
})

// Two-way sync with SurveyView
watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })
</script>
