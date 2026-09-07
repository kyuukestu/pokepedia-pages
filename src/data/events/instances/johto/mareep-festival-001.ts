import type { EventInstance } from '@/types/events'

export default {
  id: 'mareep-festival-001',
  eventId: 'mareep-festival',
  region: ['johto'],
  title: 'Mareep Festival',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpWfXQdr0hSo38TWBAwk-USoCwGRyxNytKv0IRdLUSLj0dvTTFv81uNpM&s=10',
  location: 'Mariko Village, Johto',
  bulba: 'https://bulbapedia.bulbagarden.net/wiki/Mareep_Festival',
  participants: [
    {
      characterId: 'merciless_medic',
      name: 'Reggie',
    },
    {
      characterId: 'hecotoro',
      name: 'Reina',
    },
    {
      characterId: 'mdebourg',
      name: 'Andy',
    },
  ],

  calendar: {
    start: '2022-08-12',
    allDay: true,
  },

} satisfies EventInstance
