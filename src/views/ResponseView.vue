<!-- ResponsesView.vue -->
<template>
  <v-app theme="light" style="background: #f5f4f0">
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
              <span class="rail-title">OFW Profiling and Reintegration Information System</span>
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
            <div class="panel-header">
              <div class="panel-header-left">
                <v-icon size="18" color="rgba(255,255,255,0.85)">mdi-table-large</v-icon>
                <span class="panel-title">All Submissions</span>
              </div>
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

            <div class="table-wrap">
              <div v-if="loading" class="table-empty">
                <v-progress-circular indeterminate color="#3b82f6" size="36" width="3" />
                <span class="table-empty-text">Loading responses…</span>
              </div>
              <div v-else-if="filteredResponses.length === 0" class="table-empty">
                <v-icon size="40" color="#6b7fa8">mdi-inbox-outline</v-icon>
                <span class="table-empty-text">No responses found.</span>
              </div>
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
                        View
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

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

          <div style="height: 48px" />
        </div>
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
          <button class="btn btn-print" @click="printReport(selectedResponse)">
            <v-icon size="14" style="margin-right: 6px">mdi-printer-outline</v-icon>
            Print / Export PDF
          </button>
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

const viewFullReport = (item) => {
  selectedResponse.value = item
  reportDialog.value = true
}

