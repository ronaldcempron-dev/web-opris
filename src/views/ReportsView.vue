<template>
  <v-app theme="light" style="background: #f5f4f0">
    <Sidebar v-model="drawer" />

    <v-main>
      <div class="reports-layout">
        <!-- Top Rail (same style as SurveyView) -->
        <div class="progress-rail">
          <div class="progress-rail-inner">
            <v-btn icon variant="text" size="small" color="white" @click="drawer = !drawer">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
            <div class="rail-title-block">
              <span class="rail-title">OFW Profiling and Reintegration Information System</span>
              <span class="rail-sub">Reports &amp; Analytics</span>
            </div>
          </div>
        </div>

        <!-- Body -->
        <div class="reports-body">
          <!-- Loading state -->
          <div v-if="loading" class="loading-state">
            <v-progress-circular indeterminate color="primary" size="40" />
            <p>Loading data…</p>
          </div>

          <template v-else>
            <!-- ── SUMMARY CARDS ── -->
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

            <!-- ── ROW 1: Submissions over time + OFW Status ── -->
            <div class="section-label">Survey Trends</div>
            <v-row dense class="mb-4">
              <v-col cols="12" md="7">
                <div class="chart-card">
                  <div class="chart-title">
                    <v-icon size="15" color="#3b82f6" style="margin-right: 6px"
                      >mdi-chart-line</v-icon
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
              <v-col cols="12" md="5">
                <div class="chart-card">
                  <div class="chart-title">
                    <v-icon size="15" color="#3b82f6" style="margin-right: 6px"
                      >mdi-account-group</v-icon
                    >
                    Respondent Type
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

            <!-- ── ROW 2: OFW Profile ── -->
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

            <!-- ── ROW 3: Migration ── -->
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
                    style="max-height: 280px"
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
                    style="max-height: 280px"
                  />
                  <div v-else class="chart-empty">No data yet</div>
                </div>
              </v-col>
            </v-row>

            <!-- ── ROW 4: Needs & Assistance ── -->
            <div class="section-label">Needs & Assistance</div>
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
                    style="max-height: 320px"
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
                    style="max-height: 320px"
                  />
                  <div v-else class="chart-empty">No data yet</div>
                </div>
              </v-col>
            </v-row>

            <!-- ── ROW 5: Socio-Economic ── -->
            <div class="section-label">Socio-Economic</div>
            <v-row dense class="mb-4">
              <v-col cols="12" sm="6" md="4">
                <div class="chart-card">
                  <div class="chart-title">Housing Type</div>
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
                  <div class="chart-title">Primary Income Source</div>
                  <Doughnut
                    v-if="incomeSourceChart.labels.length"
                    :data="incomeSourceChart"
                    :options="doughnutOptions"
                    style="max-height: 220px"
                  />
                  <div v-else class="chart-empty">No data</div>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="chart-card">
                  <div class="chart-title">Monthly Income Range</div>
                  <Bar
                    v-if="incomeChart.labels.length"
                    :data="incomeChart"
                    :options="barOptions"
                    style="max-height: 220px"
                  />
                  <div v-else class="chart-empty">No data</div>
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

// ── Data ──────────────────────────────────────────────
const drawer = ref(true)
const loading = ref(true)
const responses = ref([]) // raw rows from Supabase

onMounted(async () => {
  const { data, error } = await supabase
    .from('responses')
    .select('answers, created_at, respondent_name, enumerator_name, latitude, longitude')
    .order('created_at', { ascending: true })

  if (data) responses.value = data
  loading.value = false
})

// ── Palette ───────────────────────────────────────────
const PALETTE = [
  '#1d4ed8',
  '#3b82f6',
  '#60a5fa',
  '#10b981',
  '#f59e0b',
  '#ec4899',
  '#8b5cf6',
  '#06b6d4',
  '#f97316',
  '#84cc16',
  '#14b8a6',
  '#a855f7',
]

// ── Helper: count occurrences of a scalar field ───────
// path is like 'ofwProfile.sex'  or  'general.typeOfRespondent'
const countField = (path, limit = 10) => {
  const [section, field] = path.split('.')
  const counts = {}
  responses.value.forEach((r) => {
    const val = r.answers?.[section]?.[field]
    if (val && val !== '') counts[val] = (counts[val] || 0) + 1
  })
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
}

