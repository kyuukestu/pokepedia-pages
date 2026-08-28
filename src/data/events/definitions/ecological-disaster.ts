import type { EventDefinition } from "@/types/events";
import { ALL_REGIONS } from "@/types/region";

export default {
  id: "ecological-disaster",
  title: "Ecological Disaster",
  category: "ecological",
  regions: [...ALL_REGIONS],
  image: "zubat-swarm.png",
  description:
    "Various ecological or environmental disasters and disruptions.",
} satisfies EventDefinition;
