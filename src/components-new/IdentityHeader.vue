<script setup lang="ts">
import { computed } from 'vue'
import type { CharacterCore } from '@/types/CharacterDashboard'
import { characterImageResolver } from '@/utils/image-resolver'

const props = defineProps<{
  character: CharacterCore
}>()

const sortedClasses = [...props.character.classes].sort(
  (a, b) => Number(b.is_primary) - Number(a.is_primary),
)
const featuredTitles = computed(
  () => props.character.titles?.filter((t) => t.is_featured).map((t) => t.title) || [],
)
console.log('IdentityHeader character:', props.character)
</script>

<template>
  <v-card
    flat
    class="wiki-identity-card pa-6 mb-6"
    :style="{ '--char-theme': character.color || 'var(--v-theme-primary)' }"
  >
    <div class="d-flex flex-column flex-sm-row align-start align-sm-center ga-6">
      <v-avatar size="110" rounded="lg" class="wiki-identity-avatar">
        <v-img :src="characterImageResolver(character.image_src) ?? ''" cover>
          <template #placeholder>
            <div class="d-flex align-center justify-center fill-height bg-surface-variant">
              <v-icon size="40">mdi-account-circle-outline</v-icon>
            </div>
          </template>
        </v-img>
      </v-avatar>

      <div class="flex-grow-1 profile-metadata">
        <h1 class="text-h4 font-weight-black text-uppercase tracking-tight mb-1">
          {{ character.full_name }}
        </h1>

        <!-- Classes -->
        <div
          v-if="sortedClasses.length"
          class="text-subtitle-2 font-weight-bold text-primary text-uppercase mb-2"
        >
          {{ sortedClasses.map((c) => c.id).join(' • ') }}
        </div>

        <!-- Featured Titles -->
        <div
          v-if="featuredTitles.length"
          class="text-caption text-medium-emphasis font-weight-medium mb-3 italic-titles"
        >
          {{ featuredTitles.join(' • ') }}
        </div>

        <!-- Regional Location Tracks -->
        <div class="d-flex flex-wrap ga-2 mt-2">
          <div class="meta-pill current-pill">
            <span class="pill-label">CURRENT</span>
            <span class="pill-val">{{ character.region.current.name }}</span>
          </div>
          <div class="meta-pill origin-pill">
            <span class="pill-label">ORIGIN</span>
            <span class="pill-val">{{ character.region.origin.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.wiki-identity-card {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12) !important;
  border-left: 6px solid var(--char-theme) !important;
  background: rgb(var(--v-theme-surface));
  border-radius: 8px !important;
}
.tracking-tight {
  letter-spacing: -0.025em;
}
.italic-titles {
  font-style: italic;
}
.meta-pill {
  display: inline-flex;
  align-items: center;
  font-size: 0.7rem;
  font-weight: 800;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  border-radius: 4px;
  overflow: hidden;
}
.pill-label {
  padding: 2px 6px;
  background: rgba(var(--v-theme-on-surface), 0.05);
  color: rgb(var(--v-theme-medium-emphasis));
}
.pill-val {
  padding: 2px 8px;
  background: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-surface));
}
.current-pill {
  border-color: var(--char-theme);
}
.current-pill .pill-label {
  background: var(--char-theme);
  color: #fff;
}
</style>
