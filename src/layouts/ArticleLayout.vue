<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Article } from '@/types/kenn'
defineProps<{
  meta: Article
  fluid?: boolean
}>()

const router = useRouter()
const isSpeedDialOpen = ref(false)

// Helper function to check if a string is an image path/URL or an icon name
const isImageUrl = (iconOrPath?: string) => {
  if (!iconOrPath) return false
  return iconOrPath.startsWith('http') || iconOrPath.startsWith('/') || iconOrPath.includes('.') || iconOrPath.startsWith('data:')
}
</script>

<template>
  <div class="article-layout pa-4 pa-md-8">
    <div :class="['article-wrapper', { 'article-wrapper--fluid': fluid }]">
      
      <!-- Top Action Bar -->
      <div class="d-flex align-center justify-space-between mb-4">
        <v-btn
          variant="text"
          density="comfortable"
          color="amber-lighten-2"
          prepend-icon="mdi-arrow-left"
          class="font-serif text-none"
          @click="router.back()"
        >
          Back to Directory
        </v-btn>

        <div class="d-flex align-center ga-2 text-caption font-mono text-medium-emphasis">
          <span>ID: {{ meta.id }}</span>
          <template v-if="meta.lastUpdated">
            <span>•</span>
            <span class="text-amber-lighten-3">Updated: {{ meta.lastUpdated }}</span>
          </template>
        </div>
      </div>

      <!-- Main Header Dossier Card -->
      <header class="notebook-header mb-8 overflow-hidden">
        <!-- Optional Cover Image -->
        <v-img
          v-if="meta.image"
          :src="meta.image"
          height="220"
          cover
          class="article-cover-img"
        >
          <template #placeholder>
            <div class="d-flex align-center justify-center fill-height bg-grey-darken-4">
              <v-progress-circular indeterminate color="amber-lighten-2" />
            </div>
          </template>
        </v-img>

        <div class="pa-6">
          <!-- Metadata Chips Row -->
          <div class="d-flex flex-wrap align-center ga-2 mb-3">
            <v-chip
              size="x-small"
              :color="meta.color || 'amber-lighten-2'"
              variant="flat"
              class="font-weight-bold text-uppercase"
            >
              <v-icon v-if="meta.icon" start size="x-small">{{ meta.icon }}</v-icon>
              {{ meta.category }}
            </v-chip>

            <v-chip
              v-if="meta.loreCategory"
              size="x-small"
              color="amber-lighten-2"
              variant="outlined"
              class="text-uppercase font-weight-bold"
            >
              {{ meta.loreCategory }}
            </v-chip>

            <!-- Region Chips -->
            <template v-if="meta.regions && meta.regions.length">
              <span class="text-medium-emphasis opacity-50">|</span>
              <v-chip
                v-for="region in meta.regions"
                :key="region"
                size="x-small"
                color="amber-lighten-3"
                variant="tonal"
              >
                <v-icon start size="x-small">mdi-map-marker</v-icon>
                {{ region }}
              </v-chip>
            </template>
          </div>

          <!-- Title -->
          <h1 class="text-h3 font-weight-bold font-serif text-amber-lighten-2 mb-3">
            {{ meta.title }}
          </h1>

          <!-- Summary -->
          <p class="text-subtitle-1 text-medium-emphasis font-serif font-italic mb-4">
            {{ meta.summary }}
          </p>

          <v-divider class="notebook-divider mb-4" />

          <!-- Author, Date, Tags Footer Bar -->
          <div class="d-flex flex-wrap align-center justify-space-between ga-3">
            <div class="d-flex align-center ga-3 text-caption text-medium-emphasis font-serif">
              <span>By <strong class="text-amber-lighten-2">{{ meta.author }}</strong></span>
              <span>•</span>
              <span>Published {{ meta.date }}</span>
            </div>

            <!-- Tags -->
            <div v-if="meta.tags && meta.tags.length" class="d-flex flex-wrap align-center ga-1">
              <v-chip
                v-for="tag in meta.tags"
                :key="tag"
                size="x-small"
                variant="outlined"
                color="amber-lighten-4"
                class="opacity-80"
              >
                #{{ tag }}
              </v-chip>
            </div>
          </div>
        </div>
      </header>

      <!-- Optional Trainer Tiers Section -->
      <section v-if="meta.trainerTiers && meta.trainerTiers.length" class="mb-8">
        <v-card variant="outlined" class="notebook-card pa-4">
          <div class="d-flex align-center ga-2 mb-3">
            <v-icon color="amber-lighten-2" size="small">mdi-account-group-outline</v-icon>
            <span class="font-serif font-weight-bold text-caption text-uppercase text-amber-lighten-2">
              Trainer Roster & Classification
            </span>
          </div>

          <v-row density="compact">
            <v-col
              v-for="(tier, idx) in meta.trainerTiers"
              :key="idx"
              cols="12"
              sm="6"
              md="4"
            >
              <div class="pa-2 border-dashed border-rounded bg-black-transparent">
                <div class="text-caption font-weight-bold text-amber-lighten-2">
                  {{ tier.name || `Tier ${idx + 1}` }}
                </div>
                <div class="text-body-2 text-medium-emphasis">
                  {{ tier.description || tier }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </section>

      <!-- Main Content Slot -->
      <main class="article-body">
        <slot />
      </main>

      <!-- Layout Footer -->
      <footer class="article-footer mt-12">
        <v-divider class="notebook-divider mb-6" />
        <div class="d-flex align-center justify-space-between">
          <span class="text-caption text-medium-emphasis font-serif">
            {{ meta.author }} • Official Archive Record {{ meta.id }}
          </span>
          <v-btn
            variant="text"
            size="small"
            color="amber-lighten-2"
            prepend-icon="mdi-chevron-left"
            @click="router.back()"
          >
            Back to Top
          </v-btn>
        </div>
      </footer>

    </div>

    <!-- Fixed Floating Container -->
    <div
      v-if="meta.links && meta.links.length"
      class="persistent-speed-dial-container"
    >
      <!-- Absolutely Positioned Floating Header -->
      <transition name="fade">
        <div v-if="!isSpeedDialOpen" class="persistent-label-chip font-serif border-dashed">
          Related Links
        </div>
      </transition>

      <v-speed-dial
        v-model="isSpeedDialOpen"
        location="top center"
        transition="slide-y-reverse-transition"
      >
        <!-- Activator: Main Base Speed Dial Button (64px) -->
        <template #activator="{ props: speedDialProps }">
          <v-btn
            v-bind="speedDialProps"
            color="amber-lighten-2"
            icon
            width="64"
            height="64"
            elevation="8"
            class="speed-dial-trigger"
          >
            <v-icon size="28">
              {{ isSpeedDialOpen ? 'mdi-close' : 'mdi-link-variant' }}
            </v-icon>
          </v-btn>
        </template>

        <!-- Stacked Action Items -->
        <div class="d-flex flex-column ga-3 mb-3 align-center">
          <v-tooltip
            v-for="link in meta.links"
            :key="link.link"
            location="left"
            open-delay="80"
            close-delay="80"
          >
            <template #activator="{ props: tooltipProps }">
              <v-btn
                v-bind="tooltipProps"
                :href="link.link"
                target="_blank"
                color="grey-darken-4"
                icon
                width="52"
                height="52"
                elevation="6"
                class="speed-dial-circle-item border-dashed"
              >
                <!-- Render Image / Custom Icon Direct Image View -->
                <v-img
                  v-if="isImageUrl(link.icon || link.image)"
                  :src="link.icon || link.image"
                  width="28"
                  height="28"
                  contain
                  class="action-icon-img"
                />

                <!-- Fallback Material Design Icon -->
                <v-icon
                  v-else
                  size="26"
                  color="amber-lighten-2"
                >
                  {{ link.icon || 'mdi-link' }}
                </v-icon>
              </v-btn>
            </template>

            <span class="font-serif text-caption text-amber-lighten-2">{{ link.label }}</span>
          </v-tooltip>
        </div>
      </v-speed-dial>
    </div>
  </div>
</template>

<style scoped>
.font-serif {
  font-family: 'Georgia', serif !important;
}

.font-mono {
  font-family: monospace !important;
}

.article-layout {
  min-height: 100vh;
  background-color: #121212;
  color: #e0d6cc;
}

.article-wrapper {
  max-width: 960px;
  margin: 0 auto;
  transition: max-width 0.3s ease;
}

.article-wrapper--fluid {
  max-width: 1280px;
}

.notebook-header {
  background-color: #1a1a1a;
  border: 1px dashed #3d332a;
  border-radius: 4px;
}

.article-cover-img {
  border-bottom: 1px dashed #3d332a;
}

.notebook-card {
  background-color: #1a1a1a !important;
  border: 1px dashed #3d332a !important;
  border-radius: 4px;
}

.notebook-divider {
  border-color: #3a342c !important;
  opacity: 1 !important;
}

.border-dashed {
  border: 1px dashed #3d332a !important;
}

.border-rounded {
  border-radius: 4px;
}

.bg-black-transparent {
  background-color: rgba(0, 0, 0, 0.2);
}

/* Fixed Bottom-Right Anchor Container */
.persistent-speed-dial-container {
  position: fixed !important;
  bottom: 28px;
  right: 28px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Absolute Floating Badge to prevent button position jumps */
.persistent-label-chip {
  position: absolute;
  top: -28px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1a1a1a;
  color: #fcd34d;
  padding: 3px 10px;
  border-radius: 12px;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
  pointer-events: none;
  font-size: 11px;
}

.speed-dial-trigger {
  color: #121212 !important;
  background-color: #fcd34d !important;
}

.speed-dial-circle-item {
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.6) !important;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.speed-dial-circle-item:hover {
  transform: scale(1.08);
  background-color: #2a2a2a !important;
}

.action-icon-img {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Simple fade transition for persistent label */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
