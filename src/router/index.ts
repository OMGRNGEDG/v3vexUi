import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuth } from '@/auth/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const { isAuthed } = useAuth()

  if (to.meta.requiresAuth && !isAuthed.value) {
    return {
      name: 'login',
      query: { redirect: to.fullPath }
    }
  }

  if (to.meta.guestOnly && isAuthed.value) {
    return { name: 'home' }
  }
})

