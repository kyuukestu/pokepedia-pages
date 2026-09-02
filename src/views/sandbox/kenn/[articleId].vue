<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getImageUrl } from '@/utils/path-resolvers'
import { articles } from '@/data/kenn'
import type { Article } from '@/types/kenn'

const route = useRoute('/sandbox/kenn/[articleId]')

const article = computed(() => articles.find((a) => a.id === route.params.articleId))

// Helper: Format region text display (Ensures upper case output)
function formatRegionDisplay(article: Article): string {
  const regions = article.regions ?? []

  if (regions.length === 0) return 'GLOBAL'
  if (regions.length === 1) return regions[0].toUpperCase()
  return 'MULTIPLE'
}

// Resolver for dynamic content block tags
const resolveBlockComponent = (type: string) => {
  switch (type) {
    case 'paragraph':
      return 'p'
    case 'subheading':
      return 'h3'
    case 'quote':
      return 'blockquote'
    case 'list':
      return 'ul'
    case 'label':
      return 'div'
    default:
      return 'div'
  }
}

const getBlockStyle = (block: any) => {
  const styles: Record<string, string> = {}

  if (block.type === 'quote') {
    styles.borderLeftColor = block.color || 'rgb(var(--v-theme-success))'
  } else if (block.type === 'subheading' || block.type === 'label' || block.type === 'paragraph') {
    if (block.color && (block.color.startsWith('#') || block.color.startsWith('rgb'))) {
      styles.color = block.color
    }
  }

  return styles
}

const getBlockClass = (block: any) => {
  const classes = [
    block.type === 'paragraph' ? 'text-body-1 font-serif mb-6 leading-relaxed' : '',
    block.type === 'subheading' ? 'text-h5 font-serif font-weight-bold tracking-tight mt-8 mb-4 article-subheading' : '',
    block.type === 'quote' ? 'notebook-quote-block pa-6 my-8 rounded-r-lg font-serif' : '',
    block.type === 'list' ? 'custom-notebook-list ps-0 mb-6 font-serif' : '',
    block.type === 'label' ? 'notebook-label-container my-6 font-serif text-caption font-weight-bold text-uppercase' : '',
  ]

  if (block.color && !block.color.startsWith('#') && !block.color.startsWith('rgb')) {
    classes.push(`text-${block.color}`)
  }

  return classes
}
</script>

