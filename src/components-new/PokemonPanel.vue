<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { PokemonDTO, PokemonHistoryDTO } from '@/types/PokemonDashboard'

defineProps<{
  activeParty: PokemonDTO[]
  box: PokemonHistoryDTO[]
  history: PokemonHistoryDTO[]
  activeCount: number
  ownedCount: number
}>()

const router = useRouter()

function openPokemon(id: string) {
  router.push(`/sandbox/pokemon/${id}`)
}
</script>
<template>
  <div class="wiki-panel-group">
    <!-- ACTIVE SQUAD CARD -->
    <v-card flat class="wiki-card-panel pa-5 mb-6">
      <div class="d-flex justify-space-between align-center mb-4 border-bottom pb-2">
        <h3 class="text-subtitle-1 font-weight-black text-uppercase tracking-wide">
          On-Hand Pokemon
        </h3>
        <v-chip size="x-small" variant="flat" color="primary" class="font-weight-black">
          BELT: {{ activeCount }} / 6
        </v-chip>
      </div>

      <v-row>
        <v-col v-for="p in activeParty" :key="p.id" cols="12" sm="6">
          <v-card flat class="pokemon-member-card pa-3" @click="openPokemon(p.id)">
            <div class="d-flex align-center justify-space-between">
              <div class="d-flex flex-column text-truncate mr-2">
                <span class="font-weight-bold text-body-1 text-truncate">
                  {{ p.full_name || p.species_name || 'Unknown' }}
                </span>
                <span class="text-caption text-medium-emphasis text-mono">
                  #{{ p.species_id?.toString().padStart(4, '0') }} |
                  {{ p.species_name?.slice(0, 8) }}</span
                >
              </div>
              <div class="d-flex ga-1 flex-shrink-0">
                <v-chip
                  v-if="p.shiny"
                  size="x-small"
                  color="amber-darken-2"
                  variant="flat"
                  class="font-weight-black"
                  >SHINY</v-chip
                >
                <v-chip
                  v-if="p.alpha"
                  size="x-small"
                  color="red-darken-2"
                  variant="flat"
                  class="font-weight-black"
                  >ALPHA</v-chip
                >
              </div>
            </div>
          </v-card>
        </v-col>

        <v-col v-if="!activeParty.length" cols="12">
          <v-alert variant="tonal" density="compact" type="info" class="text-caption rounded-lg">
            No active party registered to this profile.
          </v-alert>
        </v-col>
      </v-row>
    </v-card>

    <!-- BOX STORAGE -->
    <v-card flat class="wiki-card-panel pa-5 mb-6">
      <h3
        class="text-subtitle-1 font-weight-black text-uppercase tracking-wide mb-4 border-bottom pb-2"
      >
        BOX ({{ box.length }})
      </h3>

      <v-row class="ga-y-2">
        <v-col v-for="p in box" :key="p.id" cols="12" sm="4">
          <v-card
            flat
            class="pokemon-member-card pa-2 text-center text-truncate text-body-2 font-weight-medium"
            @click="openPokemon(p.id)"
          >
            {{ p.pokemon_name }}
            <!-- TODO // expand join to pull in name and species of pokemon <-->
          </v-card>
        </v-col>

        <v-col v-if="!box.length" cols="12">
          <v-alert variant="tonal" density="compact" type="info" class="text-caption rounded-lg">
            No Pokemon held in PC Storage.
          </v-alert>
        </v-col>
      </v-row>
    </v-card>

    <!-- HISTORICAL ARCHIVE LOGS -->
    <v-card flat class="wiki-card-panel pa-5">
      <h3
        class="text-subtitle-1 font-weight-black text-uppercase tracking-wide mb-4 border-bottom pb-2"
      >
        Pokemon History
      </h3>

      <div class="history-timeline-container">
        <!-- Clickable history logs map to relevant entity profile -->
        <v-card
          v-for="h in history"
          :key="h.pokemon_id + h.start_date"
          flat
          class="history-log-row pa-3 mb-2 d-flex justify-space-between align-center"
          @click="openPokemon(h.pokemon_id)"
        >
          <div>
            <span class="text-caption font-weight-bold text-mono"> {{ h.pokemon_name }}</span>
            <div class="text-caption text-medium-emphasis">Ownership Status</div>
          </div>
          <div class="text-right">
            <v-chip size="x-small" variant="outlined" class="font-weight-medium">
              {{ h.start_date }} — {{ h.end_date || 'Active' }}
            </v-chip>
          </div>
        </v-card>

        <v-alert
          v-if="!history.length"
          variant="tonal"
          density="compact"
          type="info"
          class="text-caption rounded-lg"
        >
          No assignment timeline archives logged.
        </v-alert>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.wiki-card-panel {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12) !important;
  background: rgb(var(--v-theme-surface));
  border-radius: 8px !important;
}

.border-bottom {
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.08);
}

.pokemon-member-card {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08) !important;
  background: rgba(var(--v-theme-on-surface), 0.02);
  border-radius: 6px !important;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.pokemon-member-card:hover {
  border-color: rgb(var(--v-theme-primary)) !important;
  background: rgb(var(--v-theme-surface));
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(var(--v-theme-primary), 0.08);
}

.history-log-row {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.06) !important;
  border-radius: 6px !important;
  background: rgba(var(--v-theme-on-surface), 0.01);
  cursor: pointer;
  transition: all 0.2s ease;
}

.history-log-row:hover {
  border-color: rgb(var(--v-theme-primary)) !important;
  background: rgb(var(--v-theme-surface));
}

.text-mono {
  font-family: monospace;
}
</style>
