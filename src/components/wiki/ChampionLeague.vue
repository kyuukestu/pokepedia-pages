<script setup lang="ts">
// components/wiki/EliteFourFloorPlan.vue
import { useTheme } from 'vuetify'
import { Chamber } from '@/types/wiki'

const theme = useTheme()

withDefaults(
  defineProps<{
    chambers?: Chamber[]
    champion: Chamber
    hubIcon?: string
    hubLabel?: string
  }>(),
  {
    hubIcon: 'mdi-crown',
    hubLabel: 'Champion',
  },
)

const getTypeIconPath = (iconName: string) => {
  return new URL(`/src/assets/types/${iconName}`, import.meta.url).href
}
</script>

<template>
  <div class="floorplan" :class="theme.current.value.dark ? 'floorplan--dark' : 'floorplan--light'">
    <div class="fp-grid">
      <RouterLink
        v-for="chamber in chambers"
        :key="chamber.name"
        :to="chamber.to"
        class="fp-chamber"
        :class="`fp-chamber--${['tl', 'tr', 'bl', 'br'][chamber.chamberIndex]}`"
        :style="{ '--accent': chamber.accentColor }"
      >
        <div class="fp-chamber__inner">
          <div class="d-flex justify-space-between align-center w-100">
            <span class="fp-chamber__badge">Chr. {{ chamber.chamberIndex + 1 }}</span>
            <span class="fp-chamber__type">{{ chamber.specialty }}</span>
          </div>

          <div class="fp-chamber__hero">
            <span class="fp-chamber__name">{{ chamber.name }}</span>
            <span class="fp-chamber__accent" />
            <span class="fp-chamber__title">{{ chamber.title }}</span>
          </div>

          <span class="fp-chamber__cue">
            View Profile
            <v-icon size="14">mdi-chevron-right</v-icon>
          </span>
        </div>

        <v-img
          :src="getTypeIconPath(chamber.typeIcon)"
          width="100"
          height="100"
          contain
          class="fp-type-watermark"
        />
        <div class="fp-chamber__tint" :style="{ backgroundColor: chamber.accentColor }"></div>
      </RouterLink>

      <div class="fp-corridor fp-pos-top"><div class="fp-corridor__line" /></div>
      <div class="fp-corridor fp-pos-bot"><div class="fp-corridor__line" /></div>
      <div class="fp-corridor fp-pos-left"><div class="fp-corridor__line" /></div>
      <div class="fp-corridor fp-pos-right"><div class="fp-corridor__line" /></div>

      <div class="fp-hub-wrapper" :style="{ '--champion-color': champion.accentColor }">
        <div class="hub-ring ring-1"></div>
        <div class="hub-ring ring-2"></div>
        <div class="hub-radar"></div>

        <RouterLink :to="champion.to" class="fp-hub">
          <div class="fp-hub__scanline"></div>

          <v-img
            :src="getTypeIconPath(champion.typeIcon)"
            width="40"
            height="40"
            contain
            class="fp-hub__type-icon"
          />

          <span class="fp-hub__label">{{ hubLabel }}</span>
          <div class="fp-hub__status">{{ champion.name }}</div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.floorplan {
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
}

/* 1. Widened Grid Center for larger hub */
.fp-grid {
  display: grid;
  grid-template-columns: 1fr 120px 1fr; /* Was 100px */
  grid-template-rows: 1fr 120px 1fr; /* Was 100px */
  gap: 0;
  aspect-ratio: 1 / 1;
}

