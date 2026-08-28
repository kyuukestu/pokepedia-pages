export type QuestType = "mission" | "pokejob";

export type QuestStatus =
  | "available"
  | "taken"
  | "completed";

export type QuestCategory =
  | "combat"
  | "investigation"
  | "exploration"
  | "rescue"
  | "escort"
  | "delivery"
  | "collection"
  | "capture"
  | "protection"
  | "research"
  | "training"
  | "social"
  | "emergency"
  | "miscellaneous";

export interface Quest {
  id: string;
  title: string;

  type: QuestType;
  category: QuestCategory;

  /**
    * Controls the quest's availability on the quest board.
    *
    * available  - Quest can be taken.
    * taken      - Quest is currently unavailable.
    * completed  - Quest has been permanently removed.
    *
    * Repeatable quests should generally return to "available"
    * after completion rather than remaining "completed".
    */
  status: QuestStatus;

  description: string;

  location: QuestLocation;

  issuer?: QuestIssuer;

  objectives: QuestObjective[];

  requirements?: QuestRequirement[];

  notes?: string[];

  rewards: QuestReward[];

  repeatable: boolean;
}

export interface QuestLocation {
  region: string;
  city?: string;
  route?: string;
  area?: string;
}

export interface QuestIssuer {
  name: string;
  type?: "individual" | "organization" | "government" | "company" | "anonymous";
  description?: string;
}

export interface QuestObjective {
  id: string;
  description: string;

  optional?: boolean;
}

export interface QuestRequirement {
  id: string;
  description: string;

  value?: unknown;
}

export interface QuestReward {
  id: string;
  description: string;

  type?:
    | "currency"
    | "item"
    | "pokemon"
    | "reputation"
    | "custom";

  value?: unknown;
}
