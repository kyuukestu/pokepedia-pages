import type { EventDefinition, EventInstance } from '@/types/events'

export const eventDefinitions: EventDefinition[] = [
  {
    slug: 'sumo-conference',
    title: 'Sumo Conference',
    category: 'competition',
    region: 'johto',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUBrNCz3xkMtnF3GVeC0utQ8Qd-ojhTNsU2A&s',
    generalDescription:
      'A heavy-weight trial of strength where Pokémon compete in traditional sumo wrestling. Victory is achieved by forcing an opponent out of the ring or causing any part of their body (other than their feet) to touch the ground.',
    bulba: 'https://bulbapedia.bulbagarden.net/wiki/Sumo_Conference',
  },
  {
    slug: 'running-of-the-tauros',
    title: 'Running of the Tauros',
    category: 'competition',
    region: 'johto',
    image: 'Running_of_the_Tauros.png',
    generalDescription:
      'A chaotic and traditional event held in Palmpona. A herd of Tauros is released to thunder through the city streets toward the battle stadium. Courageous participants run alongside the herd, attempting to touch a Tauros horn to claim victory and a prestigious trophy.',
    bulba: 'https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Swap_Meet',
  },
  {
    slug: 'fire-rescue-grand-prix',
    title: 'Fire & Rescue Grand Prix',
    category: 'competition',
    region: 'johto',
    image:
      'https://images.wikidexcdn.net/mwuploads/wikidex/e/ea/latest/20250607225950/EP149_Cartel.png', // Placeholder: use local asset if possible to avoid CORP
    generalDescription:
      "A multi-stage competition designed to test a team of Pokémon's synergy, speed, and firefighting capabilities. Teams must navigate simulated disasters, rescue victims, and extinguish controlled blazes to prove their utility in emergency services.",
    bulba: 'https://bulbapedia.bulbagarden.net/wiki/Fire_and_Rescue_Grand_Prix',
  },
  {
    slug: 'one-on-one-tauros-competition',
    title: 'One-on-One Tauros Competition',
    category: 'competition',
    region: 'johto',
    image: 'Tauros_Competition_battle.png', // Ensure local asset or CORP-safe URL
    generalDescription:
      'An ancient test of raw power where Tauros engage in matches of pure strength. Competitors use only their horns to charge and grapple. The match is a test of endurance and leverage, ending the moment a Tauros is tossed to the ground.',
    bulba: 'https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Swap_Meet',
  },
  {
    slug: 'balloon-race',
    title: 'Pokémon Balloon Race',
    category: 'other',
    region: 'johto',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHsYZFUqF3bjbw2QiOSLfEC4ZwKwwgCEZ7gA&s',
    generalDescription:
      'A sky-high competitions where trainers and their Pokémon navigate hot air balloons through challenging courses.',
    bulba: 'https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Balloon_Race',
  },
  {
    slug: 'rivers-crown',
    title: "River's Crown Medieval Festival",
    category: 'festival',
    region: 'kalos',
    image: 'pokemon-renfaire.jpg',
    generalDescription:
      'A celebration of the medieval era and ancient Unovan/kalosian lore, featuring period-accurate reenactments and festivities.',
  },
  {
    slug: 'alola-contest',
    title: 'Alolan Pokémon Contest',
    category: 'contest',
    region: 'alola',
    image:
      'https://static0.cbrimages.com/wordpress/wp-content/uploads/2024/08/pokemon-contest-1.jpg',
    generalDescription:
      'Special regional Pokémon Contests held across the alola islands, focusing on style, flair, and the unique spirit of alola.',
  },
  {
    slug: 'indigo-conference',
    title: 'Indigo Conference',
    category: 'tournament',
    region: 'kanto',
    image: 'indigo-conf.webp',
    generalDescription:
      'The annual Pokémon League Championship held at the Indigo Plateau for trainers who have collected eight kanto gym badges.',
    bulba: 'https://bulbapedia.bulbagarden.net/wiki/Indigo_Plateau_Conference',
  },
  {
    slug: 'silver-conference',
    title: 'Silver Conference',
    category: 'tournament',
    region: 'johto',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj0U5-q87tGDhyioGERf81dgv1FhVGggO7Qg&s', // Can be updated to Silver Stadium if different
    generalDescription: 'The johto League’s premier championship tournament held at Mt. Silver.',
    bulba: 'https://bulbapedia.bulbagarden.net/wiki/Silver_Conference',
  },
  {
    slug: 'sanguine-swarm',
    title: 'Sanguine Swarm',
    category: 'ecological',
    region: 'johto', // or wherever the swarm occurs
    image: 'zubat-swarm.png',
    generalDescription:
      'Watch your neck and pack plenty of garlic! The local Zubat have gone bat-bit crazy!',
  },
  {
    slug: 'elder-karp-hunt',
    title: 'Great Hunt for The Elder Karp',
    category: 'competition',
    region: 'sinnoh',
    image: 'https://i.imgur.com/ROUaI8A.png',
    generalDescription:
      ' Are you the next greatest fisher in the Sinnoh Region? Whether you are one with the professional fish folks or an amateur angler, all are welcomed in the Great Sinnohian Angling Contest.',
  },
]

