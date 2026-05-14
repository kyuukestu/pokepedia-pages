<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useTheme, useDisplay } from 'vuetify'
import { useRoute, useRouter, type RouteRecordRaw } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import Fuse from 'fuse.js'

// Components
import SandboxNav from '@/components/nav/SandboxNav.vue'

// Store
import { useEventStore } from '@/stores/eventStore'

// ── Initialization ──────────────────────────────────────────────────────────
const theme = useTheme()
const route = useRoute()
const router = useRouter()
const { mobile } = useDisplay()
const eventStore = useEventStore()

const drawer = ref(!mobile.value)

// ── Search Logic & Type Definitions ─────────────────────────────────────────
const searchInput = ref('')
const isSearchOpen = ref(false)

interface SearchResultItem {
  title: string
  breadcrumb: string
  path: string
  category: string
  isLive: boolean
}

type FlattenedRoute = RouteRecordRaw & { fullPath: string }

function flattenRoutes(
  allRoutes: RouteRecordRaw[],
  parentPath = '',
  flat: FlattenedRoute[] = [],
): FlattenedRoute[] {
  const seenPaths = new Set<string>()
  function recurse(items: RouteRecordRaw[], currentParent: string) {
    items.forEach((r) => {
      const fullPath = `${currentParent}/${r.path}`.replace(/\/+/g, '/')
      if (!seenPaths.has(fullPath) && (r.component || !r.children)) {
        seenPaths.add(fullPath)
        flat.push({ ...r, fullPath } as FlattenedRoute)
      }
      if (r.children?.length) recurse(r.children, fullPath)
    })
  }
  recurse(allRoutes, parentPath)
  return flat
}

const staticFlattenedRoutes = flattenRoutes([...routes])

/**
 * Extrapolates dynamic routes into real paths using store data.
 */
function extrapolateRoute(r: FlattenedRoute): SearchResultItem[] {
  const p = r.fullPath.toLowerCase()
  const results: SearchResultItem[] = []

  // Helper to check if event is live
  const checkLive = (path: string) => {
    const activeEvent = eventStore.events.find((e: any) => {
      const normalize = (val: string) => val.replace(/\/+$/, '').toLowerCase()
      const eventPath = e.internalPath || e.metadata?.path || ''
      return normalize(String(eventPath)) === normalize(path)
    })
    return activeEvent ? eventStore.isEventActive(activeEvent) : false
  }

  // 1. Handle Characters ([slug] or :slug)
  if (p.includes('slug')) {
    // If store has characters, expand them. If not, this loop just won't run.
    ;(eventStore as any).characters?.forEach((char: any) => {
      const path = r.fullPath.replace(/[:\[]slug[\]]?/gi, char.slug)
      results.push({
        title: char.name || char.slug,
        breadcrumb: `Characters > ${char.name}`,
        path,
        category: 'CHARACTER',
        isLive: checkLive(path),
      })
    })
  }
  // 2. Handle Regions ([regionId] or :regionId)
  else if (p.includes('regionid')) {
    ;(eventStore as any).regions?.forEach((reg: any) => {
      const path = r.fullPath.replace(/[:\[]regionid[\]]?/gi, reg.id)
      results.push({
        title: reg.name || reg.id,
        breadcrumb: `World > ${reg.name}`,
        path,
        category: 'REGION',
        isLive: checkLive(path),
      })
    })
  }

  return results
}

const searchIndex = computed(() => {
  void eventStore.currentRPDate // Maintain reactivity

  const index: SearchResultItem[] = []

  staticFlattenedRoutes.forEach((r) => {
    const p = r.fullPath.toLowerCase()
    if (p === '/' || p.startsWith('/sync')) return

    // If route is dynamic, try to extrapolate.
    // If extrapolation yields nothing (e.g. no data in store), we skip it to keep index clean.
    if (p.includes(':') || p.includes('[')) {
      const dynamicItems = extrapolateRoute(r)
      index.push(...dynamicItems)
    } else {
      // Standard static route
      const pathParts = r.fullPath.split('/').filter(Boolean)
      const title =
        pathParts[pathParts.length - 1]
          ?.replace(/-/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase()) || 'Page'

      const activeEvent = eventStore.events.find((e: any) => {
        const normalize = (val: string) => val.replace(/\/+$/, '').toLowerCase()
        const eventPath = e.internalPath || e.metadata?.path || ''
        return normalize(String(eventPath)) === normalize(r.fullPath)
      })

      index.push({
        title,
        breadcrumb: pathParts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' > '),
        path: r.fullPath,
        category: pathParts[0]?.toUpperCase() || 'SYSTEM',
        isLive: activeEvent ? eventStore.isEventActive(activeEvent) : false,
      })
    }
  })

  return index
})

