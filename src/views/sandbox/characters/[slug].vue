<script setup lang="ts">
import { watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCharacterDashboard } from '@/composables/useCharacterDashboard'
import { useAchievements } from '@/composables/useAchievements'
import IdentityHeader from '@/components-new/IdentityHeader.vue'
import SnapshotGrid from '@/components-new/SnapShotGrid.vue'
import PokemonPanel from '@/components-new/PokemonPanel.vue'
import AchievementPanel from '@/components-new/AchievementPanel.vue'
import ActivityPanel from '@/components-new/ActivityPanel.vue'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data, loading, error, reload } = useCharacterDashboard(slug)

const achievements = computed(() => data.value?.achievements ?? null)

const { badgeCases, ribbonCases } = useAchievements(achievements)

console.log(`Data: ${data.value}`)
console.log('slug:', slug.value)
console.log('Pokemon Data:', data.value?.pokemon)

watch(slug, () => {
  reload()
})
</script>
<template>
  <v-container>
    <v-progress-linear v-if="loading" indeterminate />

    <v-alert v-else-if="error" type="error">
      {{ error }}
    </v-alert>

    <template v-else-if="data">
      <IdentityHeader :character="data.character" />

      <SnapshotGrid
        :character="data.character"
        :pokemon="data.pokemon"
        :achievements="data.achievements"
      />

      <PokemonPanel
        :active-party="data?.pokemon.active_party ?? []"
        :box="data?.pokemon.box ?? []"
        :history="data?.pokemon.history_preview ?? []"
      />

      <AchievementPanel :badge-cases="badgeCases" :ribbon-cases="ribbonCases" />
      <ActivityPanel :activity="data.activity" />
    </template>
  </v-container>
</template>
