/**
 * Represents a specific Regional Circuit (e.g., Kanto, Johto).
 */
export interface RegionalCircuit {
  id: string // e.g., 'kanto'
  name: string
  heroSubtitle: string
  heroColor: string
  gymIds: string[]
}

/**
 * Represents the Elite Four Summit members.
 */
export interface SummitMember {
  name: string
  specialty: string
  title: string
  image: string
  color: string
  isChampion: boolean
}

/**
 * The Root League Object.
 */
export interface LeagueMeta {
  id: string
  name: string
  tagline: string
  themeColor: string
  icon: string

  // Champion League Portal Details
  portalOverline: string
  championTitle: string
  championDescription: string
  championTo: string

  // Conference Details
  conferenceName: string
  conferenceDescription: string
  qualificationRule: string // Supports HTML for bolding rules

  timeline: {
    date: string
    label: string
    color: string
  }[]

  // Nested Data Groups
  summit: SummitMember[]
  circuits: RegionalCircuit[]
}

export const indigoLeague: LeagueMeta = {
  id: 'indigo-league',
  name: 'Indigo League',
  tagline: 'The unified competitive ladder of the Indigo Federation.',
  themeColor: 'indigo-darken-2',
  icon: 'mdi-podium-gold',

  portalOverline: 'The Final Gauntlet',
  championTitle: 'Champion League',
  championDescription:
    'The pinnacle of the Indigo Federation. Face the Elite Four gauntlet to earn your right to challenge the reigning Champion.',
  championTo: '/sandbox/regions/indigo/league/champion-league',

  conferenceName: 'The Indigo Conference',
  conferenceDescription:
    'Held annually at the Indigo Plateau, the Conference is a month-long tournament where the top badge holders compete for the right to challenge the Elite Four.',
  qualificationRule:
    '<strong>16-Badge Rule:</strong> Trainers must certify 8 Kanto badges and 8 Johto badges to qualify for the December brackets.',

  timeline: [
    { date: 'January', label: 'Season Kickoff', color: 'success' },
    { date: 'Feb – Oct', label: 'Badge Collection', color: 'primary' },
    { date: 'December', label: 'The Conference', color: 'error' },
  ],

  summit: [
    {
      name: 'Will',
      specialty: 'psychic',
      title: 'Master of Illusions',
      color: '#ab47bc',
      isChampion: false,
      image: '/path/to/will.png',
    },
    {
      name: 'Koga',
      specialty: 'poison',
      title: 'The Fanged Shinobi',
      color: '#7e57c2',
      isChampion: false,
      image: '/path/to/koga.png',
    },
    {
      name: 'Bruno',
      specialty: 'fighting',
      title: 'The Iron-Willed Warrior',
      color: '#f44336',
      isChampion: false,
      image: '/path/to/bruno.png',
    },
    {
      name: 'Karen',
      specialty: 'dark',
      title: 'The Midnight Beauty',
      color: '#37474f',
      isChampion: false,
      image: '/path/to/karen.png',
    },
    {
      name: 'Lance',
      specialty: 'dragon',
      title: 'The Dragon Master',
      color: '#ff5252',
      isChampion: true,
      image: '/path/to/lance.png',
    },
  ],

  circuits: [
    {
      id: 'kanto',
      name: 'Kanto Circuit',
      heroSubtitle: 'The journey of eight badges begins here.',
      heroColor: 'red-darken-2',
      gymIds: [
        'pewter-gym',
        'cerulean-gym',
        'vermilion-gym',
        'celadon-gym',
        'fuchsia-gym',
        'saffron-gym',
        'cinnabar-gym',
        'viridian-gym',
        'fighting-dojo',
        'yas-gym',
        'kaz-gym',
      ],
    },
    {
      id: 'johto',
      name: 'Johto Circuit',
      heroSubtitle: 'Explore the historic path across the Silver Mountains.',
      heroColor: 'blue-darken-2',
      gymIds: [
        'violet-gym',
        'azalea-gym',
        'goldenrod-gym',
        'ecruteak-gym',
        'cianwood-gym',
        'olivine-gym',
        'mahogany-gym',
        'blackthorn-gym',
        'blackthorne-outskirts',
        'olivine-secondary',
      ],
    },
  ],
}