export const johtoCompetitionInstances: EventInstance[] = [
  {
    eventSlug: 'sumo-conference',
    instanceId: 'rikishii-sumo-2026',
    start: '2026-05-12T09:00:00Z',
    allDay: false,
    location: 'Rikishii Town, Johto',
    status: 'upcoming',
    hostId: '188130519274225664',
    participants: [], // No participants listed in source

    competitions: [
      {
        name: 'Rikishii Town Grand Slam',
        type: 'bracket',
        notes: 'Standard Sumo Rules. Ring-outs and ground-touches result in immediate elimination.',
      },
    ],

    requirements: {
      description:
        'Pokémon must weigh at least 80 kg (176.4 lbs). Only basic physical moves are permitted; elemental/energy-based attacks are strictly prohibited.',
      metadata: {
        min_weight_kg: 80,
        allowed_move_types: ['Physical'],
      },
    },

    rewards: [
      {
        recipientId: 'TBD',
        rewardType: 'item',
        name: 'King’s Rock & One Year Supply of Pokémon Food',
        isSecret: false,
      },
    ],

    metadata: {
      tradition_level: 'High',
      arena_type: 'Dohyō (Sumo Ring)',
    },
  },
  {
    eventSlug: 'running-of-the-tauros',
    instanceId: 'palmpona-run-2026',
    start: '2026-05-07T18:00:00Z',
    allDay: false,
    location: 'Palmpona Streets, Johto',
    status: 'upcoming',

    participants: [{ name: 'Reina' }],

    competitions: [
      {
        name: 'The Palmpona Dash',
        type: 'timed',
        notes:
          'Objective: Be the first to touch a Tauros horn. Participants must navigate the herd without being trampled.',
      },
    ],

    rewards: [
      {
        recipientId: 'TBD',
        rewardType: 'item',
        name: 'Tauros Trophy',
        isSecret: false,
      },
    ],

    requirements: {
      description:
        'No species restrictions for trainers, but extreme physical durability is recommended. High risk of injury.',
    },

    metadata: {
      hazard_level: 'High',
      event_type: 'Urban Stampede',
    },
  },
  {
    eventSlug: 'one-on-one-tauros-competition',
    instanceId: 'palmpona-tauros-2026',
    start: '',
    allDay: true, // "Anyone can enter at any time"
    location: 'Palmpona, Johto',
    status: 'ongoing',

    participants: [{ name: 'Reina' }],

    competitions: [
      {
        name: 'Horn-to-Horn Grapple',
        type: 'bracket',
        notes: 'Standard Palmpona rules: charging and holding only. No elemental moves allowed.',
      },
    ],

    requirements: {
      requiredItems: ['Tauros (Species-locked)'],
      description: 'Open entry. Any trainer with a Tauros may challenge the current victor.',
    },

    metadata: {
      victoryCondition: 'Last trainer standing',
      customType: 'Strength Trial',
    },
  },
  {
    eventSlug: 'fire-rescue-grand-prix',
    instanceId: 'goldengate-2026-gp',
    start: '',
    allDay: false,
    location: 'Goldengate, Johto',
    status: 'upcoming',
    participants: [], // Populated as players join

    // Competition specifics based on the Bulba description
    competitions: [
      {
        name: 'Round 1: House Extinguish',
        type: 'timed',
        notes: 'Teams work in concert to extinguish flames burning in a simulated house.',
      },
      {
        name: 'Round 2: The Rope Climb',
        type: 'timed',
        notes: 'Pokémon must climb a rope to retrieve a flag at the summit.',
      },
      {
        name: 'Final Round: Rescue & Recovery',
        type: 'timed',
        notes: 'Rescuing a trapped dummy from a burning structure followed by a final extinguish.',
      },
    ],

    schedule: [
      {
        time: '10:00 AM',
        activity: 'Opening Ceremony & Team Registration',
        isKeyMoment: false,
      },
      {
        time: '11:30 AM',
        activity: 'Qualifying Heat: House Extinguish',
        isKeyMoment: true,
      },
      {
        time: '03:00 PM',
        activity: 'The Grand Finale Rescue',
        isKeyMoment: true,
        location: 'Main Exhibition Arena',
      },
    ],

    requirements: {
      description:
        'A team of specialized Water, Ice, or Ground type Pokémon is recommended. Must be able to work as a cohesive unit.',
    },
  },
]

