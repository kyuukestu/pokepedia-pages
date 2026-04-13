<script setup lang="ts">
// components/rp/RpCard.vue

interface RP {
  id: number
  title: string
  tagline: string
  description: string
  image: string
  aspectratio: string
  icon: string
  color: string
  to: string
}

defineProps<{
  rp: RP
}>()
</script>

<template>
  <v-card
    class="rp-card"
    :to="rp.to"
    flat
    overflow-hidden
    :style="{ '--rp-color': rp.color, 'aspect-ratio': rp.aspectratio }"
  >
    <v-img
      :src="rp.image"
      cover
      class="rp-card__image"
      gradient="to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%"
    >
      <div class="rp-card__content d-flex flex-column justify-end fill-height">
        <div class="rp-card__info-box">
          <div class="d-flex align-center gap-3 mb-2">
            <div class="rp-card__icon-wrap">
              <v-icon :icon="rp.icon" size="20" />
            </div>
            <div>
              <h3 class="rp-card__title">{{ rp.title }}</h3>
              <p class="rp-card__tagline">{{ rp.tagline }}</p>
            </div>
          </div>

          <p class="rp-card__description line-clamp-2">
            {{ rp.description }}
          </p>

          <div class="rp-card__footer mt-3">
            <v-btn
              variant="tonal"
              size="small"
              class="font-weight-bold"
              :color="rp.color"
              rounded="lg"
            >
              Enter Sandbox
              <v-icon end icon="mdi-arrow-right" size="14" />
            </v-btn>
          </div>
        </div>
      </div>
    </v-img>

    <div class="rp-card__border" />
  </v-card>
</template>

<style scoped>
.rp-card {
  position: relative;
  border-radius: 20px !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: #111; /* Fallback */
}

.rp-card:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4) !important;
}

.rp-card__image {
  transition: transform 0.8s ease;
}

.rp-card:hover .rp-card__image {
  transform: scale(1.05);
}

.rp-card__content {
  padding: 24px;
  color: white;
}

/* Glass box for info */
.rp-card__info-box {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: border-color 0.3s ease;
}

.rp-card:hover .rp-card__info-box {
  border-color: var(--rp-color);
}

.rp-card__icon-wrap {
  background: var(--rp-color);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.rp-card__title {
  font-size: 20px;
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.rp-card__tagline {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.9;
  color: var(--rp-color);
  margin-top: 2px;
}

.rp-card__description {
  font-size: 13px;
  line-height: 1.5;
  opacity: 0.8;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Accent Glow Border */
.rp-card__border {
  position: absolute;
  inset: 0;
  border-radius: 20px;
  pointer-events: none;
  border: 2px solid transparent;
  transition: border-color 0.3s ease;
}

.rp-card:hover .rp-card__border {
  border-color: var(--rp-color);
  opacity: 0.5;
}

/* Fix for aspect-ratio layout */
.v-img :deep(.v-img__img) {
  object-position: center 20%; /* Prioritizes art focus */
}
</style>
