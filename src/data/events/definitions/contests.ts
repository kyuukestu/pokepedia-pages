import type { EventDefinition } from "@/types/events";
import { ALL_REGIONS } from "@/types/region";

export default {
  id: "contest",
  title: "Contest",
  category: "contest",
  regions: [...ALL_REGIONS],
  image:
    "https://static0.cbrimages.com/wordpress/wp-content/uploads/2024/08/pokemon-contest-1.jpg",
  description:
    "Anime-style Pokémon Contests focusing on style, flair, and creative battling.",
    bulba: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Contest"
} satisfies EventDefinition;
