<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  badges?: number | null
  ribbons?: number | null
  to: string
}>()

const hasData = computed(() => props.badges != null || props.ribbons != null)
</script>

<template>
  <RouterLink v-if="hasData" :to="to" class="ach-banner">
    <div class="ach-banner__inner">
      <div class="ach-banner__icon-wrap">
        <div class="ach-banner__icon-container">
          <v-icon size="26" color="amber-darken-2">mdi-trophy-variant</v-icon>
        </div>
      </div>

      <div class="ach-banner__content">
        <div class="ach-banner__header">
          <span class="ach-banner__top-label">Record History</span>
        </div>

        <div class="ach-banner__main">
          <h3 class="ach-banner__title">Achievements</h3>

          <div class="ach-banner__stats">
            <span v-if="badges != null" class="stat-chip stat-chip--badges">
              <v-icon size="12" class="me-1">mdi-shield-check</v-icon>
              {{ badges }} <span class="ms-1 opacity-70">Badges</span>
            </span>

            <span v-if="ribbons != null" class="stat-chip stat-chip--ribbons">
              <v-icon size="12" class="me-1">mdi-ribbon</v-icon>
              {{ ribbons }} <span class="ms-1 opacity-70">Ribbons</span>
            </span>
          </div>
        </div>
      </div>

      <v-icon size="18" class="ach-banner__arrow">mdi-chevron-right</v-icon>

      <v-icon class="ach-banner__watermark">mdi-medal-outline</v-icon>
    </div>
  </RouterLink>
</template>

<style scoped>
.ach-banner {
  position: relative;
  display: flex;
  overflow: hidden;
  border-radius: 16px;
  text-decoration: none; /* Reset for RouterLink */
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-surface-bright), 0.7) 0%,
    rgba(var(--v-theme-surface-variant), 0.3) 100%
  );
  border: 1px solid rgba(var(--v-border-color), 0.12);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: inset 4px 0 0 0 #ffb300; /* Amber Accent */
}

.ach-banner:hover {
  transform: translateY(-2px);
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-surface-bright), 0.9) 0%,
    rgba(var(--v-theme-surface-variant), 0.4) 100%
  );
  box-shadow:
    inset 6px 0 0 0 #ffb300,
    0 6px 16px rgba(0, 0, 0, 0.1);
}

.ach-banner__inner {
  display: flex;
  align-items: center;
  padding: 18px 20px;
  gap: 18px;
  flex: 1;
  z-index: 1;
}

.ach-banner__icon-container {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(var(--v-theme-surface));
  border-radius: 14px;
  border: 1px solid rgba(var(--v-border-color), 0.08);
}

.ach-banner__content {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.ach-banner__top-label {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #ffb300;
  margin-bottom: 2px;
  display: block;
}

.ach-banner__title {
  font-size: 18px;
  font-weight: 900;
  color: rgb(var(--v-theme-on-surface));
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.ach-banner__stats {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.stat-chip {
  display: inline-flex;
  align-items: center;
  font-size: 10px;
  font-weight: 800;
  padding: 2px 10px;
  border-radius: 6px;
  text-transform: uppercase;
  background: rgba(var(--v-theme-on-surface), 0.05);
  border: 1px solid rgba(var(--v-border-color), 0.1);
  color: rgb(var(--v-theme-on-surface));
}

.stat-chip--badges {
  border-left: 3px solid #1976d2;
}
.stat-chip--ribbons {
  border-left: 3px solid #e91e63;
}

.ach-banner__arrow {
  opacity: 0.2;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.ach-banner:hover .ach-banner__arrow {
  opacity: 1;
  transform: translateX(4px);
}

.ach-banner__watermark {
  position: absolute;
  right: -10px;
  bottom: -15px;
  font-size: 90px !important;
  opacity: 0.03;
  transform: rotate(-15deg);
  pointer-events: none;
}

.v-theme--dark .ach-banner {
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-surface-light), 0.4) 0%,
    rgba(var(--v-theme-surface), 0.2) 100%
  );
}
</style>
