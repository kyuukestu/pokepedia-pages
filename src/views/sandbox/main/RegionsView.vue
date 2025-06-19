<script setup lang="ts">
import { ref } from 'vue'

// Sample data - replace with your actual data
const regions = ref([
  {
    name: 'Kanto',
    tagline: 'Where the journey began',
    image:
      'https://archives.bulbagarden.net/media/upload/thumb/7/7d/PE_Kanto_Map.png/1280px-PE_Kanto_Map.png',
    generation: 'Gen I',
    playerCount: '',
    canonicity: 'Official',
    country: { flag: 'fi fi-jp', name: 'Japan' },
    keyFeatures: [{ name: 'Gyms', icon: 'mdi-pokemon-go', color: 'amber' }],
    link: '/sandbox/content/regions.kantoview',
  },
  {
    name: 'Johto',
    tagline: 'Land of traditions',
    image: 'https://archives.bulbagarden.net/media/upload/6/64/JohtoMap.png',
    generation: 'Gen II',
    playerCount: '',
    canonicity: 'Official',
    country: { flag: 'fi fi-jp', name: 'Japan' },
    keyFeatures: [{ name: 'Gyms', icon: 'mdi-pokemon-go', color: 'amber' }],
  },
  {
    name: 'Hoenn',
    tagline: 'Land and sea adventures',
    image:
      'https://archives.bulbagarden.net/media/upload/thumb/8/85/Hoenn_ORAS.png/450px-Hoenn_ORAS.png',
    generation: 'Gen III',
    playerCount: '',
    canonicity: 'Official',
    country: { flag: 'fi fi-jp', name: 'Japan' },
    keyFeatures: [{ name: 'Gyms', icon: 'mdi-pokemon-go', color: 'amber' }],
  },
  {
    name: 'Sinnoh',
    tagline: 'Myths and legends',
    image:
      'https://archives.bulbagarden.net/media/upload/thumb/0/08/Sinnoh_BDSP_artwork.png/450px-Sinnoh_BDSP_artwork.png',
    generation: 'Gen IV',
    playerCount: '',
    canonicity: 'Official',
    country: { flag: 'fi fi-jp', name: 'Japan' },
    keyFeatures: [
      { name: 'Gyms', icon: 'mdi-pokemon-go', color: 'amber' },
      { name: 'Contests', icon: 'mdi-seal-variant', color: 'blue' },
    ],
  },
  {
    name: 'Unova',
    tagline: 'A world of truths and ideals',
    image:
      'https://archives.bulbagarden.net/media/upload/thumb/f/fc/Unova_B2W2_alt.png/450px-Unova_B2W2_alt.png',
    generation: 'Gen V',
    playerCount: '',
    canonicity: 'Official',
    country: { flag: 'fi fi-us', name: 'United States' },
    keyFeatures: [
      { name: 'Gyms', icon: 'mdi-pokemon-go', color: 'amber' },
      { name: 'Contests', icon: 'mdi-seal-variant', color: 'blue' },
    ],
  },
  {
    name: 'Kalos',
    tagline: 'A world of truths and ideals',
    image:
      'https://archives.bulbagarden.net/media/upload/thumb/8/8a/Kalos_alt.png/450px-Kalos_alt.png',
    generation: 'Gen VI',
    playerCount: '',
    canonicity: 'Official',
    country: { flag: 'fi fi-fr', name: 'France' },
    keyFeatures: [
      { name: 'Gyms', icon: 'mdi-pokemon-go', color: 'amber' },
      { name: 'Showcase', icon: 'mdi-key', color: 'blue' },
    ],
  },
  {
    name: 'Alola',
    tagline: 'A world of truths and ideals',
    image:
      'https://archives.bulbagarden.net/media/upload/thumb/0/0b/Alola_USUM_artwork.png/450px-Alola_USUM_artwork.png',
    generation: 'Gen VII',
    playerCount: '',
    canonicity: 'Official',
    country: { flag: 'fi fi-us', name: 'United States' },
    keyFeatures: [
      { name: 'Trials', icon: 'mdi-pokemon-go', color: 'amber' },
      { name: 'Contests', icon: 'mdi-seal-variant', color: 'blue' },
    ],
  },
  {
    name: 'Galar',
    tagline: 'A world of truths and ideals',
    image:
      'https://archives.bulbagarden.net/media/upload/thumb/c/ce/Galar_artwork.png/450px-Galar_artwork.png',
    generation: 'Gen VIII',
    playerCount: '',
    canonicity: 'Official',
    country: { flag: 'fi fi-gb', name: 'United Kingdom' },
    keyFeatures: [{ name: 'Gyms', icon: 'mdi-pokemon-go', color: 'amber' }],
  },
  {
    name: 'Paldea',
    tagline: 'A world of truths and ideals',
    image:
      'https://archives.bulbagarden.net/media/upload/thumb/f/fd/Paldea_artwork.png/450px-Paldea_artwork.png',
    generation: 'Gen IX',
    playerCount: '',
    canonicity: 'Official',
    country: { flag: 'fi fi-es', name: 'Spain' },
    keyFeatures: [{ name: 'Gyms', icon: 'mdi-pokemon-go', color: 'amber' }],
  },
  {
    name: 'Fiore',
    tagline: 'A world of truths and ideals',
    image: 'https://archives.bulbagarden.net/media/upload/4/48/Fiore_alt.png',
    generation: 'Gen III',
    playerCount: '',
    canonicity: 'Official',
    country: { flag: 'fi fi-jp', name: 'Japan' },
    keyFeatures: [],
  },
  {
    name: 'Almia',
    tagline: 'A world of truths and ideals',
    image: 'https://archives.bulbagarden.net/media/upload/thumb/f/f4/Almia.png/300px-Almia.png',
    generation: 'Gen IV',
    playerCount: '',
    canonicity: 'Official',
    country: { flag: 'fi fi-jp', name: 'Japan' },
    keyFeatures: [],
  },
  {
    name: 'Oblivia',
    tagline: 'A world of truths and ideals',
    image: 'https://archives.bulbagarden.net/media/upload/f/f5/Oblivia_artwork.png',
    generation: 'Gen IV',
    playerCount: '',
    canonicity: 'Official',
    country: { flag: 'fi fi-jp', name: 'Japan' },
    keyFeatures: [],
  },
  {
    name: 'Ransei',
    tagline: 'A world of truths and ideals',
    image: 'https://archives.bulbagarden.net/media/upload/4/4b/Ransei.png',
    generation: 'Gen V',
    playerCount: '',
    canonicity: 'Official',
    country: { flag: 'fi fi-jp', name: '~Japan' },
    keyFeatures: [],
  },
  {
    name: 'Orange Islands',
    tagline: 'Land of traditions',
    image: 'https://archives.bulbagarden.net/media/upload/thumb/5/5a/Orange.jpg/800px-Orange.jpg',
    generation: 'Gen II',
    playerCount: '',
    canonicity: 'Official',
    country: { flag: 'fi fi-jp', name: 'Japan' },
    keyFeatures: [{ name: 'Gyms', icon: 'mdi-pokemon-go', color: 'amber' }],
  },
  {
    name: 'Decolore Islands',
    tagline: 'Land of traditions',
    image: 'https://archives.bulbagarden.net/media/upload/0/0d/Decolore.png',
    generation: 'Gen V',
    playerCount: '',
    canonicity: 'Official',
    country: { flag: 'fi fi-jp', name: 'Japan' },
    keyFeatures: [{ name: 'Gyms', icon: 'mdi-pokemon-go', color: 'amber' }],
  },
])

