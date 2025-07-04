<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTheme, useDisplay } from 'vuetify'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import sandboxNav from './sandboxNav.vue'
import SyncNav from './syncNav.vue'

const drawer = ref(false)
const theme = useTheme()
const route = useRoute()
const { mobile } = useDisplay()
const icon = ref('mdi-weather-night')
const navPage = ref(0)
const length = ref(2)

// Navigation page titles for better UX
const navTitles = ['Sandbox Navigation', 'Sync Navigation']

function next() {
  navPage.value = navPage.value + 1 >= length.value ? 0 : navPage.value + 1
}

function prev() {
  navPage.value = navPage.value - 1 < 0 ? length.value - 1 : navPage.value - 1
}

// Auto-close drawer on mobile after navigation
const handleNavigation = () => {
  if (mobile.value) {
    drawer.value = false
  }
}

// Centralized theme state
const isDark = ref(true)

// Access Quasar and Vuetify instances
const $q = useQuasar()

// Sync theme on initial load
$q.dark.set(isDark.value)
// theme.global.name.value = theme.global.name.value === 'dark' ? 'light' : 'dark'

// Watch for theme changes and update both frameworks
watch(isDark, (newValue) => {
  $q.dark.set(newValue) // Update Quasar theme
  theme.global.name.value = theme.global.name.value === 'dark' ? 'light' : 'dark' // Update Vuetify theme
  icon.value = newValue === true ? 'mdi-weather-night' : 'mdi-weather-sunny' // Handle Icon change
})

// Function to toggle theme
const toggleTheme = () => {
  isDark.value = !isDark.value
}
</script>

<template>
  <v-app-bar
    :elevation="2"
    color="primary"
    app
    density="compact"
    scroll-behavior="collapse"
    class="app-bar"
  >
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="nav-toggle" />
    </template>

    <v-toolbar-title class="app-title"> Pokémon RP Hub </v-toolbar-title>

    <v-spacer />

    <v-btn :icon="icon" @click="toggleTheme" variant="text" class="theme-toggle" />
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    class="navigation-drawer"
    :width="320"
    image="https://img4.gelbooru.com//samples/d5/81/sample_d581bdaadf5e192701fdbfa46680304b.jpg"
  >
    <!-- Main Navigation Items -->
    <div class="drawer-header">
      <v-img
        src="https://img4.gelbooru.com//samples/d5/81/sample_d581bdaadf5e192701fdbfa46680304b.jpg"
        height="80"
        cover
        class="header-image"
      >
        <div class="header-overlay">
          <v-icon color="white" size="large">mdi-pokeball</v-icon>
          <span class="header-text">Navigation</span>
        </div>
      </v-img>
    </div>

    <v-list density="compact" class="main-nav-list">
      <v-list-item
        prepend-icon="mdi-home-city"
        title="Home"
        value="home"
        to="/"
        :active="route.path === '/'"
        class="nav-item main-nav-item"
        @click="handleNavigation"
      />
      <v-list-item
        prepend-icon="mdi-information"
        title="Welcome"
        value="welcome"
        to="/welcome"
        :active="route.path === '/welcome'"
        class="nav-item main-nav-item"
        @click="handleNavigation"
      />
      <v-list-item
        prepend-icon="mdi-chat-question"
        title="About"
        value="about"
        to="/about"
        :active="route.path === '/about'"
        class="nav-item main-nav-item"
        @click="handleNavigation"
      />
    </v-list>

    <v-divider class="my-3" />

    <!-- Sub-Navigation Controls -->
    <div class="sub-nav-header">
      <h3 class="sub-nav-title">
        <v-icon class="mr-2">mdi-view-dashboard</v-icon>
        Game Worlds
      </h3>

      <div class="nav-controls">
        <v-btn-group variant="outlined" density="comfortable" class="control-group">
          <v-btn @click="prev" :disabled="navPage === 0" size="small" class="control-btn">
            <v-icon>mdi-chevron-left</v-icon>
            Prev
          </v-btn>

          <v-btn @click="next" :disabled="navPage === length - 1" size="small" class="control-btn">
            Next
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-btn-group>
      </div>

      <!-- Page Indicator -->
      <div class="page-indicator">
        <v-chip
          v-for="(title, index) in navTitles"
          :key="index"
          :color="navPage === index ? 'primary' : 'default'"
          :variant="navPage === index ? 'elevated' : 'outlined'"
          size="small"
          class="indicator-chip"
          @click="navPage = index"
        >
          {{ title.split(' ')[0] }}
        </v-chip>
      </div>
    </div>

    <!-- Sub-Navigation Window -->
    <v-card class="sub-nav-card" elevation="2">
      <v-card-title class="sub-nav-card-title">
        <v-icon class="mr-2" :color="navPage === 0 ? 'orange' : 'blue'">
          {{ navPage === 0 ? 'mdi-cube-outline' : 'mdi-sync' }}
        </v-icon>
        {{ navTitles[navPage] }}
      </v-card-title>

      <v-window v-model="navPage" class="sub-nav-window" :touch="{ left: next, right: prev }">
        <v-window-item :value="0" class="window-item">
          <div class="nav-content">
            <sandboxNav @navigate="handleNavigation" />
          </div>
        </v-window-item>

        <v-window-item :value="1" class="window-item">
          <div class="nav-content">
            <SyncNav @navigate="handleNavigation" />
          </div>
        </v-window-item>
      </v-window>
    </v-card>

    <!-- Footer -->
    <template v-slot:append>
      <div class="drawer-footer">
        <v-divider />
        <v-list density="compact">
          <v-list-item class="footer-item">
            <v-list-item-title class="text-caption text-center">
              Pokémon RP Hub v1.0
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>
.app-bar {
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%) !important;
}

