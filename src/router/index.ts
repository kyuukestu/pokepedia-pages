import type { Component } from 'vue'
import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from 'vue-router'

// Make sure the file exists at this path, or update the path if needed

const componentModules = import.meta.glob('../views/**/*.vue')

const dynamicRoutes: RouteRecordRaw[] = []

for (const path in componentModules) {
  const fileName = path.split('/').pop()

  if (!fileName) continue

  const routeName = fileName

  let routePath = path.replace('../views', '')

  if (!routePath.startsWith('/')) {
    routePath = '/' + routePath
  }

  dynamicRoutes.push({
    path: routePath,
    name: routeName,
    component: () => componentModules[path]() as Promise<Component>,
  })
}

console.log('Routes: ', dynamicRoutes)

const sandboxLinks = [
  { title: '' },
  { title: 'Trainer 101' },
  { title: 'Regions' },
  { title: 'Law Enforcement' },
  { title: 'Supervisory Boards' },
  { title: 'PokeCorp' },
  { title: 'PokeAcademia' },
  { title: 'PokeTech' },
  { title: 'Sandbox Events' },
  { title: 'Characters' },
  { title: 'Misc' },
]

const sandboxTrainerContentLinks = [
  { title: 'Trainer101.Trainer-IDs' },
  { title: 'Trainer101.Permit.Sky' },
  { title: 'Trainer101.Permit.Land' },
  { title: 'Trainer101.Permit.Water' },
]

const syncLinks = [
  { title: '' },
  { title: 'Setting' },
  { title: 'Fortitude' },
  { title: 'Sync Events' },
  { title: 'Swarms' },
  { title: 'PokeJobs' },
  { title: 'Vocations' },
  { title: 'PokeAcademy' },
]

const sandboxRoutes = sandboxLinks.map((route) => {
  if (route.title === '') {
    return {
      path: '/sandbox',
      name: 'sandbox',
      component: () => import('../views/sandbox/SandboxView.vue'),
    }
  } else {
    return {
      path: `${route.title.toLowerCase().replace(' ', '-')}`,
      name: route.title,
      component: () => import(`../views/sandbox/main/${route.title.replace(' ', '')}View.vue`),
    }
  }
})

const sandboxTrainerContentRoutes = sandboxTrainerContentLinks.map((route) => {
  return {
    path: `content/${route.title.toLowerCase().replace(' ', '-')}`,
    name: route.title,
    component: () => import(`../views/sandbox/content/${route.title.replace(' ', '')}View.vue`),
  }
})

// console.log('Content Routes', JSON.stringify(sandboxTrainerContentRoutes))

const syncRoutes = syncLinks.map((route) => {
  if (route.title === '') {
    return {
      path: '/sync',
      name: 'sync',
      component: () => import('../views/sync/SyncView.vue'),
    }
  } else {
    return {
      path: `${route.title.toLowerCase().replace(' ', '-')}`,
      name: route.title,
      component: () => import(`../views/sync/${route.title.replace(' ', '')}View.vue`),
    }
  }
})

// console.log(`Sandbox Routes: ${JSON.stringify(sandboxRoutes).toString()}`)
// console.log(`Sync Routes: ${JSON.stringify(syncRoutes)}`)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/level',
      name: 'level',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LevelView.vue'),
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('../views/WelcomeView.vue'),
    },
    ...dynamicRoutes,
    // Sandbox Routes

    // {
    //   path: '/sandbox',
    //   children: [...sandboxRoutes, ...sandboxTrainerContentRoutes],
    // },
    // Sync Routes
    // {
    //   path: '/sync',
    //   children: syncRoutes,
    // },
  ],
  scrollBehavior(to: RouteLocationNormalized, _from: RouteLocationNormalized, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return {
        el: to.hash,
        top: 0,

        behavior: 'smooth',
      }
    }

    return {
      top: 0,
      behavior: 'smooth',
    }
  },
})

export default router
