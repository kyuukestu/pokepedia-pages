<script setup lang="ts">
import { ref } from 'vue'

interface City {
  name: string
  description: string
  specialty: string[]
  link: string
}

interface Gym {
  leader: string
  type: string
  city: string
  badge: string
  badgeIcon?: string
  link: string
}

interface EliteFourMember {
  name: string
  type: string
}

interface Champion {
  name: string
  description: string
  link: string
}

interface LocationOfInterest {
  name: string
  description: string
  icon: string
  color: string
  notablePokemon: string[]
  link: string
}

interface Legendary {
  name: string
  types: string[]
  description: string
  link: string
}

interface UniqueMechanic {
  name: string
  description: string
}

interface RegionData {
  name: string
  generation: string
  headerImage: string
  overview: string
  keyFeatures: string[]
  professor: string
  starters: string[]
  cities: City[]
  gyms: Gym[]
  eliteFour: EliteFourMember[]
  champion: Champion
  locationsOfInterest: LocationOfInterest[]
  legendaries: Legendary[]
  uniqueMechanics: UniqueMechanic[]
}

interface NavigationItem {
  key: string
  label: string
  icon: string
  color: string
  link: string
}

// Sample data for Kanto region - replace with props
const region = ref<RegionData>({
  name: 'Kanto',
  generation: 'Generation I',
  headerImage:
    'https://archives.bulbagarden.net/media/upload/thumb/4/43/HGSS_Kanto.png/492px-HGSS_Kanto.png',
  overview:
    'Kanto is the first region introduced in the Pokémon series, known for its diverse landscapes and the original 151 Pokémon. Home to the legendary Pokémon League and many iconic locations.',
  keyFeatures: ["Oak's Laboratory", 'Red Conference', 'Indigo Plateau'],
  professor: 'Samuel Oak',
  starters: ['Bulbasaur', 'Charmander', 'Squirtle'],
  cities: [
    {
      name: 'Pallet Town',
      description:
        "A fairly new and quiet town. It's a small and pretty place. It's known for Professor Oak's laboratory",
      specialty: ['Research Hub'],
      link: '/locations/pallet-town',
    },
    {
      name: 'Viridian City',
      description: 'A beautiful city that is enveloped in green year-round.',
      specialty: ['Gym'],
      link: '/locations/viridian-city',
    },
    {
      name: 'Pewter City',
      description: 'A quiet city nestled between rugged mountains and rocks',
      specialty: ['Rock Gym'],
      link: '/locations/pewter-city',
    },
    {
      name: 'Cerulean City',
      description: 'A beautiful city with flowing water and blooming flowers',
      specialty: ['Water Gym'],
      link: '/locations/cerulean-city',
    },
    {
      name: 'Vermilion City',
      description: 'A southern city that is bathed in orange by the setting sun',
      specialty: ['Electric Gym'],
      link: '/locations/vermilion-city',
    },
    {
      name: 'Lavender Town',
      description: 'A small town covered in a beautiful hue of purple.',
      specialty: ['Lavender Tower'],
      link: '/locations/lavender-town',
    },
    {
      name: 'Celadon City',
      description: 'A rich, rainbow colored city where people and Pokémon gather.',
      specialty: ['Grass Gym'],
      link: '/locations/celadon-city',
    },
    {
      name: 'Fuchsia City',
      description: 'A historic village that has become new',
      specialty: ['Poison Gym'],
      link: '/locations/fuchsia-city',
    },
    {
      name: 'Saffron City',
      description: 'The biggest city in Kanto, shining with a golden light',
      specialty: ['Silph Tower', 'Psychic Gym', 'Dojo'],
      link: '/locations/saffron-city',
    },
  ],
  gyms: [
    {
      leader: 'Brock',
      type: 'Rock',
      city: 'Pewter City',
      badge: 'Boulder Badge',
      badgeIcon:
        'https://archives.bulbagarden.net/media/upload/thumb/d/dd/Boulder_Badge.png/60px-Boulder_Badge.png',
      link: '/gyms/pewter-gym',
    },
    {
      leader: 'Misty',
      type: 'Water',
      city: 'Cerulean City',
      badge: 'Cascade Badge',
      badgeIcon:
        'https://archives.bulbagarden.net/media/upload/thumb/9/9c/Cascade_Badge.png/60px-Cascade_Badge.png',
      link: '/gyms/cerulean-gym',
    },
    {
      leader: 'Lt. Surge',
      type: 'Electric',
      city: 'Vermilion City',
      badge: 'Thunder Badge',
      badgeIcon:
        'https://archives.bulbagarden.net/media/upload/thumb/a/a6/Thunder_Badge.png/60px-Thunder_Badge.png',
      link: '/gyms/vermilion-gym',
    },
    {
      leader: 'Erika',
      type: 'Grass',
      city: 'Celadon City',
      badge: 'Rainbow Badge',
      badgeIcon:
        'https://archives.bulbagarden.net/media/upload/thumb/b/b5/Rainbow_Badge.png/60px-Rainbow_Badge.png',
      link: '/gyms/celadon-gym',
    },
  ],
  eliteFour: [
    { name: 'Lorelei', type: 'Ice' },
    { name: 'Bruno', type: 'Fighting' },
    { name: 'Agatha', type: 'Ghost' },
    { name: 'Lance', type: 'Dragon' },
  ],
  champion: {
    name: 'Blue/Gary',
    description: 'Your rival who becomes Champion before you challenge them',
    link: '/trainers/champion-blue',
  },
  locationsOfInterest: [
    {
      name: 'Mt. Silver',
      description: 'A mysterious mountain where legendary trainers are said to train',
      icon: 'mdi-image-filter-hdr',
      color: 'grey',
      notablePokemon: ['Larvitar', 'Skarmory', 'Donphan'],
      link: '/locations/mt-silver',
    },
    {
      name: 'Cerulean Cave',
      description: 'An unexplored cave where the legendary Mewtwo resides',
      icon: 'mdi-cave',
      color: 'purple',
      notablePokemon: ['Mewtwo', 'Ditto'],
      link: '/locations/cerulean-cave',
    },
    {
      name: 'Safari Zone',
      description: 'A protected area with rare Pokémon and unique catching rules',
      icon: 'mdi-binoculars',
      color: 'green',
      notablePokemon: ['Kangaskhan', 'Scyther', 'Pinsir', 'Tauros'],
      link: '/locations/safari-zone',
    },
  ],
  legendaries: [
    {
      name: 'Articuno',
      types: ['Ice', 'Flying'],
      description: 'The legendary ice bird found in the Seafoam Islands',
      link: '/pokemon/articuno',
    },
    {
      name: 'Zapdos',
      types: ['Electric', 'Flying'],
      description: 'The legendary thunder bird found in the Power Plant',
      link: '/pokemon/zapdos',
    },
    {
      name: 'Moltres',
      types: ['Fire', 'Flying'],
      description: 'The legendary flame bird found on Mt. Silver',
      link: '/pokemon/moltres',
    },
  ],
  uniqueMechanics: [
    {
      name: 'HM Usage',
      description: 'Hidden Machines required for world navigation',
    },
    {
      name: 'Safari Zone',
      description: 'Special catching mechanics with limited balls',
    },
  ],
})

