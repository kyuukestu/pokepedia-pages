<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>
<template>
  <v-card class="mx-auto my-12 w-50">
    <v-card-text class="py-0 text-gray ms-4">
      <div>Welcome to to our Pokémon Role Play Wikia!</div>
      <div>Poképedia for short!</div>
      <div>
        An ever-expanding compendium of useful information about the World of Pokémon as presented
        in the Role Play! This wikia serves to answer many, eventually any, of the questions that
        inevitable arise when roleplaying in a world as diverse and long-running as pokémon.
      </div>
      <div>
        This Wikia covers basic information on the Pokémon World and any changes that arise as a
        result of RP events or OOC decisions. Whether you're a seasoned member of the role play or
        just starting our, this Wikia is your go-to resource for lore, mechanic changes, locations,
        rules, Ocs (maybe), and more.
      </div>

      <v-card-actions>
        <v-spacer />
        <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show" />
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider />
          <v-card-text>
            <h2>What Is This Role Play About?</h2>
            <p>
              We run an Open-World, Sandbox-style Pokémon RP where the entire Pokéverse is your
              Cloyster!
              <br />
              What's that all mean? It means when we role play, we draw from all forms of
              Poké-Media: The
              <span>Main Series Games</span> are our primary source, but Side Games (Ranger,
              Conquest, Mystery Dungeon, et al.), Anime, Manga, etc. are all valid sources from
              which to draw inspiration to flesh-out the world.
              <br />
              Our role play introduces new regions, factions, lore, regional variants, and many more
              that expand the Pokémon experience!
            </p>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card-text>
  </v-card>
</template>