export const hoennLeague: LeagueMeta = {
  id: 'hoenn-league',
  name: 'Hoenn League',
  tagline: 'Where the land meets the sea and dreams take flight.',
  themeColor: 'emerald-darken-2',
  icon: 'mdi-tsunami',

  portalOverline: 'Ever Grande Gauntlet',
  championTitle: 'Victory Road Summit',
  championDescription:
    'Ascend the floral peaks of Ever Grande City to challenge the Hoenn Elite Four.',
  championTo: '/sandbox/regions/hoenn/hoenn-league/champion-league',

  conferenceName: 'Ever Grande Conference',
  conferenceDescription:
    'A grand tournament gathering the strongest trainers from across the archipelago.',
  qualificationRule:
    '<strong>8-Badge Rule:</strong> Completion of the Hoenn Regional Circuit is mandatory.',

  timeline: [
    { date: 'March', label: 'Circuit Start', color: 'info' },
    { date: 'October', label: 'Ever Grande Qualifiers', color: 'warning' },
    { date: 'November', label: 'Championship', color: 'error' },
  ],

  summit: [
    {
      name: 'Sidney',
      specialty: 'dark',
      title: 'The Punk Master',
      color: '#455a64',
      isChampion: false,
      image: '',
    },
    {
      name: 'Phoebe',
      specialty: 'ghost',
      title: 'The Spirit Whistler',
      color: '#9c27b0',
      isChampion: false,
      image: '',
    },
    {
      name: 'Glacia',
      specialty: 'ice',
      title: 'The Frozen Queen',
      color: '#81d4fa',
      isChampion: false,
      image: '',
    },
    {
      name: 'Drake',
      specialty: 'dragon',
      title: 'The Draconid Veteran',
      color: '#c62828',
      isChampion: false,
      image: '',
    },
    {
      name: 'Steven',
      specialty: 'steel',
      title: 'The Iron Sovereign',
      color: '#546e7a',
      isChampion: true,
      image: '',
    },
  ],

  circuits: [
    {
      id: 'hoenn',
      name: 'Hoenn Circuit',
      heroSubtitle: 'Master the elements of Hoenn.',
      heroColor: 'teal-darken-1',
      // Unified list of all gyms in the circuit
      gymIds: [
        'rustboro-gym',
        'dewford-gym',
        'mauville-gym',
        'lavaridge-gym',
        'petalburg-gym',
        'fortree-gym',
        'mossdeep-gym',
        'sootopolis-gym',
      ],
    },
  ],
}

export const sinnohLeague: LeagueMeta = {
  id: 'sinnoh-league',
  name: 'Sinnoh League',
  tagline: 'In the shadow of Mount Coronet, legends are forged.',
  themeColor: 'blue-grey-darken-4',
  icon: 'mdi-mountain',

  portalOverline: 'The Lily of the Valley',
  championTitle: 'Mount Coronet Summit',
  championDescription:
    'Only those who have weathered the snow of Route 216 may stand before the Champion.',
  championTo: '/sandbox/regions/sinnoh/sinnoh-league/champion-league',

  conferenceName: 'Lily of the Valley Conference',
  conferenceDescription:
    'The most grueling tournament in the North, held on its own private island.',
  qualificationRule:
    '<strong>Badge Compliance:</strong> 8 badges from the Sinnoh sanctioned circuit.',

  timeline: [
    { date: 'Year Round', label: 'League Window', color: 'grey' },
    { date: 'August', label: 'Lily of the Valley', color: 'deep-purple' },
  ],

  summit: [
    {
      name: 'Aaron',
      specialty: 'bug',
      title: 'The Bug Prodigy',
      color: '#689f38',
      isChampion: false,
      image: '',
    },
    {
      name: 'Vacant',
      specialty: 'normal',
      title: 'None',
      color: '#795548',
      isChampion: false,
      image: '',
    },
    {
      name: 'Flint',
      specialty: 'fire',
      title: 'The Burning Spirit',
      color: '#ef5350',
      isChampion: false,
      image: '',
    },
    {
      name: 'Lucian',
      specialty: 'psychic',
      title: 'The Master of Minds',
      color: '#ec407a',
      isChampion: false,
      image: '',
    },
    {
      name: 'Cynthia',
      specialty: 'mixed',
      title: 'The Archeologist Champion',
      color: '#212121',
      isChampion: true,
      image: '',
    },
  ],

  circuits: [
    {
      id: 'sinnoh',
      name: 'Sinnoh Circuit',
      heroSubtitle: 'The path of ancient Sinnoh.',
      heroColor: 'blue-grey-darken-2',
      gymIds: [
        'oreburgh-gym',
        'eterna-gym',
        'veilstone-gym',
        'pastoria-gym',
        'hearthome-gym',
        'canalave-gym',
        'snowpoint-gym',
        'sunyshore-gym',
      ],
    },
  ],
}

