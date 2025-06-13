<script setup lang="ts">
const idButtons = [
  {
    label: 'Trainer Card',
    icon: 'mdi-card-account-details',
    to: '/sandbox/content/trainer101.trainer-ids#trainer-card',
    color: 'primary',
    description: 'Basic identification for all trainers',
  },
  {
    label: 'Passport',
    icon: 'mdi-passport',
    to: '/sandbox/content/trainer101.trainer-ids#trainer-passport',
    color: 'secondary',
    description: 'For international travel',
  },
  {
    label: 'League Card',
    icon: 'mdi-cards',
    to: '/sandbox/content/trainer101.trainer-ids#league-card',
    color: 'success',
    description: 'Official league recognition',
  },
  {
    label: 'App',
    icon: 'mdi-passport-biometric',
    to: '/sandbox/content/trainer101.trainer-ids#profile-app',
    color: 'info',
    description: 'Digital trainer profile',
  },
]

const permitButtons = [
  {
    label: 'Sky',
    icon: 'mdi-feather',
    to: '/sandbox/content/trainer101.permit.sky',
    color: 'blue',
    gradient: 'linear-gradient(135deg, #64B5F6 0%, #1976D2 100%)',
  },
  {
    label: 'Land',
    icon: 'mdi-paw',
    to: '/sandbox/content/trainer101.permit.land',
    color: 'green',
    gradient: 'linear-gradient(135deg, #81C784 0%, #388E3C 100%)',
  },
  {
    label: 'Water',
    icon: 'mdi-wave',
    to: '/sandbox/content/trainer101.permit.water',
    color: 'cyan',
    gradient: 'linear-gradient(135deg, #4DD0E1 0%, #0097A7 100%)',
  },
]

const leagueServices = [
  { label: 'PokéMart', icon: 'mdi-store', color: 'orange' },
  { label: 'PokéCenter', icon: 'mdi-hospital', color: 'red' },
  { label: 'Daycare & Breeding Facilities', icon: 'mdi-egg', color: 'pink' },
  { label: 'Gyms, Battle Frontier, Battle Tower, etc.', icon: 'mdi-dumbbell', color: 'purple' },
  { label: 'League Sponsored Events & Competitions', icon: 'mdi-trophy', color: 'amber' },
  { label: 'More...', icon: 'mdi-dots-vertical', color: 'grey' },
]

const exceptionList = [
  {
    text: 'Trainers with young Pokémon who would benefit from proximity',
    icon: 'mdi-check-circle',
  },
  {
    text: 'Trainers with health needs requiring additional guide Pokémon',
    icon: 'mdi-check-circle',
  },
]
</script>

