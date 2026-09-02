<script setup lang="ts">
import { computed } from 'vue'
import type { CharacterCore, AchievementSection } from '@/types/CharacterDashboard'

const props = defineProps<{
  character: CharacterCore
  achievements: AchievementSection
}>()

const stats = computed(() => {
  const badges = props.achievements.badges ?? []
  const ribbons = props.achievements.ribbons ?? []

  return {
    badges: badges.length,
    ribbons: ribbons.length,
  }
})
</script>
<template>
  <v-row class="mb-6">
    <v-col
      v-for="(val, label) in {
        Badges: stats.badges,
        Ribbons: stats.ribbons,
      }"
      :key="label"
      cols="6"
      sm="3"
    >
      <v-card flat class="wiki-stat-node pa-4 text-center">
        <div class="stat-value text-h4 font-weight-black text-high-emphasis mb-1">{{ val }}</div>
        <div class="stat-label text-caption text-uppercase font-weight-bold text-medium-emphasis">
          {{ label }}
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.wiki-stat-node {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12) !important;
  background: rgb(var(--v-theme-surface));
  border-radius: 8px !important;
}
.stat-value {
  line-height: 1;
}
</style>
