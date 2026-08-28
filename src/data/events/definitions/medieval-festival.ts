import type { EventDefinition } from "@/types/events";
import { ALL_REGIONS } from "@/types/region";

export default {
  id: "medieval-festival",
  title: "Medieval Festival",
  category: "festival",
  regions: [...ALL_REGIONS],
  image: "pokemon-renfaire.jpg",
  description:
    "A celebration of the medieval era and ancient traditions, featuring period-accurate reenactments and festivities.",
} satisfies EventDefinition;
