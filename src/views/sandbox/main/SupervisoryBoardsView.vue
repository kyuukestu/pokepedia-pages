<script setup lang="ts">
import SectionWrapped from '@/components/SectionWrapped.vue'
</script>
<template>
  <v-container fluid class="py-10">
    Supervisory Boards

    <SectionWrapped title="Pokémon Association" subtitle="Section 1 subtitle">
      Pokemon League, League Tournaments
    </SectionWrapped>
    <SectionWrapped title="Pokémon Activities Commission" subtitle="Section 1 subtitle"
      >Contests, Showcases</SectionWrapped
    >
    <SectionWrapped title="Pokémon Athletics Board" subtitle="Section 1 subtitle"
      >Pokeathelon, Ping Pong, Sports</SectionWrapped
    >
    <SectionWrapped title="Pokémon Aviation Authority" subtitle="Section 1 subtitle"
      >PokeRinger, Sky Races</SectionWrapped
    >
    <SectionWrapped title="Pokémon Inspection Agency" subtitle="Section 1 subtitle"
      >Gym Leaders</SectionWrapped
    >
  </v-container>
</template>