<template>
  <v-container fluid class="py-8">
    <v-row justify="center">
      <v-col cols="12" lg="10" xl="8">
        <!-- Header Section -->
        <v-card class="mb-8 overflow-hidden" elevation="8">
          <div class="header-gradient pa-8 text-center">
            <v-icon size="80" class="mb-4 header-icon">mdi-pokeball</v-icon>
            <h1 class="text-h2 font-weight-bold text-white mb-2">Trainer 101</h1>
            <p class="text-h6 text-white opacity-90">
              Your comprehensive guide to becoming a Pokémon Trainer
            </p>
          </div>
        </v-card>

        <!-- Who is a Trainer Section -->
        <v-card class="mb-8" elevation="4">
          <v-card-title class="text-h4 pa-6 bg-primary text-white">
            <v-icon size="32" class="mr-3">mdi-account-star</v-icon>
            Who is a Trainer?
          </v-card-title>
          <v-card-text class="pa-6">
            <v-row>
              <v-col cols="12" md="8">
                <p class="text-body-1 mb-4 text-justify">
                  A Pokémon Trainer is any person who catches, trains, cares for, or battles with
                  Pokémon! Starting from the age of ten (10), anyone can apply for a Trainer's
                  Card...
                </p>
                <p class="text-body-1 mb-4">
                  Trainer Cards are essential for gaining access to the full suite of
                  League-affiliated services:
                </p>
              </v-col>
              <v-col cols="12" md="4" class="d-flex justify-center align-center">
                <v-avatar size="120" class="trainer-avatar">
                  <v-icon size="80" color="primary">mdi-account-circle</v-icon>
                </v-avatar>
              </v-col>
            </v-row>

            <!-- League Services Grid -->
            <v-row class="mt-4">
              <v-col v-for="(service, i) in leagueServices" :key="i" cols="12" sm="6" md="4">
                <v-card
                  class="service-card h-100"
                  :color="service.color"
                  variant="tonal"
                  elevation="2"
                  hover
                >
                  <v-card-text class="text-center pa-4">
                    <v-icon :color="service.color" size="32" class="mb-2">{{
                      service.icon
                    }}</v-icon>
                    <div class="text-body-2 font-weight-medium">{{ service.label }}</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <p class="text-body-1 mt-6 mb-4">
              Common types of Trainer ID and their unique features are explored below:
            </p>

            <!-- ID Buttons Enhanced -->
            <v-row class="mt-4">
              <v-col v-for="btn in idButtons" :key="btn.label" cols="12" sm="6" md="3">
                <v-card
                  :to="btn.to"
                  class="id-card h-100"
                  :color="btn.color"
                  variant="outlined"
                  elevation="2"
                  hover
                >
                  <v-card-text class="text-center pa-6">
                    <v-icon :color="btn.color" size="48" class="mb-3">{{ btn.icon }}</v-icon>
                    <div class="text-h6 font-weight-bold mb-2">{{ btn.label }}</div>
                    <div class="text-body-2 text-medium-emphasis">{{ btn.description }}</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Warning Alert Enhanced -->
        <v-alert
          type="warning"
          variant="tonal"
          class="mb-8"
          elevation="2"
          border="start"
          border-color="warning"
        >
          <template v-slot:prepend>
            <v-icon size="32">mdi-alert-triangle</v-icon>
          </template>
          <v-alert-title class="text-h6 mb-2">CAUTION</v-alert-title>
          <div class="text-body-1">
            Trainers who are found to be involved with illegal or criminal activity may have their
            trainer IDs revoked!
          </div>
        </v-alert>

        <!-- Carry Limit Section -->
        <v-card class="mb-8" elevation="4">
          <v-card-title class="text-h4 pa-6 bg-secondary text-white">
            <v-icon size="32" class="mr-3">mdi-briefcase</v-icon>
            The Carry Limit
          </v-card-title>
          <v-card-text class="pa-6">
            <v-row>
              <v-col cols="12" md="8">
                <p class="text-body-1 mb-4">
                  Trainers are expected to carry no more than six (6) Pokémon at any time...
                </p>
                <p class="text-body-1 mb-4">
                  Alternatively, mobile PC units may be purchased to access storage systems
                  remotely.
                </p>
              </v-col>
              <v-col cols="12" md="4" class="d-flex justify-center align-center">
                <v-chip-group column>
                  <v-chip v-for="n in 6" :key="n" color="primary" size="large">
                    <v-icon>mdi-pokeball</v-icon>
                    {{ n }}
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>

            <!-- Exceptions Alert Enhanced -->
            <v-alert
              type="success"
              variant="tonal"
              class="mt-6"
              elevation="2"
              border="start"
              border-color="success"
            >
              <template v-slot:prepend>
                <v-icon size="32">mdi-information</v-icon>
              </template>
              <v-alert-title class="text-body-1 font-weight-bold mb-3"
                >Exceptions can be made for:</v-alert-title
              >
              <v-list density="compact" class="bg-transparent">
                <v-list-item
                  v-for="(exception, i) in exceptionList"
                  :key="i"
                  :prepend-icon="exception.icon"
                  class="px-0"
                >
                  <v-list-item-title class="text-body-2">{{ exception.text }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-alert>

            <p class="text-body-1 mt-4">
              However, tournaments and public venues are not required to accommodate more than six
              (6).
            </p>
          </v-card-text>
        </v-card>

        <!-- Permits Section -->
        <v-card class="mb-8" elevation="4">
          <v-card-title class="text-h4 pa-6 bg-info text-white">
            <v-icon size="32" class="mr-3">mdi-license</v-icon>
            Pokémon Permits
          </v-card-title>
          <v-card-text class="pa-6">
            <p class="text-body-1 mb-6">
              Permits serve as licenses for trainers wishing to ride Pokémon across different
              terrains:
            </p>

            <!-- Permit Buttons Enhanced -->
            <v-row>
              <v-col v-for="btn in permitButtons" :key="btn.label" cols="12" sm="4">
                <v-card
                  :to="btn.to"
                  class="permit-card h-100 text-white"
                  elevation="6"
                  hover
                  :style="{ background: btn.gradient }"
                >
                  <v-card-text class="text-center pa-8">
                    <v-icon size="64" class="mb-4 text-white">{{ btn.icon }}</v-icon>
                    <div class="text-h5 font-weight-bold">{{ btn.label }}</div>
                    <div class="text-body-2 mt-2 text-white">Travel Permit</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Info Alert Enhanced -->
        <v-alert
          type="info"
          variant="tonal"
          class="mb-4"
          elevation="2"
          border="start"
          border-color="info"
        >
          <template v-slot:prepend>
            <v-icon size="32">mdi-information-outline</v-icon>
          </template>
          <v-alert-title class="text-h6 mb-2">NOTE</v-alert-title>
          <div class="text-body-1">
            Permits are largely flavor text and not strictly enforced in RP.
          </div>
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.header-gradient {
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #64b5f6 100%);
  position: relative;
}

.header-gradient::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="white" opacity="0.1"/></svg>')
    repeat;
  background-size: 50px 50px;
}

.header-icon {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.service-card {
  transition: all 0.3s ease;
  cursor: pointer;
}

.service-card:hover {
  transform: translateY(-4px);
}

.id-card {
  transition: all 0.3s ease;
  cursor: pointer;
  min-height: 160px;
}

.id-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.permit-card {
  transition: all 0.3s ease;
  cursor: pointer;
  min-height: 200px;
  position: relative;
  overflow: hidden;
}

.permit-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.permit-card:hover::before {
  transform: translateX(100%);
}

.permit-card:hover {
  transform: translateY(-8px) scale(1.02);
}

.trainer-avatar {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border: 4px solid #2196f3;
}

.v-card-title {
  display: flex;
  align-items: center;
}

.v-alert {
  border-radius: 12px !important;
}

.v-card {
  border-radius: 16px !important;
}

.text-justify {
  text-align: justify;
}
</style>