const navigationItems = ref<NavigationItem[]>([
  {
    key: 'overview',
    label: 'Overview',
    icon: 'mdi-map',
    color: 'primary',
    link: '/sandbox/content/regions.kantoview#overview',
  },
  {
    key: 'cities',
    label: 'Cities',
    icon: 'mdi-city',
    color: 'secondary',
    link: '/sandbox/content/regions.kantoview#cities',
  },
  {
    key: 'gyms',
    label: 'Gyms',
    icon: 'mdi-trophy',
    color: 'success',
    link: '/sandbox/content/regions.kantoview#gyms',
  },
  {
    key: 'champion-league',
    label: 'Champion League',
    icon: 'mdi-crown',
    color: 'warning',
    link: '/sandbox/content/regions.kantoview#champion-league',
  },
  {
    key: 'locations',
    label: 'Locations',
    icon: 'mdi-compass',
    color: 'info',
    link: '/sandbox/content/regions.kantoview#locations',
  },
  { key: 'pokemon', label: 'Pokémon', icon: 'mdi-star', color: 'error', link: '#pokemon' },
  { key: 'lore', label: 'Lore', icon: 'mdi-book', color: 'purple', link: '#lore' },
  { key: 'rp', label: 'RP Guide', icon: 'mdi-account-group', color: 'teal', link: '#rp' },
])

const getTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    Normal: 'hsl(208.24 8.37% 60.2%)',
    Fire: 'hsl(359.68 79.17% 52.94%)',
    Water: 'hsl(213.64 86.09% 54.9%)',
    Electric: 'hsl(46.08 100% 49.02%)',
    Grass: 'hsl(109 59.41% 39.61%)',
    Ice: 'hsl(192.19 100% 62.35%)',
    Fighting: 'hsl(342.21 60.17% 52.75%)',
    Poison: 'hsl(281.68 46.8% 60.2%)',
    Ground: 'hsl(20.8 66.96% 56.08%)',
    Flying: 'hsl(220 54.17% 71.76%)',
    Psychic: 'hsl(340.69 84.47% 59.61%)',
    Bug: 'hsl(67.06 73.12% 36.47%)',
    Rock: 'hsl(52.17 22.33% 59.61%)',
    Ghost: 'hsl(300 26.55% 34.71%)',
    Dragon: 'hsl(233.38 70.73% 59.8%)',
    Dark: 'hsl(7.06 11.89% 28.04%);',
    Steel: 'hsl(195.68 38.26% 54.9%)',
    Fairy: 'hsl(300 79.87% 68.82%)',
  }

  return typeColors[type] || 'grey'
}

// Import all SVG files from the types directory
const iconModules = import.meta.glob('@/assets/types/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
})

// Alternative approach with explicit mapping if you need custom naming
const createIconMapping = () => {
  const iconMap: Record<string, string> = {}

  // Process each imported SVG file
  Object.entries(iconModules).forEach(([path, url]) => {
    // Extract filename without extension from the path
    // e.g., '@/assets/types/fire.svg' -> 'fire'
    const filename = path.split('/').pop()?.replace('.svg', '') || ''

    // Capitalize first letter to match your type names
    // e.g., 'fire' -> 'Fire'
    const typeName = filename.charAt(0).toUpperCase() + filename.slice(1)

    iconMap[typeName] = url as string
  })

  return iconMap
}

// Create the icon mapping
const svgIcons = createIconMapping()

