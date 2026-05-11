<!-- ResponseView.vue -->
<template>
  <v-app theme="light" style="background: #f5f4f0">
    <!-- Shared Sidebar -->
    <Sidebar v-model="drawer" :show-responses-list="true" @select="viewFullReport" />

    <v-main style="background: #f5f4f0">
      <div class="responses-layout">
        <!-- ─── STICKY TOP RAIL ─── -->
        <div class="progress-rail">
          <div class="progress-rail-inner">
            <v-btn icon variant="text" size="small" @click="drawer = !drawer" class="rail-menu-btn">
              <v-icon>mdi-menu</v-icon>
            </v-btn>

            <div class="rail-title-block">
              <span class="rail-title">OFW Profiling and Reintegation Information System</span>
              <span class="rail-divider">·</span>
              <span class="rail-sub">Responses</span>
            </div>

            <v-spacer />

            <button class="rail-refresh-btn" @click="fetchResponses" :disabled="loading">
              <v-icon size="15" style="margin-right: 5px">mdi-refresh</v-icon>
              {{ loading ? 'Loading…' : 'Refresh' }}
            </button>
          </div>
        </div>

        <!-- ─── MAIN BODY ─── -->
        <div class="responses-body">
          <!-- Page heading -->
          <div class="page-heading">
            <div class="page-heading-left">
              <div class="page-eyebrow">Data Management</div>
              <h1 class="page-title">Submitted Responses</h1>
              <p class="page-sub">View and manage all OFW family profiling submissions.</p>
            </div>
            <div class="page-stats">
              <div class="stat-card">
                <div class="stat-num">{{ responses.length }}</div>
                <div class="stat-label">Total Entries</div>
              </div>
              <div class="stat-card">
                <div class="stat-num">{{ filteredResponses.length }}</div>
                <div class="stat-label">Showing</div>
              </div>
            </div>
          </div>

          <!-- ─── TABLE PANEL ─── -->
          <div class="table-panel">
            <!-- Panel header -->
            <div class="panel-header">
              <div class="panel-header-left">
                <v-icon size="18" color="rgba(255,255,255,0.85)">mdi-table-large</v-icon>
                <span class="panel-title">All Submissions</span>
              </div>

              <!-- Search -->
              <div class="search-wrap">
                <v-icon size="16" class="search-icon">mdi-magnify</v-icon>
                <input
                  v-model="search"
                  class="search-input"
                  placeholder="Search respondent or enumerator…"
                />
                <button v-if="search" class="search-clear" @click="search = ''">
                  <v-icon size="14">mdi-close</v-icon>
                </button>
              </div>
            </div>

            <!-- Table -->
            <div class="table-wrap">
              <!-- Loading state -->
              <div v-if="loading" class="table-empty">
                <v-progress-circular indeterminate color="#3b82f6" size="36" width="3" />
                <span class="table-empty-text">Loading responses…</span>
              </div>

              <!-- Empty state -->
              <div v-else-if="filteredResponses.length === 0" class="table-empty">
                <v-icon size="40" color="#6b7fa8">mdi-inbox-outline</v-icon>
                <span class="table-empty-text">No responses found.</span>
              </div>

              <!-- Data table -->
              <table v-else class="data-table">
                <thead>
                  <tr>
                    <th class="th">#</th>
                    <th class="th">Date Submitted</th>
                    <th class="th">Respondent</th>
                    <th class="th">Enumerator</th>
                    <th class="th">GPS</th>
                    <th class="th th--action">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, idx) in paginatedResponses"
                    :key="item.id"
                    class="tr"
                    @click="viewFullReport(item)"
                  >
                    <td class="td td--num">{{ (currentPage - 1) * perPage + idx + 1 }}</td>
                    <td class="td">
                      <div class="date-main">{{ formatDateShort(item.created_at) }}</div>
                      <div class="date-time">{{ formatTime(item.created_at) }}</div>
                    </td>
                    <td class="td">
                      <span class="respondent-name">{{ item.respondent_name || '—' }}</span>
                    </td>
                    <td class="td td--muted">{{ item.enumerator_name || '—' }}</td>
                    <td class="td td--muted">
                      <button
                        v-if="item.latitude"
                        class="gps-badge gps-badge--btn"
                        @click.stop="openMap(item)"
                        title="Click to view on map"
                      >
                        <v-icon size="12">mdi-map-marker</v-icon>
                        {{ item.latitude?.toFixed(3) }}, {{ item.longitude?.toFixed(3) }}
                      </button>
                      <span v-else class="td--empty">—</span>
                    </td>
                    <td class="td td--action" @click.stop>
                      <button
                        class="view-btn"
                        @click="viewFullReport(item)"
                        title="View full profile"
                      >
                        <v-icon size="13" style="margin-right: 4px">mdi-eye-outline</v-icon>
                        View Full Profile
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="pagination">
              <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">
                <v-icon size="16">mdi-chevron-left</v-icon>
              </button>

              <span
                v-for="p in totalPages"
                :key="p"
                class="page-num"
                :class="{ active: p === currentPage }"
                @click="currentPage = p"
                >{{ p }}</span
              >

              <button
                class="page-btn"
                :disabled="currentPage === totalPages"
                @click="currentPage++"
              >
                <v-icon size="16">mdi-chevron-right</v-icon>
              </button>
            </div>
          </div>
          <!-- /table-panel -->

          <div style="height: 48px" />
        </div>
        <!-- /responses-body -->
      </div>
    </v-main>

    <!-- ─── FULL REPORT MODAL ─── -->
    <v-dialog v-model="reportDialog" max-width="1100" scrollable>
      <div v-if="selectedResponse" class="modal-card">
        <div class="modal-header">
          <div class="modal-header-left">
            <div class="modal-icon-wrap">
              <v-icon size="20" color="white">mdi-file-document-outline</v-icon>
            </div>
            <div>
              <div class="modal-title">Full OFW Profiling Report</div>
              <div class="modal-sub">
                {{ selectedResponse.respondent_name || 'Unnamed' }}
                <span class="modal-sub-sep">·</span>
                {{ formatDateShort(selectedResponse.created_at) }}
              </div>
            </div>
          </div>
          <button class="modal-close" @click="reportDialog = false">
            <v-icon size="18">mdi-close</v-icon>
          </button>
        </div>

        <div class="modal-body">
          <ReportDetailView :response="selectedResponse" />
        </div>

        <div class="modal-footer">
          <button class="btn btn-outline" @click="reportDialog = false">Close</button>
        </div>
      </div>
    </v-dialog>

    <!-- ─── MAP MODAL ─── -->
    <v-dialog v-model="mapDialog" max-width="700">
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-header-left">
            <div class="modal-icon-wrap">
              <v-icon size="20" color="white">mdi-map-marker</v-icon>
            </div>
            <div>
              <div class="modal-title">GPS Location</div>
              <div class="modal-sub" v-if="mapTarget">
                {{ mapTarget.respondent_name || 'Unnamed' }}
                <span class="modal-sub-sep">·</span>
                {{ mapTarget.latitude?.toFixed(6) }}, {{ mapTarget.longitude?.toFixed(6) }}
              </div>
            </div>
          </div>
          <button class="modal-close" @click="mapDialog = false">
            <v-icon size="18">mdi-close</v-icon>
          </button>
        </div>

        <div class="map-body" v-if="mapTarget">
          <iframe
            :src="`https://maps.google.com/maps?q=${mapTarget.latitude},${mapTarget.longitude}&z=16&output=embed`"
            width="100%"
            height="420"
            style="border: none; display: block"
            allowfullscreen
            loading="lazy"
          />
        </div>

        <div class="modal-footer">
          <a>
            :href="`https://www.google.com/maps?q=${mapTarget?.latitude},${mapTarget?.longitude}`"
            target="_blank" class="btn btn-primary" style="text-decoration: none" >
            <v-icon size="14" style="margin-right: 5px">mdi-open-in-new</v-icon>
            Open in Google Maps
          </a>
          <button class="btn btn-outline" @click="mapDialog = false">Close</button>
        </div>
      </div>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { supabase } from '@/services/supabase'
