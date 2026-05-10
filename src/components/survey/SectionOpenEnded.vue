<!-- src/components/survey/SectionOpenEnded.vue -->
<template>
  <div>
    <div class="section-body">
      <!-- ── BLOCK: Open-Ended Questions ── -->

      <!-- 1. Changes from Migration -->
      <div class="field-group">
        <div class="field-item">
          <label class="field-label">
            What changes has overseas migration brought to your family?
          </label>
          <v-textarea
            v-model="localData.changesFromMigration"
            variant="outlined"
            density="comfortable"
            rows="4"
            placeholder="Share the positive and negative changes experienced..."
            class="modern-input"
            @update:modelValue="emitUpdate"
          />
        </div>
      </div>

      <!-- 2. Biggest Challenges -->
      <div class="field-group">
        <div class="field-item">
          <label class="field-label">
            What are the biggest challenges you face as an OFW / family left behind / returned OFW?
          </label>
          <v-textarea
            v-model="localData.biggestChallenges"
            variant="outlined"
            density="comfortable"
            rows="4"
            placeholder="Describe the main difficulties you are currently experiencing..."
            class="modern-input"
            @update:modelValue="emitUpdate"
          />
        </div>
      </div>

      <!-- 3. Support Needed -->
      <div class="field-group">
        <div class="field-item">
          <label class="field-label">
            What kind of support do you most need from the government or LGU?
          </label>
          <v-textarea
            v-model="localData.mostNeededSupport"
            variant="outlined"
            density="comfortable"
            rows="3"
            placeholder="e.g. livelihood support, skills training, financial assistance, etc."
            class="modern-input"
            @update:modelValue="emitUpdate"
          />
        </div>
      </div>

      <!-- 4. Future Plans -->
      <div class="field-group">
        <div class="field-item">
          <label class="field-label"> What are your future plans for the family / OFW? </label>
          <v-textarea
            v-model="localData.futurePlans"
            variant="outlined"
            density="comfortable"
            rows="3"
            placeholder="Short-term and long-term plans..."
            class="modern-input"
            @update:modelValue="emitUpdate"
          />
        </div>
      </div>

      <!-- 5. Other Comments -->
      <div class="field-group" style="margin-bottom: 0">
        <div class="field-item">
          <label class="field-label">Other comments or concerns</label>
          <v-textarea
            v-model="localData.otherComments"
            variant="outlined"
            density="comfortable"
            rows="4"
            placeholder="Any additional information, suggestions, or concerns..."
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

const localData = ref({
  changesFromMigration: '',
  biggestChallenges: '',
  mostNeededSupport: '',
  futurePlans: '',
  otherComments: '',
  ...props.data,
})

watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })
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

/* Modern Input for Textareas */
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

/* Mobile */
@media (max-width: 480px) {
  .section-body {
    padding: 14px 14px 18px;
  }
}
</style>
