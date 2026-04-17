<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRegionStore } from '@/stores/regionStore'
import type { NavItem } from '@/types/wiki'

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

watch(
  () => route.params.regionId,
  (newId) => {
    if (newId) store.setActiveRegion(newId as string)
  },
  { immediate: true },
)

const FEDERATION_MAP: Record<string, { leagueId: string; parentRegion: string }> = {
  kanto: { leagueId: 'indigo-league', parentRegion: 'indigo' },
  johto: { leagueId: 'indigo-league', parentRegion: 'indigo' },
  indigo: { leagueId: 'indigo-league', parentRegion: 'indigo' },
}

const navLinks = computed((): NavItem[] => {
  if (!region.value?.subdirectories) return []

  const currentRegionId = route.params.regionId as string
  const federation = FEDERATION_MAP[currentRegionId]

  return region.value.subdirectories.map((dir) => {
    const slug = dir.title.toLowerCase()
    let targetPath = ''

    if (slug === 'league') {
      if (federation) {
        const isPlateau = currentRegionId === federation.parentRegion
        targetPath = isPlateau
          ? `/sandbox/regions/${currentRegionId}/${federation.leagueId}`
          : `/sandbox/regions/${currentRegionId}/${federation.leagueId}/${currentRegionId}`
      } else {
        targetPath = `/sandbox/regions/${currentRegionId}/${currentRegionId}-league`
      }
    } else if (slug === 'kanto' || slug === 'johto') {
      targetPath = `/sandbox/regions/${slug}`
    } else {
      targetPath = `/sandbox/regions/${currentRegionId}/${slug}`
    }

    // This spread syntax ensures the placeholder 'to' is replaced by our targetPath
    return {
      ...dir,
      to: targetPath,
    }
  })
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
          <v-chip
            v-if="FEDERATION_MAP[route.params.regionId]"
            size="x-small"
            variant="outlined"
            color="green"
            class="mb-2"
            :to="`/sandbox/regions/indigo` /* Links to the Federation Hub */"
          >
            PART OF THE INDIGO FEDERATION
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
