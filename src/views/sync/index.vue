<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()

const trainerRanks = [
  { rank: 'Bronze', tier: 1, color: 'brown' },
  { rank: 'Silver', tier: 2, color: 'grey', power: 'Synchro Burst' },
  { rank: 'Gold', tier: 3, color: 'yellow', power: 'Z-Moves' },
  { rank: 'Platinum', tier: 4, color: 'blue-grey', power: 'Mega-Evolution' },
  { rank: 'Master', tier: 5, color: 'purple' },
  { rank: 'High Master', tier: 6, color: 'deep-purple' },
  { rank: 'Grand Master', tier: 7, color: 'indigo' },
  { rank: 'Legendary', tier: 8, color: 'orange' },
]

const keyFeatures = [
  {
    title: 'Synchronization Bond',
    description: 'Telepathic link between trainer and Pokémon with energy sharing',
    icon: 'mdi-link-variant',
    color: 'purple',
  },
  {
    title: 'Enhanced Pokémon',
    description: 'Larger, more intelligent Pokémon due to Pokeviruses',
    icon: 'mdi-resize',
    color: 'green',
  },
  {
    title: 'Fortitude Energy',
    description: 'Human-produced energy to power Pokémon moves and abilities',
    icon: 'mdi-lightning-bolt',
    color: 'yellow',
  },
  {
    title: 'United League App',
    description: 'Essential tool for tracking swarms, grottos, and announcements',
    icon: 'mdi-cellphone',
    color: 'blue',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <!-- Hero Section -->
    <v-card
      class="mx-auto mb-8"
      :class="
        theme.current.value.dark
          ? 'bg-gradient-to-r from-purple-900 to-blue-900'
          : 'bg-gradient-to-r from-blue-100 to-purple-100'
      "
      elevation="8"
      rounded="lg"
    >
      <v-card-text class="text-center py-12">
        <v-icon
          size="72"
          :color="theme.current.value.dark ? 'cyan-accent-3' : 'blue-darken-2'"
          class="mb-4"
        >
          mdi-sync
        </v-icon>
        <h1
          class="text-h2 font-weight-bold mb-2"
          :class="theme.current.value.dark ? 'text-cyan-accent-3' : 'text-blue-darken-3'"
        >
          The World of Poke-Sync
        </h1>
        <p class="text-h5 opacity-80">Ten years after Sword & Shield - A world transformed</p>
        <v-chip color="secondary" variant="flat" size="large" class="mt-4">
          Ultra Space Origins
        </v-chip>
      </v-card-text>
    </v-card>

    <!-- Content Sections -->
    <v-container max-width="1400">
      <!-- Background Section -->
      <v-card class="mb-8" elevation="4" rounded="lg">
        <v-card-title class="d-flex align-center pa-6">
          <v-icon
            :color="theme.current.value.dark ? 'red-accent-2' : 'red-darken-2'"
            size="32"
            class="me-3"
          >
            mdi-history
          </v-icon>
          <span class="text-h4 font-weight-bold">Background</span>
        </v-card-title>

        <v-divider
          :color="theme.current.value.dark ? 'grey-darken-1' : 'grey-lighten-2'"
        ></v-divider>

        <v-card-text class="pa-6">
          <v-timeline side="end" class="mb-6">
            <v-timeline-item dot-color="red-darken-2" size="small">
              <template v-slot:opposite>
                <div class="text-h6 font-weight-bold">12 Years Ago</div>
              </template>
              <div>
                <div class="text-h6 mb-2">Ultra Space Invasion</div>
                <p class="mb-0">
                  New strain of viruses infiltrated the world from Ultra Space through Ultra
                  Wormholes in Alola, going completely undetected.
                </p>
              </div>
            </v-timeline-item>

            <v-timeline-item dot-color="purple-darken-2" size="small">
              <template v-slot:opposite>
                <div class="text-h6 font-weight-bold">10 Years Ago</div>
              </template>
              <div>
                <div class="text-h6 mb-2">The Darkest Day</div>
                <p class="mb-0">
                  After the second advent of the Darkest Day in Galar, Pokevirus effects began
                  showing in both humans and Pokémon worldwide.
                </p>
              </div>
            </v-timeline-item>

            <v-timeline-item dot-color="orange-darken-2" size="small">
              <template v-slot:opposite>
                <div class="text-h6 font-weight-bold">The Crisis</div>
              </template>
              <div>
                <div class="text-h6 mb-2">Pokémon Transformation</div>
                <p class="mb-0">
                  Pokémon grew larger and more intelligent but became ravenous. Wild Pokémon
                  attacked settlements in desperate hunger, leading to chaotic battles.
                </p>
              </div>
            </v-timeline-item>

            <v-timeline-item dot-color="green-darken-2" size="small">
              <template v-slot:opposite>
                <div class="text-h6 font-weight-bold">The Solution</div>
              </template>
              <div>
                <div class="text-h6 mb-2">First Bonds & Fortitude</div>
                <p class="mb-0">
                  Champions and Gym Leaders discovered how to produce 'Fortitude' energy,
                  establishing the first Synchronization Bonds and beating back wild hordes.
                </p>
              </div>
            </v-timeline-item>

            <v-timeline-item dot-color="blue-darken-2" size="small">
              <template v-slot:opposite>
                <div class="text-h6 font-weight-bold">Resolution</div>
              </template>
              <div>
                <div class="text-h6 mb-2">Ultra Wars</div>
                <p class="mb-0">
                  All major regions collaborated to discover the source of Pokeviruses and seal the
                  Ultra Wormholes, ending the immediate threat.
                </p>
              </div>
            </v-timeline-item>
          </v-timeline>

          <v-alert
            type="warning"
            variant="tonal"
            :color="theme.current.value.dark ? 'amber-lighten-1' : 'amber-darken-1'"
          >
            <strong>Present Day:</strong> Many years have passed and the world has returned to
            relative normalcy, but the threats of the past still linger in present memory...
          </v-alert>
        </v-card-text>
      </v-card>

      <!-- Synchronization Bond Section -->
      <v-card class="mb-8" elevation="4" rounded="lg">
        <v-card-title class="d-flex align-center pa-6">
          <v-icon
            :color="theme.current.value.dark ? 'purple-accent-2' : 'purple-darken-2'"
            size="32"
            class="me-3"
          >
            mdi-link-variant
          </v-icon>
          <span class="text-h4 font-weight-bold">The Synchronization Bond</span>
        </v-card-title>

        <v-divider
          :color="theme.current.value.dark ? 'grey-darken-1' : 'grey-lighten-2'"
        ></v-divider>

        <v-card-text class="pa-6">
          <div class="text-body-1 line-height-lg mb-6">
            <p class="mb-4">
              At present day, the energy-sharing process pioneered nearly a decade ago has been
              perfected. When a trainer catches a Pokémon they are able to, with the aid of a new
              series of Pokéballs, establish what is known as a
              <strong>Synchronization Bond</strong>.
            </p>

            <v-alert
              type="info"
              variant="tonal"
              class="mb-4"
              :color="theme.current.value.dark ? 'cyan-lighten-1' : 'cyan-darken-1'"
            >
              The Synchronization Bond establishes a telepathic link between trainer and Pokémon and
              through this bond, the trainer can both communicate with and provide energy to their
              Pokémon.
            </v-alert>
          </div>

          <!-- Bond Process Cards -->
          <v-row class="mb-6">
            <v-col cols="12" md="4">
              <v-card
                variant="outlined"
                class="h-100"
                :color="theme.current.value.dark ? 'red-darken-3' : 'red-lighten-4'"
              >
                <v-card-text class="text-center">
                  <v-icon
                    size="48"
                    :color="theme.current.value.dark ? 'red-accent-2' : 'red-darken-2'"
                    class="mb-2"
                  >
                    mdi-alert-circle
                  </v-icon>
                  <h3 class="text-h6 mb-2">Bond Creation</h3>
                  <p class="text-body-2 mb-0">
                    Consumes significant energy and can cause fatigue, sickness, and extreme nausea
                    for new trainers
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card
                variant="outlined"
                class="h-100"
                :color="theme.current.value.dark ? 'blue-darken-3' : 'blue-lighten-4'"
              >
                <v-card-text class="text-center">
                  <v-icon
                    size="48"
                    :color="theme.current.value.dark ? 'blue-accent-2' : 'blue-darken-2'"
                    class="mb-2"
                  >
                    mdi-battery-charging
                  </v-icon>
                  <h3 class="text-h6 mb-2">Passive Draw</h3>
                  <p class="text-body-2 mb-0">
                    Pokémon passively draws from trainer's energy to sustain itself
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card
                variant="outlined"
                class="h-100"
                :color="theme.current.value.dark ? 'purple-darken-3' : 'purple-lighten-4'"
              >
                <v-card-text class="text-center">
                  <v-icon
                    size="48"
                    :color="theme.current.value.dark ? 'purple-accent-2' : 'purple-darken-2'"
                    class="mb-2"
                  >
                    mdi-lightning-bolt
                  </v-icon>
                  <h3 class="text-h6 mb-2">Active Draw</h3>
                  <p class="text-body-2 mb-0">
                    Actively draws energy to power moves and abilities (PP System implementation)
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-alert
            type="success"
            variant="tonal"
            :color="theme.current.value.dark ? 'green-lighten-1' : 'green-darken-1'"
          >
            Through training, trainers can strengthen themselves and their Pokémon, increasing the
            amount of energy they can produce to sustain more Pokémon and use stronger moves or
            forms.
          </v-alert>
        </v-card-text>
      </v-card>

      <!-- Start of RP Section -->
      <v-card class="mb-8" elevation="4" rounded="lg">
        <v-card-title class="d-flex align-center pa-6">
          <v-icon
            :color="theme.current.value.dark ? 'green-accent-2' : 'green-darken-2'"
            size="32"
            class="me-3"
          >
            mdi-play-circle
          </v-icon>
          <span class="text-h4 font-weight-bold">The Start of the RP</span>
        </v-card-title>

        <v-divider
          :color="theme.current.value.dark ? 'grey-darken-1' : 'grey-lighten-2'"
        ></v-divider>

        <v-card-text class="pa-6">
          <div class="text-body-1 line-height-lg mb-6">
            <p class="mb-4">
              Poke-Sync will begin with your OC receiving their
              <v-chip color="primary" variant="flat" size="small" class="mx-1">Trainer Card</v-chip
              >, which certifies them as a Pokémon Trainer registered with the United League. Now
              that they've been registered, their trainer ID can be used to log into the United
              Pokémon League's App—available on any Rotom Phone, Pokétch, Pokégear, C-Gear, or
              X-transceiver.
            </p>

            <v-alert
              type="info"
              variant="tonal"
              class="mb-4"
              :color="theme.current.value.dark ? 'blue-lighten-1' : 'blue-darken-1'"
            >
              <strong>United League App:</strong> Important information will occasionally be
              announced through this app: Pokémon Hordes or Swarms, Suspected Locations for Hidden
              Grottos, etc.
            </v-alert>

            <p class="mb-4">
              But before you can set out on your journey, you'll need to obtain a Pokémon. With
              Pokémon more aggressive than ever before it's dangerous for an un-aided human to
              wander into their territory.
            </p>
          </div>

          <!-- Getting Started Options -->
          <v-row>
            <v-col cols="12" md="6">
              <v-card
                variant="outlined"
                class="h-100"
                :color="theme.current.value.dark ? 'green-darken-3' : 'green-lighten-4'"
              >
                <v-card-text class="text-center">
                  <v-icon
                    size="48"
                    :color="theme.current.value.dark ? 'green-accent-2' : 'green-darken-2'"
                    class="mb-2"
                  >
                    mdi-account-group
                  </v-icon>
                  <h3 class="text-h6 mb-2">Family & Friends</h3>
                  <p class="text-body-2 mb-0">
                    Some of you will have family or friends who can help you catch or obtain a
                    Pokémon
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card
                variant="outlined"
                class="h-100"
                :color="theme.current.value.dark ? 'orange-darken-3' : 'orange-lighten-4'"
              >
                <v-card-text class="text-center">
                  <v-icon
                    size="48"
                    :color="theme.current.value.dark ? 'orange-accent-2' : 'orange-darken-2'"
                    class="mb-2"
                  >
                    mdi-heart-plus
                  </v-icon>
                  <h3 class="text-h6 mb-2">Pokémon Project</h3>
                  <p class="text-body-2 mb-0">
                    The United League's App allows registered trainers to adopt their first Pokémon
                    - delivered to your local Pokémart!
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- United Pokemon League Section -->
      <v-card class="mb-8" elevation="4" rounded="lg">
        <v-card-title class="d-flex align-center pa-6">
          <v-icon
            :color="theme.current.value.dark ? 'yellow-accent-2' : 'amber-darken-2'"
            size="32"
            class="me-3"
          >
            mdi-trophy-variant
          </v-icon>
          <span class="text-h4 font-weight-bold">The United Pokémon League</span>
        </v-card-title>

        <v-divider
          :color="theme.current.value.dark ? 'grey-darken-1' : 'grey-lighten-2'"
        ></v-divider>

        <v-card-text class="pa-6">
          <div class="text-body-1 line-height-lg mb-6">
            <p class="mb-4">
              After joining forces, the Pokémon Leagues across regions have permanently united under
              one banner. The United Pokémon League ensures that those who become trainers are ready
              to face new challenges that could emerge from extra-terrestrial threats such as
              Ultra-Space or Eternatus.
            </p>

            <v-alert
              type="info"
              variant="tonal"
              class="mb-6"
              :color="theme.current.value.dark ? 'blue-lighten-1' : 'blue-darken-1'"
            >
              Trainers may progress up to the Platinum Rank by completing the appropriately tiered
              league. (e.g. Bronze tiers can advance to Silver by completing the Bronze League)
            </v-alert>
          </div>

          <!-- Trainer Ranks -->
          <h2 class="text-h5 font-weight-bold mb-4">Trainer Rankings</h2>
          <v-row class="mb-6">
            <v-col v-for="rank in trainerRanks" :key="rank.tier" cols="12" sm="6" md="3">
              <v-card
                variant="outlined"
                class="h-100 text-center"
                :color="
                  theme.current.value.dark ? `${rank.color}-darken-3` : `${rank.color}-lighten-4`
                "
              >
                <v-card-text class="pa-4">
                  <v-chip :color="rank.color" variant="flat" size="small" class="mb-2">
                    {{ rank.tier }}
                  </v-chip>
                  <h3 class="text-h6 font-weight-bold mb-2">{{ rank.rank }}</h3>
                  <p
                    v-if="rank.power"
                    class="text-body-2 mb-0"
                    :class="
                      theme.current.value.dark ? 'text-yellow-accent-2' : 'text-purple-darken-2'
                    "
                  >
                    <strong>Unlocks:</strong> {{ rank.power }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Power Progression Alert -->
          <v-alert
            type="warning"
            variant="tonal"
            class="mb-6"
            :color="theme.current.value.dark ? 'purple-lighten-1' : 'purple-darken-1'"
          >
            <strong>Power Progression:</strong> At each tier after Bronze and up until Platinum,
            trainers gain access to new forms of power: Silver (Synchro Burst), Gold (Z-Moves),
            Platinum (Mega-Evolution)
          </v-alert>

          <!-- Elite Tier Information -->
          <v-card
            variant="outlined"
            :color="theme.current.value.dark ? 'deep-purple-darken-3' : 'deep-purple-lighten-4'"
          >
            <v-card-text class="pa-4">
              <h3 class="text-h6 font-weight-bold mb-3">Elite Tier Requirements</h3>
              <v-list density="compact" class="pa-0">
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="purple">mdi-star</v-icon>
                  </template>
                  <v-list-item-title
                    ><strong>Gym Leader:</strong> Master-tier minimum</v-list-item-title
                  >
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="deep-purple">mdi-star-four-points</v-icon>
                  </template>
                  <v-list-item-title
                    ><strong>Elite Four:</strong> High Master minimum</v-list-item-title
                  >
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="indigo">mdi-crown</v-icon>
                  </template>
                  <v-list-item-title
                    ><strong>Champions:</strong> Grand Master level</v-list-item-title
                  >
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="orange">mdi-fire</v-icon>
                  </template>
                  <v-list-item-title
                    ><strong>Living Legends:</strong> Trainers as powerful as Red or
                    Ethan/Gold</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>

      <!-- Key Features Summary -->
      <v-card class="mb-8" elevation="4" rounded="lg">
        <v-card-title class="d-flex align-center pa-6">
          <v-icon
            :color="theme.current.value.dark ? 'cyan-accent-2' : 'cyan-darken-2'"
            size="32"
            class="me-3"
          >
            mdi-key-variant
          </v-icon>
          <span class="text-h4 font-weight-bold">Key Features</span>
        </v-card-title>

        <v-divider
          :color="theme.current.value.dark ? 'grey-darken-1' : 'grey-lighten-2'"
        ></v-divider>

        <v-card-text class="pa-6">
          <v-row>
            <v-col v-for="feature in keyFeatures" :key="feature.title" cols="12" md="6">
              <v-card variant="outlined" class="h-100">
                <v-card-text class="d-flex align-start pa-4">
                  <v-icon
                    :color="
                      theme.current.value.dark
                        ? `${feature.color}-accent-2`
                        : `${feature.color}-darken-2`
                    "
                    size="32"
                    class="me-3 mt-1"
                  >
                    {{ feature.icon }}
                  </v-icon>
                  <div>
                    <h3 class="text-h6 font-weight-bold mb-2">{{ feature.title }}</h3>
                    <p class="text-body-2 mb-0">{{ feature.description }}</p>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </v-container>
</template>

<style scoped>
.line-height-lg {
  line-height: 1.8;
}

.bg-gradient-to-r {
  background: linear-gradient(
    to right,
    var(--v-theme-surface-variant),
    var(--v-theme-primary-darken-1)
  );
}

/* Dark mode gradient override */
.theme--dark .bg-gradient-to-r.from-purple-900.to-blue-900 {
  background: linear-gradient(to right, #4a148c, #1a237e);
}

/* Light mode gradient override */
.theme--light .bg-gradient-to-r.from-blue-100.to-purple-100 {
  background: linear-gradient(to right, #e3f2fd, #f3e5f5);
}
</style>