const canonicityIcon = (canonicity: string) => {
  switch (canonicity) {
    case 'Official':
      return 'mdi-checkbox-marked-circle'
    case 'Fan-Game':
      return 'mdi-checkbox-marked-circle-outline'
    case 'RPer-Made':
      return 'mdi-checkbox-marked-circle-outline'
    default:
      return 'mdi-checkbox-marked-circle'
  }
}
</script>

<template>
  <v-container fluid class="regions-container">
    <!-- Page Header -->
    <div class="page-header">
      <h1 class="display-2 font-weight-bold text-center mb-2">Pokémon Regions</h1>
      <p class="text-h6 text-center text-medium-emphasis mb-8">
        Discover the vast worlds of Pokémon
      </p>
    </div>

    <!-- Regions Grid -->
    <v-row class="regions-grid">
      <v-col
        v-for="region in regions"
        :key="region.name"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="region-col"
      >
        <v-card class="region-card" elevation="0" :ripple="false" variant="outlined">
          <!-- Hero Image with Overlay -->
          <div class="card-hero">
            <v-img :src="region.image" height="200" cover class="region-image">
              <div class="image-overlay">
                <div class="region-badge">
                  <v-icon class="badge-icon">mdi-map-marker</v-icon>
                  <span class="badge-text">{{ region.generation || 'Gen I' }}</span>
                </div>
              </div>
            </v-img>
          </div>

          <!-- Card Content -->
          <div class="card-content">
            <!-- Region Name -->
            <h2 class="region-name">{{ region.name }}</h2>

            <!-- Tagline -->
            <p class="region-tagline">{{ region.tagline }}</p>

            <!-- Quick Stats -->
            <div class="stats-row">
              <div class="stat-item">
                <v-icon class="stat-icon" color="primary">mdi-pokeball</v-icon>
                <span class="stat-value">{{ region.playerCount || 'N/A' }}</span>
                <span class="stat-label">Characters</span>
              </div>
              <div class="stat-item">
                <v-icon class="stat-icon" color="success">
                  {{ canonicityIcon(region.canonicity) }}</v-icon
                >
                <span class="stat-value">{{ region.canonicity || 'N/A' }}</span>
                <span class="stat-label">Canonicity</span>
              </div>
              <div class="stat-item">
                <span :class="'stat-icon ' + region.country?.flag"></span>
                <span class="stat-value">{{ region.country?.name || '' }}</span>
                <span class="stat-label">Country</span>
              </div>
            </div>

            <!-- Key Features Icons -->
            <div class="features-row">
              <div class="feature-tag" v-for="feature in region.keyFeatures" :key="feature.name">
                <v-icon :color="feature.color" size="small">{{ feature.icon }}</v-icon>
                <span>{{ feature.name }}</span>
              </div>
            </div>
          </div>

          <!-- Action Area -->
          <div class="card-actions">
            <v-btn
              color="primary"
              variant="flat"
              block
              size="large"
              class="explore-btn"
              :to="region.link"
            >
              <v-icon start>mdi-compass</v-icon>
              Explore {{ region.name }}
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.regions-container {
  min-height: 100vh;
  padding: 2rem 1rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 0.5rem;
}

