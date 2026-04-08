import type { Component } from 'vue'
import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from 'vue-router'

// ---------------------------------------------------------------------------
// Dynamic route generation
// ---------------------------------------------------------------------------
// Convention: every routable page is an index.vue inside a named folder.
// The glob only matches index.vue files, so co-located helpers, components,
// and type files are never accidentally picked up as routes.
//
// File path → Route path mapping:
//   views/index.vue                          → /
//   views/sandbox/index.vue                  → /sandbox
//   views/sandbox/trainer-101/index.vue      → /sandbox/trainer-101
//   views/sandbox/trainer-101/ids/index.vue  → /sandbox/trainer-101/ids
// ---------------------------------------------------------------------------

const componentModules = import.meta.glob('../views/**/index.vue')

const dynamicRoutes: RouteRecordRaw[] = []

for (const path in componentModules) {
  // Strip the prefix and the trailing /index.vue to isolate the route segment
  let routePath = path.replace('../views', '').replace('/index.vue', '')

  // The root views/index.vue maps to '/'
  if (routePath === '') routePath = '/'

  // Derive a stable, human-readable route name from the path segments
  // e.g. '/sandbox/trainer-101/ids' → 'sandbox-trainer-101-ids'
  const name = routePath === '/' ? 'home' : routePath.replace(/^\//, '').replace(/\//g, '-')

  dynamicRoutes.push({
    path: routePath,
    name,
    component: () => componentModules[path]() as Promise<Component>,
  })
}

if (import.meta.env.DEV) {
  console.log(
    '[router] Registered dynamic routes:\n',
    dynamicRoutes.map((r) => `  ${String(r.name).padEnd(36)} → ${r.path}`).join('\n'),
  )
}

// ---------------------------------------------------------------------------
// Router
// ---------------------------------------------------------------------------

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    // All routes are fully dynamic — no hardcoded entries needed.
    // Add entries here only for redirects or special layout wrappers.
    //
    // Example redirect:
    // { path: '/old-path', redirect: '/new-path' },
    //
    // Example named layout wrapper (does not render a page itself):
    // { path: '/sandbox', component: SandboxLayout, children: [...] },

    ...dynamicRoutes,

    // 404 catch-all — must be last
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/_special/not-found/index.vue'),
    },
  ],

  scrollBehavior(to: RouteLocationNormalized, _from: RouteLocationNormalized, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 0, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
