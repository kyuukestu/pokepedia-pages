import { defineStore } from 'pinia'

export const useSandboxRules = defineStore('sandboxRules', {
  state: () => ({
    rules: [
      {
        title: 'All RPN Rules apply.',
        icon: 'mdi-check-circle',
        color: 'blue',
      },
      {
        title:
          'Fan-made Content is allowed: however, it must be submitted for review. Please PM me for more details.',
        icon: 'mdi-star-plus',
        color: 'purple',
      },
      {
        title:
          'While the RP as a whole does not limit Pokémon to Four moves, some Tournaments, Battles, and Other events may require a move-set that you must submit beforehand.',
        icon: 'mdi-sword-cross',
        color: 'cyan',
      },
      {
        title:
          "This is an expansive setting! Please make use of Headers within your posts! A header should contain, at minimum, the date and your character's location!",
        icon: 'mdi-format-header-1',
        color: 'green',
      },
      {
        title:
          'Some Legendary Pokémon are allowed; however, they must be earned. Please PM me for further details.',
        icon: 'mdi-crown',
        color: 'yellow',
      },
      {
        title:
          'OCs may not start out as Gym Leaders, Elite Four, Champions, etc. These positions are of immense influence and must be earned/obtained in RP.',
        icon: 'mdi-account-star',
        color: 'orange',
      },
      {
        title:
          'OCs are allowed to possess Aura, Psychic Powers, Occult and other supernatural abilities that are confirmed to exist in the Pokémon world.',
        icon: 'mdi-eye',
        color: 'indigo',
      },
      {
        title:
          'Battles may be resolved in any way you and your RP partner agree upon; however, if a decision cannot be made I will step in to arbitrate.',
        icon: 'mdi-handshake',
        color: 'red',
      },
    ],
  }),
})
