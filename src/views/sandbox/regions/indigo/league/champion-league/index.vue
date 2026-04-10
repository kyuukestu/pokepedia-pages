<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import WikiAlert from '@/components/wiki/WikiAlert.vue'
import ChampionLeague from '@/components/wiki/ChampionLeague.vue'
import type { Chamber } from '@/types/wiki'

const champion: Chamber = {
  chamberIndex: 0,
  name: 'Lance',
  title: 'The Dragon Master',
  specialty: 'Dragon',
  typeIcon: 'dragon.svg',
  accentColor: '#4A3B9F',
  to: '/sandbox/characters/npc/lance',
}

const chambers: Chamber[] = [
  {
    chamberIndex: 0,
    name: 'Will',
    title: 'The Psychic Master',
    specialty: 'Psychic',
    typeIcon: 'psychic.svg',
    accentColor: '#7F77DD',
    to: '/sandbox/characters/npc/will',
  },
  {
    chamberIndex: 1,
    name: 'Koga',
    title: 'The Poisonous Ninja',
    specialty: 'Poison',
    typeIcon: 'poison.svg',
    accentColor: '#1D9E75',
    to: '/sandbox/characters/npc/koga',
  },
  {
    chamberIndex: 2,
    name: 'Bruno',
    title: 'The Steel-Clad Warrior',
    specialty: 'Fighting',
    typeIcon: 'fighting.svg',
    accentColor: '#D85A30',
    to: '/sandbox/characters/npc/bruno',
  },
  {
    chamberIndex: 3,
    name: 'Karen',
    title: 'The Dark Specialist',
    specialty: 'Dark',
    typeIcon: 'dark.svg',
    accentColor: '#888780',
    to: '/sandbox/characters/npc/karen',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Indigo Champion League"
      subtitle="Four chambers. One Throne. The final challenge awaits..."
      icon="mdi-shield-crown"
      pattern="dots"
    />

    <v-container max-width="1200" class="py-8">
      <WikiAlert type="warning" class="mb-8">
        Trainers must defeat all four members in sequential order. Defeat requires restarting from
        Chamber 1.
      </WikiAlert>

      <WikiCard title="Members" icon="mdi-floor-plan" color="red">
        <ChampionLeague :chambers="chambers" :champion="champion" />
      </WikiCard>
    </v-container>
  </v-container>
</template>
