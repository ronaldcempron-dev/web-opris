<!-- src/views/DashboardView.vue -->
<template>
  <v-app theme="light" style="background: #f5f4f0">
    <Sidebar v-model="drawer" />

    <v-main>
      <div class="dashboard-layout">
        <!-- ── TOP RAIL ── -->
        <div class="progress-rail">
          <div class="progress-rail-inner">
            <v-btn icon variant="text" size="small" color="white" @click="drawer = !drawer">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
            <div class="rail-title-block">
              <span class="rail-title">OFW Profiling and Reintegration Information System</span>
              <span class="rail-sep">·</span>
              <span class="rail-sub">Dashboard</span>
            </div>
          </div>
        </div>

        <!-- ── BODY ── -->
        <div class="dashboard-body">
          <!-- ── WELCOME HEADER ── -->
          <div class="welcome-card">
            <div class="welcome-left">
              <div class="welcome-eyebrow">{{ greeting }}</div>
              <h1 class="welcome-title">{{ firstName }}!</h1>
              <p class="welcome-sub">
                Ready to continue your fieldwork? You've submitted
                <strong>{{ stats.total }}</strong> profiling
                {{ stats.total === 1 ? 'survey' : 'surveys' }} so far.
              </p>
              <button class="start-survey-btn" @click="router.push('/survey')">
                <v-icon size="17" style="margin-right: 8px">mdi-plus-circle-outline</v-icon>
                Start New Survey
              </button>
            </div>
            <div class="welcome-icon-wrap">
              <v-icon size="64" color="rgba(255,255,255,0.18)"
                >mdi-clipboard-account-outline</v-icon
              >
            </div>
          </div>

          <!-- ── STATS ── -->
          <div class="section-label">Your Activity</div>
          <v-row dense class="mb-5">
            <v-col cols="6" sm="3">
              <div class="stat-card">
                <div class="stat-icon-wrap" style="background: #dbeafe">
                  <v-icon color="#2563eb" size="20">mdi-clipboard-check-outline</v-icon>
                </div>
                <div class="stat-value">{{ stats.total }}</div>
                <div class="stat-label">Total Submitted</div>
              </div>
            </v-col>
            <v-col cols="6" sm="3">
              <div class="stat-card">
                <div class="stat-icon-wrap" style="background: #d1fae5">
                  <v-icon color="#10b981" size="20">mdi-calendar-week-outline</v-icon>
                </div>
                <div class="stat-value">{{ stats.thisWeek }}</div>
                <div class="stat-label">This Week</div>
              </div>
            </v-col>
            <v-col cols="6" sm="3">
              <div class="stat-card">
                <div class="stat-icon-wrap" style="background: #fef3c7">
                  <v-icon color="#f59e0b" size="20">mdi-calendar-month-outline</v-icon>
                </div>
                <div class="stat-value">{{ stats.thisMonth }}</div>
                <div class="stat-label">This Month</div>
              </div>
            </v-col>
            <v-col cols="6" sm="3">
              <div class="stat-card">
                <div class="stat-icon-wrap" style="background: #ede9fe">
                  <v-icon color="#8b5cf6" size="20">mdi-clock-outline</v-icon>
                </div>
                <div class="stat-value stat-value--small">{{ stats.lastSubmission }}</div>
                <div class="stat-label">Last Submission</div>
              </div>
            </v-col>
          </v-row>

          <v-row dense>
            <!-- ── RECENT SUBMISSIONS ── -->
            <v-col cols="12" md="7">
              <div class="section-label">Your Recent Submissions</div>
              <div class="panel">
                <div v-if="loading" class="panel-empty">
                  <v-progress-circular indeterminate color="#3b82f6" size="32" width="3" />
                  <span>Loading your submissions…</span>
                </div>

                <div v-else-if="myResponses.length === 0" class="panel-empty">
                  <v-icon size="36" color="#9ca3af">mdi-inbox-outline</v-icon>
                  <span>You haven't submitted any surveys yet.</span>
                  <button
                    class="start-survey-btn start-survey-btn--small"
                    @click="router.push('/survey')"
                  >
                    Start Your First Survey
                  </button>
                </div>

                <div v-else class="submission-list">
                  <button
                    v-for="item in recentResponses"
                    :key="item.id"
                    class="submission-item"
                    @click="viewReport(item)"
                  >
                    <div class="submission-avatar">
                      {{ avatarInitial(item.respondent_name) }}
                    </div>
                    <div class="submission-info">
                      <div class="submission-name">
                        {{ item.respondent_name || 'Unnamed Respondent' }}
                      </div>
                      <div class="submission-meta">
                        <v-icon size="12" style="margin-right: 3px">mdi-calendar-outline</v-icon>
                        {{ formatDate(item.created_at) }}
                        <span v-if="item.answers?.general?.barangay" class="submission-sep">·</span>
                        <span v-if="item.answers?.general?.barangay">
                          {{ item.answers.general.barangay }}
                        </span>
                      </div>
                    </div>
                    <v-icon size="16" color="#bfdbfe">mdi-chevron-right</v-icon>
                  </button>
                </div>

                <div v-if="myResponses.length > 6" class="panel-footer">
                  Showing 6 most recent of {{ myResponses.length }} total submissions
                </div>
              </div>
            </v-col>

            <!-- ── QUICK TIPS / LINKS ── -->
            <v-col cols="12" md="5">
              <div class="section-label">Quick Tips</div>
              <div class="panel tips-panel">
                <div class="tip-item">
                  <div class="tip-icon">
                    <v-icon size="16" color="#1d4ed8">mdi-crosshairs-gps</v-icon>
                  </div>
                  <div class="tip-text">
                    <strong>Capture GPS first.</strong> Always tap "Capture Location" while at the
                    respondent's home before filling out the form.
                  </div>
                </div>
                <div class="tip-item">
                  <div class="tip-icon">
                    <v-icon size="16" color="#1d4ed8">mdi-content-save-check-outline</v-icon>
                  </div>
                  <div class="tip-text">
                    <strong>Double-check before submitting.</strong> Once submitted, you'll need an
                    admin to edit or delete the entry.
                  </div>
                </div>
                <div class="tip-item">
                  <div class="tip-icon">
                    <v-icon size="16" color="#1d4ed8">mdi-draw-pen</v-icon>
                  </div>
                  <div class="tip-text">
                    <strong>Both signatures are required.</strong> Section 20 needs the respondent's
                    and your own signature before submission.
                  </div>
                </div>
                <div class="tip-item">
                  <div class="tip-icon"><v-icon size="16" color="#1d4ed8">mdi-magnify</v-icon></div>
                  <div class="tip-text">
                    <strong>Avoid duplicates.</strong> If you've already surveyed this household,
                    check your recent submissions list first.
                  </div>
                </div>

                <div class="tips-divider" />

                <button
                  class="start-survey-btn start-survey-btn--full"
                  @click="router.push('/survey')"
                >
                  <v-icon size="16" style="margin-right: 8px">mdi-plus-circle-outline</v-icon>
                  Start New Survey
                </button>
              </div>
            </v-col>
          </v-row>

          <div style="height: 40px" />
        </div>
      </div>
    </v-main>

    <!-- ─── READ-ONLY REPORT MODAL ─── -->
    <v-dialog v-model="reportDialog" max-width="1100" scrollable>
      <div v-if="selectedResponse" class="modal-card">
        <div class="modal-header">
          <div class="modal-header-left">
            <div class="modal-icon-wrap">
              <v-icon size="20" color="white">mdi-file-document-outline</v-icon>
            </div>
            <div>
              <div class="modal-title">Your Submitted Report</div>
              <div class="modal-sub">
                {{ selectedResponse.respondent_name || 'Unnamed' }}
                <span class="modal-sub-sep">·</span>
                {{ formatDate(selectedResponse.created_at) }}
              </div>
            </div>
          </div>
          <button class="modal-close" @click="reportDialog = false">
            <v-icon size="18">mdi-close</v-icon>
          </button>
        </div>

        <div class="modal-body">
          <div class="readonly-banner">
            <v-icon size="14" style="margin-right: 6px">mdi-lock-outline</v-icon>
            This is a read-only view. Contact your administrator if changes are needed.
          </div>
          <ReportDetailView :response="selectedResponse" />
        </div>

        <div class="modal-footer">
          <button class="btn btn-outline" @click="reportDialog = false">Close</button>
        </div>
      </div>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/services/supabase'
