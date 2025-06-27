import type { AppState } from "../types";

const STORAGE_KEY = "pokemon-go-fest-tracker";

export const defaultAppState: AppState = {
  phase: "setup",
  selectedPokemon: {},
  shinyCounts: {},
  setupComplete: false,
};

export const loadAppState = (): AppState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return defaultAppState;
    }

    const parsed = JSON.parse(stored);
    const validated = validateAppState(parsed);

    return validated || defaultAppState;
  } catch (error) {
    console.warn("Failed to load app state from localStorage:", error);
    return defaultAppState;
  }
};

export const saveAppState = (state: AppState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Failed to save app state to localStorage:", error);
  }
};

export const validateAppState = (data: unknown): AppState | null => {
  if (!data || typeof data !== "object") {
    return null;
  }

  const state = data as Partial<AppState>;

  // Validate phase
  if (!state.phase || !["setup", "tracking"].includes(state.phase)) {
    return null;
  }

  // Validate selectedPokemon
  if (!state.selectedPokemon || typeof state.selectedPokemon !== "object") {
    return null;
  }

  // Validate shinyCounts
  if (!state.shinyCounts || typeof state.shinyCounts !== "object") {
    return null;
  }

  // Validate setupComplete
  if (typeof state.setupComplete !== "boolean") {
    return null;
  }

  // Validate selectedPokemon values are booleans
  for (const [key, value] of Object.entries(state.selectedPokemon)) {
    if (typeof key !== "string" || typeof value !== "boolean") {
      return null;
    }
  }

  // Validate shinyCounts values are numbers
  for (const [key, value] of Object.entries(state.shinyCounts)) {
    if (typeof key !== "string" || typeof value !== "number" || value < 0) {
      return null;
    }
  }

  return state as AppState;
};

export const resetAppState = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("Failed to reset app state:", error);
  }
};

export const exportAppState = (): string => {
  const state = loadAppState();
  return JSON.stringify(state, null, 2);
};

export const importAppState = (jsonString: string): boolean => {
  try {
    const parsed = JSON.parse(jsonString);
    const validated = validateAppState(parsed);

    if (validated) {
      saveAppState(validated);
      return true;
    }

    return false;
  } catch (error) {
    console.warn("Failed to import app state:", error);
    return false;
  }
};

// Hook-like function for React components
export const useAppStateStorage = () => {
  const load = loadAppState;
  const save = saveAppState;
  const reset = resetAppState;
  const exportData = exportAppState;
  const importData = importAppState;

  return {
    load,
    save,
    reset,
    exportData,
    importData,
  };
};
