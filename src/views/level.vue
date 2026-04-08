<script setup lang="ts">
import { ref } from 'vue'

// Reactive data for level calculator
const pokemonLevel = ref<number>(50)

// Trainer categories with their level ranges
const trainerCategories = ref([
  {
    name: 'Champions',
    levelRange: '75 - 88',
    color: 'deep-purple-lighten-2',
    image:
      'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2020/02/featured-12.jpg',
    icon: 'mdi-crown',
    description: 'Peak trainers with re-match teams representing the absolute pinnacle of strength',
    examples: [
      {
        name: 'Cynthia',
        highest: {
          sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0445.png',
          level: '88',
        },
        lowest: {
          sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0442.png',
          level: '84',
        },
      },
      {
        name: 'Red',
        highest: {
          sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0025_01.png',
          level: '88',
        },
        lowest: {
          sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0131.png',
          level: '80',
        },
      },
      {
        name: 'Geeta',
        highest: {
          sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0970.png',
          level: '85',
        },
        lowest: {
          sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0956.png',
          level: '84',
        },
      },
      {
        name: 'Iris',
        highest: {
          sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0612.png',
          level: '83',
        },
        lowest: {
          sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0567.png',
          level: '81',
        },
      },
      {
        name: 'Steven',
        highest: {
          sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0376.png',
          level: '79',
        },
        lowest: {
          sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0227.png',
          level: '77',
        },
      },
    ],
  },
  {
    name: 'Elite Four',
    levelRange: '65 - 80',
    color: 'indigo-lighten-2',
    icon: 'mdi-star-four-points',
    description: 'Regional guardians representing the highest echelon of competitive trainers',
    examples: [],
  },
  {
    name: 'Gym Leaders',
    levelRange: '60 - 75',
    color: 'blue-lighten-2',
    icon: 'mdi-medal',
    description: 'Personal teams of seasoned leaders (not their scaled challenger teams)',
    examples: [],
  },
  {
    name: 'Veteran Trainers',
    levelRange: '45 - 60',
    color: 'green-lighten-2',
    icon: 'mdi-account-star',
    description: 'Experienced trainers with well-developed teams and solid battle records',
    examples: [],
  },
  {
    name: 'Skilled Trainers',
    levelRange: '25 - 45',
    color: 'light-green-lighten-2',
    icon: 'mdi-account-plus',
    description: 'Competent trainers with solid fundamentals and growing experience',
    examples: [],
  },
  {
    name: 'Junior Trainers',
    levelRange: '1 - 25',
    color: 'amber-lighten-2',
    icon: 'mdi-account-school',
    description: 'New trainers with some experience but still learning fundamentals',
    examples: [],
  },
])
</script>