<template>
  <div v-if="article" class="kenn-article-detail-page">
    <v-container max-width="1100" class="py-10">
      
      <!-- Top Action Navigation -->
      <div class="d-flex align-center justify-space-between mb-6">
        <v-btn
          variant="tonal"
          color="success"
          size="small"
          to="/sandbox/kenn"
          prepend-icon="mdi-arrow-left"
          class="font-serif text-none"
        >
          Back to Field Notes
        </v-btn>

        <span class="text-caption font-serif text-medium-emphasis">
          ARTICLE ID: <strong class="text-success">{{ article.id }}</strong>
        </span>
      </div>

      <!-- Main Notebook Article Paper -->
      <v-card variant="flat" class="notebook-paper-card pa-6 pa-md-10">
        
        <!-- Header Section -->
        <header class="mb-8 border-b notebook-header-divider pb-8">
          <div class="d-flex align-center flex-wrap ga-2 mb-4">
            <v-chip
              color="success"
              variant="tonal"
              size="small"
              class="font-serif font-weight-bold text-uppercase"
            >
              {{ article.category }}
              <template v-if="article.category === 'LORE' && article.loreCategory">
                / {{ article.loreCategory.toUpperCase() }}
              </template>
            </v-chip>

            <!-- Region Tag -->
            <v-tooltip
              v-if="article.regions && article.regions.length > 0"
              location="top"
              :disabled="article.regions.length <= 1"
              open-on-hover
            >
              <template #activator="{ props: tooltipProps }">
                <span
                  v-bind="tooltipProps"
                  class="text-caption font-serif font-weight-bold d-inline-flex align-center text-medium-emphasis region-tag px-2 py-0-5 rounded text-uppercase"
                >
                  <v-icon size="x-small" color="success" class="me-1">
                    mdi-map-marker-outline
                  </v-icon>
                  {{ formatRegionDisplay(article) }}
                  <v-icon v-if="article.regions.length > 1" size="10" class="ms-1">
                    mdi-information-outline
                  </v-icon>
                </span>
              </template>
              
              <div class="font-serif text-caption pa-1">
                <div class="font-weight-bold mb-1 border-b pb-1 text-success text-uppercase">
                  TARGET REGIONS ({{ article.regions.length }})
                </div>
                <div v-for="reg in article.regions" :key="reg" class="d-flex align-center py-0-5 text-uppercase">
                  <v-icon size="10" class="me-1" color="success">mdi-chevron-right</v-icon>
                  {{ reg }}
                </div>
              </div>
            </v-tooltip>
          </div>

          <h1 class="text-h3 text-md-h2 font-serif font-weight-bold leading-tight mb-6 article-title">
            {{ article.title }}
          </h1>

          <div class="d-flex align-center justify-space-between flex-wrap ga-4">
            <div class="author-attribution font-serif d-inline-flex align-center">
              <v-icon size="x-small" color="success" class="me-1 opacity-70">mdi-pen</v-icon>
              <span class="author-label text-caption font-weight-bold text-uppercase">
                {{ article.author }}
              </span>
            </div>

            <span class="text-caption font-serif text-medium-emphasis italic">
              Recorded on {{ article.date }}
            </span>
          </div>
        </header>

        <!-- Article Layout -->
        <v-row class="mt-2">
          
          <!-- Main Editorial Column -->
          <v-col cols="12" md="8" class="pe-md-6">
            
            <!-- Featured Media -->
            <div v-if="article.image" class="media-container mb-8 overflow-hidden rounded-lg">
              <v-img
                :src="getImageUrl(article.image)"
                max-height="460"
                cover
                class="article-featured-media"
              />
            </div>

            <div class="article-body">
              <!-- Summary Deck -->
              <div class="notebook-summary-box pa-5 mb-8 rounded-lg">
                <p class="text-h6 font-serif leading-relaxed text-success font-weight-medium mb-0">
                  {{ article.summary }}
                </p>
              </div>

              <!-- Dynamic Blocks -->
              <div v-for="(block, index) in article.content" :key="index">
                <component
                  :is="resolveBlockComponent(block.type)"
                  :class="getBlockClass(block)"
                  :style="getBlockStyle(block)"
                >
                  <!-- Label Block -->
                  <template v-if="block.type === 'label'">
                    <v-icon start size="16" :color="block.color || 'success'" class="me-1">
                      mdi-bookmark-outline
                    </v-icon>
                    <span>{{ block.text?.toUpperCase() }}</span>
                  </template>

                  <!-- Standard Text Blocks -->
                  <template v-if="block.text">{{ block.text }}</template>

                  <!-- List Blocks -->
                  <template v-if="block.type === 'list' && block.items">
                    <li v-for="item in block.items" :key="item" class="d-flex align-start mb-3">
                      <v-icon size="x-small" :color="block.color || 'success'" class="me-2 mt-1">
                        mdi-rhombus-medium
                      </v-icon>
                      <span class="text-body-1 font-serif">{{ item }}</span>
                    </li>
                  </template>

                  <!-- Quote Citation -->
                  <cite
                    v-if="block.type === 'quote' && block.author"
                    class="d-block text-caption font-serif text-uppercase mt-3 text-medium-emphasis not-italic font-weight-bold"
                  >
                    — {{ block.author }}
                  </cite>
                </component>
              </div>
            </div>
          </v-col>

          <!-- Sidebar Column -->
          <v-col cols="12" md="4" class="ps-md-6 border-s-md notebook-sidebar-divider">
            <aside class="sticky-sidebar">
              
              <!-- Related Intel -->
              <section v-if="article.links?.length" class="mb-8">
                <div class="sidebar-label font-serif mb-3">
                  <v-icon size="x-small" color="success" class="me-1">mdi-file-link-outline</v-icon>
                  Related Links
                </div>
                <div class="d-flex flex-column ga-2">
                  <v-btn
                    v-for="item in article.links"
                    :key="item.label"
                    :href="item.link"
                    target="_blank"
                    variant="tonal"
                    color="success"
                    size="small"
                    class="justify-start text-none font-serif text-caption px-3"
                    append-icon="mdi-open-in-new"
                  >
                    <span class="text-truncate">{{ item.label }}</span>
                  </v-btn>
                </div>
              </section>

              <!-- Tags Section -->
              <section v-if="article.tags?.length" class="mb-8">
                <div class="sidebar-label font-serif mb-3">
                  <v-icon size="x-small" color="success" class="me-1">mdi-tag-outline</v-icon>
                  Tags
                </div>
                <div class="d-flex flex-wrap ga-2">
                  <v-chip
                    v-for="tag in article.tags"
                    :key="tag"
                    size="x-small"
                    variant="tonal"
                    color="success"
                    class="font-serif font-weight-bold text-uppercase"
                  >
                    #{{ tag }}
                  </v-chip>
                </div>
              </section>

              <!-- Back to Hub Card -->
              <v-card variant="outlined" class="notebook-back-card pa-4 text-center">
                <v-icon color="success" size="32" class="mb-2">mdi-notebook-outline</v-icon>
                <div class="text-caption font-serif text-medium-emphasis mb-3">
                  Finished reading? Return to the News Feed.
                </div>
                <v-btn
                  variant="flat"
                  block
                  color="success"
                  size="small"
                  to="/sandbox/kenn"
                  prepend-icon="mdi-arrow-left"
                  class="font-serif text-none"
                >
                  Return to Archive
                </v-btn>
              </v-card>

            </aside>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&display=swap');

