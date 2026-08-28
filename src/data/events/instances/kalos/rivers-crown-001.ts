import type { EventInstance } from '@/types/events'

export default {
  id: 'rivers-crown-001',
  eventId: 'rivers-crown',

  location: 'Loire de Fleuve Isle, Off the Coast of Cyllage',

  members: [],

  calendar: {
    start: '2022-08-04T00:00:00',
    end: '2022-08-13T00:00:00',
    allDay: true,
  },

  extras: {
    host: {
      id: 'Shabboneau Estate',
      name: 'Shabboneau Estate',
      hostType: 'organization',
    },

    narrative: {
      tldr: "A 10-day celebration of Kalosian history featuring the reconstruction of the Battle for the River's Crown.",
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
      },
      {
        activity: 'Archery Competition',
        isKeyMoment: false,
        date: 'Aug 6',
        time: '8:00am',
        location: 'Loire de Fleuve Forest',
      },
      {
        activity: 'Tag Team Pokémon Tournament',
        isKeyMoment: true,
        date: 'Aug 7',
        time: '8:00am',
        location: 'Battlegrounds',
      },
      {
        activity: 'The Jousting Tournament',
        isKeyMoment: true,
        date: 'Aug 8',
        time: '8:00am - 5:00pm',
        location: 'Parade Grounds',
      },
      {
        activity: "Recreation: Battle for The River's Crown",
        isKeyMoment: true,
        date: 'Aug 9 - 11',
        time: 'All Day',
        location: 'Loire Castle',
      },
      {
        activity: "The River's Crown Showcase",
        isKeyMoment: false,
        date: 'Aug 12',
        time: '8:00am',
        location: 'Spotlight Theatre Stage',
      },
      {
        activity: 'Grand Finale: Feast Off & Fireworks',
        isKeyMoment: true,
        date: 'Aug 13',
        time: '10:30pm',
        location: 'Loire de Flueve Isle',
      },
    ],

    competitions: [
      {
        name: 'Archery Competition',
        type: 'other',
        judgementType: 'points',
        standings: [],
      },
      {
        name: 'Tag Team Tournament',
        type: 'tournament',
        format: 'tag-team',
        judgementType: 'bracket',

        participants: [
          {
            id: 'altair-max',
            members: [
              { characterId: 'altair' },
              { characterId: 'max' },
            ],
          },
          {
            id: 'monty-azumi',
            members: [
              { characterId: 'monty' },
              { characterId: 'azumi' },
            ],
          },
          {
            id: 'esther-zelda',
            members: [
              { characterId: 'esther' },
              { characterId: 'zelda' },
            ],
          },
          {
            id: 'miles-vasya',
            members: [
              { characterId: 'miles' },
              { characterId: 'vasya' },
            ],
          },
        ],

        standings: [
          {
            rank: 1,
            participantId: 'altair-max',
            score: '2W',
          },
          {
            rank: 2,
            participantId: 'monty-azumi',
            score: 'N/A',
          },
          {
            rank: 2,
            participantId: 'esther-zelda',
            score: 'N/A',
          },
          {
            rank: 2,
            participantId: 'miles-vasya',
            score: 'N/A',
          },
        ],
      },
      {
        name: 'Jousting Tournament',
        type: 'tournament',
        judgementType: 'bracket',
        standings: [],
      },
      {
        name: "Battle for the River's Crown",
        type: 'other',
        judgementType: 'points',
        standings: [],
      },
    ],

    gallery: [
      {
        url: 'huh.png',
        caption: 'Huh?',
        type: 'image',
      },
    ],
  },
} satisfies EventInstance;
