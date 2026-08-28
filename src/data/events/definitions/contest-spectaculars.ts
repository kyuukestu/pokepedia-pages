import type { EventDefinition } from "@/types/events";
import { ALL_REGIONS } from "@/types/region";


export default {
  id: "contest-spectacular",
  title: "Contest Spectacular",
  category: "contest",
  regions: [...ALL_REGIONS],
  image:
    "https://static0.cbrimages.com/wordpress/wp-content/uploads/2024/08/pokemon-contest-1.jpg",
  description:
    "Game-style Contest Spectaculars focusing on decorating Pokemon and entertainment performances.",
  bulba: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Contest"
} satisfies EventDefinition;