.app-title {
  font-weight: bold;
  font-size: 1.1rem;
}

.nav-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.theme-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.navigation-drawer {
  background: linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%);
}

.drawer-header {
  position: relative;
  margin-bottom: 1rem;
}

.header-image {
  border-radius: 0 0 16px 16px;
}

.header-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
}

.header-text {
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}

.main-nav-list {
  padding: 0 0.5rem;
}

.main-nav-item {
  background: linear-gradient(135deg, rgba(248, 249, 250, 0.85), rgba(233, 236, 239, 0.3));
}

.nav-item {
  border-radius: 12px;
  margin: 0.25rem 0;
  transition: all 0.3s ease;
}

.nav-item:hover {
  background-color: rgba(25, 118, 210, 0.08) !important;
  transform: translateX(4px);
}

.nav-item.v-list-item--active {
  background: linear-gradient(
    135deg,
    rgba(25, 118, 210, 0.12),
    rgba(25, 118, 210, 0.08)
  ) !important;
  border-left: 4px solid #1976d2;
  font-weight: bold;
}

.sub-nav-header {
  padding: 1rem;
  background: linear-gradient(135deg, rgba(248, 249, 250, 0.65), rgba(233, 236, 239, 0.3));
  margin: 0.5rem;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.sub-nav-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.nav-controls {
  margin-bottom: 1rem;
}

.control-group {
  width: 100%;
}

.control-btn {
  flex: 1;
  font-weight: 500;
  transition: all 0.2s ease;
}

.control-btn:hover:not(:disabled) {
  background-color: rgba(25, 118, 210, 0.08);
  transform: scale(1.02);
}

.control-btn:disabled {
  opacity: 0.4;
}

.page-indicator {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.indicator-chip {
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.75rem;
}

.indicator-chip:hover {
  transform: scale(1.05);
}

.sub-nav-card {
  margin: 0.5rem;
  border-radius: 16px;
  overflow: hidden;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.sub-nav-card-title {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  font-size: 0.95rem;
  font-weight: 600;
  padding: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.sub-nav-window {
  min-height: 200px;
}

.window-item {
  height: 100%;
}

.nav-content {
  padding: 1rem;
  min-height: 200px;
}

.drawer-footer {
  background: rgba(255, 255, 255, 0.9);
}

.footer-item {
  opacity: 0.7;
}

/* Dark theme adjustments */
.v-theme--dark .navigation-drawer {
  background: linear-gradient(180deg, #2d2d2d 0%, #242424 100%);
}

.v-theme--dark .sub-nav-header {
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3));
  border-color: rgba(255, 255, 255, 0.1);
}

.v-theme--dark .sub-nav-card {
  background: #2d2d2d;
  border-color: rgba(255, 255, 255, 0.1);
}

.v-theme--dark .sub-nav-card-title {
  background: linear-gradient(135deg, #3d3d3d, #333333);
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.v-theme--dark .main-nav-item {
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3));
}

.v-theme--dark .nav-item:hover {
  background-color: rgba(255, 255, 255, 0.08) !important;
}

.v-theme--dark .nav-item.v-list-item--active {
  background: linear-gradient(135deg, rgba(25, 118, 210, 0.2), rgba(25, 118, 210, 0.1)) !important;
}

.v-theme--dark .drawer-footer {
  background: rgba(0, 0, 0, 0.3);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .navigation-drawer {
    width: 280px !important;
  }

  .sub-nav-header {
    padding: 0.75rem;
  }

  .nav-content {
    padding: 0.75rem;
  }
}

/* Animation for smooth transitions */
.v-window-item {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom scrollbar for drawer */
.navigation-drawer ::-webkit-scrollbar {
  width: 6px;
}

.navigation-drawer ::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
}

.navigation-drawer ::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.navigation-drawer ::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}
</style>
