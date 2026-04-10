<script setup lang="ts">
// components/nav/SandboxNav.vue
// Sub-navigation for all /sandbox/* routes.
// Emits 'navigate' so the parent layout can close the drawer on mobile.
import { useRoute } from 'vue-router'

const route = useRoute()
const emit = defineEmits<{ navigate: [] }>()

function nav() {
  emit('navigate')
}

// Groups mirror the folder structure under views/sandbox/
const groups = [
  {
    label: 'Overview',
    items: [
      { title: 'Home', icon: 'mdi-pokeball', to: '/sandbox' },
      { title: 'Rules', icon: 'mdi-gavel', to: '/sandbox/rules' },
      { title: 'Setting', icon: 'mdi-earth', to: '/sandbox/setting' },
      { title: 'Events', icon: 'mdi-calendar-star', to: '/sandbox/events' },
    ],
  },
  {
    label: 'Getting Started',
    items: [
      { title: 'Trainer 101', icon: 'mdi-school-outline', to: '/sandbox/trainer-101' },
      {
        title: 'Regions',
        icon: 'mdi-island-variant',
        to: '/sandbox/regions',
      },
      { title: 'Trainer Paths', icon: 'mdi-road-variant', to: '/sandbox/trainer-paths' },
    ],
  },
  {
    label: 'World',
    items: [
      { title: 'Organizations', icon: 'mdi-trophy', to: '/sandbox/orgs' },
      { title: 'Technology', icon: 'mdi-star-circle', to: '/sandbox/tech' },
      { title: 'Characters', icon: 'mdi-account', to: '/sandbox/characters' },
    ],
  },
]
</script>

<template>
  <v-list density="compact" nav class="sandbox-nav pa-0">
    <template v-for="group in groups" :key="group.label">
      <!-- Group label -->
      <v-list-subheader class="group-label text-overline">
        {{ group.label }}
      </v-list-subheader>

      <!-- Group items -->
      <v-list-item
        v-for="item in group.items"
        :key="item.to"
        :prepend-icon="item.icon"
        :title="item.title"
        :to="item.to"
        :active="route.path === item.to"
        active-class="sandbox-nav-item--active"
        rounded="lg"
        class="sandbox-nav-item mb-1"
        @click="nav"
      />
    </template>
  </v-list>
</template>

<style scoped>
.sandbox-nav {
  font-size: 0.875rem;
}

.group-label {
  font-size: 0.68rem !important;
  letter-spacing: 0.09em;
  padding-top: 12px;
  padding-bottom: 2px;
  min-height: unset;
  opacity: 0.6;
}

.sandbox-nav-item {
  transition: background 0.15s ease;
}

:deep(.sandbox-nav-item--active) {
  font-weight: 600;
  border-left: 3px solid rgb(var(--v-theme-primary));
}
</style>
