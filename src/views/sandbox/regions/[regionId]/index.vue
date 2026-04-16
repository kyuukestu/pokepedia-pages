<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRegionStore } from '@/stores/regionStore'

// Layout Components
import WikiHero from '@/components/sections/WikiHero.vue'
import KENN from '@/components/wiki/KENN.vue'
import RealWorldReference from '@/components/wiki/RealWorldReference.vue'

// New Refactored Components
import RegionOverview from '@/components/wiki/RegionOverview.vue'
import RegionNavGrid from '@/components/wiki/RegionNavGrid.vue'
import RegionQuickFacts from '@/components/wiki/RegionQuickFacts.vue'

const route = useRoute('/sandbox/regions/[regionId]/')
const store = useRegionStore()

const updateActiveRegion = () => {
  store.setActiveRegion(route.params.regionId as string)
}

onMounted(updateActiveRegion)
watch(() => route.params.regionId, updateActiveRegion)

const region = computed(() => store.currentRegion)

const navLinks = computed(() => {
  if (!region.value?.subdirectories) return []
  return region.value.subdirectories.map((dir) => ({
    ...dir,
    to: `/regions/${route.params.regionId}/${dir.title}`,
  }))
})
</script>

<template>
  <v-container v-if="region" fluid class="pa-0">
    <WikiHero
      :title="region.name"
      :subtitle="region.tagline"
      :icon="region.icon"
      :color="region.themeColor"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center gap-2">
          <v-chip
            v-for="tag in region.tags"
            :key="tag.label"
            :color="tag.color"
            size="small"
            variant="flat"
          >
            {{ tag.label }}
          </v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200" class="py-8">
      <v-row>
        <v-col cols="12" md="8">
          <KENN :news="region.news" />

          <RegionOverview :description="region.description" :traits="region.traits" />

          <RegionNavGrid :links="navLinks" />
        </v-col>

        <v-col cols="12" md="4">
          <RegionQuickFacts
            :stats="region.stats"
            :lore="region.loreSnippet"
            :color="region.themeColor"
          />

          <RealWorldReference :reference="region.realWorldReference" class="mt-4" />
        </v-col>
      </v-row>
    </v-container>
  </v-container>

  <v-container v-else class="text-center py-16">
    <v-icon size="64" color="grey-lighten-1">mdi-map-search-outline</v-icon>
    <div class="text-h5 mt-4">Unknown Region</div>
    <v-btn to="/regions" variant="text" class="mt-2">Back to Dashboard</v-btn>
  </v-container>
</template>
