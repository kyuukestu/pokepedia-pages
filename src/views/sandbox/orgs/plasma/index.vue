<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid from '@/components/wiki/FeatureGrid.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'
import WikiAlert from '@/components/wiki/WikiAlert.vue'

const sanctuaryOperations = [
  {
    title: 'Displaced Pokémon Sheltering',
    icon: 'mdi-home-heart',
    color: 'teal-darken-1',
    description:
      'The Driftveil Safehouse serves as a primary hub for Pokémon separated from their trainers or those abandoned during the initial Plasma Crisis.',
  },
  {
    title: 'Psychological Rehabilitation',
    icon: 'mdi-brain',
    color: 'teal-darken-1',
    description:
      'The group works to heal the trauma of creatures previously subjected to forced experimentation or combat.',
  },
  {
    title: 'Trainer-Pokémon Mediation',
    icon: 'mdi-hands-pray',
    color: 'teal-darken-1',
    description:
      'Acting as neutral bridge-builders, members help trainers understand the emotional needs and unspoken consent of their partners.',
  },
  {
    title: 'Anti-Extremist Intelligence',
    icon: 'mdi-shield-search',
    color: 'teal-darken-1',
    description:
      'Actively monitoring and reporting Neo-Plasma splinter cells to the International Police to protect the fragile peace of the Unova region.',
  },
]

const leadership = [
  {
    title: 'Natural Harmonia Gropius (N)',
    icon: 'mdi-sparkles',
    color: 'teal-darken-3',
    description:
      'Status: Sovereign. Half of Unova\'s illusive twin dragons. He often travels the world to seek further truth, N remains the spiritual heart of the group, guiding their path toward true harmony.',
  },
  {
    title: 'Anthea & Concordia',
    icon: 'mdi-human-female-female',
    color: 'teal-darken-3',
    description:
      'The primary caregivers at the Driftveil Sanctuary. They specialize in the physical and emotional mending of Pokémon through quiet, dedicated service.',
  },
  {
    title: 'Sage Rood',
    icon: 'mdi-account-tie',
    color: 'teal-darken-3',
    description:
      'A former high-ranking Sage who now manages the logistical and legal aspects of the sanctuary, ensuring the group remains in good standing with local authorities.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Team Plasma (Ex-Faction)"
      subtitle="The Path of Atonement: Sheltering the displaced and pursuing the dream of a world where Pokémon and humans are truly equal."
      icon="mdi-leaf"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="teal-darken-3" variant="flat" size="small"
            >Status: Peaceful Sanctuary</v-chip
          >
          <v-chip color="light-blue-darken-2" variant="flat" size="small">Humanitarian Aid</v-chip>
          <v-chip variant="outlined" size="small">Non-Combatant Organization</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="The Driftveil Sanctuary" icon="mdi-map-marker-check" class="teal-darken-4">
        <p class="text-body-1 lh-lg mb-6">
          Unlike the militaristic Neo-faction, the <strong>reformed Team Plasma</strong> operates
          out of a humble, converted warehouse in Driftveil City. They have shed their knightly
          armor and black jumpsuits in favor of civilian attire, focusing their energy on
          <strong>Atonement</strong>. The facility provides medical care, nutrition, and open-space
          environments for Pokémon that were once victims of Ghetsis's manipulation.
        </p>

        <FeatureGrid :items="sanctuaryOperations" :cols="2" />
      </WikiCard>

      <WikiCard title="Guidance of the King" icon="mdi-heart-outline" class="teal-darken-4">
        <p class="text-body-1 lh-lg mb-4">
          The organization adheres to the "True Path" established by N after his epiphany at the
          Pokémon League. They no longer advocate for the separation of species by force, but rather
          for the <strong>mutual liberation of the heart</strong>. Leadership is communal, led by
          those who stood by N even during the darkest days of the original organization.
        </p>
        <v-divider class="border-opacity-75" :thickness="3" />

        <v-icon size="140" color="teal-lighten-2" class="mx-auto d-flex justify-center"
          >mdi-account-heart</v-icon
        >
        <div
          class="text-caption mt-2 text-teal-lighten-1 font-weight-bold mx-auto d-flex justify-center"
        >
          "EACH POKÉMON HAS A TRUTH OF THEIR OWN." — N
        </div>
        <v-divider class="border-opacity-75" :thickness="3" />
        <br />
        <FeatureGrid :items="leadership" :cols="3" />
      </WikiCard>

      <WikiCard title="Current Legal Status" icon="mdi-gavel" class="teal-darken-4">
        <p class="text-body-1 lh-lg mb-4">
          While the group remains under surveillance by the International Police due to their
          historical ties, they are currently recognized as a
          <strong>Non-Governmental Organization (NGO)</strong>. They cooperate fully with public
          safety officials, providing testimony and data to help locate the remaining
          <strong>Neo-Plasma fugitives</strong> and salvaged technology.
        </p>
      </WikiCard>

      <WikiCallout label="Public Assistance" icon="mdi-hand-heart" class="mt-6 blue-grey-darken-2">
        The sanctuary is always in need of medicinal supplies and berries. Trainers who have found
        lost or distressed Pokémon are encouraged to bring them to the Driftveil Safehouse for
        evaluation—no questions asked.
      </WikiCallout>

      <WikiAlert type="info" class="mt-8" icon="mdi-check-decagram">
        <strong>REGIONAL HARMONY:</strong> Thanks to the efforts of Sage Rood and the protagonist of
        the Unova Crisis, over 80% of Pokémon liberated during the original crisis have been
        successfully reunited with their trainers or safely integrated into protected habitats.
      </WikiAlert>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}

:deep(.feature-card) {
  border-style: solid !important;
  border-width: 1px;
  background-color: rgba(var(--v-theme-teal-darken-1), 0.05);
  border-color: rgba(var(--v-theme-teal-darken-1), 0.3) !important;
}

.v-theme--dark :deep(.feature-card) {
  background-color: rgba(0, 150, 136, 0.05);
  border-color: rgba(0, 150, 136, 0.2) !important;
}
</style>