const getTypeIcon = (type: string) => {
  if (svgIcons[type]) return svgIcons[type]
}
</script>
<template>
  <v-container>
    <v-card class="mx-auto region-card" max-width="800" elevation="8">
      <!-- Header with Region Image and Title -->
      <v-img :src="region.headerImage" height="200" cover class="region-header">
        <v-card-title class="region-title">
          <h1 class="text-h3 font-weight-bold text-white">
            {{ region.name }}
          </h1>
          <v-chip color="primary" variant="elevated" class="ml-3">
            {{ region.generation }}
          </v-chip>
        </v-card-title>
      </v-img>

      <!-- Quick Navigation Buttons -->
      <v-card-text class="pa-0">
        <v-row no-gutters>
          <v-col v-for="navItem in navigationItems" :key="navItem.key" cols="6" sm="4" md="3">
            <v-btn
              :color="navItem.color"
              variant="outlined"
              block
              class="rounded-0 py-3"
              :to="navItem.link"
            >
              <v-icon class="mr-2">{{ navItem.icon }}</v-icon>
              {{ navItem.label }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <!-- Region Overview Section -->
      <v-card-text>
        <v-row>
          <v-col cols="12" md="8">
            <h2 class="text-h5 mb-3" id="overview">
              <v-icon class="mr-2" color="primary">mdi-map</v-icon>
              Regional Overview
            </h2>
            <p class="text-body-1 mb-3">{{ region.overview }}</p>

            <v-chip-group>
              <v-chip
                v-for="feature in region.keyFeatures"
                :key="feature"
                color="secondary"
                variant="outlined"
                size="small"
              >
                {{ feature }}
              </v-chip>
            </v-chip-group>
          </v-col>

          <v-col cols="12" md="4">
            <v-card variant="outlined" class="region-stats">
              <v-card-title class="text-h6">Quick Facts</v-card-title>
              <v-card-text>
                <v-list density="compact">
                  <v-list-item>
                    <v-list-item-title>Professor</v-list-item-title>
                    <v-list-item-subtitle>{{ region.professor }}</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Starter Pokémon</v-list-item-title>
                    {{ region.starters.join(', ') }}
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <!-- Cities Section -->
      <v-card-text>
        <h2 class="text-h5 mb-3" id="cities">
          <v-icon class="mr-2" color="primary">mdi-city</v-icon>
          Major Cities & Towns
        </h2>
        <v-row>
          <v-col v-for="city in region.cities" :key="city.name" cols="12" sm="6" md="4">
            <v-card variant="outlined" class="city-card">
              <v-card-title class="text-subtitle-1">{{ city.name }}</v-card-title>
              <v-card-text class="py-2">
                <p class="text-caption">{{ city.description }}</p>
                <div v-if="city.specialty">
                  <v-chip
                    v-for="specialty in city.specialty"
                    :key="specialty"
                    color="accent"
                    size="x-small"
                    class="mt-1"
                  >
                    {{ specialty }}
                  </v-chip>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn size="small" variant="text" :to="city.link"> Learn More </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <!-- Gyms Section -->
      <v-card-text>
        <h2 class="text-h5 mb-3" id="gyms">
          <v-icon class="mr-2" color="primary">mdi-trophy</v-icon>
          Gym Leaders & Badges
        </h2>
        <v-row>
          <v-col v-for="gym in region.gyms" :key="gym.leader" cols="12" sm="6" md="3">
            <v-card variant="outlined" class="gym-card">
              <v-card-title class="text-center">
                <v-avatar :color="getTypeColor(gym.type)" class="mb-2" variant="outlined">
                  <v-img :src="gym.badgeIcon" contain />
                </v-avatar>
                <p class="text-subtitle-2">{{ gym.leader }}</p>
              </v-card-title>
              <v-card-text class="text-center py-2">
                <v-container
                  :style="`background-color: ${getTypeColor(gym.type)}`"
                  size="small"
                  class="mb-2 type-icon"
                >
                  <v-img :src="getTypeIcon(gym.type)" contain class="type-svg" />
                </v-container>
                <p class="text-caption">{{ gym.city }}</p>
                <p class="text-caption font-weight-bold">{{ gym.badge }}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn size="small" variant="text" block :to="gym.link"> Battle Info </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <!-- Elite Four & Champion Section -->
      <v-card-text>
        <h2 class="text-h5 mb-3" id="champion-league">
          <v-icon class="mr-2" color="primary">mdi-crown</v-icon>
          Champion League
        </h2>
        <v-alert type="info" variant="outlined" class="mb-3">
          Expand to Trainer Cards, bg-color type color, add type-icon and trainer image?
        </v-alert>
        <v-row>
          <v-col v-for="member in region.eliteFour" :key="member.name" cols="12" sm="6" md="2.4">
            <v-card variant="outlined" class="elite-card">
              <v-card-title class="text-center text-subtitle-2">
                {{ member.name }}
              </v-card-title>
              <v-card-text class="text-center py-2">
                <v-chip :style="`background-color: ${getTypeColor(member.type)}`" size="small">
                  {{ member.type }}
                </v-chip>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-card variant="tonal" color="warning" class="mt-3">
          <v-card-title class="text-center">
            <v-icon class="mr-2" color="warning">mdi-crown</v-icon>
            Champion: {{ region.champion.name }}
          </v-card-title>
          <v-card-text class="text-center">
            <p class="text-body-2">{{ region.champion.description }}</p>
            <v-btn color="warning" variant="outlined" class="mt-2" :to="region.champion.link">
              Champion Profile
            </v-btn>
          </v-card-text>
        </v-card>
      </v-card-text>

      <v-divider></v-divider>

      <!-- Locations of Interest -->
      <v-card-text>
        <h2 class="text-h5 mb-3" id="locations">
          <v-icon class="mr-2" color="primary">mdi-compass</v-icon>
          Locations of Interest
        </h2>
        <v-expansion-panels variant="accordion">
          <v-expansion-panel v-for="location in region.locationsOfInterest" :key="location.name">
            <v-expansion-panel-title>
              <v-icon class="mr-2" :color="location.color">{{ location.icon }}</v-icon>
              {{ location.name }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <p class="text-body-2 mb-2">{{ location.description }}</p>
              <v-chip-group>
                <v-chip
                  v-for="pokemon in location.notablePokemon"
                  :key="pokemon"
                  size="small"
                  variant="outlined"
                >
                  {{ pokemon }}
                </v-chip>
              </v-chip-group>
              <v-btn variant="text" size="small" class="mt-2" :to="location.link">
                Explore Location
              </v-btn>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>

      <v-divider></v-divider>

      <!-- Legendary Pokémon -->
      <v-card-text>
        <h2 class="text-h5 mb-3">
          <v-icon class="mr-2" color="primary">mdi-star</v-icon>
          Known Legendary Homes
        </h2>
        <v-alert type="info" variant="outlined" class="mb-3"
          >Bulbapedia Location Link maybe
        </v-alert>
        <v-row>
          <v-col
            v-for="legendary in region.legendaries"
            :key="legendary.name"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card variant="outlined" class="legendary-card">
              <v-card-title class="text-subtitle-1">{{ legendary.name }}</v-card-title>
              <v-card-text>
                <v-chip-group variant="outlined">
                  <v-chip
                    v-for="type in legendary.types"
                    :key="type"
                    :style="`background-color: ${getTypeColor(type)}`"
                    size="default"
                  >
                    <v-img :src="getTypeIcon(type)" contain class="type-svg" />
                  </v-chip>
                </v-chip-group>
                <p class="text-caption mt-2">{{ legendary.description }}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn size="small" variant="text" :to="legendary.link"> Pokédex Entry </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>
    </v-card>
  </v-container>
</template>

<style scoped>
.region-card {
  border-radius: 16px;
}

.region-header {
  position: relative;
}

.region-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 20px;
}

.city-card,
.gym-card,
.elite-card,
.legendary-card {
  height: 100%;
  transition: transform 0.2s;
}

.city-card:hover,
.gym-card:hover,
.elite-card:hover,
.legendary-card:hover {
  transform: translateY(-2px);
}

.region-stats {
  position: sticky;
  top: 20px;
}

.v-expansion-panel-text {
  padding-top: 16px;
}

.type-svg {
  width: 24px;
  height: 24px;
}

.type-icon {
  /* Base styles */
  transition: all 0.3s ease;
  cursor: pointer;
  display: inline-block;
  transform-origin: center;

  /* Optional: Add some base styling */
  border-radius: 50%;
  padding: 4px;
  width: 45px;
  aspect-ratio: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  --glow-hue: 0;
  --glow-saturation: 0%;
  --glow-lightness: 100%;
}

.type-icon:hover {
  /* Scale up effect */
  transform: scale(1.15);

  /* Optional: Slight brightness increase */
  filter: brightness(1.1)
    drop-shadow(0 0 8px hsla(var(--glow-hue), var(--glow-saturation), var(--glow-lightness), 0.6))
    drop-shadow(0 0 16px hsla(var(--glow-hue), var(--glow-saturation), var(--glow-lightness), 0.4))
    drop-shadow(0 0 24px hsla(var(--glow-hue), var(--glow-saturation), var(--glow-lightness), 0.2));
}
</style>
