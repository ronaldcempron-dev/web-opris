<!-- src/views/ReportsView.vue -->
<template>
  <v-app theme="light" style="background: #f5f4f0">
    <Sidebar v-model="drawer" />

    <v-main>
      <div class="reports-layout">
        <!-- ── TOP RAIL ── -->
        <div class="progress-rail">
          <div class="progress-rail-inner">
            <v-btn icon variant="text" size="small" color="white" @click="drawer = !drawer">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
            <div class="rail-title-block">
              <span class="rail-title">OFW Profiling and Reintegration Information System</span>
              <span class="rail-sep">·</span>
              <span class="rail-sub">Reports &amp; Analytics</span>
            </div>
          </div>
        </div>

        <!-- ── BODY ── -->
        <div class="reports-body">
          <div v-if="loading" class="loading-state">
            <v-progress-circular indeterminate color="primary" size="40" />
            <p>Loading analytics data…</p>
          </div>

          <template v-else>
            <!-- ══ OVERVIEW ══════════════════════════════ -->
            <div class="section-label">Overview</div>
            <v-row dense class="mb-5">
              <v-col cols="6" sm="3" v-for="card in summaryCards" :key="card.label">
                <div class="stat-card">
                  <div class="stat-icon-wrap" :style="{ background: card.bg }">
                    <v-icon :color="card.color" size="20">{{ card.icon }}</v-icon>
                  </div>
                  <div class="stat-value">{{ card.value }}</div>
                  <div class="stat-label">{{ card.label }}</div>
                </div>
              </v-col>
            </v-row>

            <!-- ══ SURVEY TRENDS ══════════════════════════ -->
            <div class="section-label">Survey Trends</div>
            <v-row dense class="mb-4">
              <v-col cols="12" md="8">
                <div class="chart-card">
                  <div class="chart-title">
                    <v-icon size="15" color="#3b82f6" style="margin-right: 6px"
                      >mdi-chart-bar</v-icon
                    >
                    Submissions Per Month
                  </div>
                  <Bar
                    v-if="monthlyChart.labels.length"
                    :data="monthlyChart"
                    :options="barOptions"
                    style="max-height: 240px"
                  />
                  <div v-else class="chart-empty">No data yet</div>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="chart-card">
                  <div class="chart-title">
                    <v-icon size="15" color="#3b82f6" style="margin-right: 6px"
                      >mdi-account-group</v-icon
                    >
                    Type of Respondent
                  </div>
                  <Doughnut
                    v-if="respondentTypeChart.labels.length"
                    :data="respondentTypeChart"
                    :options="doughnutOptions"
                    style="max-height: 240px"
                  />
                  <div v-else class="chart-empty">No data yet</div>
                </div>
              </v-col>
            </v-row>

            <!-- ══ OFW PROFILE ════════════════════════════ -->
            <div class="section-label">OFW Profile</div>
            <v-row dense class="mb-4">
              <v-col cols="12" sm="6" md="3">
                <div class="chart-card">
                  <div class="chart-title">Sex</div>
                  <Doughnut
                    v-if="sexChart.labels.length"
                    :data="sexChart"
                    :options="doughnutOptions"
                    style="max-height: 200px"
                  />
                  <div v-else class="chart-empty">No data</div>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <div class="chart-card">
                  <div class="chart-title">Civil Status</div>
                  <Doughnut
                    v-if="civilStatusChart.labels.length"
                    :data="civilStatusChart"
                    :options="doughnutOptions"
                    style="max-height: 200px"
                  />
                  <div v-else class="chart-empty">No data</div>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <div class="chart-card">
                  <div class="chart-title">OWWA Status</div>
                  <Doughnut
                    v-if="owwaChart.labels.length"
                    :data="owwaChart"
                    :options="doughnutOptions"
                    style="max-height: 200px"
                  />
                  <div v-else class="chart-empty">No data</div>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <div class="chart-card">
                  <div class="chart-title">Educational Attainment</div>
                  <Doughnut
                    v-if="educationChart.labels.length"
                    :data="educationChart"
                    :options="doughnutOptions"
                    style="max-height: 200px"
                  />
                  <div v-else class="chart-empty">No data</div>
                </div>
              </v-col>
            </v-row>

            <!-- ══ MIGRATION ═══════════════════════════════ -->
            <div class="section-label">Migration Data</div>
            <v-row dense class="mb-4">
              <v-col cols="12" md="6">
                <div class="chart-card">
                  <div class="chart-title">
                    <v-icon size="15" color="#3b82f6" style="margin-right: 6px">mdi-earth</v-icon>
                    Top Countries of Work
                  </div>
                  <Bar
                    v-if="countryChart.labels.length"
                    :data="countryChart"
                    :options="barOptionsH"
                    style="max-height: 300px"
                  />
                  <div v-else class="chart-empty">No data yet</div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="chart-card">
                  <div class="chart-title">
                    <v-icon size="15" color="#3b82f6" style="margin-right: 6px"
                      >mdi-briefcase-outline</v-icon
                    >
                    Current OFW Status
                  </div>
                  <Bar
                    v-if="ofwStatusChart.labels.length"
                    :data="ofwStatusChart"
                    :options="barOptionsH"
                    style="max-height: 300px"
                  />
                  <div v-else class="chart-empty">No data yet</div>
                </div>
              </v-col>
            </v-row>

            <v-row dense class="mb-4">
              <v-col cols="12" md="6">
                <div class="chart-card">
                  <div class="chart-title">
                    <v-icon size="15" color="#8b5cf6" style="margin-right: 6px"
                      >mdi-hammer-wrench</v-icon
                    >
                    Industry / Sector
                  </div>
                  <Bar
                    v-if="industryChart.labels.length"
                    :data="industryChart"
                    :options="barOptionsH"
                    style="max-height: 280px"
                  />
                  <div v-else class="chart-empty">No data yet</div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="chart-card">
                  <div class="chart-title">
                    <v-icon size="15" color="#06b6d4" style="margin-right: 6px"
                      >mdi-account-arrow-right</v-icon
                    >
                    Recruitment Channel
                  </div>
                  <Doughnut
                    v-if="recruitmentChart.labels.length"
                    :data="recruitmentChart"
                    :options="doughnutOptions"
                    style="max-height: 280px"
                  />
                  <div v-else class="chart-empty">No data yet</div>
                </div>
              </v-col>
            </v-row>

            <v-row dense class="mb-4">
              <v-col cols="12" md="6">
                <div class="chart-card">
                  <div class="chart-title">
                    <v-icon size="15" color="#f59e0b" style="margin-right: 6px"
                      >mdi-help-circle-outline</v-icon
                    >
                    Reason for Going Abroad
                  </div>
                  <Bar
                    v-if="reasonAbroadChart.labels.length"
                    :data="reasonAbroadChart"
                    :options="barOptionsH"
                    style="max-height: 260px"
                  />
                  <div v-else class="chart-empty">No data yet</div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="chart-card">
                  <div class="chart-title">
                    <v-icon size="15" color="#10b981" style="margin-right: 6px"
                      >mdi-file-document-check</v-icon
                    >
                    Documentation Status
                  </div>
                  <Doughnut
                    v-if="documentationChart.labels.length"
                    :data="documentationChart"
                    :options="doughnutOptions"
                    style="max-height: 260px"
                  />
                  <div v-else class="chart-empty">No data yet</div>
                </div>
              </v-col>
            </v-row>

            <!-- ══ PRESENT STATUS ═════════════════════════ -->
            <div class="section-label">Present Status</div>
            <v-row dense class="mb-4">
              <v-col cols="12" md="6">
                <div class="chart-card">
                  <div class="chart-title">
                    <v-icon size="15" color="#3b82f6" style="margin-right: 6px"
                      >mdi-map-marker-outline</v-icon
                    >
                    Present Location of OFW
                  </div>
                  <Doughnut
                    v-if="locationChart.labels.length"
                    :data="locationChart"
                    :options="doughnutOptions"
                    style="max-height: 260px"
                  />
                  <div v-else class="chart-empty">No data yet</div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="chart-card">
                  <div class="chart-title">
                    <v-icon size="15" color="#ec4899" style="margin-right: 6px"
                      >mdi-airplane-landing</v-icon
                    >
                    Planning to Go Abroad Again
                  </div>
                  <Doughnut
                    v-if="planningAbroadChart.labels.length"
                    :data="planningAbroadChart"
                    :options="doughnutOptions"
                    style="max-height: 260px"
                  />
                  <div v-else class="chart-empty">No data yet</div>
                </div>
              </v-col>
            </v-row>

            <!-- ══ SOCIO-ECONOMIC ══════════════════════════ -->
            <div class="section-label">Socio-Economic Profile</div>
            <v-row dense class="mb-4">
              <v-col cols="12" sm="6" md="4">
                <div class="chart-card">
                  <div class="chart-title">Type of Housing Unit</div>
                  <Doughnut
                    v-if="housingChart.labels.length"
                    :data="housingChart"
                    :options="doughnutOptions"
                    style="max-height: 220px"
                  />
                  <div v-else class="chart-empty">No data</div>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div class="chart-card">
                  <div class="chart-title">Average Monthly Income</div>
                  <Bar
                    v-if="incomeChart.labels.length"
                    :data="incomeChart"
                    :options="barOptions"
                    style="max-height: 220px"
                  />
                  <div v-else class="chart-empty">No data</div>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div class="chart-card">
                  <div class="chart-title">Monthly OFW Remittance</div>
                  <Bar
                    v-if="remittanceChart.labels.length"
                    :data="remittanceChart"
                    :options="barOptions"
                    style="max-height: 220px"
                  />
                  <div v-else class="chart-empty">No data</div>
                </div>
              </v-col>
            </v-row>

            <v-row dense class="mb-4">
              <v-col cols="12" md="6">
                <div class="chart-card">
                  <div class="chart-title">
                    <v-icon size="15" color="#3b82f6" style="margin-right: 6px"
                      >mdi-cash-multiple</v-icon
                    >
                    Primary Source of Household Income
                  </div>
                  <Bar
                    v-if="incomeSourceChart.labels.length"
                    :data="incomeSourceChart"
                    :options="barOptionsH"
                    style="max-height: 280px"
                  />
                  <div v-else class="chart-empty">No data yet</div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="chart-card">
                  <div class="chart-title">
                    <v-icon size="15" color="#10b981" style="margin-right: 6px"
                      >mdi-send-circle-outline</v-icon
                    >
                    Main Uses of Remittances
                  </div>
                  <Bar
                    v-if="remittanceUsesChart.labels.length"
                    :data="remittanceUsesChart"
                    :options="barOptionsH"
                    style="max-height: 280px"
                  />
                  <div v-else class="chart-empty">No data yet</div>
                </div>
              </v-col>
            </v-row>

            <!-- ══ NEEDS & ASSISTANCE ═════════════════════ -->
            <div class="section-label">Needs &amp; Assistance</div>
            <v-row dense class="mb-4">
              <v-col cols="12" md="6">
                <div class="chart-card">
                  <div class="chart-title">
                    <v-icon size="15" color="#10b981" style="margin-right: 6px"
                      >mdi-hand-heart-outline</v-icon
                    >
                    Immediate Assistance Needed
                  </div>
                  <Bar
                    v-if="assistanceChart.labels.length"
                    :data="assistanceChart"
                    :options="barOptionsH"
                    style="max-height: 340px"
                  />
                  <div v-else class="chart-empty">No data yet</div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="chart-card">
                  <div class="chart-title">
                    <v-icon size="15" color="#f59e0b" style="margin-right: 6px"
                      >mdi-school-outline</v-icon
                    >
                    Preferred Skills Training
                  </div>
                  <Bar
                    v-if="skillsChart.labels.length"
                    :data="skillsChart"
                    :options="barOptionsH"
                    style="max-height: 340px"
                  />
                  <div v-else class="chart-empty">No data yet</div>
                </div>
              </v-col>
            </v-row>

            <v-row dense class="mb-4">
              <v-col cols="12" md="6">
                <div class="chart-card">
                  <div class="chart-title">
                    <v-icon size="15" color="#8b5cf6" style="margin-right: 6px"
                      >mdi-shield-outline</v-icon
                    >
                    Received Assistance From
                  </div>
                  <Bar
                    v-if="receivedAssistanceChart.labels.length"
                    :data="receivedAssistanceChart"
                    :options="barOptionsH"
                    style="max-height: 300px"
                  />
                  <div v-else class="chart-empty">No data yet</div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="chart-card">
                  <div class="chart-title">
                    <v-icon size="15" color="#06b6d4" style="margin-right: 6px"
                      >mdi-package-variant</v-icon
                    >
                    Type of Assistance Received
                  </div>
                  <Bar
                    v-if="typeAssistanceChart.labels.length"
                    :data="typeAssistanceChart"
                    :options="barOptionsH"
                    style="max-height: 300px"
                  />
                  <div v-else class="chart-empty">No data yet</div>
                </div>
              </v-col>
            </v-row>

            <!-- ══ PROBLEMS & RISK ════════════════════════ -->
            <div class="section-label">Problems &amp; Risk</div>
            <v-row dense class="mb-4">
              <v-col cols="12" md="6">
                <div class="chart-card">
                  <div class="chart-title">
                    <v-icon size="15" color="#ef4444" style="margin-right: 6px"
                      >mdi-alert-circle-outline</v-icon
                    >
                    Major Problems Faced
                  </div>
                  <Bar
                    v-if="majorProblemsChart.labels.length"
                    :data="majorProblemsChart"
                    :options="barOptionsH"
                    style="max-height: 340px"
                  />
                  <div v-else class="chart-empty">No data yet</div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="chart-card">
                  <div class="chart-title">
                    <v-icon size="15" color="#f59e0b" style="margin-right: 6px">mdi-magnify</v-icon>
                    Priority Level (Risk Screening)
                  </div>
                  <Doughnut
                    v-if="priorityChart.labels.length"
                    :data="priorityChart"
                    :options="doughnutOptions"
                    style="max-height: 280px"
                  />
                  <div v-else class="chart-empty">No data yet</div>
                </div>
              </v-col>
            </v-row>

            <v-row dense class="mb-4">
              <v-col cols="12" md="6">
                <div class="chart-card">
                  <div class="chart-title">
                    <v-icon size="15" color="#ef4444" style="margin-right: 6px"
                      >mdi-file-alert-outline</v-icon
                    >
                    Ongoing Cases
                  </div>
                  <Bar
                    v-if="ongoingCasesChart.labels.length"
                    :data="ongoingCasesChart"
                    :options="barOptionsH"
                    style="max-height: 300px"
                  />
                  <div v-else class="chart-empty">No data yet</div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="chart-card">
                  <div class="chart-title">
                    <v-icon size="15" color="#8b5cf6" style="margin-right: 6px"
                      >mdi-rocket-launch-outline</v-icon
                    >
                    Reintegration Plan Status
                  </div>
                  <Doughnut
                    v-if="reintegrationPlanChart.labels.length"
                    :data="reintegrationPlanChart"
                    :options="doughnutOptions"
                    style="max-height: 280px"
                  />
                  <div v-else class="chart-empty">No data yet</div>
                </div>
              </v-col>
            </v-row>

            <!-- ══ LIVELIHOOD & COMMUNITY ═════════════════ -->
            <div class="section-label">Livelihood &amp; Community</div>
            <v-row dense class="mb-4">
              <v-col cols="12" md="6">
                <div class="chart-card">
                  <div class="chart-title">
                    <v-icon size="15" color="#10b981" style="margin-right: 6px"
                      >mdi-sprout-outline</v-icon
                    >
                    Preferred Livelihood / Enterprise
                  </div>
                  <Bar
                    v-if="preferredLivelihoodChart.labels.length"
                    :data="preferredLivelihoodChart"
                    :options="barOptionsH"
                    style="max-height: 300px"
                  />
                  <div v-else class="chart-empty">No data yet</div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="chart-card">
                  <div class="chart-title">
                    <v-icon size="15" color="#3b82f6" style="margin-right: 6px"
                      >mdi-account-group-outline</v-icon
                    >
                    Community Group Membership
                  </div>
                  <Bar
                    v-if="communityGroupChart.labels.length"
                    :data="communityGroupChart"
                    :options="barOptionsH"
                    style="max-height: 300px"
                  />
                  <div v-else class="chart-empty">No data yet</div>
                </div>
              </v-col>
            </v-row>

            <!-- ══ ENUMERATOR ASSESSMENT ══════════════════ -->
            <div class="section-label">Enumerator Assessment</div>
            <v-row dense class="mb-4">
              <v-col cols="12" sm="6" md="4">
                <div class="chart-card">
                  <div class="chart-title">Socio-Economic Status (Observed)</div>
                  <Doughnut
                    v-if="socioStatusChart.labels.length"
                    :data="socioStatusChart"
                    :options="doughnutOptions"
                    style="max-height: 220px"
                  />
                  <div v-else class="chart-empty">No data</div>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div class="chart-card">
                  <div class="chart-title">Housing Condition (Observed)</div>
                  <Doughnut
                    v-if="housingConditionChart.labels.length"
                    :data="housingConditionChart"
                    :options="doughnutOptions"
                    style="max-height: 220px"
                  />
                  <div v-else class="chart-empty">No data</div>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div class="chart-card">
                  <div class="chart-title">Family Functioning</div>
                  <Doughnut
                    v-if="familyFunctioningChart.labels.length"
                    :data="familyFunctioningChart"
                    :options="doughnutOptions"
                    style="max-height: 220px"
                  />
                  <div v-else class="chart-empty">No data</div>
                </div>
              </v-col>
            </v-row>

            <!-- ══ GEOGRAPHIC ══════════════════════════════ -->
            <div class="section-label">Geographic Distribution</div>
            <v-row dense class="mb-4">
              <v-col cols="12" md="6">
                <div class="chart-card">
                  <div class="chart-title">
                    <v-icon size="15" color="#3b82f6" style="margin-right: 6px"
                      >mdi-city-variant-outline</v-icon
                    >
                    Submissions by Municipality / City
                  </div>
                  <Bar
                    v-if="municipalityChart.labels.length"
                    :data="municipalityChart"
                    :options="barOptionsH"
                    style="max-height: 300px"
                  />
                  <div v-else class="chart-empty">No data yet</div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="chart-card">
                  <div class="chart-title">
                    <v-icon size="15" color="#10b981" style="margin-right: 6px"
                      >mdi-home-map-marker</v-icon
                    >
                    Submissions by Barangay (Top 10)
                  </div>
                  <Bar
                    v-if="barangayChart.labels.length"
                    :data="barangayChart"
                    :options="barOptionsH"
                    style="max-height: 300px"
                  />
                  <div v-else class="chart-empty">No data yet</div>
                </div>
              </v-col>
            </v-row>
          </template>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Bar, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from 'chart.js'