const fuse = computed(
  () =>
    new Fuse(searchIndex.value, {
      keys: [
        { name: 'title', weight: 2 },
        { name: 'breadcrumb', weight: 1 },
        { name: 'category', weight: 0.5 },
      ],
      threshold: 0.3,
      ignoreLocation: true,
    }),
)

const searchResults = computed(() => {
  if (!searchInput.value) return []
  return fuse.value.search(searchInput.value).map((res) => res.item)
})

function onSearchSelect(item: SearchResultItem | null) {
  if (item?.path) {
    router.push(item.path)
    searchInput.value = ''
    isSearchOpen.value = false
  }
}

// ── UI States ───────────────────────────────────────────────────────────────
const isDark = ref(theme.global.name.value === 'dark')
watch(isDark, (val) => {
  theme.global.name.value = val ? 'dark' : 'light'
})

const breadcrumbs = computed(() => {
  const pathArray = route.path.split('/').filter((p) => p)
  const items = [{ title: 'Home', disabled: false, to: '/' }]
  let currentPath = ''
  pathArray.forEach((path) => {
    currentPath += `/${path}`
    items.push({
      title: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
      disabled: currentPath === route.path,
      to: currentPath,
    })
  })
  return items
})

const topLinks = [
  { title: 'Home', icon: 'mdi-home-outline', to: '/' },
  {
    title: 'About',
    icon: 'mdi-earth',
    to: '/',
    children: [
      {
        title: 'Levels in RP',
        icon: 'mdi-trending-up',
        to: '/level',
      },
      { title: 'General Rules', icon: 'mdi-gavel', to: '/sandbox/rules' },
      { title: 'RP Setting', icon: 'mdi-map', to: '/sandbox/setting' },
    ],
  },
  {
    title: 'Events',
    icon: 'mdi-calendar-star',
    to: '/sandbox/events',
    children: [
      { title: 'Event Library', icon: 'mdi-bookshelf', to: '/sandbox/events' },
      { title: 'Calendar View', icon: 'mdi-calendar-month', to: '/sandbox/events/calendar' },
    ],
  },
]

function handleNavigation() {
  if (mobile.value) drawer.value = false
}
</script>

