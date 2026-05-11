import { createRouter, createWebHistory } from 'vue-router'
import SurveyView from '@/views/SurveyView.vue'
import ResponseView from '@/views/ResponseView.vue'

const routes = [
  {
    path: '/',
    name: 'Survey',
    component: SurveyView,
  },

  {
    path: '/responses',
    name: 'responses',
    component: ResponseView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
