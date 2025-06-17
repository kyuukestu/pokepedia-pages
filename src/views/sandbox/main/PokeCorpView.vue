<template>
  <v-app>
    <v-main>
      <!-- Hero Section -->
      <v-container fluid class="hero-section">
        <v-row justify="center" align="center" class="text-center py-12">
          <v-col cols="12" md="8">
            <h1 class="display-2 font-weight-bold text-white mb-4">
              Corporate Giants of the Pokemon World
            </h1>
            <p class="headline text-white mb-6">
              Discover the major corporations shaping technology, research, and innovation across
              regions
            </p>
            <v-btn
              color="accent"
              size="large"
              variant="elevated"
              @click="scrollToCompanies"
              class="text-capitalize"
            >
              Explore Companies
              <v-icon end>mdi-arrow-down</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

      <!-- Introduction Section -->
      <v-container class="py-12">
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8">
            <v-card elevation="8" class="pa-8 introduction-card">
              <div class="text-center mb-6">
                <v-icon size="48" color="primary" class="mb-4">mdi-domain</v-icon>
                <h2 class="text-h4 font-weight-bold text-primary mb-4">The Corporate Landscape</h2>
              </div>
              <p class="text-body-1 text-center text-medium-emphasis mb-4">
                In the world of Pokemon, massive corporations wield tremendous influence over
                technology development, Pokemon research, and regional economies. These companies
                range from innovative tech giants to controversial research organizations, each
                playing a crucial role in shaping the modern Pokemon world.
              </p>
              <v-divider class="my-6"></v-divider>
              <v-row>
                <v-col cols="12" sm="4" class="text-center">
                  <v-icon size="32" color="success" class="mb-2">mdi-rocket-launch</v-icon>
                  <h4 class="text-h6">Innovation Leaders</h4>
                  <p class="text-caption">Pushing technological boundaries</p>
                </v-col>
                <v-col cols="12" sm="4" class="text-center">
                  <v-icon size="32" color="info" class="mb-2">mdi-flask</v-icon>
                  <h4 class="text-h6">Research Pioneers</h4>
                  <p class="text-caption">Advancing Pokemon science</p>
                </v-col>
                <v-col cols="12" sm="4" class="text-center">
                  <v-icon size="32" color="warning" class="mb-2">mdi-earth</v-icon>
                  <h4 class="text-h6">Global Influence</h4>
                  <p class="text-caption">Shaping regional development</p>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- Companies Section -->
      <v-container id="companies-section" class="py-12">
        <div class="text-center mb-12">
          <h2 class="text-h3 font-weight-bold text-primary mb-4">Major Corporations</h2>
          <p class="text-h6 text-medium-emphasis">The powerhouses driving innovation and change</p>
        </div>

        <v-row>
          <!-- Silph Co. -->
          <v-col cols="12" md="6" lg="4" class="mb-6">
            <v-card
              elevation="12"
              class="company-card h-100"
              :class="{ 'card-hover': hoveredCard === 'silph' }"
              @mouseenter="hoveredCard = 'silph'"
              @mouseleave="hoveredCard = null"
            >
              <v-card-title
                class="text-h5 font-weight-bold text-center pa-6"
                style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white"
              >
                <v-icon size="40" class="me-3">mdi-pokeball</v-icon>
                Silph Co.
              </v-card-title>
              <v-card-text class="pa-6">
                <v-chip color="primary" variant="elevated" class="mb-4">Technology Pioneer</v-chip>
                <p class="text-body-1 mb-4">
                  The most recognizable name in Pokemon technology, Silph Co. revolutionized trainer
                  equipment with innovations like the Poke Ball and Silph Scope. Based in Saffron
                  City, they continue to lead in research and development.
                </p>
                <v-list density="compact" class="bg-transparent">
                  <v-list-item>
                    <template #prepend>
                      <v-icon color="success">mdi-check-circle</v-icon>
                    </template>
                    <v-list-item-title>Poke Ball Manufacturing</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <template #prepend>
                      <v-icon color="success">mdi-check-circle</v-icon>
                    </template>
                    <v-list-item-title>Cutting-edge Research Labs</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <template #prepend>
                      <v-icon color="success">mdi-check-circle</v-icon>
                    </template>
                    <v-list-item-title>Global Distribution Network</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-card-actions class="pa-6">
                <v-chip color="blue" variant="outlined" size="small">Kanto Region</v-chip>
                <v-spacer></v-spacer>
                <v-rating
                  v-model="companies.silph.rating"
                  readonly
                  color="amber"
                  size="small"
                  density="compact"
                ></v-rating>
              </v-card-actions>
            </v-card>
          </v-col>

          <!-- Devon Corporation -->
          <v-col cols="12" md="6" lg="4" class="mb-6">
            <v-card
              elevation="12"
              class="company-card h-100"
              :class="{ 'card-hover': hoveredCard === 'devon' }"
              @mouseenter="hoveredCard = 'devon'"
              @mouseleave="hoveredCard = null"
            >
              <v-card-title
                class="text-h5 font-weight-bold text-center pa-6"
                style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white"
              >
                <v-icon size="40" class="me-3">mdi-chip</v-icon>
                Devon Corporation
              </v-card-title>
              <v-card-text class="pa-6">
                <v-chip color="pink" variant="elevated" class="mb-4">Innovation Hub</v-chip>
                <p class="text-body-1 mb-4">
                  Hoenn's premier technology company, Devon Corporation excels in advanced
                  machinery, navigation systems, and Pokemon-related technology. Known for the
                  PokeNav and sophisticated manufacturing capabilities.
                </p>
                <v-list density="compact" class="bg-transparent">
                  <v-list-item>
                    <template #prepend>
                      <v-icon color="success">mdi-check-circle</v-icon>
                    </template>
                    <v-list-item-title>PokeNav Development</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <template #prepend>
                      <v-icon color="success">mdi-check-circle</v-icon>
                    </template>
                    <v-list-item-title>Advanced Manufacturing</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <template #prepend>
                      <v-icon color="success">mdi-check-circle</v-icon>
                    </template>
                    <v-list-item-title>Maritime Technology</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-card-actions class="pa-6">
                <v-chip color="pink" variant="outlined" size="small">Hoenn Region</v-chip>
                <v-spacer></v-spacer>
                <v-rating
                  v-model="companies.devon.rating"
                  readonly
                  color="amber"
                  size="small"
                  density="compact"
                ></v-rating>
              </v-card-actions>
            </v-card>
          </v-col>

          <!-- Altru Inc -->
          <v-col cols="12" md="6" lg="4" class="mb-6">
            <v-card
              elevation="12"
              class="company-card h-100"
              :class="{ 'card-hover': hoveredCard === 'altru' }"
              @mouseenter="hoveredCard = 'altru'"
              @mouseleave="hoveredCard = null"
            >
              <v-card-title
                class="text-h5 font-weight-bold text-center pa-6"
                style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white"
              >
                <v-icon size="40" class="me-3">mdi-leaf</v-icon>
                Altru Inc.
              </v-card-title>
              <v-card-text class="pa-6">
                <v-chip color="red" variant="elevated" class="mb-4">Controversial Past</v-chip>
                <p class="text-body-1 mb-4">
                  Originally presenting as an environmental conservation company in Almia, Altru
                  Inc. was later revealed to have darker motives. Now operates under strict
                  oversight focusing on legitimate conservation efforts.
                </p>
                <v-list density="compact" class="bg-transparent">
                  <v-list-item>
                    <template #prepend>
                      <v-icon color="warning">mdi-alert-circle</v-icon>
                    </template>
                    <v-list-item-title>Rehabilitation Program</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <template #prepend>
                      <v-icon color="success">mdi-check-circle</v-icon>
                    </template>
                    <v-list-item-title>Environmental Projects</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <template #prepend>
                      <v-icon color="info">mdi-information</v-icon>
                    </template>
                    <v-list-item-title>Government Oversight</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-card-actions class="pa-6">
                <v-chip color="cyan" variant="outlined" size="small">Almia Region</v-chip>
                <v-spacer></v-spacer>
                <v-rating
                  v-model="companies.altru.rating"
                  readonly
                  color="amber"
                  size="small"
                  density="compact"
                ></v-rating>
              </v-card-actions>
            </v-card>
          </v-col>

          <!-- Aether Foundation -->
          <v-col cols="12" md="6" lg="4" class="mb-6">
            <v-card
              elevation="12"
              class="company-card h-100"
              :class="{ 'card-hover': hoveredCard === 'aether' }"
              @mouseenter="hoveredCard = 'aether'"
              @mouseleave="hoveredCard = null"
            >
              <v-card-title
                class="text-h5 font-weight-bold text-center pa-6"
                style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); color: #333"
              >
                <v-icon size="40" class="me-3">mdi-shield-heart</v-icon>
                Aether Foundation
              </v-card-title>
              <v-card-text class="pa-6">
                <v-chip color="green" variant="elevated" class="mb-4">Conservation Focus</v-chip>
                <p class="text-body-1 mb-4">
                  Dedicated to Pokemon conservation and research in Alola. Operating from Aether
                  Paradise, they focus on protecting Pokemon and studying Ultra Beasts. Recently
                  reformed under new leadership after past controversies.
                </p>
                <v-list density="compact" class="bg-transparent">
                  <v-list-item>
                    <template #prepend>
                      <v-icon color="success">mdi-check-circle</v-icon>
                    </template>
                    <v-list-item-title>Pokemon Rehabilitation</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <template #prepend>
                      <v-icon color="success">mdi-check-circle</v-icon>
                    </template>
                    <v-list-item-title>Ultra Beast Research</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <template #prepend>
                      <v-icon color="success">mdi-check-circle</v-icon>
                    </template>
                    <v-list-item-title>Conservation Programs</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-card-actions class="pa-6">
                <v-chip color="teal" variant="outlined" size="small">Alola Region</v-chip>
                <v-spacer></v-spacer>
                <v-rating
                  v-model="companies.aether.rating"
                  readonly
                  color="amber"
                  size="small"
                  density="compact"
                ></v-rating>
              </v-card-actions>
            </v-card>
          </v-col>

          <!-- Macro Cosmos -->
          <v-col cols="12" md="6" lg="4" class="mb-6">
            <v-card
              elevation="12"
              class="company-card h-100"
              :class="{ 'card-hover': hoveredCard === 'macro' }"
              @mouseenter="hoveredCard = 'macro'"
              @mouseleave="hoveredCard = null"
            >
              <v-card-title
                class="text-h5 font-weight-bold text-center pa-6"
                style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white"
              >
                <v-icon size="40" class="me-3">mdi-lightning-bolt</v-icon>
                Macro Cosmos
              </v-card-title>
              <v-card-text class="pa-6">
                <v-chip color="purple" variant="elevated" class="mb-4">Energy Conglomerate</v-chip>
                <p class="text-body-1 mb-4">
                  Galar's largest corporation, controlling energy production and distribution across
                  the region. Known for sponsoring the Pokemon League and Dynamax research, though
                  past leadership faced scrutiny over extreme methods.
                </p>
                <v-list density="compact" class="bg-transparent">
                  <v-list-item>
                    <template #prepend>
                      <v-icon color="success">mdi-check-circle</v-icon>
                    </template>
                    <v-list-item-title>Energy Infrastructure</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <template #prepend>
                      <v-icon color="success">mdi-check-circle</v-icon>
                    </template>
                    <v-list-item-title>Dynamax Technology</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <template #prepend>
                      <v-icon color="success">mdi-check-circle</v-icon>
                    </template>
                    <v-list-item-title>League Sponsorship</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-card-actions class="pa-6">
                <v-chip color="purple" variant="outlined" size="small">Galar Region</v-chip>
                <v-spacer></v-spacer>
                <v-rating
                  v-model="companies.macro.rating"
                  readonly
                  color="amber"
                  size="small"
                  density="compact"
                ></v-rating>
              </v-card-actions>
            </v-card>
          </v-col>

          <!-- Lumiose Labs -->
          <v-col cols="12" md="6" lg="4" class="mb-6">
            <v-card
              elevation="12"
              class="company-card h-100"
              :class="{ 'card-hover': hoveredCard === 'lumiose' }"
              @mouseenter="hoveredCard = 'lumiose'"
              @mouseleave="hoveredCard = null"
            >
              <v-card-title
                class="text-h5 font-weight-bold text-center pa-6"
                style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white"
              >
                <v-icon size="40" class="me-3">mdi-atom</v-icon>
                Lumiose Labs
              </v-card-title>
              <v-card-text class="pa-6">
                <v-chip color="orange" variant="elevated" class="mb-4">Reformed Research</v-chip>
                <p class="text-body-1 mb-4">
                  Formerly Lysandre Labs under controversial leadership, now operating as Lumiose
                  Labs with a focus on beneficial Pokemon research and technology development.
                  Located in Kalos's tech hub, Lumiose City.
                </p>
                <v-list density="compact" class="bg-transparent">
                  <v-list-item>
                    <template #prepend>
                      <v-icon color="warning">mdi-refresh</v-icon>
                    </template>
                    <v-list-item-title>Complete Restructuring</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <template #prepend>
                      <v-icon color="success">mdi-check-circle</v-icon>
                    </template>
                    <v-list-item-title>Ethical Research Focus</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <template #prepend>
                      <v-icon color="success">mdi-check-circle</v-icon>
                    </template>
                    <v-list-item-title>Community Partnerships</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-card-actions class="pa-6">
                <v-chip color="orange" variant="outlined" size="small">Kalos Region</v-chip>
                <v-spacer></v-spacer>
                <v-rating
                  v-model="companies.lumiose.rating"
                  readonly
                  color="amber"
                  size="small"
                  density="compact"
                ></v-rating>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Company {
  rating: number
}

interface Companies {
  silph: Company
  devon: Company
  altru: Company
  aether: Company
  macro: Company
  lumiose: Company
}

const hoveredCard = ref<string | null>(null)

const companies = ref<Companies>({
  silph: { rating: 5 },
  devon: { rating: 4.5 },
  altru: { rating: 2.5 },
  aether: { rating: 4 },
  macro: { rating: 3.5 },
  lumiose: { rating: 3 },
})

const scrollToCompanies = (): void => {
  const element = document.getElementById('companies-section')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 60vh;
  display: flex;
  align-items: center;
}

.introduction-card {
  border-radius: 20px !important;
}

.company-card {
  border-radius: 16px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.company-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.card-hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
}

.card-hover::before {
  left: 100%;
}

.v-card-title {
  border-radius: 16px 16px 0 0 !important;
}

.v-rating {
  gap: 2px;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom chip styling */
.v-chip {
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* Animation for hero section */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-section * {
  animation: fadeInUp 0.8s ease-out;
}
</style>