export const unovaLeague: LeagueMeta = {
  id: 'unova-league',
  name: 'Unova League',
  tagline: 'Intersections of truth and ideals.',
  themeColor: 'grey-darken-4',
  icon: 'mdi-city-variant',

  portalOverline: 'The Unova High Council',
  championTitle: 'Victory Terrace',
  championDescription:
    'At the end of the badge path lies the grandest palace in the Western world.',
  championTo: '/sandbox/regions/unova/unova-league/champion-league',

  conferenceName: 'Vertress Conference',
  conferenceDescription: 'A high-tech tournament hosted in the Vertress City complex.',
  qualificationRule: '<strong>Strict 8-Badge:</strong> Only current sanctioned gyms are valid.',

  timeline: [
    { date: 'July', label: 'Summer Season', color: 'orange' },
    { date: 'September', label: 'Vertress Finals', color: 'red' },
  ],

  summit: [
    {
      name: 'Shauntal',
      specialty: 'ghost',
      title: 'The Shadow Novelist',
      color: '#5e35b1',
      isChampion: false,
      image: '',
    },
    {
      name: 'Marshal',
      specialty: 'fighting',
      title: 'The Fist of Justice',
      color: '#d84315',
      isChampion: false,
      image: '',
    },
    {
      name: 'Grimsley',
      specialty: 'dark',
      title: 'The High Stakes Gambler',
      color: '#263238',
      isChampion: false,
      image: '',
    },
    {
      name: 'Caitlin',
      specialty: 'psychic',
      title: 'The Dreaming Star',
      color: '#f06292',
      isChampion: false,
      image: '',
    },
    {
      name: 'Iris',
      specialty: 'dragon',
      title: 'The Dragon Queen',
      color: '#ab47bc',
      isChampion: true,
      image: '',
    },
  ],

  circuits: [
    {
      id: 'unova',
      name: 'Unova Circuit',
      heroSubtitle: 'A modern challenge for a new age.',
      heroColor: 'blue-grey-darken-3',
      gymIds: [
        'aspertia-gym',
        'virbank-gym',
        'castelia-gym',
        'nimbasa-gym',
        'driftveil-gym',
        'mistralton-gym',
        'opelucid-gym',
        'humilau-gym',
        'nacrene-gym',
        'icirrus-gym',
        'striaton-gym',
      ],
    },
  ],
}

