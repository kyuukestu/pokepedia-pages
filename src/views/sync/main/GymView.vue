<script setup lang="ts">
import { ref } from 'vue'

const showPokemonOverlay = ref<number | null>(null)

const gyms = ref([
  {
    id: 1,
    name: 'Oreburgh Gym',
    type: 'Rock',
    leader: {
      name: 'Roark',
      title: 'Roark the Rock!',
      avatar: 'https://i.imgur.com/6LEtiN3.png',
    },
    pokemon: [
      {
        name: 'Onix',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0095.png',
      },
      {
        name: 'Geodude',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0074.png',
      },
      {
        name: 'Craniados',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0408.png',
      },
      {
        name: 'Nosepass',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0299.png',
      },
      {
        name: 'Larvitar',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0246.png',
      },
      {
        name: 'Relicanth',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0369.png',
      },
      {
        name: 'Archen',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0566.png',
      },
      {
        name: 'Dwebble',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0557.png',
      },
      {
        name: 'Anorinth',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0347.png',
      },
      {
        name: 'Aerodactyl',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0142.png',
      },
      {
        name: 'Sudowoodo',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0185.png',
      },
      {
        name: 'Lunatone',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0337.png',
      },
      {
        name: 'Kleavor',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0900.png',
      },
    ],
    rewards: [
      {
        badge: {
          name: 'Coal Badge',
          image: 'https://i.imgur.com/ORpUXLH.png',
        },
      },
      {
        TR: ['Rock Tomb', 'Stealth Rock', 'Sandstorm'],
      },
      {
        cash: {
          amount: 1000,
        },
      },
    ],
  },
  {
    id: 2,
    name: 'Eterna Gym',
    type: 'Grass',
    leader: {
      name: 'Gardenia',
      title: 'Master of Vivid Plant Pokémon!',
      avatar: 'https://i.imgur.com/DIt3FOE.png',
    },
    pokemon: [
      {
        name: 'Budew',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0406.png',
      },
      {
        name: 'Cherubi',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0420.png',
      },
      {
        name: 'Turtwig',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0387.png',
      },
      {
        name: 'Hoppip',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0187.png',
      },
      {
        name: 'Oddish',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0043.png',
      },
      {
        name: 'Shroomish',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0285.png',
      },
      {
        name: 'Tangela',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0114.png',
      },
      {
        name: 'Sunkern',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0191.png',
      },
      {
        name: 'Lileep',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0345.png',
      },
      {
        name: 'Bulbasaur',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0001.png',
      },
      {
        name: 'Tropius',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0357.png',
      },
      {
        name: 'Lotad',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0270.png',
      },
    ],
    rewards: [
      {
        badge: {
          name: 'Forest Badge',
          image: 'https://i.imgur.com/D14cVUv.png',
        },
      },
      {
        TR: ['Mega Drain', 'Bullet Seed', 'Grass Knot', 'Magical Leaf', 'Trailblaze'],
      },
      {
        cash: {
          amount: 1000,
        },
      },
    ],
  },
  {
    id: 3,
    name: 'Hearthome Gym',
    type: 'Ghost',
    leader: {
      name: 'Fantina',
      title: 'The Alluring, Soulful Dancer!',
      avatar: 'https://i.imgur.com/zW7puyI.png',
    },
    pokemon: [
      {
        name: 'Drifloon',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0425.png',
      },
      {
        name: 'Gastly',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0082.png',
      },
      {
        name: 'Misdreavus',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0200.png',
      },
      {
        name: 'Duskull',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0355.png',
      },
      {
        name: 'Shuppet',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0353.png',
      },
      {
        name: 'Frillish',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0592.png',
      },
      {
        name: 'Sinistea',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0854.png',
      },
      {
        name: 'Poltchageist',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/1012.png',
      },
      {
        name: 'Litwick',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0607.png',
      },
      {
        name: 'Sandygast',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0769.png',
      },
      {
        name: 'Brambleghast',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0947.png',
      },
      {
        name: 'Spiritomb',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0442.png',
      },
    ],
    rewards: [
      {
        badge: {
          name: 'Relic Badge',
          image: 'https://i.imgur.com/kkCUwmn.png',
        },
      },
      {
        TR: ['Spite', 'Curse', 'Confuse Ray', 'Night Shade'],
      },
      {
        cash: {
          amount: 1000,
        },
      },
    ],
  },
  {
    id: 4,
    name: 'Veilstone Gym',
    type: 'Fighting',
    leader: {
      name: 'Maylene',
      title: ' The Barefoot, Fighting Genius!',
      avatar: 'https://i.imgur.com/xLe69tx.png',
    },
    pokemon: [
      {
        name: 'Riolu',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0447.png',
      },
      {
        name: 'Machop',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0066.png',
      },
      {
        name: 'Meditite',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0307.png',
      },
      {
        name: 'Tyrogue',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0236.png',
      },
      {
        name: 'Breloom',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0286.png',
      },
      {
        name: 'Monferno',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0391.png',
      },
      {
        name: 'Croagunk',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0453.png',
      },
      {
        name: 'Gallade',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0475.png',
      },
      {
        name: 'Heracross',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0214.png',
      },
      {
        name: 'Mankey',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0056.png',
      },
      {
        name: 'Combusken',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0256.png',
      },
      {
        name: 'Scraggy',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0559.png',
      },
      {
        name: 'Mienfoo',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0619.png',
      },
      {
        name: 'Pignite',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0499.png',
      },
    ],
    rewards: [
      {
        badge: {
          name: 'Cobble Badge',
          image: 'https://i.imgur.com/hEwUK5u.png',
        },
      },
      {
        TR: ['Mega Drain', 'Bullet Seed', 'Grass Knot', 'Magical Leaf', 'Trailblaze'],
      },
      {
        cash: {
          amount: 1000,
        },
      },
    ],
  },
  {
    id: 5,
    name: 'Pastoria Gym',
    type: 'Water',
    leader: {
      name: 'Crasher Wake',
      title: ' The Torrential Masked Master!',
      avatar: 'https://i.imgur.com/i7Rge9C.png',
    },
    pokemon: [
      {
        name: 'Budew',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=V',
      },
      {
        name: 'Cherubi',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=R',
      },
      {
        name: 'Turtwig',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
      {
        name: 'Hoppip',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
      {
        name: 'Oddish',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
      {
        name: 'Shroomish',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
      {
        name: 'Tangela',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
      {
        name: 'Sunkern',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
      {
        name: 'Lileep',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
      {
        name: 'Bulbasaur',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
      {
        name: 'Tropius',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
      {
        name: 'Lotad',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
    ],
    rewards: [
      {
        badge: {
          name: 'Fen Badge',
          image: 'https://i.imgur.com/tUX1hXD.png',
        },
      },
      {
        TR: ['Mega Drain', 'Bullet Seed', 'Grass Knot', 'Magical Leaf', 'Trailblaze'],
      },
      {
        cash: {
          amount: 1000,
        },
      },
    ],
  },
  {
    id: 6,
    name: 'Canalave Gym',
    type: 'Steel',
    leader: {
      name: 'Byron',
      title: 'Master of Vivid Plant Pokémon!',
      avatar: 'https://i.imgur.com/hlKts1Q.png',
    },
    pokemon: [
      {
        name: 'Budew',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=V',
      },
      {
        name: 'Cherubi',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=R',
      },
      {
        name: 'Turtwig',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
      {
        name: 'Hoppip',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
      {
        name: 'Oddish',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
      {
        name: 'Shroomish',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
      {
        name: 'Tangela',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
      {
        name: 'Sunkern',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
      {
        name: 'Lileep',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
      {
        name: 'Bulbasaur',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
      {
        name: 'Tropius',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
      {
        name: 'Lotad',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
    ],
    rewards: [
      {
        badge: {
          name: 'Mine Badge',
          image: 'https://i.imgur.com/ynvrF03.png',
        },
      },
      {
        TR: ['Mega Drain', 'Bullet Seed', 'Grass Knot', 'Magical Leaf', 'Trailblaze'],
      },
      {
        cash: {
          amount: 1000,
        },
      },
    ],
  },
  {
    id: 7,
    name: 'Snowpoint Gym',
    type: 'Ice',
    leader: {
      name: 'Candice',
      title: 'The Diamond Dust Girl!',
      avatar: 'https://i.imgur.com/CgMkEPe.png',
    },
    pokemon: [
      {
        name: 'Snover',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0459.png',
      },
      {
        name: 'Swinub',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0220.png',
      },
      {
        name: 'Sneasel',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0215.png',
      },
      {
        name: 'Snorunt',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0361.png',
      },
      {
        name: 'Smoochum',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0238.png',
      },
      {
        name: 'Lapras',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0131.png',
      },
      {
        name: 'Cubchoo',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0613.png',
      },
      {
        name: 'Cetoddle',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0974.png',
      },
      {
        name: 'Vulpix-Alola',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0037_01.png',
      },
      {
        name: 'Spheal',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0363.png',
      },
      {
        name: 'Bergmite',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0712.png',
      },
      {
        name: 'Sandshrew-Alola',
        sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0027_01.png',
      },
    ],
    rewards: [
      {
        badge: {
          name: 'Icicle Badge',
          image: 'https://i.imgur.com/wyra3ed.png',
        },
      },
      {
        TR: ['Icy Wind', 'Haze', 'Ice Fang', 'Hail', 'Snowscape'],
      },
      {
        cash: {
          amount: 1000,
        },
      },
    ],
  },
  {
    id: 8,
    name: 'Sunyshore Gym',
    type: 'Electric',
    leader: {
      name: 'Volkner',
      title: 'Master of Vivid Plant Pokémon!',
      avatar: 'https://i.imgur.com/AcKZY6B.png',
    },
    pokemon: [
      {
        name: 'Budew',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=V',
      },
      {
        name: 'Cherubi',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=R',
      },
      {
        name: 'Turtwig',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
      {
        name: 'Hoppip',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
      {
        name: 'Oddish',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
      {
        name: 'Shroomish',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
      {
        name: 'Tangela',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
      {
        name: 'Sunkern',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
      {
        name: 'Lileep',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
      {
        name: 'Bulbasaur',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
      {
        name: 'Tropius',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
      {
        name: 'Lotad',
        sprite: 'https://via.placeholder.com/30x30/4CAF50/FFFFFF?text=L',
      },
    ],
    rewards: [
      {
        badge: {
          name: 'Beacon Badge',
          image: 'https://i.imgur.com/5UzfmPL.png',
        },
      },
      {
        TR: ['Mega Drain', 'Bullet Seed', 'Grass Knot', 'Magical Leaf', 'Trailblaze'],
      },
      {
        cash: {
          amount: 1000,
        },
      },
    ],
  },
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
</script>

<template>
  <v-container fluid class="py-6">
    <v-row align="center" justify="center" class="g-4">
      <v-col cols="12" md="4" lg="3" v-for="gym in gyms" :key="gym.id">
        <v-card
          class="gym-card elevation-8 h-100"
          :color="getTypeColor(gym.type)"
          variant="elevated"
        >
          <!-- Header Section -->
          <v-card-title class="text-h5 font-weight-bold text-white pa-4">
            {{ gym.name }}
          </v-card-title>

          <v-card-subtitle class="text-subtitle-1 text-white pb-2">
            <v-icon left size="small">mdi-dumbbell</v-icon>
            {{ gym.type }}
          </v-card-subtitle>

          <v-card-text class="pb-2">
            <!-- Gym Leader Section -->
            <v-row align="center" class="mb-4">
              <v-col cols="auto">
                <div
                  class="elevation-4"
                  :style="`background: no-repeat 50% 0%/150% url(${gym.leader.avatar}); height: 150px; aspect-ratio: 1/1; border-radius: 50%;`"
                ></div>
              </v-col>
              <v-col>
                <div class="text-h6 font-weight-medium text-white">
                  {{ gym.leader.name }}
                </div>
                <div class="text-caption text-white opacity-80">{{ gym.leader.title }}</div>
              </v-col>
            </v-row>

            <!-- Pokemon Team Section -->
            <v-divider class="my-4 opacity-60"></v-divider>

            <div class="text-center">
              <v-btn
                @click="showPokemonOverlay = gym.id"
                color="rgba(255,255,255,0.2)"
                variant="elevated"
                class="text-white pokemon-btn"
                prepend-icon="mdi-pokeball"
              >
                View Team ({{ gym.pokemon.length }})
              </v-btn>
            </div>

            <!-- Pokemon Overlay -->
            <v-overlay
              :model-value="showPokemonOverlay === gym.id"
              @click:outside="showPokemonOverlay = null"
              class="d-flex align-center justify-center"
            >
              <v-card
                class="pokemon-overlay-card pa-6 elevation-24"
                :color="getTypeColor(gym.type)"
                max-width="600"
                width="90%"
              >
                <v-card-title class="text-h5 text-white d-flex align-center justify-space-between">
                  <div>
                    <v-icon left class="mr-2">mdi-pokeball</v-icon>
                    {{ gym.name }} - Team Pokémon
                  </div>
                  <v-btn
                    @click="showPokemonOverlay = null"
                    icon="mdi-close"
                    variant="text"
                    color="white"
                    size="small"
                  ></v-btn>
                </v-card-title>

                <v-card-text class="pt-4">
                  <v-row>
                    <v-col
                      v-for="pokemon in gym.pokemon"
                      :key="pokemon.name"
                      cols="6"
                      sm="4"
                      md="3"
                      class="text-center"
                    >
                      <v-card
                        class="pokemon-card pa-3 elevation-8"
                        color="rgba(255,255,255,0.15)"
                        variant="elevated"
                        style="aspect-ratio: 1; width: 115px"
                      >
                        <v-img :src="pokemon.sprite" height="50" contain class="mb-2"></v-img>
                        <div class="text-body-2 text-white font-weight-medium">
                          {{ pokemon.name }}
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-overlay>

            <!-- Rewards Section -->
            <v-divider class="my-4 opacity-60"></v-divider>
            <div class="text-subtitle-2 text-white mb-3 font-weight-medium">
              <v-icon left size="small">mdi-trophy</v-icon>
              Rewards
            </div>

            <v-row class="mb-3">
              <!-- Badge Reward -->
              <v-col cols="6" class="text-center">
                <v-card
                  class="reward-card pa-3 elevation-4"
                  color="rgba(255,255,255,0.15)"
                  variant="elevated"
                >
                  <v-img
                    :src="gym.rewards[0].badge?.image"
                    height="40"
                    contain
                    class="mb-2"
                  ></v-img>
                  <div class="text-caption text-white font-weight-medium">
                    {{ gym.rewards[0].badge?.name }}
                  </div>
                </v-card>
              </v-col>

              <!-- Cash Reward -->
              <v-col cols="6" class="text-center">
                <v-card
                  class="reward-card pa-3 elevation-4"
                  color="rgba(255,255,255,0.15)"
                  variant="elevated"
                >
                  <v-icon color="amber" size="40" class="mb-2"> mdi-currency-php </v-icon>
                  <div class="text-caption text-white font-weight-medium">
                    ₱{{ gym.rewards[2].cash?.amount }}
                  </div>
                </v-card>
              </v-col>
            </v-row>

            <!-- TR Rewards -->
            <div class="text-caption text-white mb-2 opacity-90">
              <v-icon left size="small">mdi-book-open-variant</v-icon>
              Choose one TR:
            </div>
            <div class="d-flex flex-wrap gap-1">
              <v-chip
                v-for="reward in gym.rewards[1].TR"
                :key="reward"
                size="small"
                color="rgba(255,255,255,0.2)"
                text-color="white"
                variant="elevated"
                class="text-caption"
              >
                {{ reward }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.gym-card {
  transition: all 0.3s ease;
  border-radius: 16px !important;
}

.gym-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3) !important;
}

.pokemon-btn {
  transition: all 0.2s ease;
  border-radius: 20px !important;
}

.pokemon-btn:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.3) !important;
}

.pokemon-overlay-card {
  border-radius: 20px !important;
  max-height: 80vh;
  overflow-y: auto;
}

.pokemon-card {
  transition: all 0.2s ease;
  border-radius: 12px !important;
}

.pokemon-card:hover {
  transform: scale(1.05);
  background-color: rgba(255, 255, 255, 0.2) !important;
}

.reward-card {
  transition: all 0.2s ease;
  border-radius: 12px !important;
}

.reward-card:hover {
  transform: scale(1.05);
  background-color: rgba(255, 255, 255, 0.25) !important;
}

.g-4 {
  gap: 1.5rem;
}

.h-100 {
  height: 100%;
}

.opacity-60 {
  opacity: 0.6;
}

.opacity-80 {
  opacity: 0.8;
}

.opacity-90 {
  opacity: 0.9;
}

.gap-1 {
  gap: 0.25rem;
}
</style>
