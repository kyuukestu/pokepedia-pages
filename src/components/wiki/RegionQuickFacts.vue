<script setup lang="ts">
import WikiCard from '@/components/wiki/WikiCard.vue'
import type { RegionStat } from '@/types/region'

interface Props {
  stats: RegionStat[]
  lore: string
  color?: string
}

defineProps<Props>()

const getIcon = (label: string) => {
  const map: Record<string, string> = {
    Capital: 'mdi-map-marker-star',
    'Regional Professor': 'mdi-account-tie-hat',
    Climate: 'mdi-thermometer-lines',
    'Discovered Pokémon': 'mdi-paw',
  }
  return map[label] || 'mdi-circle-medium'
}
</script>

<template>
  <WikiCard title="Regional Snapshot" icon="mdi-database-search" color="green">
    <div class="px-2">
      <div
        v-for="(stat, i) in stats"
        :key="stat.label"
        class="data-row py-4"
        :class="{ 'border-bottom': i < stats.length - 1 }"
      >
        <div class="d-flex align-center gap-4">
          <v-avatar :color="color" variant="tonal" size="42" class="rounded-lg">
            <v-icon :icon="getIcon(stat.label)" size="22" />
          </v-avatar>

          <div class="grow">
            <div
              class="text-overline text-grey font-weight-bold mb-n1"
              style="font-size: 0.7rem !important"
            >
              {{ stat.label }}
            </div>
            <div class="text-h6 font-weight-black letter-spacing-0">
              {{ stat.value }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <v-sheet
      color="surface-variant"
      class="mt-6 pa-4 rounded-xl border-dashed"
      style="border: 1px dashed rgba(var(--v-border-color), 0.3) !important"
    >
      <div class="d-flex align-center mb-2">
        <v-icon icon="mdi-history" size="16" class="mr-2 opacity-60" />
        <span class="text-caption font-weight-black text-uppercase opacity-60"
          >Regional History</span
        >
      </div>
      <p class="text-body-2 font-italic opacity-90 mb-0 lh-md">
        {{ lore }}
      </p>
    </v-sheet>
  </WikiCard>
</template>

<style scoped>
.data-row {
  transition: background 0.2s ease;
}

.border-bottom {
  border-bottom: 1px solid rgba(var(--v-border-color), 0.1) !important;
}

.letter-spacing-0 {
  letter-spacing: -0.5px !important;
}

.lh-md {
  line-height: 1.6;
}

.gap-4 {
  gap: 16px;
}

/* Removes uppercase from H6 to allow native casing */
.text-h6 {
  text-transform: none !important;
}
</style>
