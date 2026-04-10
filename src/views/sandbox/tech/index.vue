<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid, { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'

const generalTech: FeatureItem[] = [
  {
    title: 'Smart Phone',
    icon: 'mdi-cellphone',
    description:
      'The modern standard. Integrates Pokédex, Map, and Trainer Card apps into one device.',
    color: 'blue',
  },
  {
    title: 'PokéGear',
    icon: 'mdi-radio',
    description:
      'A classic Johto favorite. Features a built-in radio for regional broadcasts and clock.',
    color: 'blue',
  },
  {
    title: 'PokéNav',
    icon: 'mdi-map',
    description:
      'Hoenn-developed tool for tracking Pokémon conditions and regional "Match Call" alerts.',
    color: 'blue',
  },
  {
    title: 'Pokétch',
    icon: 'mdi-watch',
    description: 'A versatile Sinnoh smartwatch with over 20 downloadable utility applications.',
    color: 'blue',
  },
]

const storageTech: FeatureItem[] = [
  {
    title: 'PC Storage',
    icon: 'mdi-cloud-upload',
    description:
      'A global cloud network allowing instant transfer of Pokémon to your designated home boxes.',
    color: 'blue',
  },
  {
    title: 'Digitization Bag',
    icon: 'mdi-bag-personal',
    description:
      'Patented PC technology digitizes items into data-streams which can be packed away with minimal weight and space.',
    color: 'blue',
  },
]

const livingTech = [
  {
    title: 'Rotom Integration',
    icon: 'mdi-lightning-bolt',
    description:
      'The Rotom Phone and Dex provide real-time AI assistance and native voice-control functions.',
    color: 'blue',
  },
  {
    title: 'Porygon Optimization',
    icon: 'mdi-cube-outline',
    description:
      'Used primarily in back-end server maintenance for the Global Trade Station and PC networks.',
    color: 'blue',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="World Technologies"
      subtitle="The devices and digital systems that power the modern Pokémon Trainer's journey."
      icon="mdi-cellphone-cog"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="blue-darken-2" variant="flat" size="small">Hardware</v-chip>
          <v-chip color="blue-darken-2" variant="flat" size="small">Storage Systems</v-chip>
          <v-chip variant="outlined" size="small">OS 10.2.1</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="Trainer Hardware" icon="mdi-devices" color="blue">
        <p class="text-body-1 lh-lg mb-6">
          Every region has developed its own solution for trainer management. While the modern
          <strong>Smart Device</strong> is the current global standard, legacy hardware like the
          PokéGear remains popular for its reliability in rural areas.
        </p>
        <FeatureGrid :items="generalTech" :cols="4" />
      </WikiCard>

      <WikiCard title="Advanced Logistics" icon="mdi-package-variant-closed" color="blue">
        <v-row align="center">
          <v-col cols="12" md="7">
            <p class="text-body-1 lh-lg mb-4">
              Modern travel is made possible by breakthroughs in matter-to-energy conversion. Items
              and Pokémon alike are stored in specialized digital formats, allowing trainers to
              carry extensive inventories across vast distances.
            </p>
            <FeatureGrid :items="storageTech" :cols="2" />
          </v-col>
          <v-col cols="12" md="5" class="text-center">
            <v-img
              src="https://archives.bulbagarden.net/media/upload/3/3d/Bag_SV_artwork.png"
              max-width="250"
              class="mx-auto"
            />
            <div class="text-caption mt-2 text-medium-emphasis">
              Standard Issue Spatially-Distorted Backpack
            </div>
          </v-col>
        </v-row>
      </WikiCard>

      <WikiCard title="Living Software" icon="mdi-porygon" color="blue">
        <p class="text-body-1 lh-lg mb-6">
          Technology in our world isn't just silicon and code; it often involves a partnership with
          Pokémon capable of inhabiting digital spaces.
        </p>

        <v-row>
          <v-col v-for="(item, i) in livingTech" :key="i" cols="12" md="6">
            <div class="d-flex align-start pa-4 rounded-lg bg-surface-variant-light border-blue">
              <v-icon :icon="item.icon" size="40" color="blue-darken-2" class="mr-4" />
              <div>
                <h4 class="text-h6 font-weight-bold mb-1">{{ item.title }}</h4>
                <p class="text-body-2 lh-lg">{{ item.description }}</p>
              </div>
            </div>
          </v-col>
        </v-row>

        <WikiCallout label="Mechanic Tip" icon="mdi-information-outline" color="blue" class="mt-8">
          In RP, your character can "flavor" their technology based on their home region. A
          character from Sinnoh might still prefer using their old Pokétch over a smartphone!
        </WikiCallout>
      </WikiCard>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}

.bg-surface-variant-light {
  background-color: rgba(var(--v-theme-on-surface), 0.03);
}

.border-blue {
  border: 1px solid rgba(25, 118, 210, 0.1);
}
</style>
