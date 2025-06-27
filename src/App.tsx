import { useState, useEffect } from "react";
import type { AppState } from "./types";
import { loadAppState, saveAppState } from "./utils/storageUtils";
import SetupPhase from "./components/SetupPhase";
import TrackingPhase from "./components/TrackingPhase";
import "./App.css";

function App() {
  const [appState, setAppState] = useState<AppState>(() => loadAppState());

  // Auto-save state changes to localStorage
  useEffect(() => {
    saveAppState(appState);
  }, [appState]);

  const updateSelectedPokemon = (pokemonId: string, isSelected: boolean) => {
    setAppState((prev) => ({
      ...prev,
      selectedPokemon: {
        ...prev.selectedPokemon,
        [pokemonId]: isSelected,
      },
    }));
  };

  const updateShinyCount = (pokemonId: string, count: number) => {
    setAppState((prev) => ({
      ...prev,
      shinyCounts: {
        ...prev.shinyCounts,
        [pokemonId]: Math.max(0, count), // Ensure count never goes below 0
      },
    }));
  };

  const incrementShinyCount = (pokemonId: string) => {
    const currentCount = appState.shinyCounts[pokemonId] || 0;
    updateShinyCount(pokemonId, currentCount + 1);
  };

  const decrementShinyCount = (pokemonId: string) => {
    const currentCount = appState.shinyCounts[pokemonId] || 0;
    if (currentCount > 0) {
      updateShinyCount(pokemonId, currentCount - 1);
    }
  };

  const completeSetup = () => {
    setAppState((prev) => ({
      ...prev,
      phase: "tracking",
      setupComplete: true,
    }));
  };

  const returnToSetup = () => {
    setAppState((prev) => ({
      ...prev,
      phase: "setup",
      setupComplete: false,
    }));
  };

  const resetAllData = () => {
    setAppState({
      phase: "setup",
      selectedPokemon: {},
      shinyCounts: {},
      setupComplete: false,
    });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌟 Pokemon GO Fest Tracker</h1>
        <p className="app-subtitle">
          Track your shiny catches across all habitats
        </p>
      </header>

      <main className="app-main">
        {appState.phase === "setup" ? (
          <SetupPhase
            selectedPokemon={appState.selectedPokemon}
            onPokemonToggle={updateSelectedPokemon}
            onComplete={completeSetup}
          />
        ) : (
          <TrackingPhase
            selectedPokemon={appState.selectedPokemon}
            shinyCounts={appState.shinyCounts}
            onIncrementShiny={incrementShinyCount}
            onDecrementShiny={decrementShinyCount}
            onReturnToSetup={returnToSetup}
            onResetData={resetAllData}
          />
        )}
      </main>
    </div>
  );
}

export default App;
