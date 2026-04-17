import { defineStore } from 'pinia'

export const useSandboxRules = defineStore('sandboxRule', {
  state: () => ({
    rules: [
      {
        icon: 'mdi-book-open-outline',
        color: 'red',
        title: 'Follow RP Nation Rules',
        description:
          'All global RP Nation rules apply. This includes guidelines on content ratings, harassment, and community conduct. Familiarize yourself with them before participating.',
        to: 'https://www.rpnation.com/rules/',
      },
      {
        icon: 'mdi-pencil-ruler',
        color: 'red',
        title: 'Fan Content Requires Approval',
        description:
          'To maintain world balance, custom mechanics, Fakémon, or other fan-made content must be reviewed and approved by staff before being used in any thread.',
      },
      {
        icon: 'mdi-sword-cross',
        color: 'red',
        title: 'Flexible Battle Systems',
        description:
          'Pokémon are not limited to the standard four moves, allowing for more creative anime-style combat. However, specific events or tournaments may enforce restrictions.',
      },
      {
        icon: 'mdi-format-header-pound',
        color: 'red',
        title: 'Post Formatting Standards',
        description:
          'Clarity is key for collaborative RP. All posts must include headers indicating at minimum the current in-game date and your character’s current location.',
      },
      {
        icon: 'mdi-star-off',
        color: 'red',
        title: 'Legendary Pokémon Restrictions',
        description:
          'Legendaries are treated as forces of nature. They are heavily restricted, require moderation approval, and must be earned within the roleplay.',
      },
      {
        icon: 'mdi-crown-outline',
        color: 'red',
        title: 'No Starting in High Authority Roles',
        description:
          'Roles such as Gym Leaders, Elite Four, or Champions are earned through character progression. New players must start as standard Trainers or equivalent paths.',
      },
      {
        icon: 'mdi-brain',
        color: 'red',
        title: 'Supernatural Abilities',
        description:
          'Abilities like Aura, psychic powers, or Hex Maniac traits are allowed, provided they fit the character’s background and don’t disrupt fair play.',
      },
      {
        icon: 'mdi-handshake-outline',
        color: 'red',
        title: 'Conflict Resolution',
        description:
          'Battle outcomes should be discussed and agreed upon by all parties involved. If a stalemate occurs, a moderator will arbitrate based on the narrative context.',
      },
    ],
  }),
})