import { useAuthStore } from '@/stores/auth'
import Sidebar from '@/components/common/Sidebar.vue'
import ReportDetailView from '@/components/responses/ReportDetailView.vue'

const router = useRouter()
const auth = useAuthStore()

const drawer = ref(true)
const loading = ref(true)
const myResponses = ref([])

const reportDialog = ref(false)
const selectedResponse = ref(null)

// ── Greeting ──────────────────────────────────────────
const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning,'
  if (hour < 18) return 'Good afternoon,'
  return 'Good evening,'
})

const firstName = computed(() => {
  const name = auth.profile?.full_name || 'Enumerator'
  return name.split(' ')[0]
})

// ── Fetch only this enumerator's own submissions ──────
const fetchMyResponses = async () => {
  loading.value = true
  const myName = auth.profile?.full_name?.trim()

  const { data } = await supabase
    .from('responses')
    .select('*')
    .order('created_at', { ascending: false })

  if (data) {
    // Filter client-side: match by enumerator_name column (case-insensitive)
    myResponses.value = data.filter(
      (r) => r.enumerator_name?.trim().toLowerCase() === myName?.toLowerCase(),
    )
  }
  loading.value = false
}

onMounted(fetchMyResponses)

const recentResponses = computed(() => myResponses.value.slice(0, 6))

