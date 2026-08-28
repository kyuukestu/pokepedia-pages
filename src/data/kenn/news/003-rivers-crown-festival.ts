import type { Article } from '@/types/kenn'

export default {
  id: 'NEWS-003',
  date: 'AUGUST 04, XX22',
  regions: ['kalos'],
  category: 'NEWS',

  title: "River's Crown Medieval Festival: Promo",
  author: 'DJ Mary',

  summary:
    "The renaissance returns to Loire de Fleuve Isle! Experience a 10-day spectacular of knight's duels, jousting, and a Tag-Team Pokémon Tournament at Cyllage City's biggest event.",

  image: 'diantha-armor.webp',

  tags: [
    'Kalos',
    'Cyllage City',
    'Festival',
    'Tournament',
    'Showcase',
  ],

  links: [
    {
      label: 'French-Breton War',
      link: 'https://en.wikipedia.org/wiki/French%E2%80%93Breton_War',
    },
    {
      label: 'Kalos Medieval Festival: Online Registration',
      link: 'https://www.rpnation.com/threads/pokemon-the-rivers-crown-medieval-festival-recruitment.554996/',
    },
  ],

  content: [
    {
      type: 'paragraph',
      text: "See Kalos' rich past meet its vibrant present at Cyllage City's biggest event of the year—The River's Crown Medieval Festival!",
    },
    {
      type: 'paragraph',
      text: 'The renaissance returns to Loire de Fleuve Isle, just off the coast of Cyllage City, from August 4th to August 13th! History, Adventure, and Festivity come alive in a spectacular display of medieval splendor! Experience the sights, sounds, tastes, and feel of ancient Kalos!',
    },
    {
      type: 'paragraph',
      text: 'This 10-day event provides a space where history buffs, fantasy lovers, and Pokémon fans alike can enjoy a spectacular blend of old-world charm and modern fun!',
    },
    {
      type: 'subheading',
      text: 'A Barrage of Events',
    },
    {
      type: 'list',
      items: [
        'An Art Exhibition',
        'Live Plays & Dramatic Performances',
        "Knight's Duels & Jousting Tournaments",
        'A Tag-Team Pokémon Tournament',
        'A Pokémon Showcase',
        'And even a full-on Battle Recreation!',
      ],
    },
    {
      type: 'quote',
      text: "It's a feast for the senses, sure to satisfy your every delight!",
      author: 'Official Festival Program',
    },
  ],
} satisfies Article