import Sidebar from '@/components/common/Sidebar.vue'
import ReportDetailView from '@/components/responses/ReportDetailView.vue'

const drawer = ref(true)
const responses = ref([])
const loading = ref(true)
const search = ref('')
const reportDialog = ref(false)
const selectedResponse = ref(null)
const currentPage = ref(1)
const perPage = 10

const mapDialog = ref(false)
const mapTarget = ref(null)

const openMap = (item) => {
  mapTarget.value = item
  mapDialog.value = true
}

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

watch(search, () => {
  currentPage.value = 1
})

const filteredResponses = computed(() => {
  if (!search.value) return responses.value
  const term = search.value.toLowerCase()
  return responses.value.filter(
    (r) =>
      r.respondent_name?.toLowerCase().includes(term) ||
      r.enumerator_name?.toLowerCase().includes(term),
  )
})

const totalPages = computed(() => Math.ceil(filteredResponses.value.length / perPage))

const paginatedResponses = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredResponses.value.slice(start, start + perPage)
})

const formatDateShort = (date) =>
  new Date(date).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })

const formatTime = (date) =>
  new Date(date).toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' })

const avatarInitial = (name) => (name || '?')[0].toUpperCase()

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

.responses-body {
  width: 100%;
  padding: 66px 40px 0;
  box-sizing: border-box;
}

