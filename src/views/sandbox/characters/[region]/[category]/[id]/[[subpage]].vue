<script setup lang="ts">
import { markRaw, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay, useTheme } from 'vuetify'
import { useCharacterStore } from '@/stores/useCharacterStore'

// Types & Helpers
import { CharacterTypeLabels, TrainerClassLabels } from '@/types/character'
import { RegionLabels } from '@/types/region'
import { getCharImageUrl } from '@/utils/path-resolvers'
import { allGymRegistry } from '@/data/gym-registry'
import { allRibbonRegistry } from '@/data/contest-registry'

// Components
import SummaryTab from '@/components/character/tabs/DefaultTab.vue'
import PokemonTab from '@/components/character/tabs/PokemonTeam.vue'
import AchievementTab from '@/components/character/tabs/AchievementTab.vue'
import GalleryTab from '@/components/character/tabs/GalleryTab.vue'
import CharacterSpeedDial from '@/components/nav/CharacterSpeedDial.vue'

const route = useRoute('/sandbox/characters/[region]/[category]/[id]/[[subpage]]')
const store = useCharacterStore()
const { mobile, lgAndUp } = useDisplay()
const theme = useTheme()

const loadData = () => {
  const { region, category, id, subpage } = route.params
  const targetFile = (subpage as string) || 'index'
  store.fetchCharacter(region, category, id, targetFile)
}

onMounted(loadData)
watch(() => route.params, loadData, { deep: true })

const tabComponents: Record<string, any> = {
  index: markRaw(SummaryTab),
  pokemon: markRaw(PokemonTab),
  achievements: markRaw(AchievementTab),
  gallery: markRaw(GalleryTab),
}

const currentComponent = computed(() => {
  const sub = (route.params.subpage as string) || 'index'
  return tabComponents[sub] ?? SummaryTab
})

const currentPathBase = computed(
  () => `/sandbox/characters/${route.params.region}/${route.params.category}/${route.params.id}`,
)

// ── Enhanced Color Intelligence ──────────────────────────────────────────────
const rawColor = computed(() => store.meta?.color ?? 'primary')
const isHex = computed(() => rawColor.value.startsWith('#'))

// Ensures titles are punchy even if the character color is too light/dark
const safeTitleColor = computed(() => {
  if (!isHex.value) return `color: var(--v-theme-${rawColor.value})`
  return `color: ${rawColor.value}`
})

const bgStyle = computed(() => (isHex.value ? { backgroundColor: rawColor.value } : {}))
const borderStyle = computed(() => (isHex.value ? { borderColor: rawColor.value } : {}))

const totals = computed(() => {
  if (!store.meta) return { badges: 0, ribbons: 0 }
  const badges = Object.values(store.meta.badges || {})
    .flat()
    .filter((b) => b.obtained && allGymRegistry.some((g) => g.id === b.gymId)).length
  const ribbons = Object.values(store.meta.ribbons || {})
    .flat()
    .filter((r) => allRibbonRegistry.some((reg) => reg.id === r.ribbonId)).length
  return { badges, ribbons }
})

