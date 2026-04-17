import type { RouteLocationRaw } from 'vue-router'

export interface CalendarEvent {
  title: string
  start: string
  end?: string
  allDay?: boolean
  extendedProps: EventExtendedProps
}

interface EventExtendedProps {
  description: string
  region: string
  location: string
  image: string
  internalPath: RouteLocationRaw // This triggers the autocomplete
  bulba?: string
  type?: string
}

export const eventList: CalendarEvent[] = [
  {
    title: 'Balloon Race',
    start: '2022-08-01T00:00:00',
    allDay: true,
    extendedProps: {
      description: 'Postponed by Sanguine Swarm interference.',
      region: 'Johto',
      location: 'Route 39 — North of Olivine City',
      image: 'https://archives.bulbagarden.net/media/upload/4/44/Pokemon_Balloon_Race.png',
      internalPath: '/sandbox/events/balloon-race/2022-08-01',
      bulba: 'https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Balloon_Race',
    },
  },
  {
    title: "River's Crown Medieval Festival",
    start: '2022-08-04T00:00:00',
    end: '2022-08-14T00:00:00',
    extendedProps: {
      description: 'A celebration of the medieval era and ancient Unovan/Kalosian lore.',
      region: 'Kalos',
      location: 'Loire de Fleuve Isle, Off the Coast of Cyllage',
      image: 'https://i.pinimg.com/736x/85/96/48/85964812fb919478cb3fa1d1ac41ee86.jpg',
      internalPath: '/sandbox/events/festival/rivers-crown/2022-08-04',
    },
  },
  {
    title: 'Exeggutor Island Contest',
    start: '2022-08-11T00:00:00',
    allDay: true,
    extendedProps: {
      description: 'Special Alolan regional Pokémon Contest.',
      region: 'Alola',
      location: 'Exeggutor Island',
      image: 'https://pbs.twimg.com/media/FqNSDUoXgAA3XE4?format=jpg&name=large',
      internalPath: '/sandbox/events/contest/exeggutor-isle/2022-08-11',
    },
  },
  {
    title: "Hau'oli City Contest",
    start: '2022-08-23T00:00:00',
    allDay: true,
    extendedProps: {
      description: 'Special Alolan regional Pokémon Contest.',
      region: 'Alola',
      location: "Hau'oli City",
      image: 'https://i1.sndcdn.com/artworks-000195315504-h536ad-t1080x1080.jpg',
      internalPath: '/sandbox/events/contest/hauoli/2022-08-23',
    },
  },
  {
    title: 'Indigo Conference',
    start: '2022-12-05T00:00:00',
    end: '2022-12-22T00:00:00',
    allDay: true,
    extendedProps: {
      description: 'Indigo Conference.',
      region: 'Kanto',
      location: 'Indigo Plateau',
      image: 'https://archives.bulbagarden.net/media/upload/6/60/Indigo_Stadium.png',
      internalPath: '/sandbox/events/tournament/indigo-conference/2022-12-05',
    },
  },
  {
    title: 'Silver Conference',
    start: '2022-10-10T00:00:00',
    end: '2022-10-14T00:00:00',
    allDay: true,
    extendedProps: {
      description: 'Indigo Conference.',
      region: 'Kanto',
      location: 'Indigo Plateau',
      image: 'https://archives.bulbagarden.net/media/upload/6/60/Indigo_Stadium.png',
      internalPath: '/sandbox/events/tournament/indigo-conference/2022-12-05',
    },
  },
]
