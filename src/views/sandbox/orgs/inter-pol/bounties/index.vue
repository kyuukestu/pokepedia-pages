<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid from '@/components/wiki/FeatureGrid.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'
import WikiAlert from '@/components/wiki/WikiAlert.vue'

const wantedList = [
  {
    title: 'Hunter J (Status: Active)',
    icon: 'mdi-target-variant',
    color: 'red-darken-4',
    description:
      'Notorious poacher utilizing high-tech petrification technology. Known to auction rare species to the highest bidder.',
    bounty: '₽9,000,000',
    location: 'Galar, Motostoke Outskirts',
    intel: 'Operates a stealth-capable airship. Primary combatants: Salamence, Drapion.',
  },
  {
    title: 'Ghetsis Harmonia (Status: Fugitive)',
    icon: 'mdi-eye-off-outline',
    color: 'red-darken-4',
    description:
      'Founder of Team Plasma. Wanted for regional terrorism, psychological manipulation, and the attempted freezing of Unova.',
    bounty: '₽25,000,000',
    location: 'Unknown (Last seen Giant Chasm)',
    intel: 'Extreme narcissist. Approach with specialized anti-psychic shielding.',
  },
  {
    title: 'Colress (Status: Person of Interest)',
    icon: 'mdi-flask-empty-outline',
    color: 'amber-darken-4',
    description:
      'Scientist linked to Neo-Plasma. Wanted for questioning regarding illegal bio-mechanical overrides and "Colress Machine" distribution.',
    bounty: '₽12,500,000',
    location: 'Alola (Unconfirmed)',
    intel: 'Non-hostile unless research is interrupted. Exceptional strategic intelligence.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Most Wanted: High-Priority Targets"
      subtitle="The International Police Global Watchlist. Authorized for Rank 4 Trainers and law enforcement personnel only."
      icon="mdi-shield-alert"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="red-darken-4" variant="flat" size="small">Level 5 Threat</v-chip>
          <v-chip color="grey-darken-4" variant="flat" size="small">Bounty Active</v-chip>
          <v-chip variant="outlined" size="small">Interpol Division 0</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="Enforcement Briefing" icon="mdi-gavel" class="red-darken-4">
        <p class="text-body-1 lh-lg mb-6">
          The following individuals represent a clear and present danger to regional stability,
          Pokémon welfare, and the safety of the general public. Under
          <strong>Interpol Statute 402</strong>, trainers are authorized to engage only in defensive
          measures unless officially deputized as a <strong>Regional Warden</strong> or
          <strong>Ranger</strong>.
        </p>
        <WikiAlert type="warning" icon="mdi-alert-octagon">
          <strong>CAUTION:</strong> These targets are known to use tactical gear, illegal Pokémon
          enhancements, and advanced weaponry. Do not attempt capture alone.
        </WikiAlert>
      </WikiCard>

      <v-row class="mt-6">
        <v-col cols="12" v-for="(criminal, i) in wantedList" :key="i">
          <WikiCard :title="criminal.title" :icon="criminal.icon" :class="criminal.color">
            <v-row align="center">
              <v-col cols="12" md="8">
                <p class="text-body-1 mb-4">{{ criminal.description }}</p>

                <v-list density="compact" bg-color="transparent" class="pa-0">
                  <v-list-item class="px-0">
                    <template v-slot:prepend>
                      <v-icon color="red-darken-2" class="mr-2">mdi-currency-usd</v-icon>
                    </template>
                    <v-list-item-title
                      ><strong>Bounty:</strong> {{ criminal.bounty }}</v-list-item-title
                    >
                  </v-list-item>

                  <v-list-item class="px-0">
                    <template v-slot:prepend>
                      <v-icon color="blue-darken-2" class="mr-2">mdi-map-marker</v-icon>
                    </template>
                    <v-list-item-title
                      ><strong>Last Known Location:</strong>
                      {{ criminal.location }}</v-list-item-title
                    >
                  </v-list-item>

                  <v-list-item class="px-0">
                    <template v-slot:prepend>
                      <v-icon color="orange-darken-2" class="mr-2">mdi-information-outline</v-icon>
                    </template>
                    <v-list-item-title
                      ><strong>Tactical Intel:</strong> {{ criminal.intel }}</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-col>

              <v-col cols="12" md="4" class="d-flex justify-center">
                <div class="text-center">
                  <v-icon size="120" :color="criminal.color" class="mb-2"
                    >mdi-account-cancel</v-icon
                  >
                  <div class="text-overline font-weight-black red--text">WARRANT ACTIVE</div>
                </div>
              </v-col>
            </v-row>
          </WikiCard>
        </v-col>
      </v-row>

      <WikiCallout
        label="Reporting Procedure"
        icon="mdi-phone-incoming"
        class="mt-8 blue-grey-darken-3"
      >
        If you have information regarding the whereabouts of these individuals, use the
        <strong>Encrypted Interpol Uplink</strong> available at any Pokémon Center. Informants may
        choose to remain anonymous and are eligible for 15% of the posted bounty upon successful
        verification.
      </WikiCallout>

      <div class="d-flex justify-center my-12">
        <v-btn
          prepend-icon="mdi-arrow-left"
          color="grey-darken-4"
          variant="elevated"
          size="large"
          to="sandbox/orgs/inter-pol"
          rounded="lg"
          elevation="4"
        >
          Return to Interpol HQ
        </v-btn>
      </div>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}

:deep(.feature-card) {
  border-style: solid !important;
  border-width: 1px;
  background-color: rgba(var(--v-theme-red-darken-4), 0.05);
  border-color: rgba(var(--v-theme-red-darken-4), 0.3) !important;
}

.v-theme--dark :deep(.feature-card) {
  background-color: rgba(183, 28, 28, 0.05);
  border-color: rgba(183, 28, 28, 0.2) !important;
}
</style>