const dialLinks = computed(() => [
  { title: 'Summary', icon: 'mdi-account-outline', to: currentPathBase.value },
  { title: 'Pokémon', icon: 'mdi-pokeball', to: `${currentPathBase.value}/pokemon` },
  { title: 'Achievements', icon: 'mdi-trophy-award', to: `${currentPathBase.value}/achievements` },
  { title: 'Gallery', icon: 'mdi-image-multiple', to: `${currentPathBase.value}/gallery` },
])
</script>
<template>
  <div v-if="store.meta" class="character-page-wrapper" :class="{ 'mobile-view': mobile }">
    <!-- Atmospheric Background Layers -->
    <div
      class="hero-backdrop"
      :class="!isHex ? `bg-${rawColor}` : ''"
      :style="{ ...bgStyle, opacity: theme.global.current.value.dark ? 0.12 : 0.06 }"
    />
    <div class="hero-vignette" />

    <!-- Technical Sidebar (Replaces Ribbons) -->
    <aside v-if="lgAndUp" class="data-sidebar">
      <div class="sidebar-line" :style="borderStyle" />

      <div class="data-point">
        <span class="label">Region</span>
        <span class="value">{{ RegionLabels[store.meta.region] }}</span>
      </div>

      <div class="data-point active">
        <span class="label">Classification</span>
        <span class="value" :style="safeTitleColor">{{
          CharacterTypeLabels[store.meta.category]
        }}</span>
      </div>

      <div class="data-point">
        <span class="label">Registry ID</span>
        <span class="value">#{{ store.meta.id.toUpperCase() }}</span>
      </div>
    </aside>

    <v-container fluid class="pa-0 relative-content">
      <v-container max-width="1440" class="fill-height py-16">
        <v-row :reverse="!lgAndUp" align="center" class="fill-height">
          <v-col
            cols="12"
            lg="7"
            :class="lgAndUp ? 'ps-lg-16' : 'text-center'"
            class="d-flex flex-column"
            style="height: 90vh"
          >
            <header class="character-header mb-16">
              <h1 class="display-name text-capitalize mb-8" :style="safeTitleColor">
                {{ store.meta.name?.full }}
              </h1>

              <div class="classification-bracket" :style="borderStyle">
                <div class="bracket-accent" :style="bgStyle" />
                <div class="bracket-content">
                  <span class="bracket-label">Trainer Classes</span>
                  <span class="bracket-value">
                    {{
                      [store.meta.trainerClass.primary, ...(store.meta.trainerClass.other || [])]
                        .map((cls) => TrainerClassLabels[cls])
                        .join(' • ')
                    }}
                  </span>
                </div>
              </div>
            </header>

            <!-- Marquee Section -->
            <div class="marquee-stack mb-12">
              <!-- Nicknames Track -->
              <div v-if="store.meta.name?.nicknames?.length" class="marquee-group">
                <span class="marquee-label">Nicknames //</span>
                <div class="marquee-track">
                  <div class="marquee-content">
                    <span v-for="n in 4" :key="n">
                      <span v-for="nick in store.meta.name.nicknames" :key="nick" class="nick-item">
                        {{ nick }} <v-icon size="8" class="mx-6 opacity-20">mdi-rhombus</v-icon>
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Titles Track (Using trainerClass values or other meta titles) -->
              <div v-if="store.meta.titles" class="marquee-group">
                <span class="marquee-label">Titles //</span>
                <div class="marquee-track">
                  <div class="marquee-content reverse">
                    <span v-for="n in 4" :key="n">
                      <span
                        v-for="title in [
                          store.meta.titles.primary,
                          ...(store.meta.titles.other || []),
                        ]"
                        :key="title"
                        class="nick-item"
                      >
                        {{ title }}
                        <v-icon size="8" class="mx-6 opacity-20">mdi-slash-forward</v-icon>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="tab-stage custom-scrollbar">
              <v-fade-transition mode="out-in">
                <component
                  :is="currentComponent"
                  :data="store.activeData"
                  :meta="store.meta"
                  :totals="totals"
                  :key="route.params.subpage || 'index'"
                />
              </v-fade-transition>
            </div>
          </v-col>

          <v-col cols="12" lg="5" class="d-flex justify-center align-center">
            <div class="portrait-container">
              <!-- AI Disclosure Badge -->
              <v-fade-transition>
                <div v-if="store.meta.image?.isAi" class="ai-badge">
                  <v-icon size="12" icon="mdi-robot-outline" class="mr-1" />
                  <span>AI</span>
                </div>
              </v-fade-transition>
              <v-img
                :src="
                  getCharImageUrl(
                    store.meta.image?.src ?? 'default.png',
                    store.meta.category === 'oc',
                    store.meta.id,
                    store.meta.category,
                  )
                "
                class="main-portrait"
                contain
              >
                <template #placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="primary" />
                  </v-row>
                </template>
              </v-img>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <CharacterSpeedDial :links="dialLinks" :root-path="currentPathBase" />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,900&family=Outfit:wght@300;800&family=JetBrains+Mono:wght@800&display=swap');

.character-page-wrapper {
  position: relative;
  height: 100vh;
  background: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-surface));
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.hero-backdrop {
  position: absolute;
  inset: 0;
  filter: blur(120px);
  z-index: 0;
}

.hero-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 80% 30%, transparent 0%, rgb(var(--v-theme-surface)) 80%);
  z-index: 1;
}

.relative-content {
  position: relative;
  z-index: 2;
  flex: 1 0 auto;
  overflow: hidden;
  display: flex;
  align-items: center; /* Keeps portrait centered vertically */
}

/* Custom Tactical Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(var(--v-theme-primary), 0.3);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(var(--v-theme-primary), 0.6);
}

/* --- New Technical Sidebar --- */
.data-sidebar {
  position: fixed;
  right: 5vw;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 48px;
  z-index: 10;
  padding-right: 24px;
}

