<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(true)
const panel = ref([])
</script>
<template>
  <v-navigation-drawer v-model="drawer" rail expand-on-hover>
    <v-list>
      <v-list-item title="Sidebar">
        <template v-slot:append>
          <v-btn icon="mdi-chevron-left" variant="text" />
        </template>
      </v-list-item>

      <v-divider />

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-home-city" title="Home" value="home" />
        <v-list-item prepend-icon="mdi-menu" title="Table of Contents" value="toc">
          <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel title="Table of Contents" value="tab-cont">
              <v-list>
                <v-list-item title="Sec 1" />
                <v-list-item title="Sec 2" />
                <v-list-item title="Sec 3" />
              </v-list>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-list-item>
      </v-list>
    </v-list>
  </v-navigation-drawer>
</template>
