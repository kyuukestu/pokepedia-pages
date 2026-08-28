import type { Article } from '@/types/kenn'

export default {
  id: 'NEWS-001',
  date: 'AUGUST 01, XX22',
  regions: ['johto'],
  category: 'NEWS',

  title: 'Sanguine Swarms!',
  author: 'DJ Mary',

  summary:
    'Something unknown has disturbed the Zubat-line Pokémon in Northern Johto. Once peaceful nights are now fraught with aggressive hordes prowling routes 37 through 44.',

  image: 'zubat-swarm.png',

  tags: ['Zubat', 'Advisory', 'League Reward'],

  links: [
    { label: 'Ranger Help Line', link: '#' },
    { label: 'Zubat Info-Graphics (Wiki)', link: '#' },
    { label: 'Affected Areas', link: '#' },
  ],

  content: [
    {
      type: 'paragraph',
      text: 'Trainers beware! The once peaceful nights of northern Johto are now fraught with blood-sucking peril as an unknown force disturbs the natural behavior of local Pokémon.',
    },
    {
      type: 'paragraph',
      text: "While largely harmless in small numbers, massive hordes of Zubat, Golbat, and even once-rare Crobat have shown unusual levels of activity and aggression. The 'Sanguine Swarms'—as Pokémon Behaviorists have dubbed them—have begun to prowl over increasingly large areas, harassing humans and Pokémon with unforeseen boldness.",
    },
    {
      type: 'subheading',
      text: 'Regional Advisory: Affected Routes',
    },
    {
      type: 'paragraph',
      text: 'Although the Sanguine Swarms have yet to cause direct physical harm, a formal advisory has been placed for the following routes due to secondary agitation in the local ecosystem:',
    },
    {
      type: 'list',
      items: [
        'Route 37 & 38 (Ecruteak Outskirts)',
        'Route 39 (Olive-Ecruteak Corridor)',
        'Route 42, 43, & 44 (Mahogany Region)',
        'Special Caution: Tauros & Primeape populations have become highly agitated',
      ],
    },
    {
      type: 'subheading',
      text: 'League Bounty',
    },
    {
      type: 'quote',
      text: 'The League will reward those who can provide accurate and verifiable information on the cause of this situation. A significant bonus awaits those skilled enough to put an end to the sanguine madness!',
      author: 'Indigo Plateau Regional Command',
    },
  ],
} satisfies Article
