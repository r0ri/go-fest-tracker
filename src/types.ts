export type HabitatType =
  | "moonless-volcano"
  | "galvanic-dojo"
  | "hypnotic-tundra"
  | "fae-swamp";

export interface Pokemon {
  id: string;
  name: string;
  habitat: HabitatType;
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
