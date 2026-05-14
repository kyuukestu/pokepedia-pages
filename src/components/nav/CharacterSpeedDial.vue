<script setup lang="ts">
import { useRoute } from 'vue-router'

const props = defineProps<{
  links: Array<{ title: string; to: string; icon: string }>
  rootPath: string
}>()

const route = useRoute()

const isLinkActive = (path: string) => {
  const current = route.path.replace(/\/$/, '').toLowerCase()
  const target = path.replace(/\/$/, '').toLowerCase()
  return current === target
}

const isRoot = (path: string) => {
  return path.toLowerCase() === props.rootPath.toLowerCase()
}
</script>

<template>
  <div class="speed-dial-anchor">
    <v-speed-dial transition="slide-y-reverse-transition">
      <template #activator="{ props: activatorProps }">
        <v-fab
          v-bind="activatorProps"
          icon="mdi-account-cog"
          size="large"
          color="primary"
          class="mb-4 mr-4"
          :style="{ marginRight: '2vw', marginBottom: '2vw' }"
        />
      </template>

      <v-btn
        v-for="link in links"
        :key="link.to.replace(/\//g, '-')"
        :to="link.to"
        :color="isLinkActive(link.to) ? 'primary' : isRoot(link.to) ? 'white' : 'surface-variant'"
        :class="{
          'active-dial-item': isLinkActive(link.to),
          'home-dial-btn': isRoot(link.to),
        }"
        icon
        size="small"
        class="mb-2 dial-btn"
        :elevation="isRoot(link.to) ? 4 : 2"
      >
        <v-icon size="20">
          {{ isRoot(link.to) ? 'mdi-home-account' : link.icon }}
        </v-icon>
        <span class="custom-label">{{ link.title }}</span>
      </v-btn>
    </v-speed-dial>
  </div>
</template>
<style scoped>
/* Manually handle positioning since we are outside v-main */
.speed-dial-anchor {
  position: fixed;
  bottom: 40px; /* Adjust to taste */
  right: 40px; /* Adjust to taste */
  z-index: 200;
}

.dial-btn {
  overflow: visible !important;
  /* Keep movement instant, only animate color/opacity */
  transition:
    background-color 0.2s ease,
    opacity 0.2s ease !important;
}

/* THE STRIKING ACTIVE STATE */
.active-dial-item {
  box-shadow: 0 0 15px rgb(var(--v-theme-primary)) !important;
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
}

.active-dial-item .v-icon {
  animation: pulse-icon 2.5s infinite ease-in-out;
}

@keyframes pulse-icon {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}

/* Ensure the Overview (Home) button is never dim */
.home-dial-btn:not(.active-dial-item) {
  background-color: #ffffff !important;
  color: #000000 !important;
  opacity: 1 !important;
}

/* Prevent Vuetify from dimming any icons */
.dial-btn .v-icon {
  opacity: 1 !important;
}

.custom-label {
  position: absolute;
  right: 52px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #333;
  color: white;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 800;
  white-space: nowrap;
  pointer-events: none;
  text-transform: uppercase;
}
</style>
