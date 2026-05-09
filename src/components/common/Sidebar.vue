<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    width="280"
    :temporary="$vuetify.display.mobile"
    :permanent="!$vuetify.display.mobile"
    class="custom-sidebar"
    style="background: #254a9c; border-right: none"
  >
    <div class="sidebar-inner">
      <!-- ── BRAND HEADER ── -->

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
            <v-icon size="18">mdi-file-document-outline</v-icon>
          </div>
          <span class="sidebar-item-label">Survey Form</span>
          <div v-if="currentRoute === 'survey'" class="sidebar-item-dot" />
        </button>

        <button
          class="sidebar-item"
          :class="{ active: currentRoute === 'responses' }"
          @click="goTo('/responses')"
        >
          <div class="sidebar-item-icon">
            <v-icon size="18">mdi-table-large</v-icon>
          </div>
          <span class="sidebar-item-label">View Responses</span>
          <div v-if="currentRoute === 'responses'" class="sidebar-item-dot" />
        </button>
      </nav>

      <!-- ── RECENT RESPONSES ── -->
      <template v-if="showResponsesList && responses.length">
        <div class="sidebar-divider" style="margin-top: 8px" />
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
            <v-icon size="14" class="response-arrow">mdi-chevron-right</v-icon>
          </button>
        </div>
      </template>

      <!-- ── SPACER + FOOTER ── -->
      <div class="sidebar-footer">
        <div class="sidebar-divider" />
        <div class="sidebar-footer-text">Department of Migrant Workers</div>
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

const goTo = (path) => {
  router.push(path)
}

const selectResponse = (response) => {
  emit('select', response)
}

const formatDate = (date) =>
  new Date(date).toLocaleString('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
</script>

<style scoped>
/* ── SIDEBAR POSITION ── */
.custom-sidebar {
  top: 52px !important;
  height: calc(100% - 52px) !important;
  z-index: 50 !important;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.25) !important;
}

/* ── INNER SCROLL WRAPPER ── */
.sidebar-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
}
.sidebar-inner::-webkit-scrollbar {
  width: 4px;
}
.sidebar-inner::-webkit-scrollbar-track {
  background: transparent;
}
.sidebar-inner::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.12);
  border-radius: 4px;
}

/* ── BRAND HEADER ── */
.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 22px 20px 18px;
}

.sidebar-logos {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.sidebar-logo-frame {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  box-sizing: border-box;
  box-shadow: 0 0 0 2px rgba(245, 184, 0, 0.5);
}

.sidebar-brand-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.sidebar-brand-title {
  font-size: 14px;
  font-weight: 800;
  color: white;
  letter-spacing: 0.2px;
  line-height: 1;
}

.sidebar-brand-sub {
  font-size: 10px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── DIVIDER ── */
.sidebar-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 20px 16px;
}

/* ── SECTION LABEL ── */
.sidebar-nav-label {
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
  padding: 0 20px 10px;
}

/* ── NAV ── */
.sidebar-nav {
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.65);
  font-size: 13.5px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  text-align: left;
  transition:
    background 0.15s,
    color 0.15s;
  position: relative;
}

.sidebar-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: white;
}

.sidebar-item.active {
  background: rgba(245, 184, 0, 0.15);
  color: #f5b800;
  font-weight: 700;
}

.sidebar-item-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s;
}

.sidebar-item.active .sidebar-item-icon {
  background: rgba(245, 184, 0, 0.2);
  color: #f5b800;
}

.sidebar-item-label {
  flex: 1;
}

/* Active indicator dot on the right */
.sidebar-item-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #f5b800;
  flex-shrink: 0;
}

/* ── RECENT RESPONSES ── */
.responses-list {
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.response-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 9px 10px;
  border-radius: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  transition: background 0.15s;
}

.response-item:hover {
  background: rgba(255, 255, 255, 0.07);
}

.response-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(245, 184, 0, 0.2);
  border: 1.5px solid rgba(245, 184, 0, 0.35);
  color: #f5b800;
  font-size: 12px;
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
  font-size: 12.5px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.82);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.response-date {
  font-size: 10.5px;
  color: rgba(255, 255, 255, 0.38);
  font-weight: 400;
}

.response-arrow {
  color: rgba(255, 255, 255, 0.25) !important;
  flex-shrink: 0;
}

/* ── FOOTER ── */
.sidebar-footer {
  margin-top: auto;
  padding-bottom: 20px;
}

.sidebar-footer-text {
  font-size: 10px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.28);
  text-align: center;
  padding: 0 20px;
  letter-spacing: 0.3px;
}

/* ── MOBILE ── */
@media (max-width: 768px) {
  .custom-sidebar {
    top: 52px !important;
    height: calc(100% - 52px) !important;
  }
}
</style>
