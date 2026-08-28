<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCharacterDashboard } from '@/composables/useCharacterDashboard'
import { useAchievements } from '@/composables/useAchievements'
import { usePokemon } from '@/composables/usePokemon'
import IdentityHeader from '@/components-new/IdentityHeader.vue'
import SnapshotGrid from '@/components-new/SnapShotGrid.vue'
import PokemonPanel from '@/components-new/PokemonPanel.vue'
import AchievementPanel from '@/components-new/AchievementPanel.vue'

const route = useRoute()
const slug = computed(() => route.params as string) // Some params goes here

const { data, loading, error } = useCharacterDashboard(slug)

const achievements = computed(() => data.value?.achievements ?? null)
const { badgeCases, ribbonCases, tournamentResults } = useAchievements(achievements)

const pokemon = computed(
  () =>
    data.value?.pokemon ?? {
      active_party: [],
      owned_current: [],
      history: [],
    },
)

const { activeParty, box, history, activeCount, ownedCount } = usePokemon(pokemon)
</script>

<template>
  <v-container max-width="1200" class="py-6 wiki-dashboard-view">
    <!-- SYNCING LOADING BOUNDARY -->
    <div v-if="loading" class="d-flex flex-column align-center justify-center py-16">
      <v-progress-circular indeterminate size="40" color="primary" class="mb-4" />
      <span class="text-caption text-medium-emphasis font-weight-bold letter-spacing-1"
        >SYNCHRONIZING DATA DOSSIER...</span
      >
    </div>

    <!-- ERROR BOUNDARY -->
    <v-alert v-else-if="error" type="error" variant="tonal" class="rounded-lg mb-6">
      <div class="text-subtitle-2 font-weight-bold">Dossier System Error</div>
      <div class="text-caption">{{ error }}</div>
    </v-alert>

    <!-- CONTENT RENDER -->
    <template v-else-if="data">
      <IdentityHeader :character="data.character" />

      <SnapshotGrid
        :character="data.character"
        :pokemon="data.pokemon"
        :achievements="data.achievements"
      />

      <v-row>
        <v-col cols="12" lg="8">
          <PokemonPanel
            :active-party="activeParty"
            :box="box"
            :history="history"
            :active-count="activeCount"
            :owned-count="ownedCount"
          />
        </v-col>
        <v-col cols="12" lg="4">
          <AchievementPanel
            :badge-cases="badgeCases"
            :ribbon-cases="ribbonCases"
            :tournament-results="tournamentResults"
          />
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;900&display=swap');

.wiki-dashboard-view {
  font-family: 'Outfit', sans-serif;
}
.letter-spacing-1 {
  letter-spacing: 1px;
}
</style>
