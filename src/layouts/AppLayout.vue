<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useTheme, useDisplay } from 'vuetify'
import { useRoute, useRouter } from 'vue-router'
import SandboxNav from '@/components/nav/SandboxNav.vue'
import SyncNav from '@/components/nav/SyncNav.vue'

const drawer = ref(true)
const theme = useTheme()
const route = useRoute()
const router = useRouter()
const { mobile } = useDisplay()

// ── Theme toggle ────────────────────────────────────────────────────────────
const isDark = ref(theme.global.name.value === 'dark')
watch(isDark, (val) => {
  theme.global.name.value = val ? 'dark' : 'light'
})

// ── Breadcrumbs Logic ───────────────────────────────────────────────────────
const breadcrumbs = computed(() => {
  const pathArray = route.path.split('/').filter((p) => p)
  const items = [
    {
      title: 'Home',
      disabled: false,
      to: '/',
    },
  ]

  let currentPath = ''
  pathArray.forEach((path) => {
    currentPath += `/${path}`
    // Format the title: capitalize and remove dashes
    const title = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ')
    items.push({
      title,
      disabled: currentPath === route.path,
      to: currentPath,
    })
  })

  return items
})

const activeWorld = ref<'sandbox' | 'sync'>('sandbox')
const worlds = [
  { key: 'sandbox', label: 'Sandbox', icon: 'mdi-pokeball' },
  { key: 'sync', label: 'Sync', icon: 'mdi-sync' },
] as const

const topLinks = [
  { title: 'Home', icon: 'mdi-home-outline', to: '/' },
  { title: 'Welcome', icon: 'mdi-hand-wave-outline', to: '/welcome' },
  { title: 'Levels', icon: 'mdi-trending-up', to: '/level' },
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
      <template #divider>
        <v-icon icon="mdi-chevron-right" size="small" />
      </template>
    </v-breadcrumbs>

    <v-spacer />

    <template #append>
      <v-btn
        :icon="isDark ? 'mdi-weather-night' : 'mdi-weather-sunny'"
        variant="text"
        @click="isDark = !isDark"
      />
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" :width="300" temporary elevation="10">
    <div class="drawer-banner">
      <v-icon size="32" color="white" class="mb-1">mdi-pokeball</v-icon>
      <span class="drawer-banner__title">Pokémon RP Hub</span>
      <span class="drawer-banner__sub">Navigation</span>
    </div>

    <v-list density="compact" nav class="px-2 pt-3 pb-1">
      <v-list-item
        v-for="link in topLinks"
        :key="link.to"
        :prepend-icon="link.icon"
        :title="link.title"
        :to="link.to"
        :active="route.path === link.to"
        active-class="nav-item--active"
        rounded="lg"
        class="nav-item mb-1"
        @click="handleNavigation"
      />
    </v-list>

    <v-divider class="mx-3 mb-3" />

    <div class="px-4 mb-2">
      <span class="text-overline text-medium-emphasis font-weight-bold">Game Worlds</span>
    </div>

    <div class="px-3 mb-2">
      <v-btn-toggle
        v-model="activeWorld"
        variant="outlined"
        density="compact"
        divided
        class="world-toggle"
        mandatory
      >
        <v-btn
          v-for="world in worlds"
          :key="world.key"
          :value="world.key"
          :prepend-icon="world.icon"
          size="small"
          class="world-btn"
        >
          {{ world.label }}
        </v-btn>
      </v-btn-toggle>
    </div>

    <div class="sub-nav-body px-2">
      <SandboxNav v-if="activeWorld === 'sandbox'" @navigate="handleNavigation" />
      <SyncNav v-else @navigate="handleNavigation" />
    </div>

    <template #append>
      <v-divider />
      <div class="drawer-footer text-center py-2">
        <span class="text-caption text-disabled">Pokémon RP Hub · v1.0</span>
      </div>
    </template>
  </v-navigation-drawer>

  <v-main>
    <RouterView />
  </v-main>
</template>

<style scoped>
/* ── Breadcrumb Styling ────────────────────────────────────────────────── */
.breadcrumb-nav {
  font-size: 0.875rem;
  font-weight: 500;
}

:deep(.v-breadcrumbs-item--disabled) {
  opacity: 1;
  color: rgb(var(--v-theme-primary)) !important;
  font-weight: 700;
}

/* Original Drawer Styling continues below... */
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

.nav-item {
  transition: background 0.15s ease;
}

:deep(.nav-item--active) {
  font-weight: 600;
}

.world-toggle {
  width: 100%;
}

.world-btn {
  flex: 1;
  font-size: 0.8rem;
  font-weight: 500;
}

.sub-nav-body {
  flex: 1;
  overflow-y: auto;
}

.drawer-footer {
  padding: 8px 16px;
}

.v-navigation-drawer ::-webkit-scrollbar {
  width: 4px;
}
.v-navigation-drawer ::-webkit-scrollbar-track {
  background: transparent;
}
.v-navigation-drawer ::-webkit-scrollbar-thumb {
  background: rgba(128, 128, 128, 0.25);
  border-radius: 2px;
}
</style>
