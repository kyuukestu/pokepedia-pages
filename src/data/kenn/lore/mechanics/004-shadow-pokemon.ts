import type { Article } from '@/types/kenn'

export default {
  id: 'MECH-004',
  date: '2026-08-28',
  regions: ['orre'],
  category: 'LORE',
  title: 'Shadow Pokémon',
  author: 'KENN Editorial',
  summary:
    'A primer on Shadow Pokémon, their corrupted combat capabilities, Hyper Mode, and the unique mechanics of Shadow Moves.',
  image: 'https://i.etsystatic.com/39014342/r/il/66fdd6/4963474660/il_680x540.4963474660_s69p.jpg',
  tags: [
    'Shadow Pokémon',
    'Orre',
    'Shadow Boost',
    'Hyper Mode',
    'Shadow Moves',
    'Mechanics',
  ],
  
  loreCategory: 'MECHANIC',
  icon: 'mdi-pokeball',
  color: 'deep-purple-darken-2',
  lastUpdated: '2026-08-28',

  content: [
    {
      type: 'paragraph',
      text: 'Originating from the Orre Region, Shadow Pokémon are the result of a mysterious process that strips away their emotions—"shutting the door to their hearts"—turning them into soulless fighting machines.',
    },
    {
      type: 'paragraph',
      text: 'Unlike normal Pokémon, which are typically friendly and trusting, Shadow Pokémon attack without hesitation and with ruthless intensity. They may even attack trainers, including their own, in fits of blind rage.',
    },
    {
      type: 'paragraph',
      text: 'While they appear visually identical to normal Pokémon, certain abilities, tools, or individuals attuned to aura can detect their corrupted state.',
    },
    {
      type: 'quote',
      text: 'Due to the abusive nature of their creation, trainers in possession of Shadow Pokémon will receive intense scrutiny from the Pokémon Protection Agency and may even have their Trainer License revoked.',
      author: 'Pokémon Protection Agency Advisory',
    },
    {
      type: 'subheading',
      text: 'Shadow Boost',
    },
    {
      type: 'paragraph',
      text: 'Shadow Pokémon emit a sinister aura that enhances their combat capabilities. This is known as the Shadow Boost: a permanent +1 boost to all stats (omni-boost) while the Pokémon remains in its Shadow state.',
    },
    {
      type: 'quote',
      text: 'The Shadow Boost cannot be removed by any means except purification.',
    },
    {
      type: 'subheading',
      text: 'Hyper Mode',
    },
    {
      type: 'paragraph',
      text: 'Occasionally, a Shadow Pokémon will be overwhelmed by its suppressed emotions, triggering Hyper Mode. In this state, the Pokémon gains another omni-boost for five turns, greatly amplifying its power.',
    },
    {
      type: 'quote',
      text: 'The Hyper Mode boost cannot be removed by Haze or similar effects.',
    },
    {
      type: 'subheading',
      text: 'Shadow Moves',
    },
    {
      type: 'paragraph',
      text: 'When a Pokémon becomes a Shadow Pokémon, all of its moves are corrupted into Shadow Moves. These moves retain their base power and effects.',
    },
    {
      type: 'paragraph',
      text: 'Shadow Moves become typeless, losing any S.T.A.B. (Same Type Attack Bonus). In exchange, they deal super-effective damage to all non-Shadow Pokémon, regardless of the original move type.',
    },
    {
      type: 'quote',
      text: 'Shadow Moves are infused with a foul, corrupting aura. Repeated exposure is believed to cause severe aura damage to normal Pokémon, weakening their connection to their emotions and potentially leaving lasting effects.',
    },
  ],
} satisfies Article;
