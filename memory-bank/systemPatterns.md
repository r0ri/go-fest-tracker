# System Patterns: Pokemon GO Fest Event Tracker

## Architecture Overview

### Component Hierarchy
```
App
├── SetupPhase (conditional)
│   ├── HabitatSelector
│   │   ├── PokemonGrid
│   │   └── PokemonCard
│   └── SetupActions
└── TrackingPhase (conditional)
    ├── CurrentHabitat
    ├── TrackedPokemonList
    │   └── ShinyCounter
    └── ProgressSummary
```

## State Management Patterns

### Application State Structure
```typescript
interface AppState {
  phase: 'setup' | 'tracking';
  selectedPokemon: Record<string, boolean>; // pokemonId -> isSelected
  shinyCounts: Record<string, number>;      // pokemonId -> count
  setupComplete: boolean;
}
```

### State Persistence Pattern
- **Local Storage Key**: `pokemon-go-fest-tracker`
- **Auto-save**: State changes automatically persist
- **Hydration**: Load state on app initialization
- **Reset Option**: Clear all data for new events

### State Update Patterns
```typescript
// Optimistic updates for shiny counting
const incrementShiny = (pokemonId: string) => {
  setShinyCounts(prev => ({
    ...prev,
    [pokemonId]: (prev[pokemonId] || 0) + 1
  }));
  // Immediately persist to localStorage
};
```

## Data Patterns

### Pokemon Data Organization
```typescript
// Static data organized by habitat
const HABITAT_POKEMON = {
  'moonless-volcano': [
    { id: 'houndour', name: 'Houndour' },
    { id: 'numel', name: 'Numel' },
    // ...
  ],
  // ...
} as const;
```

### Time-Based Logic Pattern
```typescript
const getCurrentHabitat = (): HabitatType | null => {
  const now = new Date();
  const currentHour = now.getHours();
  
  // Map time slots to habitats
  const timeSlotMap = {
    10: 'moonless-volcano', 14: 'moonless-volcano',
    11: 'galvanic-dojo',    15: 'galvanic-dojo',
    12: 'hypnotic-tundra',  16: 'hypnotic-tundra',
    13: 'fae-swamp',        17: 'fae-swamp',
  };
  
  return timeSlotMap[currentHour] || null;
};
```

## UI Patterns

### Phase-Based Rendering
```typescript
const App = () => {
  const [appState, setAppState] = useState<AppState>(loadState);
  
  return (
    <div className="app">
      {appState.phase === 'setup' ? (
        <SetupPhase onComplete={() => setPhase('tracking')} />
      ) : (
        <TrackingPhase />
      )}
    </div>
  );
};
```

### Habitat Theme Pattern
```css
/* CSS custom properties for habitat themes */
.habitat-moonless-volcano {
  --primary-color: #ff4444;
  --secondary-color: #cc2222;
  --background: linear-gradient(135deg, #ff6b6b, #ee5a24);
}

.habitat-galvanic-dojo {
  --primary-color: #ffdd44;
  --secondary-color: #ccaa22;
  --background: linear-gradient(135deg, #feca57, #ff9ff3);
}
```

### Counter Interaction Pattern
```typescript
const ShinyCounter = ({ pokemonId, count, onIncrement, onDecrement }) => (
  <div className="shiny-counter">
    <button 
      onClick={() => onDecrement(pokemonId)}
      disabled={count === 0}
      className="counter-btn decrement"
    >
      -
    </button>
    <span className="count-display">{count}</span>
    <button 
      onClick={() => onIncrement(pokemonId)}
      className="counter-btn increment"
    >
      +
    </button>
  </div>
);
```

## Error Handling Patterns

### Graceful Degradation
- **Time Detection Failure**: Show all habitats if time detection fails
- **Storage Failure**: Continue with in-memory state
- **Invalid Data**: Reset to default state with user notification

### Validation Patterns
```typescript
const validateStoredData = (data: unknown): AppState | null => {
  if (!data || typeof data !== 'object') return null;
  
  // Validate structure and types
  const state = data as Partial<AppState>;
  if (!['setup', 'tracking'].includes(state.phase)) return null;
  
  return state as AppState;
};
```

## Performance Patterns

### Memoization Strategy
```typescript
// Memoize expensive calculations
const trackedPokemonForHabitat = useMemo(() => {
  return HABITAT_POKEMON[currentHabitat]?.filter(
    pokemon => selectedPokemon[pokemon.id]
  ) || [];
}, [currentHabitat, selectedPokemon]);
```

### Lazy Loading Pattern
- Components load only when needed
- Pokemon data loaded per habitat
- Images loaded on demand

## Accessibility Patterns

### Keyboard Navigation
- Tab order follows logical flow
- Enter/Space for button activation
- Arrow keys for counter navigation

### Screen Reader Support
```typescript
<button 
  aria-label={`Increment shiny count for ${pokemon.name}, currently ${count}`}
  onClick={() => onIncrement(pokemon.id)}
>
  +
</button>
```

### High Contrast Support
- CSS custom properties for theme switching
- Focus indicators for all interactive elements
- Sufficient color contrast ratios