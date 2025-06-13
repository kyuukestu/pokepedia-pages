<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToSandbox = () => {
  router.push('/sandbox')
}

const goToSync = () => {
  router.push('/sync')
}

const roleplays = [
  {
    id: 1,
    title: 'Pokémon Sandbox',
    tagline: 'Character-Driven, Exploration, Casual',
    description:
      'A largely plot-less Sandbox Style RP where story progression is driven by character goals and their efforts to pursue them.',
    image:
      'https://preview.redd.it/h89zlkbre3d31.png?width=640&crop=smart&auto=webp&s=14f58ff1fdfa30472d23a629803b0554b8ca9afa',
    aspectratio: '21/8',
    icon: 'mdi-pokeball',
    color: 'red',
    link: goToSandbox,
  },
  {
    id: 2,
    title: 'PokéSync',
    tagline: 'Gritty, Survival-Adventure, Resource-Management',
    description:
      "Based on the eponymous PokéSync Fanfic: Pokémon in this world are stronger, larger, and absolutely VORACIOUS. Trainers must balance off-setting their own pokémon's energy-appetites whilst surviving a more dangerous world.",
    image:
      'https://krita-artists.org/uploads/default/original/3X/a/0/a0c9914668be4d0e7070ea01726675c729c43b50.jpeg',
    aspectratio: '20/11',
    icon: 'mdi-pokeball',
    color: 'blue',
    link: goToSync,
  },
]
</script>

<template>
  <v-container fluid>
    <!-- Header Section -->
    <v-row class="header-section">
      <v-col cols="12">
        <div class="header-content d-flex flex-column align-center mx-auto">
          <v-icon size="80" color="yellow-darken-2" class="mb-4">mdi-pokeball</v-icon>
          <h1 class="header-title">Associated Pokémon RPs</h1>
          <p class="header-subtitle">Subtitle here</p>
        </div>
      </v-col>
    </v-row>

    <!-- Additional Info Section -->
    <v-row class="info-section" justify="center">
      <v-col cols="12" md="8">
        <v-card
          class="info-card"
          variant="outlined"
          prepend-icon="mdi-information"
          append-icon="mdi-information"
        >
          <v-card-text class="text-center">
            <p class="mb-0">Think of something to put here</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Cards Section -->
    <v-row class="cards-section" justify="center">
      <v-col cols="12" sm="6" lg="5" xl="4" v-for="rp in roleplays" :key="rp.id" class="mb-6">
        <v-card class="rp-card elevation-8" :class="`${rp.color}-border`" hover @click="rp.link">
          <!-- Card Image with Overlay -->
          <div class="image-container">
            <v-img
              :src="rp.image"
              height="250"
              :aspect-ratio="rp.aspectratio"
              cover
              class="card-image"
            >
              <div class="image-overlay">
                <v-icon :color="rp.color" size="60" class="floating-icon">
                  {{ rp.icon }}
                </v-icon>
              </div>
            </v-img>
          </div>

          <!-- Card Content -->
          <v-card-title class="card-title">
            <v-icon :color="rp.color" class="mr-2">{{ rp.icon }}</v-icon>
            {{ rp.title }}
          </v-card-title>

          <v-card-subtitle class="card-tagline">
            <v-chip
              v-for="(tag, i) in rp.tagline.split(',').map((tag) => tag.trim())"
              :key="i"
              class="mr-2 mb-1"
              color="primary"
              variant="tonal"
              size="small"
              >{{ tag }}</v-chip
            >
          </v-card-subtitle>

          <v-card-text
            class="card-description mx-auto"
            style="overflow-y: scroll; scrollbar-width: thin; height: 100px"
          >
            {{ rp.description }}
          </v-card-text>

          <v-card-actions class="card-actions">
            <v-spacer />
            <v-btn
              :color="rp.color"
              variant="elevated"
              size="large"
              class="explore-btn"
              @click.stop="rp.link"
            >
              <v-icon left class="mr-2">mdi-compass</v-icon>
              Explore World
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.header-section {
  background:
    linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)),
    url('../assets/USUM_Ultra_Necrozma_and_Legendary_Pokemon.jpg') center/cover;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.header-content {
  text-align: center;
  max-width: 800px;
  padding: 2rem;
}

.header-title {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  background: linear-gradient(45deg, #ffd700, #ffa500);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header-subtitle {
  font-size: 1.3rem;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  opacity: 0.95;
}

.cards-section {
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

.rp-card {
  border-radius: 20px !important;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  background: transparent;
  backdrop-filter: blur(10px);
}

.rp-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3) !important;
}

.red-border {
  border-top: 5px solid #f44336;
}

.blue-border {
  border-top: 5px solid #2196f3;
}

.image-container {
  position: relative;
  overflow: hidden;
}

.card-image {
  transition: transform 0.3s ease;
}

.rp-card:hover .card-image {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.rp-card:hover .image-overlay {
  opacity: 1;
}

.floating-icon {
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1.5rem 1.5rem 0.5rem;
}

.card-tagline {
  font-style: italic;
  font-weight: 500;
  opacity: 0.8;
  padding: 0 1.5rem;
}

.card-description {
  padding: 1rem 1.5rem;
  font-size: 1rem;
  line-height: 1.6;
}

.card-actions {
  padding: 1rem 1.5rem 2rem;
}

.explore-btn {
  border-radius: 25px;
  font-weight: bold;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.explore-btn:hover {
  transform: scale(1.05);
}

.info-section {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
}

.info-card {
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .header-title {
    font-size: 2.5rem;
  }

  .header-subtitle {
    font-size: 1.1rem;
  }

  .cards-section {
    padding: 2rem 1rem;
  }
}
</style>
