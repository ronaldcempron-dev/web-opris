<!-- src/components/survey/SectionRespondent.vue -->
<template>
  <div>
    <div class="section-body">
      <!-- ── BLOCK: Respondent Name ── -->
      <div class="field-group">
        <v-row dense>
          <v-col cols="12">
            <div class="field-item">
              <label class="field-label">Name of Respondent</label>
              <v-text-field
                v-model="localData.name"
                placeholder="Full name"
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

      <!-- ── BLOCK: Relationship to OFW (single select) ── -->
      <div class="field-group">
        <label class="field-label" style="display: block; margin-bottom: 10px">
          Relationship to OFW
        </label>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="rel in relationships" :key="rel">
            <div
              class="radio-card"
              :class="{ 'radio-card--selected': localData.relationshipToOFW === rel }"
              @click="selectRelationship(rel)"
            >
              <div class="radio-card-inner">
                <div
                  class="radio-dot"
                  :class="{ 'radio-dot--selected': localData.relationshipToOFW === rel }"
                />
                <span class="radio-label-text">{{ rel }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ── BLOCK: Personal Information ── -->
      <div class="field-group">
        <v-row dense>
          <v-col cols="12" md="4">
            <div class="field-item">
              <label class="field-label">Sex</label>
              <v-row dense>
                <v-col cols="6" v-for="s in ['Male', 'Female']" :key="s">
                  <div
                    class="radio-card"
                    :class="{ 'radio-card--selected': localData.sex === s }"
                    @click="selectSex(s)"
                  >
                    <div class="radio-card-inner">
                      <div
                        class="radio-dot"
                        :class="{ 'radio-dot--selected': localData.sex === s }"
                      />
                      <span class="radio-label-text">{{ s }}</span>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>

          <v-col cols="12" md="4">
            <div class="field-item">
              <label class="field-label">Age</label>
              <v-text-field
                v-model="localData.age"
                type="number"
                placeholder="e.g. 35"
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
              <label class="field-label">Date of Birth</label>
              <v-text-field
                v-model="localData.dateOfBirth"
                type="date"
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

      <!-- ── BLOCK: Contact & Address ── -->
      <div class="field-group" style="margin-bottom: 0">
        <v-row dense>
          <v-col cols="12" md="6">
            <div class="field-item">
              <label class="field-label">Contact Number</label>
              <v-text-field
                v-model="localData.contactNumber"
                placeholder="e.g. 09xxxxxxxxx"
                variant="outlined"
                density="comfortable"
                hide-details
                class="modern-input"
                @update:modelValue="emitUpdate"
              />
            </div>
          </v-col>

          <v-col cols="12">
            <div class="field-item" style="margin-top: 8px">
              <label class="field-label">Complete Home Address</label>
              <v-textarea
                v-model="localData.completeHomeAddress"
                placeholder="House No., Street, Barangay, Municipality, Province"
                variant="outlined"
                density="comfortable"
                hide-details
                rows="3"
                class="modern-input"
                @update:modelValue="emitUpdate"
              />
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({ data: Object })
const emit = defineEmits(['update:data'])

const relationships = ['Self (OFW)', 'Spouse', 'Parent', 'Child', 'Sibling']

const localData = ref({
  name: '',
  relationshipToOFW: '', // single string now
  sex: '',
  age: '',
  dateOfBirth: '',
  contactNumber: '',
  completeHomeAddress: '',
  ...props.data,
})

watch(localData, (v) => emit('update:data', { ...v }), { deep: true })
const emitUpdate = () => emit('update:data', { ...localData.value })

const selectRelationship = (rel) => {
  localData.value.relationshipToOFW = rel
  emitUpdate()
}

const selectSex = (val) => {
  localData.value.sex = val
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
.radio-card {
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
.radio-card:hover {
  border-color: #93c5fd;
  background: #f8faff;
}
.radio-card--selected {
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
.radio-label-text {
  font-size: 13px;
  color: #111827;
  line-height: 1.4;
}
.radio-card--selected .radio-label-text {
  color: #1d4ed8;
  font-weight: 600;
}
@media (max-width: 480px) {
  .section-body {
    padding: 14px 14px 18px;
  }
  .radio-card {
    padding: 8px 12px;
  }
}
</style>
