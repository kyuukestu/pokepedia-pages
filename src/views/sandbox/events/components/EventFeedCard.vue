<script setup lang="ts">
import { type EventStatus, type HydratedEvent } from '@/types/events'
import { getImageUrl } from '@/utils/path-resolvers'
import { useEventCalendar } from '../composables/useEventCalendar'

const { formatDate, getCategoryColor } = useEventCalendar()

defineProps<{
  item: HydratedEvent
  status: EventStatus
  statusConfig: Record<EventStatus, { label: string; color: string; icon: string }>
}>()
</script>

<template>
  <RouterLink :to="item.internalPath" class="feed-card-link">
    <v-card class="notebook-feed-card mb-4 overflow-hidden" elevation="0">
      <div class="position-relative">
        <!-- Header Badges -->
        <div class="position-absolute top-0 left-0 right-0 d-flex align-center justify-space-between w-100 pa-3 z-index-2">
          <v-chip
            :color="statusConfig[status].color"
            size="x-small"
            variant="outlined"
            class="font-mono font-weight-bold text-uppercase px-2 badge-solid-bg"
          >
            <v-icon start size="10">{{ statusConfig[status].icon }}</v-icon>
            {{ statusConfig[status].label }}
          </v-chip>

          <!-- Region Badge -->
          <div class="segment-hull px-2 py-1">
            <v-tooltip location="top" :disabled="item.regions.length <= 1" open-on-hover>
              <template #activator="{ props: tooltipProps }">
                <span
                  v-bind="tooltipProps"
                  class="font-mono text-caption font-weight-bold text-uppercase cursor-pointer d-inline-flex align-center text-amber-lighten-2"
                  @click.prevent
                >
                  {{ item.regionDisplay }}
                  <v-icon v-if="item.regions.length > 1" size="10" class="ml-1">
                    mdi-information-outline
                  </v-icon>
                </span>
              </template>

              <div class="font-mono text-caption pa-1">
                <div class="font-weight-bold mb-1 border-b pb-1 text-amber-lighten-2">
                  REGIONS ({{ item.regions.length }})
                </div>
                <div v-for="r in item.regions" :key="r" class="d-flex align-center py-0-5">
                  • {{ r }}
                </div>
              </div>
            </v-tooltip>
          </div>
        </div>

        <!-- Image Canvas -->
        <v-img :src="getImageUrl(item.image)" height="180" cover class="align-end card-image">
          <div class="card-scrim pa-3 w-100">
            <div
              class="font-mono text-caption font-weight-bold text-uppercase tracking-wider mb-1"
              :style="{ color: `rgb(var(--v-theme-${getCategoryColor(item.category)}))` }"
            >
              // {{ item.category }}
            </div>

            <h3 class="font-serif text-h6 font-weight-bold text-high-emphasis lh-tight mb-2">
              {{ item.title }}
            </h3>

            <div class="d-flex align-center justify-space-between font-mono text-caption text-medium-emphasis">
              <span class="d-flex align-center text-truncate max-w-180">
                <v-icon size="12" start color="amber-lighten-2">mdi-map-marker</v-icon>
                {{ item.location }}
              </span>

              <span class="font-weight-bold text-amber-lighten-2 ml-2">
                {{ formatDate(item.start) }}
              </span>
            </div>
          </div>
        </v-img>
      </div>
    </v-card>
  </RouterLink>
</template>
<style scoped>
.feed-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.notebook-feed-card {
  background: #181818 !important;
  border: 1px solid #3d332a !important;
  border-radius: 4px !important;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.notebook-feed-card:hover {
  transform: translateY(-2px);
  border-color: #ffb300 !important;
}

.badge-solid-bg {
  background-color: rgba(18, 18, 18, 0.85) !important;
  backdrop-filter: blur(4px);
}

.segment-hull {
  background: rgba(18, 18, 18, 0.85);
  border: 1px solid rgba(255, 191, 0, 0.3);
  border-radius: 2px;
  backdrop-filter: blur(4px);
}

.card-image {
  border-radius: 2px;
}

.card-scrim {
  background: linear-gradient(to top, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.6) 70%, transparent 100%);
}

.lh-tight {
  line-height: 1.25;
}

.max-w-180 {
  max-width: 180px;
}
</style>
