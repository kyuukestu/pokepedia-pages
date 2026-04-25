<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { allGymRegistry } from '@/data/gym-registry'
import { allRibbonRegistry } from '@/data/contest-registry'
import { RibbonCollection } from '@/types/association'
import { CharacterMeta } from '@/types/character'
import { BadgeCollection } from '@/types/league'
import { getImageUrl, getBadgeUrl, getRibbonUrl } from '@/utils/path-resolvers'

const props = defineProps<{
  data: CharacterMeta
}>()

// --- DEBUG: Monitor the incoming prop ---
watchEffect(() => {
  console.log('--- AchievementTab Raw Prop Entry ---')
  console.log('Raw props.data:', props.data)
})

const ownedBadgeIds = computed(() => {
  const badgesObj = props.data?.badges
  if (!badgesObj || typeof badgesObj !== 'object') return []

  // Simply map the IDs present in the arrays
  return Object.values(badgesObj)
    .flat()
    .map((b: any) => b.gymId)
})

const badgeCases = computed(() => {
  const collection = props.data.badges as BadgeCollection
  if (!collection || typeof collection !== 'object') return []

  return Object.entries(collection)
    .map(([regionName, records]) => {
      const mappedGyms = records.map((record) => {
        // Find the source gym in the registry
        const gym = allGymRegistry.find((g) => g.id === record.gymId)

        if (!gym) {
          console.warn(`Badge ID ${record.gymId} not found in registry.`)
          return {
            id: record.gymId,
            isOwned: true,
            region: regionName,
            badgeName: 'Unknown',
            city: 'Unknown City', // Added fallback
            badgeImg: '',
            activeLeader: { name: 'Unknown', image: '', typeIcon: '', id: '', isOc: false },
          }
        }

        // Calculate the active leader for this gym
        const foundLeader = gym.leaders.find((l) => l.isActive) || gym.leaders[0]

        // RETURN ORDER MATTERS:
        // Spread the gym first to get city, badgeImg, badgeName, etc.
        // Then explicitly overwrite/add the journey-specific data.
        return {
          ...gym,
          activeLeader: foundLeader,
          isOwned: true,
          dateObtained: record.dateObtained,
        }
      })

      // Pad the case to 8 slots
      const displaySlots = [...mappedGyms]
      while (displaySlots.length < 8) {
        displaySlots.push({ isOwned: false, region: regionName, city: '' } as any)
      }

      return {
        name: regionName,
        gyms: displaySlots,
      }
    })
    .filter((regionCase) => regionCase.gyms.some((g) => g.isOwned))
})

const ribbonCases = computed(() => {
  const collection = props.data.ribbons as RibbonCollection
  if (!collection || typeof collection !== 'object') return []

  // Iterate over each region key in the character's ribbons object (e.g., 'kalos')
  return Object.entries(collection)
    .map(([regionName, records]) => {
      // For every record Esther has, find the matching metadata in the registry
      const mappedRibbons = records.map((record) => {
        const registryData = allRibbonRegistry.find((r) => r.id === record.ribbonId)

        return {
          ...registryData, // name, city, image from registry
          ...record, // ribbonId, dateObtained from character file
          isOwned: true, // If it's in this file, they own it!
        }
      })

      return {
        name: regionName,
        ribbons: mappedRibbons,
      }
    })
    .filter((regionCase) => regionCase.ribbons.length > 0)
})

const getTypeIcon = (name: string) => new URL(`/src/assets/types/${name}`, import.meta.url).href
</script>

