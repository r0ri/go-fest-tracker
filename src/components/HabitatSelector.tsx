import type { Pokemon, HabitatType } from "../types";
import PokemonCard from "./PokemonCard";

interface HabitatSelectorProps {
  habitat: HabitatType;
  pokemon: Pokemon[];
  selectedPokemon: Record<string, boolean>;
  onPokemonToggle: (pokemonId: string, isSelected: boolean) => void;
}

const HabitatSelector = ({
  habitat,
  pokemon,
  selectedPokemon,
  onPokemonToggle,
}: HabitatSelectorProps) => {
  return (
    <div className={`habitat-selector ${habitat}`}>
      <div className="pokemon-grid">
        {pokemon.map((poke) => (
          <PokemonCard
            key={poke.id}
            pokemon={poke}
            isSelected={selectedPokemon[poke.id] || false}
            onToggle={(isSelected: any) => onPokemonToggle(poke.id, isSelected)}
            mode="selection"
          />
        ))}
      </div>
    </div>
  );
};

export default HabitatSelector;