export const kalosLeague: LeagueMeta = {
  id: 'kalos-league',
  name: 'Kalos League',
  tagline: 'The pinnacle of beauty and competitive excellence.',
  themeColor: 'pink-darken-1',
  icon: 'mdi-flower-poppy',

  portalOverline: 'The Hall of Radiance',
  championTitle: 'Lumiose Summit',
  championDescription:
    'Ascend to the highest peak of the Kalosian mountains to challenge the reigning Grand Star.',
  championTo: '/sandbox/regions/kalos/kalos-league/champion-league',

  conferenceName: 'Lumiose Conference',
  conferenceDescription: 'A world-class tournament gathering the strongest Mega Evolution masters.',
  qualificationRule:
    '<strong>8-Badge Rule:</strong> Completion of the Kalos Regional Circuit is mandatory.',

  timeline: [
    { date: 'Year Round', label: 'Badge Quest', color: 'primary' },
    { date: 'October', label: 'Lumiose Qualifiers', color: 'pink' },
  ],

  summit: [
    {
      name: 'Malva',
      specialty: 'fire',
      title: 'The Burning Star',
      color: '#e91e63',
      isChampion: false,
      image: '',
    },
    {
      name: 'Siebold',
      specialty: 'water',
      title: 'The Culinary Master',
      color: '#0288d1',
      isChampion: false,
      image: '',
    },
    {
      name: 'Wikstrom',
      specialty: 'steel',
      title: 'The Chivalrous Knight',
      color: '#607d8b',
      isChampion: false,
      image: '',
    },
    {
      name: 'Drasna',
      specialty: 'dragon',
      title: 'The Draconid Sage',
      color: '#9c27b0',
      isChampion: false,
      image: '',
    },
    {
      name: 'Diantha',
      specialty: 'fairy',
      title: 'The Grand Star',
      color: '#f8bbd0',
      isChampion: true,
      image: '',
    },
  ],

  circuits: [
    {
      id: 'kalos',
      name: 'Kalos Circuit',
      heroSubtitle: 'Master the arts of Kalosian battle.',
      heroColor: 'pink-lighten-2',
      // Unified list for easy filtering via isPrimary
      gymIds: [
        'santalune-gym',
        'cyllage-gym',
        'shalour-gym',
        'coumarine-gym',
        'lumiose-gym',
        'laverre-gym',
        'anistar-gym',
        'snowbelle-gym',
      ],
    },
  ],
}

export const alolaLeague: LeagueMeta = {
  id: 'alola-league',
  name: 'Alola League',
  tagline: 'The sun shines on the Island Challenge.',
  themeColor: 'orange-darken-2',
  icon: 'mdi-sun-side',

  portalOverline: 'Mount Lanakila',
  championTitle: 'The First Defender',
  championDescription:
    'Alola’s newly established League welcomes those who have conquered the Great Trials.',
  championTo: '/sandbox/regions/alola/alola-league/champion-league',

  conferenceName: 'Manalo Conference',
  conferenceDescription:
    "A historic celebration marking Alola's entry into the global League community.",
  qualificationRule:
    '<strong>Grand Trial Rule:</strong> Completion of all four Island Kahuna battles.',

  timeline: [
    { date: 'Flexible', label: 'Island Challenge', color: 'orange' },
    { date: 'Championship', label: 'Manalo Festival', color: 'yellow' },
  ],

  summit: [
    {
      name: 'Hala',
      specialty: 'fighting',
      title: 'Kahuna of Melemele',
      color: '#f57c00',
      isChampion: false,
      image: '',
    },
    {
      name: 'Olivia',
      specialty: 'rock',
      title: 'Kahuna of Akala',
      color: '#8d6e63',
      isChampion: false,
      image: '',
    },
    {
      name: 'Acerola',
      specialty: 'ghost',
      title: 'The Trial Captain',
      color: '#7e57c2',
      isChampion: false,
      image: '',
    },
    {
      name: 'Kahili',
      specialty: 'flying',
      title: 'The Golfing Ace',
      color: '#4fc3f7',
      isChampion: false,
      image: '',
    },
    {
      name: 'Kukui',
      specialty: 'mixed',
      title: 'The Founder',
      color: '#ffffff',
      isChampion: true,
      image: '',
    },
  ],

  circuits: [
    {
      id: 'alola',
      name: 'Island Challenge',
      heroSubtitle: 'Conquer the Trials of the Four Islands.',
      heroColor: 'amber-darken-1',
      gymIds: [
        'melemele-trial',
        'akala-trial',
        'ulaula-trial',
        'poni-trial',
        'ilima-trial',
        'lana-trial',
        'kiawe-trial',
        'mallow-trial',
        'sophocles-trial',
        'mina-trial',
      ],
    },
  ],
}

