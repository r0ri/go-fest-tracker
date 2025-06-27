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

  if (mode === "selection") {
    return (
      <div
        className={`pokemon-card selection-mode ${pokemon.habitat} ${isSelected ? "selected" : ""}`}
        onClick={handleSelectionToggle}
      >
        <div className="pokemon-name">{pokemon.name}</div>
        <div className="selection-indicator">{isSelected ? "✓" : "○"}</div>
      </div>
    );
  }

  // Tracking mode
  return (
    <div className={`pokemon-card tracking-mode ${pokemon.habitat}`}>
      <div className="pokemon-info">
        <div className="pokemon-name">{pokemon.name}</div>
        <div className="shiny-count-display">
          <span className="shiny-icon">✨</span>
          <span className="count">{shinyCount}</span>
        </div>
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
