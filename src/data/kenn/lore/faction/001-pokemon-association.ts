import type { Article } from '@/types/kenn'

export default {
  id: 'FACT-001',
  date: '2026-05-11',
  regions: [],
  category: 'LORE',
  loreCategory: 'FACTION',

  title: 'Pokémon Assocaition',
  author: 'KENN Archives',

  icon: 'mdi-shield-account-outline',
  color: 'green-darken-2',
  lastUpdated: '05/11/2026',

  summary:
    'The supreme legislative authority overseeing the professional League circuit and global tournament standards.',

  tags: ['League', 'Governance', 'Ace Trainers', 'Tournaments'],

  links: [
    {
      label: 'Bulbapedia',
      link: 'https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Association',
      image:
        'https://www.clipartmax.com/png/middle/230-2302100_pok%C3%A9mon-wiki-file-apk-free-for-pc-smart-tv-download-bulbapedia-icon.png',
    },
  ],

  routeOverride: '/sandbox/articles/pokemon-association',
} satisfies Article