export const galarLeague: LeagueMeta = {
  id: 'galar-league',
  name: 'Galar League',
  tagline: 'The ultimate sporting spectacle of the Galar region.',
  themeColor: 'deep-purple-accent-4',
  icon: 'mdi-soccer',

  portalOverline: 'The Champions Cup',
  championTitle: 'Wyndon Summit',
  championDescription: 'Face the Elite in Wyndon Stadium before the eyes of thousands.',
  championTo: '/sandbox/regions/galar/galar-league/champion-league',

  conferenceName: 'The Champions Cup',
  conferenceDescription: 'A single-elimination tournament held in Wyndon Stadium.',
  qualificationRule:
    '<strong>Endorsement Rule:</strong> Trainers must be endorsed by a champion or gym leader.',

  timeline: [
    { date: 'Spring', label: 'Opening Ceremony', color: 'success' },
    { date: 'Season', label: 'Gym Challenge', color: 'primary' },
    { date: 'Finals', label: 'Champions Cup', color: 'error' },
  ],

  summit: [
    {
      name: 'Leon',
      specialty: 'mixed',
      title: 'The Unbeatable',
      color: '#4527a0',
      isChampion: true,
      image: '',
    },
  ],

  circuits: [
    {
      id: 'galar',
      name: 'Gym Challenge',
      heroSubtitle: 'Fight for the crowd in the Galar stadia.',
      heroColor: 'deep-purple-lighten-1',
      gymIds: [
        'turffield-gym',
        'hulbury-gym',
        'motostoke-gym',
        'stow-on-side-ghost',
        'ballonlea-gym',
        'circhester-ice',
        'spikemuth-gym',
        'hammerlocke-gym',
        'stow-on-side-fighting',
        'circhester-rock',
        'isle-armor-poison',
        'isle-armor-psychic',
      ],
    },
  ],
}

export const paldeaLeague: LeagueMeta = {
  id: 'paldea-league',
  name: 'Paldea League',
  tagline: 'Forge your own path to the Champion Rank.',
  themeColor: 'orange-darken-4',
  icon: 'mdi-school',

  portalOverline: 'Champion Assessment',
  championTitle: 'Geoglyph Summit',
  championDescription:
    'Pass the interview and the gauntlet to achieve the prestigious Champion Rank.',
  championTo: '/sandbox/regions/paldea/paldea-league/champion-league',

  conferenceName: 'Champion Assessment',
  conferenceDescription:
    'Unlike other regions, multiple trainers can hold the rank of Champion simultaneously.',
  qualificationRule:
    '<strong>Victory Road:</strong> Conquer all 8 gyms in any order and pass the interview.',

  timeline: [
    { date: 'Flexible', label: 'Treasure Hunt', color: 'orange' },
    { date: 'On-Demand', label: 'Final Assessment', color: 'primary' },
  ],

  summit: [
    {
      name: 'Rika',
      specialty: 'ground',
      title: 'The Casual Ace',
      color: '#4e342e',
      isChampion: false,
      image: '',
    },
    {
      name: 'Poppy',
      specialty: 'steel',
      title: 'The Prodigy',
      color: '#90a4ae',
      isChampion: false,
      image: '',
    },
    {
      name: 'Larry',
      specialty: 'flying',
      title: 'The Exceptional Salaryman',
      color: '#546e7a',
      isChampion: false,
      image: '',
    },
    {
      name: 'Hassel',
      specialty: 'dragon',
      title: 'The Art Master',
      color: '#b71c1c',
      isChampion: false,
      image: '',
    },
    {
      name: 'Geeta',
      specialty: 'mixed',
      title: 'La Primera',
      color: '#212121',
      isChampion: true,
      image: '',
    },
  ],

  circuits: [
    {
      id: 'paldea',
      name: 'Victory Road',
      heroSubtitle: 'The open skies of Paldea await.',
      heroColor: 'orange-accent-4',
      gymIds: [
        'cortondo-gym',
        'artazon-gym',
        'levincia-gym',
        'cascarrafa-gym',
        'medali-gym',
        'montenevera-gym',
        'alfornada-gym',
        'glaseado-gym',
      ],
    },
  ],
}

export const leagues: LeagueMeta[] = [
  indigoLeague,
  hoennLeague,
  sinnohLeague,
  unovaLeague,
  kalosLeague,
  alolaLeague,
  galarLeague,
  paldeaLeague,
]
