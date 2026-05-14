<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCharacterStore } from '@/stores/useCharacterStore'
import type { ImageDetails } from '@/types/character'
import { getCharImageUrl } from '@/utils/path-resolvers'

const store = useCharacterStore()
const overlay = ref(false)
const selectedImage = ref<ImageDetails | null>(null)

// Cast activeData as ImageDetails array
const images = computed(() => (store.activeData as ImageDetails[]) || [])

const openLightbox = (image: ImageDetails) => {
  selectedImage.value = image
  overlay.value = true
}

const resolveImg = (src: string) => {
  return getCharImageUrl(src, store.meta?.category === 'oc', store.meta?.id, store.meta?.region)
}
</script>
<template>
  <v-container fluid class="pa-4">
    <!-- Use v-masonry or a simple column count approach -->
    <div class="gallery-masonry">
      <div v-for="(image, index) in images" :key="index" class="masonry-item">
        <v-card
          class="gallery-dossier-card"
          @click="openLightbox(image)"
          :style="{
            '--img-pos': image.config?.position ?? 'center center',
            '--img-scale': image.config?.scale ?? '1',
          }"
        >
          <!-- Removed fixed aspect-ratio and height -->
          <v-img :src="resolveImg(image.src)" class="gallery-image-fluid" width="100%">
            <!-- AI Disclosure Badge -->
            <div v-if="image.isAi" class="ai-badge">
              <v-icon size="12" icon="mdi-robot-outline" class="mr-1" />
              <span>AI</span>
            </div>

            <!-- Type Label Overlay -->
            <div v-if="image.type" class="type-overlay pa-3">
              <span class="type-text">{{ image.type }}</span>
            </div>

            <template #placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
                style="min-height: 200px"
              >
                <v-progress-circular indeterminate color="primary" size="20" />
              </v-row>
            </template>
          </v-img>
        </v-card>
      </div>
    </div>

    <!-- ... (v-overlay code remains the same) ... -->
  </v-container>
</template>

<style scoped>
/* Masonry Logic using CSS Columns */
.gallery-masonry {
  column-count: 4;
  column-gap: 16px;
  width: 100%;
}

/* Responsive columns */
@media (max-width: 1200px) {
  .gallery-masonry {
    column-count: 3;
  }
}
@media (max-width: 900px) {
  .gallery-masonry {
    column-count: 2;
  }
}
@media (max-width: 600px) {
  .gallery-masonry {
    column-count: 1;
  }
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 16px; /* Vertical gap */
}

.gallery-dossier-card {
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background: transparent;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.gallery-dossier-card:hover {
  border-color: rgba(var(--v-theme-primary), 0.8) !important;
  transform: translateY(-4px);
}

/* Image styles - keeping your scaling logic but removing height lock */
:deep(.gallery-image-fluid .v-img__img) {
  object-position: var(--img-pos) !important;
  transform: scale(var(--img-scale));
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) !important;
}

.gallery-dossier-card:hover :deep(.v-img__img) {
  transform: scale(calc(var(--img-scale) * 1.05)) !important;
}

/* Overlays */
.ai-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  color: #ffca28;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 900;
  border: 1px solid rgba(255, 202, 40, 0.3);
}

.type-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-dossier-card:hover .type-overlay {
  opacity: 1;
}

.type-text {
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #fff;
}
</style>
