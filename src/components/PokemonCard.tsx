import type { Pokemon } from "../types";

interface PokemonCardProps {
  pokemon: Pokemon;
  isSelected?: boolean;
  shinyCount?: number;
  onToggle?: (isSelected: boolean) => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
  mode: "selection" | "tracking";
}

const PokemonCard = ({
  pokemon,
  isSelected = false,
  shinyCount = 0,
  onToggle,
  onIncrement,
  onDecrement,
  mode,
}: PokemonCardProps) => {
  const handleSelectionToggle = () => {
    if (onToggle) {
      onToggle(!isSelected);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onIncrement) {
      onIncrement();
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDecrement) {
      onDecrement();
    }
  };

  const getCardClassName = () => {
    const baseClass = `pokemon-card ${mode}-mode`;
    const categoryClass = pokemon.category;
    const habitatClass = pokemon.habitat || '';
    const selectedClass = mode === "selection" && isSelected ? "selected" : "";
    const incenseClass = pokemon.isIncense ? "incense" : "";
    
    return `${baseClass} ${categoryClass} ${habitatClass} ${selectedClass} ${incenseClass}`.trim();
  };

  if (mode === "selection") {
    return (
      <div
        className={getCardClassName()}
        onClick={handleSelectionToggle}
      >
        <div className="pokemon-name">
          {pokemon.name}
          {pokemon.isIncense && <span className="incense-indicator">🔥</span>}
        </div>
        <div className="selection-indicator">{isSelected ? "✓" : "○"}</div>
        {pokemon.category !== "habitat" && (
          <div className="spawn-category">{pokemon.category}</div>
        )}
      </div>
    );
  }

  // Tracking mode
  return (
    <div className={getCardClassName()}>
      <div className="pokemon-info">
        <div className="pokemon-name">
          {pokemon.name}
          {pokemon.isIncense && <span className="incense-indicator">🔥</span>}
        </div>
        <div className="shiny-count-display">
          <span className="shiny-icon">✨</span>
          <span className="count">{shinyCount}</span>
        </div>
        {pokemon.category !== "habitat" && (
          <div className="spawn-category">{pokemon.category}</div>
        )}
      </div>

      <div className="counter-controls">
        <button
          className="counter-btn decrement"
          onClick={handleDecrement}
          disabled={shinyCount === 0}
          aria-label={`Decrease shiny count for ${pokemon.name}`}
        >
          −
        </button>
        <button
          className="counter-btn increment"
          onClick={handleIncrement}
          aria-label={`Increase shiny count for ${pokemon.name}`}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
