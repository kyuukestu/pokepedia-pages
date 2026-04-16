<script setup lang="ts">
import WikiCard from '@/components/wiki/WikiCard.vue'
import type { RegionTrait } from '@/types/region'

interface Props {
  description: string
  traits?: RegionTrait[]
}

defineProps<Props>()
</script>

<template>
  <WikiCard title="Overview" icon="mdi-terrain" class="mb-6">
    <p class="text-body-1 mb-4" v-html="description"></p>
    <div class="d-flex gap-2 flex-wrap">
      <v-chip
        v-for="t in traits"
        :key="t.label"
        size="small"
        variant="tonal"
        :prepend-icon="t.icon"
      >
        {{ t.label }}
      </v-chip>
    </div>
  </WikiCard>
</template>