<template>
  <div class="achievements-badge-vault">
    <div
      v-if="ownedBadgeIds.length === 0"
      class="ma-4 pa-4 bg-error-lighten-5 border-error rounded"
    >
      <div class="text-subtitle-2 font-weight-bold">Debug Panel: No Badges Detected</div>
      <div class="text-caption">Check Console (F12) for data structure.</div>
      <pre class="text-caption mt-2">{{
        { dataReceived: !!props.data, idsFound: ownedBadgeIds }
      }}</pre>
    </div>

    <div v-for="regionCase in badgeCases" :key="regionCase.name" class="badge-case mb-10">
      <div class="d-flex align-center px-4 mb-4">
        <h3 class="text-overline font-weight-black">{{ regionCase.name }} League Case</h3>
        <v-divider class="ml-4" opacity="0.1" />
      </div>

      <div class="badge-grid">
        <div
          v-for="(gym, index) in regionCase.gyms"
          :key="gym.id || `empty-${index}`"
          class="badge-segment"
          :class="{ 'is-locked': !gym.isOwned, 'is-collected': gym.isOwned }"
        >
          <template v-if="gym.id && gym.activeLeader">
            <v-img
              :src="
                getImageUrl(
                  gym.activeLeader.image,
                  gym.activeLeader.isOc,
                  gym.activeLeader.id,
                  gym.region,
                )
              "
              cover
              class="segment-bg"
            >
              <div class="leader-overlay"></div>
            </v-img>

            <div class="type-icon-layer">
              <v-img :src="getTypeIcon(gym.activeLeader.typeIcon)" width="20" class="type-filter" />
            </div>

            <div class="badge-foreground">
              <div v-if="gym.isOwned" class="shiny-effect"></div>
              <v-img
                :src="getBadgeUrl(gym.badgeImg, gym.region)"
                :class="gym.isOwned ? 'badge-active' : 'badge-indent'"
                width="54"
                contain
              />
            </div>

            <v-tooltip activator="parent" location="top" transition="scroll-y-reverse-transition">
              <div class="text-center">
                <div class="font-weight-bold">{{ gym.badgeName }}</div>
                <div class="text-caption text-uppercase">
                  {{ gym.activeLeader.name }} • {{ gym.city }}
                </div>
              </div>
            </v-tooltip>
          </template>

          <template v-else>
            <div class="badge-indent-placeholder">
              <v-icon color="white" style="opacity: 0.05" size="40">mdi-shield-outline</v-icon>
            </div>
          </template>
        </div>
      </div>
    </div>

    <v-divider v-if="badgeCases.length && ribbonCases.length" class="my-12" />

    <div v-for="regionCase in ribbonCases" :key="regionCase.name" class="ribbon-case mb-10">
      <div class="d-flex align-center px-4 mb-4">
        <h3 class="text-overline font-weight-black text-amber-lighten-3">
          {{ regionCase.name }} Grand Festival Circuit
        </h3>
        <v-divider class="ml-4" opacity="0.1" />
      </div>

      <div class="ribbon-display-grid px-4">
        <div v-for="ribbon in regionCase.ribbons" :key="ribbon.id" class="ribbon-card">
          <div class="ribbon-silk-bg"></div>

          <div class="ribbon-content">
            <v-img
              :src="getRibbonUrl(ribbon?.image || '', ribbon?.region || 'unknown')"
              width="80"
              contain
              class="ribbon-main-img"
            />

            <div class="ribbon-label mt-2">
              <div class="text-caption font-weight-bold text-truncate">{{ ribbon.city }}</div>
              <div class="ribbon-tag">{{ ribbon.name }}</div>
            </div>
          </div>

          <v-tooltip activator="parent" location="top" transition="fade-transition">
            <div class="text-center">
              <div class="font-weight-bold text-amber-accent-1">{{ ribbon.name }}</div>
              <div class="text-caption">Won in {{ ribbon.city }}</div>
              <div v-if="ribbon.dateObtained" class="text-overline mt-1">
                {{ ribbon.dateObtained }}
              </div>
            </div>
          </v-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* --- Coordinator Ribbon Showcase --- */
.ribbon-display-grid {
  display: grid;
  /* Larger cards for ribbons since there are fewer */
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
}

.ribbon-card {
  position: relative;
  height: 180px;
  background: linear-gradient(145deg, #1a1a1a, #0d0d0d);
  border-radius: 20px;
  border: 1px solid rgba(255, 215, 0, 0.1); /* Subtle gold border */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
}

.ribbon-silk-bg {
  position: absolute;
  inset: 0;
  /* Creates a subtle "folded silk" or velvet look */
  background: radial-gradient(circle at 50% -20%, rgba(255, 255, 255, 0.05) 0%, transparent 80%);
  opacity: 0.5;
}

.ribbon-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.ribbon-main-img {
  filter: drop-shadow(0 8px 15px rgba(0, 0, 0, 0.5));
  transition: transform 0.3s ease;
}

.ribbon-label {
  text-align: center;
  width: 90%;
  color: rgba(255, 255, 255, 0.7);
}

.ribbon-tag {
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: rgba(255, 255, 255, 0.05);
  padding: 2px 8px;
  border-radius: 10px;
  display: inline-block;
  margin-top: 4px;
}

/* Hover Effects */
.ribbon-card:hover {
  transform: translateY(-8px);
  border-color: rgba(255, 215, 0, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.ribbon-card:hover .ribbon-main-img {
  transform: scale(1.15) rotate(5deg);
}

.ribbon-card:hover .ribbon-silk-bg {
  background: radial-gradient(circle at 50% -20%, rgba(255, 215, 0, 0.1) 0%, transparent 80%);
  opacity: 1;
}

/* --- Responsive Adjustments --- */
@media (max-width: 600px) {
  .ribbon-display-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .ribbon-card {
    height: 150px;
  }
}

.badge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 16px;
  padding: 0 16px;
}

.badge-segment {
  position: relative;
  aspect-ratio: 1/1;
  border-radius: 16px;
  overflow: hidden;
  background: #121212;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.segment-bg {
  position: absolute;
  inset: 0;
  opacity: 0.35;
  filter: saturate(0.8);
  transition: transform 0.6s ease;
}

.is-locked .segment-bg {
  filter: grayscale(1) opacity(0.1);
}

.leader-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.8) 100%);
}

.type-icon-layer {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
}

.type-filter {
  filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.5));
  opacity: 0.7;
}

.badge-foreground {
  position: relative;
  z-index: 2;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.badge-active {
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.6)) contrast(1.1);
}

.badge-indent {
  filter: brightness(0) opacity(0.2);
  transform: scale(0.85);
}

/* Hover States */
.is-collected:hover .badge-foreground {
  transform: scale(1.15) rotate(4deg);
}

.is-collected:hover .segment-bg {
  transform: scale(1.1);
  opacity: 0.5;
}

/* Shiny Shimmer Animation */
.is-collected .shiny-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: skewX(-25deg);
  z-index: 3;
}

.is-collected:hover .shiny-effect {
  animation: shine 0.8s ease;
}

@keyframes shine {
  100% {
    left: 200%;
  }
}
</style>
