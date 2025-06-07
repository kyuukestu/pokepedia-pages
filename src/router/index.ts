import { createRouter, createWebHistory } from 'vue-router'
// Make sure the file exists at this path, or update the path if needed
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
    {
      path: '/trainer-101',
      name: 'trainer-101',
      component: () => import('../views/Trainer101View.vue'),
    },
    {
      path: '/regions',
      name: 'regions',
      component: () => import('../views/RegionsView.vue'),
    },
    {
      path: '/law-enforcement',
      name: 'law-enforcement',
      component: () => import('../views/LawEnforcementView.vue'),
    },
    {
      path: '/supervisory-boards',
      name: 'supervisory-boards',
      component: () => import('../views/SupervisoryBoardsView.vue'),
    },
    {
      path: '/pokecorp',
      name: 'pokecorp',
      component: () => import('../views/PokeCorpView.vue'),
    },
    {
      path: '/pokeacademia',
      name: 'pokeacademia',
      component: () => import('../views/PokeAcademiaView.vue'),
    },
    {
      path: '/poketech',
      name: 'poketech',
      component: () => import('../views/PokeTechView.vue'),
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('../views/EventsView.vue'),
    },
    {
      path: '/misc',
      name: 'misc',
      component: () => import('../views/MiscView.vue'),
    },
    {
      path: '/characters',
      name: 'characters',
      component: () => import('../views/CharactersView.vue'),
    },
  ],
})

export default router
