import { createRouter, createWebHistory } from 'vue-router'
// Make sure the file exists at this path, or update the path if needed

const sandboxLinks = [
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

const syncLinks = [
  { title: 'Setting' },
  { title: 'Fortitude' },
  { title: 'Sync Events' },
  { title: 'Swarms' },
  { title: 'PokeJobs' },
  { title: 'Vocations' },
  { title: 'PokeAcademy' },
]

const sandboxRoutes = sandboxLinks.map((route) => ({
  path: `${route.title.toLowerCase().replace(' ', '-')}`,
  name: route.title,
  component: () => import(`../views/sandbox/ToC/${route.title.replace(' ', '')}View.vue`),
}))

const syncRoutes = syncLinks.map((route) => ({
  path: `${route.title.toLowerCase().replace(' ', '-')}`,
  name: route.title,
  component: () => import(`../views/sync/ToC/${route.title.replace(' ', '')}View.vue`),
}))

// console.log(`Sandbox Routes: ${JSON.stringify(sandboxRoutes)}`)
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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('../views/WelcomeView.vue'),
    },
    // Sandbox Routes
    {
      path: '/sandbox',
      children: sandboxRoutes,
    },
    // Sync Routes
    {
      path: '/sync',
      children: syncRoutes,
    },
  ],
})

export default router