/* Chamber Styling (inherited) */
.fp-chamber {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgba(var(--v-border-color), 0.15);
  background: rgb(var(--v-theme-surface));
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 2;
}
.fp-chamber--tl {
  grid-area: 1 / 1;
}
.fp-chamber--tr {
  grid-area: 1 / 3;
}
.fp-chamber--bl {
  grid-area: 3 / 1;
}
.fp-chamber--br {
  grid-area: 3 / 3;
}
.fp-chamber__tint {
  position: absolute;
  inset: 0;
  opacity: 0.1;
  z-index: 0;
  transition: opacity 0.3s ease;
}
.fp-chamber:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.2);
}
.fp-chamber:hover .fp-chamber__tint {
  opacity: 0.25;
}
.fp-chamber__inner {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.fp-chamber__hero {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.fp-type-watermark {
  position: absolute;
  bottom: -10px;
  right: -10px;
  opacity: 0.08;
  z-index: 1;
  filter: grayscale(1) brightness(0.8);
  transition: all 0.4s ease;
}
.fp-chamber:hover .fp-type-watermark {
  opacity: 0.25;
  transform: scale(1.3) rotate(-15deg);
  filter: grayscale(0) brightness(1);
}
.fp-chamber__badge {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: rgb(var(--v-theme-on-surface));
  background: rgba(var(--v-theme-surface-variant), 0.8);
  padding: 1px 8px;
  border-radius: 4px;
  text-transform: uppercase;
}
.fp-chamber__accent {
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background: var(--accent);
  margin: 10px 0;
}
.fp-chamber__name {
  font-size: 32px;
  font-weight: 950;
  line-height: 0.9;
  color: rgb(var(--v-theme-on-surface));
  text-transform: uppercase;
  letter-spacing: -0.04em;
}
.fp-chamber__title {
  font-size: 13px;
  font-weight: 600;
  opacity: 0.8;
  font-style: italic;
  max-width: 180px;
}
.fp-chamber__type {
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  color: var(--accent);
  letter-spacing: 0.12em;
}
.fp-chamber__cue {
  font-size: 11px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  color: var(--accent);
  text-transform: uppercase;
  opacity: 0.6;
}

/* Corridor Logic */
.fp-corridor {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}
.fp-pos-top {
  grid-area: 1 / 2;
}
.fp-pos-bot {
  grid-area: 3 / 2;
}
.fp-pos-left {
  grid-area: 2 / 1;
}
.fp-pos-right {
  grid-area: 2 / 3;
}
.fp-corridor__line {
  background: rgba(var(--v-border-color), 0.25);
}
.fp-pos-top .fp-corridor__line,
.fp-pos-bot .fp-corridor__line {
  width: 3px;
  height: 100%;
}
.fp-pos-left .fp-corridor__line,
.fp-pos-right .fp-corridor__line {
  height: 3px;
  width: 100%;
}

/* THE CHAMPION HUB (SCALED UP) */
.fp-hub-wrapper {
  grid-area: 2 / 2;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
}

.hub-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px dashed var(--champion-color);
  opacity: 0.3;
  pointer-events: none;
}

/* Rings widened to follow new hub size */
.ring-1 {
  width: 160px;
  height: 160px;
  animation: rotate-ring 12s linear infinite;
}
.ring-2 {
  width: 190px;
  height: 190px;
  border: 1px solid var(--champion-color);
  border-left-color: transparent;
  border-right-color: transparent;
  animation: rotate-ring 20s linear infinite reverse;
}

.hub-radar {
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: var(--champion-color);
  opacity: 0;
  pointer-events: none;
  animation: radar-pulse 4s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
}

.fp-hub {
  width: 120px; /* Scaled Up Diameter (Was 100px) */
  height: 120px; /* Scaled Up Diameter (Was 100px) */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 50%;
  background: #08080a;
  border: 3px solid var(--champion-color);
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow:
    0 0 25px rgba(0, 0, 0, 0.9),
    inset 0 0 20px var(--champion-color);
  z-index: 10;
}

.fp-hub:hover {
  transform: scale(1.05) rotate(2deg); /* Subtle hover to emphasize importance */
  border-color: #fff;
  box-shadow: 0 0 45px var(--champion-color);
}

.fp-hub__type-icon {
  filter: drop-shadow(0 0 8px var(--champion-color));
  margin-bottom: 2px;
  transition: transform 0.3s ease;
}

.fp-hub__label {
  font-size: 8px; /* Slightly refined for new size */
  font-weight: 950;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  line-height: 1;
}

.fp-hub__status {
  font-size: 13px; /* Scaled Up Name for high readability */
  color: var(--champion-color);
  text-transform: uppercase;
  font-weight: 950;
  margin-top: 4px;
  max-width: 100px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  animation: status-blink 2s step-end infinite;
}

.fp-hub__scanline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--champion-color);
  opacity: 0.5;
  animation: hub-scan-anim 3s linear infinite;
}

@keyframes rotate-ring {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes radar-pulse {
  0% {
    transform: scale(1);
    opacity: 0.4;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
@keyframes hub-scan-anim {
  0% {
    top: -10%;
  }
  100% {
    top: 110%;
  }
}
@keyframes status-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

@media (max-width: 500px) {
  .fp-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    aspect-ratio: auto;
    gap: 20px;
  }
  .fp-corridor,
  .fp-hub-wrapper {
    display: none;
  }
  .fp-chamber {
    padding: 24px;
    min-height: 180px;
  }
  .fp-chamber__name {
    font-size: 28px;
  }
}
</style>