import Sidebar from '@/components/common/Sidebar.vue'
import { supabase } from '@/services/supabase'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

// ── State ─────────────────────────────────────────────
const drawer = ref(true)
const loading = ref(true)
const responses = ref([])

onMounted(async () => {
  const { data } = await supabase
    .from('responses')
    .select('answers, created_at, respondent_name, enumerator_name, latitude, longitude')
    .order('created_at', { ascending: true })
  if (data) responses.value = data
  loading.value = false
})

// ── Color palette ─────────────────────────────────────
const PALETTE = [
  '#1d4ed8',
  '#3b82f6',
  '#60a5fa',
  '#93c5fd',
  '#10b981',
  '#34d399',
  '#f59e0b',
  '#fbbf24',
  '#ec4899',
  '#8b5cf6',
  '#06b6d4',
  '#f97316',
  '#84cc16',
  '#14b8a6',
  '#a855f7',
  '#ef4444',
]

// ── Helper: count scalar field ────────────────────────
// Handles both old and new field name variants via fallback chain
const countField = (getVal, limit = 10) => {
  const counts = {}
  responses.value.forEach((r) => {
    const val = getVal(r.answers)
    if (val && val !== '' && val !== false && val !== null) {
      const key = String(val)
      counts[key] = (counts[key] || 0) + 1
    }
  })
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
}

