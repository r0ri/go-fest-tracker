import type { Pokemon, HabitatSchedule, HabitatType } from "../types";

export const HABITAT_SCHEDULES: HabitatSchedule[] = [
  {
    habitat: "moonless-volcano",
    name: "Moonless Volcano",
    timeSlots: [
      { start: "10:00", end: "11:00" },
      { start: "14:00", end: "15:00" },
    ],
    theme: {
      primary: "#ff4444",
      secondary: "#cc2222",
      background: "linear-gradient(135deg, #ff6b6b, #ee5a24)",
    },
  },
  {
    habitat: "galvanic-dojo",
    name: "Galvanic Dojo",
    timeSlots: [
      { start: "11:00", end: "12:00" },
      { start: "15:00", end: "16:00" },
    ],
    theme: {
      primary: "#ffdd44",
      secondary: "#ccaa22",
      background: "linear-gradient(135deg, #feca57, #ff9ff3)",
    },
  },
  {
    habitat: "hypnotic-tundra",
    name: "Hypnotic Tundra",
    timeSlots: [
      { start: "12:00", end: "13:00" },
      { start: "16:00", end: "17:00" },
    ],
    theme: {
      primary: "#44ddff",
      secondary: "#2299cc",
      background: "linear-gradient(135deg, #74b9ff, #0984e3)",
    },
  },
  {
    habitat: "fae-swamp",
    name: "Fae Swamp",
    timeSlots: [
      { start: "13:00", end: "14:00" },
      { start: "17:00", end: "18:00" },
    ],
    theme: {
      primary: "#44ff88",
      secondary: "#22cc55",
      background: "linear-gradient(135deg, #55efc4, #00b894)",
    },
  },
];

export const HABITAT_POKEMON: Record<HabitatType, Pokemon[]> = {
  "moonless-volcano": [
    { id: "houndour", name: "Houndour", habitat: "moonless-volcano" },
    { id: "numel", name: "Numel", habitat: "moonless-volcano" },
    { id: "duskull", name: "Duskull", habitat: "moonless-volcano" },
    { id: "gothita", name: "Gothita", habitat: "moonless-volcano" },
    { id: "golett", name: "Golett", habitat: "moonless-volcano" },
    { id: "fletchling", name: "Fletchling", habitat: "moonless-volcano" },
    {
      id: "flabebe-red",
      name: "Flabébé (Red Flower)",
      habitat: "moonless-volcano",
    },
    { id: "skrelp", name: "Skrelp", habitat: "moonless-volcano" },
    { id: "fuecoco", name: "Fuecoco", habitat: "moonless-volcano" },
    { id: "carbink", name: "Carbink", habitat: "moonless-volcano" },
  ],
  "galvanic-dojo": [
    { id: "machop", name: "Machop", habitat: "galvanic-dojo" },
    { id: "electabuzz", name: "Electabuzz", habitat: "galvanic-dojo" },
    { id: "teddiursa", name: "Teddiursa", habitat: "galvanic-dojo" },
    { id: "scraggy", name: "Scraggy", habitat: "galvanic-dojo" },
    { id: "chespin", name: "Chespin", habitat: "galvanic-dojo" },
    {
      id: "flabebe-yellow",
      name: "Flabébé (Yellow Flower)",
      habitat: "galvanic-dojo",
    },
    { id: "pancham", name: "Pancham", habitat: "galvanic-dojo" },
    { id: "dedenne", name: "Dedenne", habitat: "galvanic-dojo" },
    { id: "crabrawler", name: "Crabrawler", habitat: "galvanic-dojo" },
    { id: "mienfoo", name: "Mienfoo", habitat: "galvanic-dojo" },
  ],
  "hypnotic-tundra": [
    {
      id: "alolan-sandshrew",
      name: "Alolan Sandshrew",
      habitat: "hypnotic-tundra",
    },
    { id: "swinub", name: "Swinub", habitat: "hypnotic-tundra" },
    { id: "spheal", name: "Spheal", habitat: "hypnotic-tundra" },
    { id: "piplup", name: "Piplup", habitat: "hypnotic-tundra" },
    { id: "snover", name: "Snover", habitat: "hypnotic-tundra" },
    { id: "munna", name: "Munna", habitat: "hypnotic-tundra" },
    { id: "elgyem", name: "Elgyem", habitat: "hypnotic-tundra" },
    {
      id: "flabebe-blue",
      name: "Flabébé (Blue Flower)",
      habitat: "hypnotic-tundra",
    },
    { id: "bergmite", name: "Bergmite", habitat: "hypnotic-tundra" },
    { id: "frigibax", name: "Frigibax", habitat: "hypnotic-tundra" },
  ],
  "fae-swamp": [
    { id: "clefairy", name: "Clefairy", habitat: "fae-swamp" },
    { id: "tentacool", name: "Tentacool", habitat: "fae-swamp" },
    { id: "mawile", name: "Mawile", habitat: "fae-swamp" },
    { id: "gulpin", name: "Gulpin", habitat: "fae-swamp" },
    { id: "venipede", name: "Venipede", habitat: "fae-swamp" },
    { id: "popplio", name: "Popplio", habitat: "fae-swamp" },
    { id: "mareanie", name: "Mareanie", habitat: "fae-swamp" },
    { id: "morelull", name: "Morelull", habitat: "fae-swamp" },
    { id: "togetic", name: "Togetic", habitat: "fae-swamp" },
    {
      id: "flabebe-orange",
      name: "Flabébé (Orange Flower)",
      habitat: "fae-swamp",
    },
  ],
};

export const ALL_POKEMON: Pokemon[] = Object.values(HABITAT_POKEMON).flat();

export const getHabitatByPokemonId = (
  pokemonId: string,
): HabitatType | null => {
  for (const [habitat, pokemon] of Object.entries(HABITAT_POKEMON)) {
    if (pokemon.some((p) => p.id === pokemonId)) {
      return habitat as HabitatType;
    }
  }
  return null;
};

export const getHabitatSchedule = (
  habitat: HabitatType,
): HabitatSchedule | undefined => {
  return HABITAT_SCHEDULES.find((schedule) => schedule.habitat === habitat);
};
