<script setup lang="ts">
import { getImageUrl } from '@/utils/path-resolvers'

type SandboxNavItem = {
  title: string
  to: string
  customIcon?: string
  icon?: string
}

const emit = defineEmits<{ navigate: [] }>()

function nav() {
  emit('navigate')
}

const groups: Array<{ label: string; items: SandboxNavItem[] }> = [
  {
    label: 'Overview',
    items: [
      { title: 'Keen Eye News', customIcon: '/KENN.png', to: '/sandbox/kenn' },
      { title: 'Quest Board', icon: 'mdi-message-question-outline', to: '/sandbox/quest-board' },
    ],
  },
  {
    label: 'Getting Started',
    items: [
      { title: 'Trainer 101', icon: 'mdi-school-outline', to: '/sandbox/trainer-101' },
      { title: 'Regions', icon: 'mdi-compass-rose', to: '/sandbox/regions' },
      { title: 'Trainer Paths', icon: 'mdi-map-marker-path', to: '/sandbox/trainer-paths' },
    ],
  },
  {
    label: 'World Lore',
    items: [
      { title: 'Academia', icon: 'mdi-book-open-page-variant-outline', to: '/sandbox/academia' },
      { title: 'Organizations', icon: 'mdi-shield-crown-outline', to: '/sandbox/orgs' },
      { title: 'Technology', icon: 'mdi-lightning-bolt-outline', to: '/sandbox/tech' },
    ],
  },
]
</script>

<template>
  <v-list density="compact" nav class="sandbox-nav pa-0 bg-transparent">
    <template v-for="(group, index) in groups" :key="group.label">
      <!-- Native Vuetify Subheader (Hides automatically in rail mode) -->
      <v-list-subheader 
        class="group-label font-serif text-uppercase text-medium-emphasis px-2"
        :class="{ 'mt-2': index > 0 }"
      >
        {{ group.label }}
      </v-list-subheader>

      <v-list-item
        v-for="item in group.items"
        :key="item.to"
        :title="item.title"
        :to="item.to"
        active-class="sandbox-nav-item--active"
        class="sandbox-nav-item my-1"
        @click="nav"
      >
        <template v-slot:prepend>
          <!-- Custom Asset Mask Icon -->
          <v-icon v-if="item?.customIcon" class="me-3" size="18">
            <div
              class="icon-mask"
              :style="{
                width: '18px',
                height: '18px',
                maskImage: `url(${getImageUrl(item.customIcon)})`,
                webkitMaskImage: `url(${getImageUrl(item.customIcon)})`,
              }"
            ></div>
          </v-icon>

          <!-- Standard MDI Fallback Icon -->
          <v-icon v-else :icon="item.icon" size="18" class="me-3" />
        </template>
      </v-list-item>
    </template>
  </v-list>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;1,400&display=swap');

.font-serif {
  font-family: 'Lora', Georgia, serif !important;
}

:deep(.v-list-subheader) {
  font-size: 0.68rem !important;
  font-weight: 700;
  letter-spacing: 0.08em;
  height: 24px !important;
  min-height: 24px !important;
}

.sandbox-nav-item {
  border-radius: 8px !important;
  transition: all 0.2s ease;
  color: rgba(var(--v-theme-on-surface), 0.75) !important;
  font-size: 0.875rem;
}

.sandbox-nav-item:hover {
  background-color: rgba(var(--v-theme-on-surface), 0.04) !important;
  color: rgba(var(--v-theme-on-surface), 0.95) !important;
  transform: translateX(3px);
}

/* Active Highlight Styling */
.sandbox-nav-item--active {
  font-weight: 700 !important;
  color: #2E7D32 !important;
  background-color: rgba(76, 175, 80, 0.1) !important;
  border-left: 3px solid #2E7D32 !important;
}

.v-theme--dark .sandbox-nav-item--active {
  color: #A5D6A7 !important;
  background-color: rgba(129, 199, 132, 0.12) !important;
  border-left-color: #81C784 !important;
}

.icon-mask {
  background-color: currentColor;
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;
  display: block;
}
</style>