// ── Stats ─────────────────────────────────────────────
const stats = computed(() => {
  const now = new Date()
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay())
  startOfWeek.setHours(0, 0, 0, 0)

  const thisWeek = myResponses.value.filter((r) => new Date(r.created_at) >= startOfWeek).length

  const thisMonth = myResponses.value.filter((r) => {
    const d = new Date(r.created_at)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length

  const lastSubmission = myResponses.value.length
    ? formatRelative(myResponses.value[0].created_at)
    : '—'

  return {
    total: myResponses.value.length,
    thisWeek,
    thisMonth,
    lastSubmission,
  }
})

// ── Helpers ───────────────────────────────────────────
const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })

const formatRelative = (date) => {
  const diffMs = Date.now() - new Date(date).getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(date)
}

const avatarInitial = (name) => (name || '?')[0].toUpperCase()

const viewReport = (item) => {
  selectedResponse.value = item
  reportDialog.value = true
}
</script>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  background: #f5f4f0;
}

/* ── TOP RAIL ── */
.progress-rail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 110;
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
.rail-sep {
  color: rgba(255, 255, 255, 0.4);
  font-size: 13px;
}
.rail-sub {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.75);
}

/* ── BODY ── */
.dashboard-body {
  padding: 72px 28px 0;
  max-width: 1100px;
  margin: 0 auto;
}

