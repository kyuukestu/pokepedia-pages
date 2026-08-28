<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonDashboard } from '@/composables/usePokemonDashboard'

const route = useRoute()
const id = computed(() => route.params.id as string)

const { pokemon, loading, error } = usePokemonDashboard(id)

const defaultBuild = computed(() => pokemon.value?.builds.find((b) => b.is_default) ?? null)
const ownershipHistory = computed(() => pokemon.value?.ownership_history ?? [])
</script>

<template>
  <v-container max-width="1200" class="py-6 wiki-pokemon-view">
    <!-- ASYNC LOADING OVERLAY -->
    <div v-if="loading" class="d-flex flex-column align-center justify-center py-16">
      <v-progress-circular indeterminate size="40" color="primary" class="mb-4" />
      <span class="text-caption text-medium-emphasis font-weight-bold letter-spacing-1"
        >EXTRACTING ENTITY PROFILE...</span
      >
    </div>

    <!-- ERROR STATE CONTAINER -->
    <v-alert v-else-if="error" type="error" variant="tonal" class="rounded-lg mb-6">
      <div class="text-subtitle-2 font-weight-bold">Index Retrieval Error</div>
      <div class="text-caption">{{ error }}</div>
    </v-alert>

    <!-- CONTENT DATA DOSSIER -->
    <template v-else-if="pokemon">
      <!-- HEADER DOSSIER CARD -->
      <v-card flat class="wiki-header-panel pa-6 mb-6">
        <div
          class="d-flex flex-column flex-sm-row justify-space-between align-start align-sm-center ga-4"
        >
          <div>
            <h1 class="text-h4 font-weight-black text-uppercase tracking-tight mb-1">
              {{ pokemon.full_name || pokemon.species_name }}
            </h1>
            <div
              class="text-subtitle-1 text-medium-emphasis font-weight-bold tracking-wide text-uppercase"
            >
              Classification: {{ pokemon.species_name }}
              <span v-if="pokemon.gender" class="ml-2 text-disabled text-mono"
                >[{{ pokemon.gender }}]</span
              >
            </div>
          </div>

          <div class="d-flex ga-2">
            <v-chip
              v-if="pokemon.shiny"
              color="amber-darken-2"
              variant="flat"
              class="font-weight-black text-caption"
              >SHINY</v-chip
            >
            <v-chip
              v-if="pokemon.alpha"
              color="red-darken-2"
              variant="flat"
              class="font-weight-black text-caption"
              >ALPHA</v-chip
            >
          </div>
        </div>
      </v-card>

      <v-row>
        <!-- COMBAT BUILD SCHEMATICS -->
        <v-col cols="12" md="7">
          <v-card flat class="wiki-card-panel pa-5 fill-height">
            <div class="d-flex justify-space-between align-center mb-4 border-bottom pb-2">
              <h3 class="text-subtitle-1 font-weight-black text-uppercase tracking-wide">
                Main Build
              </h3>
              <v-chip
                v-if="defaultBuild"
                size="x-small"
                variant="flat"
                color="primary"
                class="font-weight-black"
              >
                LVL {{ defaultBuild.level }}
              </v-chip>
            </div>

            <template v-if="defaultBuild">
              <!-- Parameters Metadata Rows -->
              <div class="build-meta-grid mb-5">
                <div class="meta-row d-flex justify-space-between py-2 border-bottom text-body-2">
                  <span class="font-weight-bold text-medium-emphasis">ABILITY</span>
                  <span class="font-weight-medium text-high-emphasis text-uppercase">{{
                    defaultBuild.ability
                  }}</span>
                </div>
                <div class="meta-row d-flex justify-space-between py-2 border-bottom text-body-2">
                  <span class="font-weight-bold text-medium-emphasis">HELD ITEM</span>
                  <span class="font-weight-medium text-high-emphasis text-uppercase">{{
                    defaultBuild.held_item || 'None'
                  }}</span>
                </div>
              </div>

              <!-- Move Pool Slots Grid -->
              <h4
                class="text-caption font-weight-black text-uppercase tracking-wider text-disabled mb-3"
              >
                Known Moves
              </h4>
              <v-row class="ga-y-2">
                <v-col v-for="move in defaultBuild.moves" :key="move.slot_order" cols="12" sm="6">
                  <v-card
                    flat
                    class="wiki-move-node pa-3 text-center font-weight-bold text-body-2 text-uppercase"
                  >
                    {{ move.move }}
                  </v-card>
                </v-col>
                <v-col v-if="!defaultBuild.moves.length" cols="12">
                  <v-alert
                    variant="tonal"
                    density="compact"
                    type="warning"
                    class="text-caption rounded-lg"
                  >
                    No techniques slotted for this schematic.
                  </v-alert>
                </v-col>
              </v-row>
            </template>

            <v-alert
              v-else
              variant="tonal"
              density="compact"
              type="info"
              class="text-caption rounded-lg"
            >
              No configuration details found for this target registry.
            </v-alert>
          </v-card>
        </v-col>

        <!-- ASSIGNMENT HISTORY TIMELINE -->
        <v-col cols="12" md="5">
          <v-card flat class="wiki-card-panel pa-5 fill-height">
            <h3
              class="text-subtitle-1 font-weight-black text-uppercase tracking-wide mb-4 border-bottom pb-2"
            >
              Ownership History
            </h3>

            <v-timeline density="compact" side="end" class="wiki-compact-timeline pa-0">
              <v-timeline-item
                v-for="entry in ownershipHistory"
                :key="entry.id"
                dot-color="primary"
                size="x-small"
              >
                <div class="d-flex flex-column mb-1">
                  <span class="text-body-2 font-weight-bold text-high-emphasis">
                    {{ entry.character_name || 'Unregistered Master' }}
                  </span>
                  <span
                    class="text-xxs font-weight-medium text-medium-emphasis text-uppercase tracking-wider"
                  >
                    {{ entry.start_date }} — {{ entry.end_date || 'Present' }}
                  </span>
                </div>
              </v-timeline-item>
            </v-timeline>

            <v-alert
              v-if="!ownershipHistory.length"
              variant="tonal"
              density="compact"
              type="info"
              class="text-caption rounded-lg"
            >
              No previous assignments recorded in regional archives.
            </v-alert>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;900&display=swap');

.wiki-pokemon-view {
  font-family: 'Outfit', sans-serif;
}

.letter-spacing-1 {
  letter-spacing: 1px;
}

.tracking-tight {
  letter-spacing: -0.025em;
}

.text-mono {
  font-family: monospace;
}

.text-xxs {
  font-size: 0.65rem;
}

.wiki-header-panel {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12) !important;
  border-left: 6px solid rgb(var(--v-theme-primary)) !important;
  background: rgb(var(--v-theme-surface));
  border-radius: 8px !important;
}

.wiki-card-panel {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12) !important;
  background: rgb(var(--v-theme-surface));
  border-radius: 8px !important;
}

.border-bottom {
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.08);
}

.wiki-move-node {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08) !important;
  background: rgba(var(--v-theme-on-surface), 0.02);
  border-radius: 6px !important;
  letter-spacing: 0.5px;
}

.wiki-compact-timeline :deep(.v-timeline-item__body) {
  padding-inline-start: 12px !important;
}
</style>
