export type HabitatType =
  | "moonless-volcano"
  | "galvanic-dojo"
  | "hypnotic-tundra"
  | "fae-swamp";

export type SpawnCategory = "habitat" | "saturday" | "sunday" | "incense";

export interface Pokemon {
  id: string;
  name: string;
  habitat?: HabitatType; // Optional for non-habitat spawns
  category: SpawnCategory;
  isIncense?: boolean; // For marking incense spawns within habitats
}

export interface TrackedPokemon extends Pokemon {
  isTracked: boolean;
  shinyCount: number;
}

export interface HabitatSchedule {
  habitat: HabitatType;
  name: string;
  timeSlots: Array<{
    start: string; // "10:00"
    end: string; // "11:00"
  }>;
  theme: {
    primary: string;
    secondary: string;
    background: string;
  };
}

export interface AppState {
  phase: "setup" | "tracking";
  selectedPokemon: Record<string, boolean>; // pokemonId -> isSelected
  shinyCounts: Record<string, number>; // pokemonId -> count
  setupComplete: boolean;
}

export type AppPhase = "setup" | "tracking";
