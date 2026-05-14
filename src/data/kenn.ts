import { Article } from '@/types/kenn.ts'

export const articles: Article[] = [
  {
    id: 'ken-01', // Assigned based on "Issue #01"
    slug: 'sanguine-swarms-johto',
    date: 'AUGUST 01, XX22',
    region: 'johto',
    category: 'FIELD REPORT', // Classified as Field Report based on the advisory content
    title: 'Sanguine Swarms!',
    author: 'DJ Mary',
    summary:
      'Something unknown has disturbed the Zubat-line Pokémon in Northern Johto. Once peaceful nights are now fraught with aggressive hordes prowling routes 37 through 44.',
    image: 'zubat-swarm.png', // Extracted from --z-image
    tags: ['Zubat', 'Advisory', 'League Reward'],
    // For the detail page
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
  },
  {
    id: 'ken-02',
    slug: 'monkey-madness-ecruteak',
    date: 'AUGUST 02, XX22',
    region: 'johto',
    category: 'FIELD REPORT',
    title: 'Monkey Madness!',
    author: 'DJ Mary',
    summary:
      'Rogue groups of Mankey and Primeape have invaded Ecruteak City, causing chaos among residents and vendors. Experts believe the migration is a direct result of the ongoing Sanguine Swarm.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKMXyTP2VumZyETAmisYIie2hdVeUxTMza5Q&s',
    tags: ['Ecruteak City', 'Mankey', 'Primeape', 'Morty', 'Sanguine Swarm'],
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
        text: "Primeape, known for its boisterous personality, took the lead in the uproar, fearlessly challenging any trainers who dared to confront them. With its muscular frame and unpredictable movements amidst the urban sprawl, the Pokémon gathered its smaller companions and swiftly overwhelmed many of the city's trainers.",
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
  },
  {
    id: 'ken-03',
    slug: 'kalos-medieval-festival-promo',
    date: 'AUGUST 04, XX22',
    region: 'kalos',
    category: 'FIELD REPORT', // Could also be 'EDITORIAL' or 'PROMO' depending on your news types
    title: 'Kalos Medieval Festival: Promo',
    author: 'DJ Mary',
    summary:
      "The renaissance returns to Loire de Fleuve Isle! Experience a 10-day spectacular of knight's duels, jousting, and a Tag-Team Pokémon Tournament at Cyllage City's biggest event.",
    image: 'diantha-armor.webp',
    tags: ['Kalos', 'Cyllage City', 'Festival', 'Tournament', 'Showcase'],
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
  },
  {
    id: 'ART-2022-GAL-FR-001',
    slug: 'motostoke-field-survey-warning',
    date: '2022-06-09',
    region: 'galar',
    category: 'FIELD REPORT',
    title: 'Attention: Field Survey of Motostoke and Surrounding Areas',
    author: 'Nakano Saito',
    summary:
      'A comprehensive analysis of wild Pokémon aggression surges and stress-induced evolution across Route 3, Motostoke Outskirts, West Lake Axewell, and Watchtower Ruins.',
    tags: ['Galar', 'Motostoke', 'Field Report', 'Safety Warning'],
    content: [
      {
        type: 'paragraph',
        text: "Sinnohan Field Researcher Nakano Saito did a survey of the western and eastern sides of Motostoke, as well as Watchtower Ruins and West Lake Axewell. More information will be submitted once data has been collected from East Lake Axewell and Axew's Eye. The list is based on personal experience, past records, and objective analysis of wild Pokemon acting individually or as a group. Hordes will be extremely common among the weaker Pokemon.",
      },
      {
        type: 'paragraph',
        text: 'As a reminder, Pokemon in areas that tend not to contain large amounts of the evolved forms of some of the base form Pokemon one would see on any other time may have an unaccounted for surge in activity. Wild Pokemon of these base forms may evolve due to stress from the encroaching, harsh activity, or their parents may descend onto the more traveled paths from the outskirts to attack those who harm the chance of their lineage continuing.',
      },
      {
        type: 'quote',
        text: 'Essentially, the more dangerous the trainers are and in greater numbers, the stronger the wild Pokemon will become to protect themselves and their homes, whether it be a smaller Pokemon one saw just a few days ago that had evolved after countless stressful battles from trainers, or their parents.',
      },
      {
        type: 'paragraph',
        text: "There will also be more wild Pokemon infighting, as well as a variety of Pokemon in ragtag groups working together to keep themselves and their areas safe. These overly aggressive and defensive Pokemon are not to be trifled with. Weather may become severely unpredictable. Some Pokemon may not be available due to their skittish demeanors, while others that are more docile will become aggressive when approached, and those who are more aggressive will attack trainers and Pokemon they don't recognize on sight. It is likely that those affected by Dynamax energy within the Power Dens and when provoked will be extremely aggressive and highly dangerous, as may break out of the dens themselves if given the opportunity or help.",
      },
      {
        type: 'paragraph',
        text: "Portions of these lists separated by dashes between most and least aggressive include Pokemon who attack if provoked. This can include getting within a certain range that's too close or attacking Pokemon nearby. Some of these Pokemon in these portions may hunt down offenders out of the area. The Pokemon to watch out for from most aggressive to least aggressive include but are not limited to:",
      },
      {
        type: 'subheading',
        text: 'Within Galar Route 3',
      },
      {
        type: 'label',
        text: 'High Risk',
      },
      {
        type: 'list',
        items: ['Centiskorch', 'Skuntank', 'Garbodor'],
      },
      {
        type: 'label',
        text: 'Medium Risk',
      },
      {
        type: 'list',
        items: [
          'Pangoro',
          'Arcanine',
          'Ninetales',
          'Obstagoon',
          'Machoke',
          'Hitmonlee',
          'Hitmonchan',
          'Hitmontop',
          'Corvisquire',
        ],
      },
      {
        type: 'label',
        text: 'Low Risk',
      },
      {
        type: 'list',
        items: ['Galarian Linoone', 'Klang', 'Carkol', 'Mudbray'],
      },
      {
        type: 'subheading',
        text: 'Within Motostoke Outskirts',
      },
      {
        type: 'label',
        text: 'High Risk',
      },
      {
        type: 'list',
        items: [
          'Bisharp',
          'Pawniard',
          'Toxicroak',
          'Croagunk',
          'Scrafty',
          'Scraggy',
          'Grimmsnarl',
          'Morgrem',
          'Drednaw',
        ],
      },
      {
        type: 'label',
        text: 'Medium Risk',
      },
      {
        type: 'list',
        items: [
          'Salazzle',
          'Hatterene',
          'Hattrem',
          'Throh',
          'Sawk',
          'Noctowl',
          'Gigalith',
          'Boldore',
        ],
      },
      {
        type: 'label',
        text: 'Low Risk',
      },
      {
        type: 'list',
        items: ['Galarian Weezing', 'Sudowoodo'],
      },
      {
        type: 'quote',
        text: "*As a special warning, Salazzle are highly dangerous if anyone has any of their male Pokemon outside of their Pokeballs. They will react to the sudden surge of activity by protecting themselves and their Salandit mobs, and they will do so by taking over male Pokemon with their pheromones. In fact, Nakano Saito has counted a greater surge in female Salandit evolutions in the past three days, making Motostoke Outskirts a dangerous area to venture further into. Stay within the most traveled path and away from any mounds or rock fields you may see in the distance. If you smell a sweet or sulfuric smell, steer clear until you can't smell it anymore.",
      },
      {
        type: 'subheading',
        text: 'Within West Lake Axewell',
      },
      {
        type: 'label',
        text: 'High Risk',
      },
      {
        type: 'list',
        items: [
          'Gyarados',
          'Grapploct',
          'Manectric',
          'Shiftry',
          'Froslass',
          'Glalie',
          'Liepard',
          'Galvantula',
          'Kingler',
          'Jellicent',
          'Drednaw',
          'Seaking',
        ],
      },
      {
        type: 'label',
        text: 'Medium Risk',
      },
      {
        type: 'list',
        items: [
          'Pangoro',
          'Gallade',
          'Tsareena',
          'Arcanine',
          'Ninetales',
          'Gardevoir',
          'Hitmonlee',
          'Hitmonchan',
          'Hitmontop',
          'Roserade',
          'Seismitoad',
          'Diggersby',
          'Mudsdale',
        ],
      },
      {
        type: 'label',
        text: 'Low Risk',
      },
      {
        type: 'list',
        items: [
          'Cloyster',
          'Octillery',
          'Claydol',
          'Klinklang',
          'Vanilluxe',
          'Quagsire',
          'Xatu',
          'Wishiwashi School Form',
          "Lapras (if they don't make themselves scarce)",
        ],
      },
      {
        type: 'paragraph',
        text: '*Some Pokemon may appear on land from the lake, or close to shore to deter anyone from stepping into the now hostile waters.',
      },
      {
        type: 'subheading',
        text: 'West Lake Axewell: Dens',
      },
      {
        type: 'label',
        text: 'High Risk',
      },
      {
        type: 'list',
        items: [
          'Drednaw (G-Max)',
          'Kingler (G-Max)',
          'Hydreigon',
          'Tyranitar',
          'Gyarados',
          'Bisharp',
          'Pawniard',
          'Weavile',
          'Sneasel',
          'Crawdaunt',
          'Shiftry',
          'Scrafty',
          'Toxapex',
          'Liepard',
          'Thievul',
          'Malamar',
          'Skuntank',
          'Mandibuzz',
          'Jellicent',
          'Barraskewda',
          'Araquanid',
          'Basculin',
        ],
      },
      {
        type: 'label',
        text: 'Medium Risk',
      },
      {
        type: 'list',
        items: ['Pangoro', 'Obstagoon', 'Barbaracle', 'Seismitoad', 'Whiscash', 'Milotic'],
      },
      {
        type: 'label',
        text: 'Low Risk',
      },
      {
        type: 'list',
        items: [
          'Qwilfish',
          'Cloyster',
          'Lanturn',
          'Quagsire',
          'Octillery',
          'Wishiwashi School Form',
          'Gastrodon',
          'Pyukumuku',
          'Sableye',
          'Mantine',
          'Wailord',
          'Lapras',
        ],
      },
      {
        type: 'subheading',
        text: 'Within Watchtower Ruins',
      },
      {
        type: 'label',
        text: 'High Risk',
      },
      {
        type: 'list',
        items: ['Gengar', 'Haunter', 'Manectric', 'Froslass', 'Glalie', 'Liepard'],
      },
      {
        type: 'label',
        text: 'Medium Risk',
      },
      {
        type: 'list',
        items: [
          'Corviknight',
          'Dusknoir',
          'Dusclops',
          'Tsareena',
          'Abomasnow',
          'Arcanine',
          'Ninetales',
          'Gardevoir',
          'Gallade',
          'Noivern',
          'Machoke',
          'Golurk',
          'Seismitoad',
        ],
      },
      {
        type: 'label',
        text: 'Low Risk',
      },
      {
        type: 'list',
        items: ['Vileplume', 'Drifblim', 'Vikavolt'],
      },
      {
        type: 'subheading',
        text: 'Watchtower Ruins: Dens',
      },
      {
        type: 'label',
        text: 'High Risk',
      },
      {
        type: 'list',
        items: [
          'Gengar',
          'Runerigus',
          'Hatterene (G-Max)',
          'Cursola',
          'Malamar',
          'Sableye',
          'Polteageist',
          'Jellicent',
          'Trevenant',
          'Gourgeist',
        ],
      },
      {
        type: 'label',
        text: 'Medium Risk',
      },
      {
        type: 'list',
        items: [
          'Dusknoir',
          'Gardevoir',
          'Gallade',
          'Gothitelle',
          'Reuniclus',
          'Aegislash',
          'Swoobat',
          'Mr. Rime',
        ],
      },
      {
        type: 'label',
        text: 'Low Risk',
      },
      {
        type: 'list',
        items: ['Beheeyem', 'Drifblim', 'Musharna', 'Meowstic', 'Solrock', 'Lunatone'],
      },
      {
        type: 'subheading',
        text: 'Watchtower Lair',
      },
      {
        type: 'label',
        text: 'High Risk',
      },
      {
        type: 'list',
        items: ['Tyranitar', 'Centiskorch (G-Max)', 'Copperajah (G-Max)', 'Duraludon (G-Max)'],
      },
      {
        type: 'label',
        text: 'Medium Risk',
      },
      {
        type: 'list',
        items: ['Corviknight (G-Max)', 'Kommo-o'],
      },
      {
        type: 'label',
        text: 'Low Risk',
      },
      {
        type: 'list',
        items: ['Sandaconda (G-Max)', 'Flapple/Appletun (G-Max)'],
      },
      {
        type: 'paragraph',
        text: '*From previous records, it is likely that the stir in activity may cause these Pokemon to appear here.',
      },
    ],
  },
]
