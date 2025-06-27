import type {
  Pokemon,
  HabitatSchedule,
  HabitatType,
  SpawnCategory,
} from "../types";

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
    {
      id: "houndour",
      name: "Houndour",
      habitat: "moonless-volcano",
      category: "habitat",
    },
    {
      id: "numel",
      name: "Numel",
      habitat: "moonless-volcano",
      category: "habitat",
    },
    {
      id: "duskull",
      name: "Duskull",
      habitat: "moonless-volcano",
      category: "habitat",
    },
    {
      id: "gothita",
      name: "Gothita",
      habitat: "moonless-volcano",
      category: "habitat",
    },
    {
      id: "golett",
      name: "Golett",
      habitat: "moonless-volcano",
      category: "habitat",
    },
    {
      id: "fletchling",
      name: "Fletchling",
      habitat: "moonless-volcano",
      category: "habitat",
    },
    {
      id: "flabebe-red",
      name: "Flabébé (Red Flower)",
      habitat: "moonless-volcano",
      category: "habitat",
    },
    {
      id: "skrelp",
      name: "Skrelp",
      habitat: "moonless-volcano",
      category: "habitat",
    },
    {
      id: "fuecoco",
      name: "Fuecoco",
      habitat: "moonless-volcano",
      category: "habitat",
    },
    {
      id: "carbink",
      name: "Carbink",
      habitat: "moonless-volcano",
      category: "habitat",
    },
    // Incense spawn for this habitat
    {
      id: "torkoal",
      name: "Torkoal",
      habitat: "moonless-volcano",
      category: "incense",
      isIncense: true,
    },
  ],
  "galvanic-dojo": [
    {
      id: "machop",
      name: "Machop",
      habitat: "galvanic-dojo",
      category: "habitat",
    },
    {
      id: "electabuzz",
      name: "Electabuzz",
      habitat: "galvanic-dojo",
      category: "habitat",
    },
    {
      id: "teddiursa",
      name: "Teddiursa",
      habitat: "galvanic-dojo",
      category: "habitat",
    },
    {
      id: "scraggy",
      name: "Scraggy",
      habitat: "galvanic-dojo",
      category: "habitat",
    },
    {
      id: "chespin",
      name: "Chespin",
      habitat: "galvanic-dojo",
      category: "habitat",
    },
    {
      id: "flabebe-yellow",
      name: "Flabébé (Yellow Flower)",
      habitat: "galvanic-dojo",
      category: "habitat",
    },
    {
      id: "pancham",
      name: "Pancham",
      habitat: "galvanic-dojo",
      category: "habitat",
    },
    {
      id: "dedenne",
      name: "Dedenne",
      habitat: "galvanic-dojo",
      category: "habitat",
    },
    {
      id: "crabrawler",
      name: "Crabrawler",
      habitat: "galvanic-dojo",
      category: "habitat",
    },
    {
      id: "mienfoo",
      name: "Mienfoo",
      habitat: "galvanic-dojo",
      category: "habitat",
    },
    // Incense spawn for this habitat
    {
      id: "skiddo",
      name: "Skiddo",
      habitat: "galvanic-dojo",
      category: "incense",
      isIncense: true,
    },
  ],
  "hypnotic-tundra": [
    {
      id: "alolan-sandshrew",
      name: "Alolan Sandshrew",
      habitat: "hypnotic-tundra",
      category: "habitat",
    },
    {
      id: "swinub",
      name: "Swinub",
      habitat: "hypnotic-tundra",
      category: "habitat",
    },
    {
      id: "spheal",
      name: "Spheal",
      habitat: "hypnotic-tundra",
      category: "habitat",
    },
    {
      id: "piplup",
      name: "Piplup",
      habitat: "hypnotic-tundra",
      category: "habitat",
    },
    {
      id: "snover",
      name: "Snover",
      habitat: "hypnotic-tundra",
      category: "habitat",
    },
    {
      id: "munna",
      name: "Munna",
      habitat: "hypnotic-tundra",
      category: "habitat",
    },
    {
      id: "elgyem",
      name: "Elgyem",
      habitat: "hypnotic-tundra",
      category: "habitat",
    },
    {
      id: "flabebe-blue",
      name: "Flabébé (Blue Flower)",
      habitat: "hypnotic-tundra",
      category: "habitat",
    },
    {
      id: "bergmite",
      name: "Bergmite",
      habitat: "hypnotic-tundra",
      category: "habitat",
    },
    {
      id: "frigibax",
      name: "Frigibax",
      habitat: "hypnotic-tundra",
      category: "habitat",
    },
    // Incense spawn for this habitat
    {
      id: "pachirisu",
      name: "Pachirisu",
      habitat: "hypnotic-tundra",
      category: "incense",
      isIncense: true,
    },
  ],
  "fae-swamp": [
    {
      id: "clefairy",
      name: "Clefairy",
      habitat: "fae-swamp",
      category: "habitat",
    },
    {
      id: "tentacool",
      name: "Tentacool",
      habitat: "fae-swamp",
      category: "habitat",
    },
    { id: "mawile", name: "Mawile", habitat: "fae-swamp", category: "habitat" },
    { id: "gulpin", name: "Gulpin", habitat: "fae-swamp", category: "habitat" },
    {
      id: "venipede",
      name: "Venipede",
      habitat: "fae-swamp",
      category: "habitat",
    },
    {
      id: "popplio",
      name: "Popplio",
      habitat: "fae-swamp",
      category: "habitat",
    },
    {
      id: "mareanie",
      name: "Mareanie",
      habitat: "fae-swamp",
      category: "habitat",
    },
    {
      id: "morelull",
      name: "Morelull",
      habitat: "fae-swamp",
      category: "habitat",
    },
    {
      id: "togetic",
      name: "Togetic",
      habitat: "fae-swamp",
      category: "habitat",
    },
    {
      id: "flabebe-orange",
      name: "Flabébé (Orange Flower)",
      habitat: "fae-swamp",
      category: "habitat",
    },
    // Incense spawn for this habitat
    {
      id: "klefki",
      name: "Klefki",
      habitat: "fae-swamp",
      category: "incense",
      isIncense: true,
    },
  ],
};

