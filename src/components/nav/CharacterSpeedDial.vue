<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

// Update our property expectations to look for clear subpage tokens instead of raw path strings
const props = defineProps<{
  links: Array<{ title: string; slug: string; icon: string }>
  rootPath: string
}>()

const route = useRoute()
const router = useRouter()

/**
 * Programmatically computes the precise path without relying on Vuetify's route tracker
 */
const getLinkPath = (slug: string) => {
  return slug === 'index' ? props.rootPath : `${props.rootPath}/${slug}`
}

const isLinkActive = (slug: string) => {
  const current = route.path.replace(/\/$/, '').toLowerCase()
  const target = getLinkPath(slug).replace(/\/$/, '').toLowerCase()
  return current === target
}

const isRoot = (slug: string) => {
  return slug === 'index'
}

/**
 * Programmatic Navigation Safeguard
 * Guarantees that router changes only push when explicitly clicked, using fully established params
 */
const navigateTo = (slug: string) => {
  const destination = getLinkPath(slug)
  router.push(destination)
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

      <!--
        TACTICAL FIX:
        We strip out ':to' entirely. Vuetify will no longer attempt background routing logic,
        and our explicit click event execution locks out malformed navigation loops.
      -->
      <v-btn
        v-for="link in links"
        :key="link.slug"
        @click="navigateTo(link.slug)"
        :color="
          isLinkActive(link.slug) ? 'primary' : isRoot(link.slug) ? 'white' : 'surface-variant'
        "
        :class="{
          'active-dial-item': isLinkActive(link.slug),
          'home-dial-btn': isRoot(link.slug),
        }"
        icon
        size="small"
        class="mb-2 dial-btn"
        :elevation="isRoot(link.slug) ? 4 : 2"
      >
        <v-icon size="20">
          {{ isRoot(link.slug) ? 'mdi-home-account' : link.icon }}
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
  bottom: 40px;
  right: 40px;
  z-index: 200;
}

.dial-btn {
  overflow: visible !important;
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
