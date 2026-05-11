<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    width="272"
    :temporary="$vuetify.display.mobile"
    :permanent="!$vuetify.display.mobile"
    class="custom-sidebar"
  >
    <div class="sidebar-inner">
      <!-- ── DIVIDER ── -->
      <div class="sidebar-divider" />

      <!-- ── NAV LABEL ── -->
      <div class="sidebar-nav-label">Main Menu</div>

      <!-- ── NAV ITEMS ── -->
      <nav class="sidebar-nav">
        <button
          class="sidebar-item"
          :class="{ active: currentRoute === 'survey' }"
          @click="goTo('/')"
        >
          <div class="sidebar-item-icon">
            <v-icon size="17">mdi-file-document-outline</v-icon>
          </div>
          <span class="sidebar-item-label">Survey Form</span>
          <div v-if="currentRoute === 'survey'" class="sidebar-item-pip" />
        </button>

        <button
          class="sidebar-item"
          :class="{ active: currentRoute === 'responses' }"
          @click="goTo('/responses')"
        >
          <div class="sidebar-item-icon">
            <v-icon size="17">mdi-table-large</v-icon>
          </div>
          <span class="sidebar-item-label">View Responses</span>
          <div v-if="currentRoute === 'responses'" class="sidebar-item-pip" />
        </button>
      </nav>

      <!-- ── RECENT RESPONSES ── -->
      <!-- <template v-if="showResponsesList && responses.length">
        <div class="sidebar-divider" style="margin-top: 12px" />
        <div class="sidebar-nav-label">Recent Submissions</div>

        <div class="responses-list">
          <button
            v-for="r in responses"
            :key="r.id"
            class="response-item"
            @click="selectResponse(r)"
          >
            <div class="response-avatar">
              {{ (r.respondent_name || '?')[0].toUpperCase() }}
            </div>
            <div class="response-info">
              <span class="response-name">{{ r.respondent_name || 'Unnamed' }}</span>
              <span class="response-date">{{ formatDate(r.created_at) }}</span>
            </div>
            <v-icon size="13" class="response-arrow">mdi-chevron-right</v-icon>
          </button>
        </div>
      </template> -->

      <!-- ── FOOTER ── -->
      <div class="sidebar-footer">
        <div class="sidebar-divider" />
        <div class="sidebar-footer-inner">
          <v-icon size="13" class="footer-icon">mdi-shield-check-outline</v-icon>
          <span class="sidebar-footer-text">Department of Migrant Workers</span>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '@/services/supabase'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const router = useRouter()
const route = useRoute()

const props = defineProps({
  modelValue: { type: Boolean, default: true },
  showResponsesList: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'select'])

const drawer = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const responses = ref([])

const fetchResponses = async () => {
  const { data } = await supabase
    .from('responses')
    .select('id, created_at, respondent_name')
    .order('created_at', { ascending: false })
    .limit(12)
  if (data) responses.value = data
}

onMounted(() => {
  if (props.showResponsesList) fetchResponses()
})

const currentRoute = computed(() => (route.path === '/responses' ? 'responses' : 'survey'))

const goTo = (path) => router.push(path)
const selectResponse = (response) => emit('select', response)
const formatDate = (date) =>
  new Date(date).toLocaleString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })
</script>

<style scoped>
.custom-sidebar {
  position: fixed !important;
  top: 52px !important;
  height: calc(100% - 52px) !important;
  z-index: 50 !important;
  background: #ffffff !important;
  border-right: 1px solid #e8eef8 !important;
  box-shadow: 4px 0 20px rgba(15, 42, 94, 0.07) !important;
  overflow: hidden !important;
}

/* ── INNER ── */
.sidebar-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  overflow-x: hidden;
}

/* ── BRAND ── */
.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 22px 20px 18px;
}

.brand-mark {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #1d4ed8;
  border: 1.5px solid #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 10px rgba(29, 78, 216, 0.25);
}

.brand-mark-text {
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1.5px;
  color: #ffffff;
}

.sidebar-brand-text {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.sidebar-brand-title {
  font-size: 13.5px;
  font-weight: 800;
  color: #0f2a5e;
  letter-spacing: 0.1px;
  line-height: 1;
}

.sidebar-brand-sub {
  font-size: 10px;
  font-weight: 500;
  color: #93c5fd;
  letter-spacing: 0.3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── DIVIDER ── */
.sidebar-divider {
  height: 1px;
  background: #e8eef8;
  margin: 0 16px 14px;
}

/* ── SECTION LABEL ── */
.sidebar-nav-label {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 2.2px;
  text-transform: uppercase;
  color: #93c5fd;
  padding: 0 20px 8px;
}

/* ── NAV ── */
.sidebar-nav {
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 11px;
  width: 100%;
  padding: 9px 11px;
  border-radius: 10px;
  border: 1px solid transparent;
  background: transparent;
  color: #3b82f6;
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  text-align: left;
  transition:
    background 0.15s,
    color 0.15s,
    border-color 0.15s;
  position: relative;
}

.sidebar-item:hover {
  background: #eff6ff;
  color: #1d4ed8;
  border-color: #dbeafe;
}

.sidebar-item.active {
  background: #1d4ed8;
  color: #ffffff;
  font-weight: 700;
  border-color: #2563eb;
  box-shadow: 0 2px 12px rgba(29, 78, 216, 0.22);
}

.sidebar-item-icon {
  width: 30px;
  height: 30px;
  border-radius: 7px;
  background: #eff6ff;
  color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition:
    background 0.15s,
    color 0.15s;
}

.sidebar-item:hover .sidebar-item-icon {
  background: #dbeafe;
  color: #1d4ed8;
}

.sidebar-item.active .sidebar-item-icon {
  background: rgba(255, 255, 255, 0.18);
  color: #ffffff;
}

.sidebar-item-label {
  flex: 1;
  line-height: 1;
}

/* Active pip — right edge */
.sidebar-item-pip {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #93c5fd;
  flex-shrink: 0;
}

/* ── RECENT RESPONSES ── */
.responses-list {
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.response-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 10px;
  border-radius: 9px;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  transition: background 0.14s;
}

.response-item:hover {
  background: #eff6ff;
}

.response-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #dbeafe;
  border: 1.5px solid #93c5fd;
  color: #1d4ed8;
  font-size: 11px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.response-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
}

.response-name {
  font-size: 12px;
  font-weight: 600;
  color: #0f2a5e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.response-date {
  font-size: 10px;
  color: #93c5fd;
  font-weight: 400;
}

.response-arrow {
  color: #dbeafe !important;
  flex-shrink: 0;
}

/* ── FOOTER ── */
.sidebar-footer {
  margin-top: auto;
  padding-bottom: 18px;
}

.sidebar-footer-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0 20px;
}

.footer-icon {
  color: #dbeafe !important;
  flex-shrink: 0;
}

.sidebar-footer-text {
  font-size: 10px;
  font-weight: 600;
  color: #93c5fd;
  letter-spacing: 0.3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