// ── Helper: count array field ─────────────────────────
const countArray = (getVal, limit = 12) => {
  const counts = {}
  responses.value.forEach((r) => {
    const arr = getVal(r.answers)
    if (Array.isArray(arr)) {
      arr.forEach((item) => {
        if (item) counts[item] = (counts[item] || 0) + 1
      })
    }
  })
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
}

// ── Helper: build bar chart ───────────────────────────
const makeBar = (entries, color = '#3b82f6', label = 'Count') => ({
  labels: entries.map((e) => e[0]),
  datasets: [
    {
      label,
      data: entries.map((e) => e[1]),
      backgroundColor: color,
      borderRadius: 5,
      borderSkipped: false,
    },
  ],
})

// ── Helper: build doughnut chart ─────────────────────
const makeDoughnut = (entries) => ({
  labels: entries.map((e) => e[0]),
  datasets: [
    {
      data: entries.map((e) => e[1]),
      backgroundColor: PALETTE.slice(0, entries.length),
      borderWidth: 2,
      borderColor: '#ffffff',
    },
  ],
})

// ── Empty chart sentinel ──────────────────────────────
const empty = { labels: [], datasets: [] }

// ══ SUMMARY CARDS ════════════════════════════════════
const summaryCards = computed(() => {
  const now = new Date()
  const thisMonth = responses.value.filter((r) => {
    const d = new Date(r.created_at)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length

  const uniqueCountries = new Set(
    responses.value
      .map((r) => r.answers?.migration?.countryDestination || r.answers?.migration?.country)
      .filter(Boolean),
  ).size

  const femaleOFWs = responses.value.filter((r) => r.answers?.ofwProfile?.sex === 'Female').length

  const highRisk = responses.value.filter(
    (r) => r.answers?.risk?.priorityLevel === 'High / urgent',
  ).length

  return [
    {
      label: 'Total Responses',
      value: responses.value.length,
      icon: 'mdi-clipboard-check-outline',
      color: '#2563eb',
      bg: '#dbeafe',
    },
    {
      label: 'This Month',
      value: thisMonth,
      icon: 'mdi-calendar-month-outline',
      color: '#10b981',
      bg: '#d1fae5',
    },
    {
      label: 'Countries',
      value: uniqueCountries,
      icon: 'mdi-earth',
      color: '#f59e0b',
      bg: '#fef3c7',
    },
    {
      label: 'Female OFWs',
      value: femaleOFWs,
      icon: 'mdi-gender-female',
      color: '#ec4899',
      bg: '#fce7f3',
    },
    {
      label: 'High Priority',
      value: highRisk,
      icon: 'mdi-alert-circle-outline',
      color: '#ef4444',
      bg: '#fee2e2',
    },
    {
      label: 'With GPS',
      value: responses.value.filter((r) => r.latitude).length,
      icon: 'mdi-map-marker-outline',
      color: '#8b5cf6',
      bg: '#ede9fe',
    },
    {
      label: 'Urgent Referral',
      value: responses.value.filter((r) => r.answers?.risk?.needsUrgentReferral === 'Yes').length,
      icon: 'mdi-ambulance',
      color: '#f97316',
      bg: '#ffedd5',
    },
    {
      label: 'Enumerators',
      value: new Set(responses.value.map((r) => r.enumerator_name).filter(Boolean)).size,
      icon: 'mdi-account-tie-outline',
      color: '#06b6d4',
      bg: '#cffafe',
    },
  ]
})

// ══ SURVEY TRENDS ═════════════════════════════════════
const monthlyChart = computed(() => {
  const counts = {}
  responses.value.forEach((r) => {
    const d = new Date(r.created_at)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    counts[key] = (counts[key] || 0) + 1
  })
  const sorted = Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]))
  // Format label for display
  const labels = sorted.map(([k]) => {
    const [y, m] = k.split('-')
    return new Date(+y, +m - 1).toLocaleString('en-PH', { month: 'short', year: '2-digit' })
  })
  return {
    labels,
    datasets: [
      {
        label: 'Submissions',
        data: sorted.map((e) => e[1]),
        backgroundColor: '#3b82f6',
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  }
})

const respondentTypeChart = computed(() =>
  makeDoughnut(countField((a) => a?.general?.typeOfRespondent)),
)

// ══ OFW PROFILE ═══════════════════════════════════════
const sexChart = computed(() => makeDoughnut(countField((a) => a?.ofwProfile?.sex)))
const civilStatusChart = computed(() => makeDoughnut(countField((a) => a?.ofwProfile?.civilStatus)))
const owwaChart = computed(() =>
  // section saves as owwaStatus; old data may have owaStatus
  makeDoughnut(countField((a) => a?.ofwProfile?.owwaStatus || a?.ofwProfile?.owaStatus)),
)
const educationChart = computed(() =>
  // section saves as educationalAttainment; old data may have education
  makeDoughnut(countField((a) => a?.ofwProfile?.educationalAttainment || a?.ofwProfile?.education)),
)

// ══ MIGRATION ══════════════════════════════════════════
const countryChart = computed(() =>
  makeBar(
    countField((a) => a?.migration?.countryDestination || a?.migration?.country, 12),
    '#1d4ed8',
    'OFWs',
  ),
)
const ofwStatusChart = computed(() =>
  makeBar(
    countField((a) => a?.migration?.currentStatus),
    '#3b82f6',
    'Count',
  ),
)
const industryChart = computed(() =>
  makeBar(
    countArray((a) => a?.migration?.industrySector || a?.migration?.industry),
    '#8b5cf6',
    'Count',
  ),
)
const recruitmentChart = computed(() =>
  makeDoughnut(countField((a) => a?.migration?.recruitmentChannel)),
)
const reasonAbroadChart = computed(() =>
  makeBar(
    countArray((a) => a?.migration?.reasonForGoing),
    '#f59e0b',
    'Count',
  ),
)
const documentationChart = computed(() =>
  makeDoughnut(countField((a) => a?.migration?.documentationStatus)),
)

// ══ PRESENT STATUS ════════════════════════════════════
const locationChart = computed(() =>
  makeDoughnut(countField((a) => a?.presentStatus?.presentLocation)),
)
const planningAbroadChart = computed(() =>
  makeDoughnut(
    countField(
      (a) => a?.presentStatus?.planningToGoAbroad || a?.presentStatus?.planningToGoAbroadAgain,
    ),
  ),
)

// ══ SOCIO-ECONOMIC ════════════════════════════════════
const housingChart = computed(() =>
  // section saves as housingUnit; old data may have housingType
  makeDoughnut(countField((a) => a?.socioEconomic?.housingUnit || a?.socioEconomic?.housingType)),
)
const incomeChart = computed(() =>
  // section saves as averageMonthlyIncome; old data may have avgMonthlyIncome
  makeBar(
    countField((a) => a?.socioEconomic?.averageMonthlyIncome || a?.socioEconomic?.avgMonthlyIncome),
    '#8b5cf6',
    'Households',
  ),
)
const remittanceChart = computed(() =>
  makeBar(
    countArray((a) => {
      const v = a?.socioEconomic?.monthlyRemittance
      return Array.isArray(v) ? v : v ? [v] : null
    }),
    '#06b6d4',
    'Count',
  ),
)
const incomeSourceChart = computed(() =>
  makeBar(
    countArray((a) => {
      const v = a?.socioEconomic?.primaryIncomeSource
      return Array.isArray(v) ? v : v ? [v] : null
    }),
    '#3b82f6',
    'Count',
  ),
)
const remittanceUsesChart = computed(() =>
  makeBar(
    countArray((a) => a?.socioEconomic?.remittanceUses),
    '#10b981',
    'Count',
  ),
)

// ══ NEEDS & ASSISTANCE ════════════════════════════════
const assistanceChart = computed(() =>
  makeBar(
    countArray((a) => a?.needs?.immediateAssistance),
    '#10b981',
    'Count',
  ),
)
const skillsChart = computed(() =>
  makeBar(
    countArray((a) => a?.needs?.preferredSkillsTraining),
    '#f59e0b',
    'Count',
  ),
)
const receivedAssistanceChart = computed(() =>
  makeBar(
    countArray((a) => a?.assistance?.receivedAssistanceFrom || a?.assistance?.receivedFrom),
    '#8b5cf6',
    'Count',
  ),
)
const typeAssistanceChart = computed(() =>
  makeBar(
    countArray((a) => a?.assistance?.typeOfAssistance),
    '#06b6d4',
    'Count',
  ),
)

// ══ PROBLEMS & RISK ═══════════════════════════════════
const majorProblemsChart = computed(() =>
  makeBar(
    countArray((a) => a?.problems?.majorProblems),
    '#ef4444',
    'Count',
  ),
)
const priorityChart = computed(() => {
  const entries = countField((a) => a?.risk?.priorityLevel)
  // colour-code by severity
  const colors = entries.map(([label]) =>
    label === 'High / urgent' ? '#ef4444' : label === 'Medium' ? '#f59e0b' : '#10b981',
  )
  return {
    labels: entries.map((e) => e[0]),
    datasets: [
      {
        data: entries.map((e) => e[1]),
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  }
})
const ongoingCasesChart = computed(() =>
  makeBar(
    countArray((a) => a?.risk?.ongoingCase),
    '#ef4444',
    'Count',
  ),
)
const reintegrationPlanChart = computed(() =>
  makeDoughnut(
    countField((a) => a?.reintegration?.hasReintegrationPlan || a?.reintegration?.hasPlan),
  ),
)

// ══ LIVELIHOOD & COMMUNITY ════════════════════════════
const preferredLivelihoodChart = computed(() =>
  makeBar(
    countArray((a) => a?.livelihood?.preferredLivelihood),
    '#10b981',
    'Count',
  ),
)
const communityGroupChart = computed(() =>
  makeBar(
    countArray((a) => a?.community?.communityGroups || a?.community?.memberOfGroups),
    '#3b82f6',
    'Count',
  ),
)

// ══ ENUMERATOR ASSESSMENT ═════════════════════════════
const socioStatusChart = computed(() =>
  makeDoughnut(countField((a) => a?.enumerator?.socioEconomicStatus)),
)
const housingConditionChart = computed(() =>
  makeDoughnut(countField((a) => a?.enumerator?.housingCondition)),
)
const familyFunctioningChart = computed(() =>
  makeDoughnut(countField((a) => a?.enumerator?.familyFunctioning)),
)

// ══ GEOGRAPHIC ════════════════════════════════════════
const municipalityChart = computed(() =>
  makeBar(
    countField((a) => a?.general?.municipalityCity, 15),
    '#3b82f6',
    'Submissions',
  ),
)
const barangayChart = computed(() =>
  makeBar(
    countField((a) => a?.general?.barangay, 10),
    '#10b981',
    'Submissions',
  ),
)

// ══ CHART OPTIONS ════════════════════════════════════
const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: { font: { size: 11 }, padding: 10, boxWidth: 12 },
    },
  },
}

const barOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: { legend: { display: false } },
  scales: {
    y: { beginAtZero: true, ticks: { precision: 0, font: { size: 11 } } },
    x: { ticks: { font: { size: 10 } } },
  },
}

const barOptionsH = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: true,
  plugins: { legend: { display: false } },
  scales: {
    x: { beginAtZero: true, ticks: { precision: 0, font: { size: 11 } } },
    y: { ticks: { font: { size: 10 } } },
  },
}
</script>

<style scoped>
.reports-layout {
  min-height: 100vh;
  background: #f5f4f0;
}

/* ── TOP RAIL ── */
.progress-rail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: linear-gradient(135deg, #1d4ed8, #2563eb, #3b82f6);
  box-shadow: 0 4px 18px rgba(37, 99, 235, 0.25);
  min-height: 52px;
}
.progress-rail-inner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  min-height: 52px;
}
.rail-title-block {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
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
.rail-sep {
  color: rgba(255, 255, 255, 0.4);
  font-size: 13px;
  flex-shrink: 0;
}
.rail-sub {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.75);
  white-space: nowrap;
  flex-shrink: 0;
}

/* ── BODY ── */
.reports-body {
  padding: 72px 28px 56px;
  max-width: 1280px;
  margin: 0 auto;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  min-height: 60vh;
  color: #6b7fa8;
  font-size: 13px;
}

/* ── SECTION LABEL ── */
.section-label {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #6b7fa8;
  margin-bottom: 10px;
  margin-top: 8px;
  padding-left: 2px;
  border-left: 3px solid #3b82f6;
  padding-left: 10px;
}

/* ── STAT CARDS ── */
.stat-card {
  background: #ffffff;
  border-radius: 14px;
  padding: 16px 14px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
}
.stat-icon-wrap {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.stat-value {
  font-size: 26px;
  font-weight: 900;
  color: #0f2a5e;
  line-height: 1;
}
.stat-label {
  font-size: 10.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6b7fa8;
  line-height: 1.3;
}

/* ── CHART CARDS ── */
.chart-card {
  background: #ffffff;
  border-radius: 14px;
  padding: 18px 18px 14px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  height: 100%;
}
.chart-title {
  font-size: 12.5px;
  font-weight: 700;
  color: #0f2a5e;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  line-height: 1.4;
}
.chart-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  font-size: 13px;
  color: #9ca3af;
  font-style: italic;
}

/* ── MOBILE ── */
@media (max-width: 600px) {
  .reports-body {
    padding: 68px 14px 40px;
  }
  .stat-value {
    font-size: 20px;
  }
}
</style>
