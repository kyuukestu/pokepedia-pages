<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { PokemonDTO, PokemonHistoryDTO } from '@/types/CharacterDashboard'

const props = defineProps<{
  activeParty: PokemonDTO[]

  history: PokemonHistoryDTO[]
}>()

const router = useRouter()
const showBox = ref(false)

function openPokemon(id: string) {
  router.push(`/sandbox/pokemon/${id}`)
}
</script>

<template>
  <v-card class="pa-4 mb-4">
    <div class="d-flex justify-space-between align-center mb-3">
      <h3>Active Party</h3>
    </div>

    <v-row>
      <v-col v-for="p in props.activeParty" :key="p.id" cols="12" md="6">
        <v-card class="pa-3 pokemon-card" @click="openPokemon(p.id)">
          <div class="text-h6">
            {{ p.full_name || p.species_name || 'Unnamed Pokémon' }}
          </div>

          <div class="mt-2 d-flex flex-wrap ga-2">
            <v-chip v-if="p.shiny" size="small">Shiny</v-chip>

            <v-chip v-if="p.alpha" size="small">Alpha</v-chip>
          </div>
        </v-card>
      </v-col>

      <v-col v-if="!props.activeParty.length" cols="12">
        <v-alert variant="tonal"> No active Pokémon. </v-alert>
      </v-col>
    </v-row>
  </v-card>
  <!-- HISTORY (since you actually have it now) -->

  <v-card class="pa-4">
    <div class="d-flex justify-space-between align-center mb-2">
      <h3>History</h3>
    </div>

    <v-row>
      <v-col v-for="h in props.history" :key="h.pokemon_id + h.start_date" cols="12">
        <v-card class="pa-2">
          <div class="text-body-2">Pokémon ID: {{ h.pokemon_id }}</div>

          <div class="text-caption">
            Started: {{ h.start_date }}

            <span v-if="h.end_date"> • Ended: {{ h.end_date }} </span>
          </div>
        </v-card>
      </v-col>

      <v-col v-if="!props.history.length" cols="12">
        <v-alert variant="tonal"> No history records. </v-alert>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.pokemon-card {
  cursor: pointer;
  transition: transform 0.1s ease;
}

.pokemon-card:hover {
  transform: translateY(-2px);
}
</style>
