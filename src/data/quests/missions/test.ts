import type { Quest } from "@/types/quests";

export default {
  id: "test-mission",
  title: "A Strange Disturbance",

  type: "mission",
  category: "investigation",
  status: "available",

  description:
    "Several trainers have reported unusually aggressive Pokémon in the area. Investigate the disturbance and determine its cause.",

  location: {
    region: "Oblivia",
    area: "Rime Ridge",
  },

  issuer: {
    name: "Ranger Union",
    type: "organization",
  },

  objectives: [
    {
      id: "investigate",
      description: "Investigate the reports of aggressive Pokémon.",
    },
    {
      id: "identify-cause",
      description: "Determine what is causing the disturbance.",
    },
    {
      id: "resolve",
      description: "Resolve the situation.",
    },
  ],

  requirements: [
    {
      id: "trainer-rank",
      description: "Trainer Rank: Bronze or higher.",
      value: {
        rank: "bronze",
      },
    },
  ],

  notes: [
    "The situation may be resolved without defeating the Pokémon involved.",
  ],

  rewards: [
    {
      id: "payment",
      description: "500 PokéDollars",
      type: "currency",
      value: 500,
    },
  ],

  repeatable: false,
} satisfies Quest;