// ── Print / Export PDF ────────────────────────────────
const printReport = (response) => {
  if (!response) return
  const a = response.answers || {}

  const fmt = (v) => {
    if (v === null || v === undefined || v === '' || v === false)
      return '<span class="empty">—</span>'
    if (v === true) return 'Yes'
    if (Array.isArray(v))
      return v.length
        ? v.map((i) => `<span class="chip">${i}</span>`).join(' ')
        : '<span class="empty">—</span>'
    return String(v)
  }

  const row = (label, value) => {
    if (value === null || value === undefined || value === '') return ''
    return `<tr><td class="label">${label}</td><td class="value">${fmt(value)}</td></tr>`
  }

  const section = (num, title, rows) => {
    const filtered = rows.filter((r) => r && r.trim())
    if (!filtered.length) return ''
    return `
      <div class="section">
        <div class="section-header">
          <span class="section-num">${num}</span>
          <span class="section-title">${title}</span>
        </div>
        <table>${filtered.join('')}</table>
      </div>`
  }

  const g = a.general || {}
  const r = a.respondent || {}
  const hh = a.household || {}
  const op = a.ofwProfile || {}
  const mg = a.migration || {}
  const ps = a.presentStatus || {}
  const se = a.socioEconomic || {}
  const lv = a.livelihood || {}
  const ed = a.education || {}
  const hl = a.health || {}
  const as = a.assistance || {}
  const pb = a.problems || {}
  const ri = a.reintegration || {}
  const nd = a.needs || {}
  const rk = a.risk || {}
  const cm = a.community || {}
  const fn = a.financial || {}
  const oe = a.openEnded || {}
  const en = a.enumerator || {}
  const co = a.consent || {}

  // Roster table
  const rosterHtml = (() => {
    const roster = Array.isArray(hh.roster) ? hh.roster.filter((m) => m.name) : []
    if (!roster.length) return ''
    return `<tr>
      <td class="label">Household Roster</td>
      <td class="value">
        <table class="roster-table">
          <thead><tr>
            <th>Name</th><th>Sex</th><th>Age</th><th>Civil Status</th>
            <th>Rel. to OFW</th><th>Education</th><th>Occupation</th><th>Income</th>
          </tr></thead>
          <tbody>
            ${roster
              .map(
                (m) => `<tr>
              <td>${m.name || '—'}</td>
              <td>${m.sex || '—'}</td>
              <td>${m.age ?? '—'}</td>
              <td>${m.civilStatus || '—'}</td>
              <td>${m.relationshipToOFW || '—'}</td>
              <td>${m.educationalAttainment || '—'}</td>
              <td>${m.occupation || '—'}</td>
              <td>${m.monthlyIncome || '—'}</td>
            </tr>`,
              )
              .join('')}
          </tbody>
        </table>
      </td>
    </tr>`
  })()

  // Signature rows
  const sigRow = (label, src) =>
    src
      ? `<tr><td class="label">${label}</td><td class="value"><img src="${src}" class="sig-img" alt="${label}"/></td></tr>`
      : ''

  const consentDisplay =
    co.consentAgreement === 'agree'
      ? 'Voluntarily Agreed'
      : co.consentAgreement === 'disagree'
        ? 'Did Not Agree'
        : co.consentAgreement || null

  const submittedDate = new Date(response.created_at).toLocaleString('en-PH', {
    dateStyle: 'long',
    timeStyle: 'short',
  })

  const generatedDate = new Date().toLocaleString('en-PH', {
    dateStyle: 'long',
    timeStyle: 'short',
  })

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>OFW Profiling Report — ${response.respondent_name || 'Unnamed'}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 11px;
      color: #111827;
      background: #ffffff;
    }

    /* ── COVER ── */
    .cover {
      background: #0f2a5e;
      color: white;
      padding: 32px 40px 26px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 24px;
    }
    .cover-left { flex: 1; }
    .cover-agency {
      font-size: 9.5px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      opacity: 0.65;
      margin-bottom: 8px;
    }
    .cover-title {
      font-size: 20px;
      font-weight: 900;
      line-height: 1.3;
      margin-bottom: 14px;
    }
    .cover-meta {
      font-size: 11px;
      opacity: 0.85;
      line-height: 2;
    }
    .cover-meta strong { opacity: 1; font-weight: 700; }
    .cover-gps {
      margin-top: 8px;
      font-size: 10px;
      opacity: 0.6;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .cover-right {
      text-align: right;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      opacity: 0.5;
      flex-shrink: 0;
      line-height: 2;
    }
    .cover-badge {
      display: inline-block;
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 20px;
      padding: 4px 14px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1px;
      margin-top: 14px;
      text-transform: uppercase;
    }

    /* ── PRINT BAR (hidden on print) ── */
    .print-bar {
      background: #eff6ff;
      border-bottom: 2px solid #bfdbfe;
      padding: 14px 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }
    .print-bar-text {
      font-size: 12px;
      color: #1d4ed8;
      font-weight: 600;
    }
    .print-bar-sub {
      font-size: 10.5px;
      color: #6b7fa8;
      margin-top: 2px;
    }
    .print-btn {
      background: linear-gradient(135deg, #1d4ed8, #3b82f6);
      color: white;
      border: none;
      border-radius: 10px;
      padding: 10px 24px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      font-family: inherit;
      white-space: nowrap;
      box-shadow: 0 4px 14px rgba(29,78,216,0.3);
      transition: opacity 0.15s;
    }
    .print-btn:hover { opacity: 0.88; }
    @media print { .print-bar { display: none !important; } }

    /* ── BODY ── */
    .body { padding: 28px 40px 48px; }

    /* ── SECTION ── */
    .section {
      margin-bottom: 16px;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      overflow: hidden;
      page-break-inside: avoid;
    }
    .section-header {
      background: #1d4ed8;
      color: white;
      padding: 8px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .section-num {
      background: rgba(255,255,255,0.18);
      border-radius: 4px;
      padding: 2px 9px;
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      flex-shrink: 0;
    }
    .section-title {
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 0.2px;
    }

    /* ── TABLE ── */
    table { width: 100%; border-collapse: collapse; }
    tr { border-bottom: 1px solid #f3f4f6; }
    tr:last-child { border-bottom: none; }
    tr:nth-child(even) td.label { background: #fafbff; }
    td { padding: 8px 14px; vertical-align: top; line-height: 1.65; }
    td.label {
      width: 210px;
      min-width: 210px;
      font-size: 9.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #6b7fa8;
      background: #fafbff;
    }
    td.value { font-size: 11px; color: #111827; }
    .empty { color: #c4ccd9; font-style: italic; }

    /* ── CHIPS ── */
    .chip {
      display: inline-block;
      background: #eff6ff;
      color: #1d4ed8;
      border: 1px solid #bfdbfe;
      border-radius: 20px;
      padding: 2px 9px;
      font-size: 10px;
      font-weight: 600;
      margin: 2px 2px 2px 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* ── ROSTER TABLE ── */
    .roster-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10px;
      margin-top: 6px;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      overflow: hidden;
    }
    .roster-table th {
      background: #f8faff;
      padding: 6px 8px;
      text-align: left;
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      color: #6b7fa8;
      border-bottom: 1.5px solid #e2e8f0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .roster-table td {
      padding: 5px 8px;
      border-bottom: 1px solid #f3f4f6;
      background: white;
      width: auto;
      min-width: unset;
      font-size: 10px;
      color: #374151;
    }
    .roster-table tr:last-child td { border-bottom: none; }

    /* ── SIGNATURE ── */
    .sig-img {
      display: block;
      max-width: 220px;
      max-height: 80px;
      border: 1.5px solid #bfdbfe;
      border-radius: 8px;
      padding: 6px;
      background: #f8faff;
      margin-top: 2px;
    }

    /* ── FOOTER ── */
    .doc-footer {
      margin-top: 36px;
      padding-top: 16px;
      border-top: 1.5px solid #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 9.5px;
      color: #9ca3af;
    }
    .doc-footer-left { line-height: 1.8; }
    .doc-footer-right { text-align: right; line-height: 1.8; }

    /* ── PRINT ── */
    @media print {
      body { background: white; }
      .cover {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .section-header {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .chip {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .section { page-break-inside: avoid; }
      @page {
        size: A4;
        margin: 15mm 12mm;
      }
    }
  </style>
</head>
<body>

  <!-- COVER HEADER -->
  <div class="cover">
    <div class="cover-left">
      <div class="cover-agency">Department of Migrant Workers — Caraga Region XIII</div>
      <div class="cover-title">
        OFW Family Profiling &amp;<br>Reintegration Needs Assessment Form
      </div>
      <div class="cover-meta">
        <strong>Respondent:</strong> ${response.respondent_name || '—'}<br>
        <strong>Enumerator:</strong> ${response.enumerator_name || '—'}<br>
        <strong>Date Submitted:</strong> ${submittedDate}
        ${response.latitude ? `<br><strong>GPS:</strong> ${Number(response.latitude).toFixed(6)}, ${Number(response.longitude).toFixed(6)}` : ''}
      </div>
      <div class="cover-badge">OPRIS — Official Record</div>
    </div>
    <div class="cover-right">
      OPRIS<br>
      OFW Profiling<br>
      &amp; Reintegration<br>
      Information<br>
      System
    </div>
  </div>

  <!-- PRINT BAR -->
  <div class="print-bar">
    <div>
      <div class="print-bar-text">Full OFW Profiling Report — ${response.respondent_name || 'Unnamed Respondent'}</div>
      <div class="print-bar-sub">Review the data below, then click Print to save as PDF or send to printer.</div>
    </div>
    <button class="print-btn" onclick="window.print()"> &nbsp; Print / Save as PDF</button>
  </div>

  <!-- REPORT BODY -->
  <div class="body">

    ${section('I', 'General Information', [
      row('Date of Interview', g.dateOfInterview),
      row('Time of Interview', g.timeOfInterview),
      row('Enumerator / Interviewer', g.enumeratorName),
      row('Barangay', g.barangay),
      row('Municipality / City', g.municipalityCity),
      row('Province / Region', g.provinceRegion),
      row('Household Control No.', g.householdControlNumber),
      row(
        'Type of Respondent',
        (g.typeOfRespondent || '') +
          (g.typeOfRespondentOther ? ` — ${g.typeOfRespondentOther}` : ''),
      ),
      row(
        'GPS Coordinates',
        g.latitude ? `${Number(g.latitude).toFixed(6)}, ${Number(g.longitude).toFixed(6)}` : null,
      ),
    ])}

    ${section('II', 'Respondent Identification', [
      row('Name', r.name),
      row(
        'Relationship to OFW',
        Array.isArray(r.relationshipToOFW) ? r.relationshipToOFW.join(', ') : r.relationshipToOFW,
      ),
      row('Sex', r.sex),
      row('Age', r.age),
      row('Date of Birth', r.dateOfBirth),
      row('Contact Number', r.contactNumber),
      row('Alternative Contact', r.alternativeContact),
      row('Email', r.email),
      row('Religion', r.religion),
      row('Civil Status', r.civilStatus),
      row('Complete Home Address', r.completeHomeAddress),
    ])}

    ${section('III', 'Household Demographic Profile', [
      row('Household Head Name', hh.householdHeadName || hh.headName),
      row('Respondent Relation to Head', hh.relationshipToHead || hh.respondentRelationToHead),
      row('Total Household Members', hh.totalHouseholdMembers ?? hh.totalMembers),
      row('Total Dependents', hh.totalDependents),
      row('Children (0–17 yrs)', hh.children017 ?? hh.numChildren),
      row('Senior Citizens (60+)', hh.seniorCitizens ?? hh.numSenior),
      row('Persons with Disability', hh.personsWithDisability ?? hh.numPWD),
      row('Pregnant / Lactating', hh.pregnantLactating ?? hh.numPregnant),
      rosterHtml,
    ])}

    ${section('IV', 'OFW Profile', [
      row('Name of OFW', op.nameOfOFW || op.name),
      row('Sex', op.sex),
      row('Age', op.age),
      row('Civil Status', op.civilStatus),
      row('Educational Attainment', op.educationalAttainment || op.education),
      row('Technical Skills', op.technicalSkills),
      row('Passport Number', op.passportNumber),
      row('DMW Registration No.', op.dmwRegistrationNumber || op.dmwRegistration),
      row('OWWA Status', op.owwaStatus || op.owaStatus),
      row('PhilHealth Status', op.philhealthStatus || op.philHealthStatus),
      row('SSS Status', op.sssStatus),
      row('Pag-IBIG Status', op.pagibigStatus || op.pagIbigStatus),
    ])}

    ${section('V', 'Migration History', [
      row('Current OFW Status', mg.currentStatus),
      row('Country of Destination', mg.countryDestination || mg.country),
      row('City / Area of Work', mg.cityArea || mg.city),
      row('Job Title / Occupation', mg.jobTitle),
      row('Industry / Sector', fmt(mg.industrySector)),
      row('Other Industry', mg.otherIndustry),
      row('Deployment Type', mg.deploymentType),
      row('Documentation Status', mg.documentationStatus),
      row('Recruitment Channel', mg.recruitmentChannel),
      row('Recruitment Agency', mg.recruitmentAgency),
      row('Date of First Deployment', mg.firstDeploymentDate || mg.dateFirstDeployment),
      row('Date of Latest Deployment', mg.latestDeploymentDate || mg.dateLatestDeployment),
      row('Years Worked Abroad', mg.yearsWorkedAbroad),
      row('Contracts Completed', mg.contractsCompleted),
      row('Avg. Contract Duration', mg.averageContractDuration),
      row('Reason for Going Abroad', fmt(mg.reasonForGoing)),
    ])}

    ${section('VI', 'Present Status', [
      row('Present Location of OFW', ps.presentLocation),
      row('Abroad Employment Status', fmt(ps.abroadEmploymentStatus)),
      row('Reason for Return', fmt(ps.reasonForReturn)),
      row('Date of Return', ps.dateOfReturn),
      row('Current Livelihood / Income', fmt(ps.currentLivelihood)),
      row('Planning to Go Abroad Again', ps.planningToGoAbroad || ps.planningToGoAbroadAgain),
    ])}

    ${section('VII', 'Socio-Economic Profile', [
      row('Type of Housing Unit', se.housingUnit || se.housingType),
      row(
        'House Construction',
        fmt(
          Array.isArray(se.houseConstruction)
            ? se.houseConstruction
            : se.houseConstruction
              ? [se.houseConstruction]
              : null,
        ),
      ),
      row(
        'Electricity',
        se.electricity === true ? 'Yes' : se.electricity === false ? 'No' : se.electricity,
      ),
      row(
        'Water Source',
        fmt(
          Array.isArray(se.waterSource) ? se.waterSource : se.waterSource ? [se.waterSource] : null,
        ),
      ),
      row(
        'Toilet Facility',
        fmt(
          Array.isArray(se.toiletFacility)
            ? se.toiletFacility
            : se.toiletFacility
              ? [se.toiletFacility]
              : null,
        ),
      ),
      row(
        'Primary Income Source',
        fmt(
          Array.isArray(se.primaryIncomeSource)
            ? se.primaryIncomeSource
            : se.primaryIncomeSource
              ? [se.primaryIncomeSource]
              : null,
        ),
      ),
      row('Avg. Monthly Income', se.averageMonthlyIncome || se.avgMonthlyIncome),
      row(
        'Monthly OFW Remittance',
        fmt(
          Array.isArray(se.monthlyRemittance)
            ? se.monthlyRemittance
            : se.monthlyRemittance
              ? [se.monthlyRemittance]
              : null,
        ),
      ),
      row(
        'Remittance Frequency',
        fmt(
          Array.isArray(se.remittanceFrequency)
            ? se.remittanceFrequency
            : se.remittanceFrequency
              ? [se.remittanceFrequency]
              : null,
        ),
      ),
      row('Main Uses of Remittances', fmt(se.remittanceUses)),
      row(
        'Has Savings',
        se.hasSavings === false ? 'No' : se.hasSavings === true ? 'Yes' : se.hasSavings,
      ),
      row(
        'Has Debts / Loans',
        se.hasDebts === false ? 'No' : se.hasDebts === true ? 'Yes' : se.hasDebts,
      ),
      row(
        'Estimated Total Debt',
        fmt(Array.isArray(se.totalDebt) ? se.totalDebt : se.totalDebt ? [se.totalDebt] : null),
      ),
      row('Reason for Debt', fmt(se.debtReason)),
    ])}

    ${section('VIII', 'Livelihood Status', [
      row('Employed Members', lv.employedMembers),
      row('Unemployed Members', lv.unemployedMembers),
      row('Underemployed Members', lv.underemployedMembers),
      row('Main Occupations', fmt(lv.mainOccupations)),
      row(
        'Interested in Livelihood',
        lv.interestedInLivelihood ||
          (lv.interestedInLocalLivelihood === true
            ? 'Yes'
            : lv.interestedInLocalLivelihood === false
              ? 'No'
              : lv.interestedInLocalLivelihood),
      ),
      row('Preferred Livelihood', fmt(lv.preferredLivelihood)),
      row('Skills Training Needed', lv.skillsTrainingNeeded),
    ])}

    ${section('IX', 'Education Status', [
      row(
        'All Children Enrolled',
        ed.allChildrenEnrolled === false
          ? 'No'
          : ed.allChildrenEnrolled === true
            ? 'Yes'
            : ed.allChildrenEnrolled,
      ),
      row('Number Out of School', ed.numberOutOfSchool ?? ed.outOfSchoolCount),
      row('Non-Enrollment Reasons', fmt(ed.nonEnrollmentReasons || ed.reasonsForDropout)),
      row('Educational Needs', fmt(ed.educationalNeeds)),
      row('Not Applicable', ed.notApplicable ? 'No school-age children in household' : null),
    ])}

    ${section('X', 'Health & Psychosocial Status', [
      row(
        'Chronic Illness',
        hl.hasChronicIllness ||
          (hl.chronicIllness === true ? 'Yes' : hl.chronicIllness === false ? 'No' : null),
      ),
      row('Illness Specify', hl.chronicIllnessSpecify || hl.illnessSpecify),
      row(
        'Disability',
        hl.hasDisability ||
          (hl.disability === true ? 'Yes' : hl.disability === false ? 'No' : null),
      ),
      row(
        'Psychosocial Concerns',
        hl.hasPsychosocialConcerns ||
          (hl.psychosocialConcerns === true
            ? 'Yes'
            : hl.psychosocialConcerns === false
              ? 'No'
              : null),
      ),
      row(
        'Concerns List',
        fmt(
          Array.isArray(hl.psychosocialConcerns)
            ? hl.psychosocialConcerns
            : Array.isArray(hl.concernsList)
              ? hl.concernsList
              : null,
        ),
      ),
      row('Willing for Counseling', hl.willingForPsychosocialSupport || hl.willingForCounseling),
      row(
        'Access to Health Services',
        fmt(
          Array.isArray(hl.healthAccess)
            ? hl.healthAccess
            : hl.healthAccess
              ? [hl.healthAccess]
              : null,
        ),
      ),
    ])}

    ${section('XI', 'Social Protection & Assistance', [
      row('Received Assistance From', fmt(as.receivedAssistanceFrom || as.receivedFrom)),
      row('Type of Assistance Received', fmt(as.typeOfAssistance)),
      row('Assistance Sufficient', as.assistanceSufficient || as.sufficient),
      row(
        'Aware of Reintegration Prog.',
        as.awareOfReintegrationPrograms ||
          (as.awareOfReintegration === true
            ? 'Yes'
            : as.awareOfReintegration === false
              ? 'No'
              : null),
      ),
    ])}

    ${section('XII', 'Problems & Issues', [
      row('Major Problems', fmt(pb.majorProblems)),
      row('Most Urgent Concern', pb.mostUrgentConcern || pb.mostUrgent),
      row('Issues Due to Migration', fmt(pb.migrationIssues || pb.migrationRelatedIssues)),
    ])}

    ${section('XIII', 'Reintegration Status', [
      row('Has Reintegration Plan', ri.hasReintegrationPlan || ri.hasPlan),
      row('Preferred Reintegration Type', fmt(ri.preferredReintegrationType) || ri.preferredType),
      row(
        'Started Livelihood / Business',
        ri.hasStartedLivelihood ||
          (ri.startedBusiness === true ? 'Yes' : ri.startedBusiness === false ? 'No' : null),
      ),
      row('Type of Business / Livelihood', ri.livelihoodType || ri.businessType),
      row('Business / Livelihood Status', ri.livelihoodStatus || ri.businessStatus),
      row('Main Barriers', fmt(ri.mainBarriers || ri.barriers)),
    ])}

    ${section('XIV', 'Training, Employment & Needs', [
      row('Immediate Assistance Needed', fmt(nd.immediateAssistance)),
      row('Preferred Skills Training', fmt(nd.preferredSkillsTraining)),
      row(
        'Preferred Employment Sector',
        nd.preferredLocalEmployment || nd.preferredEmploymentSector,
      ),
      row('Willing to Join Cooperative', nd.willingToJoinCooperative || nd.willingCooperative),
      row('Interested in Family Circle', nd.interestedInFamilyCircle),
    ])}

    ${section('XV', 'Risk Screening', [
      row('Ongoing Cases', fmt(rk.ongoingCase)),
      row(
        'Needs Urgent Referral',
        rk.needsUrgentReferral === false
          ? 'No'
          : rk.needsUrgentReferral === true
            ? 'Yes'
            : rk.needsUrgentReferral,
      ),
      row('Referred To', fmt(rk.referredTo || rk.referralTo)),
      row('Priority Level', rk.priorityLevel),
    ])}

    ${section('XVI', 'Community Participation', [
      row('Community Groups', fmt(cm.communityGroups || cm.memberOfGroups)),
      row('Willing to Participate In', fmt(cm.willingToParticipate)),
      row('Other Participation', cm.otherParticipation),
    ])}

    ${section('XVII', 'Financial Literacy', [
      row(
        'Keeps Family Budget',
        fn.keepsFamilyBudget ||
          (fn.keepsBudget === true ? 'Yes' : fn.keepsBudget === false ? 'No' : null),
      ),
      row('Savings / Investment Products', fmt(fn.savingsProducts || fn.hasSavingsProduct)),
      row(
        'Attended Financial Literacy',
        fn.attendedFinancialLiteracy ||
          (fn.attendedLiteracySessions === true
            ? 'Yes'
            : fn.attendedLiteracySessions === false
              ? 'No'
              : null),
      ),
      row(
        'Wants Financial Coaching',
        fn.wantsFinancialCoaching ||
          (fn.wantsCoaching === true ? 'Yes' : fn.wantsCoaching === false ? 'No' : null),
      ),
    ])}

    ${section('XVIII', 'Open-Ended Questions', [
      row('Changes from Migration', oe.changesFromMigration),
      row('Biggest Challenges', oe.biggestChallenges),
      row('Support Most Needed', oe.mostNeededSupport || oe.supportNeeded),
      row('Future Plans', oe.futurePlans),
      row('Other Comments', oe.otherComments),
    ])}

    ${section('XIX', "Enumerator's Assessment", [
      row('Socio-Economic Status', en.socioEconomicStatus),
      row('Housing / Environment', en.housingCondition),
      row('Family Functioning', en.familyFunctioning),
      row('Recommended Interventions', fmt(en.recommendedInterventions)),
      row(
        'Needs Follow-up Visit',
        en.needsFollowUp === true ? 'Yes' : en.needsFollowUp === false ? 'No' : en.needsFollowUp,
      ),
      row('Narrative Remarks', en.narrativeRemarks),
    ])}

    ${section('XX', 'Consent & Data Privacy', [
      row('Consent Agreement', consentDisplay),
      row('Respondent Name', co.respondentName),
      row('Respondent Date', co.respondentDate),
      sigRow('Respondent Signature', co.respondentSignature),
      row('Enumerator Name', co.enumeratorName),
      row('Enumerator Date', co.enumeratorDate),
      sigRow('Enumerator Signature', co.enumeratorSignature),
    ])}

    <!-- DOCUMENT FOOTER -->
    <div class="doc-footer">
      <div class="doc-footer-left">
        <strong>OPRIS</strong> — OFW Profiling &amp; Reintegration Information System<br>
        Department of Migrant Workers, Caraga Region XIII
      </div>
      <div class="doc-footer-right">
        Generated: ${generatedDate}<br>
        This is an official DMW document.
      </div>
    </div>

  </div>
</body>
</html>`

  const win = window.open('', '_blank', 'width=960,height=720,scrollbars=yes')
  if (!win) {
    alert('Pop-up blocked! Please allow pop-ups for this site and try again.')
    return
  }
  win.document.write(html)
  win.document.close()
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

/* ── TOP RAIL ── */
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

/* ── PAGE HEADING ── */
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
  margin: 0 0 8px;
}
.page-sub {
  font-size: 13px;
  color: #6b7fa8;
  margin: 0;
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

/* ── TABLE PANEL ── */
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
}
.search-clear:hover {
  color: #374151;
}

/* ── DATA TABLE ── */
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
}
.gps-badge--btn::after {
  content: '↗';
  font-size: 10px;
  color: #93c5fd;
  margin-left: 3px;
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

/* ── PAGINATION ── */
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

/* ── MODALS ── */
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

/* ── BUTTONS ── */
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
  transition:
    background 0.14s,
    opacity 0.14s;
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
.btn-print {
  background: linear-gradient(135deg, #0f2a5e, #1d4ed8);
  color: white;
  box-shadow: 0 3px 12px rgba(29, 78, 216, 0.3);
}
.btn-print:hover {
  opacity: 0.88;
  box-shadow: 0 4px 16px rgba(29, 78, 216, 0.4);
}

/* ── RESPONSIVE ── */
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
  .modal-footer {
    flex-wrap: wrap;
  }
}
@media (max-width: 480px) {
  .responses-body {
    padding: 52px 12px 0;
  }
  .rail-title {
    font-size: 12px;
  }
  .rail-sub,
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
@media (min-width: 1200px) {
  .responses-body {
    padding: 52px 64px 0;
  }
  .progress-rail-inner {
    padding: 9px 48px 7px 0;
  }
}
</style>
