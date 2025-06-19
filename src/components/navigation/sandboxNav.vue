<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

// Emit event for parent component to handle mobile drawer closing
const emit = defineEmits(['navigate'])

const sandboxLinks = [
  { title: 'Trainer-101', icon: 'mdi-pokemon-go', color: 'orange' },
  { title: 'Regions', icon: 'mdi-map', color: 'green' },
  { title: 'Law-Enforcement', icon: 'mdi-police-badge', color: 'blue' },
  { title: 'Supervisory-Boards', icon: 'mdi-account-group', color: 'purple' },
  { title: 'PokeCorp', icon: 'mdi-bank', color: 'indigo' },
  { title: 'PokeAcademia', icon: 'mdi-school', color: 'teal' },
  { title: 'PokeTech', icon: 'mdi-laptop', color: 'cyan' },
  { title: 'Sandbox-Events', icon: 'mdi-calendar', color: 'pink' },
  { title: 'Characters', icon: 'mdi-account', color: 'amber' },
  { title: 'Development', icon: 'mdi-help-circle', color: 'grey' },
]

const generatedSandboxLinks = sandboxLinks.map((link) => ({
  title: link.title.replace('-', ' '),
  value: link.title.toLowerCase().replace('-', ' '),
  to: `/sandbox/main/${link.title.toLowerCase().replace('-', '')}view`,
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
      <v-icon color="orange" size="small" class="mr-2">mdi-cube-outline</v-icon>
      <span class="section-title">Sandbox World</span>
      <v-spacer />
      <v-chip size="x-small" color="orange" variant="outlined">
        {{ generatedSandboxLinks.length }}
      </v-chip>
    </div>

    <!-- Navigation List -->
    <v-list density="compact" class="styled-nav-list">
      <v-list-item
        v-for="link in generatedSandboxLinks"
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
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.1), rgba(255, 152, 0, 0.05));
  border-radius: 8px;
  margin-bottom: 0.75rem;
  border-left: 3px solid #ff9800;
}

.section-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: #ff9800;
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
  background-color: rgba(255, 152, 0, 0.08) !important;
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(255, 152, 0, 0.15);
}

.styled-nav-item:hover::before {
  background: #ff9800;
}

.styled-nav-item.v-list-item--active {
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.15), rgba(255, 152, 0, 0.08)) !important;
  font-weight: 600;
  transform: translateX(2px);
}

.styled-nav-item.v-list-item--active::before {
  background: #ff9800;
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
  box-shadow: 0 4px 8px rgba(255, 152, 0, 0.2);
}

/* Dark theme adjustments */
.v-theme--dark .section-header {
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.2), rgba(255, 152, 0, 0.1));
}

.v-theme--dark .styled-nav-item:hover {
  background-color: rgba(255, 152, 0, 0.12) !important;
}

.v-theme--dark .styled-nav-item.v-list-item--active {
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.25), rgba(255, 152, 0, 0.15)) !important;
}
</style>
<!-- <script setup lang="ts">
const sandboxLinks = [
  { title: 'Trainer 101', icon: 'mdi-pokemon-go' },
  { title: 'Regions', icon: 'mdi-map' },
  { title: 'Law Enforcement', icon: 'mdi-police-badge' },
  { title: 'Supervisory Boards', icon: 'mdi-account-group' },
  { title: 'PokeCorp', icon: 'mdi-bank' },
  { title: 'PokeAcademia', icon: 'mdi-school' },
  { title: 'PokeTech', icon: 'mdi-laptop' },
  { title: 'Sandbox Events', icon: 'mdi-calendar' },
  { title: 'Characters', icon: 'mdi-account' },
  { title: 'Misc', icon: 'mdi-help-circle' },
]

const generatedSandboxLinks = sandboxLinks.map((link) => ({
  title: link.title,
  value: link.title.toLowerCase().replace(' ', '-'),
  to: `/sandbox/${link.title.toLowerCase().replace(' ', '-')}`,
  icon: link.icon,
}))

// console.log(generatedSandboxLinks)
</script>

<template>
  <v-list-item
    v-for="link in generatedSandboxLinks"
    :key="link.value"
    :prepend-icon="link.icon"
    :title="link.title"
    :value="link.value"
    :to="link.to"
  />
</template> -->
