<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useTheme, useDisplay } from 'vuetify'
import { useRoute, useRouter, type RouteRecordRaw } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import Fuse from 'fuse.js'

// Components
import SandboxNav from '@/components/nav/SandboxNavItems.vue'

// Store
import { useEventStore } from '@/stores/eventStore'

const theme = useTheme()
const route = useRoute()
const router = useRouter()
const { mobile } = useDisplay()
const eventStore = useEventStore()

const isRail = ref(true)

// Tracks whether the hover drawer is currently expanded
const isHovering = ref(false)

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

function extrapolateRoute(r: FlattenedRoute): SearchResultItem[] {
  const p = r.fullPath.toLowerCase()
  const results: SearchResultItem[] = []

  const checkLive = (path: string) => {
    const activeEvent = eventStore.events.find((e: any) => {
      const normalize = (val: string) => val.replace(/\/+$/, '').toLowerCase()
      const eventPath = e.internalPath || e.metadata?.path || ''
      return normalize(String(eventPath)) === normalize(path)
    })
    return activeEvent ? eventStore.isEventActive(activeEvent) : false
  }

  if (p.includes('slug')) {
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
  } else if (p.includes('regionid')) {
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
  void eventStore.currentRPDate
  const index: SearchResultItem[] = []

  staticFlattenedRoutes.forEach((r) => {
    const p = r.fullPath.toLowerCase()
    if (p === '/' || p.startsWith('/sync')) return

    if (p.includes(':') || p.includes('[')) {
      const dynamicItems = extrapolateRoute(r)
      index.push(...dynamicItems)
    } else {
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
  { title: 'Rules', icon: 'mdi-gavel', to: '/sandbox/rules' },
  
]

function handleNavigation() {
  if (mobile.value) isRail.value = true
}
</script>

<template>
  <v-app-bar :elevation="0" density="compact" class="notebook-app-bar">
    <template #prepend>
      <v-app-bar-nav-icon @click.stop="isRail = !isRail" class="nav-toggle" />
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
      class="pa-0 px-2 breadcrumb-nav font-serif text-truncate"
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
        placeholder="Search Field Notes..."
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
                >
                  LIVE
                </v-chip>
                <v-chip size="x-small" label variant="tonal" color="success">
                  {{ item.raw.category }}
                </v-chip>
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
        class="theme-toggle"
      />
    </template>
  </v-app-bar>

  <v-navigation-drawer
    class="notebook-drawer"
    :width="300"
    :rail-width="64"
    :rail="isRail"
    expand-on-hover
    permanent
    border="none"
    @update:is-hovering="isHovering = $event"
  >
    <div class="drawer-header pa-3 py-4">
      <div class="d-flex align-center ga-3 overflow-hidden">
        <div class="header-icon-box flex-shrink-0">
          <v-icon color="amber-lighten-2" size="20">mdi-book-open-page-variant-outline</v-icon>
        </div>
        <div class="header-text-group text-no-wrap">
          <h2 class="text-subtitle-1 font-weight-bold font-serif leading-none header-title">
            Navigation
          </h2>
          <span class="text-caption header-subtitle">Pokémon Roleplay</span>
        </div>
      </div>
    </div>

    <v-list density="compact" nav class="px-2 py-0 bg-transparent">
      <template v-for="link in topLinks" :key="link.title">
        <v-menu v-if="link.children" open-on-hover location="right">
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              :prepend-icon="link.icon"
              :title="link.title"
              class="font-serif my-1"
            >
              <template #append>
                <v-icon size="x-small" class="menu-arrow">mdi-chevron-right</v-icon>
              </template>
            </v-list-item>
          </template>
          <v-list density="compact" nav class="notebook-menu pa-2">
            <v-list-item
              v-for="sublink in link.children"
              :key="sublink.to"
              :to="sublink.to"
              :prepend-icon="sublink.icon"
              :title="sublink.title"
              color="amber-lighten-2"
            />
          </v-list>
        </v-menu>
        <v-list-item
          v-else
          :to="link.to"
          :prepend-icon="link.icon"
          :title="link.title"
          class="font-serif my-1"
        />
      </template>
    </v-list>

    <v-divider class="notebook-divider mx-3 my-2" />

    <div class="sub-nav-body px-2">
      <div class="sub-nav-container pa-1">
        <SandboxNav
          :is-rail-collapsed="isRail && !isHovering"
          @navigate="handleNavigation"
        />
      </div>
    </div>
  </v-navigation-drawer>

  <RouterView />
</template>

<style scoped>
/* Dark Mode Base Aesthetics */
.notebook-drawer {
  background-color: #1a1a1a !important;
  border-right: 1px solid #2d2925 !important;
  transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.notebook-app-bar {
  background: rgba(18, 18, 18, 0.85) !important;
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #2d2925 !important;
}

.header-title {
  color: #f5f0eb;
}

.header-subtitle {
  color: #ffb74d;
  font-style: italic;
}

.header-icon-box {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background: #28221b;
  border: 1px solid #524436;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notebook-divider {
  border-color: #3a342c !important;
  opacity: 1 !important;
}

.notebook-menu {
  background-color: #1e1e1e !important;
  border: 1px solid #3d332a !important;
  box-shadow: 4px 4px 0px #000000 !important;
}

.font-serif {
  font-family: 'Georgia', serif !important;
}

.leading-none {
  line-height: 1.2 !important;
}

.breadcrumb-nav {
  font-size: 0.875rem;
}

.search-container {
  width: 40px;
  transition: all 0.3s ease;
  margin-left: 8px;
}

.search-container--open {
  width: 260px;
}

@media (max-width: 600px) {
  .search-container--open {
    width: 150px;
  }
}

:deep(.search-bar .v-field) {
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05) !important;
}

:deep(.search-bar .v-field__outline) {
  display: none;
}

.pulse-animation {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.ga-2 { gap: 8px; }
.ga-3 { gap: 12px; }

:deep(.v-navigation-drawer--rail:not(.v-navigation-drawer--is-hovering)) {
  .header-text-group,
  .menu-arrow {
    display: none !important;
  }
}

.sub-nav-body {
  flex: 1;
  overflow-y: auto;
}

.sub-nav-container {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 4px;
  border: 1px dashed #3a342c;
}

.notebook-drawer ::-webkit-scrollbar {
  width: 4px;
}

.notebook-drawer ::-webkit-scrollbar-thumb {
  background: #3d332a;
  border-radius: 4px;
}
</style>
