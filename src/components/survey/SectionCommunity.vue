<!-- src/components/survey/SectionCommunity.vue -->
<template>
  <div>
    <div class="section-body">
      <!-- ── BLOCK: Membership in Community Groups ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Is the household a member of any community group/association?
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="group in communityGroups" :key="group">
            <div
              class="checkbox-card"
              :class="{ 'checkbox-card--selected': localData.communityGroups.includes(group) }"
              @click="toggleCommunityGroup(group)"
            >
              <v-checkbox
                v-model="localData.communityGroups"
                :value="group"
                hide-details
                density="compact"
                class="checkbox-inner"
                @click.stop
              >
                <template #label>
                  <span class="checkbox-label">{{ group }}</span>
                </template>
              </v-checkbox>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Willingness to Participate ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Would the family be willing to participate in the following?
        </label>
        <v-row dense>
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="activity in participationActivities"
            :key="activity"
          >
            <div
              class="checkbox-card"
              :class="{
                'checkbox-card--selected': localData.willingToParticipate.includes(activity),
              }"
              @click="toggleParticipation(activity)"
            >
              <v-checkbox
                v-model="localData.willingToParticipate"
                :value="activity"
                hide-details
                density="compact"
                class="checkbox-inner"
                @click.stop
              >
                <template #label>
                  <span class="checkbox-label">{{ activity }}</span>
                </template>
              </v-checkbox>
            </div>
          </v-col>
        </v-row>

        <!-- Other Participation -->
        <div class="field-item mt-6">
          <label class="field-label">Other (please specify)</label>
          <v-text-field
            v-model="localData.otherParticipation"
            placeholder="Please specify other activities..."
            variant="outlined"
            density="comfortable"
            hide-details
            class="modern-input"
            @update:modelValue="emitUpdate"
          />
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

const communityGroups = [
  'OFW Family Circle',
  'Cooperative',
  'Women’s Association',
  'Farmers/Fisherfolk Association',
  'Youth group',
  'Religious/faith-based group',
  'Barangay organization',
  'None',
]

const participationActivities = [
  'Family development sessions',
  'Parenting sessions',
  'Financial literacy training',
  'Enterprise development training',
  'Peer support / counseling groups',
  'OFW reintegration orientation',
  'Community Kalinga / wellness activities',
]

const localData = ref({
  communityGroups: [],
  willingToParticipate: [],
  otherParticipation: '',
  ...props.data,
})

watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })

// Toggle handlers
const toggleCommunityGroup = (group) => {
  const idx = localData.value.communityGroups.indexOf(group)
  if (idx === -1) localData.value.communityGroups.push(group)
  else localData.value.communityGroups.splice(idx, 1)
  emitUpdate()
}

const toggleParticipation = (activity) => {
  const idx = localData.value.willingToParticipate.indexOf(activity)
  if (idx === -1) localData.value.willingToParticipate.push(activity)
  else localData.value.willingToParticipate.splice(idx, 1)
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
