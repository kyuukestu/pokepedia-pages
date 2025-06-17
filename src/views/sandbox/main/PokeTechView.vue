<template>
  <v-app>
    <v-main>
      <!-- Hero Section with Parallax -->
      <v-parallax
        src="https://images.unsplash.com/photo-1619478495460-4a9853e0d8ac?auto=format&fit=crop&w=1920&q=80"
        height="600"
        class="hero-parallax"
      >
        <v-container class="fill-height">
          <v-row justify="center" align="center" class="text-center">
            <v-col cols="12" md="8">
              <h1
                class="display-2 font-weight-bold text-white mb-4 animate__animated animate__fadeInDown"
              >
                Pokémon World Technologies
              </h1>
              <p class="headline text-white mb-6 animate__animated animate__fadeInUp">
                Uncover the cutting-edge devices that empower trainers to connect, navigate, store,
                and carry essentials in the Pokémon universe.
              </p>
              <v-btn
                color="accent"
                size="large"
                variant="elevated"
                @click="scrollToTechnologies"
                class="text-capitalize animate__animated animate__pulse animate__infinite"
              >
                Discover Now
                <v-icon end>mdi-pokeball</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-parallax>

      <!-- Introduction Section -->
      <v-container class="py-12">
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8">
            <v-card elevation="10" class="intro-card pa-8 animate__animated animate__fadeIn">
              <v-avatar size="64" color="primary" class="mb-4">
                <v-icon size="40">mdi-cellphone-cog</v-icon>
              </v-avatar>
              <h2 class="text-h4 font-weight-bold text-primary mb-4 text-center">
                Technological Marvels
              </h2>
              <p class="text-body-1 text-center text-medium-emphasis mb-6">
                Pokémon technologies revolutionize trainer life, from communication and storage to
                inventory management. Enhanced by Pokémon like Rotom and Porygon, these devices
                shape the modern trainer journey.
              </p>
              <v-row justify="center" class="mt-4">
                <v-col cols="12" sm="4" class="text-center">
                  <v-tooltip location="top">
                    <template #activator="{ props }">
                      <v-icon v-bind="props" size="32" color="success" class="mb-2"
                        >mdi-wifi</v-icon
                      >
                    </template>
                    <span>Stay connected anywhere</span>
                  </v-tooltip>
                  <h4 class="text-h6">Connectivity</h4>
                  <p class="text-caption">Global communication networks</p>
                </v-col>
                <v-col cols="12" sm="4" class="text-center">
                  <v-tooltip location="top">
                    <template #activator="{ props }">
                      <v-icon v-bind="props" size="32" color="info" class="mb-2"
                        >mdi-map-marker-path</v-icon
                      >
                    </template>
                    <span>Navigate with precision</span>
                  </v-tooltip>
                  <h4 class="text-h6">Navigation</h4>
                  <p class="text-caption">Advanced mapping systems</p>
                </v-col>
                <v-col cols="12" sm="4" class="text-center">
                  <v-tooltip location="top">
                    <template #activator="{ props }">
                      <v-icon v-bind="props" size="32" color="warning" class="mb-2"
                        >mdi-pokemon-go</v-icon
                      >
                    </template>
                    <span>Enhance Pokémon bonds</span>
                  </v-tooltip>
                  <h4 class="text-h6">Pokémon Interaction</h4>
                  <p class="text-caption">Strengthen trainer-Pokémon ties</p>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- Technologies Section with Expansion Panels -->
      <v-container id="technologies-section" class="py-12">
        <div class="text-center mb-12">
          <h2 class="text-h3 font-weight-bold text-primary mb-4 animate__animated animate__fadeIn">
            Key Technologies
          </h2>
          <p class="text-h6 text-medium-emphasis">Interactive devices shaping the Pokémon world</p>
        </div>
        <v-expansion-panels v-model="activeTechPanel" variant="accordion">
          <v-expansion-panel v-for="tech in technologies" :key="tech.name" class="tech-panel">
            <v-expansion-panel-title
              class="panel-title"
              :style="`background: linear-gradient(135deg, ${tech.gradient.start} 0%, ${tech.gradient.end} 100%)`"
            >
              <v-icon size="32" class="mr-3">{{ tech.icon }}</v-icon>
              <span class="text-h6 font-weight-bold">{{ tech.name }}</span>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-row>
                <v-col cols="12" md="4">
                  <v-img :src="tech.image" height="200" cover class="rounded-lg" />
                </v-col>
                <v-col cols="12" md="8">
                  <v-chip :color="tech.chipColor" variant="elevated" class="mb-4">{{
                    tech.chipLabel
                  }}</v-chip>
                  <p class="text-body-1 mb-4">{{ tech.description }}</p>
                  <v-list density="compact" class="bg-transparent">
                    <v-list-item v-for="(feature, index) in tech.features" :key="index">
                      <template #prepend>
                        <v-icon color="success">mdi-check-circle</v-icon>
                      </template>
                      <v-list-item-title>{{ feature }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                  <v-card-actions>
                    <v-chip :color="tech.chipColor" variant="outlined" size="small">{{
                      tech.region
                    }}</v-chip>
                    <v-spacer></v-spacer>
                    <v-rating
                      v-model="tech.rating"
                      readonly
                      color="amber"
                      size="small"
                      density="compact"
                    ></v-rating>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>

      <!-- Pokémon Storage System Section -->
      <v-container id="storage-section" class="py-12">
        <div class="text-center mb-12">
          <h2 class="text-h3 font-weight-bold text-primary mb-4 animate__animated animate__fadeIn">
            Pokémon Storage System
          </h2>
          <p class="text-h6 text-medium-emphasis">Global access to your Pokémon collection</p>
        </div>
        <v-expansion-panels v-model="activeStoragePanel" variant="accordion">
          <v-expansion-panel
            v-for="storage in storageSystems"
            :key="storage.name"
            class="tech-panel"
          >
            <v-expansion-panel-title
              class="panel-title"
              :style="`background: linear-gradient(135deg, ${storage.gradient.start} 0%, ${storage.gradient.end} 100%)`"
            >
              <v-icon size="32" class="mr-3">{{ storage.icon }}</v-icon>
              <span class="text-h6 font-weight-bold">{{ storage.name }}</span>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-row>
                <v-col cols="12" md="4">
                  <v-img :src="storage.image" height="200" cover class="rounded-lg" />
                </v-col>
                <v-col cols="12" md="8">
                  <v-chip :color="storage.chipColor" variant="elevated" class="mb-4">{{
                    storage.chipLabel
                  }}</v-chip>
                  <p class="text-body-1 mb-4">{{ storage.description }}</p>
                  <v-list density="compact" class="bg-transparent">
                    <v-list-item v-for="(feature, index) in storage.features" :key="index">
                      <template #prepend>
                        <v-icon color="success">mdi-check-circle</v-icon>
                      </template>
                      <v-list-item-title>{{ feature }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                  <v-card-actions>
                    <v-chip :color="storage.chipColor" variant="outlined" size="small">{{
                      storage.region
                    }}</v-chip>
                    <v-spacer></v-spacer>
                    <v-rating
                      v-model="storage.rating"
                      readonly
                      color="amber"
                      size="small"
                      density="compact"
                    ></v-rating>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>

      <!-- Trainer Bags Section -->
      <v-container id="bags-section" class="py-12">
        <div class="text-center mb-12">
          <h2 class="text-h3 font-weight-bold text-primary mb-4 animate__animated animate__fadeIn">
            Trainer Bags
          </h2>
          <p class="text-h6 text-medium-emphasis">Advanced storage for limitless inventory</p>
        </div>
        <v-expansion-panels v-model="activeBagPanel" variant="accordion">
          <v-expansion-panel v-for="bag in bags" :key="bag.name" class="tech-panel">
            <v-expansion-panel-title
              class="panel-title"
              :style="`background: linear-gradient(135deg, ${bag.gradient.start} 0%, ${bag.gradient.end} 100%)`"
            >
              <v-icon size="32" class="mr-3">{{ bag.icon }}</v-icon>
              <span class="text-h6 font-weight-bold">{{ bag.name }}</span>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-row>
                <v-col cols="12" md="4">
                  <v-img :src="bag.image" height="200" cover class="rounded-lg" />
                </v-col>
                <v-col cols="12" md="8">
                  <v-chip :color="bag.chipColor" variant="elevated" class="mb-4">{{
                    bag.chipLabel
                  }}</v-chip>
                  <p class="text-body-1 mb-4">{{ bag.description }}</p>
                  <v-list density="compact" class="bg-transparent">
                    <v-list-item v-for="(feature, index) in bag.features" :key="index">
                      <template #prepend>
                        <v-icon color="success">mdi-check-circle</v-icon>
                      </template>
                      <v-list-item-title>{{ feature }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                  <v-card-actions>
                    <v-chip :color="bag.chipColor" variant="outlined" size="small">{{
                      bag.region
                    }}</v-chip>
                    <v-spacer></v-spacer>
                    <v-rating
                      v-model="bag.rating"
                      readonly
                      color="amber"
                      size="small"
                      density="compact"
                    ></v-rating>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>

      <!-- Pokémon Interactions Section with Timeline -->
      <v-container class="py-12">
        <div class="text-center mb-12">
          <h2 class="text-h3 font-weight-bold text-primary mb-4 animate__animated animate__fadeIn">
            Pokémon Interactions
          </h2>
          <p class="text-h6 text-medium-emphasis">How Rotom and Porygon enhance technology</p>
        </div>
        <v-timeline side="end" align="start" density="compact">
          <v-timeline-item
            v-for="(item, index) in pokemonInteractions"
            :key="index"
            :dot-color="item.color"
            :icon="item.icon"
            fill-dot
          >
            <v-card class="timeline-card" elevation="8">
              <v-card-title
                class="text-h6"
                :style="`background: linear-gradient(135deg, ${item.gradient.start} 0%, ${item.gradient.end} 100%)`"
              >
                {{ item.name }}
              </v-card-title>
              <v-card-text class="pa-4">
                <v-chip :color="item.chipColor" variant="elevated" class="mb-4">{{
                  item.chipLabel
                }}</v-chip>
                <p class="text-body-1 mb-4">{{ item.description }}</p>
                <v-list density="compact" class="bg-transparent">
                  <v-list-item v-for="(feature, i) in item.features" :key="i">
                    <template #prepend>
                      <v-icon color="success">mdi-check-circle</v-icon>
                    </template>
                    <v-list-item-title>{{ feature }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Technology {
  name: string
  description: string
  chipLabel: string
  chipColor: string
  region: string
  features: string[]
  gradient: { start: string; end: string }
  icon: string
  rating: number
  image: string
}

interface StorageSystem {
  name: string
  description: string
  chipLabel: string
  chipColor: string
  region: string
  features: string[]
  gradient: { start: string; end: string }
  icon: string
  rating: number
  image: string
}

interface Bag {
  name: string
  description: string
  chipLabel: string
  chipColor: string
  region: string
  features: string[]
  gradient: { start: string; end: string }
  icon: string
  rating: number
  image: string
}

interface PokemonInteraction {
  name: string
  description: string
  chipLabel: string
  chipColor: string
  features: string[]
  gradient: { start: string; end: string }
  icon: string
  color: string
}

const activeTechPanel = ref<number | null>(null)
const activeStoragePanel = ref<number | null>(null)
const activeBagPanel = ref<number | null>(null)

const technologies = ref<Technology[]>([
  {
    name: 'Phone',
    description:
      'A versatile smartphone for communication, Pokédex access, and Pokémon tracking apps.',
    chipLabel: 'Communication Hub',
    chipColor: 'blue',
    region: 'All Regions',
    features: ['Pokédex Integration', 'Trainer Apps', 'Global Connectivity'],
    gradient: { start: '#667eea', end: '#764ba2' },
    icon: 'mdi-cellphone',
    rating: 4.5,
    image: 'https://via.placeholder.com/300x200?text=Phone',
  },
  {
    name: 'PokeGear',
    description: 'A multi-functional device with radio, map, and phone features for trainers.',
    chipLabel: 'Trainer Essential',
    chipColor: 'red',
    region: 'Johto',
    features: ['Radio Streaming', 'Map Navigation', 'Phone Calls'],
    gradient: { start: '#f5576c', end: '#f093fb' },
    icon: 'mdi-radio',
    rating: 4,
    image: 'https://via.placeholder.com/300x200?text=PokeGear',
  },
  {
    name: 'PokeNav',
    description: 'Advanced navigation tool with mapping and Pokémon condition tracking.',
    chipLabel: 'Navigation Expert',
    chipColor: 'green',
    region: 'Hoenn',
    features: ['Route Planning', 'Condition Tracking', 'Match Call'],
    gradient: { start: '#a8edea', end: '#fed6e3' },
    icon: 'mdi-map',
    rating: 4,
    image: 'https://via.placeholder.com/300x200?text=PokeNav',
  },
  {
    name: 'Poketch',
    description: 'Smartwatch-like device with apps for timekeeping and Pokémon monitoring.',
    chipLabel: 'Wearable Tech',
    chipColor: 'pink',
    region: 'Sinnoh',
    features: ['Health Monitoring', 'App Suite', 'Touchscreen Interface'],
    gradient: { start: '#f093fb', end: '#f5576c' },
    icon: 'mdi-watch',
    rating: 4.5,
    image: 'https://via.placeholder.com/300x200?text=Poketch',
  },
  {
    name: 'X-transceivers',
    description: 'High-tech communicators for video calls and instant messaging.',
    chipLabel: 'Video Comm',
    chipColor: 'cyan',
    region: 'Unova',
    features: ['Video Calls', 'Instant Messaging', 'Long-range Signal'],
    gradient: { start: '#4facfe', end: '#00f2fe' },
    icon: 'mdi-video',
    rating: 3.5,
    image: 'https://via.placeholder.com/300x200?text=X-transceivers',
  },
  {
    name: 'HoloGear',
    description: 'Holographic technology for immersive Pokémon battles and simulations.',
    chipLabel: 'Holographic Tech',
    chipColor: 'purple',
    region: 'Kalos',
    features: ['Holographic Displays', 'Battle Simulations', 'Trainer Analytics'],
    gradient: { start: '#fa709a', end: '#fee140' },
    icon: 'mdi-hologram',
    rating: 5,
    image: 'https://via.placeholder.com/300x200?text=HoloGear',
  },
])

const storageSystems = ref<StorageSystem[]>([
  {
    name: 'Pokémon Storage System',
    description:
      'A cloud-based system allowing trainers to store and access their Pokémon from any PC terminal worldwide.',
    chipLabel: 'Global Storage',
    chipColor: 'teal',
    region: 'All Regions',
    features: ['Cloud-Based Storage', 'Global Access', 'Pokémon Organization'],
    gradient: { start: '#26a69a', end: '#80cbc4' },
    icon: 'mdi-cloud',
    rating: 4.8,
    image: 'https://via.placeholder.com/300x200?text=Storage+System',
  },
  {
    name: 'Mini-PC Box',
    description:
      'A portable device that connects to the Pokémon Storage System, enabling trainers to manage their Pokémon on the go.',
    chipLabel: 'Portable Access',
    chipColor: 'indigo',
    region: 'All Regions',
    features: ['Mobile Connectivity', 'Compact Design', 'Secure Access'],
    gradient: { start: '#3f51b5', end: '#5c6bc0' },
    icon: 'mdi-laptop',
    rating: 4.2,
    image: 'https://via.placeholder.com/300x200?text=Mini-PC+Box',
  },
])

const bags = ref<Bag[]>([
  {
    name: 'Space-Folding Bag',
    description:
      'A trainer bag using spatial manipulation technology to store countless items in a compact form.',
    chipLabel: 'Infinite Storage',
    chipColor: 'deep-purple',
    region: 'All Regions',
    features: ['Spatial Compression', 'Lightweight Design', 'Quick Access'],
    gradient: { start: '#7b1fa2', end: '#ab47bc' },
    icon: 'mdi-backpack',
    rating: 4.7,
    image: 'https://via.placeholder.com/300x200?text=Space-Folding+Bag',
  },
  {
    name: 'Matter-to-Energy Bag',
    description:
      'A high-tech bag that converts items into energy for storage, allowing trainers to carry vast inventories effortlessly.',
    chipLabel: 'Energy Conversion',
    chipColor: 'amber',
    region: 'All Regions',
    features: ['Energy Storage', 'Instant Retrieval', 'Durable Material'],
    gradient: { start: '#ffb300', end: '#ffca28' },
    icon: 'mdi-package-variant',
    rating: 4.5,
    image: 'https://via.placeholder.com/300x200?text=Matter-to-Energy+Bag',
  },
])

const pokemonInteractions = ref<PokemonInteraction[]>([
  {
    name: 'Rotom',
    description:
      'The Plasma Pokémon, Rotom, possesses devices to enhance their functionality, creating unique trainer experiences.',
    chipLabel: 'Plasma Pokémon',
    chipColor: 'orange',
    features: [
      'Rotom Phone: Real-time Pokédex and navigation',
      'Rotom Poketch: Voice commands and holograms',
      'Rotom HoloGear: Immersive battle projections',
    ],
    gradient: { start: '#ff7e5f', end: '#feb47b' },
    icon: 'mdi-lightning-bolt',
    color: 'orange',
  },
  {
    name: 'Porygon',
    description:
      'The Virtual Pokémon, Porygon, optimizes device performance and analytics in digital environments.',
    chipLabel: 'Virtual Pokémon',
    chipColor: 'cyan',
    features: [
      'PokeNav: Optimized navigation algorithms',
      'X-transceivers: Enhanced signal strength',
      'PokeGear: Real-time battle analytics',
    ],
    gradient: { start: '#4facfe', end: '#00f2fe' },
    icon: 'mdi-cube',
    color: 'cyan',
  },
])

const scrollToTechnologies = () => {
  const element = document.getElementById('technologies-section')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.hero-parallax {
  position: relative;
}

.hero-parallax::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(211, 47, 47, 0.7), rgba(63, 81, 181, 0.7));
  z-index: 1;
}

.hero-parallax .v-container {
  position: relative;
  z-index: 2;
}

.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.intro-card {
  border-radius: 24px !important;
  box-shadow:
    20px 20px 60px #d9d9d9,
    -20px -20px 60px #ffffff;
}

.tech-panel {
  margin-bottom: 16px;
  border-radius: 12px !important;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.tech-panel:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2) !important;
}

.panel-title {
  color: white;
  border-radius: 12px 12px 0 0 !important;
}

.timeline-card {
  border-radius: 12px !important;
  transition: transform 0.3s ease;
}

.timeline-card:hover {
  transform: scale(1.02);
}

.v-chip {
  font-weight: 600;
  letter-spacing: 0.5px;
}

html {
  scroll-behavior: smooth;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

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
</style>
