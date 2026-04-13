<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'
import WikiAlert from '@/components/wiki/WikiAlert.vue'
import RuleList from '@/components/wiki/RuleList.vue' // Ensure this is imported

// Interface check: icon, color, title, description
const rules = [
  {
    icon: 'mdi-book-open-outline',
    color: 'red',
    title: 'Follow RP Nation Rules',
    description:
      'All global RP Nation rules apply. This includes guidelines on content ratings, harassment, and community conduct. Familiarize yourself with them before participating.',
    to: 'https://www.rpnation.com/rules/',
  },
  {
    icon: 'mdi-pencil-ruler',
    color: 'red',
    title: 'Fan Content Requires Approval',
    description:
      'To maintain world balance, custom mechanics, Fakémon, or other fan-made content must be reviewed and approved by staff before being used in any thread.',
  },
  {
    icon: 'mdi-sword-cross',
    color: 'red',
    title: 'Flexible Battle Systems',
    description:
      'Pokémon are not limited to the standard four moves, allowing for more creative anime-style combat. However, specific events or tournaments may enforce restrictions.',
  },
  {
    icon: 'mdi-format-header-pound',
    color: 'red',
    title: 'Post Formatting Standards',
    description:
      'Clarity is key for collaborative RP. All posts must include headers indicating at minimum the current in-game date and your character’s current location.',
  },
  {
    icon: 'mdi-star-off',
    color: 'red',
    title: 'Legendary Pokémon Restrictions',
    description:
      'Legendaries are treated as forces of nature. They are heavily restricted, require moderation approval, and must be earned within the roleplay.',
  },
  {
    icon: 'mdi-crown-outline',
    color: 'red',
    title: 'No Starting in High Authority Roles',
    description:
      'Roles such as Gym Leaders, Elite Four, or Champions are earned through character progression. New players must start as standard Trainers or equivalent paths.',
  },
  {
    icon: 'mdi-brain',
    color: 'red',
    title: 'Supernatural Abilities',
    description:
      'Abilities like Aura, psychic powers, or Hex Maniac traits are allowed, provided they fit the character’s background and don’t disrupt fair play.',
  },
  {
    icon: 'mdi-handshake-outline',
    color: 'red',
    title: 'Conflict Resolution',
    description:
      'Battle outcomes should be discussed and agreed upon by all parties involved. If a stalemate occurs, a moderator will arbitrate based on the narrative context.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Rules & Guidelines"
      subtitle="The core laws of the Sandbox that keep the adventure fair and fun for everyone."
      icon="mdi-gavel"
      pattern="pokeball"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="red-darken-2" variant="flat" size="small">Core Rules</v-chip>
          <v-chip color="red-darken-2" variant="outlined" size="small">Moderator Enforced</v-chip>
          <v-chip variant="tonal" size="small">Last Updated: 2026</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="Overview" icon="mdi-information-outline" color="red">
        <p class="text-body-1 lh-lg mb-4">
          These rules establish the baseline expectations for all participants in the RP. They are
          designed to maintain fairness, clarity, and a shared understanding of how the world
          operates.
        </p>

        <WikiCallout label="Guiding Principle" icon="mdi-compass-outline" color="red">
          This RP prioritizes <strong>collaborative storytelling</strong>. Rules exist to support
          that goal, ensuring everyone has space to contribute to the world.
        </WikiCallout>
      </WikiCard>

      <WikiCard title="The Core Tenets" icon="mdi-format-list-checks" color="red">
        <p class="text-body-1 lh-lg mb-6">
          Click on a rule to expand it and read the full details.
        </p>

        <RuleList :rules="rules" class="mb-6" />

        <WikiAlert type="error">
          Repeated disregard for these standards or a poor attitude toward fellow players will
          result in swift removal from the RP. No exceptions.
        </WikiAlert>
      </WikiCard>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}
</style>