.font-serif {
  font-family: 'Lora', Georgia, serif !important;
}

.italic {
  font-style: italic;
}

.not-italic {
  font-style: normal;
}

/* Notebook Container Paper Card */
.notebook-paper-card {
  background: rgba(var(--v-theme-surface), 0.85) !important;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08) !important;
  border-radius: 16px !important;
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04) !important;
}

.notebook-header-divider {
  border-color: rgba(var(--v-theme-on-surface), 0.08) !important;
}

.article-title {
  letter-spacing: -0.02em;
}

/* Author Tag */
.author-attribution {
  padding: 4px 10px;
  border-radius: 6px;
  background: rgba(var(--v-theme-on-surface), 0.03);
  border: 1px dashed rgba(var(--v-theme-on-surface), 0.12);
}

.author-label {
  letter-spacing: 0.05em;
  color: rgba(var(--v-theme-on-surface), 0.7);
}

.region-tag {
  background: rgba(var(--v-theme-on-surface), 0.04);
  border: 1px solid rgba(var(--v-theme-on-surface), 0.06);
}

/* Summary Box */
.notebook-summary-box {
  background: rgba(var(--v-theme-success), 0.05);
  border-left: 3px solid rgb(var(--v-theme-success));
}

/* Article Dynamic Blocks */
.article-subheading {
  color: rgb(var(--v-theme-on-surface));
  letter-spacing: -0.01em;
}

.notebook-quote-block {
  border-left: 4px solid rgb(var(--v-theme-success));
  background: rgba(var(--v-theme-on-surface), 0.03);
  font-style: italic;
}

.custom-notebook-list {
  list-style: none;
}

.notebook-label-container {
  display: flex;
  align-items: center;
  color: rgb(var(--v-theme-success));
}

.notebook-label-container::after {
  content: '';
  flex-grow: 1;
  height: 1px;
  background: rgba(var(--v-theme-on-surface), 0.1);
  margin-left: 16px;
}

/* Sidebar Styling */
.sticky-sidebar {
  position: sticky;
  top: 32px;
}

.sidebar-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(var(--v-theme-on-surface), 0.7);
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.08);
  padding-bottom: 6px;
}

.notebook-sidebar-divider {
  border-color: rgba(var(--v-theme-on-surface), 0.06) !important;
}

.notebook-back-card {
  border-color: rgba(var(--v-theme-on-surface), 0.08) !important;
  background: rgba(var(--v-theme-on-surface), 0.02) !important;
  border-radius: 12px !important;
}

.py-0-5 {
  padding-top: 2px;
  padding-bottom: 2px;
}
</style>
