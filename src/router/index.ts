import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { useCharacterStore } from '@/stores/useCharacterStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, _from, next) => {
  const path = to.path.toLowerCase()

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

// Global intercept gatekeeper for character subpages
router.beforeEach(async (to, _from, next) => {
  // Guard early if we aren't even targeting the character sandbox profile directory
  if (!to.path.startsWith('/sandbox/characters/')) {
    return next()
  }

  const segments = to.path.split('/').filter(Boolean)

  // Root profile: ['sandbox', 'characters', region, category, id] (length == 5)
  // Subpages: ['sandbox', 'characters', region, category, id, subpage] (length == 6)
  if (segments.length > 5) {
    // 1. Force TypeScript to see the parameters for THIS specific route block structure
    const params = to.params as {
      region?: string
      category?: string
      id?: string
      subpage?: string
    }

    // 2. Extract cleanly without any TypeScript union type complaints
    const region = params.region
    const category = params.category
    const id = params.id
    const subpage = params.subpage

    // Defensive check: If the URL parameters themselves are corrupt or missing,
    // clear the navigation stack safely to prevent infinite loop errors
    if (!region || !category || !id) {
      return next()
    }

    const store = useCharacterStore()
    const targetTab = subpage || 'index'

    try {
      // 2. Fetch the target subpage payload reactively via the store's glob manifest
      await store.fetchCharacter(region, category, id, targetTab)

      // Structural validation: verify data integrity
      const hasData =
        store.activeData &&
        (!Array.isArray(store.activeData) || store.activeData.length > 0) &&
        (typeof store.activeData !== 'object' || Object.keys(store.activeData).length > 0)

      if (!hasData) {
        // Safe fallback bounce back to the character's root profile page
        return next(`/sandbox/characters/${region}/${category}/${id}`)
      }
    } catch (error) {
      console.error('Tactical Auto-Route Intercept: Failed to load target file data.', error)

      // 3. FIXED FALLBACK: Explicitly includes the full dynamic template structure
      return next(`/sandbox/characters/${region}/${category}/${id}`)
    }
  }

  next()
})

console.log('Auto-Routes:', routes)

export default router