<template>
  <v-app>
    <!-- Hero Section -->
    <v-container fluid class="hero-section pa-8">
      <v-row justify="center" align="center" class="text-center">
        <v-col cols="12" md="8">
          <h1 class="display-2 font-weight-bold mb-4">
            <v-icon size="48" class="mr-3">mdi-trending-up</v-icon>
            Pokemon Levels in Role play
          </h1>
          <p class="text-h6 mb-6">
            Understanding strength, skill, and the hierarchy of trainers through Pokemon levels
          </p>
          <div class="level-indicator mx-auto" style="max-width: 400px">
            <div class="level-fill" :style="{ width: (pokemonLevel / 100) * 100 + '%' }"></div>
            <div class="level-text">Level {{ pokemonLevel }}</div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Main Content -->
    <v-container class="my-8">
      <!-- Overview Section -->
      <v-row class="mb-8">
        <v-col cols="12">
          <v-card elevation="3" class="pa-6">
            <h2 class="text-h4 mb-4 text-center">Understanding Pokemon Levels</h2>
            <v-row>
              <v-col cols="12" md="8">
                <p class="text-body-1 mb-4">
                  Determining Pokemon strength in role play can be challenging, but the in-game
                  level system provides an excellent foundation.
                  <strong>Levels represent raw strength</strong> and nothing more—they might imply
                  experience, but that isn't always the case.
                </p>
                <p class="text-body-1 mb-4">
                  Consider this: you could have a level 100 Pokemon who's never battled because it
                  was fed rare candies. Levels are pure power measurement, not necessarily wisdom or
                  battle experience.
                </p>
                <p class="text-body-1">
                  By examining where Champions, Elite Four, and Gym Leaders' Pokemon fall on this
                  scale, we can establish realistic expectations for trainer strength in our role
                  play setting.
                </p>

                <v-alert
                  type="error"
                  variant="tonal"
                  class="mb-8"
                  elevation="2"
                  border="start"
                  border-color="error"
                  >Levels are NOT enforced. They exist to provide a simple measure of a Pokemon's
                  strength that's understandable OOC and as a means to track your own progression in
                  terms of when moves are learned, etc.
                </v-alert>
              </v-col>
              <v-col cols="12" md="4">
                <v-card color="blue-grey-lighten-5" class="pa-4">
                  <v-icon size="32" color="primary" class="mb-2">mdi-chart-line</v-icon>
                  <h3 class="text-h6 mb-2">Key Concepts</h3>
                  <v-chip class="ma-1" color="primary" variant="outlined">Raw Strength</v-chip>
                  <v-chip class="ma-1" color="secondary" variant="outlined">Not Experience</v-chip>
                  <v-chip class="ma-1" color="success" variant="outlined">Plateau Effect</v-chip>
                  <v-chip class="ma-1" color="warning" variant="outlined"
                    >Point of Reference</v-chip
                  >
                  <v-chip class="ma-1" color="warning" variant="outlined">Optional</v-chip>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <!-- Trainer Categories Section -->
      <v-row class="mb-8">
        <v-col cols="12">
          <h2 class="text-h4 mb-6 text-center">Trainer Hierarchy & Level Ranges</h2>
          <v-card elevation="3" class="pa-4">
            <div class="trainer-hierarchy">
              <div
                v-for="(category, index) in trainerCategories"
                :key="category.name"
                class="trainer-tier"
                :class="{ 'tier-divider': index === 2 }"
              >
                <v-card
                  :color="category.color"
                  class="tier-card pa-6"
                  elevation="2"
                  :class="{ 'elite-tier': index <= 2 }"
                >
                  <v-row align="center">
                    <v-col cols="12" sm="2" class="text-center">
                      <v-icon
                        :icon="category.icon"
                        size="48"
                        :class="{ 'elite-icon': index <= 2 }"
                      ></v-icon>
                    </v-col>
                    <v-col cols="12" sm="3">
                      <h3 class="text-h5 font-weight-bold">{{ category.name }}</h3>
                      <p class="text-h6 mt-1">Level {{ category.levelRange }}</p>
                    </v-col>
                    <v-col cols="12" sm="5">
                      <p class="text-body-1">{{ category.description }}</p>
                    </v-col>
                    <v-col cols="12" sm="2" class="text-center">
                      <v-chip
                        :color="category.color.replace('-lighten-2', '')"
                        variant="elevated"
                        class="font-weight-bold"
                      >
                        {{ category.levelRange.split(' - ')[1] || category.levelRange }} Max
                      </v-chip>
                    </v-col>
                  </v-row>

                  <!-- Examples for Champions -->
                  <div v-if="category.examples.length > 0" class="mt-4">
                    <v-divider class="my-3"></v-divider>
                    <h4 class="text-h6 mb-3">Notable Champions:</h4>
                    <v-row>
                      <v-col
                        v-for="example in category.examples"
                        :key="example.name"
                        cols="12"
                        sm="6"
                        lg="4"
                        class="py-2"
                      >
                        <v-card class="champion-card pa-3" elevation="2" variant="outlined">
                          <div class="text-center mb-2">
                            <h5 class="text-h6 font-weight-bold">{{ example.name }}</h5>
                          </div>

                          <v-row class="champion-pokemon">
                            <v-col cols="6" class="text-center">
                              <div class="pokemon-info">
                                <v-img
                                  :src="example.highest.sprite"
                                  :alt="example.name + ' highest level Pokemon'"
                                  width="64"
                                  height="64"
                                  class="mx-auto mb-1"
                                ></v-img>
                                <v-chip color="red" size="small" class="font-weight-bold">
                                  Lv {{ example.highest.level }}
                                </v-chip>
                                <p class="text-caption mt-1">Highest</p>
                              </div>
                            </v-col>
                            <v-col cols="6" class="text-center">
                              <div class="pokemon-info">
                                <v-img
                                  :src="example.lowest.sprite"
                                  :alt="example.name + ' lowest level Pokemon'"
                                  width="64"
                                  height="64"
                                  class="mx-auto mb-1"
                                ></v-img>
                                <v-chip color="green" size="small" class="font-weight-bold">
                                  Lv {{ example.lowest.level }}
                                </v-chip>
                                <p class="text-caption mt-1">Lowest</p>
                              </div>
                            </v-col>
                          </v-row>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>
                </v-card>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Warning Section -->
      <v-row class="mb-8">
        <v-col cols="12">
          <v-alert type="warning" variant="outlined" class="pa-6">
            <h3 class="text-h6 mb-3">Role Play Responsibility</h3>
            <p class="text-body-1 mb-2">
              When estimating your OC's Pokemon levels, remember that
              <strong
                >levels 60-70+ suggest your character should be able to go toe-to-toe with sitting
                Elite Four members or Gym Leaders</strong
              >.
            </p>
            <p class="text-body-1">
              Consider whether your character's background, experience, and story justify such
              exceptional strength. High-level Pokemon should be rare and come with compelling
              narratives explaining their power.
            </p>
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #3f51b5 0%, #2196f3 100%);
  color: white;
}

.level-indicator {
  background: linear-gradient(90deg, #4caf50 0%, #ffeb3b 50%, #f44336 100%);
  border-radius: 10px;
  height: 25px;
  position: relative;
  overflow: hidden;
}

.level-fill {
  background: rgba(255, 255, 255, 0.3);
  height: 100%;
  border-radius: 10px;
  transition: width 0.3s ease;
}

.level-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 0.9rem;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}

.trainer-hierarchy {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.trainer-tier {
  position: relative;
}

.tier-card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  border-left: 4px solid transparent;
}

.tier-card:hover {
  transform: translateX(8px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.elite-tier {
  border-left-color: #ffd700 !important;
}

.elite-tier .tier-card {
  position: relative;
}

.elite-tier .tier-card::before {
  content: '';
  position: absolute;
  left: -4px;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, #ffd700, #ffb300);
}

.elite-icon {
  filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.5));
}

.tier-divider {
  margin-bottom: 24px;
  position: relative;
}

.tier-divider::after {
  content: 'Elite Trainers Above | Regular Trainers Below';
  position: absolute;
  bottom: -18px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #3f51b5, #2196f3);
  color: white;
  padding: 4px 16px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.champion-card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  border: 2px solid transparent;
}

.champion-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #673ab7;
}

.champion-pokemon {
  margin: 0;
}

.pokemon-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pokemon-info .v-img {
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.8);
  padding: 4px;
}

.v-slider {
  margin: 20px 0;
}

.v-alert {
  border-radius: 8px;
}
</style>
