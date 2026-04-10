import { createRouter, createWebHistory } from 'vue-router'
import SurveyView from '@/views/SurveyView.vue'

const routes = [
  {
    path: '/',
    name: 'Survey',
    component: SurveyView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
