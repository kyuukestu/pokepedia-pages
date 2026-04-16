<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import WikiAlert from '@/components/wiki/WikiAlert.vue'
import type { NavItem } from '@/types/wiki'

const gymCircuit: NavItem = {
  title: 'Kanto Circuit',
  subtitle: '8 Badges',
  icon: 'mdi-shield-outline',
  to: '/sandbox/regions/indigo/kanto/league/gyms',
  color: 'red-darken-2',
}
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Red League"
      subtitle="The historic competitive conference of the Kanto region."
      icon="mdi-map-legend"
    />

    <v-container max-width="1200" class="py-12">
      <v-row class="mb-12">
        <v-col cols="12" md="8">
          <WikiCard title="Red Conference Format" icon="mdi-sword">
            <div class="mb-6">
              <h4 class="text-subtitle-1 font-weight-bold text-red-darken-2 mb-2">Preliminaries</h4>
              <p class="text-body-2 mb-2">
                <strong>Format:</strong> 1v1 Single Battle. <br />
                One (1) Pokémon can be registered per match. The top 32 Trainers advance to the
                Qualifiers.
              </p>

              <v-divider class="my-4" />

              <h4 class="text-subtitle-1 font-weight-bold text-red-darken-2 mb-2">Qualifiers</h4>
              <p class="text-body-2 mb-2">
                <strong>Format:</strong> 4v4 Double Battle. <br />
                Four (4) Pokémon registered per match. Trainers are permitted
                <strong>four (4) free switches</strong>. The top 8 Trainers move on to the Finals.
              </p>

              <v-divider class="my-4" />

              <h4 class="text-subtitle-1 font-weight-bold text-red-darken-2 mb-2">Finals</h4>
              <p class="text-body-2">
                <strong>Format:</strong> 6v6 Full Single Battle. <br />
                Trainers are allowed <strong>four (4) free switches</strong>. The winner is crowned
                the Red Conference Champion.
              </p>
            </div>

            <WikiAlert type="warning" variant="tonal" class="mb-0">
              <strong>Indigo Qualification:</strong> The top 4 of the Red Conference earn a direct
              invitation into the Indigo Plateau December brackets.
            </WikiAlert>
          </WikiCard>
        </v-col>

        <v-col cols="12" md="4">
          <WikiCard title="Season Timeline" icon="mdi-calendar-clock" color="red">
            <v-timeline side="end" align="start" density="compact" class="mt-2">
              <v-timeline-item dot-color="success" size="small">
                <div class="text-subtitle-2 font-weight-bold">January</div>
                <div class="text-body-2">Season Kickoff</div>
              </v-timeline-item>
              <v-timeline-item dot-color="primary" size="small">
                <div class="text-subtitle-2 font-weight-bold">Feb – Aug</div>
                <div class="text-body-2">Badge Collection</div>
              </v-timeline-item>
              <v-timeline-item dot-color="error" size="small">
                <div class="text-subtitle-2 font-weight-bold text-error">September</div>
                <div class="text-body-2 font-weight-bold">Red Conference</div>
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
                    Challenge the 8 historic Gym Leaders of Kanto to qualify for the Red Conference.
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
