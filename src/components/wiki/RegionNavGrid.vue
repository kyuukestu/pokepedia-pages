<script setup lang="ts">
import type { NavItem } from '@/types/wiki'

interface Props {
  links: NavItem[]
}

defineProps<Props>()
</script>

<template>
  <div class="text-overline mb-4 px-2">Regional Explorations</div>
  <v-row>
    <v-col v-for="link in links" :key="link.title" cols="12" sm="4">
      <v-card :to="link.to" border flat class="pa-4 text-center nav-card h-100">
        <v-icon :icon="link.icon" :color="link.color" size="32" class="mb-2" />
        <div class="text-subtitle-2 font-weight-bold text-capitalize">
          {{ link.title }}
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.nav-card {
  transition: transform 0.2s ease;
}
.nav-card:hover {
  transform: translateY(-4px);
  border-color: rgb(var(--v-theme-primary)) !important;
}
</style>
