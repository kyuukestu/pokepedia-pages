<script setup lang="ts">
import type { CharacterMeta } from '@/types/character'
import { TrainerClassLabels, type TrainerClass } from '@/types/character'
import { RegionLabels } from '@/types/region'
import { CoordinatorRankLabels, WCSRankLabels, RangerRankLabels } from '@/types/league'

defineProps<{ data: CharacterMeta }>()

const formatGender = (g: string) => g.charAt(0).toUpperCase() + g.slice(1)

function getTrainerClassIcon(cls: TrainerClass | string): string {
  const map: Record<string, string> = {
    battler: 'mdi-pokemon-go',
    breeder: 'mdi-egg-kinden',
    researcher: 'mdi-microscope',
    coordinator: 'mdi-seal-variant',
    athlete: 'mdi-basketball',
    ranger: 'mdi-nature-people',
    performer: 'mdi-key-outline',
  }
  return map[cls] ?? 'mdi-pokeball'
}
</script>

<template>
  <div v-if="data.name?.short?.length" class="alias-footer">
    <div class="alias-header px-4 pt-2">
      <div
        class="text-tiny text-uppercase font-weight-black opacity-40 letter-spacing-2 d-flex align-center gap-2"
      >
        <v-icon size="10" color="primary">mdi-record-rec</v-icon>
        Nickname(s)
      </div>
    </div>

    <div class="ticker-wrap pa-2">
      <div class="ticker">
        <div class="ticker__item" v-for="n in 2" :key="n">
          <span v-for="alias in data.name.short" :key="alias" class="alias-chip">
            {{ alias }}
          </span>
        </div>
      </div>
    </div>
  </div>

  <v-card variant="outlined" border rounded="xl" class="bio-card overflow-hidden docked">
    <div class="pa-4 pb-2 d-flex align-center justify-space-between">
      <div class="text-overline font-weight-black letter-spacing-2 opacity-60">Profile</div>
      <v-icon size="20" class="opacity-30">mdi-dna</v-icon>
    </div>

    <v-divider class="opacity-10 mx-4" />

    <div class="pa-4">
      <v-row no-gutters class="mb-4">
        <v-col cols="6" class="border-right border-bottom pa-3">
          <div class="bio-label">Origin</div>
          <div class="bio-value">{{ RegionLabels[data.region] ?? data.region }}</div>
        </v-col>
        <v-col cols="6" class="border-bottom pa-3">
          <div class="bio-label">Age</div>
          <div class="bio-value">{{ data.age ?? '—' }}</div>
        </v-col>
        <v-col cols="6" class="border-right pa-3">
          <div class="bio-label">Gender</div>
          <div class="bio-value">{{ data.gender ? formatGender(data.gender) : '—' }}</div>
        </v-col>
        <v-col cols="6" class="pa-3">
          <div class="bio-label">Class</div>
          <div class="bio-value d-flex align-center">
            <v-tooltip location="right" offset="10">
              <template #activator="{ props }">
                <v-icon v-bind="props" size="20" class="trainer-class-icon">
                  {{ getTrainerClassIcon(data.trainerClass.primary) }}
                </v-icon>
              </template>
              <span>{{ TrainerClassLabels[data.trainerClass.primary] }} (Primary)</span>
            </v-tooltip>

            <template v-if="data.trainerClass.other?.length">
              <v-tooltip location="top" offset="10">
                <template #activator="{ props }">
                  <v-icon v-bind="props" size="16" class="ms-1 opacity-40">
                    mdi-plus-box-multiple-outline
                  </v-icon>
                </template>
                <div class="text-caption">
                  <div class="font-weight-bold mb-1">Additional Classes:</div>
                  <div v-for="cls in data.trainerClass.other" :key="cls">
                    • {{ TrainerClassLabels[cls] ?? cls }}
                  </div>
                </div>
              </v-tooltip>
            </template>
          </div>
        </v-col>
      </v-row>

      <div class="ranks-stack gap-2">
        <div v-if="data.wcsRank" class="rank-row">
          <v-icon size="14" color="primary" class="me-2">mdi-tournament</v-icon>
          <span class="text-caption font-weight-bold">WCS: {{ WCSRankLabels[data.wcsRank] }}</span>
        </div>
        <div v-if="data.coordinatorRank" class="rank-row">
          <v-icon size="14" color="pink" class="me-2">mdi-star-circle</v-icon>
          <span class="text-caption font-weight-bold"
            >Contest: {{ CoordinatorRankLabels[data.coordinatorRank] }}</span
          >
        </div>
        <div v-if="data.rangerRank" class="rank-row">
          <v-icon size="14" color="teal" class="me-2">mdi-shield-account</v-icon>
          <span class="text-caption font-weight-bold"
            >Ranger: {{ RangerRankLabels[data.rangerRank] }}</span
          >
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
/* ── Alias Footer Container ───────────────────────────────────── */
.alias-footer {
  border-top: 1px solid rgba(var(--v-border-color), 0.2);
  overflow: hidden;
}

/* ── Ticker Mechanics ─────────────────────────────────────────── */
.ticker-wrap {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
}

.ticker {
  display: inline-block;
  animation: marquee 20s linear infinite;
  will-change: transform;
}

.ticker__item {
  display: inline-flex;
  align-items: center;
}

.alias-chip {
  font-family: 'Roboto Mono', monospace; /* Monospaced for that terminal look */
  font-size: 0.7rem;
  font-weight: 600;
  color: rgb(var(--v-theme-primary));
  text-transform: uppercase;
  padding: 0 20px; /* Space between aliases */
  position: relative;
}

/* Add a separator character between items */
.alias-chip::after {
  content: '::';
  position: absolute;
  right: -5px;
  opacity: 0.3;
}

/* ── Animation ────────────────────────────────────────────────── */
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Pause on hover so the user can actually read a specific name */
.ticker-wrap:hover .ticker {
  animation-play-state: paused;
}

.bio-card {
  background: rgba(var(--v-theme-surface), 0.5) !important;
  backdrop-filter: blur(8px);
}

.bio-label {
  font-size: 0.65rem;
  font-weight: 900;
  text-transform: uppercase;
  color: rgb(var(--v-theme-primary));
  letter-spacing: 0.5px;
  margin-bottom: 2px;
}

.docked {
  /* Remove internal card borders/shadows so it feels like one piece */
  border: none !important;
  background: transparent !important;
  /* Top-border creates a subtle separation from the name */
  border-top: 1px solid rgba(var(--v-border-color), 0.1) !important;
  border-radius: 0 !important;
  padding: 12px 16px 16px 16px;
}

.bio-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
}

.border-right {
  border-right: 1px solid rgba(var(--v-border-color), 0.1);
}
.border-bottom {
  border-bottom: 1px solid rgba(var(--v-border-color), 0.1);
}

.rank-row {
  background: rgba(var(--v-theme-on-surface), 0.03);
  padding: 6px 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
}

.alias-footer {
  background: rgba(var(--v-theme-on-surface), 0.05);
  border-top: 1px dashed rgba(var(--v-border-color), 0.2);
}

.text-tiny {
  font-size: 0.6rem;
}
.letter-spacing-2 {
  letter-spacing: 2px !important;
}

.trainer-class-icon {
  background: rgba(var(--v-theme-primary), 0.1);
  padding: 4px;
  border-radius: 4px;
  border: 1px solid rgba(var(--v-theme-primary), 0.2);
}

/* Ensure tooltips are readable */
:deep(.v-overlay__content) {
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.75rem !important;
}
</style>
