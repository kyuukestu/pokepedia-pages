<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTheme, useDisplay } from 'vuetify'
import { useRoute } from 'vue-router'

// Controls collapsed/expanded state (starts collapsed as a rail)
const isRail = ref(true)
const theme = useTheme()
const route = useRoute()
const { mobile } = useDisplay()
const icon = ref('mdi-weather-sunny')
const navTitles = ['Pokémon Stories']

watch(
  () => theme.global.name.value,
  (newValue) => {
    icon.value = newValue === 'dark' ? 'mdi-weather-night' : 'mdi-weather-sunny'
  },
)

const toggleTheme = () => {
  theme.global.name.value = theme.global.name.value === 'dark' ? 'light' : 'dark'
}

// Auto-collapse rail on mobile after navigation
const handleNavigation = () => {
  if (mobile.value) {
    isRail.value = true
  }
}
</script>

<template>
  <v-app-bar :elevation="0" app density="compact" class="notebook-app-bar">
    <template v-slot:prepend>
      <!-- Clicking toggles rail between collapsed (64px) and expanded (300px) -->
      <v-app-bar-nav-icon @click.stop="isRail = !isRail" class="nav-toggle" />
    </template>

    <v-toolbar-title class="app-title font-serif">
      Pokémon RP Hub
    </v-toolbar-title>

    <v-spacer />

    <v-btn :icon="icon" @click="toggleTheme" variant="text" class="theme-toggle" />
  </v-app-bar>

  <v-navigation-drawer
    class="notebook-drawer"
    :width="300"
    :rail-width="64"
    :rail="isRail"
    expand-on-hover
    permanent
    border="none"
  >
    <!-- Journal Header -->
    <div class="drawer-header pa-3 py-4">
      <div class="d-flex align-center ga-3 overflow-hidden">
        <div class="header-icon-box flex-shrink-0">
          <v-icon color="green-darken-3" size="20">mdi-book-open-page-variant-outline</v-icon>
        </div>
        <div class="header-text-group text-no-wrap">
          <h2 class="text-subtitle-1 font-weight-bold font-serif text-high-emphasis leading-none">
            Field Journal
          </h2>
          <span class="text-caption text-medium-emphasis">Navigation Directory</span>
        </div>
      </div>
    </div>

    <v-divider class="notebook-divider mx-3 mb-2" />

    <!-- Main Navigation List -->
    <v-list density="compact" nav class="main-nav-list px-2">
      <v-list-item
        prepend-icon="mdi-home-outline"
        title="Home Sandbox"
        value="home"
        to="/sandbox"
        :active="route.path === '/sandbox'"
        class="nav-item"
        @click="handleNavigation"
      />

      <v-list-item
        prepend-icon="mdi-chart-bar-stacked"
        title="Levels Directory"
        value="level"
        to="/level"
        :active="route.path === '/level'"
        class="nav-item"
        @click="handleNavigation"
      />
    </v-list>

    <v-divider class="notebook-divider mx-3 my-3" />

    <!-- Sub Navigation Section -->
    <div class="px-2 overflow-hidden">
      <div class="sub-nav-header px-2 py-2 d-flex align-center ga-3 text-no-wrap">
        <v-icon size="18" color="green-darken-2" class="flex-shrink-0">mdi-compass-outline</v-icon>
        <span class="sub-nav-title text-caption font-serif font-weight-bold text-medium-emphasis text-uppercase tracking-wide">
          {{ navTitles[0] }}
        </span>
      </div>

      <div class="sub-nav-container pa-1">
        <SyncNav @navigate="handleNavigation" />
      </div>
    </div>

    <!-- Footer -->
    <template v-slot:append>
      <div class="drawer-footer pa-3 overflow-hidden">
        <v-divider class="notebook-divider mb-3" />
        <div class="footer-text text-caption font-serif text-center text-medium-emphasis text-no-wrap">
          Pokémon RP Hub &bull; v1.0
        </div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;0,700;1,400&display=swap');

.font-serif {
  font-family: 'Lora', Georgia, serif !important;
}

.tracking-wide {
  letter-spacing: 0.05em !important;
}

.leading-none {
  line-height: 1.2 !important;
}

/* App Bar Styling */
.notebook-app-bar {
  background: rgba(var(--v-theme-surface), 0.85) !important;
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.06) !important;
}

.app-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: rgba(var(--v-theme-on-surface), 0.9);
}

/* Drawer Paper & Rail Mechanics */
.notebook-drawer {
  background-color: #FAF8F5 !important;
  border-right: 1px solid rgba(var(--v-theme-on-surface), 0.08) !important;
  transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.v-theme--dark .notebook-drawer {
  background-color: #1E1E1E !important;
}

.header-icon-box {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(76, 175, 80, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.notebook-divider {
  border-color: rgba(var(--v-theme-on-surface), 0.08) !important;
  opacity: 1 !important;
}

/* Hide extra text elements when drawer is in collapsed rail state */
.v-navigation-drawer--rail:not(.v-navigation-drawer--is-hovering) .header-text-group,
.v-navigation-drawer--rail:not(.v-navigation-drawer--is-hovering) .sub-nav-title,
.v-navigation-drawer--rail:not(.v-navigation-drawer--is-hovering) .footer-text {
  opacity: 0;
  pointer-events: none;
}

.header-text-group,
.sub-nav-title,
.footer-text {
  transition: opacity 0.2s ease;
}

/* Nav Link Item Mechanics */
.nav-item {
  border-radius: 8px;
  margin-bottom: 4px;
  color: rgba(var(--v-theme-on-surface), 0.8) !important;
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.nav-item:hover {
  background-color: rgba(var(--v-theme-on-surface), 0.04) !important;
}

.nav-item.v-list-item--active {
  background-color: rgba(76, 175, 80, 0.1) !important;
  color: rgb(var(--v-theme-green-darken-3)) !important;
  border-left: 3px solid rgb(var(--v-theme-green-darken-2));
  font-weight: 600;
}

.v-theme--dark .nav-item.v-list-item--active {
  background-color: rgba(129, 199, 132, 0.12) !important;
  color: #A5D6A7 !important;
  border-left-color: #81C784;
}

.sub-nav-container {
  background: rgba(var(--v-theme-surface), 0.5);
  border-radius: 10px;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.05);
  overflow: hidden;
}

/* Scrollbar Tweaks */
.notebook-drawer ::-webkit-scrollbar {
  width: 4px;
}

.notebook-drawer ::-webkit-scrollbar-thumb {
  background: rgba(var(--v-theme-on-surface), 0.15);
  border-radius: 4px;
}
</style>
