/**
 * Represents a Gym Leader within a circuit.
 */
export interface GymLeader {
  name: string
  city: string
  specialty: string
  typeIcon: string // e.g., 'water.svg'
  color: string // Vuetify color class or Hex
  badge: string
  to: string // Path to NPC/OC page
}

/**
 * Represents a specific Regional Circuit (e.g., Kanto, Johto).
 */
export interface RegionalCircuit {
  id: string // e.g., 'kanto'
  name: string
  heroSubtitle: string
  heroColor: string
  requirements: {
    title: string
    text: string
  }[]
  mainLeaders: GymLeader[]
  secondaryLeaders: GymLeader[]
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

  // Champion League (The Summit)
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

  /**
   * ELITE FOUR & CHAMPION
   * Updated to match the "Chamber" interface requirements.
   */
  summit: [
    {
      name: 'Will',
      specialty: 'Psychic',
      title: 'Master of Illusions',
      color: '#ab47bc', // Psychic Purple
      isChampion: false,
      image: '/path/to/will.png',
    },
    {
      name: 'Koga',
      specialty: 'Poison',
      title: 'The Fanged Shinobi',
      color: '#7e57c2', // Poison Purple-Deep
      isChampion: false,
      image: '/path/to/koga.png',
    },
    {
      name: 'Bruno',
      specialty: 'Fighting',
      title: 'The Iron-Willed Warrior',
      color: '#f44336', // Fighting Red
      isChampion: false,
      image: '/path/to/bruno.png',
    },
    {
      name: 'Karen',
      specialty: 'Dark',
      title: 'The Midnight Beauty',
      color: '#37474f', // Dark Grey
      isChampion: false,
      image: '/path/to/karen.png',
    },
    {
      name: 'Lance',
      specialty: 'Dragon',
      title: 'The Dragon Master',
      color: '#ff5252', // Champion/Dragon Red
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
      requirements: [
        {
          title: 'Badge Collection',
          text: 'Trainers must collect all 8 official Indigo badges from Kanto-based sanctioned Gyms.',
        },
        {
          title: 'Dojo Tradition',
          text: 'Unofficial gyms like the Fighting Dojo do not count toward Conference qualification.',
        },
        {
          title: 'G-Men Scouting',
          text: 'Defeating local masters is often a requirement for specific "G-Men" scouting programs.',
        },
      ],
      mainLeaders: [
        {
          name: 'Brock',
          city: 'Pewter City',
          specialty: 'Rock',
          typeIcon: 'rock.svg',
          color: 'brown-lighten-1',
          badge: 'Boulder Badge',
          to: '/sandbox/characters/npc/brock',
        },
        {
          name: 'Misty',
          city: 'Cerulean City',
          specialty: 'Water',
          typeIcon: 'water.svg',
          color: 'blue-lighten-2',
          badge: 'Cascade Badge',
          to: '/sandbox/characters/npc/misty',
        },
        {
          name: 'Visquez',
          city: 'Vermilion City',
          specialty: 'Electric',
          typeIcon: 'electric.svg',
          color: 'amber-darken-2',
          badge: 'Thunder Badge',
          to: '/sandbox/characters/npc/surge',
        },
        {
          name: 'Erika',
          city: 'Celadon City',
          specialty: 'Grass',
          typeIcon: 'grass.svg',
          color: 'green-lighten-1',
          badge: 'Rainbow Badge',
          to: '/sandbox/characters/npc/erika',
        },
        {
          name: 'Janine',
          city: 'Fuchsia City',
          specialty: 'Poison',
          typeIcon: 'poison.svg',
          color: 'purple-darken-2',
          badge: 'Soul Badge',
          to: '/sandbox/characters/npc/janine',
        },
        {
          name: 'Sabrina',
          city: 'Saffron City',
          specialty: 'Psychic',
          typeIcon: 'psychic.svg',
          color: 'pink-accent-2',
          badge: 'Marsh Badge',
          to: '/sandbox/characters/npc/sabrina',
        },
        {
          name: 'Maker',
          city: 'Cinnabar Island',
          specialty: 'Fire',
          typeIcon: 'fire.svg',
          color: 'deep-orange-darken-1',
          badge: 'Volcano Badge',
          to: '/sandbox/characters/oc/maker',
        },
        {
          name: 'Blue',
          city: 'Viridian City',
          specialty: 'All-Type',
          typeIcon: 'normal.svg',
          color: 'blue-grey-darken-3',
          badge: 'Earth Badge',
          to: '/sandbox/characters/npc/blue',
        },
      ],
      secondaryLeaders: [
        {
          name: 'Koichi',
          city: 'Saffron City',
          specialty: 'Fighting',
          typeIcon: 'fighting.svg',
          color: 'orange-darken-4',
          badge: 'Unofficial / Dojo',
          to: '/sandbox/characters/npc/karate-master',
        },
        {
          name: 'Yas',
          city: 'Dark City',
          specialty: 'Scyther-Style',
          typeIcon: 'bug.svg',
          color: 'light-green-darken-4',
          badge: 'Yas Gym',
          to: '/sandbox/characters/npc/yas',
        },
        {
          name: 'Kaz',
          city: 'Dark City',
          specialty: 'Electabuzz-Style',
          typeIcon: 'electric.svg',
          color: 'yellow-darken-4',
          badge: 'Kaz Gym',
          to: '/sandbox/characters/npc/kaz',
        },
      ],
    },
    {
      id: 'johto',
      name: 'Johto Circuit',
      heroSubtitle: 'Explore the historic path across the Silver Mountains.',
      heroColor: 'blue-darken-2',
      requirements: [
        {
          title: 'The Silver Challenge',
          text: '8 Johto badges are required for entry into the Silver Conference bracket.',
        },
      ],
      mainLeaders: [
        {
          name: 'Falkner',
          city: 'Violet City',
          specialty: 'Flying',
          typeIcon: 'flying.svg',
          color: 'blue-lighten-4',
          badge: 'Zephyr Badge',
          to: '/sandbox/characters/npc/falkner',
        },
        {
          name: 'Bugsy',
          city: 'Azalea Town',
          specialty: 'Bug',
          typeIcon: 'bug.svg',
          color: 'light-green-accent-4',
          badge: 'Hive Badge',
          to: '/sandbox/characters/npc/bugsy',
        },
        {
          name: 'Whitney',
          city: 'Goldenrod City',
          specialty: 'Normal',
          typeIcon: 'normal.svg',
          color: 'pink-lighten-3',
          badge: 'Plain Badge',
          to: '/sandbox/characters/npc/whitney',
        },
        {
          name: 'Morty',
          city: 'Ecruteak City',
          specialty: 'Ghost',
          typeIcon: 'ghost.svg',
          color: 'deep-purple-darken-1',
          badge: 'Fog Badge',
          to: '/sandbox/characters/npc/morty',
        },
        {
          name: 'Chuck',
          city: 'Cianwood City',
          specialty: 'Fighting',
          typeIcon: 'fighting.svg',
          color: 'brown-darken-3',
          badge: 'Storm Badge',
          to: '/sandbox/characters/npc/chuck',
        },
        {
          name: 'Jasmine',
          city: 'Olivine City',
          specialty: 'Steel',
          typeIcon: 'steel.svg',
          color: 'blue-grey-lighten-2',
          badge: 'Mineral Badge',
          to: '/sandbox/characters/npc/jasmine',
        },
        {
          name: 'Lorelei',
          city: 'Mahogany Town',
          specialty: 'Ice',
          typeIcon: 'ice.svg',
          color: 'cyan-lighten-4',
          badge: 'Glacier Badge',
          to: '/sandbox/characters/npc/lorelei',
        },
        {
          name: 'Clair',
          city: 'Blackthorn City',
          specialty: 'Dragon',
          typeIcon: 'dragon.svg',
          color: 'indigo-accent-4',
          badge: 'Rising Badge',
          to: '/sandbox/characters/npc/clair',
        },
      ],
      secondaryLeaders: [
        {
          name: 'Dorian',
          city: 'Blackthorne Outskirts',
          specialty: 'Water',
          typeIcon: 'water.svg',
          color: 'cyan-darken-2',
          badge: 'Wave Badge',
          to: '/sandbox/characters/npc/dorian',
        },
        {
          name: 'Nathan',
          city: 'Olivine City',
          specialty: 'Normal',
          typeIcon: 'Normal.svg',
          color: 'grey-darken-2',
          badge: 'Plain Badge',
          to: '/sandbox/characters/npc/Nathan',
        },
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
      specialty: 'Dark',
      title: 'The Punk Master',
      color: '#455a64',
      isChampion: false,
      image: '',
    },
    {
      name: 'Phoebe',
      specialty: 'Ghost',
      title: 'The Spirit Whistler',
      color: '#9c27b0',
      isChampion: false,
      image: '',
    },
    {
      name: 'Glacia',
      specialty: 'Ice',
      title: 'The Frozen Queen',
      color: '#81d4fa',
      isChampion: false,
      image: '',
    },
    {
      name: 'Drake',
      specialty: 'Dragon',
      title: 'The Draconid Veteran',
      color: '#c62828',
      isChampion: false,
      image: '',
    },
    {
      name: 'Steven',
      specialty: 'Steel',
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
      requirements: [
        { title: 'Island Navigation', text: 'Must possess a certified Surf-capable Pokémon.' },
      ],
      mainLeaders: [
        {
          name: 'Roxanne',
          city: 'Rustboro',
          specialty: 'Rock',
          typeIcon: 'rock.svg',
          color: 'brown-lighten-2',
          badge: 'Stone Badge',
          to: '/sandbox/characters/npc/roxanne',
        },
        {
          name: 'Brawly',
          city: 'Dewford',
          specialty: 'Fighting',
          typeIcon: 'fighting.svg',
          color: 'blue-darken-4',
          badge: 'Knuckle Badge',
          to: '/sandbox/characters/npc/brawly',
        },
        {
          name: 'Wattson',
          city: 'Mauville',
          specialty: 'Electric',
          typeIcon: 'electric.svg',
          color: 'amber-accent-4',
          badge: 'Dynamo Badge',
          to: '/sandbox/characters/npc/wattson',
        },
        {
          name: 'Flannery',
          city: 'Lavaridge',
          specialty: 'Fire',
          typeIcon: 'fire.svg',
          color: 'orange-darken-3',
          badge: 'Heat Badge',
          to: '/sandbox/characters/npc/flannery',
        },
        {
          name: 'Norman',
          city: 'Petalburg',
          specialty: 'Normal',
          typeIcon: 'normal.svg',
          color: 'grey-darken-1',
          badge: 'Balance Badge',
          to: '/sandbox/characters/npc/norman',
        },
        {
          name: 'Winona',
          city: 'Fortree',
          specialty: 'Flying',
          typeIcon: 'flying.svg',
          color: 'light-blue-lighten-3',
          badge: 'Feather Badge',
          to: '/sandbox/characters/npc/winona',
        },
        {
          name: 'Tate & Liza',
          city: 'Mossdeep',
          specialty: 'Psychic',
          typeIcon: 'psychic.svg',
          color: 'pink-lighten-2',
          badge: 'Mind Badge',
          to: '/sandbox/characters/npc/tate-liza',
        },
        {
          name: 'Wallace',
          city: 'Sootopolis',
          specialty: 'Water',
          typeIcon: 'water.svg',
          color: 'cyan-darken-2',
          badge: 'Rain Badge',
          to: '/sandbox/characters/npc/wallace',
        },
      ],
      secondaryLeaders: [],
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
      specialty: 'Bug',
      title: 'The Bug Prodigy',
      color: '#689f38',
      isChampion: false,
      image: '',
    },
    {
      name: 'Vacant',
      specialty: 'None',
      title: 'None',
      color: '#795548',
      isChampion: false,
      image: '',
    },
    {
      name: 'Flint',
      specialty: 'Fire',
      title: 'The Burning Spirit',
      color: '#ef5350',
      isChampion: false,
      image: '',
    },
    {
      name: 'Lucian',
      specialty: 'Psychic',
      title: 'The Master of Minds',
      color: '#ec407a',
      isChampion: false,
      image: '',
    },
    {
      name: 'Cynthia',
      specialty: 'Varying',
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
      requirements: [
        {
          title: 'HM Proficiency',
          text: 'Sinnoh geography requires high mobility certifications.',
        },
      ],
      mainLeaders: [
        {
          name: 'Roark',
          city: 'Oreburgh',
          specialty: 'Rock',
          typeIcon: 'rock.svg',
          color: 'grey-darken-3',
          badge: 'Coal Badge',
          to: '',
        },
        {
          name: 'Gardenia',
          city: 'Eterna',
          specialty: 'Grass',
          typeIcon: 'grass.svg',
          color: 'green-darken-2',
          badge: 'Forest Badge',
          to: '',
        },
        {
          name: 'Maylene',
          city: 'Veilstone',
          specialty: 'Fighting',
          typeIcon: 'fighting.svg',
          color: 'pink-darken-1',
          badge: 'Cobble Badge',
          to: '',
        },
        {
          name: 'Wake',
          city: 'Pastoria',
          specialty: 'Water',
          typeIcon: 'water.svg',
          color: 'blue-darken-1',
          badge: 'Fen Badge',
          to: '',
        },
        {
          name: 'Fantina',
          city: 'Hearthome',
          specialty: 'Ghost',
          typeIcon: 'ghost.svg',
          color: 'purple-accent-4',
          badge: 'Relic Badge',
          to: '',
        },
        {
          name: 'Byron',
          city: 'Canalave',
          specialty: 'Steel',
          typeIcon: 'steel.svg',
          color: 'blue-grey-darken-1',
          badge: 'Mine Badge',
          to: '',
        },
        {
          name: 'Candice',
          city: 'Snowpoint',
          specialty: 'Ice',
          typeIcon: 'ice.svg',
          color: 'light-blue-lighten-4',
          badge: 'Icicle Badge',
          to: '',
        },
        {
          name: 'Volkner',
          city: 'Sunyshore',
          specialty: 'Electric',
          typeIcon: 'electric.svg',
          color: 'yellow-darken-2',
          badge: 'Beacon Badge',
          to: '',
        },
      ],
      secondaryLeaders: [],
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
      specialty: 'Ghost',
      title: 'The Shadow Novelist',
      color: '#5e35b1',
      isChampion: false,
      image: '',
    },
    {
      name: 'Marshal',
      specialty: 'Fighting',
      title: 'The Fist of Justice',
      color: '#d84315',
      isChampion: false,
      image: '',
    },
    {
      name: 'Grimsley',
      specialty: 'Dark',
      title: 'The High Stakes Gambler',
      color: '#263238',
      isChampion: false,
      image: '',
    },
    {
      name: 'Caitlin',
      specialty: 'Psychic',
      title: 'The Dreaming Star',
      color: '#f06292',
      isChampion: false,
      image: '',
    },
    {
      name: 'Iris',
      specialty: 'Dragon',
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
      requirements: [
        {
          title: 'Regional Integrity',
          text: 'Trainers are scouted based on their growth in New Unova.',
        },
      ],
      mainLeaders: [
        {
          name: 'Cheren',
          city: 'Aspertia',
          specialty: 'Normal',
          typeIcon: 'normal.svg',
          color: 'blue-lighten-1',
          badge: 'Basic Badge',
          to: '',
        },
        {
          name: 'Roxie',
          city: 'Virbank',
          specialty: 'Poison',
          typeIcon: 'poison.svg',
          color: 'deep-purple-accent-2',
          badge: 'Toxic Badge',
          to: '',
        },
        {
          name: 'Burgh',
          city: 'Castelia',
          specialty: 'Bug',
          typeIcon: 'bug.svg',
          color: 'light-green-darken-2',
          badge: 'Insect Badge',
          to: '',
        },
        {
          name: 'Elesa',
          city: 'Nimbasa',
          specialty: 'Electric',
          typeIcon: 'electric.svg',
          color: 'yellow-accent-4',
          badge: 'Bolt Badge',
          to: '',
        },
        {
          name: 'Clay',
          city: 'Driftveil',
          specialty: 'Ground',
          typeIcon: 'ground.svg',
          color: 'brown-darken-2',
          badge: 'Quake Badge',
          to: '',
        },
        {
          name: 'Skyla',
          city: 'Mistralton',
          specialty: 'Flying',
          typeIcon: 'flying.svg',
          color: 'light-blue-accent-1',
          badge: 'Jet Badge',
          to: '',
        },
        {
          name: 'Drayden',
          city: 'Opelucid',
          specialty: 'Dragon',
          typeIcon: 'dragon.svg',
          color: 'blue-grey-darken-4',
          badge: 'Legend Badge',
          to: '',
        },
        {
          name: 'Marlon',
          city: 'Humilau',
          specialty: 'Water',
          typeIcon: 'water.svg',
          color: 'cyan-accent-3',
          badge: 'Wave Badge',
          to: '',
        },
      ],
      secondaryLeaders: [
        {
          name: 'Lenora',
          city: 'Nacrene',
          specialty: 'Normal',
          typeIcon: 'normal.svg',
          color: 'brown-lighten-4',
          badge: 'Retired',
          to: '',
        },
        {
          name: 'Brycen',
          city: 'Icirrus',
          specialty: 'Ice',
          typeIcon: 'ice.svg',
          color: 'cyan-lighten-5',
          badge: 'Retired',
          to: '',
        },
        {
          name: 'Cilan, Chili, & Cress',
          city: 'Straiton City',
          specialty: 'Grass',
          typeIcon: 'Grass.svg',
          color: 'green-lighten-5',
          badge: 'Retired',
          to: '',
        },
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
      specialty: 'Fire',
      title: 'The Burning Star',
      color: '#e91e63',
      isChampion: false,
      image: '',
    },
    {
      name: 'Siebold',
      specialty: 'Water',
      title: 'The Culinary Master',
      color: '#0288d1',
      isChampion: false,
      image: '',
    },
    {
      name: 'Wikstrom',
      specialty: 'Steel',
      title: 'The Chivalrous Knight',
      color: '#607d8b',
      isChampion: false,
      image: '',
    },
    {
      name: 'Drasna',
      specialty: 'Dragon',
      title: 'The Draconid Sage',
      color: '#9c27b0',
      isChampion: false,
      image: '',
    },
    {
      name: 'Diantha',
      specialty: 'Fairy',
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
      requirements: [
        { title: 'Standard Entry', text: 'Open to all registered trainers with a starter permit.' },
      ],
      mainLeaders: [
        {
          name: 'Viola',
          city: 'Santalune',
          specialty: 'Bug',
          typeIcon: 'bug.svg',
          color: 'light-green-darken-1',
          badge: 'Bug Badge',
          to: '',
        },
        {
          name: 'Grant',
          city: 'Cyllage',
          specialty: 'Rock',
          typeIcon: 'rock.svg',
          color: 'brown-darken-1',
          badge: 'Cliff Badge',
          to: '',
        },
        {
          name: 'Korrina',
          city: 'Shalour',
          specialty: 'Fighting',
          typeIcon: 'fighting.svg',
          color: 'red-darken-1',
          badge: 'Rumble Badge',
          to: '',
        },
        {
          name: 'Ramos',
          city: 'Coumarine',
          specialty: 'Grass',
          typeIcon: 'grass.svg',
          color: 'green-darken-3',
          badge: 'Plant Badge',
          to: '',
        },
        {
          name: 'Clemont',
          city: 'Lumiose',
          specialty: 'Electric',
          typeIcon: 'electric.svg',
          color: 'yellow-darken-1',
          badge: 'Voltage Badge',
          to: '',
        },
        {
          name: 'Valerie',
          city: 'Laverre',
          specialty: 'Fairy',
          typeIcon: 'fairy.svg',
          color: 'pink-accent-1',
          badge: 'Fairy Badge',
          to: '',
        },
        {
          name: 'Olympia',
          city: 'Anistar',
          specialty: 'Psychic',
          typeIcon: 'psychic.svg',
          color: 'indigo-darken-2',
          badge: 'Psychic Badge',
          to: '',
        },
        {
          name: 'Wulfric',
          city: 'Snowbelle',
          specialty: 'Ice',
          typeIcon: 'ice.svg',
          color: 'cyan-lighten-4',
          badge: 'Iceberg Badge',
          to: '',
        },
      ],
      secondaryLeaders: [],
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
      specialty: 'Fighting',
      title: 'Kahuna of Melemele',
      color: '#f57c00',
      isChampion: false,
      image: '',
    },
    {
      name: 'Olivia',
      specialty: 'Rock',
      title: 'Kahuna of Akala',
      color: '#8d6e63',
      isChampion: false,
      image: '',
    },
    {
      name: 'Acerola',
      specialty: 'Ghost',
      title: 'The Trial Captain',
      color: '#7e57c2',
      isChampion: false,
      image: '',
    },
    {
      name: 'Kahili',
      specialty: 'Flying',
      title: 'The Golfing Ace',
      color: '#4fc3f7',
      isChampion: false,
      image: '',
    },
    {
      name: 'Kukui',
      specialty: 'Varying',
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
      requirements: [
        { title: 'Z-Ring Ritual', text: 'Must be recognized as an Island Challenger by a Kahuna.' },
      ],
      mainLeaders: [
        {
          name: 'Hala',
          city: 'Melemele Island',
          specialty: 'Fighting',
          typeIcon: 'fighting.svg',
          color: 'orange-darken-3',
          badge: 'Melemele Stamp',
          to: '',
        },
        {
          name: 'Olivia',
          city: 'Akala Island',
          specialty: 'Rock',
          typeIcon: 'rock.svg',
          color: 'brown-lighten-1',
          badge: 'Akala Stamp',
          to: '',
        },
        {
          name: 'Nanu',
          city: "Ula'ula Island",
          specialty: 'Dark',
          typeIcon: 'dark.svg',
          color: 'blue-grey-darken-4',
          badge: "Ula'ula Stamp",
          to: '',
        },
        {
          name: 'Hapu',
          city: 'Poni Island',
          specialty: 'Ground',
          typeIcon: 'ground.svg',
          color: 'deep-orange-lighten-2',
          badge: 'Poni Stamp',
          to: '',
        },
      ],
      secondaryLeaders: [
        {
          name: 'Ilima',
          city: 'Melemele',
          specialty: 'Normal',
          typeIcon: 'normal.svg',
          color: 'grey-lighten-2',
          badge: 'Trial Captain',
          to: '',
        },
        {
          name: 'Lana',
          city: 'Akala',
          specialty: 'Water',
          typeIcon: 'water.svg',
          color: 'blue-accent-2',
          badge: 'Trial Captain',
          to: '',
        },
        {
          name: 'Kiawe',
          city: 'Akala',
          specialty: 'Fire',
          typeIcon: 'fire.svg',
          color: 'red-darken-4',
          badge: 'Trial Captain',
          to: '',
        },
        {
          name: 'Mallow',
          city: 'Akala',
          specialty: 'Grass',
          typeIcon: 'grass.svg',
          color: 'green-accent-3',
          badge: 'Trial Captain',
          to: '',
        },
        {
          name: 'Sophocles',
          city: "Ula'ula",
          specialty: 'Electric',
          typeIcon: 'electric.svg',
          color: 'yellow-accent-4',
          badge: 'Trial Captain',
          to: '',
        },
        {
          name: 'Mina',
          city: 'Poni',
          specialty: 'Fairy',
          typeIcon: 'fairy.svg',
          color: 'pink-lighten-4',
          badge: 'Trial Captain',
          to: '',
        },
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
  championTo: '/sandbox/regions/galar/galos-league/champion-league',
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
      specialty: 'Varying',
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
      requirements: [
        { title: 'Dynamax Band', text: 'All challengers must be certified for Dynamax energy.' },
      ],
      mainLeaders: [
        {
          name: 'Milo',
          city: 'Turffield',
          specialty: 'Grass',
          typeIcon: 'grass.svg',
          color: 'green-darken-1',
          badge: 'Grass Badge',
          to: '',
        },
        {
          name: 'Nessa',
          city: 'Hulbury',
          specialty: 'Water',
          typeIcon: 'water.svg',
          color: 'blue-darken-2',
          badge: 'Water Badge',
          to: '',
        },
        {
          name: 'Kabu',
          city: 'Motostoke',
          specialty: 'Fire',
          typeIcon: 'fire.svg',
          color: 'red-darken-4',
          badge: 'Fire Badge',
          to: '',
        },
        {
          name: 'Allister',
          city: 'Stow-on-Side',
          specialty: 'Ghost',
          typeIcon: 'ghost.svg',
          color: 'deep-purple-darken-4',
          badge: 'Ghost Badge',
          to: '',
        },
        {
          name: 'Opal',
          city: 'Ballonlea',
          specialty: 'Fairy',
          typeIcon: 'fairy.svg',
          color: 'pink-lighten-2',
          badge: 'Fairy Badge',
          to: '',
        },
        {
          name: 'Melony',
          city: 'Circhester',
          specialty: 'Ice',
          typeIcon: 'ice.svg',
          color: 'light-blue-lighten-4',
          badge: 'Ice Badge',
          to: '',
        },
        {
          name: 'Marnie',
          city: 'Spikemuth',
          specialty: 'Dark',
          typeIcon: 'dark.svg',
          color: 'grey-darken-2',
          badge: 'Dark Badge',
          to: '',
        },
        {
          name: 'Raihan',
          city: 'Hammerlocke',
          specialty: 'Dragon',
          typeIcon: 'dragon.svg',
          color: 'orange-darken-4',
          badge: 'Dragon Badge',
          to: '',
        },
        {
          name: 'Bea',
          city: 'Stow-on-Side',
          specialty: 'Fighting',
          typeIcon: 'fighting.svg',
          color: 'orange-darken-2',
          badge: 'Alt-Circuit',
          to: '',
        },
        {
          name: 'Gordie',
          city: 'Circhester',
          specialty: 'Rock',
          typeIcon: 'rock.svg',
          color: 'brown-darken-3',
          badge: 'Alt-Circuit',
          to: '',
        },
      ],
      secondaryLeaders: [
        {
          name: 'Klara',
          city: 'IDK',
          specialty: 'Poison',
          typeIcon: 'poison.svg',
          color: 'purple-darken-3',
          badge: 'Noxious Badge',
          to: '',
        },
        {
          name: 'Avery',
          city: 'IDK',
          specialty: 'Psychic',
          typeIcon: 'psychic.svg',
          color: 'purple-lighten-3',
          badge: 'ESP Badge',
          to: '',
        },
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
      specialty: 'Ground',
      title: 'The Casual Ace',
      color: '#4e342e',
      isChampion: false,
      image: '',
    },
    {
      name: 'Poppy',
      specialty: 'Steel',
      title: 'The Prodigy',
      color: '#90a4ae',
      isChampion: false,
      image: '',
    },
    {
      name: 'Larry',
      specialty: 'Flying',
      title: 'The Exceptional Salaryman',
      color: '#546e7a',
      isChampion: false,
      image: '',
    },
    {
      name: 'Hassel',
      specialty: 'Dragon',
      title: 'The Art Master',
      color: '#b71c1c',
      isChampion: false,
      image: '',
    },
    {
      name: 'Geeta',
      specialty: 'Varying',
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
      requirements: [
        {
          title: 'Academy Enrollment',
          text: 'Must be a student or alumni of Naranja/Uva Academy.',
        },
      ],
      mainLeaders: [
        {
          name: 'Katy',
          city: 'Cortondo',
          specialty: 'Bug',
          typeIcon: 'bug.svg',
          color: 'lime-darken-2',
          badge: 'Bug Badge',
          to: '',
        },
        {
          name: 'Brassius',
          city: 'Artazon',
          specialty: 'Grass',
          typeIcon: 'grass.svg',
          color: 'green-darken-4',
          badge: 'Grass Badge',
          to: '',
        },
        {
          name: 'Iono',
          city: 'Levincia',
          specialty: 'Electric',
          typeIcon: 'electric.svg',
          color: 'yellow-accent-2',
          badge: 'Electric Badge',
          to: '',
        },
        {
          name: 'Kofu',
          city: 'Cascarrafa',
          specialty: 'Water',
          typeIcon: 'water.svg',
          color: 'blue-lighten-1',
          badge: 'Water Badge',
          to: '',
        },
        {
          name: 'Larry',
          city: 'Medali',
          specialty: 'Normal',
          typeIcon: 'normal.svg',
          color: 'grey-darken-2',
          badge: 'Normal Badge',
          to: '',
        },
        {
          name: 'Ryme',
          city: 'Montenevera',
          specialty: 'Ghost',
          typeIcon: 'ghost.svg',
          color: 'purple-darken-3',
          badge: 'Ghost Badge',
          to: '',
        },
        {
          name: 'Tulip',
          city: 'Alfornada',
          specialty: 'Psychic',
          typeIcon: 'psychic.svg',
          color: 'pink-accent-3',
          badge: 'Psychic Badge',
          to: '',
        },
        {
          name: 'Grusha',
          city: 'Glaseado',
          specialty: 'Ice',
          typeIcon: 'ice.svg',
          color: 'cyan-darken-3',
          badge: 'Ice Badge',
          to: '',
        },
      ],
      secondaryLeaders: [],
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
