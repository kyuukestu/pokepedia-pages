<script setup lang="ts">
import { computed } from 'vue'
import { allGymRegistry } from '@/data/gym-registry'
import type { LeagueRole } from '@/types/league'
import { LeagueTitleLabels } from '@/types/league'

// Extend the role to include the gymId link
type LeagueRoleWithType = LeagueRole & {
  gymId?: string
  status?: 'active' | 'former'
}

const props = defineProps<{
  role: LeagueRoleWithType
}>()

// ── Registry Lookup ──────────────────────────────────────────────────────────
const gymData = computed(() => {
  if (!props.role.gymId) return null
  return allGymRegistry.find((g) => g.id === props.role.gymId)
})

// ── Data Derived from Registry ───────────────────────────────────────────────
const badgeImg = computed(() => gymData.value?.badgeImg || null)

const detail = computed(() => {
  const parts: string[] = []

  // 1. Badge Name (from registry)
  if (gymData.value?.badgeName) {
    parts.push(`${gymData.value.badgeName} Badge`)
  }

  // 2. Specialty Type (from the active leader in registry)
  const activeLeader = gymData.value?.leaders.find((l) => l.isActive) || gymData.value?.leaders[0]
  if (activeLeader?.specialty) {
    const type = activeLeader.specialty
    parts.push(`${type.charAt(0).toUpperCase() + type.slice(1)}-type`)
  }

  // 3. City (optional addition for flavor)
  if (gymData.value?.city) {
    parts.push(gymData.value.city)
  }

  return parts.join(' • ')
})

const isFormer = computed(() => props.role.status === 'former')
const label = computed(() => LeagueTitleLabels[props.role.title] ?? props.role.title)
</script>
<template>
  <div class="lr-banner" :class="{ 'lr-banner--former': isFormer }">
    <div class="lr-banner__inner">
      <div class="lr-banner__badge-wrap">
        <div class="lr-banner__badge-container">
          <v-img v-if="badgeImg" :src="badgeImg" class="lr-badge-img" contain />
          <v-icon v-else size="22" color="primary">mdi-shield-seal</v-icon>
        </div>
      </div>

      <div class="lr-banner__content">
        <div class="lr-banner__header">
          <span class="lr-banner__top-label">Official League Record</span>
          <span v-if="isFormer" class="lr-banner__status-tag">Inactive</span>
        </div>

        <div class="lr-banner__main">
          <h3 class="lr-banner__title">{{ label }}</h3>
          <p v-if="detail" class="lr-banner__subtitle">{{ detail }}</p>
        </div>
      </div>

      <v-icon class="lr-banner__watermark">
        {{ gymData ? 'mdi-medal' : 'mdi-pokemon-go' }}
      </v-icon>
    </div>
  </div>
</template>

<style scoped>
.lr-banner {
  position: relative;
  display: flex;
  overflow: hidden;
  border-radius: 16px;
  /* Glassmorphism background */
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-surface-bright), 0.7) 0%,
    rgba(var(--v-theme-surface-variant), 0.3) 100%
  );
  border: 1px solid rgba(var(--v-border-color), 0.12);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  /* Left accent bar via box-shadow */
  box-shadow: inset 4px 0 0 0 rgb(var(--v-theme-error));
}

.lr-banner--former {
  opacity: 0.7;
  filter: grayscale(0.4);
  box-shadow: inset 4px 0 0 0 rgba(var(--v-theme-on-surface), 0.2);
}

.lr-banner:hover {
  transform: translateY(-2px);
  box-shadow:
    inset 4px 0 0 0 rgb(var(--v-theme-error)),
    0 6px 16px rgba(0, 0, 0, 0.1);
}

.lr-banner__inner {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  gap: 18px;
  flex: 1;
  z-index: 1;
}

/* ── Badge Visuals ────────────────────────────────────────────── */
.lr-banner__badge-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.lr-banner__badge-container {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(var(--v-theme-surface));
  border-radius: 14px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(var(--v-border-color), 0.08);
}

.lr-badge-img {
  width: 38px;
  height: 38px;
  object-fit: contain;
  /* Gives the badge a slight "metal" pop */
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

/* ── Typography ────────────────────────────────────────────────── */
.lr-banner__content {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.lr-banner__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2px;
}

.lr-banner__top-label {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgb(var(--v-theme-error));
}

.lr-banner__title {
  font-size: 18px;
  font-weight: 900;
  color: rgb(var(--v-theme-on-surface));
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.lr-banner__subtitle {
  font-size: 12px;
  font-weight: 500;
  margin-top: 4px;
  opacity: 0.8;
}

/* ── Status Tag ────────────────────────────────────────────────── */
.lr-banner__status-tag {
  font-size: 9px;
  font-weight: 900;
  padding: 2px 8px;
  border-radius: 6px;
  background: rgba(var(--v-theme-on-surface), 0.08);
  text-transform: uppercase;
}

/* ── Background Decoration ─────────────────────────────────────── */
.lr-banner__watermark {
  position: absolute;
  right: -10px;
  bottom: -15px;
  font-size: 80px !important;
  opacity: 0.03;
  transform: rotate(-15deg);
  pointer-events: none;
}

/* Dark mode overrides for deeper contrast */
.v-theme--dark .lr-banner {
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-surface-light), 0.4) 0%,
    rgba(var(--v-theme-surface), 0.2) 100%
  );
}
</style>
