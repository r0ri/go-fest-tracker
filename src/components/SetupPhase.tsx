import { useState } from "react";
import type { HabitatType } from "../types";
import {
  HABITAT_SCHEDULES,
  HABITAT_POKEMON,
  SATURDAY_POKEMON,
  SUNDAY_POKEMON
} from "../data/pokemonData";
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
  const [activeTab, setActiveTab] = useState<"habitats" | "saturday" | "sunday">("habitats");
  const [activeHabitat, setActiveHabitat] = useState<HabitatType>("moonless-volcano");

  const habitatTimes = getAllHabitatTimes();

  const getSelectedCount = (habitat: HabitatType): number => {
    return HABITAT_POKEMON[habitat].filter(
      (pokemon) => selectedPokemon[pokemon.id],
    ).length;
  };

  const getSaturdaySelectedCount = (): number => {
    return SATURDAY_POKEMON.filter(
      (pokemon) => selectedPokemon[pokemon.id],
    ).length;
  };

  const getSundaySelectedCount = (): number => {
    return SUNDAY_POKEMON.filter(
      (pokemon) => selectedPokemon[pokemon.id],
    ).length;
  };

  const getTotalSelectedCount = (): number => {
    return Object.values(selectedPokemon).filter(Boolean).length;
  };

  const handleSelectAll = (habitat?: HabitatType) => {
    if (activeTab === "saturday") {
      SATURDAY_POKEMON.forEach((pokemon) => {
        onPokemonToggle(pokemon.id, true);
      });
    } else if (activeTab === "sunday") {
      SUNDAY_POKEMON.forEach((pokemon) => {
        onPokemonToggle(pokemon.id, true);
      });
    } else if (habitat) {
      HABITAT_POKEMON[habitat].forEach((pokemon) => {
        onPokemonToggle(pokemon.id, true);
      });
    }
  };

  const handleDeselectAll = (habitat?: HabitatType) => {
    if (activeTab === "saturday") {
      SATURDAY_POKEMON.forEach((pokemon) => {
        onPokemonToggle(pokemon.id, false);
      });
    } else if (activeTab === "sunday") {
      SUNDAY_POKEMON.forEach((pokemon) => {
        onPokemonToggle(pokemon.id, false);
      });
    } else if (habitat) {
      HABITAT_POKEMON[habitat].forEach((pokemon) => {
        onPokemonToggle(pokemon.id, false);
      });
    }
  };

  const canComplete = getTotalSelectedCount() > 0;

  return (
    <div className="setup-phase">
      <div className="setup-header">
        <h2>Select Pokemon to Track</h2>
        <p className="setup-description">
          Choose which Pokemon you want to track for shiny catches during GO
          Fest. You can select Pokemon from habitats, Saturday spawns, or Sunday spawns.
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

      {/* Main category tabs */}
      <div className="category-tabs">
        <button
          className={`category-tab ${activeTab === "habitats" ? "active" : ""}`}
          onClick={() => setActiveTab("habitats")}
        >
          <span className="tab-name">Habitats</span>
          <span className="tab-count">
            {Object.values(HABITAT_SCHEDULES).reduce((total, schedule) =>
              total + getSelectedCount(schedule.habitat), 0
            )}/
            {Object.values(HABITAT_POKEMON).flat().length}
          </span>
        </button>
        <button
          className={`category-tab saturday ${activeTab === "saturday" ? "active" : ""}`}
          onClick={() => setActiveTab("saturday")}
        >
          <span className="tab-name">Saturday Spawns</span>
          <span className="tab-count">
            {getSaturdaySelectedCount()}/{SATURDAY_POKEMON.length}
          </span>
        </button>
        <button
          className={`category-tab sunday ${activeTab === "sunday" ? "active" : ""}`}
          onClick={() => setActiveTab("sunday")}
        >
          <span className="tab-name">Sunday Spawns</span>
          <span className="tab-count">
            {getSundaySelectedCount()}/{SUNDAY_POKEMON.length}
          </span>
        </button>
      </div>

      {/* Habitat tabs - only show when habitats tab is active */}
      {activeTab === "habitats" && (
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
      )}

      <div className="content-area">
        <div className="content-actions">
          <button
            className="action-btn select-all"
            onClick={() => handleSelectAll(activeTab === "habitats" ? activeHabitat : undefined)}
          >
            Select All
          </button>
          <button
            className="action-btn deselect-all"
            onClick={() => handleDeselectAll(activeTab === "habitats" ? activeHabitat : undefined)}
          >
            Deselect All
          </button>
        </div>

        {activeTab === "habitats" && (
          <HabitatSelector
            habitat={activeHabitat}
            pokemon={HABITAT_POKEMON[activeHabitat]}
            selectedPokemon={selectedPokemon}
            onPokemonToggle={onPokemonToggle}
          />
        )}

        {activeTab === "saturday" && (
          <div className="pokemon-selector saturday">
            <div className="category-description">
              <h3>Saturday All-Day Spawns</h3>
              <p>These Pokemon spawn throughout Saturday during the event.</p>
            </div>
            <div className="pokemon-grid">
              {SATURDAY_POKEMON.map((pokemon) => (
                <div
                  key={pokemon.id}
                  className={`pokemon-card selection-mode saturday ${selectedPokemon[pokemon.id] ? "selected" : ""}`}
                  onClick={() => onPokemonToggle(pokemon.id, !selectedPokemon[pokemon.id])}
                >
                  <div className="pokemon-name">{pokemon.name}</div>
                  <div className="selection-indicator">
                    {selectedPokemon[pokemon.id] ? "✓" : "○"}
                  </div>
                  <div className="spawn-category">saturday</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "sunday" && (
          <div className="pokemon-selector sunday">
            <div className="category-description">
              <h3>Sunday All-Day Spawns</h3>
              <p>These Pokemon spawn throughout Sunday during the event.</p>
            </div>
            <div className="pokemon-grid">
              {SUNDAY_POKEMON.map((pokemon) => (
                <div
                  key={pokemon.id}
                  className={`pokemon-card selection-mode sunday ${selectedPokemon[pokemon.id] ? "selected" : ""}`}
                  onClick={() => onPokemonToggle(pokemon.id, !selectedPokemon[pokemon.id])}
                >
                  <div className="pokemon-name">{pokemon.name}</div>
                  <div className="selection-indicator">
                    {selectedPokemon[pokemon.id] ? "✓" : "○"}
                  </div>
                  <div className="spawn-category">sunday</div>
                </div>
              ))}
            </div>
          </div>
        )}
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