// ── Helper: count items in an array field ─────────────
const countArray = (path, limit = 10) => {
  const [section, field] = path.split('.')
  const counts = {}
  responses.value.forEach((r) => {
    const arr = r.answers?.[section]?.[field]
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

// ── Helper: build chart data object ──────────────────
const makeBar = (entries, color = '#3b82f6', label = 'Count') => ({
  labels: entries.map((e) => e[0]),
  datasets: [
    {
      label,
      data: entries.map((e) => e[1]),
      backgroundColor: color,
      borderRadius: 6,
      borderSkipped: false,
    },
  ],
})

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

// ── Summary Cards ─────────────────────────────────────
const summaryCards = computed(() => {
  const now = new Date()
  const thisMonth = responses.value.filter((r) => {
    const d = new Date(r.created_at)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length

  const uniqueCountries = new Set(
    responses.value.map((r) => r.answers?.migration?.country).filter(Boolean),
  ).size

  const femaleCount = responses.value.filter((r) => r.answers?.ofwProfile?.sex === 'Female').length

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
      value: femaleCount,
      icon: 'mdi-gender-female',
      color: '#ec4899',
      bg: '#fce7f3',
    },
  ]
})

// ── Monthly Submissions ───────────────────────────────
const monthlyChart = computed(() => {
  const counts = {}
  responses.value.forEach((r) => {
    const d = new Date(r.created_at)
    const key = d.toLocaleString('en-PH', { month: 'short', year: '2-digit' })
    counts[key] = (counts[key] || 0) + 1
  })
  const sorted = Object.entries(counts)
  return {
    labels: sorted.map((e) => e[0]),
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

// ── Respondent Type (general.typeOfRespondent) ────────
const respondentTypeChart = computed(() => makeDoughnut(countField('general.typeOfRespondent')))

// ── OFW Profile ───────────────────────────────────────
const sexChart = computed(() => makeDoughnut(countField('ofwProfile.sex')))
const civilStatusChart = computed(() => makeDoughnut(countField('ofwProfile.civilStatus')))
const owwaChart = computed(() => makeDoughnut(countField('ofwProfile.owaStatus')))
const educationChart = computed(() => makeDoughnut(countField('ofwProfile.education')))

// ── Migration ─────────────────────────────────────────
const countryChart = computed(() => makeBar(countField('migration.country', 10), '#2563eb', 'OFWs'))
const ofwStatusChart = computed(() =>
  makeBar(countField('migration.currentStatus'), '#3b82f6', 'Count'),
)

// ── Needs ─────────────────────────────────────────────
const assistanceChart = computed(() =>
  makeBar(countArray('needs.immediateAssistance'), '#10b981', 'Count'),
)
const skillsChart = computed(() =>
  makeBar(countArray('needs.preferredSkillsTraining'), '#f59e0b', 'Count'),
)

// ── Socio-Economic ────────────────────────────────────
const housingChart = computed(() => makeDoughnut(countField('socioEconomic.housingType')))
const incomeSourceChart = computed(() =>
  makeDoughnut(countField('socioEconomic.primaryIncomeSource')),
)
const incomeChart = computed(() =>
  makeBar(countField('socioEconomic.avgMonthlyIncome'), '#8b5cf6', 'Households'),
)

// ── Chart Options ─────────────────────────────────────
const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 12 } },
  },
}

const barOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: { legend: { display: false } },
  scales: {
    y: { beginAtZero: true, ticks: { precision: 0 } },
    x: { ticks: { font: { size: 11 } } },
  },
}

const barOptionsH = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: true,
  plugins: { legend: { display: false } },
  scales: {
    x: { beginAtZero: true, ticks: { precision: 0 } },
    y: { ticks: { font: { size: 11 } } },
  },
}
</script>

<style scoped>
.reports-layout {
  min-height: 100vh;
  background: #f5f4f0;
}

/* ── TOP RAIL (matching SurveyView) ── */
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
  align-items: baseline;
  gap: 8px;
}

.rail-title {
  font-size: 13px;
  font-weight: 700;
  color: white;
}

.rail-sub {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.75);
}

/* ── BODY ── */
.reports-body {
  padding: 72px 28px 48px;
  max-width: 1200px;
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
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #6b7fa8;
  margin-bottom: 10px;
  margin-top: 4px;
  padding-left: 2px;
}

/* ── STAT CARDS ── */
.stat-card {
  background: #ffffff;
  border-radius: 14px;
  padding: 18px 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-icon-wrap {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-value {
  font-size: 28px;
  font-weight: 900;
  color: #0f2a5e;
  line-height: 1;
}

.stat-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6b7fa8;
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
    font-size: 22px;
  }
}
</style>