/* ══ STICKY RAIL ══════════════════════════ */
.progress-rail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  background: linear-gradient(135deg, #1d4ed8, #2563eb, #3b82f6);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 18px rgba(37, 99, 235, 0.25);
}

.progress-rail-inner {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 0 8px 0;
  box-sizing: border-box;
  min-height: 52px;
}

.rail-menu-btn {
  color: white !important;
  flex-shrink: 0;
  margin-left: 0 !important;
  padding-left: 0 !important;
}

.rail-title-block {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.rail-title {
  font-size: 13px;
  font-weight: 700;
  color: white;
  white-space: nowrap;
}

.rail-divider {
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
  font-size: 13px;
}

.rail-sub {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.75);
  white-space: nowrap;
}

.rail-refresh-btn {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.12);
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 5px 14px;
  font-size: 12px;
  font-weight: 700;
  color: white;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s;
  flex-shrink: 0;
}
.rail-refresh-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.22);
}
.rail-refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ══ PAGE HEADING ════════════════════════ */
.page-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding: 40px 0 28px;
  flex-wrap: wrap;
}

.page-eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #3b82f6;
  margin-bottom: 10px;
}

.page-title {
  font-size: clamp(22px, 3vw, 36px);
  font-weight: 900;
  color: #0f2a5e;
  line-height: 1.15;
  letter-spacing: -0.4px;
  margin: 0 0 8px;
}

.page-sub {
  font-size: 13px;
  color: #6b7fa8;
  margin: 0;
  line-height: 1.6;
}

.page-stats {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
  align-items: flex-end;
}

.stat-card {
  background: #f0f5ff;
  border: 1.5px solid #dbeafe;
  border-radius: 14px;
  padding: 14px 20px;
  text-align: center;
  min-width: 80px;
}

.stat-num {
  font-size: 28px;
  font-weight: 900;
  color: #0f2a5e;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #9ca3af;
}

/* ══ TABLE PANEL ═════════════════════════ */
.table-panel {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 24px;
  background: #3b82f6;
  flex-wrap: wrap;
}

.panel-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.panel-title {
  font-size: 14px;
  font-weight: 700;
  color: white;
}

/* ── SEARCH — white style ── */
.search-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  padding: 7px 12px;
  min-width: 260px;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}
.search-wrap:focus-within {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.search-icon {
  color: #9ca3af !important;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 13px;
  color: #111827;
  font-family: inherit;
}
.search-input::placeholder {
  color: #9ca3af;
}

.search-clear {
  border: none;
  background: transparent;
  cursor: pointer;
  color: #9ca3af;
  display: flex;
  align-items: center;
  padding: 0;
  transition: color 0.12s;
}
.search-clear:hover {
  color: #374151;
}

/* ══ TABLE ═══════════════════════════════ */
.table-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.table-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 64px 24px;
}

