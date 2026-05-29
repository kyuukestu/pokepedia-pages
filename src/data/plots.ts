import { OverarchingPlot } from '@/types/plots'

const plots: OverarchingPlot[] = [
  {
    id: 'oblivia-reclamation',
    title: 'A Region Forgotten?',
    statusLabel: 'Unfolding',
    statusColor: 'cyan',
    contactPerson: {
      name: 'CloudySkyLoftyMoon', //TODO - Contact Persons can get its own data-store since it may be re-used heavily.
      rpnlink: 'https://www.rpnation.com/members/cloudyskyloftymoon.87190/',
    },
    featuredCharacters: ['esther'],
    summary:
      "Years after its destruction, Dolce Island remains a scar on both mind & map. The recent rediscovery of ancient relics, Steelhead Armor, and once-forgotten ruins has reignited interest in the region's buried history and the mysterious powers once wielded by its people. Tensions rise as parties compete to define who the Oblivian's are and what Oblivia should become...",
    genre: 'Nation-Building, Geo-Politics, Ruin Exploration/Excavation, Slow-Burn',
    relatedArcs: [],
  },
  {
    id: 'victory-road',
    title: 'Victory Road',
    statusLabel: 'Unfolding',
    statusColor: 'silver',
    contactPerson: {
      name: 'Hecotoro',
      rpnlink: 'https://www.rpnation.com/members/hecotoro.96660/',
    },
    featuredCharacters: ['reina'],
    summary:
      ' Reina is on her way to challenge the Silver Conference, but first she has to earn her last badge and then qualify through Victor Road.',
    genre: 'Mostly Battles and traveling',
    relatedArcs: [],
  },
  {
    id: 'rockets-kanto',
    title: 'Rockets in Kanto',
    statusLabel: 'Unfolding',
    statusColor: 'red',
    contactPerson: {
      name: 'Hecotoro',
      rpnlink: 'https://www.rpnation.com/members/hecotoro.96660/',
    },
    featuredCharacters: ['ron'],
    summary: 'Hunting Team Rocket members in Kanto, like the good old days.',
    genre: 'Action, Social, PG 18',
    relatedArcs: [],
  },
]

export default plots