export const ecologicalInstances: EventInstance[] = [
  {
    eventSlug: 'sanguine-swarm',
    start: '2022-08-01T00:00:00',
    end: '2022-08-15T00:00:00',
    instanceId: 'sanguine-swarm',
    allDay: true,
    location: 'Northern Johto',
    status: 'ongoing',
    threadUrl: 'https://www.rpnation.com/threads/pokemon-sanguine-swarms-ic.560446/',
    image: 'https://static.zerochan.net/Zubat.1024.3347924.webp',
    participants: [
      {
        charId: 'esther',
      },
      {
        charId: 'naka',
      },
      {
        charId: 'hristo',
      },
      {
        charId: 'mabel',
      },
      {
        charId: 'sebastian',
      },
      {
        charId: 'rick',
      },
      {
        charId: 'wren',
      },
    ],
  },
]

export const sinnohCompetitionInstances: EventInstance[] = [
  {
    instanceId: 'elder-karp-hunt',
    eventSlug: 'elder-karp-hunt',
    start: '2022-08-17T00:00:00',
    allDay: true,
    location: '',
    status: 'ongoing',
    competitions: [
      {
        type: 'points',
      },
    ],
    participants: [
      {
        name: 'jordan',
      },
      {
        name: 'cameron',
      },
      {
        name: 'rupert',
      },
      {
        name: 'atlantis',
      },
      {
        name: 'joslyn',
      },
      {
        name: 'cyrilla',
      },
      {
        name: 'haru',
      },
      {
        name: 'loretta',
      },
      {
        name: 'reina',
      },
      {
        name: 'roux',
      },
      {
        name: 'Aleksandra',
      },
    ],
  },
]

