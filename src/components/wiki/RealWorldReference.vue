<script setup lang="ts">
import type { RegionManifest } from '@/types/region'

interface Props {
  reference?: RegionManifest['realWorldReference']
  color?: string
}

const { reference, color = 'green-darken-2' } = defineProps<Props>()
</script>

<template>
  <v-card v-if="reference" border rounded="lg" class="real-world-ref overflow-hidden">
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-item class="pb-0">
          <div class="text-overline mb-1 d-flex align-center gap-2">
            <v-icon :color="color" size="16">mdi-earth</v-icon>
            Real-World Basis
          </div>
          <p class="text-caption text-medium-emphasis lh-sm">
            {{ reference.text }}
          </p>
        </v-card-item>

        <v-card-actions>
          <v-btn
            :href="reference.url"
            target="_blank"
            variant="tonal"
            size="x-small"
            :color="color"
            append-icon="mdi-open-in-new"
            class="text-none"
          >
            Explore Origins
          </v-btn>
        </v-card-actions>
      </div>

      <v-icon size="80" class="bg-icon opacity-10" :color="color"> mdi-map-search-outline </v-icon>
    </div>
  </v-card>
</template>

<style scoped>
.real-world-ref {
  position: relative;
}

.lh-sm {
  line-height: 1.4;
}

.gap-2 {
  gap: 8px;
}

.bg-icon {
  position: absolute;
  right: -10px;
  bottom: -10px;
  pointer-events: none;
}
</style>