/* ── WELCOME CARD ── */
.welcome-card {
  background: linear-gradient(135deg, #0f2a5e, #1d4ed8, #3b82f6);
  border-radius: 20px;
  padding: 32px 36px;
  margin-bottom: 28px;
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  box-shadow: 0 8px 30px rgba(29, 78, 216, 0.25);
  position: relative;
  overflow: hidden;
}
.welcome-left {
  position: relative;
  z-index: 2;
}
.welcome-eyebrow {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 4px;
}
.welcome-title {
  font-size: 28px;
  font-weight: 900;
  color: white;
  margin: 0 0 10px;
  line-height: 1.2;
}
.welcome-sub {
  font-size: 13.5px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0 0 20px;
  line-height: 1.6;
  max-width: 480px;
}
.welcome-sub strong {
  color: #ffffff;
  font-weight: 800;
}
.welcome-icon-wrap {
  flex-shrink: 0;
  z-index: 1;
}

.start-survey-btn {
  display: inline-flex;
  align-items: center;
  background: #ffffff;
  color: #1d4ed8;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 13.5px;
  font-weight: 800;
  font-family: inherit;
  cursor: pointer;
  transition:
    opacity 0.15s,
    transform 0.1s;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
}
.start-survey-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
.start-survey-btn--small {
  margin-top: 12px;
  background: #1d4ed8;
  color: white;
  font-size: 12.5px;
  padding: 9px 18px;
}
.start-survey-btn--full {
  width: 100%;
  justify-content: center;
  background: #1d4ed8;
  color: white;
}

/* ── SECTION LABEL ── */
.section-label {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #6b7fa8;
  margin-bottom: 10px;
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
.stat-value--small {
  font-size: 16px;
}
.stat-label {
  font-size: 10.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6b7fa8;
}

/* ── PANEL ── */
.panel {
  background: #ffffff;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}
.panel-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 48px 24px;
  color: #9ca3af;
  font-size: 13px;
  text-align: center;
}

/* ── SUBMISSION LIST ── */
.submission-list {
  display: flex;
  flex-direction: column;
}
.submission-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 13px 18px;
  border: none;
  border-bottom: 1px solid #f3f4f6;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  transition: background 0.14s;
}
.submission-item:last-child {
  border-bottom: none;
}
.submission-item:hover {
  background: #f8faff;
}
.submission-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #dbeafe;
  color: #1d4ed8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 800;
  flex-shrink: 0;
}
.submission-info {
  flex: 1;
  min-width: 0;
}
.submission-name {
  font-size: 13px;
  font-weight: 700;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.submission-meta {
  font-size: 11px;
  color: #9ca3af;
  display: flex;
  align-items: center;
  margin-top: 2px;
}
.submission-sep {
  margin: 0 4px;
  color: #d1d5db;
}
.panel-footer {
  padding: 10px 18px;
  font-size: 11px;
  color: #9ca3af;
  text-align: center;
  border-top: 1px solid #f3f4f6;
  background: #fafbff;
}

/* ── TIPS PANEL ── */
.tips-panel {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.tip-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.tip-icon {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: #eff6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.tip-text {
  font-size: 12.5px;
  color: #374151;
  line-height: 1.6;
}
.tip-text strong {
  color: #0f2a5e;
}
.tips-divider {
  height: 1px;
  background: #f0f0f0;
  margin: 2px 0;
}

/* ── READ-ONLY MODAL ── */
.modal-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 28px;
  background: #3b82f6;
  flex-shrink: 0;
}
.modal-header-left {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}
.modal-icon-wrap {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.modal-title {
  font-size: 16px;
  font-weight: 800;
  color: white;
  line-height: 1.2;
}
.modal-sub {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 3px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.modal-sub-sep {
  color: rgba(255, 255, 255, 0.25);
}
.modal-close {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition:
    background 0.14s,
    color 0.14s;
}
.modal-close:hover {
  background: rgba(255, 255, 255, 0.15);
  color: white;
}
.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 28px;
  background: #f5f4f0;
  scrollbar-width: thin;
  scrollbar-color: #d1daea transparent;
}
.modal-body::-webkit-scrollbar {
  width: 5px;
}
.modal-body::-webkit-scrollbar-thumb {
  background: #d1daea;
  border-radius: 4px;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 28px;
  border-top: 1px solid #eef1f8;
  background: #fafbff;
  flex-shrink: 0;
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  font-family: inherit;
  padding: 9px 20px;
  cursor: pointer;
  border: none;
}
.btn-outline {
  background: white;
  border: 1.5px solid #e5e7eb;
  color: #374151;
}
.btn-outline:hover {
  border-color: #9ca3af;
  background: #f9fafb;
}

.readonly-banner {
  display: flex;
  align-items: center;
  background: #fffbeb;
  border: 1.5px solid #fde68a;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 12px;
  color: #92400e;
  margin-bottom: 18px;
}

/* ── MOBILE ── */
@media (max-width: 768px) {
  .dashboard-body {
    padding: 56px 16px 0;
  }
  .welcome-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 24px 20px;
  }
  .welcome-icon-wrap {
    display: none;
  }
  .welcome-title {
    font-size: 22px;
  }
}
</style>
