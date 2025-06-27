import { useState } from "react";
import type { HabitatType } from "../types";
import { HABITAT_SCHEDULES, HABITAT_POKEMON } from "../data/pokemonData";
import { getAllHabitatTimes } from "../utils/timeUtils";
import HabitatSelector from "./HabitatSelector";

interface SetupPhaseProps {
  selectedPokemon: Record<string, boolean>;
  onPokemonToggle: (pokemonId: string, isSelected: boolean) => void;
  onComplete: () => void;
}

const SetupPhase = ({
  selectedPokemon,
  onPokemonToggle,
  onComplete,
}: SetupPhaseProps) => {
  const [activeHabitat, setActiveHabitat] =
    useState<HabitatType>("moonless-volcano");

  const habitatTimes = getAllHabitatTimes();

  const getSelectedCount = (habitat: HabitatType): number => {
    return HABITAT_POKEMON[habitat].filter(
      (pokemon) => selectedPokemon[pokemon.id],
    ).length;
  };

  const getTotalSelectedCount = (): number => {
    return Object.values(selectedPokemon).filter(Boolean).length;
  };

  const handleSelectAll = (habitat: HabitatType) => {
    HABITAT_POKEMON[habitat].forEach((pokemon) => {
      onPokemonToggle(pokemon.id, true);
    });
  };

  const handleDeselectAll = (habitat: HabitatType) => {
    HABITAT_POKEMON[habitat].forEach((pokemon) => {
      onPokemonToggle(pokemon.id, false);
    });
  };

  const canComplete = getTotalSelectedCount() > 0;

  return (
    <div className="setup-phase">
      <div className="setup-header">
        <h2>Select Pokemon to Track</h2>
        <p className="setup-description">
          Choose which Pokemon you want to track for shiny catches during GO
          Fest. You can select Pokemon from any or all habitats.
        </p>
        <div className="selection-summary">
          <strong>{getTotalSelectedCount()} Pokemon selected</strong>
        </div>
      </div>

      <div className="habitat-schedule">
        <h3>Habitat Schedule</h3>
        <div className="schedule-grid">
          {habitatTimes.map(({ habitat, name, timeRanges }) => (
            <div key={habitat} className={`schedule-item ${habitat}`}>
              <h4>{name}</h4>
              <div className="time-ranges">
                {timeRanges.map((range, index) => (
                  <span key={index} className="time-range">
                    {range}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="habitat-tabs">
        {HABITAT_SCHEDULES.map((schedule) => (
          <button
            key={schedule.habitat}
            className={`habitat-tab ${schedule.habitat} ${activeHabitat === schedule.habitat ? "active" : ""}`}
            onClick={() => setActiveHabitat(schedule.habitat)}
          >
            <span className="habitat-name">{schedule.name}</span>
            <span className="selection-count">
              {getSelectedCount(schedule.habitat)}/
              {HABITAT_POKEMON[schedule.habitat].length}
            </span>
          </button>
        ))}
      </div>

      <div className="habitat-content">
        <div className="habitat-actions">
          <button
            className="action-btn select-all"
            onClick={() => handleSelectAll(activeHabitat)}
          >
            Select All
          </button>
          <button
            className="action-btn deselect-all"
            onClick={() => handleDeselectAll(activeHabitat)}
          >
            Deselect All
          </button>
        </div>

        <HabitatSelector
          habitat={activeHabitat}
          pokemon={HABITAT_POKEMON[activeHabitat]}
          selectedPokemon={selectedPokemon}
          onPokemonToggle={onPokemonToggle}
        />
      </div>

      <div className="setup-actions">
        <button
          className={`complete-setup-btn ${canComplete ? "enabled" : "disabled"}`}
          onClick={onComplete}
          disabled={!canComplete}
        >
          {canComplete
            ? `Start Tracking (${getTotalSelectedCount()} Pokemon)`
            : "Select at least one Pokemon to continue"}
        </button>
      </div>
    </div>
  );
};

export default SetupPhase;
