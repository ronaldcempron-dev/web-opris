<template>
  <v-app theme="light">
    <!-- Sidebar Navigation -->
    <Sidebar />

    <!-- MAIN CONTENT -->
    <v-main>
      <v-container fluid class="pa-6 pa-md-8" style="max-width: 1400px; margin: 0 auto">
        <!-- HEADER -->
        <div class="header-container">
          <div class="header-left" style="position: relative">
            <v-btn
              icon
              variant="text"
              class="menu-btn"
              @click="drawer = true"
              style="position: absolute; left: -48px; top: 8px"
            >
              <v-icon>mdi-menu</v-icon>
            </v-btn>
            <v-img src="/DMW Logo.png" width="70" height="70" contain />
            <div class="header-left-text">TAHANAN NG OFW</div>
          </div>

          <div class="header-center">
            <div class="main-title">Survey Responses</div>
            <div class="subtitle">OFW Family Profiling and Reintegration Needs Assessment</div>
          </div>

          <div class="header-right">
            <v-img src="/BagongPilipinas.png" width="70" height="70" contain />
            <div class="header-right-text">BAGONG PILIPINAS</div>
          </div>
        </div>

        <!-- MAIN CARD -->
        <v-card elevation="8" rounded="xl" color="white" class="mx-auto">
          <v-card-title class="px-8 pt-8 pb-4 d-flex align-center">
            <v-icon color="primary" size="32" class="mr-3">mdi-table</v-icon>
            <span class="text-h4 font-weight-bold">All Submitted Responses</span>
            <v-spacer />
            <v-btn
              color="primary"
              @click="fetchResponses"
              :loading="loading"
              prepend-icon="mdi-refresh"
            >
              Refresh
            </v-btn>
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
      </v-container>
    </v-main>

    <!-- BEAUTIFUL FULL REPORT MODAL -->
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
import Sidebar from '@/components/common/Sidebar.vue'
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/services/supabase'
import { useRouter } from 'vue-router'
import ReportDetailView from '@/components/responses/ReportDetailView.vue'

const router = useRouter()
const drawer = ref(false)

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
  const { data, error } = await supabase
    .from('responses')
    .select('*')
    .order('created_at', { ascending: false })

  if (!error) responses.value = data || []
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

const goTo = (path) => {
  router.push(path)
  drawer.value = false
}
</script>

<style scoped>
/* Reuse same header styles as SurveyView */
.header-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
  padding: 0 16px;
}
.header-left,
.header-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.header-left-text,
.header-right-text {
  font-size: 18px;
  font-weight: 700;
  color: #1e3a8a;
}
.main-title {
  font-size: clamp(26px, 3.8vw, 42px);
  font-weight: 800;
  color: #1f2937;
  text-align: center;
}
</style>
