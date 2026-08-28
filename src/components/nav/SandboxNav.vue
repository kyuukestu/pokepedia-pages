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
      // FIXED: Corrected spelling from 'assests' to 'assets'
      { title: 'Keen Eye News', customIcon: '/KENN.png', to: '/sandbox/kenn' },
      { title: 'Quest Board', icon: 'mdi-message-question', to: '/sandbox/quest-board' }
    ],
  },
  {
    label: 'Getting Started',
    items: [
      { title: 'Trainer 101', icon: 'mdi-school-outline', to: '/sandbox/trainer-101' },
      { title: 'Regions', icon: 'mdi-island-variant', to: '/sandbox/regions' },
      { title: 'Trainer Paths', icon: 'mdi-road-variant', to: '/sandbox/trainer-paths' },
    ],
  },
  {
    label: 'World',
    items: [
      { title: 'Academia', icon: 'mdi-book-open', to: '/sandbox/academia' },
      { title: 'Organizations', icon: 'mdi-trophy', to: '/sandbox/orgs' },
      { title: 'Technology', icon: 'mdi-star-circle', to: '/sandbox/tech' },
      { title: 'Lore', icon: 'mdi-compass', to: '/sandbox/lore' },
      // { title: 'Characters', icon: 'mdi-account', to: '/sandbox/characters' },
    ],
  },
]
</script>

<template>
  <v-list density="compact" nav class="sandbox-nav pa-0 bg-transparent">
    <template v-for="group in groups" :key="group.label">
      <v-list-subheader class="group-label text-overline font-weight-black">
        {{ group.label }}
      </v-list-subheader>

      <v-list-item
        v-for="item in group.items"
        :key="item.to"
        :title="item.title"
        :to="item.to"
        active-class="sandbox-nav-item--active"
        class="sandbox-nav-item mb-1 rounded-0"
        @click="nav"
      >
        <template v-slot:prepend>
          <!-- Use v-icon as a wrapper to normalize alignment -->
          <v-icon v-if="item?.customIcon" class="me-4" size="20">
            <div
              class="icon-mask"
              :style="
                {
                  width: '20px',
                  height: '20px',
                  maskImage: `url(${getImageUrl(item.customIcon)})`,
                  webkitMaskImage: `url(${getImageUrl(item.customIcon)})`,
                } as any
              "
            ></div>
          </v-icon>

          <!-- Standard MDI Fallback -->
          <v-icon v-else :icon="item.icon" size="20" class="me-4" />
        </template>
      </v-list-item>
    </template>
  </v-list>
</template>

<style scoped>
.sandbox-nav-item {
  transition: all 0.2s ease;
  border-left: 3px solid transparent; /* Keeps layout stable when active */
}

/* Updated selector to target the active state properly */
.sandbox-nav-item--active {
  font-weight: 900 !important;
  border-left: 3px solid rgb(var(--v-theme-primary)) !important;
  background-color: rgba(var(--v-theme-primary), 0.05);
}

.group-label {
  font-size: 0.65rem !important;
  letter-spacing: 0.15em;
  padding-top: 20px;
  opacity: 0.5;
}

.icon-mask {
  background-color: currentColor;
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;
  display: block; /* Changed from inline-block */
}
</style>
