<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid from '@/components/wiki/FeatureGrid.vue'

const leadershipStatus = [
  {
    title: 'Edward',
    icon: 'mdi-tea-outline',
    color: 'brown-darken-2',
    description:
      'Status: Vanished. Following the intervention of Mewtwo, the leader of the Societea was teleported to an unknown location. His absence has left a massive power vacuum.',
  },
  {
    title: 'Arley, Hocus, & Kage',
    icon: 'mdi-account-group',
    color: 'deep-purple-darken-3',
    description:
      'Status: Detained. The three remaining members of the Societea have been detained by the Ranger Union for their involvement in the revival of the Sky Fortress.',
  },
  {
    title: 'Pinchers Command',
    icon: 'mdi-hand-back-right',
    color: 'orange-darken-4',
    description:
      'Status: Fragmented. Former high-ranking captains have formed independent "Pinching" cells, sellin poached pokemon and their specialized capture technology to the highest bidder.',
  },
]

const technologicalRemnants = [
  {
    title: 'Control Gauntlets',
    icon: 'mdi-arm-flex-outline',
    color: 'orange-darken-4',
    description:
      'Illegal devices that transmit hypnotic pulses to override a Pokémon’s will. Unlike Ranger Stylers, these are designed for permanent, non-consensual servitude.',
  },
  {
    title: 'UFO Aerial Units',
    icon: 'mdi-ufo-outline',
    color: 'blue-grey-darken-3',
    description:
      'Small, high-maneuverability craft used for rapid Pokémon extraction. Many have been salvaged and stripped of their Societea markings for smuggling.',
  },
  {
    title: 'Power Grids',
    icon: 'mdi-lightning-bolt',
    color: 'amber-darken-2',
    description:
      'Portable energy pylons capable of disabling Ranger Stylers and capturing Legendary birds via localized magnetic fields.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Societea & Pokémon Pinchers"
      subtitle="The technological exploiters of Oblivia: Monitoring the fallout of the Sky Fortress containment."
      icon="mdi-castle"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="deep-purple-darken-4" variant="flat" size="small"
            >Status: Fractured</v-chip
          >
          <v-chip color="orange-darken-4" variant="flat" size="small">Tech-Smuggling Risk</v-chip>
          <v-chip variant="outlined" size="small">Region: Oblivia (Post-Incident)</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard
        title="The Fall of the Tea"
        icon="mdi-timer-sand-complete"
        class="deep-purple-darken-4"
      >
        <p class="text-body-1 lh-lg mb-6">
          The <strong>Societea</strong> was once a secret cabal of elderly elites seeking the secret
          to immortality through the control of legendary Pokémon. Their grand design culminated in
          the resurrection of the <strong>Sky Fortress</strong>, which has since been restrained by
          regional Rangers. With their leader <strong>Edward</strong> vanished—reportedly expelled
          by the psychic entity <strong>Mewtwo</strong>—the group’s ideological core has collapsed.
        </p>

        <FeatureGrid :items="leadershipStatus" :cols="3" />
      </WikiCard>

      <WikiCard title="The Pinching Network" icon="mdi-shield-alert" class="orange-darken-4">
        <p class="text-body-1 lh-lg mb-4">
          The <strong>Pokémon Pinchers</strong>, formerly the muscle for the Societea, have devolved
          into a decentralized network of criminal mercenaries. No longer unified by Edward's gold,
          they specialize in the theft and illegal distribution of Pokémon via "Pinching"—a method
          that involves brute-force technological control over natural biological bonds.
        </p>
        <v-divider class="border-opacity-75" :thickness="3" />

        <v-icon size="140" color="orange-darken-4" class="mx-auto d-flex justify-center"
          >mdi-close-network</v-icon
        >
        <div
          class="text-caption mt-2 text-orange-darken-2 font-weight-bold mx-auto d-flex justify-center"
        >
          WARNING: UNAUTHORIZED CONTROL GAUNTLET SIGNALS DETECTED
        </div>
        <v-divider class="border-opacity-75" :thickness="3" />
        <br />
        <FeatureGrid :items="technologicalRemnants" :cols="3" />
      </WikiCard>

      <WikiCard title="Current Regional Threat" icon="mdi-map-search" class="blue-grey-darken-4">
        <p class="text-body-1 lh-lg mb-4">
          While the Sky Fortress remains dormant and under Ranger guard, the "Pinchers" continue to
          lurk in the Oblivia Archipelago. While some have tentatively been reformed, others
          continue to cause minor mischief.
        </p>
      </WikiCard>
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
  background-color: rgba(var(--v-theme-deep-purple-darken-4), 0.05);
  border-color: rgba(var(--v-theme-deep-purple-darken-4), 0.3) !important;
}

.v-theme--dark :deep(.feature-card) {
  background-color: rgba(103, 58, 183, 0.05);
  border-color: rgba(103, 58, 183, 0.2) !important;
}
</style>
