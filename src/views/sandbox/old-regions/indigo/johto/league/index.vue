<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import WikiAlert from '@/components/wiki/WikiAlert.vue'
import type { NavItem } from '@/types/wiki'

const gymCircuit: NavItem = {
  title: 'Johto Circuit',
  subtitle: '8 Badges',
  icon: 'mdi-shield-star-outline',
  to: '/sandbox/regions/indigo/johto/league/gyms',
  color: 'blue-darken-2',
}
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Silver Conference"
      subtitle="The prestigious annual championship held at the base of Mt. Silver."
      icon="mdi-map-marker-distance"
      color="blue-darken-2"
    />

    <v-container max-width="1200" class="py-12">
      <v-row class="mb-12">
        <v-col cols="12" md="8">
          <WikiCard title="Silver Conference Format" icon="mdi-sword">
            <div class="mb-6">
              <h4 class="text-subtitle-1 font-weight-bold text-blue-darken-2 mb-2">
                Preliminaries
              </h4>
              <p class="text-body-2 mb-2">
                <strong>Format:</strong> 2v2 Double Battle. <br />
                Two (2) Pokémon are registered and fielded per match. The
                <strong>top 48 trainers</strong> advance to the Qualifiers.
              </p>

              <v-divider class="my-4" />

              <h4 class="text-subtitle-1 font-weight-bold text-blue-darken-2 mb-2">
                Qualifiers (Round-Robin Blocks)
              </h4>
              <div class="text-body-2 mb-2">
                <p class="mb-2">
                  The 48 advancing trainers are split into <strong>16 blocks of three</strong>. Each
                  block participates in a round-robin tournament (3v3 Single Battles).
                </p>
                <v-table density="compact" class="border rounded-lg mb-4">
                  <thead>
                    <tr>
                      <th class="text-left">Result</th>
                      <th class="text-left">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Win</td>
                      <td>3 Points</td>
                    </tr>
                    <tr>
                      <td>Draw</td>
                      <td>1 Point</td>
                    </tr>
                    <tr>
                      <td>Loss</td>
                      <td>0 Points</td>
                    </tr>
                  </tbody>
                </v-table>
                <p>
                  The top trainer from each block (16 total) moves to the finals. In the event of a
                  tie, a tie-breaker round-robin is held.
                </p>
              </div>

              <v-divider class="my-4" />

              <h4 class="text-subtitle-1 font-weight-bold text-blue-darken-2 mb-2">Finals</h4>
              <p class="text-body-2">
                <strong>Format:</strong> 6v6 Full Single Battle. <br />
                Standard elimination bracket. Trainers are permitted
                <strong>four (4) free switches</strong> per match.
              </p>
            </div>

            <WikiAlert type="info" variant="tonal" class="mb-0">
              <strong>Tie-Breaker Protocol:</strong> Unlike the Red Conference, the Silver
              Conference utilizes a "re-play" round-robin if point totals are equal at the end of
              the Qualifier stage.
            </WikiAlert>
            <WikiAlert type="warning" variant="tonal" class="mb-0">
              <strong>Indigo Qualification:</strong> The top 4 of the Silver Conference earn a
              direct invitation into the Indigo Plateau December brackets.
            </WikiAlert>
          </WikiCard>
        </v-col>

        <v-col cols="12" md="4">
          <WikiCard title="Season Timeline" icon="mdi-calendar-clock" color="blue">
            <v-timeline side="end" align="start" density="compact" class="mt-2">
              <v-timeline-item dot-color="success" size="small">
                <div class="text-subtitle-2 font-weight-bold">February</div>
                <div class="text-body-2">Season Kickoff</div>
              </v-timeline-item>
              <v-timeline-item dot-color="primary" size="small">
                <div class="text-subtitle-2 font-weight-bold">March – Sept</div>
                <div class="text-body-2">Badge Collection</div>
              </v-timeline-item>
              <v-timeline-item dot-color="error" size="small">
                <div class="text-subtitle-2 font-weight-bold text-error">October</div>
                <div class="text-body-2 font-weight-bold">Silver Conference</div>
              </v-timeline-item>
            </v-timeline>
          </WikiCard>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card flat border rounded="xl" class="pa-8 foundation-section">
            <div class="text-center mb-8">
              <div class="text-overline font-weight-bold text-grey-darken-1">Access Gateway</div>
              <h3 class="text-h5 font-weight-black">Gym Circuit</h3>
            </div>

            <v-row justify="center">
              <v-col cols="12" md="6">
                <v-card :to="gymCircuit.to" border flat class="pa-8 circuit-card text-center">
                  <v-avatar :color="gymCircuit.color" size="64" class="mb-4">
                    <v-icon :icon="gymCircuit.icon" color="white" size="32" />
                  </v-avatar>
                  <div class="text-h5 font-weight-bold mb-1">{{ gymCircuit.title }}</div>
                  <div class="text-body-2 text-medium-emphasis mb-6">
                    Collect the 8 badges of Johto to register for the October Preliminaries at
                    Silver Town.
                  </div>
                  <v-btn block variant="tonal" :color="gymCircuit.color"> View Gym Leaders </v-btn>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<style scoped>
.foundation-section {
  background: rgba(var(--v-theme-surface-variant), 0.05);
}

.circuit-card {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: rgb(var(--v-theme-surface));
}

.circuit-card:hover {
  transform: translateY(-8px);
  border-color: rgb(var(--v-theme-primary)) !important;
  background: rgba(var(--v-theme-primary), 0.02);
}
</style>
