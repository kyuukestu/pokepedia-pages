import { TravelGroup } from '@/types/travel-group'

export const travelGroups: TravelGroup[] = [
  {
    id: 'esther-group',
    contactPerson: {
      name: 'CloudySkyLoftyMoon',
      rpnlink: 'https://www.rpnation.com/members/cloudyskyloftymoon.87190/',
    },
    location: 'alola',
    activityLevel: 'Weekly',
    objective: 'Searching for Cutiefly',
    color: '#527394',
    date: '2022-08-15T00:00:00',
    members: ['esther'],
    intent: 'Casual, Exploration',
    name: 'esther-group',
    threadUrl: '',
  },
  {
    id: 'reina-group',
    contactPerson: {
      name: 'Hecotoro',
      rpnlink: 'https://www.rpnation.com/members/hecotoro.96660/',
    },
    location: 'Tojo Falls, Victory Road',
    activityLevel: 'Weekly',
    objective: 'Reach the Tojo Falls',
    color: '#527394',
    date: '2022-09-01T00:00:00',
    members: ['reina'],
    intent: 'Casual Battles, plot oriented, not 100% competitive',
    name: 'Victory Road',
    threadUrl: '',
  },
  {
    id: 'rocket-hunter',
    contactPerson: {
      name: 'Hecotoro',
      rpnlink: 'https://www.rpnation.com/members/hecotoro.96660/',
    },
    location: 'Saffron City',
    activityLevel: 'Weekly',
    objective: 'Find any secret Rocket hideout',
    color: '#527394',
    date: '2022-09-01T00:00:00',
    members: ['ron'],
    intent: 'Casual Battles, plot oriented, not 100% competitive',
    name: 'Rocket Hunters',
    threadUrl: '',
  },
]
