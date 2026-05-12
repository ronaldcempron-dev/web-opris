import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/',
    name: 'survey',
    component: () => import('@/views/SurveyView.vue'),
    meta: { requiresAuth: true, allowedRole: 'enumerator' },
  },
  {
    path: '/responses',
    name: 'responses',
    component: () => import('@/views/ResponseView.vue'),
    meta: { requiresAuth: true, allowedRole: 'admin' },
  },
  {
    path: '/reports',
    name: 'reports',
    component: () => import('@/views/ReportsView.vue'),
    meta: { requiresAuth: true, allowedRole: 'admin' },
  },
  { path: '/:pathMatch(.*)*', redirect: '/login' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const homeFor = (role) => (role === 'admin' ? '/responses' : '/')

router.beforeEach(async (to) => {
  const auth = useAuthStore()

  if (!auth.ready) await auth.init()

  const loggedIn = !!auth.user

  if (to.meta.guestOnly && loggedIn) {
    return homeFor(auth.role)
  }

  if (to.meta.requiresAuth && !loggedIn) {
    return '/login'
  }

  if (to.meta.allowedRole && auth.role !== to.meta.allowedRole) {
    return homeFor(auth.role)
  }
})

export default router
