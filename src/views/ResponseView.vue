<template>
  <v-app theme="light">
    <!-- Shared Sidebar -->
    <Sidebar v-model="drawer" :show-responses-list="true" @select="viewFullReport" />

    <v-main>
      <div class="responses-layout">
        <!-- STICKY TOP RAIL - FIXED -->
        <div class="progress-rail">
          <div class="progress-rail-inner">
            <div class="left-rail">
              <v-btn
                icon
                variant="text"
                size="small"
                @click="drawer = !drawer"
                class="rail-menu-btn"
              >
                <v-icon>mdi-menu</v-icon>
              </v-btn>
              <div class="rail-title-block">
                <span class="rail-title">OFW Family Profiling</span>
              </div>
            </div>

            <v-spacer />

            <div
              style="min-width: 90px; display: flex; justify-content: flex-end; margin-right: 16px"
            >
              <v-btn
                color="primary"
                variant="outlined"
                size="small"
                @click="fetchResponses"
                :loading="loading"
                prepend-icon="mdi-refresh"
                style="
                  color: white;
                  border-color: rgba(255, 255, 255, 0.4);
                  background: rgba(255, 255, 255, 0.12);
                "
              >
                Refresh
              </v-btn>
            </div>
          </div>

          <div class="rail-bar-track">
            <div class="rail-bar-fill" style="width: 100%" />
          </div>
        </div>

        <!-- MAIN BODY -->
        <div class="responses-body">
          <v-card elevation="8" rounded="xl" color="white" class="mx-auto">
            <v-card-title class="px-8 pt-8 pb-4 d-flex align-center">
              <v-icon color="primary" size="32" class="mr-3">mdi-table</v-icon>
              <span class="text-h4 font-weight-bold">All Submitted Responses</span>
            </v-card-title>

            <v-card-text class="px-8 pb-8">
              <v-text-field
                v-model="search"
                label="Search by Respondent or Enumerator..."
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                clearable
                class="mb-6"
              />

              <v-data-table
                :headers="headers"
                :items="filteredResponses"
                :loading="loading"
                item-value="id"
                :items-per-page="10"
              >
                <template #item.created_at="{ item }">
                  {{ formatDate(item.created_at) }}
                </template>
                <template #item.actions="{ item }">
                  <v-btn color="primary" variant="text" size="small" @click="viewFullReport(item)">
                    View Full Report
                  </v-btn>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </v-main>

    <!-- FULL REPORT MODAL -->
    <v-dialog v-model="reportDialog" max-width="1100" scrollable>
      <v-card v-if="selectedResponse" rounded="xl" elevation="10">
        <v-card-title class="d-flex align-center justify-space-between pa-6">
          <div class="d-flex align-center">
            <v-icon color="primary" size="28" class="mr-3">mdi-file-document-outline</v-icon>
            <div>
              <div class="text-h5 font-weight-bold">Full OFW Profiling Report</div>
              <div class="text-body-2 text-grey-darken-2">
                {{ selectedResponse.respondent_name }} •
                {{ formatDate(selectedResponse.created_at) }}
              </div>
            </div>
          </div>
          <v-btn icon @click="reportDialog = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>

        <v-card-text class="pa-8" style="max-height: 75vh; overflow-y: auto">
          <ReportDetailView :response="selectedResponse" />
        </v-card-text>

        <v-card-actions class="pa-6">
          <v-spacer />
          <v-btn color="primary" @click="reportDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/services/supabase'
import Sidebar from '@/components/common/Sidebar.vue'
import ReportDetailView from '@/components/responses/ReportDetailView.vue'

const drawer = ref(true)

const responses = ref([])
const loading = ref(true)
const search = ref('')
const reportDialog = ref(false)
const selectedResponse = ref(null)

const headers = [
  { title: 'Date', key: 'created_at' },
  { title: 'Respondent', key: 'respondent_name' },
  { title: 'Enumerator', key: 'enumerator_name' },
  { title: 'Actions', key: 'actions', sortable: false },
]

const fetchResponses = async () => {
  loading.value = true
  const { data } = await supabase
    .from('responses')
    .select('*')
    .order('created_at', { ascending: false })
  if (data) responses.value = data
  loading.value = false
}

onMounted(fetchResponses)

const filteredResponses = computed(() => {
  if (!search.value) return responses.value
  const term = search.value.toLowerCase()
  return responses.value.filter(
    (r) =>
      r.respondent_name?.toLowerCase().includes(term) ||
      r.enumerator_name?.toLowerCase().includes(term),
  )
})

const formatDate = (date) => new Date(date).toLocaleString('en-PH')

const viewFullReport = (item) => {
  selectedResponse.value = item
  reportDialog.value = true
}
</script>

<style scoped>
.responses-layout {
  min-height: 100vh;
  background: #f5f4f0;
}

/* ─── STICKY TOP RAIL - FIXED ALIGNMENT ─── */
.progress-rail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100 !important;
  background: linear-gradient(135deg, #1d4ed8, #2563eb, #3b82f6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 18px rgba(37, 99, 235, 0.25);
}

.progress-rail-inner {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 0 8px 0;
  box-sizing: border-box;
  min-height: 52px;
  gap: 12px;
}

/* Left side - locked */
.left-rail {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  margin-left: 0;
  padding-left: 0;
}

.rail-menu-btn {
  color: white !important;
  z-index: 110;
  position: relative;
  flex-shrink: 0;
}

.rail-title-block {
  display: flex;
  align-items: baseline;
  gap: 6px;
  min-width: 0;
}

.rail-title {
  font-size: 13px;
  font-weight: 700;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rail-bar-track {
  height: 4px;
  background: rgba(255, 255, 255, 0.18);
}

.rail-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffffff, #dbeafe);
  transition: width 0.35s ease;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

/* Main Content */
.responses-body {
  width: 100%;
  padding: 80px 40px 40px;
  box-sizing: border-box;
}

/* Responsive */
@media (max-width: 768px) {
  .responses-body {
    padding: 70px 24px 24px;
  }
  .progress-rail-inner {
    padding: 9px 24px 7px;
  }
}

@media (max-width: 480px) {
  .responses-body {
    padding: 62px 12px 24px;
  }
  .progress-rail-inner {
    padding: 9px 12px 7px;
  }
}
</style>