.page-header p {
  font-size: 1.1rem;
}

.regions-grid {
  max-width: 1400px;
  margin: 0 auto;
}

.region-col {
  display: flex;
  align-items: stretch;
}

.region-card {
  position: relative;
  background: white;
  border-radius: 24px !important;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  width: 100%;
  height: 520px;
  display: flex;
  flex-direction: column;
}

.region-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
}

.region-card:hover .region-image {
  transform: scale(1.1);
}

.card-hero {
  position: relative;
  overflow: hidden;
  height: 180px; /* Fixed height for image section */
  flex-shrink: 0;
}

.region-image {
  transition: transform 0.3s ease;
  width: 100%;
  height: 100%;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.3) 0%, transparent 50%);
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 1rem;
}

.region-badge {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.badge-icon {
  font-size: 1rem;
  color: #666;
}

.badge-text {
  font-weight: 600;
  font-size: 0.9rem;
  color: #333;
}

.card-content {
  padding: 1rem 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 0; /* Allow flex shrinking */
}

.region-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  text-align: center;
  line-height: 1.2;
  flex-shrink: 0;
}

.region-tagline {
  font-size: 0.9rem;
  color: #666;
  text-align: center;
  margin: 0;
  font-style: italic;
  line-height: 1.3;
  height: 2.6em; /* Fixed height for 2 lines */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  flex-shrink: 0;
}

.stats-row {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background: #f8f9fa;
  border-radius: 16px;
  padding: 0.75rem 0.25rem;
  margin: 0.25rem 0;
  gap: 0.25rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  min-width: 0;
  padding: 0.25rem;
  position: relative;
}

.stat-icon {
  font-size: 1.4rem;
  flex-shrink: 0;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-weight: 700;
  font-size: 0.8rem;
  color: #1a1a1a;
  text-align: center;
  line-height: 1.2;
  width: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  padding: 0.1rem;
}

.stat-label {
  font-size: 0.65rem;
  color: #666;
  text-transform: uppercase;
  font-weight: 500;
  text-align: center;
  line-height: 1.1;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.features-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.feature-tag {
  background: #f0f0f0;
  border-radius: 20px;
  padding: 0.4rem 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: #555;
}

.card-actions {
  padding: 1rem 1.5rem;
  background: #fafafa;
  border-top: 1px solid #eee;
}

.explore-btn {
  border-radius: 16px !important;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0.5px;
}

.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(102, 126, 234, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
}

.hover-content {
  text-align: center;
  color: white;
}

.hover-text {
  margin-top: 0.5rem;
  font-size: 1.1rem;
  font-weight: 500;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .regions-container {
    padding: 1rem 0.5rem;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .stats-row {
    padding: 0.5rem 0.2rem;
    min-height: 80px;
    gap: 0.2rem;
  }

  .stat-value {
    font-size: 0.75rem;
  }

  .stat-label {
    font-size: 0.6rem;
  }

  .stat-icon {
    font-size: 1.2rem;
  }

  .region-name {
    font-size: 1.5rem;
  }
}

@media (max-width: 400px) {
  .stat-value {
    font-size: 0.7rem;
  }

  .stat-label {
    font-size: 0.55rem;
  }

  .stat-icon {
    font-size: 1.1rem;
  }

  .stats-row {
    min-height: 75px;
    padding: 0.4rem 0.15rem;
  }
}

/* Animation keyframes */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.region-card:nth-child(even) {
  animation: float 6s ease-in-out infinite;
  animation-delay: 1s;
}

.region-card:nth-child(odd) {
  animation: float 6s ease-in-out infinite;
  animation-delay: 3s;
}
</style>
