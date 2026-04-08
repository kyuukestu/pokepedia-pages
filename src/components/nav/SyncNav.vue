<script setup lang="ts">
// components/nav/SyncNav.vue
// Sub-navigation for all /sync/* routes.
// Emits 'navigate' so the parent layout can close the drawer on mobile.
// TODO: Populate with real Sync routes when that section is built out.
import { useRoute } from 'vue-router'

const route = useRoute()
const emit = defineEmits<{ navigate: [] }>()

function nav() {
  emit('navigate')
}

const items = [
  { title: 'Sync Home', icon: 'mdi-sync', to: '/sync' },
  { title: 'Overview', icon: 'mdi-information-outline', to: '/sync/overview' },
]
</script>

<template>
  <v-list density="compact" nav class="sync-nav pa-0">
    <v-list-subheader class="group-label text-overline">Sync</v-list-subheader>

    <v-list-item
      v-for="item in items"
      :key="item.to"
      :prepend-icon="item.icon"
      :title="item.title"
      :to="item.to"
      :active="route.path === item.to"
      active-class="sync-nav-item--active"
      rounded="lg"
      class="sync-nav-item mb-1"
      @click="nav"
    />

    <div class="pa-3 text-center">
      <v-icon size="32" class="mb-2 text-medium-emphasis">mdi-sync</v-icon>
      <p class="text-caption text-medium-emphasis">Sync content coming soon.</p>
    </div>
  </v-list>
</template>

<style scoped>
.group-label {
  font-size: 0.68rem !important;
  letter-spacing: 0.09em;
  padding-top: 12px;
  padding-bottom: 2px;
  min-height: unset;
  opacity: 0.6;
}

.sync-nav-item {
  transition: background 0.15s ease;
}

:deep(.sync-nav-item--active) {
  font-weight: 600;
  border-left: 3px solid rgb(var(--v-theme-primary));
}
</style>