.table-empty-text {
  font-size: 14px;
  color: #9ca3af;
  font-style: italic;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.th {
  padding: 12px 16px;
  text-align: left;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: #6b7fa8;
  background: #f8faff;
  border-bottom: 2px solid #eef1f8;
  white-space: nowrap;
}
.th--action {
  text-align: right;
}

.tr {
  cursor: pointer;
  transition: background 0.12s;
  border-bottom: 1px solid #f5f7fb;
}
.tr:last-child {
  border-bottom: none;
}
.tr:hover {
  background: #f8faff;
}

.td {
  padding: 13px 16px;
  font-size: 13px;
  color: #1f2937;
  vertical-align: middle;
}
.td--num {
  font-size: 11px;
  color: #9ca3af;
  font-weight: 600;
  width: 36px;
}
.td--muted {
  color: #6b7280;
  font-size: 12.5px;
}
.td--empty {
  color: #d1daea;
  font-style: italic;
}
.td--action {
  text-align: right;
}

.date-main {
  font-weight: 600;
  font-size: 13px;
  color: #111827;
}
.date-time {
  font-size: 11px;
  color: #9ca3af;
  margin-top: 2px;
}

.respondent-name {
  font-weight: 600;
  font-size: 13px;
  color: #111827;
}

/* GPS badge */
.gps-badge {
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  color: #1d4ed8;
  background: #eff6ff;
  border-radius: 6px;
  padding: 4px 9px;
  border: 1.5px solid #bfdbfe;
  gap: 4px;
}

.gps-badge--btn {
  cursor: pointer;
  font-family: inherit;
  font-weight: 600;
  transition:
    background 0.14s,
    border-color 0.14s,
    color 0.14s,
    box-shadow 0.14s;
  position: relative;
}

.gps-badge--btn::after {
  content: '↗';
  font-size: 10px;
  color: #93c5fd;
  margin-left: 3px;
  transition: color 0.14s;
}

.gps-badge--btn:hover {
  background: #1d4ed8;
  border-color: #1d4ed8;
  color: white;
  box-shadow: 0 2px 10px rgba(29, 78, 216, 0.3);
}

.gps-badge--btn:hover::after {
  color: rgba(255, 255, 255, 0.7);
}

/* View button */
.view-btn {
  display: inline-flex;
  align-items: center;
  background: #eff6ff;
  border: 1.5px solid #bfdbfe;
  border-radius: 8px;
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 700;
  color: #1d4ed8;
  font-family: inherit;
  cursor: pointer;
  transition:
    background 0.14s,
    border-color 0.14s,
    color 0.14s,
    box-shadow 0.14s;
  white-space: nowrap;
}
.view-btn:hover {
  background: #1d4ed8;
  border-color: #1d4ed8;
  color: white;
  box-shadow: 0 2px 10px rgba(29, 78, 216, 0.3);
}

/* ══ PAGINATION ══════════════════════════ */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 16px 24px;
  border-top: 1px solid #eef1f8;
  background: #fafbff;
}

.page-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1.5px solid #e5e7eb;
  background: white;
  color: #374151;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.14s;
}
.page-btn:hover:not(:disabled) {
  border-color: #3b82f6;
  color: #3b82f6;
}
.page-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.page-num {
  min-width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.14s;
}
.page-num:hover {
  background: #f0f5ff;
  color: #3b82f6;
}
.page-num.active {
  background: #0f2a5e;
  color: white;
  font-weight: 800;
}

/* ══ MODAL ═══════════════════════════════ */
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
  color: rgba(255, 255, 255, 0.55);
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
.modal-body::-webkit-scrollbar-track {
  background: transparent;
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

.map-body {
  background: #e5e7eb;
  line-height: 0;
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
  transition: background 0.14s;
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
.btn-primary {
  background: #1d4ed8;
  color: white;
}
.btn-primary:hover {
  background: #1e40af;
}

/* ══ TABLET ══════════════════════════════ */
@media (max-width: 768px) {
  .responses-body {
    padding: 52px 20px 0;
  }
  .progress-rail-inner {
    padding: 9px 16px 7px 0;
  }
  .page-heading {
    padding: 28px 0 20px;
  }
  .panel-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .search-wrap {
    min-width: 100%;
  }
  .page-stats {
    width: 100%;
    justify-content: flex-start;
  }
  .modal-body {
    padding: 18px;
  }
  .modal-header {
    padding: 16px 20px;
  }
}

/* ══ MOBILE ══════════════════════════════ */
@media (max-width: 480px) {
  .responses-body {
    padding: 52px 12px 0;
  }
  .progress-rail-inner {
    padding: 9px 12px 7px 0;
    height: unset;
    min-height: 48px;
  }
  .rail-title {
    font-size: 12px;
  }
  .rail-sub {
    display: none;
  }
  .rail-divider {
    display: none;
  }
  .page-title {
    font-size: 22px;
  }
  .th,
  .td {
    padding: 10px 12px;
  }
  .td--muted {
    display: none;
  }
  .modal-body {
    padding: 14px;
  }
}

/* ══ LARGE DESKTOP ═══════════════════════ */
@media (min-width: 1200px) {
  .responses-body {
    padding: 52px 64px 0;
  }
  .progress-rail-inner {
    padding: 9px 48px 7px 0;
  }
}
</style>
