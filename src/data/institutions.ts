import type { Institution } from '@/types/institutions'
import { johtoAcademyMap } from '@/data/institution-maps/johto-academy'

export const institutionData: Institution[] = [
  {
    id: 'johto-academy',
    name: 'Johto Academy',
    category: 'university',
    image: 'https://images.unsplash.com/photo-1541339907198-e08759df9a73?q=80&w=2000',
    head: 'Earl',
    faculty: [
      'angelia',
      'anthony',
      'elena',
      'lisa',
      'morty',
      'nico',
      'rachel',
      'nakano',
      'schnizderful',
    ],
    location: { city: 'Violet City', region: 'johto' },
    specialties: ['Biology', 'History', 'Terastal Phenomenon'],
    description:
      'A new University on the Outskirts of Violet City known for its independent study programs.',
    enrollment: {
      isOpen: true,
      fee: 0,
      benefits: ['Academy Uniform', 'Tera Orb Certification'],
    },
    slug: 'johto-academy',
    mapConfig: johtoAcademyMap,
    customMapPath: '/johto-academy-map.png',
  },
]
