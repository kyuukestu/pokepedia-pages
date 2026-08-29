import type { EventDefinition } from '@/types/events'

const pokemonHustle = {
  id: 'hustle',
  title: 'Pokémon Hustle',
  category: 'competition',
  regions: ['sinnoh'],
  description:
    'A multi-stage obstacle-course challenge where Trainers and a Pokémon of their choice must work together to navigate a series of demanding courses within a set time limit.',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1cRKBMUggRgQiqRaebv_LvOjJGAuKzwGkIonRmPidQA&s=10',
} satisfies EventDefinition

export default pokemonHustle