// Saturday spawns - available all day Saturday
export const SATURDAY_POKEMON: Pokemon[] = [
  { id: "chansey", name: "Chansey", category: "saturday" },
  { id: "skarmory", name: "Skarmory", category: "saturday" },
  { id: "larvitar", name: "Larvitar", category: "saturday" },
  { id: "shieldon", name: "Shieldon", category: "saturday" },
  { id: "shelmet", name: "Shelmet", category: "saturday" },
  { id: "vullaby", name: "Vullaby", category: "saturday" },
  { id: "oranguru", name: "Oranguru", category: "saturday" },
  { id: "goomy", name: "Goomy", category: "saturday" },
];

// Sunday spawns - available all day Sunday
export const SUNDAY_POKEMON: Pokemon[] = [
  { id: "galarian-farfetchd", name: "Galarian Farfetch'd", category: "sunday" },
  { id: "cubone", name: "Cubone", category: "sunday" },
  { id: "ralts", name: "Ralts", category: "sunday" },
  { id: "karrablast", name: "Karrablast", category: "sunday" },
  { id: "pawniard", name: "Pawniard", category: "sunday" },
  { id: "deino", name: "Deino", category: "sunday" },
  { id: "passimian", name: "Passimian", category: "sunday" },
  { id: "jangmo-o", name: "Jangmo-o", category: "sunday" },
];

export const ALL_POKEMON: Pokemon[] = [
  ...Object.values(HABITAT_POKEMON).flat(),
  ...SATURDAY_POKEMON,
  ...SUNDAY_POKEMON,
];

export const getHabitatByPokemonId = (
  pokemonId: string
): HabitatType | null => {
  for (const [habitat, pokemon] of Object.entries(HABITAT_POKEMON)) {
    if (pokemon.some((p) => p.id === pokemonId)) {
      return habitat as HabitatType;
    }
  }
  return null;
};

export const getHabitatSchedule = (
  habitat: HabitatType
): HabitatSchedule | undefined => {
  return HABITAT_SCHEDULES.find((schedule) => schedule.habitat === habitat);
};

// Helper functions for new spawn categories
export const getPokemonByCategory = (category: SpawnCategory): Pokemon[] => {
  switch (category) {
    case "habitat":
      return Object.values(HABITAT_POKEMON)
        .flat()
        .filter((p) => p.category === "habitat");
    case "saturday":
      return SATURDAY_POKEMON;
    case "sunday":
      return SUNDAY_POKEMON;
    case "incense":
      return Object.values(HABITAT_POKEMON)
        .flat()
        .filter((p) => p.category === "incense");
    default:
      return [];
  }
};

export const getHabitatPokemon = (
  habitat: HabitatType,
  includeIncense: boolean = true
): Pokemon[] => {
  const habitatPokemon = HABITAT_POKEMON[habitat];
  if (includeIncense) {
    return habitatPokemon;
  }
  return habitatPokemon.filter((p) => !p.isIncense);
};

export const getIncensePokemonForHabitat = (
  habitat: HabitatType
): Pokemon[] => {
  return HABITAT_POKEMON[habitat].filter((p) => p.isIncense);
};
