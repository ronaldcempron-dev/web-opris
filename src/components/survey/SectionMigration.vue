<!-- src/components/survey/SectionMigration.vue -->
<template>
  <div>
    <div class="section-body">
      <!-- ── BLOCK: Current Status of OFW ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Current Status of OFW
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="option in currentStatusOptions" :key="option">
            <div
              class="checkbox-card"
              :class="{ 'checkbox-card--selected': localData.currentStatus.includes(option) }"
              @click="toggleCurrentStatus(option)"
            >
              <v-checkbox
                v-model="localData.currentStatus"
                :value="option"
                hide-details
                density="compact"
                class="checkbox-inner"
                @click.stop
              >
                <template #label>
                  <span class="checkbox-label">{{ option }}</span>
                </template>
              </v-checkbox>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Destination & Job ── -->
      <div class="field-group">
        <v-row dense>
          <v-col cols="12" md="6">
            <div class="field-item">
              <label class="field-label">Country of Destination / Last Country of Work</label>
              <v-text-field
                v-model="localData.countryDestination"
                placeholder="e.g. Saudi Arabia, Singapore, UAE"
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
              <label class="field-label">City / Area of Work Abroad</label>
              <v-text-field
                v-model="localData.cityArea"
                placeholder="e.g. Riyadh, Dubai, Singapore City"
                variant="outlined"
                density="comfortable"
                hide-details
                class="modern-input"
                @update:modelValue="emitUpdate"
              />
            </div>
          </v-col>

          <v-col cols="12">
            <div class="field-item">
              <label class="field-label">Job Title / Occupation Abroad</label>
              <v-text-field
                v-model="localData.jobTitle"
                placeholder="e.g. Domestic Helper, Construction Worker, Nurse"
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

      <!-- ── BLOCK: Industry / Sector ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Industry / Sector
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="sector in industrySectors" :key="sector">
            <div
              class="checkbox-card"
              :class="{ 'checkbox-card--selected': localData.industrySector.includes(sector) }"
              @click="toggleIndustry(sector)"
            >
              <v-checkbox
                v-model="localData.industrySector"
                :value="sector"
                hide-details
                density="compact"
                class="checkbox-inner"
                @click.stop
              >
                <template #label>
                  <span class="checkbox-label">{{ sector }}</span>
                </template>
              </v-checkbox>
            </div>
          </v-col>
        </v-row>

        <div class="field-item mt-4">
          <label class="field-label">Other Industry (please specify)</label>
          <v-text-field
            v-model="localData.otherIndustry"
            placeholder="Please specify if other"
            variant="outlined"
            density="comfortable"
            hide-details
            class="modern-input"
            @update:modelValue="emitUpdate"
          />
        </div>
      </div>

      <!-- ── BLOCK: Deployment Details ── -->
      <div class="field-group">
        <v-row dense>
          <!-- Deployment Type -->
          <v-col cols="12" md="6">
            <div class="field-item">
              <label class="field-label" style="margin-bottom: 10px; display: block">
                Type of OFW Deployment
              </label>
              <v-row dense>
                <v-col cols="6" v-for="type in ['Land-based', 'Sea-based']" :key="type">
                  <div
                    class="radio-card"
                    :class="{ 'radio-card--selected': localData.deploymentType === type }"
                    @click="selectDeploymentType(type)"
                  >
                    <div class="radio-card-inner">
                      <div
                        class="radio-dot"
                        :class="{ 'radio-dot--selected': localData.deploymentType === type }"
                      />
                      <span class="radio-label-text">{{ type }}</span>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>

          <!-- Documentation Status -->
          <v-col cols="12" md="6">
            <div class="field-item">
              <label class="field-label" style="margin-bottom: 10px; display: block">
                Status of Documentation
              </label>
              <v-row dense>
                <v-col
                  cols="12"
                  sm="4"
                  v-for="status in ['Documented', 'Undocumented / Irregular', 'Unknown']"
                  :key="status"
                >
                  <div
                    class="radio-card"
                    :class="{ 'radio-card--selected': localData.documentationStatus === status }"
                    @click="selectDocumentationStatus(status)"
                  >
                    <div class="radio-card-inner">
                      <div
                        class="radio-dot"
                        :class="{ 'radio-dot--selected': localData.documentationStatus === status }"
                      />
                      <span class="radio-label-text">{{ status }}</span>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Recruitment ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Recruitment Channel
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="channel in recruitmentChannels" :key="channel">
            <div
              class="checkbox-card"
              :class="{ 'checkbox-card--selected': localData.recruitmentChannel.includes(channel) }"
              @click="toggleRecruitmentChannel(channel)"
            >
              <v-checkbox
                v-model="localData.recruitmentChannel"
                :value="channel"
                hide-details
                density="compact"
                class="checkbox-inner"
                @click.stop
              >
                <template #label>
                  <span class="checkbox-label">{{ channel }}</span>
                </template>
              </v-checkbox>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Additional Migration Details ── -->
      <div class="field-group" style="margin-bottom: 0">
        <v-row dense>
          <v-col cols="12" md="6">
            <div class="field-item">
              <label class="field-label">Name of Recruitment Agency / Employer</label>
              <v-text-field
                v-model="localData.recruitmentAgency"
                placeholder="Agency or Direct Employer name"
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
              <label class="field-label">Date of First Deployment</label>
              <v-text-field
                v-model="localData.firstDeploymentDate"
                type="date"
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
              <label class="field-label">Date of Latest Deployment / Return</label>
              <v-text-field
                v-model="localData.latestDeploymentDate"
                type="date"
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
              <label class="field-label">Years Worked Abroad (Total)</label>
              <v-text-field
                v-model.number="localData.yearsWorkedAbroad"
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
              <label class="field-label">Contracts Completed</label>
              <v-text-field
                v-model.number="localData.contractsCompleted"
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

          <v-col cols="12" md="6">
            <div class="field-item">
              <label class="field-label">Average Contract Duration</label>
              <v-text-field
                v-model="localData.averageContractDuration"
                placeholder="e.g. 2 years or 24 months"
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

      <!-- ── BLOCK: Reason for Going Abroad ── -->
      <div class="field-group" style="margin-bottom: 0">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Reason for Going Abroad
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="reason in reasonsForGoing" :key="reason">
            <div
              class="checkbox-card"
              :class="{ 'checkbox-card--selected': localData.reasonForGoing.includes(reason) }"
              @click="toggleReason(reason)"
            >
              <v-checkbox
                v-model="localData.reasonForGoing"
                :value="reason"
                hide-details
                density="compact"
                class="checkbox-inner"
                @click.stop
              >
                <template #label>
                  <span class="checkbox-label">{{ reason }}</span>
                </template>
              </v-checkbox>
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

watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })

// Toggle helpers
const toggleCurrentStatus = (option) => {
  const idx = localData.value.currentStatus.indexOf(option)
  if (idx === -1) localData.value.currentStatus.push(option)
  else localData.value.currentStatus.splice(idx, 1)
  emitUpdate()
}

const toggleIndustry = (sector) => {
  const idx = localData.value.industrySector.indexOf(sector)
  if (idx === -1) localData.value.industrySector.push(sector)
  else localData.value.industrySector.splice(idx, 1)
  emitUpdate()
}

const toggleRecruitmentChannel = (channel) => {
  const idx = localData.value.recruitmentChannel.indexOf(channel)
  if (idx === -1) localData.value.recruitmentChannel.push(channel)
  else localData.value.recruitmentChannel.splice(idx, 1)
  emitUpdate()
}

const toggleReason = (reason) => {
  const idx = localData.value.reasonForGoing.indexOf(reason)
  if (idx === -1) localData.value.reasonForGoing.push(reason)
  else localData.value.reasonForGoing.splice(idx, 1)
  emitUpdate()
}

const selectDeploymentType = (val) => {
  localData.value.deploymentType = val
  emitUpdate()
}

const selectDocumentationStatus = (val) => {
  localData.value.documentationStatus = val
  emitUpdate()
}
</script>

<style scoped>
/* Reusing styles from previous sections */
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

/* Radio Cards */
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
