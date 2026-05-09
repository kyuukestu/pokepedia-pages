<script setup lang="ts">
// views/sandbox/index.vue → /sandbox
// Landing page for the Sandbox section.
// Full content lives in child routes — this page is a curated overview.
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import WikiAlert from '@/components/wiki/WikiAlert.vue'
import FeatureGrid, { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'

// Quick-link cards for the main Sandbox sections
const sections: FeatureItem[] = [
  {
    icon: 'mdi-book-open-variant',
    title: 'Trainer 101',
    description:
      'New here? Start with the essentials—Trainer IDs, permits, and the core systems that define a Trainer’s journey.',
    color: 'blue-darken-2',
    to: '/sandbox/trainer-101',
  },
  {
    icon: 'mdi-earth',
    title: 'Setting',
    description: 'Explore the world, its regions, and the timeline shaping everything within it.',
    color: 'green-darken-2',
    to: '/sandbox/setting',
  },
  {
    icon: 'mdi-calendar-star',
    title: 'Events',
    description: 'Browse upcoming and ongoing events across the world in a calendar view.',
    color: 'amber-darken-2',
    to: '/sandbox/events',
  },
  {
    icon: 'mdi-trophy',
    title: 'Gym Battles',
    description:
      'Take on the Battle Challenge with detailed gym info, including standard and special formats.',
    color: 'red-darken-2',
    to: '/sandbox/gym-battles',
  },
  {
    icon: 'mdi-star-circle',
    title: 'Contests & Showcases',
    description:
      'Compete in performance-based events where battles demand style and creativity in equal measure.',
    color: 'amber-darken-2',
    to: '/sandbox/contests',
  },
  {
    icon: 'mdi-domain',
    title: 'Organizations',
    description:
      'Explore the groups that shape the world—from corporate giants and research institutions to ranger unions and criminal syndicates.',
    color: 'green-darken-2',
    to: '/sandbox/orgs',
  },
]

const groundRules = [
  {
    icon: 'mdi-account-group-outline',
    color: 'red',
    title: 'Community Mindfulness',
    description:
      'Every action you take ripples through the shared world. Be mindful of how your story affects the agency and enjoyment of other players. We prioritize collaborative storytelling over "main character" syndrome.',
  },
  {
    icon: 'mdi-earth-plus',
    color: 'red',
    title: 'Collaborative World-Building',
    description:
      'If you want to do something with big, rippling consequences—a villain arc, a regional event, or a world-altering discovery—bring it to the group first. Major canon shifts require community consensus.',
  },
  {
    icon: 'mdi-heart-outline',
    color: 'red',
    title: 'Mutual Respect',
    description:
      'Keep the conflict in-character. Harassment, bigotry, or persistent toxic behavior out-of-character is a zero-tolerance offense and will result in immediate removal from the Sandbox.',
  },
]
</script>
<template>
  <v-container fluid class="pa-0">
    <!-- Hero Section -->
    <WikiHero
      title="The Sandbox"
      subtitle="Open-world Pokémon RP — the entire Pokéverse is your Cloyster."
      icon="mdi-pokeball"
      pattern="pokeball"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap ga-2">
          <v-chip color="primary" variant="elevated" size="small" class="font-weight-bold">
            CURRENT ERA: 8 YR POST-SWSH
          </v-chip>
          <v-chip color="secondary" variant="flat" size="small">OPEN ENROLLMENT</v-chip>
        </div>
      </template>
    </WikiHero>

    <!-- Main Content Area -->
    <v-container max-width="1200" class="py-8">
      <!-- Top Row: Info & Rules -->
      <v-row>
        <v-col cols="12" md="7">
          <WikiCard title="The Philosophy" icon="mdi-auto-fix" color="blue" class="h-100">
            <div class="text-body-1 lh-lg">
              <p class="mb-4">
                We run an <strong>Open-World, Sandbox-style</strong> Pokémon RP. Unlike traditional
                RPs, there is no single "Main Character."
              </p>

              <v-divider class="my-4" opacity="0.1" />

              <div class="d-flex ga-4 align-center mb-4">
                <v-icon color="blue" size="32">mdi-map-marker-path</v-icon>
                <div>
                  <div class="text-subtitle-2 font-weight-bold">Choose Your Path</div>
                  <div class="text-caption text-medium-emphasis">
                    Chart a unique journey across any region.
                  </div>
                </div>
              </div>

              <div class="d-flex ga-4 align-center">
                <v-icon color="purple" size="32">mdi-account-group</v-icon>
                <div>
                  <div class="text-subtitle-2 font-weight-bold">Collaborative Canon</div>
                  <div class="text-caption text-medium-emphasis">
                    Create your own arcs that ripple through the world.
                  </div>
                </div>
              </div>
            </div>
          </WikiCard>
        </v-col>

        <v-col cols="12" md="5">
          <WikiCard title="Quick Rules" icon="mdi-shield-check" color="red" class="h-100">
            <v-list bg-color="transparent" density="compact">
              <v-list-item v-for="(rule, i) in groundRules" :key="i" class="px-0">
                <template #prepend>
                  <v-icon :icon="rule.icon" :color="rule.color" size="small" class="mr-3" />
                </template>
                <v-list-item-title class="text-body-2 font-weight-bold">{{
                  rule.title
                }}</v-list-item-title>
                <div class="text-caption text-medium-emphasis text-wrap">
                  {{ rule.description }}
                </div>
              </v-list-item>
            </v-list>
            <v-btn to="/sandbox/rules" block color="red" variant="tonal" size="small" class="mt-4">
              Full Ruleset
            </v-btn>
          </WikiCard>
        </v-col>
      </v-row>

      <!-- Navigation Grid Section -->
      <div class="mt-12 mb-6">
        <div class="d-flex align-center mb-6">
          <h2 class="text-h5 font-weight-black text-uppercase letter-spacing-1">
            <v-icon start color="green">mdi-compass-outline</v-icon>
            Explore the World
          </h2>
          <v-divider class="ml-4" />
        </div>

        <!-- We use the FeatureGrid directly now for a cleaner "app-like" look -->
        <FeatureGrid :items="sections" />
      </div>

      <!-- Bottom Callout -->
      <WikiAlert type="info" class="mt-12">
        <div class="d-flex align-center justify-space-between flex-wrap ga-4">
          <div>
            <div class="text-h6 font-weight-bold">Ready to Start?</div>
            <div class="text-body-2">Check the Trainer 101 guide to set up your ID and Permit.</div>
          </div>
          <v-btn color="blue-darken-3" prepend-icon="mdi-rocket-launch" to="/sandbox/trainer-101">
            Begin Journey
          </v-btn>
        </div>
      </WikiAlert>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}

.letter-spacing-1 {
  letter-spacing: 1.5px !important;
}

/* Subtle background for the page to make cards pop */
:deep(.v-container) {
  background-attachment: fixed;
}

.section-card {
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.section-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1) !important;
}
</style>
