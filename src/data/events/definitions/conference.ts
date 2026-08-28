import type { EventDefinition } from "@/types/events";
import { ALL_CANON_REGIONS } from "@/types/region";

export default {
  id: "conference",
  title: "Conference",
  category: "conference",
  regions: [...ALL_CANON_REGIONS],
  image: "indigo-conf.webp", //TODO: Replace with general Conference Images
  description:
    "Annual Pokémon League Championship held across many known regions where trainers who have collected eight Gym Badges compete for a shot at the Elite Four & Champion.",
  bulba:
    "https://bulbapedia.bulbagarden.net/wiki/Indigo_Plateau_Conference",
} satisfies EventDefinition;