.sidebar-line {
  position: absolute;
  right: 0;
  top: -10%;
  height: 120%;
  border-right: 1px solid;
  opacity: 0.2;
}

.data-point {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-family: 'JetBrains Mono', monospace;
  transition: all 0.3s ease;
}

.data-point .label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 4px;
  opacity: 0.4;
  margin-bottom: 6px;
}

.data-point .value {
  font-size: 1rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgb(var(--v-theme-on-surface));
}

.data-point.active .value {
  font-size: 1.25rem;
  filter: drop-shadow(0 0 8px rgba(var(--v-theme-primary), 0.2));
}

.data-point:hover {
  transform: translateX(-8px);
}

/* --- Typography & Header --- */
.display-name {
  font-family: 'Playfair Display', serif;
  font-size: clamp(3.5rem, 8vw, 6.5rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.02em;
  font-style: italic;
  text-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

.classification-bracket {
  display: flex;
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgb(var(--v-theme-outline), 0.15);
  max-width: fit-content;
  border-radius: 2px;
  box-shadow: 0 15px 45px -10px rgba(0, 0, 0, 0.1);
}

.bracket-accent {
  width: 5px;
}
.bracket-content {
  padding: 18px 32px;
  display: flex;
  flex-direction: column;
}
.bracket-label {
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 3px;
  opacity: 0.6;
  margin-bottom: 4px;
}
.bracket-value {
  font-family: 'Outfit', sans-serif;
  font-size: 1.8rem;
  font-weight: 300;
}

/* --- Marquee Stack --- */
.marquee-stack {
  width: 100%;
  border-top: 1px solid rgb(var(--v-theme-outline), 0.1);
  border-bottom: 1px solid rgb(var(--v-theme-outline), 0.1);
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.marquee-group {
  display: flex;
  align-items: center;
  gap: 20px;
}

.marquee-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  opacity: 0.4;
  white-space: nowrap;
  padding-left: 10px;
}

.marquee-track {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.marquee-content {
  display: inline-block;
  white-space: nowrap;
  animation: marquee-forward 40s linear infinite;
}

.marquee-content.reverse {
  animation: marquee-reverse 50s linear infinite;
}

.nick-item {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 4px;
  opacity: 0.6;
}

@keyframes marquee-forward {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes marquee-reverse {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

/* Subtle fade on edges to prevent harsh clipping */
.marquee-track::before,
.marquee-track::after {
  content: '';
  position: absolute;
  top: 0;
  width: 40px;
  height: 100%;
  z-index: 2;
}

.marquee-track::before {
  left: 0;
  background: linear-gradient(to right, rgb(var(--v-theme-surface)), transparent);
}

.marquee-track::after {
  right: 0;
  background: linear-gradient(to left, rgb(var(--v-theme-surface)), transparent);
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* --- Portrait --- */
.portrait-container {
  position: relative;
  width: 100%;
  max-width: 600px;
  z-index: 2;
  padding-right: 80px;
}
.main-portrait {
  filter: drop-shadow(0 30px 60px rgba(0, 0, 0, 0.15));
}

.tab-stage {
  width: 100%;
  height: 60vh; /* Adjust based on your header size */
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 12px; /* Prevent scrollbar overlap */

  /* Tactical Masking for the content scroll */
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 5%,
    black 90%,
    transparent 100%
  );
  mask-image: linear-gradient(to bottom, transparent 0%, black 5%, black 90%, transparent 100%);
}

/* Apply the custom scrollbar to the tab stage */
.tab-stage::-webkit-scrollbar {
  width: 4px;
}
.tab-stage::-webkit-scrollbar-thumb {
  background: rgba(var(--v-theme-primary), 0.3);
  border-radius: 10px;
}

.ai-badge {
  position: absolute;
  top: 0; /* Start at 0 to see it, then adjust */
  right: 80px; /* Match the padding-right of the container to align with image edge */
  z-index: 99; /* Force it to the very top */
  background: rgba(0, 0, 0, 0.85); /* Slightly darker for contrast */
  backdrop-filter: blur(4px);
  color: #ffca28;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 900;
  border: 1px solid rgba(255, 202, 40, 0.4);
  display: flex;
  align-items: center;
  pointer-events: none; /* Prevents badge from interfering with clicks */
}
</style>
