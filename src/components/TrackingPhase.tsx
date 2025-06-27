import { useState, useEffect } from "react";
import type { HabitatType } from "../types";
import { HABITAT_POKEMON, getHabitatSchedule } from "../data/pokemonData";
import {
  getCurrentHabitat,
  getNextHabitat,
  getTimeUntilNext,
} from "../utils/timeUtils";
import PokemonCard from "./PokemonCard";
import CurrentHabitat from "./CurrentHabitat";

interface TrackingPhaseProps {
  selectedPokemon: Record<string, boolean>;
  shinyCounts: Record<string, number>;
  onIncrementShiny: (pokemonId: string) => void;
  onDecrementShiny: (pokemonId: string) => void;
  onReturnToSetup: () => void;
  onResetData: () => void;
}

const TrackingPhase = ({
  selectedPokemon,
  shinyCounts,
  onIncrementShiny,
  onDecrementShiny,
  onReturnToSetup,
  onResetData,
}: TrackingPhaseProps) => {
  const [currentHabitat, setCurrentHabitat] = useState<HabitatType | null>(
    getCurrentHabitat(),
  );
  const [nextHabitat, setNextHabitat] = useState(getNextHabitat());
  const [showAllHabitats, setShowAllHabitats] = useState(false);

  // Update current habitat every minute
  useEffect(() => {
    const updateHabitat = () => {
      setCurrentHabitat(getCurrentHabitat());
      setNextHabitat(getNextHabitat());
    };

    const interval = setInterval(updateHabitat, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const getTrackedPokemonForHabitat = (habitat: HabitatType) => {
    return HABITAT_POKEMON[habitat].filter(
      (pokemon) => selectedPokemon[pokemon.id],
    );
  };

  const getAllTrackedPokemon = () => {
    const allTracked = [];
    for (const habitat of Object.keys(HABITAT_POKEMON) as HabitatType[]) {
      const trackedInHabitat = getTrackedPokemonForHabitat(habitat);
      allTracked.push(...trackedInHabitat);
    }
    return allTracked;
  };

  const getTotalShinyCount = () => {
    return Object.values(shinyCounts).reduce((sum, count) => sum + count, 0);
  };

  const getHabitatShinyCount = (habitat: HabitatType) => {
    return getTrackedPokemonForHabitat(habitat).reduce(
      (sum, pokemon) => sum + (shinyCounts[pokemon.id] || 0),
      0,
    );
  };

  const handleConfirmReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all data? This will clear all your shiny counts and return to setup.",
      )
    ) {
      onResetData();
    }
  };

  const renderHabitatSection = (habitat: HabitatType) => {
    const trackedPokemon = getTrackedPokemonForHabitat(habitat);
    const habitatSchedule = getHabitatSchedule(habitat);

    if (trackedPokemon.length === 0) return null;

    return (
      <div key={habitat} className={`habitat-section ${habitat}`}>
        <div className="habitat-header">
          <h3>{habitatSchedule?.name}</h3>
          <div className="habitat-stats">
            <span className="shiny-total">
              ✨ {getHabitatShinyCount(habitat)} shinies
            </span>
            <span className="pokemon-count">
              {trackedPokemon.length} Pokemon
            </span>
          </div>
        </div>

        <div className="pokemon-grid">
          {trackedPokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              shinyCount={shinyCounts[pokemon.id] || 0}
              onIncrement={() => onIncrementShiny(pokemon.id)}
              onDecrement={() => onDecrementShiny(pokemon.id)}
              mode="tracking"
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="tracking-phase">
      <div className="tracking-header">
        <div className="tracking-stats">
          <div className="total-shinies">
            <span className="stat-value">{getTotalShinyCount()}</span>
            <span className="stat-label">Total Shinies</span>
          </div>
          <div className="tracked-pokemon">
            <span className="stat-value">{getAllTrackedPokemon().length}</span>
            <span className="stat-label">Pokemon Tracked</span>
          </div>
        </div>

        <div className="tracking-actions">
          <button className="action-btn secondary" onClick={onReturnToSetup}>
            Edit Selection
          </button>
          <button className="action-btn danger" onClick={handleConfirmReset}>
            Reset Data
          </button>
        </div>
      </div>

      <CurrentHabitat
        currentHabitat={currentHabitat}
        nextHabitat={nextHabitat}
      />

      <div className="view-toggle">
        <button
          className={`toggle-btn ${!showAllHabitats ? "active" : ""}`}
          onClick={() => setShowAllHabitats(false)}
        >
          Current Habitat
        </button>
        <button
          className={`toggle-btn ${showAllHabitats ? "active" : ""}`}
          onClick={() => setShowAllHabitats(true)}
        >
          All Habitats
        </button>
      </div>

      <div className="tracking-content">
        {showAllHabitats ? (
          <div className="all-habitats">
            {(Object.keys(HABITAT_POKEMON) as HabitatType[]).map(
              renderHabitatSection,
            )}
          </div>
        ) : (
          <div className="current-habitat-content">
            {currentHabitat ? (
              renderHabitatSection(currentHabitat)
            ) : (
              <div className="no-active-habitat">
                <h3>No Active Habitat</h3>
                <p>
                  The event is not currently active. Check the schedule above
                  for the next habitat time.
                </p>
                {nextHabitat && (
                  <p>
                    Next:{" "}
                    <strong>
                      {getHabitatSchedule(nextHabitat.habitat)?.name}
                    </strong>{" "}
                    starts at {nextHabitat.startsAt} (
                    {getTimeUntilNext(nextHabitat.startsAt)})
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingPhase;
