<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import { useEventCalendar } from '../composables/useEventCalendar'

const { formatDate } = useEventCalendar()

defineProps<{
  currentRPDate: string
  activeCount: number
  upcomingCount: number
}>()
</script>

<template>
  <WikiHero
    title="Event Calendar"
    subtitle="League festivals, sanctioned tournaments, and active story arcs across all regions."
    icon="mdi-calendar-star"
    pattern="pokeball"
    class="border-bottom-tactical"
  >
    <template #chips>
      <div class="mt-4 d-flex justify-center align-center flex-wrap ga-4 w-100 px-4">
        <div class="interactive-level-hub pa-3 d-flex align-center flex-wrap ga-3">
          <span class="text-caption font-mono font-weight-bold text-uppercase tracking-wider mr-2 text-amber-lighten-2">
            TEMPORAL INDEX //
          </span>

          <div class="level-readout-badge font-mono text-caption font-weight-bold text-amber-lighten-2 px-3 py-1">
            RP DATE: {{ formatDate(currentRPDate) }}
          </div>

          <div class="level-readout-badge font-mono text-caption font-weight-bold text-amber-lighten-2 px-3 py-1">
            ACTIVE: {{ String(activeCount).padStart(2, '0') }}
          </div>

          <div class="level-readout-badge font-mono text-caption font-weight-bold text-amber-lighten-2 px-3 py-1">
            UPCOMING: {{ String(upcomingCount).padStart(2, '0') }}
          </div>
        </div>
      </div>
    </template>
  </WikiHero>
</template>

<style scoped>
.border-bottom-tactical {
  border-bottom: 1px solid rgba(255, 191, 0, 0.2);
}

.interactive-level-hub {
  background: rgba(18, 18, 18, 0.8);
  border: 1px solid rgba(255, 191, 0, 0.25);
  border-radius: 4px;
}

.level-readout-badge {
  background: rgba(255, 191, 0, 0.08);
  border: 1px solid rgba(255, 191, 0, 0.3);
  border-radius: 2px;
  letter-spacing: 0.05em;
}
</style>
