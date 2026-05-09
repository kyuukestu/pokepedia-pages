<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getImageUrl } from '@/utils/path-resolvers'
import { articles } from '@/data/kenn' // Your array of news data

// 'unplugin-vue-router' provides typed routes
const route = useRoute('/sandbox/kenn/[slug]')

const article = computed(() => articles.find((a) => a.slug === route.params.slug))

// A simple resolver that returns the correct tag or component logic
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
    default:
      return 'div'
  }
}
</script>

<template>
  <v-container v-if="article" max-width="1000" class="py-15 archive-layout">
    <!-- Header Section -->
    <header class="text-center mb-10">
      <div class="d-flex align-center justify-center ga-2 mb-4">
        <v-chip color="primary" label size="small" class="font-weight-black">
          {{ article.category }}
        </v-chip>
        <span class="text-caption mono-font text-grey">FILE_ID: {{ article.id }}</span>
      </div>

      <h1 class="text-h2 font-weight-black text-uppercase tracking-tighter mb-4">
        {{ article.title }}
      </h1>

      <div class="d-flex align-center justify-center ga-4 text-overline opacity-70">
        <span>Author: {{ article.author }}</span>
        <v-icon size="small">mdi-circle-small</v-icon>
        <span>{{ article.date }}</span>
      </div>
    </header>

    <v-row class="mt-8">
      <!-- Main Content Column -->
      <v-col cols="12" md="8">
        <v-img
          :src="getImageUrl(article.image ?? 'none')"
          height="450"
          cover
          class="bg-grey-lighten-4 mb-8 border"
        />

        <div class="article-content px-md-4">
          <!-- Intro / Summary -->
          <p class="text-h6 font-weight-medium mb-8 leading-relaxed text-primary">
            {{ article.summary }}
          </p>

          <!-- Body Paragraphs -->
          <div v-for="(block, index) in article.content" :key="index" class="mb-6">
            <component
              :is="resolveBlockComponent(block.type)"
              :class="[
                block.type === 'paragraph' ? 'text-body-1 mb-4' : '',
                block.type === 'subheading'
                  ? 'text-h5 font-weight-black text-uppercase mt-8 mb-4'
                  : '',
                block.type === 'quote' ? 'quote-block pa-6 my-8' : '',
                block.type === 'list' ? 'custom-list ps-6' : '',
              ]"
            >
              <!-- Handle text-based blocks -->
              <template v-if="block.text">{{ block.text }}</template>

              <!-- Handle list-based blocks -->
              <template v-if="block.type === 'list' && block.items">
                <li v-for="item in block.items" :key="item" class="mb-2">
                  <v-icon size="x-small" color="primary" class="me-2">mdi-rhombus</v-icon>
                  <span class="text-body-2 font-weight-medium">{{ item }}</span>
                </li>
              </template>

              <!-- Handle quote authors -->
              <cite
                v-if="block.type === 'quote' && block.author"
                class="d-block text-caption text-uppercase mt-2"
              >
                — {{ block.author }}
              </cite>
            </component>
          </div>
        </div>
      </v-col>

      <!-- Sidebar Column -->
      <v-col cols="12" md="4">
        <aside class="sticky-sidebar ps-md-6">
          <!-- Intel Links -->
          <section class="mb-10" v-if="article.links?.length">
            <div class="section-label">Related Intelligence</div>
            <v-list density="compact" class="bg-transparent border-s-sm ps-4">
              <v-list-item
                v-for="item in article.links"
                :key="item.label"
                :href="item.link"
                target="_blank"
                class="px-0 mb-2 hover-link"
              >
                <template v-slot:prepend>
                  <v-icon size="16" class="me-2">mdi-link-variant</v-icon>
                </template>
                <v-list-item-title class="text-caption font-weight-bold">
                  {{ item.label }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </section>

          <!-- Tags -->
          <section>
            <div class="section-label">Signal Tags</div>
            <div class="d-flex flex-wrap ga-2 mt-4">
              <v-chip
                v-for="tag in article.tags"
                :key="tag"
                size="x-small"
                variant="outlined"
                class="mono-font"
              >
                #{{ tag.toUpperCase() }}
              </v-chip>
            </div>
          </section>

          <!-- Back Action -->
          <v-btn
            variant="tonal"
            block
            class="mt-12 rounded-0"
            color="primary"
            to="/sandbox/kenn"
            prepend-icon="mdi-arrow-left"
          >
            Back to Hub
          </v-btn>
        </aside>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.archive-layout {
  border-left: 1px solid rgba(var(--v-border-color), 0.1);
  border-right: 1px solid rgba(var(--v-border-color), 0.1);
}

.section-label {
  font-size: 0.65rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgb(var(--v-theme-primary));
  border-bottom: 1px solid currentColor;
  padding-bottom: 4px;
}

.sticky-sidebar {
  position: sticky;
  top: 40px;
}

.article-content {
  line-height: 1.8;
  font-family: 'Newsreader', serif; /* Or your preferred body font */
}

.mono-font {
  font-family: 'JetBrains Mono', monospace;
}

.tracking-tighter {
  letter-spacing: -2px;
}

.hover-link:hover :deep(.v-list-item-title) {
  text-decoration: underline;
  color: rgb(var(--v-theme-primary));
}

.quote-block {
  border-left: 4px solid rgb(var(--v-theme-primary));
  background-color: rgba(var(--v-theme-primary), 0.05);
  font-style: italic;
}

.custom-list {
  list-style: none;
}

/* Ensure subheadings stand out from the Newsreader body */
h3 {
  font-family: inherit; /* Keeps it within the editorial look */
  letter-spacing: -0.5px;
}
</style>
