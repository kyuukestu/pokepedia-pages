import { defineStore } from 'pinia'

export const useRpStore = defineStore('rp', {
  state: () => ({
    roleplays: [
      {
        id: 1,
        title: 'Pokémon Sandbox',
        tagline: 'Character-Driven, Exploration, Casual',
        description:
          'A largely plot-less Sandbox Style RP where story progression is driven by character goals and their efforts to pursue them.',
        image:
          'https://preview.redd.it/h89zlkbre3d31.png?width=640&crop=smart&auto=webp&s=14f58ff1fdfa30472d23a629803b0554b8ca9afa',
        aspectratio: '21/8',
        icon: 'mdi-pokeball',
        color: '#ff3131',
        to: '/sandbox',
      },
      {
        id: 2,
        title: 'PokéSync',
        tagline: 'Gritty, Survival-Adventure, Resource-Management',
        description:
          "Based on the eponymous PokéSync Fanfic: Pokémon in this world are stronger, larger, and absolutely VORACIOUS. Trainers must balance off-setting their own pokémon's energy-appetites whilst surviving a more dangerous world.",
        image:
          'https://krita-artists.org/uploads/default/original/3X/a/0/a0c9914668be4d0e7070ea01726675c729c43b50.jpeg',
        aspectratio: '20/11',
        icon: 'mdi-pokeball',
        color: '#152EFF',
        to: '/sync',
      },
    ],
  }),
})
