import type { Article } from '@/types/kenn'

export default {
  id: 'NEWS-002',
  date: 'AUGUST 02, XX22',
  regions: ['johto'],
  category: 'NEWS',

  title: 'Monkey Madness!',
  author: 'DJ Mary',

  summary:
    'Rogue groups of Mankey and Primeape have invaded Ecruteak City, causing chaos among residents and vendors. Experts believe the migration is a direct result of the ongoing Sanguine Swarm.',

  image:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKMXyTP2VumZyETAmisYIie2hdVeUxTMza5Q&s',

  tags: [
    'Ecruteak City',
    'Mankey',
    'Primeape',
    'Morty',
    'Sanguine Swarm',
  ],

  links: [
    { label: 'Mankey Infographic', link: '#' },
    { label: 'Ecruteak Aces Contact #', link: '#' },
    { label: "Gym Leader's Office Contact #", link: '#' },
  ],

  content: [
    {
      type: 'paragraph',
      text: 'This morning, the peaceful streets of Ecruteak City experienced an unexpected uproar as rogue groups of Mankey and rambunctious Primeape invaded the city, causing a stir among residents and vendors alike.',
    },
    {
      type: 'paragraph',
      text: 'Witnesses reported that shortly after Sunday sunset, the mischievous monkeys began their mission, swinging from trees and darting over roof tiles. The playful Pokémon snatched snacks and trinkets from shocked townsfolk, unleashing a wave of chaos that left overturned carts and scattered goods in their wake.',
    },
    {
      type: 'paragraph',
      text: 'Primeape, known for its boisterous personality, took the lead in the uproar, fearlessly challenging any trainers who dared to confront them. With its muscular frame and unpredictable movements amidst the urban sprawl, the Pokémon gathered its smaller companions and swiftly overwhelmed many of the city\'s trainers.',
    },
    {
      type: 'quote',
      text: 'My Cabbages!!!',
      author: 'Local Produce Vendor',
    },
    {
      type: 'subheading',
      text: 'Official Advisory: Damage Control',
    },
    {
      type: 'paragraph',
      text: 'Although the city, led by Gym Leader Morty, was eventually able to restore order, the troop of monkeys have refused to leave and continue to stir trouble as they scavenge for food and pick fights with trainers.',
    },
    {
      type: 'paragraph',
      text: "Morty has urged trainers to practice caution and discretion to avoid clashes unless absolutely necessary. Ecruteak is one of Johto's oldest and most culture-rich cities; reckless Pokémon battles risk damaging countless historical buildings. Furthermore, there is an additional risk of Mankey evolving into Primeape or, worse, Primeape into Annihilape.",
    },
    {
      type: 'subheading',
      text: 'The Sanguine Link',
    },
    {
      type: 'paragraph',
      text: 'Pokémon Experts believe that this sudden mass-migration was caused by the ongoing Sanguine Swarm. While the Zubat grow more active in their endeavors, Pokémon who have a bad match-up against them—like fighting types—are forced to seek refuge in other locations.',
    },
    {
      type: 'list',
      items: [
        'Practice discretion in historical districts',
        'Avoid unnecessary combat with the resident troop',
        'Contact Ecruteak Aces for task distribution',
        'Secure all food inventory and personal trinkets',
      ],
    },
  ],
} satisfies Article
