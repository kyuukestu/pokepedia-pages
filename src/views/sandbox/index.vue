<script setup lang="ts">
// views/sandbox/index.vue → /sandbox
// Landing page for the Sandbox section.
// Full content lives in child routes — this page is a curated overview.
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'
import WikiAlert from '@/components/wiki/WikiAlert.vue'
import RuleList from '@/components/wiki/RuleList.vue'
import FeatureGrid from '@/components/wiki/FeatureGrid.vue'

// Quick-link cards for the main Sandbox sections
const sections = [
  {
    icon: 'mdi-book-open-variant',
    title: 'Trainer 101',
    description:
      'New here? Start with the essentials—Trainer IDs, permits, and the core systems that define a Trainer’s journey.',
    color: 'blue-darken-2',
    link: '/sandbox/trainer-101',
  },
  {
    icon: 'mdi-earth',
    title: 'Setting',
    description: 'Explore the world, its regions, and the timeline shaping everything within it.',
    color: 'green-darken-2',
    link: '/sandbox/setting',
  },
  {
    icon: 'mdi-calendar-star',
    title: 'Events',
    description: 'Browse upcoming and ongoing events across the world in a calendar view.',
    color: 'amber-darken-2',
    link: '/sandbox/events',
  },
  {
    icon: 'mdi-trophy',
    title: 'Gym Battles',
    description:
      'Take on the Battle Challenge with detailed gym info, including standard and special formats.',
    color: 'red-darken-2',
    link: '/sandbox/gym-battles',
  },
  {
    icon: 'mdi-star-circle',
    title: 'Contests & Showcases',
    description:
      'Compete in performance-based events where battles demand style and creativity in equal measure.',
    color: 'amber-darken-2',
    link: '/sandbox/contests',
  },
  {
    icon: 'mdi-domain',
    title: 'Organizations',
    description:
      'Explore the groups that shape the world—from corporate giants and research institutions to ranger unions and criminal syndicates.',
    color: 'green-darken-2',
    link: '/sandbox/orgs',
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
    <WikiHero
      title="The Sandbox"
      subtitle="Open-world Pokémon RP — the entire Pokéverse is your Cloyster."
      icon="mdi-pokeball"
      pattern="pokeball"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="primary" variant="flat" size="small">Open-World</v-chip>
          <v-chip color="secondary" variant="flat" size="small">Sandbox-Style</v-chip>
          <v-chip variant="outlined" size="small">8 years post Sword &amp; Shield</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="What is the Sandbox?" icon="mdi-information-outline" color="blue">
        <p class="text-body-1 lh-lg mb-4">
          We run an <strong>Open-World, Sandbox-style</strong> Pokémon RP drawing inspiration from
          all forms of Poké-Media — Main Series Games, Side Games (Ranger, Conquest, etc.), Anime,
          and Manga.
        </p>
        <WikiCallout label="Canon" icon="mdi-bookmark-check-outline" color="blue">
          The <strong>Main Series Games</strong> form the canon timeline. Anime &amp; Manga are used
          for reference and inspiration only.
        </WikiCallout>
        <p class="text-body-1 lh-lg mb-4">
          There is no <strong>singular</strong> main plot everyone must follow; rather, we spread
          <strong>Events, Story Lines, &amp; Character Arcs</strong> across threads that can run in
          parallel.
        </p>

        <p class="text-body-1 lh-lg mb-4">Prefer to chart your own path? Go for it.</p>

        <p class="text-body-1 lh-lg mb-4">
          We're open to suggestions and events where RP-ers create and run their own threads that
          are connected to the wider role-play.
        </p>

        <p class="text-body-1 lh-lg mb-0">
          I you want to do something with big, rippling consequences — a villain arc, a regional
          event, a world-altering discovery — bring it to the group first. World-building is a
          collaborative effort.
        </p>
      </WikiCard>

      <WikiCard title="Explore" icon="mdi-compass-outline" color="green">
        <p class="text-body-1 lh-lg mb-6">
          Not sure where to start? Here are a few sections to get you started.
        </p>
        <FeatureGrid :items="sections" />
      </WikiCard>

      <WikiCard title="The Ground Rules" icon="mdi-gavel" color="red">
        <p class="text-body-1 lh-lg mb-4">The spirit of our community is simple:</p>

        <RuleList :rules="groundRules" />

        <WikiAlert type="warning">
          A poor attitude and disregard for your fellow RPers <strong>will</strong> see you swiftly
          removed. No exceptions.
        </WikiAlert>

        <v-btn to="/sandbox/rules" color="red-darken-2" variant="tonal" class="mt-5">
          Read the Full Rules
        </v-btn>
      </WikiCard>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
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