<template>
  <v-app-bar elevation="1" density="compact">
    <template #prepend>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        v-if="route.path !== '/'"
        icon="mdi-chevron-left"
        variant="text"
        class="hidden-md-and-up"
        @click="router.back()"
      />
    </template>

    <v-breadcrumbs
      :items="breadcrumbs"
      class="pa-0 px-2 breadcrumb-nav text-truncate"
      density="compact"
    >
      <template #divider><v-icon icon="mdi-chevron-right" size="small" /></template>
    </v-breadcrumbs>

    <v-spacer />

    <div :class="['search-container', { 'search-container--open': isSearchOpen || !mobile }]">
      <v-autocomplete
        v-model:search="searchInput"
        :items="searchResults"
        item-title="title"
        placeholder="Search Database..."
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        density="compact"
        hide-details
        flat
        no-filter
        return-object
        class="search-bar"
        @update:model-value="onSearchSelect"
        @focus="isSearchOpen = true"
        @blur="isSearchOpen = false"
      >
        <template #item="{ props, item }">
          <v-list-item v-bind="props" :title="item.raw.title" :subtitle="item.raw.breadcrumb">
            <template #prepend>
              <v-icon
                :icon="item.raw.isLive ? 'mdi-broadcast' : 'mdi-subdirectory-arrow-right'"
                :color="item.raw.isLive ? 'error' : ''"
                size="small"
                class="mr-2"
              />
            </template>
            <template #append>
              <div class="d-flex align-center ga-2">
                <v-chip
                  v-if="item.raw.isLive"
                  size="x-small"
                  color="error"
                  variant="flat"
                  class="font-weight-bold pulse-animation"
                  >LIVE</v-chip
                >
                <v-chip size="x-small" label variant="tonal" color="primary">{{
                  item.raw.category
                }}</v-chip>
              </div>
            </template>
          </v-list-item>
        </template>
      </v-autocomplete>
    </div>

    <template #append>
      <v-btn
        :icon="isDark ? 'mdi-weather-night' : 'mdi-weather-sunny'"
        variant="text"
        @click="isDark = !isDark"
      />
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" :width="345" elevation="10">
    <div class="drawer-banner">
      <v-icon size="32" color="white" class="mb-1">mdi-pokeball</v-icon>
      <span class="drawer-banner__title">Pokémon Stories</span>
      <span class="drawer-banner__sub">Navigation</span>
    </div>

    <v-toolbar flat border color="transparent" density="compact">
      <v-spacer />
      <template v-for="link in topLinks" :key="link.title">
        <v-menu v-if="link.children" open-on-hover>
          <template #activator="{ props }">
            <v-btn v-bind="props" variant="text" :prepend-icon="link.icon" class="text-none">
              {{ link.title }} <v-icon end size="small">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list density="compact" nav>
            <v-list-item
              v-for="sublink in link.children"
              :key="sublink.to"
              :to="sublink.to"
              :prepend-icon="sublink.icon"
              :title="sublink.title"
              color="primary"
            />
          </v-list>
        </v-menu>
        <v-btn v-else variant="text" :to="link.to" :prepend-icon="link.icon" class="text-none">{{
          link.title
        }}</v-btn>
      </template>
    </v-toolbar>

    <v-divider class="mx-3 mb-3" />
    <div class="sub-nav-body px-2"><SandboxNav @navigate="handleNavigation" /></div>

    <template #append>
      <v-divider />
      <div class="drawer-footer text-center py-2">
        <span class="text-caption text-disabled">Pokémon RP Hub · v1.0</span>
      </div>
    </template>
  </v-navigation-drawer>

  <RouterView />
</template>

<style scoped>
.breadcrumb-nav {
  font-size: 0.875rem;
  font-weight: 500;
}
:deep(.v-breadcrumbs-item--disabled) {
  opacity: 1;
  color: rgb(var(--v-theme-primary)) !important;
  font-weight: 700;
}

.drawer-banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 20px 16px 18px;
  background: rgb(var(--v-theme-error));
  background-image:
    radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 60%),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='30' cy='30' r='18' fill='none' stroke='%23ffffff' stroke-width='0.8' opacity='0.12'/%3E%3Cline x1='12' y1='30' x2='48' y2='30' stroke='%23ffffff' stroke-width='0.8' opacity='0.12'/%3E%3Ccircle cx='30' cy='30' r='5' fill='none' stroke='%23ffffff' stroke-width='0.8' opacity='0.12'/%3E%3C/svg%3E");
}
.drawer-banner__title {
  color: white;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  line-height: 1.2;
}
.drawer-banner__sub {
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.sub-nav-body {
  flex: 1;
  overflow-y: auto;
}
.search-container {
  width: 40px;
  transition: all 0.3s ease;
  margin-left: 8px;
}
.search-container--open {
  width: 280px;
}
@media (max-width: 600px) {
  .search-container--open {
    width: 160px;
  }
}

:deep(.search-bar .v-field__outline) {
  display: none;
}
.pulse-animation {
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
.ga-2 {
  gap: 8px;
}

.v-navigation-drawer ::-webkit-scrollbar {
  width: 4px;
}
.v-navigation-drawer ::-webkit-scrollbar-thumb {
  background: rgba(128, 128, 128, 0.25);
  border-radius: 2px;
}
</style>
