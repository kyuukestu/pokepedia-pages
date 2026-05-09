import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const path = to.path.toLowerCase()
  console.log(from)

  // 1. Redirect root to /sandbox/
  if (path === '/') {
    return next('/sandbox/')
  }

  // 2. Block Sync access and redirect to /sandbox/
  if (path.startsWith('/sync')) {
    console.warn(`Sync RP is inactive. Redirecting to Sandbox.`)
    return next('/sandbox/')
  }

  next()
})

console.log('Auto-Routes:', routes)

export default router
