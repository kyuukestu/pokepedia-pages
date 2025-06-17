<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

// Emit event for parent component to handle mobile drawer closing
const emit = defineEmits(['navigate'])

const syncLinks = [
  { title: 'Setting', icon: 'mdi-pokeball', color: 'blue' },
  { title: 'Fortitude', icon: 'mdi-arm-flex', color: 'red' },
  { title: 'Sync-Events', icon: 'mdi-calendar', color: 'purple' },
  { title: 'Swarms', icon: 'mdi-routes-clock', color: 'green' },
  { title: 'PokeJobs', icon: 'mdi-briefcase', color: 'indigo' },
  { title: 'Vocations', icon: 'mdi-toolbox', color: 'teal' },
  { title: 'PokeAcademy', icon: 'mdi-certificate', color: 'amber' },
]

const generatedSyncLinks = syncLinks.map((link) => ({
  title: link.title.replace('-', ' '),
  value: link.title.toLowerCase().replace('-', ''),
  to: `/sync/main/${link.title.toLowerCase().replace('-', '')}view`,
  icon: link.icon,
  color: link.color,
}))

const handleNavigation = () => {
  emit('navigate')
}
</script>

<template>
  <div class="nav-section">
    <!-- Section Header -->
    <div class="section-header">
      <v-icon color="blue" size="small" class="mr-2">mdi-sync</v-icon>
      <span class="section-title">Sync World</span>
      <v-spacer />
      <v-chip size="x-small" color="blue" variant="outlined">
        {{ generatedSyncLinks.length }}
      </v-chip>
    </div>

    <!-- Navigation List -->
    <v-list density="compact" class="styled-nav-list">
      <v-list-item
        v-for="link in generatedSyncLinks"
        :key="link.value"
        :prepend-icon="link.icon"
        :title="link.title"
        :value="link.value"
        :to="link.to"
        :active="route.path === link.to"
        class="styled-nav-item"
        :class="`${link.color}-item`"
        @click="handleNavigation"
      >
        <template v-slot:prepend>
          <v-avatar size="32" :color="link.color" variant="tonal" class="nav-avatar">
            <v-icon :color="link.color" size="small">{{ link.icon }}</v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-icon
            v-show="route.path === link.to"
            color="success"
            size="small"
            class="active-indicator"
          >
            mdi-check-circle
          </v-icon>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<style scoped>
.nav-section {
  padding: 0;
}

.section-header {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(33, 150, 243, 0.05));
  border-radius: 8px;
  margin-bottom: 0.75rem;
  border-left: 3px solid #2196f3;
}

.section-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: #2196f3;
}

.styled-nav-list {
  background: transparent;
}

.styled-nav-item {
  border-radius: 10px;
  margin: 0.25rem 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.styled-nav-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 3px;
  background: transparent;
  transition: all 0.3s ease;
}

.styled-nav-item:hover {
  background-color: rgba(33, 150, 243, 0.08) !important;
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.15);
}

.styled-nav-item:hover::before {
  background: #2196f3;
}

.styled-nav-item.v-list-item--active {
  background: linear-gradient(
    135deg,
    rgba(33, 150, 243, 0.15),
    rgba(33, 150, 243, 0.08)
  ) !important;
  font-weight: 600;
  transform: translateX(2px);
}

.styled-nav-item.v-list-item--active::before {
  background: #2196f3;
}

.nav-avatar {
  margin-right: 0.5rem;
  transition: all 0.3s ease;
}

.styled-nav-item:hover .nav-avatar {
  transform: scale(1.1);
}

.active-indicator {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

.action-btn {
  flex: 1;
  font-size: 0.75rem;
  transition: all 0.2s ease;
}

.action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(33, 150, 243, 0.2);
}

/* Dark theme adjustments */
.v-theme--dark .section-header {
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.2), rgba(33, 150, 243, 0.1));
}

.v-theme--dark .styled-nav-item:hover {
  background-color: rgba(33, 150, 243, 0.12) !important;
}

.v-theme--dark .styled-nav-item.v-list-item--active {
  background: linear-gradient(
    135deg,
    rgba(33, 150, 243, 0.25),
    rgba(33, 150, 243, 0.15)
  ) !important;
}
</style>
<!-- <script setup lang="ts">
const syncLinks = [
  { title: 'Setting', icon: 'mdi-pokeball' },
  { title: 'Fortitude', icon: 'mdi-arm-flex' },
  { title: 'Sync Events', icon: 'mdi-calendar' },
  { title: 'Swarms', icon: 'mdi-routes-clock' },
  { title: 'PokeJobs', icon: 'mdi-briefcase' },
  { title: 'Vocations', icon: 'mdi-toolbox' },
  { title: 'PokeAcademy', icon: 'mdi-certificate' },
]

const generatedSyncLinks = syncLinks.map((link) => ({
  title: link.title,
  value: link.title.toLowerCase().replace(' ', '-'),
  to: `/sync/${link.title.toLowerCase().replace(' ', '-')}`,
  icon: link.icon,
}))
</script>

<template>
  <v-list-item
    v-for="link in generatedSyncLinks"
    :key="link.value"
    :prepend-icon="link.icon"
    :title="link.title"
    :value="link.value"
    :to="link.to"
  />
</template> -->
