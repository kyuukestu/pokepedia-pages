<script setup lang="ts">
const tocLinks = [
  { title: 'Trainer 101', value: 'trainer-101', to: '/trainer-101', icon: 'mdi-pokemon-go' },
  { title: 'Regions', value: 'regions', to: '/regions', icon: 'mdi-map' },
  {
    title: 'Law Enforcement',
    value: 'law-enforcement',
    to: '/law-enforcement',
    icon: 'mdi-police-badge',
  },
  {
    title: 'Supervisory Boards',
    value: 'supervisory-boards',
    to: '/supervisory-boards',
    icon: 'mdi-account-group',
  },
  { title: 'PokeCorp', value: 'pokecorp', to: '/pokecorp', icon: 'mdi-bank' },
  { title: 'PokeAcademia', value: 'pokeacademia', to: '/pokeacademia', icon: 'mdi-school' },
  { title: 'PokeTech', value: 'poketech', to: '/poketech', icon: 'mdi-laptop' },
  { title: 'Events', value: 'events', to: '/events', icon: 'mdi-calendar' },
  { title: 'Characters', value: 'characters', to: '/characters', icon: 'mdi-account' },
  { title: 'Misc', value: 'misc', to: '/misc', icon: 'mdi-help-circle' },
]
</script>

<template>
  <v-list-group prepend-icon="mdi-menu" value="toc">
    <template v-slot:activator="{ props }">
      <v-list-item title="Table of Contents" value="toc" v-bind="props" />
    </template>
    <v-list-item
      v-for="link in tocLinks"
      :key="link.value"
      :prepend-icon="link.icon"
      :title="link.title"
      :value="link.value"
      :to="link.to"
    />
  </v-list-group>
</template>
