<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid, { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'
import WikiAlert from '@/components/wiki/WikiAlert.vue'

const remnantOperations: FeatureItem[] = [
  {
    title: 'Cellular Insurgency',
    icon: 'mdi-leak',
    color: 'purple-darken-4',
    description:
      'Cipher has fractured into independent cells. With no central command, each cell follows its own radical interpretation of Shadow tech.',
  },
  {
    title: 'Black Market Circulation',
    icon: 'mdi-currency-usd-off',
    color: 'purple-darken-4',
    description:
      'Trading refined Shadow technology and "unpurifiable" specimens to other criminal syndicates for funding.',
  },
  {
    title: 'The Ghost of Citadark',
    icon: 'mdi-island',
    color: 'purple-darken-4',
    description:
      'Rumors persist of rogue scientists returning to the ruins of Citadark Isle to recover lost data and the legendary XD-001 blueprints.',
  },
  {
    title: 'Sub-Zero Lab Remnants',
    icon: 'mdi-snowflake-alert',
    color: 'purple-darken-4',
    description:
      'Operating in the frozen wastes of Orre, hidden bunkers continue to experiment on the emotional suppression of Pokémon.',
  },
]

const currentThreats = [
  {
    title: 'Cipher Peon Remnants',
    icon: 'mdi-account-question',
    color: 'purple-darken-4',
    description:
      'Former low-level grunts who have turned to desert banditry, often utilizing "Legacy Shadow Pokémon" that escaped purification.',
  },
  {
    title: 'Arvin & The New Guard',
    icon: 'mdi-flask-empty-outline',
    color: 'purple-darken-4',
    description:
      'A younger generation of scientists obsessed with the "perfection" of the Shadow process, seeking to remove the Hyper Mode weakness.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Team Cipher (Remnants)"
      subtitle="Once the masters of Orre, now a fractured insurgency obsessed with the forbidden science of the heart."
      icon="mdi-skull-scan-outline"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="purple-darken-4" variant="flat" size="small">Underground Syndicate</v-chip>
          <v-chip color="grey-darken-4" variant="flat" size="small">Fugitive Status</v-chip>
          <v-chip variant="outlined" size="small">Location: Scattered (Orre Desert)</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiAlert type="error" variant="elevated" icon="mdi-gavel" class="mb-8">
        Possession of a Shadow Pokémon is a high-level felony. Anyone found with a Shadow Pokémon
        will be
        <strong>prosecuted for crimes against Pokémon</strong>. Mandatory rehabilitation and prison
        sentences may apply.
      </WikiAlert>

      <WikiCard title="A Shattered Hegemony" icon="mdi-heart-broken" class="purple-darken-4">
        <p class="text-body-1 lh-lg mb-6">
          Following the twin collapses of the Realgam and Citadark operations,
          <strong>Team Cipher</strong>
          lost its grip on Orre's political and social institutions. They are no longer a shadow
          government; they are a ghost. Driven into the vast, lawless expanses of the desert, the
          remaining "Cipher Peons" and scientists operate in extreme secrecy, often clashing with
          one another over dwindling resources.
        </p>
        <FeatureGrid :items="remnantOperations" :cols="2" />
      </WikiCard>

      <WikiCard
        title="The Forbidden Shadow Tech"
        icon="mdi-biohazard"
        class="my-6 shadow-focus purple-darken-2"
      >
        <v-row align="center">
          <v-col cols="12" md="8">
            <p class="text-body-1 lh-lg mb-4">
              Though mass production has ceased, <strong>Shadow Pokémon</strong> remain the ultimate
              threat in the Orre region. These biological weapons are the result of Cipher's
              horrific heart-closing experiments. Because the technology is now decentralized, new
              strains of "Shadow Aura" are beginning to emerge.
            </p>
            <v-btn
              prepend-icon="mdi-information-outline"
              color="purple-darken-4"
              variant="flat"
              to="/mechanics/shadow-pokemon"
              class="mt-2"
            >
              Access Shadow Pokémon Database
            </v-btn>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-icon size="120" color="purple-lighten-1">mdi-all-inclusive</v-icon>
            <div class="text-caption mt-2 text-purple-lighten-4">
              Once closed, the heart is difficult to reopen.
            </div>
          </v-col>
        </v-row>
      </WikiCard>

      <WikiCard title="The Desolation Network" icon="mdi-map-marker-off" class="purple-darken-4">
        <p class="text-body-1 lh-lg mb-4">
          Without Grand Master Greevil to unite them, Cipher has become more unpredictable. Some
          cells act as mercenaries, while others function like a doomsday cult, believing that only
          a "Shadow World" can survive the harshness of the Orre desert.
        </p>
        <FeatureGrid :items="currentThreats" :cols="1" />
      </WikiCard>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}

.shadow-focus {
  background: linear-gradient(
    135deg,
    rgba(74, 20, 140, 0.15) 0%,
    rgba(18, 18, 18, 0.6) 100%
  ) !important;
  border: 1px solid rgba(171, 71, 188, 0.4) !important;
}

:deep(.feature-card) {
  border-style: dashed !important;
  border-width: 1px;
  background-color: rgba(var(--v-theme-purple-darken-4), 0.1);
  border-color: rgba(var(--v-theme-purple-darken-4), 0.3) !important;
}
</style>
