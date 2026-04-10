<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import WikiAlert from '@/components/wiki/WikiAlert.vue'
import type { NavItem } from '@/types/wiki'

// Combined the tiers into one logical path
const championLeague: NavItem = {
  title: 'Indigo Champion League',
  subtitle: 'The Plateau Summit',
  to: '/sandbox/regions/indigo/league/champion-league', // Primary entry point
}

const regionalLeagues: NavItem[] = [
  {
    title: 'Red Conference',
    icon: 'mdi-map-legend',
    to: '/sandbox/regions/indigo/kanto/league',
    color: 'red-darken-2',
  },
  {
    title: 'Silver Conference',
    icon: 'mdi-map-marker-distance',
    to: '/sandbox/regions/indigo/johto/league',
    color: 'blue-darken-2',
  },
]

const gymCircuits: NavItem[] = [
  {
    title: 'Kanto Circuit',
    subtitle: '8 Badges',
    icon: 'mdi-shield-outline',
    to: '/sandbox/regions/kanto/gyms',
    color: 'red-darken-2',
  },
  {
    title: 'Johto Circuit',
    subtitle: '8 Badges',
    icon: 'mdi-shield-star-outline',
    to: '/sandbox/regions/johto/gyms',
    color: 'blue-darken-2',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Indigo League"
      subtitle="The unified competitive ladder of the Indigo Federation."
      icon="mdi-podium-gold"
    />

    <v-container max-width="1200" class="py-12">
      <v-row justify="center" class="mb-12">
        <v-col cols="12" md="10" lg="8">
          <v-card flat border rounded="xl" class="champion-league-portal overflow-hidden">
            <div class="portal-content d-flex flex-column flex-md-row align-center pa-8 pa-md-12">
              <div class="text-center text-md-left flex-grow-1">
                <div class="text-overline font-weight-black text-amber-darken-3 mb-2">
                  The Final Gauntlet
                </div>
                <h2 class="text-h3 font-weight-black mb-4">Champion League</h2>
                <p class="text-body-1 text-medium-emphasis mb-8" style="max-width: 400px">
                  The pinnacle of the Indigo Federation. Face the Elite Four gauntlet to earn your
                  right to challenge the reigning Champion.
                </p>

                <div class="d-flex flex-wrap gap-4 justify-center">
                  <v-btn
                    :to="championLeague.to"
                    color="deep-orange-darken-1"
                    size="x-large"
                    rounded="lg"
                    elevation="4"
                    class="font-weight-bold"
                  >
                    <v-icon start>mdi-sword-cross</v-icon>
                    Challenge
                  </v-btn>
                </div>
              </div>

              <div class="portal-visual ml-md-12 mt-8 mt-md-0">
                <div class="visual-stack">
                  <v-icon icon="mdi-shield-crown-outline" class="base-icon" />
                  <div class="pulse-ring"></div>
                </div>
              </div>
            </div>

            <div class="portal-footer py-3 px-8 d-flex align-center">
              <v-icon size="small" class="mr-2">mdi-check-decagram</v-icon>
              <span class="text-caption font-weight-bold text-uppercase">Indigo Summit</span>
              <v-spacer />
              <span class="text-caption font-weight-black">LEVEL 70+ RECOMMENDED</span>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mb-12">
        <v-col cols="12" md="8">
          <WikiCard title="The Indigo Conference" icon="mdi-trophy-variant">
            <p class="text-body-1 mb-6">
              Held annually at the Indigo Plateau, the Conference is a month-long tournament where
              the region's top 16-badge holders compete for the right to challenge the Elite Four.
            </p>
            <WikiAlert type="info" variant="tonal" class="mb-0">
              <strong>16-Badge Rule:</strong> Trainers must certify 8 Kanto badges and 8 Johto
              badges to qualify for the December brackets.
            </WikiAlert>
          </WikiCard>
        </v-col>

        <v-col cols="12" md="4">
          <WikiCard title="Season Timeline" icon="mdi-calendar-clock" color="blue">
            <v-timeline side="end" align="start" density="compact" class="mt-2">
              <v-timeline-item dot-color="success" size="small">
                <div class="text-subtitle-2 font-weight-bold">January</div>
                <div class="text-body-2">Season Kickoff</div>
              </v-timeline-item>
              <v-timeline-item dot-color="primary" size="small">
                <div class="text-subtitle-2 font-weight-bold">Feb – Oct</div>
                <div class="text-body-2">Badge Collection</div>
              </v-timeline-item>
              <v-timeline-item dot-color="error" size="small">
                <div class="text-subtitle-2 font-weight-bold text-error">December</div>
                <div class="text-body-2 font-weight-bold">The Conference</div>
              </v-timeline-item>
            </v-timeline>
          </WikiCard>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card flat border rounded="xl" class="pa-8 foundation-section">
            <div class="text-center mb-8">
              <div class="text-overline font-weight-bold text-grey-darken-1">The Foundation</div>
              <h3 class="text-h5 font-weight-black">Regional Circuits</h3>
            </div>

            <v-row>
              <v-col cols="12" md="6">
                <v-btn
                  :to="regionalLeagues[0].to"
                  block
                  variant="flat"
                  :color="regionalLeagues[0].color"
                  height="60"
                  class="mb-4 rounded-lg"
                >
                  <v-icon start>{{ regionalLeagues[0].icon }}</v-icon>
                  {{ regionalLeagues[0].title }}
                </v-btn>
                <v-card :to="gymCircuits[0].to" border flat class="pa-6 circuit-card">
                  <div class="d-flex align-center">
                    <v-icon
                      :icon="gymCircuits[0].icon"
                      :color="gymCircuits[0].color"
                      size="32"
                      class="mr-4"
                    />
                    <div>
                      <div class="text-h6 font-weight-bold">{{ gymCircuits[0].title }}</div>
                      <div class="text-caption">The Original 8 Challenge</div>
                    </div>
                    <v-spacer />
                    <v-icon size="small">mdi-open-in-new</v-icon>
                  </div>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-btn
                  :to="regionalLeagues[1].to"
                  block
                  variant="flat"
                  :color="regionalLeagues[1].color"
                  height="60"
                  class="mb-4 rounded-lg"
                >
                  <v-icon start>{{ regionalLeagues[1].icon }}</v-icon>
                  {{ regionalLeagues[1].title }}
                </v-btn>
                <v-card :to="gymCircuits[1].to" border flat class="pa-6 circuit-card">
                  <div class="d-flex align-center">
                    <v-icon
                      :icon="gymCircuits[1].icon"
                      :color="gymCircuits[1].color"
                      size="32"
                      class="mr-4"
                    />
                    <div>
                      <div class="text-h6 font-weight-bold">{{ gymCircuits[1].title }}</div>
                      <div class="text-caption">The Silver 8 Challenge</div>
                    </div>
                    <v-spacer />
                    <v-icon size="small">mdi-open-in-new</v-icon>
                  </div>
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
.champion-league-portal {
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-surface), 1) 0%,
    rgba(var(--v-theme-primary), 0.05) 100%
  );
  position: relative;
}

.portal-footer {
  background: rgba(var(--v-theme-on-surface), 0.03);
  border-top: 1px solid rgba(var(--v-border-color), 0.1);
}

.visual-stack {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.base-icon {
  font-size: 160px !important;
  color: rgba(var(--v-theme-primary), 0.1);
  filter: drop-shadow(0 0 20px rgba(var(--v-theme-primary), 0.1));
}

.pulse-ring {
  position: absolute;
  width: 120px;
  height: 120px;
  border: 2px solid rgb(var(--v-theme-primary));
  border-radius: 50%;
  opacity: 0;
  animation: portal-pulse 3s infinite;
}

.gap-4 {
  gap: 16px;
}

.foundation-section {
  background: rgba(var(--v-theme-surface-variant), 0.05);
}

.circuit-card {
  transition: all 0.2s ease;
  background: rgb(var(--v-theme-surface));
}

.circuit-card:hover {
  border-color: currentColor !important;
  background: rgba(var(--v-theme-primary), 0.02);
}

@keyframes portal-pulse {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}
</style>