export const alolaContestInstances: EventInstance[] = [
  {
    eventSlug: 'alola-contest',
    instanceId: 'exeggutor-isle-2022-08-11',
    start: '2022-08-11T00:00:00',
    allDay: true,
    location: 'Exeggutor Island',
    image: 'https://pbs.twimg.com/media/FqNSDUoXgAA3XE4?format=jpg&name=large',
    status: 'completed',
    participants: [
      {
        charId: 'esther',
      },
      {
        charId: 'altair',
      },
      {
        charId: 'laurie',
      },
      {
        charId: 'saga',
      },
      {
        charId: 'anju',
      },
      {
        charId: 'heizou',
      },
      {
        charId: 'G',
      },
      {
        charId: 'nejime',
      },
    ], // Subset of contest entrants
    competitions: [
      {
        type: 'judged',
        standings: [
          {
            participantId: ['heizou'],
            rank: 1,
            score: '4W',
          },
          {
            participantId: ['altair'],
            rank: 2,
            score: '3W-2L',
            notes: 'Runner-up',
          },
          {
            participantId: ['esther'],
            rank: 3,
            score: '3W-2L',
            notes: "Loser's Bracket runner-up",
          },
          {
            participantId: ['laurie'],
            rank: 4,
            score: '2W-2L',
          },
          {
            participantId: ['anju'],
            rank: 5,
            score: '1W-2L',
          },
          {
            participantId: ['g'],
            rank: 6,
            score: '1W-2L',
          },
          {
            participantId: ['nua'],
            rank: 7,
            score: '2L',
          },
          {
            participantId: ['saga'],
            rank: 8,
            score: '2L',
          },
        ],
      },
    ],
    threadUrl: 'https://www.rpnation.com/threads/pokemon-exeggutor-island-contest-ended.549374/',
  },
  {
    eventSlug: 'alola-contest',
    instanceId: 'hauoli-2022-08-23',
    start: '2022-08-23T00:00:00',
    allDay: true,
    location: "Hau'oli City",
    status: 'completed',
    participants: [],
    competitions: [
      {
        type: 'judged',
        standings: [],
      },
    ],
  },
  {
    eventSlug: 'alola-contest',
    instanceId: 'heahea-august-2026',
    start: '2026-08-05T13:00:00Z',
    allDay: false,
    location: 'Heahea City Contest Hall, Alola',
    status: 'upcoming',

    participants: [{ name: 'G' }, { name: 'James' }],

    competitions: [
      {
        name: 'Heahea Singles Brilliant Stage',
        type: 'judged',
        notes:
          'Standard Singles Format. Consists of the Performance Stage (Appeal) followed by the Battle Stage.',
        format: 'Singles',
      },
    ],

    rewards: [
      {
        recipientId: 'TBD',
        rewardType: 'ribbon',
        name: 'Heahea Ribbon',
        isSecret: false,
      },
    ],

    requirements: {
      description:
        'Singles Format only. Entrants must present their Contest Pass upon registration.',
    },
  },
]

export const conferenceInstances: EventInstance[] = [
  {
    eventSlug: 'indigo-conference',
    instanceId: '2022-12-05',
    start: '2022-12-05T00:00:00',
    end: '2022-12-22T00:00:00',
    allDay: true,
    location: 'Indigo Plateau',
    status: 'completed',
    participants: [],
    competitions: [
      {
        type: 'bracket',
        standings: [],
      },
    ],
  },
  {
    eventSlug: 'silver-conference',
    instanceId: '2022-10-10',
    start: '2022-10-10T00:00:00',
    end: '2022-10-14T00:00:00',
    allDay: true,
    location: 'Silver Town, Mt. Silver',
    status: 'completed',
    participants: [],
    competitions: [
      {
        type: 'bracket',
        standings: [],
      },
    ],
  },
]

