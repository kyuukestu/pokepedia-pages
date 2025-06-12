<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()

const idButtons = [
  {
    label: 'Trainer Card',
    icon: 'mdi-card-account-details',
    to: '/sandbox/content/trainer101.trainer-ids#trainer-card',
  },
  {
    label: 'Passport',
    icon: 'mdi-passport',
    to: '/sandbox/content/trainer101.trainer-ids#trainer-passport',
  },
  {
    label: 'League Card',
    icon: 'mdi-cards',
    to: '/sandbox/content/trainer101.trainer-ids#league-card',
  },
  {
    label: 'App',
    icon: 'mdi-passport-biometric',
    to: '/sandbox/content/trainer101.trainer-ids#profile-app',
  },
]

const permitButtons = [
  { label: 'Sky', icon: 'mdi-feather', to: '/sandbox/content/trainer101.permit.sky' },
  { label: 'Land', icon: 'mdi-paw', to: '/sandbox/content/trainer101.permit.land' },
  { label: 'Water', icon: 'mdi-wave', to: '/sandbox/content/trainer101.permit.water' },
]

const leagueServices = [
  { label: 'PokéMart', icon: 'mdi-store' },
  { label: 'PokéCenter', icon: 'mdi-hospital' },
  { label: 'Daycare & Breeding Facilities', icon: 'mdi-egg' },
  { label: 'Gyms, Battle Frontier, Battle Tower, etc.', icon: 'mdi-dumbbell' },
  { label: 'League Sponsored Events & Competitions', icon: 'mdi-trophy' },
  { label: 'More...', icon: 'mdi-dots-vertical' },
]

const exceptionList = [
  {
    text: 'Trainers with young Pokémon who would benefit from proximity',
    icon: 'mdi-check-underline',
  },
  {
    text: 'Trainers with health needs requiring additional guide Pokémon',
    icon: 'mdi-check-underline',
  },
]
</script>

<template>
  <v-container fluid class="py-10">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <div class="text-h2 mb-6 text-center">Trainer 101</div>

        <v-divider class="mb-6" />

        <div class="text-h4 mb-4" id="who-is-a-trainer">Who is a Trainer?</div>
        <div class="mb-4 text-body-1">
          A Pokémon Trainer is any person who catches, trains, cares for, or battles with Pokémon!
          Starting from the age of ten (10), anyone can apply for a Trainer's Card...
        </div>
        <div class="mb-4 text-body-1">
          Trainer Cards are essential for gaining access to the full suite of League-affiliated
          services, including:
        </div>

        <v-container fluid class="mx-auto list-container">
          <v-list v-for="(service, i) in leagueServices" :key="i" class="mb-4" density="compact">
            <v-list-item :title="service.label" :prepend-icon="service.icon" />
          </v-list>
        </v-container>

        <div class="mb-4 body-text-1">
          Common types of Trainer ID and their unique features are explored below:
        </div>

        <v-row class="mb-6" justify="center">
          <v-col cols="12" sm="6" md="3" v-for="btn in idButtons" :key="btn.label">
            <v-btn
              :prepend-icon="btn.icon"
              :to="btn.to"
              :variant="theme.global.name.value === 'dark' ? 'outlined' : 'elevated'"
              size="x-large"
              class="Btn"
              stacked
            >
              {{ btn.label }}
            </v-btn>
          </v-col>
        </v-row>

        <v-alert type="warning" variant="tonal" class="mb-8">
          <strong class="text-h6">CAUTION</strong><br />
          <div class="text-body-1">
            Trainers who are found to be involved with illegal or criminal activity may have their
            trainer IDs revoked!
          </div>
        </v-alert>

        <div class="text-h4 mb-4" id="the-carry-limit">The Carry Limit</div>
        <div class="text-body-1 mb-4">
          Trainers are expected to carry no more than six (6) Pokémon at any time...
        </div>

        <div class="body-text-1 mb-4">
          Alternatively, mobile PC units may be purchased to access storage systems remotely.
        </div>

        <v-alert type="success" variant="tonal" class="mb-8">
          <div class="text-body-2 mb-4">Exceptions can be made for:</div>
          <v-container class="mx-auto list-container">
            <v-list v-for="(exception, i) in exceptionList" :key="i" class="mb-4" density="compact">
              <v-list-item :title="exception.text" :prepend-icon="exception.icon" />
            </v-list>
          </v-container>
        </v-alert>

        <div class="body-text-1 mb-6">
          However, tournaments and public venues are not required to accommodate more than six (6).
        </div>

        <div class="text-h4 mb-4" id="pokémon-permits">Pokémon Permits</div>
        <div class="body-text-1 mb-4">
          Permits serve as licenses for trainers wishing to ride Pokémon across:
        </div>

        <v-row class="mb-6" justify="center">
          <v-col cols="12" sm="6" md="3" v-for="btn in permitButtons" :key="btn.label">
            <v-btn
              :prepend-icon="btn.icon"
              :to="btn.to"
              :variant="theme.global.name.value === 'dark' ? 'outlined' : 'elevated'"
              size="x-large"
              class="Btn"
              stacked
            >
              {{ btn.label }}
            </v-btn>
          </v-col>
        </v-row>

        <v-alert type="info" variant="tonal" class="mb-4">
          <strong class="text-h6">NOTE:</strong><br />
          <div class="body-text-1 mb-6">
            Permits are largely flavor text and not strictly enforced in RP.
          </div>
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* Minimal override for button height */
.v-btn {
  min-height: 100px;
}

.Btn {
  width: 150px;
  text-align: center;
}

.list-container {
  max-width: 600px;
}
</style>
