<!-- src/components/survey/SectionOpenEnded.vue -->
<template>
  <div>
    <h2 class="text-h5 font-weight-bold mb-6 text-primary">XVIII. Open-Ended Questions</h2>

    <v-row dense>
      <!-- 1. Changes brought by overseas migration -->
      <v-col cols="12" class="mb-8">
        <label class="text-body-1 font-weight-medium mb-3 d-block">
          What changes has overseas migration brought to your family?
        </label>
        <v-textarea
          v-model="localData.changesFromMigration"
          variant="outlined"
          density="comfortable"
          rows="4"
          placeholder="Write your answer here..."
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <!-- 2. Biggest challenges -->
      <v-col cols="12" class="mb-8">
        <label class="text-body-1 font-weight-medium mb-3 d-block">
          What are the biggest challenges you face as an OFW/family left behind/returned OFW?
        </label>
        <v-textarea
          v-model="localData.biggestChallenges"
          variant="outlined"
          density="comfortable"
          rows="4"
          placeholder="Write your answer here..."
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <!-- 3. Support needed from government/LGU -->
      <v-col cols="12" class="mb-8">
        <label class="text-body-1 font-weight-medium mb-3 d-block">
          What kind of support do you most need from the government or LGU?
        </label>
        <v-textarea
          v-model="localData.mostNeededSupport"
          variant="outlined"
          density="comfortable"
          rows="3"
          placeholder="Write your answer here..."
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <!-- 4. Future plans -->
      <v-col cols="12" class="mb-8">
        <label class="text-body-1 font-weight-medium mb-3 d-block">
          What are your future plans for the family / OFW?
        </label>
        <v-textarea
          v-model="localData.futurePlans"
          variant="outlined"
          density="comfortable"
          rows="3"
          placeholder="Write your answer here..."
          @update:modelValue="emitUpdate"
        />
      </v-col>

      <!-- 5. Other comments -->
      <v-col cols="12">
        <label class="text-body-1 font-weight-medium mb-3 d-block">
          Other comments or concerns:
        </label>
        <v-textarea
          v-model="localData.otherComments"
          variant="outlined"
          density="comfortable"
          rows="4"
          placeholder="Any additional information..."
          @update:modelValue="emitUpdate"
        />
      </v-col>
    </v-row>
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

// Two-way sync with SurveyView
watch(localData, (newVal) => emit('update:data', { ...newVal }), { deep: true })

const emitUpdate = () => emit('update:data', { ...localData.value })
</script>