export const festivalInstances: EventInstance[] = [
  {
    eventSlug: 'rivers-crown',
    instanceId: '2022-08-04',
    start: '2022-08-04T00:00:00',
    end: '2022-08-13T00:00:00',
    allDay: true,
    location: 'Loire de Fleuve Isle, Off the Coast of Cyllage',
    status: 'completed',
    hostId: 'Shabboneau Estate',
    weatherCondition: 'Clear & Festive',
    participants: [], // Add RP characters here

    narrative: {
      tldr: "A 10-day celebration of kalosian history featuring the reconstruction of the Battle for the River's Crown.",
      recap:
        "The Loire de Fleuve Isle was transformed into a living medieval village. Highlights included a curated art exhibit from the Shabboneau Estate and a massive three-day war simulation. The festival concluded with a legendary 'Feast Off' and a fireworks display over the Cyllage coast.",
    },

    schedule: [
      {
        activity: 'Live Plays: Daily Performances',
        isKeyMoment: false,
        date: 'Aug 4 - 13',
        time: 'All Day',
        location: 'Spotlight Theater Stage',
      },
      {
        activity: 'Shabboneau Estate Art Exhibit',
        isKeyMoment: false,
        date: 'Aug 4 - 13',
        time: 'All Day',
        location: 'Exhibit Parade Grounds',
      },
      {
        activity: "River's Crown Duels",
        isKeyMoment: true,
        date: 'Aug 5',
        time: '8:00am',
        location: 'Dueling Grounds',
      }, // Aug 5
      {
        activity: 'Archery Competition',
        isKeyMoment: false,
        date: 'Aug 6',
        time: '8:00am',
        location: 'Loire de Fleuve Forest',
      }, // Aug 6
      {
        activity: 'Tag Team Pokémon Tournament',
        isKeyMoment: true,
        date: 'Aug 7',
        time: '8:00am',
        location: 'Battlegrounds',
      }, // Aug 7
      {
        activity: 'The Jousting Tournament',
        isKeyMoment: true,
        date: 'Aug 8',
        time: '8:00am - 5:00pm',
        location: 'Parade Grounds',
      }, // Aug 8
      {
        activity: "Recreation: Battle for The River's Crown",
        isKeyMoment: true,
        date: 'Aug 9 - 11',
        time: 'All Day',
        location: 'Loire Castle',
      }, // Aug 9-11
      {
        activity: "The River's Crown Showcase",
        isKeyMoment: false,
        date: 'Aug 12',
        time: '8:00am',
        location: 'Spotlight Theatre Stage',
      }, // Aug 12
      {
        activity: 'Grand Finale: Feast Off & Fireworks',
        isKeyMoment: true,
        date: 'Aug 13',
        time: '10:30pm',
        location: 'Loire de Flueve Isle',
      }, // Aug 13
    ],

    // This section can be populated with specific RP winners from the Tag Team or Jousting events
    competitions: [
      {
        name: 'Archery Competition',
        type: 'points',
        standings: [
          // Example: { rank: 1, participantId: 'winner-id', score: 'Duke\'s Bounty', notes: 'Tag Team Champions' }
        ],
      },
      {
        name: 'Tag Team Tournament',
        type: 'bracket',
        standings: [
          {
            rank: 1,
            participantId: ['altair', 'max'],
            score: '2W',
          },
          {
            rank: 2,
            participantId: ['monty', 'azumi'],
            score: 'N/A',
          },
          {
            rank: 2,
            participantId: ['esther', 'zelda'],
            score: 'N/A',
          },
          {
            rank: 2,
            participantId: ['miles', 'vasya'],
            score: 'N/A',
          },
        ],
      },
      {
        name: 'Jousting Tournament',
        type: 'bracket',
        standings: [
          // Example: { rank: 1, participantId: 'winner-id', score: 'Duke\'s Bounty', notes: 'Tag Team Champions' }
        ],
      },
      {
        name: "Battle for the Rive's Crown",
        type: 'points',
        standings: [
          // Example: { rank: 1, participantId: 'winner-id', score: 'Duke\'s Bounty', notes: 'Tag Team Champions' }
        ],
      },
    ],

    gallery: [
      // References to the public folder
      {
        url: 'huh.png',
        caption: 'Huh?',
        type: 'image',
      },
    ],
  },
]

export const raceInstances: EventInstance[] = [
  {
    eventSlug: 'balloon-race',
    instanceId: '2022-08-01',
    start: '2022-08-01T00:00:00',
    allDay: true,
    location: 'Route 39 — North of Olivine City',
    status: 'postponed',
    participants: [{}],
    competitions: [
      {
        type: 'timed',
      },
    ],
    // Using the Narrative block to detail the Sanguine Swarm interference
    narrative: {
      tldr: 'Race postponed due to Sanguine Swarm interference.',
      recap:
        'The event was halted indefinitely after a swarm of Sanguine insects made the flight path unsafe for participants.',
    },
    customDescription: 'Postponed by Sanguine Swarm interference.',
  },
]

export const eventInstances: EventInstance[] = [
  ...alolaContestInstances,
  ...festivalInstances,
  ...raceInstances,
  ...conferenceInstances,
  ...johtoCompetitionInstances,
  ...ecologicalInstances,
  ...sinnohCompetitionInstances,
]
