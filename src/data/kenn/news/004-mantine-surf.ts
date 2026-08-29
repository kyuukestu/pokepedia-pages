import type { Article } from '@/types/kenn'

export default {
  id: 'KENN-004',
  date: '2026-08-21',
  regions: ['alola'],
  category: 'NEWS',
  title: 'Mantine Surf Super Qualifiers',
  author: 'KENN Editorial',
  summary:
    'The Mantine Surf Super Qualifiers offer aspiring trainers one final chance to earn a place on the Alola Festival stage, with an open surf format focused on style, flow, harmony, and crowd appeal.',
  image: 'https://art.ngfiles.com/images/778000/778421_csgamegalaxy_mantine-surfing.png?f1546978089',
  tags: [
    'Alola',
    'Mantine Surf',
    'Super Qualifiers',
    'Alola Festivals',
    'Tournament',
    'Surfing',
  ],
  links: [
    {
      label: 'Mantine Surf Super Qualifiers',
      link: '#',
    },
  ],

  content: [
    {
      type: 'subheading',
      text: 'Alola ʻĀina • Embrace Your Love of the Land',
    },
    {
      type: 'paragraph',
      text: "Alola Alola! It's that time of year again, and the Alola Festivals are just around the corner. This year's theme is Alola ʻĀina—Embrace your love of the land.",
    },
    {
      type: 'paragraph',
      text: "Before the celebrations begin in full, there's one last chance for aspiring trainers to earn their place on the Festival stage.",
    },
    {
      type: 'subheading',
      text: 'Open Surf Format',
    },
    {
      type: 'paragraph',
      text: 'Throughout the week, participants may enter the waves at any time and submit up to three independent surf runs.',
    },
    {
      type: 'paragraph',
      text: 'Each run is judged on its own. There is no turn order, no brackets, and no restrictions. Just you, your Pokémon, and your quest for the perfect wave.',
    },
    {
      type: 'quote',
      text: 'Only your highest-scoring run counts toward final placement.',
    },
    {
      type: 'subheading',
      text: 'How the Waves Are Judged',
    },
    {
      type: 'paragraph',
      text: 'Each run is evaluated across four categories:',
    },
    {
      type: 'list',
      items: [
        'Style — Creativity, flair, and trick execution.',
        'Flow — Control, smoothness, and clean performance.',
        'Harmony — Coordination and trust between Trainer and Pokémon.',
        'Crowd Appeal — Presence, energy, and thematic performance.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Each category is scored from 1–10, creating a base score out of 40. A light dice modifier reflects the ocean’s unpredictability.',
    },
    {
      type: 'subheading',
      text: 'The Seas',
    },
    {
      type: 'paragraph',
      text: 'No two days on the water will be the same. Courtesy of your lovely Judges, conditions will shift between calm surf, rolling swells, strong currents, and weather-altered wave patterns.',
    },
    {
      type: 'paragraph',
      text: 'The full forecast will be shared ahead of time so participants can plan their runs and choose their moments wisely.',
    },
    {
      type: 'quote',
      text: 'Adaptation is part of the challenge.',
    },
    {
      type: 'subheading',
      text: 'Festival Spirit',
    },
    {
      type: 'paragraph',
      text: 'This is a celebration first, competition second. A space for newcomers, locals, travelers, and rising talent alike to carve their place into Alolan surf culture before the Festival season begins.',
    },
    {
      type: 'quote',
      text: 'Show up when it suits you. Ride when you’re ready. Leave your mark on the waves.',
      author: 'Alola Festival Program',
    },
  ],
} satisfies Article;
