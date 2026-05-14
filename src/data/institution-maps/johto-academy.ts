import { AcademyMapConfig } from '@/types/institutions'

export const johtoAcademyMap: AcademyMapConfig = {
  bounds: [
    [-400, -850],
    [400, 850],
  ],
  pois: [
    {
      id: 'gate-1',
      label: 'Main Gate',
      coords: [0, -800],
      description: 'Campus entrance.',
      type: 'exit',
    },
  ],
  features: [
    // --- GROUND / GREENERY ---
    {
      type: 'grass',
      label: 'Western Grounds',
      description: 'Open greenery.',
      points: [
        [250, -800],
        [250, -50],
        [-250, -50],
        [-250, -800],
      ],
      color: '#E8F5E9',
    },
    {
      type: 'grass',
      label: 'Eastern Fields',
      description: 'Agricultural testing zones.',
      points: [
        [200, 400],
        [200, 800],
        [-100, 800],
        [-100, 400],
      ],
      color: '#C8E6C9',
    },

    // --- CENTRAL HUB ---
    {
      type: 'fountain',
      label: 'Central Fountain',
      description: 'Circular meeting point.',
      points: [
        [15, 0],
        [10, 10],
        [0, 15],
        [-10, 10],
        [-15, 0],
        [-10, -10],
        [0, -15],
        [10, -10],
      ],
    },

    // --- PATHS ---
    {
      type: 'path',
      label: 'Cardinal Walkway',
      description: 'Main paths.',
      points: [
        [300, 0],
        [-300, 0],
      ],
    }, // N-S
    {
      type: 'path',
      label: 'The Long Walk',
      description: 'Path to the western gate.',
      points: [
        [0, -800],
        [0, 400],
      ],
    }, // W-E

    // --- NORTH WING ---
    {
      type: 'grass',
      label: 'North Lawn',
      description: 'Grassy area around the lab.',
      points: [
        [250, -100],
        [250, 100],
        [50, 100],
        [50, -100],
      ],
    },
    {
      type: 'building',
      label: 'Ignite Dormitory',
      description: 'Rectangular research facility.',
      points: [
        [200, -40],
        [200, 40],
        [100, 40],
        [100, -40],
      ],
    },
    {
      type: 'water',
      label: 'Ignite Pool',
      description: 'Small body of water.',
      points: [
        [220, 60],
        [220, 90],
        [180, 90],
        [180, 60],
      ],
    },

    // --- SOUTH WING ---
    {
      type: 'grass',
      label: 'South Lawn',
      description: 'Grassy area.',
      points: [
        [-250, -100],
        [-250, 100],
        [-50, 100],
        [-50, -100],
      ],
    },
    {
      type: 'building',
      label: 'Strike Dormitory',
      description: 'Rectangular facility.',
      points: [
        [-200, -40],
        [-200, 40],
        [-100, 40],
        [-100, -40],
      ],
    },
    {
      type: 'water',
      label: 'Strike Pool',
      description: 'Small body of water.',
      points: [
        [-220, 60],
        [-220, 90],
        [-180, 90],
        [-180, 60],
      ],
    },

    // --- EAST WING ---
    {
      type: 'grass',
      label: 'East Lawn',
      description: 'Grassy area.',
      points: [
        [-100, 150],
        [-100, 350],
        [100, 350],
        [100, 150],
      ],
    },
    {
      type: 'building',
      label: 'Purity Dormitory',
      description: 'Rectangular facility.',
      points: [
        [-40, 200],
        [-40, 300],
        [40, 300],
        [40, 200],
      ],
    },
    {
      type: 'water',
      label: 'Purity Pool',
      description: 'Small body of water.',
      points: [
        [60, 220],
        [60, 280],
        [90, 280],
        [90, 220],
      ],
    },

    // --- WEST WING (BETWEEN FOUNTAIN & GATE) ---
    {
      type: 'gate',
      label: 'The Academy Gate',
      description: 'The furthest west point.',
      points: [
        [30, -800],
        [-30, -800],
        [-30, -780],
        [30, -780],
      ],
    },
    {
      type: 'building',
      label: 'Main Building',
      description:
        "The Main Building stretches for several kilometers long and is ten floors high. The building puts even the famous Indigo Plateau to shame. It's solar panels not only covered the famous transparent roof, but the walls were made of the same glass.",
      points: [
        [150, -600],
        [150, -200],
        [20, -200],
        [20, -600],
      ],
    },
    {
      type: 'building',
      label: 'Theatre',
      description: 'Small building South of path.',
      points: [
        [-20, -550],
        [-20, -450],
        [-80, -450],
        [-80, -550],
      ],
    },
    {
      type: 'building',
      label: 'Grand Ball',
      description: 'Small building South of path.',
      points: [
        [-20, -350],
        [-20, -250],
        [-80, -250],
        [-80, -350],
      ],
    },

    // --- FAR EAST (FIELDS & LAKE) ---
    // --- Battlefield Alpha ---
    {
      type: 'grass',
      label: 'Battlefield Alpha',
      description: 'Standard arena.',
      points: [
        [150, 400],
        [150, 490],
        [100, 490],
        [100, 400],
      ],
      color: '#D7CCC8',
    },
    // West Trainer Box (Flush to West edge, 5 units wide)
    {
      type: 'building',
      label: 'West Trainer Box',
      description: 'Trainer stand.',
      points: [
        [131, 400], // Top Left
        [131, 405], // Top Right (5 units wide: 400 to 405)
        [119, 405], // Bottom Right
        [119, 400], // Bottom Left
      ],
      color: '#A1887F',
    },
    // East Trainer Box (Flush to East edge, 5 units wide)
    {
      type: 'building',
      label: 'East Trainer Box',
      description: 'Trainer stand.',
      points: [
        [131, 485], // Top Left (5 units wide: 485 to 490)
        [131, 490], // Top Right
        [119, 490], // Bottom Right
        [119, 485], // Bottom Left
      ],
      color: '#A1887F',
    },
    {
      type: 'pokeball',
      label: 'Arena Alpha Center',
      description: 'Battle start position.',
      points: [[125, 445]],
    },

    // --- BATTLEFIELD BETA ---
    {
      type: 'grass',
      label: 'Battlefield Beta',
      description: 'Standard arena.',
      points: [
        [150, 500],
        [150, 590],
        [100, 590],
        [100, 500],
      ],
      color: '#D7CCC8',
    },
    {
      type: 'building',
      label: 'West Trainer Box',
      description: 'Standard arena.',
      points: [
        [131, 500],
        [131, 505],
        [119, 505],
        [119, 500],
      ],
      color: '#A1887F',
    },
    {
      type: 'building',
      label: 'East Trainer Box',
      description: 'Standard arena.',
      points: [
        [131, 585],
        [131, 590],
        [119, 590],
        [119, 585],
      ],
      color: '#A1887F',
    },
    {
      type: 'pokeball',
      description: 'Battle start position.',
      label: 'Arena Beta Center',
      points: [[125, 545]],
    },

    // --- BATTLEFIELD GAMMA ---
    {
      type: 'grass',
      label: 'Battlefield Gamma',
      description: 'Standard arena.',
      points: [
        [150, 600],
        [150, 690],
        [100, 690],
        [100, 600],
      ],
      color: '#D7CCC8',
    },
    {
      type: 'building',
      description: 'Trainer stand.',
      label: 'West Trainer Box',
      points: [
        [131, 600],
        [131, 605],
        [119, 605],
        [119, 600],
      ],
      color: '#A1887F',
    },
    {
      type: 'building',
      description: 'Trainer stand.',
      label: 'East Trainer Box',
      points: [
        [131, 685],
        [131, 690],
        [119, 690],
        [119, 685],
      ],
      color: '#A1887F',
    },
    {
      type: 'pokeball',
      description: 'Battle start position.',
      label: 'Arena Gamma Center',
      points: [[125, 645]],
    },

    // --- BATTLEFIELD DELTA ---
    {
      type: 'grass',
      label: 'Battlefield Delta',
      description: 'Standard arena.',
      points: [
        [150, 700],
        [150, 790],
        [100, 790],
        [100, 700],
      ],
      color: '#D7CCC8',
    },
    {
      type: 'building',
      label: 'West Trainer Box',
      description: 'Trainer stand.',
      points: [
        [131, 700],
        [131, 705],
        [119, 705],
        [119, 700],
      ],
      color: '#A1887F',
    },
    {
      type: 'building',
      label: 'East Trainer Box',
      description: 'Trainer stand.',
      points: [
        [131, 785],
        [131, 790],
        [119, 790],
        [119, 785],
      ],
      color: '#A1887F',
    },
    {
      type: 'pokeball',
      description: 'Battle start position.',
      label: 'Arena Delta Center',
      points: [[125, 745]],
    },

    // --- OLYMPIC TRACK ---
    {
      type: 'path',
      label: 'Olympic Track',
      description: 'Fixed-dimension synthetic track.',
      // These are the start and end of the straight-away
      points: [
        [-45, 550],
        [-45, 640],
      ],
    },
    // --- INNER COURT ---
    {
      type: 'building',
      label: 'Inner Athletics Court',
      description: 'Tennis and Basketball regulation area.',
      points: [
        [-33, 545],
        [-33, 645],
        [-57, 645],
        [-57, 545],
      ],
      color: '#4FC3F7',
    },

    // --- NORTH-EAST (ABOVE FIELDS) ---
    {
      type: 'building',
      label: 'Utility Block 1',
      description: 'Maintenance shed.',
      points: [
        [350, 450],
        [350, 520],
        [280, 520],
        [280, 450],
      ],
    },
    {
      type: 'building',
      label: 'Utility Block 2',
      description: 'Equipment storage.',
      points: [
        [350, 560],
        [350, 630],
        [280, 630],
        [280, 560],
      ],
    },
    {
      type: 'building',
      label: 'Utility Block 3',
      description: 'Greenhouse management.',
      points: [
        [350, 670],
        [350, 740],
        [280, 740],
        [280, 670],
      ],
    },
  ],
}
