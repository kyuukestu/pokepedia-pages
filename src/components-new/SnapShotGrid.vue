<script setup lang="ts">
import { computed } from 'vue'
import type { CharacterCore, PokemonSection, AchievementSection } from '@/types/CharacterDashboard'

const props = defineProps<{
  character: CharacterCore
  pokemon: PokemonSection
  achievements: AchievementSection
}>()

const stats = computed(() => ({
  activePokemon: props.pokemon.active_party.length,
  boxPokemon: props.pokemon.box.length,
  totalPokemon: props.pokemon.active_party.length + props.pokemon.box.length,

  badges: props.achievements.badges.length,
  ribbons: props.achievements.ribbons.length,

  classes: props.character.classes.length,
}))
</script>
<template>
  <v-row class="mt-4 mb-4">
    <v-col cols="6" md="3">
      <v-card class="pa-3 text-center">
        <div class="text-h6">{{ stats.activePokemon }}</div>
        <div class="text-caption">Active Pokémon</div>
      </v-card>
    </v-col>

    <v-col cols="6" md="3">
      <v-card class="pa-3 text-center">
        <div class="text-h6">{{ stats.boxPokemon }}</div>
        <div class="text-caption">Box</div>
      </v-card>
    </v-col>

    <v-col cols="6" md="3">
      <v-card class="pa-3 text-center">
        <div class="text-h6">{{ stats.badges }}</div>
        <div class="text-caption">Badges</div>
      </v-card>
    </v-col>

    <v-col cols="6" md="3">
      <v-card class="pa-3 text-center">
        <div class="text-h6">{{ stats.ribbons }}</div>
        <div class="text-caption">Ribbons</div>
      </v-card>
    </v-col>
  </v-row>
</template>
