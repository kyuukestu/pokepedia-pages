<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid, { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'

const coreFunctions: FeatureItem[] = [
  {
    title: 'Sanctioning Contests',
    icon: 'mdi-ribbon',
    description:
      'The PAC regulates official Contest Halls and issues Ribbon awards to winning Coordinators.',
    color: 'green',
  },
  {
    title: 'Grand Festival Planning',
    icon: 'mdi-trophy-variant',
    description:
      'Oversees the high-stakes annual Grand Festivals where Top Coordinators compete for the Ribbon Cup.',
    color: 'green',
  },
  {
    title: 'The Wallace Cup',
    icon: 'mdi-water-outline',
    description:
      'Coordinating with Contest Master Wallace to host prestigious cross-regional tournaments.',
    color: 'green',
  },
  {
    title: 'Showcases',
    icon: 'mdi-key-star',
    description:
      'Managing performance-based events like Pokémon Showcases that highlight elegance and bond.',
    color: 'green',
  },
]

const committeeLeadership: FeatureItem[] = [
  {
    title: 'Raoul Contesta',
    icon: 'mdi-account-tie',
    color: 'green',
    description:
      'Chief of the Pokémon Activities Committee and Head Judge for most major regional Contests.',
  },
  {
    title: 'Mr. Sukizo',
    icon: 'mdi-thumb-up-outline',
    color: 'green',
    description:
      'A recurring judge famous for his concise critiques and focus on "remarkable" Pokémon performances.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Pokémon Activities Committee"
      subtitle="The governing body celebrating the artistic soul of Pokémon culture through Contests and Showcases."
      icon="mdi-palette-swatch"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="green-darken-2" variant="flat" size="small">Arts & Culture</v-chip>
          <v-chip color="green-darken-2" variant="flat" size="small">Governing Body</v-chip>
          <v-chip variant="outlined" size="small">Global Operations</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="Artistic Guardians" icon="mdi-heart-outline" color="green">
        <p class="text-body-1 lh-lg mb-6">
          The <strong>Pokémon Activities Committee (PAC)</strong> serves as the artistic counterpart
          to the Pokémon League. While the League focuses on the strength and tactical prowess of
          battling, the PAC champions the beauty, talent, and creative collaboration achievable
          through human-Pokémon partnerships.
        </p>
        <p class="text-body-1 lh-lg mb-6">
          From the vibrant stages of Hoenn and Sinnoh to the refined theaters of Kalos, the PAC
          establishes and enforces the rules that define the world of professional Coordinating and
          Performing.
        </p>
        <FeatureGrid :items="coreFunctions" :cols="2" />
      </WikiCard>

      <WikiCard title="Committee Leadership" icon="mdi-gavel" color="green">
        <v-row align="center">
          <v-col cols="12" md="7">
            <p class="text-body-1 lh-lg mb-4">
              The committee is presided over by <strong>Raoul Contesta</strong>, who acts with an
              authority similar to a Regional Champion within the competitive battling sphere.
              Alongside notable figures like Mr. Sukizo, the committee ensures that every
              performance is judged with fairness and an appreciation for the "remarkable" qualities
              of Pokémon.
            </p>
            <FeatureGrid :items="committeeLeadership" :cols="2" />
          </v-col>
          <v-col cols="12" md="5" class="text-center">
            <v-img
              src="https://archives.bulbagarden.net/media/upload/b/b3/Ribbon_Cup.png"
              max-width="200"
              class="mx-auto"
            />
            <div class="text-caption mt-2 text-medium-emphasis">
              The Ribbon Cup: The PAC's ultimate prize.
            </div>
          </v-col>
        </v-row>
      </WikiCard>

      <WikiCard title="Cultural Impact" icon="mdi-broadcast" color="green">
        <p class="text-body-1 lh-lg">
          Since its inception, the competitions organized by the PAC have grown into global
          phenomena, broadcast live to millions. These events have been credited with introducing a
          new form of communication between people and their Pokémon—one based on synchronicity,
          visual flair, and mutual artistic expression.
        </p>

        <WikiCallout label="Contest Tip" icon="mdi-lightbulb-on-outline" color="green" class="mt-8">
          In RP, your character can focus on specific "Contest Conditions" (Cool, Beauty, Cute,
          Clever, Tough) when describing their moves to align with PAC judging standards.
        </WikiCallout>
      </WikiCard>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}

/* Specific styling for the Lore-focused feature cards */
:deep(.feature-card) {
  border-style: dashed !important;
  background-color: rgba(var(--v-theme-green-darken-2), 0.02);
}
</style>
